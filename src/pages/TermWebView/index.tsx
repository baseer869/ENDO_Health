import React from 'react';
import {WebView} from 'react-native-webview';
import {SafeAreaView, View} from 'react-native';
import BackHeader from 'components/common/BackHeader';

export default function TermWebView() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackHeader />
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: 'https://app.termly.io/document/privacy-policy/2355b0db-3909-43c1-a00c-cd0b4a7b7f69',
          }}
          cacheEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
