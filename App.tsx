/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import CodePush, {CodePushOptions} from 'react-native-code-push';
import {Provider} from 'react-redux';
import {store} from './src/stores/rootStore';
import {styled, withExpoSnack} from 'nativewind';
import {Text} from './src/components/common';
import {NavigationContainer, ThemeProvider} from '@react-navigation/native';
import Navigator from 'navigation/rootNavigation';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {setBaseUrl} from 'apis/apiConstants';

setBaseUrl('https://api.endohealth.co');
import Main from 'Main';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </Provider>
  );
}

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

export default CodePush(codePushOptions)(withExpoSnack(App));
