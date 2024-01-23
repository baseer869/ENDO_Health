import {useNavigation} from '@react-navigation/native';
import {colors} from 'assets/colors';
import {BackArrow, LoginLogo, LoginLogoText, RightArrow} from 'assets/svgIcons';
import {Image, Text, Button} from 'components/common';
import {RootStackScreenProps} from 'navigation/rootNavigation';

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

export default function Login() {
  const navigation = useNavigation<RootStackScreenProps>();
  return (
    <View className="flex-1 items-center bg-white px-5 pt-[30%]">
      <View className="items-center justify-center ">
        <LoginLogo />
      </View>

      <View className="items-center mr-4 mt-10">
        <View className="mb-1">
          <LoginLogoText />
        </View>
        <Text className="font-bold text-[18px] text-gray-80">
          {`One-liner description goes here`}
        </Text>
      </View>

      <TouchableOpacity
        className="bg-primary-blue rounded-[24px] px-5 py-3 w-full mt-[100%]"
        onPress={() => navigation.push('Signup')}>
        <View className="flex-row w-full justify-center items-center">
          <Text className=" text-white font-bold text-[17px]">Get start</Text>
          <RightArrow className="ml-2 " />
        </View>
      </TouchableOpacity>

      <View className="mt-2">
        <Text className="font-bold text-[16px] text-gray-60">
          Already a member?{' '}
          <Text
            className="font-bold text-[16px] text-primary-blue"
            style={{color: colors.PRIMARY_BLUE}}>
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
}
