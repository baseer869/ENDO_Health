import { Text, View} from 'components/common';

import React from 'react';
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
import tokenStorage from 'storages/tokenStorage';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm, } from 'react-hook-form';

// login schema
const passwordValidationRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

const schema = yup.object().shape({
  email: yup.string().email().required('This is required.'),
  password: yup.string()
    .required('This is required.')
    .matches(
      passwordValidationRegex,
      'Password must be at least 8 characters long, include at least one number, and one special character.'
    ),
});
//--//
const Login = () => {
  const dispatch = useDispatch();
  const [keyboardHeight] = useKeyboard();
  const navigation = useNavigation<RootStackScreenProps>();

//--//
const {
  control,
  handleSubmit,
  formState: { errors, isValid, isDirty },
  reset,
  setError,
  
} = useForm({
  resolver: yupResolver(schema),
});

const login = async (formProps:any) => {
    let payload = {
      "email": formProps.email,
      "password": formProps.password,
    }
    const res = await postLogin(payload);
    console.log('\nresponse of login:',res);

    if(res?.statusCode == 201){
        dispatch(setUserInfo(res));
        tokenStorage.set(res.accessToken);
        setToken(res.accessToken);
        return
    } else  if(res?.statusCode == 401){
      setError('password', { message: res.message?.body });
      return;
    }
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
          <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CancelTextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={'name@example.com'}
                  placeholderTextColor={colors.GRAY_30}
                  isValid={!(errors.email)}
                />
              )}
              name="email"
            />

          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        <View style={{marginTop: 34}}>
          <Text style={{fontSize: 13, color: colors.GRAY_60}}>Password</Text>
          <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CancelTextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder={'Enter password'}
                  placeholderTextColor={colors.GRAY_30}
                  secureTextEntry={true}
                  isValid={!(errors.password)}
                />
             )}
             name="password"
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>
      </View>
      <View style={{marginHorizontal: 20, marginBottom: 30}}>
        <RoundButton
          text="Sign in"
          onPress={handleSubmit(login)}
          isRightArrow={false}
          disabled={!isValid}
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
