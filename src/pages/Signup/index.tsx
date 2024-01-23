import {SafeAreaView, Text, View} from 'components/common';
import BasicInput from 'components/common/BasicInput';
import i18n from 'language/i18n';
import Home from 'pages/Home';
import React, {useState} from 'react';
import CircleButton from '../../components/common/CircleArrowButton';
import useKeyboard from 'hooks/useKeyboard';
import {Platform} from 'react-native';
import CancelTextInput from 'components/common/CancelTextInput';
import {useNavigation} from '@react-navigation/core';
import {RootStackScreenProps} from 'navigation/rootNavigation';
import {colors} from 'assets/colors';

const Login = () => {
  const [keyboardHeight] = useKeyboard();
  const [name, setName] = useState<string>('');
  const navigation = useNavigation<RootStackScreenProps>();

  return (
    <View className="px-7 bg-white flex-1">
      <View className="flex-1">
        <Text className="font-bold text-[28px] pb-16 text-black">
          {i18n.t('Login.login_title')}
        </Text>
        <CancelTextInput
          value={name}
          onChangeText={setName}
          placeholder={i18n.t('Login.login_placeholder')}
          placeholderTextColor={colors.GRAY_30}
        />
      </View>
      <View className="w-full items-end pb-5">
        <CircleButton
          disabled={name === ''}
          onPress={() => navigation.push('GenderSelect', {name})}
        />
      </View>
      {Platform.OS === 'ios' && <View style={{height: keyboardHeight}} />}
    </View>
  );
};

export default Login;
