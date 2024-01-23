import {SafeAreaView, Text, View} from 'components/common';
import i18n from 'language/i18n';
import React, {useState} from 'react';

import useKeyboard from 'hooks/useKeyboard';
import {Platform} from 'react-native';
import CancelTextInput from 'components/common/CancelTextInput';
import BackHeader from 'components/common/BackHeader';
import CircleButton from 'components/common/CircleArrowButton';
import GenderButton from './components/GenderButton';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';

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

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackHeader />
      <View style={{flex: 1, paddingHorizontal: 28, marginTop: 16}}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 28,
            marginBottom: 64,
            color: 'black',
          }}>
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
      </View>
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
              name: route.params.name,
              gender: GenderArray[selectedIndex].text,
            });
          }}
        />
      </View>
      {Platform.OS === 'ios' && <View style={{height: keyboardHeight}} />}
    </View>
  );
};

export default GenderSelectPage;
