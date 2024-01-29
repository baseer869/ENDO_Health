import {colors} from 'assets/colors';
import { fonts } from 'assets/fonts';
import {Text} from 'components/common';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  values: string[];
  onChange: (value: string) => void;
  value: string;
}

export default function ButtonSwitch(props: Props) {
  const {value, values, onChange} = props;

  return (
    <View style={styles.container}>
      {values.map(d => {
        const isChecked = d === value;
        return (
          <TouchableOpacity
            style={isChecked ? styles.on : styles.off}
            onPress={() => onChange(d)}>
            <Text style={isChecked ? styles.text_on : styles.text_off}>
              {d}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flex: 1,
    backgroundColor: colors.GRAY_5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  on: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
    borderColor: colors.GRAY_20,
    borderRadius: 6,
  },
  text_on: {
    textAlign: 'center',
    color: 'black',
    fontFamily: fonts.Pretendard_Bold,
    fontSize: 15,
    lineHeight: 18,
  },
  off: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_off: {
    textAlign: 'center',
    color: colors.GRAY_50,
    fontFamily: fonts.Pretendard_Bold,
    fontSize: 15,
    lineHeight: 18,
  },
});
