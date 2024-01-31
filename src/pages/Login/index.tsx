import {SafeAreaView, Text, View} from 'components/common';

import React, {useState} from 'react';
import CircleButton from '../../components/common/CircleArrowButton';
import useKeyboard from 'hooks/useKeyboard';
import {Platform, StyleSheet} from 'react-native';
import CancelTextInput from 'components/common/CancelTextInput';
import {useNavigation} from '@react-navigation/core';
import {RootStackScreenProps} from 'navigation/rootNavigation';
import {colors} from 'assets/colors';
import BackHeader from 'components/common/BackHeader';
import RoundButton from 'components/common/RoundButton';
import {postLogin} from 'apis/userApi';
import {useDispatch} from 'react-redux';
import {setUserInfo} from 'stores/UserInfoStore';
import {setToken} from 'apis/apiConstants';
import {isPasswordValid} from 'utils/numbers';

const Login = () => {
  const dispatch = useDispatch();
  const [keyboardHeight] = useKeyboard();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [idValid, setIdValid] = useState<boolean>(true);
  const [pwValid, setPwValid] = useState<boolean>(true);
  const navigation = useNavigation<RootStackScreenProps>();

  const checkEmail = (text?: string): boolean => {
    const emailReg =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!text) {
      setEmailError('Please enter your e-mail');
      return false;
    }
    const lastText = text?.slice(text.length - 1, text.length);
    if (
      emailReg.test(text) &&
      (lastText === 'r' ||
        lastText === 't' ||
        lastText === 'g' ||
        lastText === 'm')
    ) {
      setEmailError('');
      return true;
    }
    setEmailError('Please enter correct email format.');

    return false;
  };

  const onChangeEmail = (text: string) => {
    setEmail(text);

    const check = checkEmail(text);
    setIdValid(check);
  };

  const checkPassword = (text?: string): boolean => {
    if (!text) {
      setPasswordError('Please enter your password');
      return false;
    }
    if (isPasswordValid(text)) {
      setPasswordError('');
      return true;
    }
    setPasswordError(
      'Password must be 8 characters or longer. It must have numbers, characters or special characters.',
    );

    return false;
  };

  const onChangePw = (text: string) => {
    setPassword(text);

    const check = checkPassword(text);
    setPwValid(check);
  };

  const login = async () => {
    const res = await postLogin({email, password});
    dispatch(setUserInfo(res));
    if (res.accessToken) setToken(res.accessToken);
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <BackHeader />

      <View style={{paddingHorizontal: 28, backgroundColor: 'white', flex: 1}}>
        <Text
          style={{
            fontSize: 28,
            color: colors.GRAY_100,
            fontWeight: '700',
            marginBottom: 66,
            marginTop: 10,
          }}>
          Sign in with email
        </Text>
        <View style={{}}>
          <Text style={{fontSize: 13, color: colors.GRAY_60}}>Email</Text>
          <CancelTextInput
            value={email}
            onChangeText={onChangeEmail}
            placeholder={'name@example.com'}
            placeholderTextColor={colors.GRAY_30}
            isValid={idValid}
          />

          {!idValid && <Text style={styles.errorText}>{emailError}</Text>}
        </View>

        <View style={{marginTop: 34}}>
          <Text style={{fontSize: 13, color: colors.GRAY_60}}>Password</Text>
          <CancelTextInput
            value={password}
            onChangeText={onChangePw}
            placeholder={'Enter password'}
            placeholderTextColor={colors.GRAY_30}
            isValid={pwValid}
          />

          {!pwValid && <Text style={styles.errorText}>{passwordError}</Text>}
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginBottom: 30}}>
        <RoundButton
          text="Sign in"
          onPress={login}
          isRightArrow={false}
          disabled={!idValid || !pwValid || !email || !password}
        />
      </View>

      {Platform.OS === 'ios' && <View style={{height: keyboardHeight}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.PRIMARY_RED,
    fontSize: 12,
    marginTop: 8,
    paddingLeft: 2,
  },
});

export default Login;
