import React, {useEffect, useState} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Platform, View, Text, Image, StyleSheet} from 'react-native';

import {colors} from 'assets/colors';
import Home from 'pages/Home';
import AIChat from 'pages/AIChat';
import Main from 'pages/Main';
import Login from 'pages/Login';
import GenderSelectPage from 'pages/Signup/GenderSelectPage';
import BirthdaySelectPage from 'pages/Signup/BirthdaySelectPage';
import EntrancePage from 'pages/Login/EntrancePage';
import NameInputPage from 'pages/Signup/NameInput';
import EmailInputPage from 'pages/Signup';
import PasswordInputPage from 'pages/Signup/PasswordInputPage';
import SignupDonePage from 'pages/Signup/SignupDonePage';
import {useSelector} from 'react-redux';
import {RootState} from 'reducers';
import TermWebView from 'pages/TermWebView';
import MedicalInfo from 'pages/MedicalInfo';
import icons from 'components/icons';
import MyAccount from 'pages/Account';

export type RootStackParamList = {
  Home: undefined;
  Entrance: undefined;
  Login: undefined;
  Main: undefined;
  Tabs: undefined;
  Signup: undefined;
  PasswordInput: {email: string};
  NameInput: {email: string; password: string};
  GenderSelect: {email: string; password: string; name: string};
  BirthdaySelect: {
    email: string;
    password: string;
    name: string;
    gender: string;
  };
  SignupDone: {
    email: string;
    password: string;
    name: string;
    gender: string;
    birthday: Date;
  };
  TermWebView: undefined;
  MedicalInfo: undefined;
  label: String
};

export type RootStackScreenProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

interface TabIconProps {
  label: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, label, focused }) => {
  return (
    <View style={{alignItems:'center', rowGap:2}}>
      <Image source={icon}  style={{...styles.icon, tintColor: focused && colors.GRAY_80 }}/>
      <Text style={{...styles.label, color: focused && colors.GRAY_80 }}>{label}</Text>
    </View>
  );
};
const Tabs = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 46 : 56,
            bottom: 0,
            minHeight:1,
            borderTopColor: colors.GRAY_5
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon icon={icons.icon_home_solid} label={"Home"} focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Goals"
          component={Main}
          options={{
            tabBarIcon: ({ focused }) =><TabIcon icon={icons.icon_star_solid} label={"Goals"} focused={focused}  />,
          }}
        />
        <Tab.Screen
          name="AIChat"
          component={AIChat}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon icon={icons.icon_aichat_solid} label={"AI Chat"} focused={focused}  />,
          }}
        />
        <Tab.Screen
          name="Account"
          component={MyAccount}
          options={{
            tabBarIcon: ({ focused }) => <TabIcon icon={icons.icon_user_solid} label={"Account"} focused={focused}  />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const AuthGroup = () => (
  <Stack.Group>
    <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: true,
        headerTitle: 'Home',
      }}
    />
    <Stack.Screen name="Main" component={Main} />
  </Stack.Group>
);

const AuthGroupNotMedicalInfo = () => (
  <Stack.Group>
    <Stack.Screen name="MedicalInfo" component={MedicalInfo} />
  </Stack.Group>
);

const NotAuthGroup = () => (
  <Stack.Group>
    <Stack.Screen name="Entrance" component={EntrancePage} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={EmailInputPage} />
    <Stack.Screen name="PasswordInput" component={PasswordInputPage} />
    <Stack.Screen name="NameInput" component={NameInputPage} />
    <Stack.Screen
      name="GenderSelect"
      component={GenderSelectPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="BirthdaySelect"
      component={BirthdaySelectPage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="SignupDone"
      component={SignupDonePage}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="TermWebView"
      component={TermWebView}
      options={{headerShown: false}}
    />
  </Stack.Group>
);

const Navigator = () => {
  const userInfo = useSelector(
    (state: RootState) => state.userInfoStore.userInfo,
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerLeftContainerStyle: {
          paddingLeft: Platform.OS === 'ios' ? 24 : 10,
        },
      }}>
      {userInfo
        ? userInfo.completed
          ? AuthGroup()
          : AuthGroup()
        : NotAuthGroup()}
    </Stack.Navigator>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  label:{
    fontSize: 10, 
    fontStyle:'normal', 
    lineHeight: 10, 
    color: colors.GRAY_40, 
    textAlign:'center' ,
    // fontFamily:""
  },
  icon:{
    width: 22, 
    height:22, 
    resizeMode:'contain', 
  }
})