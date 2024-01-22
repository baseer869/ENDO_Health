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
          borderColor: isFocus ? colors.PRIMARY_BLUE : colors.GRAY_30,
          paddingBottom: 8,
        },
        containerStyle,
      ]}>
      <BasicInput
        className="p-0"
        style={{flex: 1}}
        ref={ref}
        {...sendProps}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
