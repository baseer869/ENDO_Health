import {StyledCommonProps, Text, View, Image} from '.';
import {colors} from 'assets/colors';
import {styled} from 'nativewind';
import {Button as OriginalButton} from 'react-native-paper';

const Btn = styled(OriginalButton);

const typeStyles: Record<string, any> = {
  solid: {
    buttonColor: colors.PRIMARY_BLUE,
    textColor: '#FFFFFF',
  },
  sub: {
    buttonColor: colors.BLUE_10,
    textColor: colors.PRIMARY_BLUE,
  },
  sub_gray: {
    buttonColor: colors.GRAY_5,
    textColor: colors.GRAY_100,
  },
  sub_white: {
    buttonColor: '#FFFFFF',
    textColor: colors.GRAY_100,
    borderColor: colors.GRAY_30,
    borderWidth: 0.5,
  },
  sub_border: {
    buttonColor: '#FFFFFF',
    textColor: colors.PRIMARY_BLUE,
    borderColor: colors.PRIMARY_BLUE,
    borderWidth: 1.5,
  },
  disabled: {
    buttonColor: colors.GRAY_5,
    textColor: '#FFFFFF',
  },
};

const sizeStyles = {
  '48': {
    fontSize: 17,
    paddingVertical: 4,
    paddingHorizontal: 0,
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    gap: 6,
    iconSize: 18,
  },
  '44': {
    fontSize: 15,
    paddingVertical: 4,
    paddingHorizontal: 0,
    // paddingVertical: 12,
    // paddingHorizontal: 20,
    gap: 6,
    iconSize: 16,
  },
  '34': {
    fontSize: 14,
    paddingVertical: 2.5,
    paddingHorizontal: 0,
    // paddingVertical: 8,
    // paddingHorizontal: 18,
    gap: 4,
    iconSize: 14,
  },
  '30': {
    fontSize: 13,
    paddingVertical: 2,
    paddingHorizontal: 0,
    // paddingVertical: 7,
    // paddingHorizontal: 14,
    gap: 4,
    iconSize: 12,
  },
};

type StyledButtonProps = {
  size?: '48' | '44' | '34' | '30';
  width?: 'fit' | 'full';
  type?: 'solid' | 'sub' | 'sub_gray' | 'sub_white' | 'sub_border' | 'disabled';
  icon?: string;
  title: string;
  subTitle?: string;
  onPress?: () => void;
};

export function Button({
  className,
  children,
  size,
  type,
  icon,
  width,
  title,
  onPress,
}: StyledCommonProps & StyledButtonProps) {
  const {buttonColor, textColor, borderColor, borderWidth} =
    typeStyles[type || 'solid'];
  const {fontSize, paddingVertical, paddingHorizontal, iconSize, gap} =
    sizeStyles[size || '48'];
  const disabled = type === 'disabled';
  let buttonType = 'contained';
  if (type == 'solid') buttonType = 'contained';
  if (type == 'sub') buttonType = 'contained-tonal';
  if (type == 'sub_gray') buttonType = 'evevated';
  if (type == 'sub_white') buttonType = 'outlined';
  if (type == 'sub_border') buttonType = 'outlined';

  return (
    <Btn
      className={className}
      disabled={disabled}
      icon={icon}
      mode="contained"
      buttonColor={buttonColor}
      labelStyle={{
        color: textColor,
        fontSize,
        textAlign: 'center',
      }}
      style={{
        width: 'full' === width ? '100%' : 'auto',
        borderRadius: 50,
        borderColor,
        borderWidth,
        gap,
        zIndex: 0,
      }}
      contentStyle={{
        paddingHorizontal,
        paddingVertical,
      }}
      onPress={onPress}>
      <Text className="font-bold">{title}</Text>
      {children}
    </Btn>
  );
}
