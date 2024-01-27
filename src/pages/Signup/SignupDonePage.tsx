import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {postSignup} from 'apis/userApi';
import {colors} from 'assets/colors';
import { fonst } from 'assets/fonts';
import {Text} from 'components/common';
import CustomButton from 'components/common/ActionButton';
import BackHeader from 'components/common/BackHeader';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserInfo} from 'stores/UserInfoStore';

export default function SignupDonePage() {
  const route = useRoute<RouteProp<RootStackParamList, 'SignupDone'>>();
  const {name, birthday, password, gender, email} = route.params;
  const navigation = useNavigation<RootStackScreenProps>();
  const dispatch = useDispatch();

  const signup = async () => {
    const res = await postSignup({
      username: name,
      email: email,
      birthDay: birthday,
      gender,

      password: password,
    });
    dispatch(setUserInfo(res));
  };
// Re- style by Baseer 
  return (
    <SafeAreaView style={{flex: 1}}>
      <BackHeader />
      <View style={styles.container}>
        <Text style={styles.title1}>{`Looks great\n${name} 👏🏻`}</Text>
        <Text style={styles.title2}>
          {`Tell us a little\nabout your condition\nto let us help better`}
        </Text>
      </View>

      <View style={{marginBottom: 30, paddingHorizontal: 30}}>
        <Text style={styles.subText}>
          We take privacy seriously. Your medical data is yours. We won’t sell
          or benefit from your data in anyway.
        </Text>
        <View style={{height: 12}} />
        <Text
          style={styles.subText}
          onPress={() => {
            navigation.push('TermWebView');
          }}>
          <Text style={{textDecorationLine:'underline'}}>Read</Text> what we do to keep you private
        </Text>
        {/* Common Button */}
        <CustomButton label="Continue" arrow={true} onPress={signup} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 25,
  },
  title1: {
    color: colors.PRIMARY_BLUE,
    fontFamily: fonst.Pretendard_Bold,
    fontSize: 28,
    letterSpacing: 0,
    lineHeight: 35,
  },
  title2: {
    color: colors.GRAY_100,
    fontFamily: fonst.Pretendard_Bold,
    fontSize: 28,
    letterSpacing: 0,
    lineHeight: 35,
    marginTop: 30,
  },
  subText: {
    color: colors.GRAY_60,
    fontFamily: fonst.Pretendard_Regular,
    fontSize: 15,
    lineHeight: 21.7,
  },
});
