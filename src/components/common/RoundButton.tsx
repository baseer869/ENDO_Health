import {RightArrow} from 'assets/svgIcons';
import {TouchableOpacity, View, Text} from 'react-native';

interface Props {
  onPress: () => void;
  text: string;
}

const RoundButton = (props: Props) => {
  const {onPress, text} = props;

  return (
    <TouchableOpacity
      className="bg-primary-blue rounded-[24px] px-5 py-3 w-full"
      onPress={onPress}>
      <View className="flex-row w-full justify-center items-center">
        <Text className=" text-white font-bold text-[17px]">{text}</Text>
        <RightArrow className="ml-2 " />
      </View>
    </TouchableOpacity>
  );
};
export default RoundButton;
