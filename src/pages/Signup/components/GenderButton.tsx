import { colors } from 'assets/colors';
import { fonts } from 'assets/fonts';
import { Text } from 'components/common';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function GenderButton(props: {
  emoji: string;
  text: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  const { emoji, text, selected, onPress } = props;
  // Re-style the gender section //
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.genderSelection,  selected ? [{ backgroundColor: colors.PRIMARY_BLUE , borderWidth:0 }]: [{ backgroundColor: colors.GRAY_5  }] ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8 }}>
        <Text style={{ fontSize: 24 }}>{emoji}</Text>
        <Text
          style={{ ...styles.text, color: selected ? colors.GRAY_0 : colors.GRAY_100 }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  genderSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height:96,
    borderWidth: 0.5,
    borderColor: colors.GRAY_20,
  },
  text: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: fonts.Pretendard_Bold,
  }
});