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
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 24,
        borderRadius: 10,
        backgroundColor: selected ? colors.PRIMARY_BLUE : colors.GRAY_5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', rowGap: 6}}>
        <Text style={{fontSize: 24}}>{emoji}</Text>
        <Text
          style={{
            color: selected ? colors.GRAY_0 : colors.GRAY_100,
            fontWeight: '700',
            fontSize: 20,
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
