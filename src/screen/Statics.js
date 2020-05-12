import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {
  Image,
  KeyboardAvoidingView,
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

import CommmonButton from './CommonButton';
import FilePickerManager from 'react-native-file-picker';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-picker';
import Images from '../Image/Images';
import Loader from './Loader';
import Services from '../FireServices/FireServices';

export default class Statics extends Component {
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
      stat: [
        {
          id: 1,
          text:
            'Familias necesitadas vs ayudadas por zona(Families in need vs. assisted by area)',
          total: 230,
        },
        {
          id: 2,
          text:
            'Personas necesitadas vs ayudadas por zona (People in need vs. helped by area)',
          total: 270,
        },
        {
          id: 3,
          text:
            'ONG necesitadas vs ayudadas por zona   (NGOs in need vs. assisted by area)',
          total: 240,
        },
        {
          id: 4,
          text: 'Vulnerabilidad por rango de eda (Cases by age range)',
          total: 430,
        },
        {
          id: 5,
          text:
            'Estatus Laboral por zona geográfica(Labor Status by geographical area)',
          total: 830,
        },
      ],
    };
  }
  componentDidMount() {
    Geolocation.getCurrentPosition((info) =>
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );
    Services.getTockenForUniversalApi((result) => {
      console.log('userToken', result.token);
      this.setState({accessToken: result.token});
      if (result.isSuccess) {
        Services.fetchCountries(result.token, (countries) => {
          console.log('console', countries.data);
          this.setState({countries: countries.data});
          let countryToShow = countries.data.find((i) => {
            return i.country_name === 'Panama';
          });
          this.setState({selectedValueCountry: countryToShow.country_name});
        });
      }
    });
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerStyleText}>Estadisticas de Ayudapp</Text>
          <Text style={styles.headerStyleText}>(Ayudapp Statistics)</Text>
        </View>

        <View style={styles.boxContainerSTyle}>
          <Picker
            selectedValue={this.state.selectedValueCountry}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({selectedValueCountry: itemValue});
              Services.getStatesFromApi(
                this.state.accessToken,
                itemValue,
                (state) => {
                  this.setState({states: state.data});
                },
              );
            }}>
            {this.state.countries.map((i) => {
              return (
                <Picker.Item label={i.country_name} value={i.country_name} />
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
              Services.getCitiesFromApi(
                this.state.accessToken,
                state,
                (cities) => {
                  this.setState({citiesList: cities.data});
                },
              );
            }}>
            {this.state.states.map((i) => {
              return <Picker.Item label={i.state_name} value={i.state_name} />;
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
              return <Picker.Item label={i.city_name} value={i.city_name} />;
            })}
          </Picker>
        </View>
        <FlatList data={this.state.stat} renderItem={this.renderRow} />
      </View>
    );
  }
  renderRow = ({item}) => {
    return (
      <View style={styles.rowStyle}>
        <Image
          source={Images.plus}
          style={{height: hp(6), width: wp(9), resizeMode: 'contain'}}
        />
        <Text style={{width: wp(70), textAlign: 'center', fontSize: 12}}>
          {item.text}
        </Text>
        <View
          style={{
            backgroundColor: 'tomato',
            paddingTop: wp(2),
            paddingBottom: wp(2),
            paddingLeft: wp(3),
            paddingRight: wp(3),

            borderRadius: wp(10),
          }}>
          <Text>{item.total}</Text>
        </View>
      </View>
    );
  };
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
  rowStyle: {
    alignSelf: 'center',
    width: wp(95),
    borderWidth: 1,
    elevation: 1,
    marginTop: hp(1),
    padding: wp(1),
    alignItems: 'center',
    flexDirection: 'row',
  },
});