import {StyledText} from 'components/common';
import i18n from 'language/i18n';
import {styled} from 'nativewind';
import Home from 'pages/Home';
import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
const StyledSafeAreaView = styled(SafeAreaView);

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
      <StyledSafeAreaView className="flex flex-row w-screen h-screen">
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>i18ntest:{i18n.t('Home.title')}</Text>
          <Home />
          <StyledText className="text-primary-purple text-2xl p-2 m-5">
            {i18n.t('Home.hello-world')}
          </StyledText>
        </ScrollView>
      </StyledSafeAreaView>
    </View>
  );
};

export default Login;
