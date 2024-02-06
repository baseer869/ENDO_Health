import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {colors} from 'assets/colors';
import {fonts} from 'assets/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm, } from 'react-hook-form';
import { updatePassword } from '../../apis/userApi'
import ArrowButton from 'components/common/ArrowButton';
import SampleTextInput from 'components/common/SampleTextInput';
//--//

// login schema
const passwordValidationRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export const schema = yup.object().shape({
  password: yup.string()
    .required('This is required.')
    .matches(
      passwordValidationRegex,
      'Password must be at least 8 characters long, include at least one number, and one special character.'
    ),
    confirmPassword: yup
    .string()
    .required('Please Re-enter your password.')
    .oneOf([yup.ref('password')], 'Password does not match.')
});

const UpdatePassword = ({ navigation}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const buttonRef = useRef<TouchableOpacity>(null);

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleFocus = inputRef => {
    setIsFocus(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setError,
    
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (formProps:any) => {
    let payload = { "password": formProps.password };
    let response = await updatePassword(payload);
    console.log('\nresponse of updatee password:',response);
    if(response == 'ok'){
      return navigation.goBack();
    } else if(response?.statusCode == 400){
      setError('confirmPassword', { message: response.message?.body });
      return;
    }
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>New password</Text>
          <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur,  value } }) => (
                <SampleTextInput
                   onFocus={() => handleFocus(passwordRef)}
                   onBlur={handleBlur}
                   placeholder="Enter password"
                   secureTextEntry
                   value={value}
                   onChangeText={onChange}
                  isValid={!(errors.password)}
                />
              )}
               name="password"
           />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>
        {/* confirm pass */}
        <View style={{paddingTop: 30}}>
          <Text style={styles.inputLabel}>Re-enter new password</Text>
          <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
          <SampleTextInput
            onFocus={() => handleFocus(confirmPasswordRef)}
            onBlur={handleBlur}
            placeholder="Enter password once more"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            isValid={!(errors.confirmPassword)}
          />
          )}
          name="confirmPassword"
        />
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
        </View>
      </View>
      {/* handle Submit */}
      <ArrowButton
          text="Get Started"
          onPress={handleSubmit(onSubmit)}
          disabled={isValid}
       />
    </View>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_0,
  },
  inputContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: fonts.Pretendard_Regular,
    color: colors.GRAY_60,
  },
  Btnlabel: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.Pretendard_Bold,
    color: colors.GRAY_0,
  },
  onButton: {
    display: 'flex',
    height: 48,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    borderRadius: 24,
    backgroundColor: colors.PRIMARY_BLUE,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    width: '90%',
  },
  offButton: {
    backgroundColor: colors.GRAY_5,
  },
  errorText: {
    color: colors.PRIMARY_RED,
    fontSize: 12,
    marginTop: 8,
    paddingLeft: 2,
  },
});
