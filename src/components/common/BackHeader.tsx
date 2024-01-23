import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {colors} from 'assets/colors';
import {BackArrow} from 'assets/svgIcons';

interface Props {
  title?: string;
  onBackPress?: () => void;
}
const BackHeader = ({title, onBackPress}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          if (onBackPress) {
            onBackPress();
          } else {
            navigation.goBack();
          }
        }}
        style={styles.backButton}>
        <BackArrow />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    color: colors.PRIMARY_BLACK,
    fontWeight: '500',
  },
});

export default BackHeader;
