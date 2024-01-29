import {colors} from 'assets/colors';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Svg, Path} from 'react-native-svg';

export default function CircleButton(props: {
  disabled: boolean;
  onPress: () => void;
}) {
  const {disabled, onPress} = props;

  return (
    // Re-style by Baseeer 
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={disabled ? [styles.nextButton, { backgroundColor: colors.GRAY_10 }]:[styles.nextButton, { backgroundColor: colors.PRIMARY_BLUE }] }
      >
      <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7641 0.243625C11.6209 0.100432 11.3888 0.100432 11.2456 0.243625L10.3381 1.15108C10.195 1.29427 10.195 1.52643 10.3381 1.66962L15.6602 6.99168H1.09983C0.897326 6.99168 0.733164 7.15584 0.733164 7.35835V8.64168C0.733164 8.84418 0.897326 9.00835 1.09983 9.00835H15.6602L10.3381 14.3304C10.195 14.4736 10.195 14.7058 10.3381 14.8489L11.2456 15.7564C11.3888 15.8996 11.6209 15.8996 11.7641 15.7564L19.2613 8.25929C19.4045 8.11609 19.4045 7.88393 19.2613 7.74074L11.7641 0.243625Z"
          fill="white"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nextButton: {
    paddingTop:12,
    padding:13,
    borderRadius:24,
    height:48,
    width:48,
    justifyContent:'center',
    alignItems:'center'
  },
});