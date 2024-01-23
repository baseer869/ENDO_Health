import {SafeAreaView, Text, View} from 'components/common';
import BasicInput from 'components/common/BasicInput';
import i18n from 'language/i18n';
import Home from 'pages/Home';
import React, {useState} from 'react';
import CircleButton from '../../components/common/CircleArrowButton';
import useKeyboard from 'hooks/useKeyboard';
import {Platform, StyleSheet} from 'react-native';
import CancelTextInput from 'components/common/CancelTextInput';
import {useNavigation} from '@react-navigation/core';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {colors} from 'assets/colors';
import {RouteProp, useRoute} from '@react-navigation/native';

const PasswordInputPage = () => {
  const [keyboardHeight] = useKeyboard();
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'PasswordInput'>>();

  const checkPassword = (text?: string): boolean => {
    console.log('checkpasword', text);
    if (!text) {
      setPasswordError('Please enter your password');
      return false;
    }
    if (password.length > 4) {
      setPasswordError('');
      return true;
    }
    setPasswordError('Please enter correct password format.');

    return false;
  };

  const onChangePw = (text: string) => {
    setPassword(text);

    const check = checkPassword(text);
    setIsValid(check);
  };

  return (
    <View style={{paddingHorizontal: 28, backgroundColor: 'white', flex: 1}}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 28,
            paddingBottom: 64,
            color: 'black',
          }}
          className="font-bold text-[28px] pb-16 text-black">
          {'Let’s say hi\nWhat’s your password?'}
        </Text>
        <CancelTextInput
          value={password}
          onChangeText={onChangePw}
          placeholder={'Enter your password'}
          placeholderTextColor={colors.GRAY_30}
          isValid={isValid}
          secureTextEntry
        />

        {!isValid && <Text style={styles.errorText}>{passwordError}</Text>}
      </View>
      <View className="w-full items-end pb-5">
        <CircleButton
          disabled={!isValid}
          onPress={() =>
            navigation.push('NameInput', {email: route.params.email, password})
          }
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

export default PasswordInputPage;
