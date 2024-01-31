import {colors} from 'assets/colors';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Svg, Path} from 'react-native-svg';
import Checkbox from './Checkbox';
import {RightArrowIcon} from 'assets/svgIcons';

interface DropdownListItemProps {
  isSelected?: boolean;
  title?: string;
  subText?: string;
  disabled?: boolean;
  onPress?: () => void;
  radioPosition?: 'right' | 'left';
  isRightArrow?: boolean;
  rightOnPress?: () => void;
}

export default function CheckboxListItem(props: DropdownListItemProps) {
  const {
    title,
    isSelected,
    disabled,
    subText,
    onPress,
    radioPosition = 'right',
    isRightArrow = true,
    rightOnPress,
  } = props;
  const styles = isSelected ? selectedStyles : defaultStyles;
  return (
    <View style={[styles.container, disabled ? styles.disabled : undefined]}>
      <TouchableOpacity
        style={{flex: 1, flexDirection: 'row'}}
        disabled={disabled}
        onPress={onPress}>
        {radioPosition === 'left' && (
          <View style={{marginRight: 16}}>
            <Checkbox isSelected={isSelected} />
          </View>
        )}
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{title}</Text>
          {/* {!!subText && <Text style={styles.subText}>{subText}</Text>} */}
        </View>
      </TouchableOpacity>
      {radioPosition === 'right' ? (
        <TouchableOpacity onPress={onPress}>
          <Checkbox isSelected={isSelected} />
        </TouchableOpacity>
      ) : (
        isRightArrow && (
          <TouchableOpacity onPress={rightOnPress}>
            <RightArrowIcon />
          </TouchableOpacity>
        )
      )}
    </View>
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
