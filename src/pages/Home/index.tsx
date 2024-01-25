import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducers';
import {Button, Text, View} from 'components/common';
import {clearUserInfo} from 'stores/UserInfoStore';
import {LineChart} from 'react-native-wagmi-charts';
import {colors} from 'assets/colors';

// Define a type for your component's props if needed
type HomeProps = {
  // Define any props here
};

const {MyNativeModule} = NativeModules;

const Home: React.FC<HomeProps> = () => {
  const [hasNfc, setHasNFC] = useState<boolean | null>(null);
  const userInfo = useSelector((state: RootState) => state.userInfoStore);
  const dispatch = useDispatch();
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

  const readTag = async () => {};

  const cancelReadTag = async () => {
    await NfcManager.cancelTechnologyRequest();
    await NfcManager.unregisterTagEvent();
  };

  const data = [
    {
      timestamp: 1,
      value: 33575.25,
    },
    {
      timestamp: 2,
      value: 33545.25,
    },
    {
      timestamp: 3,
      value: 33510.25,
    },
    {
      timestamp: 4,
      value: 33345.84,
    },
    {
      timestamp: 5,
      value: 33215.25,
    },
  ];

  if (!hasNfc) {
    return (
      <View className="flex flex-col justify-around w-full h-5/6 pl-10">
        <Text>NFC not supported</Text>
        <LineChart.Provider data={data}>
          <LineChart width={300} height={300}>
            <LineChart.Path>
              <LineChart.Highlight color="red" from={0} to={1} />
              <LineChart.Highlight color="red" from={3} to={4} />
              <LineChart.HorizontalLine at={{value: 33545.84}} />
              <LineChart.HorizontalLine at={{value: 33345.84}} />
            </LineChart.Path>
            <LineChart.CursorCrosshair>
              <LineChart.Tooltip />
            </LineChart.CursorCrosshair>
          </LineChart>
          <LineChart.PriceText />
          <LineChart.DatetimeText />
        </LineChart.Provider>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hello world usename:{userInfo.userInfo?.name}</Text>
      <TouchableOpacity onPress={readTag}>
        <Text>Scan Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancelReadTag}>
        <Text>Cancel Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(clearUserInfo())}>
        <Text style={{color: 'black'}}>
          로그아웃
          {JSON.stringify(userInfo.userInfo, null, 2)}
        </Text>
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
