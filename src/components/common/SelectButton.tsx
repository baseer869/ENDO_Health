import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import {Text} from './Text';
import {colors} from 'assets/colors';
import {TouchableOpacity} from 'react-native';

interface Props {
  placeholder?: string;
  onPress?: () => void;
  text?: string;
}

export default function rSelectButton(props: Props) {
  const {placeholder, onPress, text} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.elementsTextfield}>
        <Text style={text ? styles.text : styles.placeholder} numberOfLines={1}>
          {text ? text : placeholder}
        </Text>

        <View style={styles.icon_arrow_down_line_30}>
          <Svg width="14" height="9" viewBox="0 0 14 9" fill="none">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.134745 2.21583C0.0306054 2.11169 0.0306053 1.94284 0.134745 1.8387L1.07755 0.895894C1.18169 0.791755 1.35054 0.791755 1.45468 0.895895L6.9391 6.38031L12.4235 0.895894C12.5276 0.791754 12.6965 0.791754 12.8006 0.895894L13.7434 1.8387C13.8476 1.94284 13.8476 2.11169 13.7434 2.21583L7.22194 8.73733C7.06573 8.89354 6.81246 8.89354 6.65625 8.73733L0.134745 2.21583Z"
              fill="#D0D8DB"
            />
          </Svg>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingBottom: 10,

    borderBottomWidth: 2,
    borderBottomColor: colors.GRAY_20,
  },
  elementsTextfield: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    flexGrow: 1,
    color: colors.GRAY_30,
    fontFamily: 'Pretendard',
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 24,
  },
  text: {
    flexGrow: 1,
    color: colors.GRAY_100,
    fontFamily: 'Pretendard',
    fontSize: 20,
    letterSpacing: 0,
    lineHeight: 24,
  },
  icon_arrow_down_line_30: {
    height: 16,
    width: 16,
  },
});
