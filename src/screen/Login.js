import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CommmonButton from './CommonButton';
import {GoogleSignin} from 'react-native-google-signin';
import Images from '../Image/Images';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class Login extends Component {
  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '1063381046055-e55l58se6g6mbhvm3ibeifhh86e8esv2.apps.googleusercontent.com', // webClientId i told you to save somewhere,
      forceConsentPrompt: true, // if you want to show the authorization prompt at each login
    });
  }
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
            BLenvenido a Ayudapp una aplication de gente ayudando a los mas
            necesitados
          </Text>
        </View>
        <View style={{heigth: hp(100)}}>
          <View
            style={{
              backgroundColor: 'red',
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
            onPress={this.onGoogleSignIn}
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
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('BioDataForm')}>
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
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    GoogleSignin.signIn()
      .then((data) => {
        console.log('-------data-------', data);
        // Create a new Firebase credential with the token
        const credential = GoogleProvider.credential(
          data.idToken,
          data.accessToken,
        );
        console.log('Google Credential ==>', credential);
        // Login with the credential
        return firebaseApp.auth().signInWithCredential(credential);
      })
      .then((user) => {
        console.log('-------User-------', user);
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
  },
  googleimageStyle: {
    width: wp(30),
    height: hp(12),
    marginTop: hp(5),
    alignSelf: 'center',
  },
});
