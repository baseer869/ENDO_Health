import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {colors} from 'assets/colors';
import {RightArrow, TermIcon} from 'assets/svgIcons';
import axios from 'axios';
import {Text} from 'components/common';
import BackHeader from 'components/common/BackHeader';
import CheckboxListItem from 'components/common/CheckboxListItem';
import RadioListItem from 'components/common/RadioListItem';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserInfo} from 'stores/UserInfoStore';

export default function PrivacyPolicyAgreePage() {
  const route = useRoute<RouteProp<RootStackParamList, 'PrivacyPolicyAgree'>>();
  const {name, birthday, password, gender, email} = route.params;
  const navigation = useNavigation<RootStackScreenProps>();
  const [ageCheck, setAgeCheck] = useState(false);
  const [termsCheck, setTermsCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const isValid = ageCheck && termsCheck && privacyCheck;
  const dispatch = useDispatch();

  const signup = async () => {
    if (isValid)
      navigation.push('SignupDone', {
        name,
        email: email,
        birthday,
        gender,

        password: password,
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackHeader />
      <View style={styles.container}>
        <TermIcon />
        <Text style={styles.title1}>
          {'User agreement and\nPrivacy Policy'}
        </Text>
        <Text style={styles.title2}>
          {'Please read and agree to start your\nEndo Health journey'}
        </Text>
      </View>

      <View
        style={{
          marginBottom: 30,
        }}>
        <View style={{paddingHorizontal: 10}}>
          <CheckboxListItem
            onPress={() => setAgeCheck(!ageCheck)}
            isSelected={ageCheck}
            title="I am 18 years old or above"
            radioPosition="left"
            isRightArrow={false}
          />
          <CheckboxListItem
            onPress={() => setTermsCheck(!termsCheck)}
            isSelected={termsCheck}
            title="I agree to terms and conditions"
            radioPosition="left"
            rightOnPress={() => {
              navigation.push('TermWebView', {
                url: 'https://app.termly.io/document/terms-of-service/b922f821-029c-4a2d-bb7b-1758ddf42209',
              });
            }}
          />
          <CheckboxListItem
            onPress={() => setPrivacyCheck(!privacyCheck)}
            isSelected={privacyCheck}
            title="I agree to privacy policy"
            radioPosition="left"
            rightOnPress={() => {
              navigation.push('TermWebView', {
                url: 'https://app.termly.io/document/privacy-policy/2355b0db-3909-43c1-a00c-cd0b4a7b7f69',
              });
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 30,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: isValid ? colors.PRIMARY_BLUE : colors.GRAY_5,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 25,
    alignItems: 'center',
  },
  title1: {
    color: colors.GRAY_60,
    fontFamily: 'Pretendard',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 35,
    textAlign: 'center',
  },
  title2: {
    color: colors.GRAY_60,
    fontFamily: 'Pretendard',
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 4,
    textAlign: 'center',
  },
  subText: {color: colors.GRAY_60},
  read: {
    textDecorationLine: 'underline',
  },
});
