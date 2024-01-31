import React from 'react';
import {WebView} from 'react-native-webview';
import {SafeAreaView, View} from 'react-native';
import BackHeader from 'components/common/BackHeader';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from 'navigation/rootNavigation';

export default function TermWebView() {
  const route = useRoute<RouteProp<RootStackParamList, 'TermWebView'>>();
  const {url} = route.params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <BackHeader />
      <View style={{flex: 1}}>
        <WebView
          source={{
            uri: url,
          }}
          cacheEnabled={false}
        />
      </View>
    </SafeAreaView>
  );
}
