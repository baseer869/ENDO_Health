import nfcManager, {
  Nfc15693RequestFlagIOS,
  NfcManager,
} from 'react-native-nfc-manager';
import {toHexString} from '../strings';

export interface GlucoseData {
  readonly sensingDate: number;
  readonly sensorTime: number;
  readonly glucoseLevel: number;
  readonly glucoseLevelSmoothed: number;
  readonly glucoseLevelRaw: number;
  readonly glucoseLevelRawSmoothed: number;
  readonly flag: number;
  readonly temp: number;
  readonly source: GlucoseDataSource;
}

export enum GlucoseDataSource {
  NOT_SET,
  FRAME,
  BLUETOOTH,
}

export enum SensorType {
  LIBRE1,
  Libre1New,
  Libre2,
  LibreProH,
}

export interface ReadingData {
  readonly trend: GlucoseData[];
  readonly history: GlucoseData[];
  readonly deviceType: SensorType;
}

const LIBRE1_BACKDORE = [0xc2, 0xad, 0x75, 0x21];

export const rawGlucoseDataParseToReadingData = (
  rawGlucoseData: number[],
  patchInfo: number[],
  captureDateTime: number,
  // trendBackgroudValues: number[],
  // historyBackgroundValues: number[],
): ReadingData => {
  const sensorTime = 256 * rawGlucoseData[317] + rawGlucoseData[316];
  const sensorStartTime = captureDateTime - sensorTime * 600000;

  return {
    history: parseHistoryData(
      rawGlucoseData,
      sensorTime,
      sensorStartTime,
      captureDateTime,
    ),
    trend: parseTrendData(
      rawGlucoseData,
      sensorTime,
      sensorStartTime,
      captureDateTime,
    ),
    deviceType: SensorType.LIBRE1,
  };
};

const FRAM_RECORD_SIZE = 6;
const TREND_START = 28;
const HISTORY_START = 124;

const parseHistoryData = (
  rawGlucoseData: number[],
  sensorTime: number,
  sensorStartTime: number,
  captureDateTime: number,
): GlucoseData[] => {
  const histories: GlucoseData[] = [];
  const indexHistory = rawGlucoseData[27];
  console.log(`indexHistory: ${indexHistory}`);
  for (let i = 0; i < 32; i++) {
    let index = indexHistory - i - 1;
    if (index < 0) {
      index += 32;
    }

    if (
      index * FRAM_RECORD_SIZE + HISTORY_START + FRAM_RECORD_SIZE >=
      rawGlucoseData.length
    ) {
      console.error(
        `Failing to parse history data from ${new Date(captureDateTime)} : ${
          index * FRAM_RECORD_SIZE + HISTORY_START + FRAM_RECORD_SIZE
        } vs ${rawGlucoseData.length}`,
      );
      throw new Error('Failing to parse history data from' + captureDateTime);
    }

    const time = Math.max(0, sensorTime - i);

    console.log(
      'history raw glucose in data : ' +
        toHexString([
          rawGlucoseData[index * FRAM_RECORD_SIZE + HISTORY_START + 1],
          rawGlucoseData[index * FRAM_RECORD_SIZE + HISTORY_START],
        ]),
    );

    histories.push({
      glucoseLevel: 0,
      glucoseLevelSmoothed: 0,
      glucoseLevelRaw: getGlucoseRaw([
        rawGlucoseData[index * FRAM_RECORD_SIZE + HISTORY_START + 1],
        rawGlucoseData[index * FRAM_RECORD_SIZE + HISTORY_START],
      ]),
      glucoseLevelRawSmoothed: 0,
      flag: 0,
      temp: 0,
      sensingDate: sensorStartTime + time * 600000,
      sensorTime: time,
      source: GlucoseDataSource.FRAME,
    });
  }

  return histories;
};

const parseTrendData = (
  rawGlucoseData: number[],
  sensorTime: number,
  sensorStartTime: number,
  captureDateTime: number,
): GlucoseData[] => {
  const indexTrend = rawGlucoseData[26];

  const trendData: GlucoseData[] = [];

  for (let i = 0; i < 16; i++) {
    let index = indexTrend - i - 1;
    if (index < 0) {
      index += 16;
    }
    if (
      index * FRAM_RECORD_SIZE + TREND_START + FRAM_RECORD_SIZE >=
      rawGlucoseData.length
    ) {
      console.error(`Failing to parse trend data from ${captureDateTime}`);
      throw new Error('Failing to parse trend data from' + captureDateTime);
    }

    const time = Math.max(0, sensorTime - i);

    trendData.push({
      glucoseLevel: 0,
      glucoseLevelSmoothed: 0,
      glucoseLevelRaw: getGlucoseRaw([
        rawGlucoseData[index * FRAM_RECORD_SIZE + TREND_START + 1],
        rawGlucoseData[index * FRAM_RECORD_SIZE + TREND_START],
      ]),
      glucoseLevelRawSmoothed: 0,
      flag: 0,
      sensingDate: sensorStartTime + time * 600000,
      sensorTime: time,
      temp: 0,
      source: GlucoseDataSource.FRAME,
    });
  }

  return trendData;
};

const getGlucoseRaw = (bytes: number[]): number => {
  return (256 * (bytes[0] & 0xff) + (bytes[1] & 0xff)) & 0x1fff;
};

interface NFCCommand {
  code: number;
  parameters: number[];
}

export const readRaw = async (
  address: number,
  bytes: number,
  nfcManager: NfcManager,
): Promise<[number, Buffer]> => {
  let buffer = Buffer.alloc(0);
  let remainingBytes = bytes;
  const retries = 5;
  let retry = 0;

  while (remainingBytes > 0 && retry <= retries) {
    const addressToRead = address + buffer.length;
    const bytesToRead = Math.min(remainingBytes, 24);

    let remainingWords = Math.floor(remainingBytes / 2);
    if (
      remainingBytes % 2 === 1 ||
      (remainingBytes % 2 === 0 && addressToRead % 2 === 1)
    ) {
      remainingWords += 1;
    }
    const wordsToRead = Math.min(remainingWords, 12); // real limit is 15

    const readRawCommand: NFCCommand = {
      code: 0xa3,
      parameters: [
        ...LIBRE1_BACKDORE,
        addressToRead & 0xff,
        addressToRead >> 8,
        wordsToRead,
      ],
    };

    if (buffer.length === 0) {
      console.log(
        `NFC: sending '${readRawCommand.code.toString(
          16,
        )} ${readRawCommand.parameters
          .map(p => p.toString(16))
          .join(' ')}' custom command (libre1 read raw)`,
      );
    }
    const {customCommand} = nfcManager.iso15693HandlerIOS;

    try {
      const output = await customCommand({
        flags: Nfc15693RequestFlagIOS.HighDataRate,
        customCommandCode: readRawCommand.code,
        customRequestParameters: readRawCommand.parameters,
      });
      let data: Buffer = Buffer.from(output!);

      if (addressToRead % 2 === 1) {
        data = data.slice(1);
      }
      if (data.length - bytesToRead === 1) {
        data = data.slice(0, data.length - 1);
      }

      buffer = Buffer.concat([buffer, data]);
      remainingBytes -= data.length;
    } catch (error) {
      retry += 1;
      if (retry <= retries) {
        console.log(`NFC: retry # ${retry}...`);
        await sleep(250);
      } else {
        throw new Error('Custom command error');
      }
    }
  }

  return [address, buffer];
};

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
