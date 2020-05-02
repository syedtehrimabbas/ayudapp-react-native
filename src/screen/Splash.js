import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Images from '../Image/Images';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 1000);
  }
  render() {
    return (
      <View style={styles.containerStyle}>
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
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    height: hp(100),
    width: wp(100),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageStyle: {width: wp(100), height: hp(35), marginTop: hp(15)},
  descriptionTextStyle: {
    fontWeight: 'bold',
    fontSize: wp(6),
    marginTop: hp(10),
    textAlign: 'center',
  },
});
