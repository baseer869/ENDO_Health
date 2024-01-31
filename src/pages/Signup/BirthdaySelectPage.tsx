import {SafeAreaView, Text, View} from 'components/common';
import i18n from 'language/i18n';
import React, {useState} from 'react';

import BackHeader from 'components/common/BackHeader';
import DatePicker from 'react-native-date-picker';
import CircleButton from 'components/common/CircleArrowButton';
import {Alert} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/core';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {postSignup} from 'apis/userApi';
import {useNavigation} from '@react-navigation/native';

const BirthdaySelectPage = () => {
  const [changeDateState, setChangeDateState] = useState<Date>(new Date());
  const route = useRoute<RouteProp<RootStackParamList, 'BirthdaySelect'>>();
  const navigation = useNavigation<RootStackScreenProps>();
  const {email, password, name, gender} = route.params;

  const onNext = async () => {
    navigation.push('PrivacyPolicyAgree', {
      name,
      email: email,
      birthday: changeDateState,
      gender,

      password: password,
    });
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackHeader />
      <View style={{flex: 1, paddingHorizontal: 28, marginTop: 16}}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 28,
            paddingBottom: 64,
            color: 'black',
          }}>
          {i18n.t('Login.birthday_title')}
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <DatePicker
            textColor="black"
            mode="date"
            date={changeDateState ? changeDateState : new Date()}
            onDateChange={setChangeDateState}
            onConfirm={date => console.log('onConfirm', date)}
            androidVariant="iosClone"
          />
        </View>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          paddingBottom: 20,
          paddingHorizontal: 28,
        }}>
        <CircleButton disabled={false} onPress={onNext} />
      </View>
    </View>
  );
};

export default BirthdaySelectPage;
