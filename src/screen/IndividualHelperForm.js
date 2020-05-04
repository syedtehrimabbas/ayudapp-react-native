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
import Services from '../FireServices/FireServices';

export default class IndividualHelperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      countries: [],
      states: [],
      citiesList: [],
      selectedValueCountry: '',
      selectedValueState: '',
    };
  }
  componentDidMount() {
    Services.getTockenForUniversalApi((res) => {
      if (res.isSuccess) {
        Services.fetchCountries(res.token, (countries) => {
          console.log('console', countries.data);
          this.setState({countries: countries.data});
        });
      }
    });
  }
  setSelectedValue = () => {};
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerStyleText}>
            Completa Ios datos y selecciona Ios filtor
          </Text>
          <Text style={styles.headerStyleText}>
            (Fill in the data and select the filters)
          </Text>
        </View>
        <View style={styles.subContainerStyle}>
          <Text style={styles.detailTextStyle}>Nambre (Name)</Text>
          <Text style={styles.detailTextStyle}>
            Este nombre sera publico (this name will be public)
          </Text>

          <TextInput
            placeholder={'Robert De Nolom'}
            style={styles.placeholderStyle}
          />
        </View>
        <View
          style={{
            backgroundColor: '#131875',
            width: wp(95),
            alignSelf: 'center',
            borderRadius: wp(1),
          }}>
          <Text style={styles.bannerTextStyle}>
            Buscar persons vulnerables cercanas
          </Text>
          <Text style={styles.bannerTextStyle}>
            (Find vulnerable people close)
          </Text>
          <Text style={styles.bannerTextStyle}>(GPS 10 km)</Text>
        </View>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            fontSize: wp(5),
            marginTop: 1,
          }}>
          Encontrarla por filtors
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            alignSelf: 'center',
            fontSize: wp(5),
            marginTop: 1,
          }}>
          (Find it by filters)
        </Text>
        <View style={styles.boxContainerSTyle}>
          {/* <Picker
            selectedValue={this.state.selectedValue}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValue(itemValue)
            }>
            <Picker.Item label="Pais (country)" value="Pais (country)" />
            <Picker.Item label="some" value="some" />
          </Picker> */}
          <Picker
            selectedValue={this.state.selectedValueCountry}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedValueCountry: itemValue});
              Services.getStatesFromApi(itemValue, (state) => {
                this.setState({states: state.data});
              });
            }}>
            {this.state.countries.map((i) => {
              return (
                <Picker.Item label={i.country_name} value={i.country_name} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.boxContainerSTyle}>
          {/* <Picker
            selectedValue={this.state.selectedValue}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValue(itemValue)
            }>
            <Picker.Item
              label="Provincia (Province o State)"
              value="Provincia (Province o State)"
            />
            <Picker.Item label="some" value="some" />
          </Picker> */}
          <Picker
            selectedValue={this.state.selectedValueState}
            style={styles.placeholderStyle}
            onValueChange={(state, itemIndex) => {
              this.setState({selectedValueState: state});
              Services.getCitiesFromApi(state, (cities) => {
                this.setState({citiesList: cities.data});
              });
            }}>
            {this.state.states.map((i) => {
              return <Picker.Item label={i.state_name} value={i.state_name} />;
            })}
          </Picker>
        </View>
        <View style={styles.boxContainerSTyle}>
          {/* <Picker
            selectedValue={this.state.selectedValue}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValue(itemValue)
            }>
            <Picker.Item
              label="Distrito (Distric)"
              value="Distrito (Distric)"
            />
            <Picker.Item label="some" value="some" />
          </Picker> */}
          <Picker
            selectedValue={this.state.selectedValueState}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValue(itemValue)
            }>
            {this.state.citiesList.map((i) => {
              return <Picker.Item label={i.city_name} value={i.city_name} />;
            })}
          </Picker>
        </View>
        <View style={styles.boxContainerSTyle}>
          <Picker
            selectedValue={this.state.selectedValue}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) =>
              this.setSelectedValue(itemValue)
            }>
            <Picker.Item label="Corregimiento" value="Corregimiento" />
            <Picker.Item label="some" value="some" />
          </Picker>
        </View>
        <View
          style={{
            backgroundColor: '#f3f3f3',
            paddingLeft: wp(5),
            paddingTop: hp(2),
          }}>
          <Text
            style={{
              width: wp(80),
              fontSize: wp(4),
              marginTop: hp(1),
              color: 'blue',
            }}>
            Resultados encontrados (Results found)
          </Text>
          <Text style={styles.detailTextStyle}>
            Total sin asistencia (Total without assistance): 58.{' '}
          </Text>
        </View>
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
    fontSize: wp(5),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  detailTextStyle: {width: wp(80), fontSize: wp(4), marginTop: hp(1)},
  subContainerStyle: {
    paddingLeft: wp(5),
    borderBottomWidth: 1,
    paddingBottom: hp(1),
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
  bannerTextStyle: {
    color: 'white',
    fontSize: wp(5),
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
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
});
