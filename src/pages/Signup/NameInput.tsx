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
import { fonst } from 'assets/fonts';

const NameInput = () => {
  const [keyboardHeight] = useKeyboard();
  const [name, setName] = useState<string>('');
  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'NameInput'>>();
  const {email, password} = route.params;
  return (
    <View style={{paddingHorizontal: 28, backgroundColor: 'white', flex: 1}}>
     {/* Re-style the title View by Baseer */}
      <View style={{flex: 1}}>
        <Text
          style={styles.title}>
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

const styles = StyleSheet.create({
  title:{
    fontSize: 28,
    lineHeight:35,
    color: 'black',
    fontFamily: fonst.Pretendard_Bold,
    paddingTop:12,
    paddingBottom: 64,
  }
});