import {
  Link,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Button, Text, View } from 'components/common';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import { Path, Svg } from 'react-native-svg';
import BottomSheet from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { colors } from 'assets/colors';
import { LoginLogo, LoginLogoText, RightArrow } from 'assets/svgIcons';
import { fonst } from 'assets/fonts';

const EntrancePage = () => {
  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'Login'>>();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '30%'], []);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  // callbacks
  const handleSheetChanges = (index: number) => {
    setIsSheetOpen(index !== 0);
    Animated.timing(opacity, {
      toValue: index !== 0 ? 1 : 0, // Bottom Sheet가 열리면 불투명도를 0.5로, 닫히면 0으로
      duration: 200, // 설정 시간동안 애니메이션
      useNativeDriver: true, // 네이티브 드라이버 사용
    }).start();
  };

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };
  const onSignIn = () => { };

  return (
    <View
      style={{
        paddingHorizontal: 28,
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 5,
          paddingTop: '45%',
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <LoginLogo />
        </View>
        {/* Re-styles baseeer */}
        <View
          style={{ alignItems: 'center', marginRight: 16, marginTop: 40 }}
          className="items-center mr-4 mt-10">
          <View style={{ marginBottom: 4 }}>
            <LoginLogoText />
          </View>
          <Text
            style={styles.appSlogan}>
            {`One-liner description goes here`}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: '10%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.push('Signup')}>
          <Text style={styles.buttonText}>
            Get start
          </Text>
          <RightArrow style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        <TouchableOpacity style={{ marginVertical: 20 }} onPress={openBottomSheet}>
          <Text
            style={styles.text}>
            Already a member?{' '}
            <TouchableHighlight
              underlayColor="#DDDDDD" // Color when the touch is active
              onPress={() => onSignIn()}>
              <Text
                style={{ ...styles.text, color: colors.PRIMARY_BLUE, textDecorationLine: 'underline', paddingLeft: 5 }}>
                Sign in
              </Text>
            </TouchableHighlight>
          </Text>
        </TouchableOpacity>
      </View>
      {isSheetOpen && (
        <Animated.View
          style={[styles.overlay, { opacity }]}
          pointerEvents={isSheetOpen ? 'auto' : 'none'}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() =>
              bottomSheetRef.current?.snapToIndex(0)
            }></TouchableOpacity>
        </Animated.View>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        style={styles.bottomSheet}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View className="bg-white flex-1 w-full justify-start items-center mt-5">
          <Button
            className="my-3"
            width="full"
            type="sub_gray"
            title="Continue with Google"
            onPress={() => {
              navigation.push('Login');
            }}></Button>
          <Button
            width="full"
            type="sub_white"
            title="Use email address"></Button>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: `var(${colors.ALPHA_BLACK_40}, rgba(0, 0, 0, 0.4)`, // 반투명한 배경
    zIndex: 0,
    elevation: 0,
  },
  bottomSheet: {
    zIndex: 1000,
    elevation: 1000,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  logo: {
    marginTop: '57%',
  },
  logoText: {
    marginTop: 40,
  },
  appSlogan: {
    fontSize: 18,
    lineHeight: 21.6,
    color: colors.GRAY_80,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: fonst.Pretendard_Bold
  },
  buttonContainer: {
    backgroundColor: colors.PRIMARY_BLUE,
    borderRadius: 24,
    width: '100%',
    marginTop: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    columnGap: 8,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 20.4,
    color: colors.GRAY_0,
    textAlign: 'center',
    fontFamily: fonst.Pretendard_Bold
  },
  text: {
    fontSize: 16,
    fontFamily: fonst.Pretendard_Bold,
    lineHeight: 19.2,
    color: colors.GRAY_50,
  }
});

export default EntrancePage;
