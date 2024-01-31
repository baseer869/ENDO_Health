import React, {useEffect} from 'react';
import {
  NativeModules,
  PermissionsAndroid,
  Platform,
  useColorScheme,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from 'navigation/rootNavigation';
import {RootState} from 'reducers';
import {userPatchPreference} from 'apis/userApi';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {setToken} from 'apis/apiConstants';

function Main() {
  const {userInfo, platform} = useSelector(
    (state: RootState) => state.userInfoStore,
  );

  const firebaseMessaging = messaging();

  useEffect(() => {
    Platform.OS === 'android'
      ? androidRequestPermission()
      : iosRequestPermission();
  }, []);

  useEffect(() => {
    if (userInfo?.accessToken) {
      setToken(userInfo.accessToken);
    }
  }, [userInfo, userInfo?.accessToken]);

  // ios 사용자에게 알림권한 요청
  const iosRequestPermission = async () => {
    try {
      const authorizationStatus = await messaging().requestPermission();
      const accessToken = userInfo?.accessToken || '';
      // 알림 권한이 허용되면 authorizationStatus 값에 대한 안내는 상단에 작성되어 있습니다.
      // authorizationStatus 값이 AUTHORIZED 일 때,
      if (authorizationStatus === 1) {
        const apnsToken = await firebaseMessaging.getAPNSToken();
        // APNs 토큰이 등록되어 있지 않으면 getToken() 함수가 실패합니다.
        // FCM토큰을 가져오기 전에 APNs 토큰이 등록되어있는지 먼저 확인합니다.
        if (apnsToken) {
          const fcmToken = await firebaseMessaging.getToken();
          if (fcmToken && accessToken) {
            userPatchPreference(accessToken, {fcmToken});
          }
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
      console.log('userInfo:', userInfo);
      const accessToken = userInfo?.accessToken || '';
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
            if (fcmToken && accessToken) {
              await userPatchPreference(accessToken, {fcmToken});
              //TODO: 서버에 토큰전송
            }
          }
        }
        // API 레벨 32 이하일 때
        try {
          if (fcmToken && accessToken) {
            //TODO: 서버에 토큰전송
            await userPatchPreference(accessToken, {fcmToken});
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
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Navigator />
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default Main;
