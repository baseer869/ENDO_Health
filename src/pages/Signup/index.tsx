import {SafeAreaView, Text, View} from 'components/common';
import BasicInput from 'components/common/BasicInput';
import i18n from 'language/i18n';
import Home from 'pages/Home/Home';
import React, {useState} from 'react';
import CircleButton from '../../components/common/CircleArrowButton';
import useKeyboard from 'hooks/useKeyboard';
import {Platform, StyleSheet} from 'react-native';
import CancelTextInput from 'components/common/CancelTextInput';
import {useNavigation} from '@react-navigation/core';
import {RootStackScreenProps} from 'navigation/rootNavigation';
import {colors} from 'assets/colors';
import { fonts } from 'assets/fonts';

const EmailInputPage = () => {
  const [keyboardHeight] = useKeyboard();
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState('');
  const [idValid, setIdValid] = useState<boolean>(true);
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

  return (
    <View style={{paddingHorizontal: 28, backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1}}>
        {/* Re-style by Baseer */}
        <Text
          style={styles.title}
         >
          {'Let’s say hi\nWhat’s your email?'}
        </Text>
        <CancelTextInput
          value={email}
          onChangeText={onChangeEmail}
          placeholder={'Enter your email'}
          placeholderTextColor={colors.GRAY_30}
          isValid={idValid}
        />

        {!idValid && <Text style={styles.errorText}>{emailError}</Text>}
      </View>
      <View className="w-full items-end pb-5">
        <CircleButton
          disabled={!idValid}
          onPress={() => navigation.push('PasswordInput', {email})}
        />
      </View>
      {Platform.OS === 'ios' && <View style={{height: keyboardHeight}} />}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: colors.PRIMARY_RED,
    fontSize: 14,
    marginTop: 8,
    paddingLeft: 2,
    lineHeight:21,
    fontFamily: fonts.Pretendard_Regular
  },
  title:{
    fontSize: 28,
    lineHeight:35,
    color: 'black',
    fontFamily: fonts.Pretendard_Bold,
    paddingTop:12,
    paddingBottom: 64,
  }
});

export default EmailInputPage;
