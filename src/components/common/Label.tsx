import { fonts } from 'assets/fonts';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  text?: string;
}
export default function Label(props: Props) {
  const {text} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 6,
    paddingHorizontal: 0,
  },
  label: {
    color: 'rgba(98, 112, 121, 1)',
    fontFamily: fonts.Pretendard_Regular,
    lineHeight:18,
    fontSize: 15,
  },
});
