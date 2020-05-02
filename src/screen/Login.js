import {GoogleProvider, GoogleSignin} from 'react-native-google-signin';
import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CommmonButton from './CommonButton';
import Images from '../Image/Images';
import Services from '../FireServices/FireServices';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

export default class Login extends Component {
  componentDidMount() {
    this.fetchDAte();
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '1063381046055-e55l58se6g6mbhvm3ibeifhh86e8esv2.apps.googleusercontent.com', // webClientId i told you to save somewhere,
      forceConsentPrompt: true, // if you want to show the authorization prompt at each login
    });
  }
  fetchDAte = async () => {
    console.log('fetchakajkfjds');

    const response = await fetch(
      'https://parseapi.back4app.com/classes/Continentscountriescities_Country?count=1&limit=250',
      {
        headers: {
          'X-Parse-Application-Id': 'dKmwraMd0tHAEnJlhe4nbHpn6MkfntZ4dwNxcGMq', // This is your app's application id
          'X-Parse-REST-API-Key': 'cGkjXTHyYujFvDUzA7GOv66nDFhTsBvsIuIX4mUM', // This is your app's REST API key
        },
      },
    );
    const data = await response.json(); // Here you have the data that you need
    console.log(data);
  };
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
          <CommmonButton
            style={{
              paddingTop: hp(2),
              backgroundColor: 'tomato',
              alignSelf: 'center',
              justifyContant: 'center',
              alignItems: 'center',
              paddingBottom: hp(2),
              paddingLeft: wp(15),
              paddingRight: wp(15),
              marginTop: hp(5),
              borderRadius: wp(1),
            }}
            Text="Soy nuevo en Ayudapp"
          />
          <TouchableOpacity onPress={this.onGoogleSignIn}>
            <Image
              resizeMode="contain"
              style={styles.googleimageStyle}
              source={Images.google}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  onGoogleSignIn = async () => {
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
        console.log('-------User-------', user);
        this.props.navigation.navigate('BioDataForm');
      })
      .catch((error) => {
        console.log('-------error-------');
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
