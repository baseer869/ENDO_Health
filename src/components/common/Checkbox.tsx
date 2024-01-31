import {colors} from 'assets/colors';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const Checkbox = (props: {isSelected?: boolean}) => {
  const {isSelected} = props;

  return (
    <View
      style={[
        styles.rightContainer,
        {backgroundColor: isSelected ? colors.PRIMARY_BLUE : 'transparent'},
      ]}>
      <Svg width="11" height="8" viewBox="0 0 11 8" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.9224 0.925624C11.0005 1.00373 11.0005 1.13036 10.9224 1.20847L4.23938 7.89148C4.16128 7.96959 4.03464 7.96959 3.95654 7.89148L0.858261 4.79321C0.780156 4.7151 0.780156 4.58847 0.858261 4.51036L1.35324 4.01539C1.43134 3.93728 1.55797 3.93728 1.63608 4.01539L4.09796 6.47727L10.1446 0.430649C10.2227 0.352544 10.3493 0.352544 10.4274 0.430649L10.9224 0.925624Z"
          fill={'white'}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Checkbox;
