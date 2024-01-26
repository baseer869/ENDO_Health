import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {setToken} from 'apis/apiConstants';
import {postSignup} from 'apis/userApi';
import {colors} from 'assets/colors';
import {RightArrow} from 'assets/svgIcons';
import axios from 'axios';
import {Text} from 'components/common';
import BackHeader from 'components/common/BackHeader';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
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
    if (res.accessToken) setToken(res.accessToken);
  };

  return (
    <View style={{flex: 1}}>
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
          <Text style={styles.read}>Read</Text> what we do to keep you private
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: colors.PRIMARY_BLUE,
            borderRadius: 24,
            paddingHorizontal: 5,
            marginTop: 40,
            width: '100%',
          }}
          onPress={signup}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
            }}>
            <Text style={{color: 'white', fontWeight: '700', fontSize: 17}}>
              Continue
            </Text>
            <RightArrow style={{marginLeft: 8}} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    fontFamily: 'Pretendard',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 35,
  },
  title2: {
    color: colors.GRAY_100,
    fontFamily: 'Pretendard',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 35,
    marginTop: 30,
  },
  subText: {color: colors.GRAY_60},
  read: {
    textDecorationLine: 'underline',
  },
});
