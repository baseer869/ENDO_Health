import {colors} from 'assets/colors';
import {Text} from 'components/common';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

export default function GenderButton(props: {
  emoji: string;
  text: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const {emoji, text, selected, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-gray-5 flex-row items-center justify-center px-5 py-6 rounded-[10px]"
      style={{backgroundColor: selected ? colors.PRIMARY_BLUE : colors.GRAY_5}}>
      <View className="flex-row items-center gap-x-1.5">
        <Text className="text-2xl">{emoji}</Text>
        <Text
          className="text-xl font-bold"
          style={{color: selected ? colors.GRAY_0 : colors.GRAY_100}}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
