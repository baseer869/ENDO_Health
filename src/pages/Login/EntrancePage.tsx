import {
  Link,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Button, Text, View} from 'components/common';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {Path, Svg} from 'react-native-svg';
import BottomSheet from '@gorhom/bottom-sheet';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from 'assets/colors';

const EntrancePage = () => {
  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'Login'>>();

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
    <View className="px-7 bg-white w-full h-full">
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
      <View className="flex-1 items-center justify-between -z-10">
        <View className="flex-1 h-4/6 items-center justify-start">
          <Svg
            style={styles.logo}
            width="109"
            height="108"
            viewBox="0 0 109 108"
            fill="none">
            <Path
              id="Vector"
              d="M54.3013 2.59839L85.7585 34.0556C85.8785 34.1756 85.9814 34.2956 86.1014 34.3984C102.096 51.5756 101.496 78.13 84.6271 94.5871C68.8213 110.016 43.3299 110.873 26.5641 96.49C7.3298 79.9985 6.50694 50.8728 24.0955 33.2842L33.7298 23.6499L51.3359 43.5746L43.6991 51.7106C38.1773 57.4464 37.0727 66.7985 41.8213 73.1757C48.7098 81.3397 58.7931 81.6252 65.8564 74.8548C71.9996 68.9664 72.0099 59.3928 66.3185 53.1356L54.3184 41.1356C43.6727 30.4899 43.6727 13.2441 54.3184 2.61553L54.3013 2.59839Z"
              fill="#0057FF"
            />
          </Svg>
          <Svg
            style={styles.logoText}
            width="237"
            height="25"
            viewBox="0 0 237 25"
            fill="none">
            <Path
              id="Union"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M94.9563 4.11275C93.8258 3.05946 92.5028 2.24024 90.9714 1.65509C89.44 1.07773 87.7643 0.78125 85.9442 0.78125C84.1242 0.78125 82.4484 1.06993 80.917 1.65509C79.3856 2.24024 78.0627 3.05166 76.9322 4.11275C75.8097 5.16603 74.9357 6.40656 74.3103 7.81874C73.693 9.23092 73.3803 10.7835 73.3803 12.4688C73.3803 14.154 73.693 15.6911 74.3264 17.1266C74.9518 18.5622 75.8418 19.8028 76.9803 20.8639C78.1188 21.9171 79.4498 22.7442 80.9812 23.3293C82.5126 23.9223 84.1883 24.2188 86.0084 24.2188C87.8284 24.2188 89.4641 23.9301 90.9874 23.3449C92.5028 22.7598 93.8258 21.9405 94.9563 20.8795C96.0868 19.8106 96.9607 18.57 97.5781 17.1423C98.1955 15.7145 98.5082 14.1697 98.5082 12.5078C98.5082 10.846 98.2035 9.26213 97.5781 7.83435C96.9607 6.40656 96.0868 5.17383 94.9563 4.11275ZM91.1478 15.7301C90.6667 16.6585 89.9852 17.3763 89.0952 17.8834C88.2053 18.3906 87.1549 18.6403 85.9362 18.6403C85.0222 18.6403 84.2044 18.4998 83.4828 18.2111C82.7531 17.9303 82.1358 17.5168 81.6146 16.9784C81.0934 16.4401 80.7006 15.7925 80.4279 15.0357C80.1553 14.2789 80.019 13.4206 80.019 12.4688C80.019 11.2283 80.2596 10.1438 80.7326 9.22312C81.2057 8.30247 81.8952 7.60028 82.7852 7.10095C83.6752 6.60162 84.7255 6.35975 85.9362 6.35975C86.8502 6.35975 87.6681 6.50019 88.3897 6.78887C89.1193 7.07754 89.7447 7.48325 90.2578 8.0216C90.779 8.55994 91.1719 9.20752 91.4445 9.94872C91.7171 10.6977 91.8534 11.5403 91.8534 12.461C91.8534 13.7093 91.6128 14.7938 91.1398 15.7223L91.1478 15.7301ZM20.7966 14.8273H10.9168V18.5021H21.9869V23.7529H10.9168H9.6868H4.47314V1.21263H9.6868H10.9168H21.7964V6.47125H10.9168V9.70131H20.7966V14.8273ZM30.1062 1.21263L39.8248 13.1498V1.21263H46.3012V23.7529H41.4459L32.0467 12.2136V23.7529H25.5703V1.21263H30.1062ZM63.9857 2.00846C65.5171 2.5312 66.8401 3.29581 67.9706 4.28668V4.29448C69.1011 5.29315 69.9751 6.47906 70.5924 7.86004C71.2098 9.24101 71.5225 10.7858 71.5225 12.4945C71.5225 14.2031 71.2098 15.748 70.5924 17.1289C69.9751 18.5177 69.1011 19.7036 67.9706 20.6945C66.8401 21.6854 65.5171 22.45 64.0018 22.9727C62.4784 23.4954 60.8267 23.7607 59.0227 23.7607H49.2009V1.22045H58.9585C60.7786 1.22045 62.4543 1.48572 63.9857 2.00846ZM62.1176 17.7219C63.0076 17.2928 63.6891 16.6374 64.1701 15.748C64.6432 14.8663 64.8837 13.7662 64.8837 12.4555C64.8837 11.1447 64.6432 10.0602 64.1541 9.19419C63.665 8.32816 62.9755 7.68059 62.1015 7.24367C61.2196 6.81455 60.1773 6.5961 58.9585 6.5961H55.7033V18.3695H58.9585C60.1773 18.3695 61.2276 18.1588 62.1176 17.7219ZM121.275 9.6311H113.794V1.21263H107.284V23.7529H113.794V14.8897H121.275V23.7529H127.786V1.21263H121.275V9.6311ZM148.074 14.8273H138.084V18.5021H149.277V23.7529H138.084H136.849H131.574V1.21261H136.849H138.084H149.077V6.47122H138.084V9.70129H148.074V14.8273ZM159.494 1.29273L150.675 23.833H157.313L158.628 20.0334H166.799L168.081 23.833H174.848L166.133 1.29273H159.494ZM160.336 15.0946L162.758 8.09616L165.123 15.0946H160.336ZM176.788 1.37287H183.291V18.5297H192.92V23.9131H183.291H182.088H176.788V1.37287ZM198.724 1.37287H191.796V6.75632H198.724V23.9131H205.226V6.75632H212.194V1.37287H205.226H198.724ZM228.337 9.79133V1.37287H234.839V23.9131H228.337V15.0499H220.856V23.9131H214.346V1.37287H220.856V9.79133H228.337Z"
              fill="#0057FF"
            />
          </Svg>
          <View className="mt-5">
            <Text
              className="font-bold text-[18px] text-gray-80"
              style={{color: colors.GRAY_80, fontSize: 18, fontWeight: '700'}}>
              One-liner description goes here
            </Text>
          </View>
        </View>
        <View className="flex-1 w-full items-center">
          <Button
            title="Get Started"
            width="full"
            onPress={() => navigation.push('Signup')}
          />
          <TouchableOpacity
            className="mt-2"
            onPress={() => {
              openBottomSheet();
            }}>
            <Text className="font-bold text-[16px] text-gray-60">
              Already a member?{' '}
              <Text
                className="font-bold text-[16px] text-primary-blue"
                style={{color: colors.PRIMARY_BLUE}}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
