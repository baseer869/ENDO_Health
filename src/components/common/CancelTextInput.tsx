import React, {useRef, useState} from 'react';
import {
  ColorValue,
  Image,
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {images} from 'assets/images/images';
import BasicInput from './BasicInput';
import {colors} from 'assets/colors';
import icons from 'components/icons';

interface Props extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  backgroundColor?: ColorValue;
  RightComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
  isValid?: boolean;
}
const defaultProps = {backgroundColor: colors.GRAY_40};

const CancelTextInput: React.FC<Props> = props => {
  const {
    value,
    onChangeText,
    backgroundColor,
    RightComponent,
    containerStyle,
    editable,
    isValid = true,
  } = props;
  const sendProps = {...props, backgroundColor: undefined};
  const ref = useRef<TextInput>(null);

  const [isFocus, setIsFocus] = useState(false);

  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleFocus = () => {
    setIsFocus(true);
  };

  const onPressClear = () => {
    ref.current?.clear();
    if (onChangeText) onChangeText('');
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          backgroundColor,
          alignItems: 'center',
          width: '100%',

          borderBottomWidth: 2,
          borderColor: !isValid
            ? colors.PRIMARY_RED
            : isFocus
            ? colors.PRIMARY_BLUE
            : colors.GRAY_20,
          paddingBottom: 8,
        },
        containerStyle,
      ]}>
      <BasicInput
        style={{flex: 1, padding: 0, fontSize: 20, color: colors.GRAY_90}}
        ref={ref}
        {...sendProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
        isValid={isValid}
      />
      {!!RightComponent && RightComponent}
      {Boolean(value) && editable !== false && (
        <TouchableOpacity onPress={onPressClear}>
          <Image
            style={{width: 22, height: 22}}
            source={icons.icon_cancel_circle_solid}
            tintColor={colors.GRAY_30}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

// CancelTextInput.defaultProps = defaultProps;
export default CancelTextInput;
