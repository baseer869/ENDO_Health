import {colors} from 'assets/colors';
import React, {forwardRef, useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';

interface Props extends TextInputProps {
  isValid?: boolean;
}
const BasicInput = forwardRef<any, Props>((props, ref) => {
  const {isValid = true} = props;
  const [isFocus, setIsFocus] = useState(false);

  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleFocus = () => {
    setIsFocus(true);
  };
  return (
    <TextInput
      style={{
        borderBottomWidth: 2,
        borderColor: !isValid
          ? colors.PRIMARY_RED
          : isFocus
          ? colors.PRIMARY_BLUE
          : colors.GRAY_30,
        fontSize: 20,
        color: colors.GRAY_90,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
});

export default BasicInput;
