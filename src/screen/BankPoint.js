import {
  CheckBox,
  KeyboardAvoidingView,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CommmonButton from './CommonButton';
import Geolocation from '@react-native-community/geolocation';
import Loader from './Loader';
import {ScrollView} from 'react-native-gesture-handler';
import Services from '../FireServices/FireServices';

export default class BankPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      individual: false,
      family: false,
      ong: false,
      country: '',
      province: '',
      district: '',
      city: '',
      town: '',
      buildingAddress: '',
      time: '',
      term: '',
      image: '',
      userType: this.props.navigation.state.params.type,
      selectedValue: '',
      countries: [],
      states: [],
      citiesList: [],
      selectedValueCountry: '',
      selectedValueState: '',
      loading: false,
      latitude: 0,
      longitude: 0,
    };
  }
  onButtonPress = () => {
    this.setState({loading: true});
    const {
      name,
      selectedValueCountry,
      selectedValueState,
      district,
      city,
      town,
      buildingAddress,
      time,
      term,
      image,
      userType,
      latitude,
      longitude,
    } = this.state;
    Services.addBankDetail(
      name,
      selectedValueCountry,
      selectedValueState,
      district,
      city,
      town,
      buildingAddress,
      time,
      term,
      image,
      userType,
      latitude,
      longitude,
      (res) => {
        this.setState({loading: false});
        alert('successfully submitted');
        this.props.navigation.navigate('UserCategory');
      },
    );
  };
  componentDidMount() {
    Geolocation.getCurrentPosition((info) =>
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );
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
            Completa los datos y geolocalice el banco
          </Text>
          <Text style={styles.headerStyleText}>
            (Complete the data and geolocate the bank)
          </Text>
        </View>
        <Loader loading={this.state.loading} />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView>
            <View style={styles.subContainerStyle}>
              <Text style={styles.detailTextStyle}>Nambre (Name)</Text>
              <Text style={styles.detailTextStyle}>
                Nombre del responsable (Responsible name)
              </Text>

              <TextInput
                value={this.state.name}
                onChangeText={(name) => this.setState({name})}
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
                    <Picker.Item
                      label={i.country_name}
                      value={i.country_name}
                    />
                  );
                })}
              </Picker>
            </View>
            <View style={styles.boxContainerSTyle}>
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
                  return (
                    <Picker.Item label={i.state_name} value={i.state_name} />
                  );
                })}
              </Picker>
            </View>
            {/* <View style={styles.boxContainerSTyle}>
              <Picker
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
              </Picker>
            </View> */}
            <View style={styles.boxContainerSTyle}>
              <Picker
                selectedValue={this.state.city}
                style={styles.placeholderStyle}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({city: itemValue})
                }>
                {this.state.citiesList.map((i) => {
                  return (
                    <Picker.Item label={i.city_name} value={i.city_name} />
                  );
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
              value={this.state.buildingAddress}
              onChangeText={(buildingAddress) =>
                this.setState({buildingAddress})
              }
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
              value={this.state.term}
              onChangeText={(term) => this.setState({term})}
              placeholder={'Condiciones de uso (Terms of use) '}
              style={styles.placeholderStyle}
            />
            <TextInput
              value={this.state.image}
              onChangeText={(image) => this.setState({image})}
              placeholder={
                'Proporcionar una foto del banco (Provide a photo of the bank)'
              }
              style={styles.placeholderStyle}
            />
          </ScrollView>
        </KeyboardAvoidingView>

        <CommmonButton
          onPress={this.onButtonPress}
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
          Text="SUBMIT"
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
