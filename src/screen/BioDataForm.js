import {
  CheckBox,
  Image,
  KeyboardAvoidingView,
  Picker,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CommmonButton from './CommonButton';
import Images from '../Image/Images';
import countryArray from '..//JSONfILES/country';

export default class BioDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      isSelected: false,
      fname: '',
      lname: '',
      phone: '',
      otherPhone: '',
      country: '',
      province: '',
      district: '',
      city: '',
      town: '',
      building: '',
      time: '',
      image: '',
    };
  }
  setSelectedValue = () => {};
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerStyleText}>COMPLETE SUS DATOS</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView style={{height: hp(57)}}>
            <TextInput
              value={this.state.fname}
              onChangeText={(fname) => this.setState({fname})}
              placeholder={'Primer nombre'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.lname}
              onChangeText={(lname) => this.setState({lname})}
              placeholder={'Apellido'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.phone}
              onChangeText={(phone) => this.setState({phone})}
              placeholder={'Numero celular'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.otherPhone}
              onChangeText={(otherPhone) => this.setState({otherPhone})}
              placeholder={'Primer nombre'}
              style={styles.placeholderStyle}
            />
            <View style={styles.placeholderStyle}>
              <Picker
                selectedValue={this.state.selectedValue}
                style={styles.placeholderStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setSelectedValue(itemValue)
                }>
                {countryArray.map((i) => {
                  return <Picker.Item label={i.name} value={i.name} />;
                })}
              </Picker>
            </View>
            <View style={styles.placeholderStyle}>
              <Picker
                selectedValue={this.state.selectedValue}
                style={styles.placeholderStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setSelectedValue(itemValue)
                }>
                {countryArray.map((i) => {
                  return <Picker.Item label={i.name} value={i.name} />;
                })}
              </Picker>
            </View>
            <View style={styles.placeholderStyle}>
              <Picker
                selectedValue={this.state.selectedValue}
                style={styles.placeholderStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setSelectedValue(itemValue)
                }>
                {countryArray.map((i) => {
                  return <Picker.Item label={i.name} value={i.name} />;
                })}
              </Picker>
            </View>
            <View style={styles.placeholderStyle}>
              <Picker
                selectedValue={this.state.selectedValue}
                style={styles.placeholderStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setSelectedValue(itemValue)
                }>
                {countryArray.map((i) => {
                  return <Picker.Item label={i.name} value={i.name} />;
                })}
              </Picker>
            </View>
            <TextInput
              value={this.state.town}
              onChangeText={(town) => this.setState({town})}
              placeholder={'Barrio / Poblado (Town)'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.building}
              onChangeText={(building) => this.setState({building})}
              placeholder={'Casa o Ediﬁcio (# House or Building)'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.time}
              onChangeText={(time) => this.setState({time})}
              placeholder={'Horario para localizarlo(a) (Hours to locate you)'}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.image}
              onChangeText={(image) => this.setState({image})}
              placeholder={
                'Proporcionar una foto para el perﬁl (Provide a photo for the proﬁle)'
              }
              style={styles.placeholderStyle}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <View>
          <Text
            style={{
              alignSelf: 'center',
              color: 'blue',
              fontWeight: 'bold',
              fontSize: wp(4),
              marginTop: hp(1),
            }}>
            TERMINOS DE USO
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              width: wp(90),
              textAlign: 'center',
            }}>
            La información proporcionada es real Acepto que Ayudapp pueda
            revisar, aprobar y garantizar que la información que estoy
            suministrando no afecte a terceras personas.
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              value={this.state.isSelected}
              onValueChange={() =>
                this.setState({isSelected: !this.state.isSelected})
              }
              style={styles.checkbox}
            />
            <Text style={{width: wp(80), fontSize: wp(5), marginTop: hp(2)}}>
              Acepto las condiciones y términos de uso de Ayudapp
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text style={{textDecorationLine: 'underline'}}>Verifiy</Text>
            <Image
              resizeMode="contain"
              style={styles.googleimageStyle}
              source={Images.google}
            />
          </View>

          <CommmonButton
            onPress={() => this.props.navigation.navigate('UserCategory')}
            style={{
              paddingTop: hp(1),
              backgroundColor: 'tomato',
              alignSelf: 'center',
              justifyContant: 'center',
              alignItems: 'center',
              paddingBottom: hp(1),
              paddingLeft: wp(7),
              paddingRight: wp(7),
              marginTop: hp(2),
              borderRadius: wp(1),
            }}
            Text="Submit"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'black',
    width: wp(100),
    height: hp(6),
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(8),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    borderWidth: 1,
    marginTop: hp(1),
    width: wp(90),
    alignSelf: 'center',
  },
  checkbox: {
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  googleimageStyle: {
    width: wp(10),
    height: hp(4),
    marginTop: hp(1),
    alignSelf: 'center',
    marginLeft: wp(1),
  },
});
