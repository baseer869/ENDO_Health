import {SafeAreaView, Text, View} from 'components/common';
import BasicInput from 'components/common/BasicInput';
import i18n from 'language/i18n';
import Home from 'pages/Home/Home';
import React, {useState} from 'react';
import CircleButton from '../../components/common/CircleArrowButton';
import useKeyboard from 'hooks/useKeyboard';
import {Platform} from 'react-native';
import CancelTextInput from 'components/common/CancelTextInput';
import {useNavigation} from '@react-navigation/core';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {colors} from 'assets/colors';
import {RouteProp, useRoute} from '@react-navigation/native';

const NameInput = () => {
  const [keyboardHeight] = useKeyboard();
  const [name, setName] = useState<string>('');
  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'NameInput'>>();
  const {email, password} = route.params;
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
          onPress={() =>
            navigation.push('GenderSelect', {name, email, password})
          }
        />
      </View>
      {Platform.OS === 'ios' && <View style={{height: keyboardHeight}} />}
    </View>
  );
};

export default NameInput;
