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
