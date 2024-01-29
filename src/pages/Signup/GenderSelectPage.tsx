import {Text, View} from 'components/common';
import i18n from 'language/i18n';
import React, {useState} from 'react';

import useKeyboard from 'hooks/useKeyboard';
import {Platform, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import BackHeader from 'components/common/BackHeader';
import CircleButton from 'components/common/CircleArrowButton';
import GenderButton from './components/GenderButton';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import { fonts } from 'assets/fonts';
import { colors } from 'assets/colors';

const GenderArray = [
  {emoji: '🙋‍♂️', text: 'Male'},
  {emoji: '🙋‍♀️', text: 'Female'},
  {emoji: '🙋', text: 'Non-binary'},
  {emoji: '🤍', text: 'Other'},
];

const GenderSelectPage = () => {
  const [keyboardHeight] = useKeyboard();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'GenderSelect'>>();
  const {email, password, name} = route.params;
  // Re-style by Baseer //
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <BackHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, paddingHorizontal: 28,}}>
        <Text
          style={styles.title}>
          {i18n.t('Login.gender_title')}
        </Text>
        {GenderArray.map((data, index) => {
          return (
            <View key={data.text}>
              <GenderButton
                emoji={data.emoji}
                text={data.text}
                selected={index === selectedIndex}
                onPress={() => setSelectedIndex(index)}
              />
              <View style={{height: 16}} />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          paddingBottom: 20,
          paddingHorizontal: 28,
        }}>
        <CircleButton
          disabled={selectedIndex === -1}
          onPress={() => {
            navigation.push('BirthdaySelect', {
              name,
              email,
              password,
              gender: GenderArray[selectedIndex].text,
            });
          }}
        />
      </View>
      {Platform.OS === 'ios' && <View style={{height: keyboardHeight}} />}
    </SafeAreaView>
  );
};

export default GenderSelectPage;

const styles = StyleSheet.create({
  title:{
    fontSize: 28,
    lineHeight:35,
    color: colors.GRAY_100,
    fontFamily: fonts.Pretendard_Bold,
    paddingTop:12,
    paddingBottom: 64,
  }
});