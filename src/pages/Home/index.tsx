import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NfcManager, {
  Nfc15693RequestFlagIOS,
  NfcAdapter,
  NfcEvents,
  NfcTech,
  nfcManager,
} from 'react-native-nfc-manager';
import {NativeModules} from 'react-native';
import {Platform} from 'react-native';
import {toHexStringWithOffset} from '../../utils/strings';
import {toHexNumber} from '../../utils/numbers';
import {rawGlucoseDataParseToReadingData, readRaw} from '../../utils/nfc/data';

// Define a type for your component's props if needed
type HomeProps = {
  // Define any props here
};

const {MyNativeModule} = NativeModules;

const Home: React.FC<HomeProps> = () => {
  const [hasNfc, setHasNFC] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        console.log('NFC supported!');
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, () => {
      console.log('tag found');
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, []);

  useEffect(() => {
    console.log('MyNativeModule : ', MyNativeModule);
    if (MyNativeModule) {
      MyNativeModule.exampleMethod('Message from React Native')
        .then((result: any) => {
          console.log('Result:', result);
        })
        .catch((error: any) => {
          console.error('Error:', error);
        });
    }
    if (MyNativeModule === null) {
      console.log('MyNativeModule is null');
    }
  }, []);

  const readTag = async () => {
    try {
      console.log('requesting tech');
      if (Platform.OS === 'ios') {
        await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
        console.log('tag found');
        const tag = await NfcManager.getTag();
        console.log('tag', tag);
        // const cmd = [0x02, 0xa1, 0x07];

        const readResponse = await readRaw(0x00, 64, nfcManager);
        console.log('readResponse', readResponse);

        const {customCommand} = NfcManager.iso15693HandlerIOS;
        console.log(
          `customCommandCode : ${0xa3}, customRequestParameters : ${[
            0xc2, 0xad, 0x75, 0x21, 0x00, 0x1a, 0xc,
          ]}`,
        );
        const patchInfo = await customCommand({
          flags: Nfc15693RequestFlagIOS.HighDataRate,
          customCommandCode: 0xa3,
          customRequestParameters: [0xc2, 0xad, 0x75, 0x21, 0x00, 0x1a, 0xc],
        });
        console.log('patchInfo', patchInfo);
      }

      if (Platform.OS === 'android') {
        let data = new Array<number>(43 * 8).fill(0);
        await NfcManager.requestTechnology(NfcTech.NfcV);
        console.log('tag found');
        const tag = await NfcManager.getTag();
        const tagId = tag?.id;
        if (!tagId) {
          console.log('tagId is null');
          return;
        }
        console.log('tag', tag);
        const cmd = [0x02, 0xa1, 0x07];
        const patchInfo = await NfcManager.transceive(cmd);
        console.log('patchInfo', patchInfo);
        const slicedPatchInfo = patchInfo.slice(1, patchInfo.length);
        console.log('slicedPatchInfo', slicedPatchInfo);

        const addressed = false;

        for (let i = 0; i < 43; i += 3) {
          let read_blocks = 3;
          let correct_reply_size = addressed ? 28 : 25;
          // const numericTagId =
          //   tagId.match(/.{1,2}/g)?.map(hexPart => parseInt(hexPart, 16)) || [];

          let cmd = [0x02, 0x23, toHexNumber(i), toHexNumber(read_blocks - 1)];
          console.log('cmd', cmd);

          let replyBlock: number[] = [];
          let time = Date.now();
          while (true) {
            try {
              replyBlock = await NfcManager.transceive(cmd);
              console.log('replyBlock', replyBlock);
              break;
            } catch (e) {
              if (Date.now() > time + 2000) {
                console.error('tag read timeout');
                return null;
              }
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }

          if (replyBlock.length !== correct_reply_size) {
            console.error(
              `Incorrect block size (multiply): ${replyBlock.length} vs ${correct_reply_size}`,
            );
            return null;
          }

          data.splice(i * 8, replyBlock.length - 1, ...replyBlock.slice(1));
        }
        console.log('data', toHexStringWithOffset(data, 0, data.length));
        console.log('data length', data.length);
        console.log(
          'parsed data',
          rawGlucoseDataParseToReadingData(data, patchInfo, Date.now()),
        );
        return data;
      }
    } catch (ex: any) {
      console.warn(JSON.stringify(ex));
    }

    await NfcManager.cancelTechnologyRequest();
  };

  const cancelReadTag = async () => {
    await NfcManager.cancelTechnologyRequest();
    await NfcManager.unregisterTagEvent();
  };

  if (!hasNfc) {
    return (
      <View>
        <Text>NFC not supported</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
      <TouchableOpacity onPress={readTag}>
        <Text>Scan Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancelReadTag}>
        <Text>Cancel Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Home;
