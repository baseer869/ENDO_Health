import {SafeAreaView, Text, View} from 'components/common';
import i18n from 'language/i18n';
import Home from 'pages/Home';
import React from 'react';
import {ScrollView} from 'react-native';

const Login = () => {
  return (
    <View>
      <Text>Login</Text>
      <SafeAreaView className="flex flex-row w-screen h-screen">
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>i18ntest:{i18n.t('Home.title')}</Text>
          <Home />
          <Text className="text-primary-purple text-2xl p-2 m-5">
            {i18n.t('Home.hello-world')}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Login;
