import {SafeAreaView, Text, View} from 'components/common';
import i18n from 'language/i18n';
import React, {useState} from 'react';

import BackHeader from 'components/common/BackHeader';
import DatePicker from 'react-native-date-picker';
import CircleButton from 'components/common/CircleArrowButton';
import {useRoute, RouteProp} from '@react-navigation/core';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {postSignup} from 'apis/userApi';
import {useNavigation} from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { colors } from 'assets/colors';
import { fonst } from 'assets/fonts';

const BirthdaySelectPage = () => {
  const [changeDateState, setChangeDateState] = useState<Date>(new Date());
  const route = useRoute<RouteProp<RootStackParamList, 'BirthdaySelect'>>();
  const navigation = useNavigation<RootStackScreenProps>();
  const {email, password, name, gender} = route.params;

  const onNext = async () => {
    navigation.push('SignupDone', {
      name,
      email: email,
      birthday: changeDateState,
      gender,

      password: password,
    });
  };
      {/* Re-style  by Baseer */}
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <BackHeader />
      <View style={{flex: 1, paddingHorizontal: 28, marginTop: 16}}>
        <Text
          style={styles.title}>
          {i18n.t('Login.birthday_title')}
        </Text>
        <View
          style={{
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom:"10%"
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
    </SafeAreaView>
  );
};

export default BirthdaySelectPage;

const styles = StyleSheet.create({
  title:{
    fontSize: 28,
    lineHeight:35,
    color: colors.GRAY_100,
    fontFamily: fonst.Pretendard_Bold,
    paddingTop:12,
    paddingBottom: 64,
  }
});