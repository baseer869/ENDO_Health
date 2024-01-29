import {colors} from 'assets/colors';
import {RightArrow} from 'assets/svgIcons';
import {TouchableOpacity, View, Text} from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
  isRightArrow?: boolean;
  disabled?: boolean;
}

const RoundButton = (props: Props) => {
  const {onPress, text, isRightArrow = true, disabled = false} = props;

  return (
    <TouchableOpacity
      style={{
        backgroundColor: disabled ? colors.GRAY_5 : colors.PRIMARY_BLUE,
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: '100%',
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 17}}>
          {text}
        </Text>
        {isRightArrow && <RightArrow className="ml-2 " />}
      </View>
    </TouchableOpacity>
  );
};
export default RoundButton;
