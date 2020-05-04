import React, {Component} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
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
  componentDidMount() {
    requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };
  }
  render() {
    return <AppContainer />;
  }
}

// const HomeStackNavigator = createStackNavigator(
//   {
//     UserCategory: {
//       screen: UserCategory,
//     },
//     Home: {
//       screen: Home,
//     },
//     IndividualHelperForm: {
//       screen: IndividualHelperForm,
//     },
//     BankPoint: {
//       screen: BankPoint,
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
    Splash: {
      screen: Splash,
    },
    Login: {
      screen: Login,
    },
    BioDataForm: {
      screen: BioDataForm,
    },
    Home: {
      screen: Home,
    },
    UserCategory: {
      screen: UserCategory,
    },
    IndividualHelperForm: {
      screen: IndividualHelperForm,
    },
    BankPoint: {
      screen: BankPoint,
    },
    Requests: {
      screen: Requests,
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
const AppContainer = createAppContainer(LoginStackNavigator);
