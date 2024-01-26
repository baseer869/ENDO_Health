import {colors} from 'assets/colors';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Svg, Path} from 'react-native-svg';

interface DropdownListItemProps {
  isSelected?: boolean;
  title?: string;
  subText?: string;
  disabled?: boolean;
  onPress?: () => void;
}

export default function RadioListItem(props: DropdownListItemProps) {
  const {title, isSelected, disabled, subText, onPress} = props;
  const styles = isSelected ? selectedStyles : defaultStyles;
  return (
    <TouchableOpacity
      style={[styles.container, disabled ? styles.disabled : undefined]}
      disabled={disabled}
      onPress={onPress}>
      <View style={styles.leftContainer}>
        <Text style={styles.title}>{title}</Text>
        {/* {!!subText && <Text style={styles.subText}>{subText}</Text>} */}
      </View>

      <View
        style={[
          styles.rightContainer,
          {backgroundColor: isSelected ? colors.PRIMARY_BLUE : 'transparent'},
        ]}>
        <View
          style={[
            styles.smallCircle,
            {borderColor: isSelected ? colors.GRAY_30 : 'transparent'},
          ]}></View>
      </View>
    </TouchableOpacity>
  );
}
const commomStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    width: 24,
    height: 24,
    borderColor: colors.GRAY_30,
  },
  smallCircle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    borderWidth: 1,
    width: 6.5,
    height: 6.5,
    backgroundColor: 'white',
  },
  disabled: {
    opacity: 0.5,
  },
  subText: {
    fontSize: 14,
    color: colors.GRAY_100,
    lineHeight: 20,
  },
});

const defaultStyles = StyleSheet.create({
  ...commomStyle,
  title: {
    color: colors.GRAY_100,

    fontSize: 16,
    fontWeight: '600',

    lineHeight: 24,
  },
});

const selectedStyles = StyleSheet.create({
  ...commomStyle,
  title: {
    color: colors.GRAY_100,

    fontSize: 16,
    fontWeight: '600',

    lineHeight: 24,
  },
});
