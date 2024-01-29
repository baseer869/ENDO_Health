import {useNavigation} from '@react-navigation/native';
import {Button, Text, View} from 'components/common';
import {RootStackScreenProps} from 'navigation/rootNavigation';
import BottomSheet from '@gorhom/bottom-sheet';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from 'assets/colors';
import {LoginLogo, LoginLogoText, RightArrow} from 'assets/svgIcons';

const EntrancePage = () => {
  const navigation = useNavigation<RootStackScreenProps>();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '30%'], []);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({headerShown: false});
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
          paddingTop: '50%',
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <LoginLogo />
        </View>

        <View
          style={{alignItems: 'center', marginRight: 16, marginTop: 40}}
          className="items-center mr-4 mt-10">
          <View style={{marginBottom: 4}}>
            <LoginLogoText />
          </View>
          <Text
            style={{fontWeight: '700', fontSize: 18, color: colors.GRAY_80}}>
            {`One-liner description goes here`}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: '20%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.PRIMARY_BLUE,
            borderRadius: 24,
            paddingHorizontal: 5,
            width: '100%',
            marginTop: '100%',
          }}
          onPress={() => navigation.push('Signup')}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
            }}>
            <Text style={{color: 'white', fontWeight: '700', fontSize: 17}}>
              Get start
            </Text>
            <RightArrow style={{marginLeft: 8}} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{marginTop: 8}} onPress={openBottomSheet}>
          <Text
            style={{fontWeight: '700', fontSize: 16, color: colors.GRAY_60}}>
            Already a member?{' '}
            <Text
              style={{
                color: colors.PRIMARY_BLUE,
                fontWeight: '700',
                fontSize: 16,
              }}>
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      {isSheetOpen && (
        <Animated.View
          style={[styles.overlay, {opacity}]}
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
});

export default EntrancePage;
