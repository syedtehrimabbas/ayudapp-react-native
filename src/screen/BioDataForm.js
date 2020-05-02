import {
  CheckBox,
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
import countryArray from '..//JSONfILES/country';

export default class BioDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      isSelected: false,
    };
  }
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
              placeholder={'Primer nombre'}
              style={styles.placeholderStyle}
            />
            <TextInput
              placeholder={'Apellido'}
              style={styles.placeholderStyle}
            />
            <TextInput
              placeholder={'Numero celular'}
              style={styles.placeholderStyle}
            />
            <TextInput
              placeholder={'Primer nombre'}
              style={styles.placeholderStyle}
            />
            <View style={styles.placeholderStyle}>
              <Picker
                selectedValue={this.state.selectedValue}
                style={styles.placeholderStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
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
                  setSelectedValue(itemValue)
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
                  setSelectedValue(itemValue)
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
                  setSelectedValue(itemValue)
                }>
                {countryArray.map((i) => {
                  return <Picker.Item label={i.name} value={i.name} />;
                })}
              </Picker>
            </View>
            <TextInput
              placeholder={'Primer nombre'}
              style={styles.placeholderStyle}
            />
            <TextInput
              placeholder={'Primer nombre'}
              style={styles.placeholderStyle}
            />
            <TextInput
              placeholder={'Primer nombre'}
              style={styles.placeholderStyle}
            />
            <TextInput
              placeholder={'Primer nombre'}
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
            La informacion proporionada es real acepto que Ayudapp pueda
            revisar, aprobar y garantizar que la informacion que estoy
            suministrando no afecte a terceras ersonas.
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
              Acepto las condiciones y terminos de uso de Ayudapp
            </Text>
          </View>
          <CommmonButton
            onPress={() => this.props.navigation.navigate('LoginCategory')}
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
});
