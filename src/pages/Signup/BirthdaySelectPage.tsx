import {SafeAreaView, Text, View} from 'components/common';
import i18n from 'language/i18n';
import React, {useState} from 'react';

import BackHeader from 'components/common/BackHeader';
import DatePicker from 'react-native-date-picker';
import CircleButton from 'components/common/CircleArrowButton';
import {Alert} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/core';
import {RootStackParamList} from 'navigation/rootNavigation';

const BirthdaySelectPage = () => {
  const [changeDateState, setChangeDateState] = useState<Date>(new Date());
  const route = useRoute<RouteProp<RootStackParamList, 'BirthdaySelect'>>();
  const {name, gender} = route.params;
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
        <CircleButton
          disabled={false}
          onPress={() => {
            //TODO APi연동
            Alert.alert(
              '정보',
              name + ':' + gender + ':' + changeDateState?.toISOString(),
            );
          }}
        />
      </View>
    </View>
  );
};

export default BirthdaySelectPage;
