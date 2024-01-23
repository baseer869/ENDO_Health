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
    <View className=" bg-white flex-1">
      <BackHeader />
      <View className="flex-1 px-7 mt-4">
        <Text className="font-bold text-[28px] pb-16 text-black">
          {i18n.t('Login.birthday_title')}
        </Text>
        <View className=" w-full justify-center items-center">
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
      <View className="w-full items-end pb-5 px-7">
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
