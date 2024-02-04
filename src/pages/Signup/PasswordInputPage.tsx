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
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {colors} from 'assets/colors';
import {RouteProp, useRoute} from '@react-navigation/native';
import {isPasswordValid} from 'utils/numbers';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';

const passwordValidationRegex =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

// password schema
const schema = yup.object().shape({
  password: yup
    .string()
    .required('This is required.')
    .matches(
      passwordValidationRegex,
      'Password must be at least 8 characters long, include at least one number, and one special character.',
    ),
});

const PasswordInputPage = () => {
  const [keyboardHeight] = useKeyboard();
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'PasswordInput'>>();

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
    setIsValid(check);
  };
  //--//
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formProps: any) => {
    navigation.push('NameInput', {
      email: route.params.email,
      password: formProps.password,
    });
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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CancelTextInput
              value={value}
              onChangeText={onChange}
              placeholder={'Enter your password'}
              placeholderTextColor={colors.GRAY_30}
              // isValid={isValid}
              secureTextEntry
            />
          )}
          name="password"
        />

        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>
      <View className="w-full items-end pb-5">
        <CircleButton
          disabled={!isValid}
          // onPress={() =>
          //   navigation.push('NameInput', {email: route.params.email, password})
          // }
          onPress={handleSubmit(onSubmit)}
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
