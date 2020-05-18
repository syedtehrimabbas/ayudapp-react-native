import {GoogleProvider, GoogleSignin} from 'react-native-google-signin';
import {Image, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-community/async-storage';
import CommmonButton from './CommonButton';
import Images from '../Image/Images';
import Loader from '../screen/Loader';
import Services from '../FireServices/FireServices';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import colors from '../theme/colors';

export default class Login extends Component {
  componentDidMount() {
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This App needs access to your location ' +
              'so we can know where you are.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use locations ');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '1063381046055-47ro81c91o6hc5uk1g4dt1scp7lb44n7.apps.googleusercontent.com', // webClientId i told you to save somewhere,
      forceConsentPrompt: true, // if you want to show the authorization prompt at each login
    });
  }
  state = {loading: false};

  render() {
    return (
      <View style={{heigth: hp(100)}}>
        <View style={{heigth: hp(50), borderBottomWidth: 1}}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={Images.logo}
          />
          <Text style={styles.descriptionTextStyle}>
            Bienvenido a Ayudapp una aplicación de gente ayudando a los más
            necesitados
          </Text>
        </View>
        <View style={{heigth: hp(100)}}>
          <View
            style={{
              backgroundColor: '#36a7e3',
              width: wp(30),
              alignSelf: 'center',
              marginTop: hp(2),
              padding: wp(4),
              borderRadius: wp(50),
            }}>
            <Image
              resizeMode="contain"
              style={styles.lockimageStyle}
              source={Images.lock}
            />
          </View>

          <View
            style={{
              paddingTop: hp(2),
              backgroundColor: colors.purple,
              alignSelf: 'center',
              justifyContant: 'center',
              alignItems: 'center',
              paddingBottom: hp(2),
              paddingLeft: wp(15),
              paddingRight: wp(15),
              marginTop: hp(5),
              borderRadius: wp(1),
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              {' '}
              Soy nuevo en Ayudapp
            </Text>
          </View>
          <TouchableOpacity onPress={this.onGoogleSignIn}>
            <Image
              resizeMode="contain"
              style={styles.googleimageStyle}
              source={Images.google}
            />
          </TouchableOpacity>
          <Loader loading={this.state.loading} />
        </View>
      </View>
    );
  }
  onGoogleSignIn = async () => {
    this.setState({loading: true});
    await GoogleSignin.signIn()
      .then((data) => {
        console.log('-------data-------', data);
        // Create a new Firebase credential with the token
        const credential = auth.GoogleAuthProvider.credential(data.idToken);
        console.log('Google Credential ==>', credential);
        // Login with the credential
        return auth().signInWithCredential(credential);
      })
      .then((user) => {
        this.setState({loading: false});
        console.log('-------User-------', user.user._user.uid);
        Services.getUserProfile((userProfile) => {
          console.log('userProfile', userProfile);
          if (userProfile.user._data.userConfirmation === undefined) {
            Services.serUserProfile(user.user._user, (profile) => {
              console.log('profile', profile);
              if (profile.isSuccess) {
                this.props.navigation.navigate('BioDataForm', {
                  id: user.user._user.uid,
                });
              }
            });
          } else {
            AsyncStorage.setItem('USER', user.user._user.uid);
            this.props.navigation.navigate('UserCategory', {
              id: user.user._user.uid,
            });
          }
        });
      })
      .catch((error) => {
        console.log('-------error-------');
        this.setState({loading: false});

        console.log(error);
      });
  };
}

const styles = StyleSheet.create({
  imageStyle: {
    width: wp(50),
    height: hp(25),
    marginTop: hp(5),
    alignSelf: 'center',
  },
  descriptionTextStyle: {
    fontWeight: 'bold',
    fontSize: wp(6),
    marginTop: hp(5),
    textAlign: 'center',
  },
  lockimageStyle: {
    width: wp(30),
    height: hp(12),
    alignSelf: 'center',
    tintColor: '#fff',
  },
  googleimageStyle: {
    width: wp(30),
    height: hp(12),
    marginTop: hp(5),
    alignSelf: 'center',
  },
});
