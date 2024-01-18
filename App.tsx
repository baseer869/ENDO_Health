/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  NativeModules,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Home from './src/pages/Home';
import CodePush, {CodePushOptions} from 'react-native-code-push';
import {useCodePush} from './src/hooks/useCodepush';
import i18n from './src/language/i18n';
import messaging from '@react-native-firebase/messaging';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const codepushState = useCodePush();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const firebaseMessaging = messaging();

  useEffect(() => {
    Platform.OS === 'android'
      ? androidRequestPermission()
      : iosRequestPermission();
  }, []);

  // ios 사용자에게 알림권한 요청
  const iosRequestPermission = async () => {
    try {
      const authorizationStatus = await messaging().requestPermission();
      // 알림 권한이 허용되면 authorizationStatus 값에 대한 안내는 상단에 작성되어 있습니다.
      // authorizationStatus 값이 AUTHORIZED 일 때,
      if (authorizationStatus === 1) {
        const apnsToken = await firebaseMessaging.getAPNSToken();
        // APNs 토큰이 등록되어 있지 않으면 getToken() 함수가 실패합니다.
        // FCM토큰을 가져오기 전에 APNs 토큰이 등록되어있는지 먼저 확인합니다.
        if (apnsToken) {
          const fcmToken = await firebaseMessaging.getToken();
          // 와이즈트래커 SDK가 토큰을 수집합니다.
          NativeModules.DotReactBridge.setPushToken(fcmToken);
        }
      } else {
        console.log('알림권한 비 활성화:');
      }
    } catch (error) {
      console.log('ios error::', error);
    }
  };

  // Android 사용자에게 알림권한 요청
  const androidRequestPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    console.log('authorizationStatus:', authorizationStatus);
    try {
      const fcmToken = await firebaseMessaging.getToken();
      if (Platform.OS === 'android') {
        console.log('get android FCM Token:', fcmToken);
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            /*
             * 알림허용이 denied 일때, 알림 허용에 대한 재안내와
             * 알림수신에 대한 요청을 다시 할 수 있는 내용 작성가능.
             * */
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Android 13이상 , 알림권한 허용.');
            if (fcmToken) {
              //토큰 수집
              NativeModules.DotReactBridge.setPushToken(fcmToken);
            }
          }
        }
        // API 레벨 32 이하일 때
        try {
          if (fcmToken) {
            //토큰 수집
            NativeModules.DotReactBridge.setPushToken(fcmToken);
          }
        } catch (e) {
          console.log('android token API level 32 이하 error:', e);
        }
      }
    } catch (error) {
      console.log('Android error:', error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text>codepushState:{String(codepushState.updating)}</Text>
        <Text>codepushError:{String(codepushState.error)}</Text>
        <Text>i18ntest:{i18n.t('Home.title')}</Text>
        <Header />
        <Home />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

export default CodePush(codePushOptions)(App);
