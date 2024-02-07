import {colors} from 'assets/colors';
import { fonts } from 'assets/fonts';
import {RightArrow} from 'assets/svgIcons';
import {
  TouchableOpacity,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
  isRightArrow?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const ArrowButton = (props: Props) => {
  const {
    onPress,
    text,
    isRightArrow = true,
    disabled = false,
    containerStyle,
    textStyle,
  } = props;
  return (
    <TouchableOpacity
       style={ disabled ? styles.onButton: {...styles.onButton,  ...styles.offButton}}
      onPress={onPress}
      activeOpacity={0.7}
      >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            {color: 'white', fontWeight: '700', fontSize: 17},
            textStyle,
          ]}>
          {text}
        </Text>
        {isRightArrow && <RightArrow className="ml-2 " />}
      </View>
    </TouchableOpacity>
  );
};
export default ArrowButton;


const styles = StyleSheet.create({
 
  Btnlabel: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.Pretendard_Bold,
    color: colors.GRAY_0,
  },
  onButton: {
    display: 'flex',
    height: 48,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    borderRadius: 24,
    backgroundColor: colors.PRIMARY_BLUE,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    width: '90%',
  },
  offButton: {
    backgroundColor: colors.GRAY_5,
  },
  errorText: {
    color: colors.PRIMARY_RED,
    fontSize: 12,
    marginTop: 8,
    paddingLeft: 2,
  },
});