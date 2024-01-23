import React, {useEffect, useState} from 'react';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Platform, View} from 'react-native';

import {colors} from 'assets/colors';
import Home from 'pages/Home';
import Main from 'pages/Main';
import Login from 'pages/Login';
import GenderSelectPage from 'pages/Login/GenderSelectPage';
import BirthdaySelectPage from 'pages/Login/BirthdaySelectPage';
import Signup from 'pages/Signup';
import EntrancePage from 'pages/Login/EntrancePage';

export type RootStackParamList = {
  Home: undefined;
  Entrance: undefined;
  Login: undefined;
  Main: undefined;
  Tabs: undefined;
  GenderSelect: {name: string};
  BirthdaySelect: {name: string; gender: string};
  Signup: undefined;
};

export type RootStackScreenProps = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: colors.YELLOW_100,
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 90 : 80,

            paddingTop: 7,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: colors.YELLOW_100,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: colors.ALPHA_BLACK_12,
                  }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Home2"
          component={Main}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: colors.YELLOW_100,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: colors.ALPHA_BLACK_12,
                  }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Home3"
          component={Home}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: colors.YELLOW_100,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: colors.ALPHA_BLACK_12,
                  }}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Home4"
          component={Home}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: colors.YELLOW_100,
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: colors.ALPHA_BLACK_12,
                  }}
                />
              ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const AuthGroup = () => (
  <Stack.Group>
    <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Main" component={Main} />
  </Stack.Group>
);
const NotAuthGroup = () => (
  <Stack.Group>
    <Stack.Screen name="Entrance" component={EntrancePage} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
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
  </Stack.Group>
);

const Navigator = () => {
  const [isLogin, setIsLogin] = useState(false);

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
      {isLogin ? AuthGroup() : NotAuthGroup()}
    </Stack.Navigator>
  );
};

export default Navigator;
