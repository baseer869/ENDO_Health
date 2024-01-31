import React, {useEffect, useState} from 'react';
import {StyleSheet,Image, TouchableOpacity} from 'react-native';
import NfcManager, {
  Nfc15693RequestFlagIOS,
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
import {Text, View} from 'components/common';
import GlucoseLineChart from 'components/charts/GlucoseLineChart';
import {RootStackScreenProps} from 'navigation/rootNavigation';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  UserGlucoseInsightResponseDto,
  getUserGlucoseInsights,
} from 'apis/userApi';
import {InsightOverviewCard} from './components/InsightOverviewCard';
import {InsightCard} from './components/InsightCard';
import { colors } from 'assets/colors';
import icons from 'components/icons';

// Define a type for your component's props if needed
type HomeProps = {
  // Define any props here
};

const {MyNativeModule} = NativeModules;

const 
Home: React.FC<HomeProps> = () => {
  const navigation = useNavigation<RootStackScreenProps>();

  useEffect(() => {
    navigation.setOptions({headerShown: true});
  });

  const [hasNfc, setHasNFC] = useState<boolean | null>(null);
  const [glucoseInsights, setGlucoseInsights] =
    useState<UserGlucoseInsightResponseDto | null>(null);
  const userInfo = useSelector((state: RootState) => state.userInfoStore);
  const dispatch = useDispatch();

  const getGlucoseInsights = async () => {
    // const res = await getUserGlucoseInsights();
    const res: UserGlucoseInsightResponseDto = {
      insightCards: [
        {
          type: 'OVERVIEW',
          graph: {
            type: 'PROGRESS_CIRCLE',
            value: 0.5,
          },
          title: 'Daily Score',
          description: 'Awesome',
        },
        {
          type: 'OVERVIEW',
          title: 'Time in Range',
          description: '89%',
        },
        {
          type: 'OVERVIEW',
          title: 'Time in Range',
          description: '89%',
        },
        {
          type: 'INSIGHT_CARD',
          title: 'Glucose Improved!',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          type: 'INSIGHT_CARD',
          title: 'Glucose Improved!',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          type: 'INSIGHT_CARD',
          title: 'Glucose Improved22!',
          description:
            '222 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    };
    setGlucoseInsights(res);
  };

  useEffect(() => {
    getGlucoseInsights();
  }, []);

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
  const onSortByDate = () =>{};
  return (
    <ScrollView style={styles.container}>
      <ScrollView 
      horizontal={true} 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.insightContainer}
      >
        {glucoseInsights?.insightCards
          ?.filter(v => v.type === 'OVERVIEW')
          .map((insightCard, index, array) => {
            return (
              <InsightOverviewCard
                index={index}
                title={insightCard.title}
                description={insightCard.description}
                graph={insightCard.graph}
                length={array.length}
              />
            );
          })}
      </ScrollView>
      <View style={styles.dateView}>
        <View style={{flexDirection:'row', alignItems:'center',}}>
          <Image source={icons.icon_calendar_solid} style={styles.icon} />
          <Text style={styles.date}>Jan 24</Text>
          <TouchableOpacity onPress={onSortByDate} activeOpacity={0.7} style={{paddingLeft:4}}>
            <Image source={icons.icon_arrow_down_line_30} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.InSight}>
          <View style={styles.dot}/>
          <Text style={styles.inSightText}>Doing Great</Text>
        </View>
      </View>
      <GlucoseLineChart />
      <ScrollView
        contentContainerStyle={styles.cardContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {glucoseInsights?.insightCards
          ?.filter(v => v.type === 'INSIGHT_CARD')
          .map((insightCard, index, array) => {
            return (
               <InsightCard
                 title={insightCard.title}
                 description={insightCard.description}
               />
            );
          })}
      </ScrollView>
      {/* <TouchableOpacity onPress={readTag}>
        <Text>Scan Tag</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={cancelReadTag}>
        <Text>Cancel Scan</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity onPress={() => dispatch(clearUserInfo())}>
        <Text style={{color: 'black'}}>
          로그아웃
          {'' + userInfo.userInfo?.accessToken}
        </Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  insightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
    paddingHorizontal:20,
    paddingTop:33,
  },
  cardContainer: {
    flexDirection: 'row',
    overflow: 'scroll',
    paddingHorizontal:20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  dateView:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,
    paddingTop:25
  },
  InSight:{
    backgroundColor: colors.GREEN_10,
    paddingHorizontal:10,
    paddingVertical:5,
    flexDirection:'row',
    alignItems:'center',
    display:'flex',
    borderRadius:28,
    columnGap:7,
  },
  dot:{
    width:10,
    height:10,
    backgroundColor: colors.PRIMARY_GREEN,
    borderRadius:10
  },
  inSightText:{
    fontSize: 13,
    color: colors.PRIMARY_GREEN,
    lineHeight:15.6,
    textAlign:'center',
    fontWeight: "700"
  },
  icon:{
    width:16,
    height:16
  },
  date:{
    fontSize:17,
    fontStyle:'normal',
    fontWeight:'700',
    lineHeight:20.4,
    color: colors.GRAY_50,
    // fontFamily:"",
    paddingLeft:6
  }
});

export default Home;
