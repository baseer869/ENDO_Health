import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import { RightArrow } from 'assets/svgIcons';
import { colors } from 'assets/colors';
import { fonst, fonts } from 'assets/fonts';

// Common Action Button, by Baseer //
interface CustomButtonProps extends TouchableOpacityProps {
  label: string;
  arrow: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({onPress, label, arrow,}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.button, !arrow && { height: 44 }]} >
      <Text style={styles.buttonText}>{label}</Text>
      {arrow && <RightArrow style={styles.icon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PRIMARY_BLUE,
    borderRadius: 24,
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48
  },
  buttonText: {
    color: 'white',
    fontFamily: fonts.Pretendard_Bold,
    lineHeight:20.4,
    fontSize: 17,
  },
  icon: {
    marginLeft: 8,
  },
});

export default CustomButton;
