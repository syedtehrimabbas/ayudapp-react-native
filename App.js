import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import BankPoint from './src/screen/BankPoint';
import BioDataForm from './src/screen/BioDataForm';
import Home from './src/screen/Home';
import IndividualHelperForm from './src/screen/IndividualHelperForm';
import Login from './src/screen/Login';
import NeedyForm from './src/screen/NeedyForm';
import Requests from './src/screen/Requests';
import RequsetForm from './src/screen/RequsetForm';
import Splash from './src/screen/Splash';
import UserCategory from './src/screen/UserCategory';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
// const HomeStackNavigator = createBottomTabNavigator(
//   {
//     Home: {
//       screen: Home,
//     },
//     Requests: {
//       screen: Requests,
//     },
//   },
//   {
//     headerMode: 'none',
//   },
// );
const LoginStackNavigator = createStackNavigator(
  {
    // Splash: {
    //   screen: Splash,
    // },
    Login: {
      screen: Login,
    },
    BioDataForm: {
      screen: BioDataForm,
    },
    UserCategory: {
      screen: UserCategory,
    },
    Home: {
      screen: Home,
    },
    IndividualHelperForm: {
      screen: IndividualHelperForm,
    },
    BankPoint: {
      screen: BankPoint,
    },
  },
  {
    headerMode: 'none',
  },
);
const mainStackNavigator = createSwitchNavigator({
  LoginStackNavigator,
  // HomeStackNavigator,
});
const AppContainer = createAppContainer(mainStackNavigator);
