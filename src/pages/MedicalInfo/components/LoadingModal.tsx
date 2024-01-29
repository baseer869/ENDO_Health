import {getUserInfo} from 'apis/userApi';
import {colors} from 'assets/colors';
import {Image, Text} from 'components/common';
import icons from 'components/icons';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {setUserInfo} from 'stores/UserInfoStore';

const LoadingModal = (props: {
  visible: boolean;
  onClose: () => void;
  name: string;
  mainText: string;
}) => {
  const {visible, onClose, name, mainText} = props;
  const width = Dimensions.get('screen').width / 1.2;
  const rotation = useSharedValue(0);
  const dispatch = useDispatch();

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <Text
          style={{
            fontSize: 28,
            color: colors.GRAY_100,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          {mainText ? mainText : `Now building ${name} home screens`}
        </Text>
        <Animated.View style={[{marginTop: '40%'}, animatedStyle]}>
          <Image
            style={{width, height: width}}
            resizeMode="contain"
            source={icons.loadingImage}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: '40%',
  },
});

export default LoadingModal;
