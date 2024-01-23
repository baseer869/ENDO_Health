import {colors} from 'assets/colors';
import React, {forwardRef, useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';

const BasicInput = forwardRef<any, TextInputProps>((props, ref) => {
  const [isFocus, setIsFocus] = useState(false);
  const focusClassName = 'text-[22px] text-gray-90 pb-3 ';

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
        borderColor: isFocus ? colors.PRIMARY_BLUE : colors.GRAY_30,
        fontSize: 20,
        color: colors.GRAY_90,
        padding: 0,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    />
  );
});

export default BasicInput;
