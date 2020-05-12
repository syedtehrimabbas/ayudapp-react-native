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
import colors from '../theme/colors';

export default class IndividualHelperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      selectedValueCountry: '',
      selectedValueState: '',
      city: '',
      citiesList: [],
      states: [],
      countries: [],
      requestsSearched: [],
    };
  }
  componentDidMount() {
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
        <View style={styles.borderStyle}>
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
        <View style={styles.borderStyle}>
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

        <View style={styles.borderStyle}>
          <Picker
            selectedValue={this.state.city}
            style={styles.placeholderStyle}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({city: itemValue});
              Services.getRequestedOrderByUser((allRequests) => {
                console.log('allRequests', allRequests);
                let selectedCont = this.state.selectedValueCountry;
                let selectState = this.state.selectedValueState;
                let filteredRequests = allRequests.requests.filter((i) => {
                  return (
                    i.requests.userInformation.country === selectedCont &&
                    i.requests.userInformation.province === selectState &&
                    i.requests.userInformation.city === itemValue
                  );
                });
                console.log('filteredRequests', filteredRequests);
                this.setState({requestsSearched: filteredRequests});
              });
            }}>
            {this.state.citiesList.map((i) => {
              return <Picker.Item label={i.city_name} value={i.city_name} />;
            })}
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
            Total sin asistencia (Total without assistance):{' '}
            {this.state.requestsSearched.length}
          </Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: wp(5),
            color: 'tomato',
          }}
          onPress={() =>
            this.props.navigation.navigate('IndividualScreenMap', {
              requests: this.state.requestsSearched,
            })
          }>
          go to map
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.purple,
    width: wp(100),
    height: hp(9),
    justifyContent: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.grey,
    height: 58,
    borderRadius: 8,
    margin: 10,
    width: wp(85),
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
  borderStyle: {
    height: 58,
    borderWidth: 0.5,
    backgroundColor: colors.white,
    borderColor: colors.grey,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
