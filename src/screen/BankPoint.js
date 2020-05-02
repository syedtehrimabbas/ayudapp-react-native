import {
  CheckBox,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {ScrollView} from 'react-native-gesture-handler';

export default class BankPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      individual: false,
      family: false,
      ong: false,
    };
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerStyleText}>
            Completa los datos y geolocalice el banco
          </Text>
          <Text style={styles.headerStyleText}>
            (Complete the data and geolocate the bank)
          </Text>
        </View>
        <View style={styles.subContainerStyle}>
          <Text style={styles.detailTextStyle}>Nambre (Name)</Text>
          <Text style={styles.detailTextStyle}>
            Nombre del responsable (Responsible name)
          </Text>

          <TextInput
            placeholder={'George Woalock '}
            style={styles.placeholderStyle}
          />
        </View>
        <Text style={{fontSize: wp(4), paddingLeft: wp(5)}}>
          Proporcione los datos de ubicación:
        </Text>
        <Text style={{fontSize: wp(4), paddingLeft: wp(5)}}>
          (Provide location data)
        </Text>
        <View style={styles.boxContainerSTyle}>
          <Picker
            selectedValue={this.state.selectedValue}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="País (country)" value="País (country)" />
            <Picker.Item label="some" value="some" />
          </Picker>
        </View>
        <View style={styles.boxContainerSTyle}>
          <Picker
            selectedValue={this.state.selectedValue}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item
              label="Provincia  (Province o State)"
              value="Provincia  (Province o State)"
            />
            <Picker.Item label="some" value="some" />
          </Picker>
        </View>
        <View style={styles.boxContainerSTyle}>
          <Picker
            selectedValue={this.state.selectedValue}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item
              label="Distrito (Distric)"
              value="Distrito (Distric)"
            />
            <Picker.Item label="some" value="some" />
          </Picker>
        </View>
        <View style={styles.boxContainerSTyle}>
          <Picker
            selectedValue={this.state.selectedValue}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item
              label="Corregimiento (city)"
              value="Corregimiento (city)"
            />
            <Picker.Item label="some" value="some" />
          </Picker>
        </View>
        <TextInput
          placeholder={'Barrio / Poblado (Town)'}
          style={styles.placeholderStyle}
        />
        <TextInput
          placeholder={'Casa o Ediﬁcio (# House or Building)'}
          style={styles.placeholderStyle}
        />
        <TextInput
          placeholder={'Horario para localizarlo(a) (Hours to locate you)'}
          style={styles.placeholderStyle}
        />
        <TextInput
          placeholder={'Condiciones de uso (Terms of use) '}
          style={styles.placeholderStyle}
        />
        <TextInput
          placeholder={
            'Proporcionar una foto del banco (Provide a photo of the bank)'
          }
          style={styles.placeholderStyle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'black',
    width: wp(100),
    height: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(4.5),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  boxContainerSTyle: {
    borderWidth: 1,
    marginTop: hp(1),
    width: wp(90),
    alignSelf: 'center',
    height: hp(5),
    paddingLeft: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholderStyle: {
    borderWidth: 1,
    marginTop: hp(1),
    width: wp(90),
    alignSelf: 'center',
    height: hp(5),
    justifyContent: 'center',
    paddingLeft: wp(2),
  },
  detailTextStyle: {width: wp(80), fontSize: wp(4), marginTop: hp(1)},
  subContainerStyle: {
    paddingLeft: wp(5),
    paddingBottom: hp(1),
  },
});
