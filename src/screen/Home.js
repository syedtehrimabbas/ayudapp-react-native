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
import Loader from '../screen/Loader';
import {ScrollView} from 'react-native-gesture-handler';
import Services from '../FireServices/FireServices';

let helpType = '';
let coronaDiseaseType = '';
let eggs = '';
let soap = '';
let Medications = '';
let currentTime = 0;
let tomorrowTime = 0;
let tomorrowNextTime = 0;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
      individual: false,
      family: false,
      ong: false,
      name: '',
      ageRange1: '',
      ageRange2: '',
      ageRange3: '',
      ageRange4: '',
      ageRange5: '',
      coronaDisease: false,
      soap: false,
      egg: false,
      medicine: false,
      employment: '',
      accountDetail: '',
      userType: this.props.navigation.state.params.type,
      loading: false,
      latitude: 0,
      longitude: 0,
      textToShow: '',
      withinTime: false,
    };
  }
  setOrderRistriction = () => {
    this.setState({loading: true});
    Services.getUserProfile((user) => {
      if (user.isSuccess) {
        console.log('userrrrrrr', user.user._data.requestId);
        Services.getRequestedOrder(user.user._data.requestId, (order) => {
          console.log('order', order);
          currentTime = new Date(order.order._data.orderTime).getTime();
          tomorrowTime = new Date(
            new Date(order.order._data.orderTime).getTime() +
              24 * 60 * 60 * 1000,
          ).getTime();
          tomorrowNextTime = new Date(
            new Date(order.order._data.orderTime).getTime() +
              24 * 60 * 60 * 1000 +
              24 * 60 * 60 * 1000,
          ).getTime();
          if (currentTime <= tomorrowTime) {
            this.setState({
              withinTime: true,
              textToShow: 'You will be elligible for help after 2 days',
              loading: false,
            });
          } else if (
            currentTime >= tomorrowTime &&
            currentTime <= tomorrowNextTime
          ) {
            console.log('this.is tomorow time');
            this.setState({
              withinTime: true,
              loading: false,
              textToShow: 'You will be elligible for help after 1 days',
            });
          } else {
            this.setState({loading: false});
          }
        });
      }
    });
  };
  componentDidMount() {
    this.focusListner = this.props.navigation.addListener('didFocus', () => {
      this.setOrderRistriction();
    });

    Geolocation.getCurrentPosition((info) =>
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );
  }

  onButtonPress = () => {
    let currentDate = new Date().toString();
    this.setState({loading: true});
    const {
      name,
      ageRange1,
      ageRange2,
      ageRange3,
      ageRange4,
      ageRange5,
      employment,
      accountDetail,
      latitude,
      longitude,
    } = this.state;
    if (this.state.individual) {
      helpType = 'individual help';
    } else if (this.state.family) {
      helpType = 'want family help';
    } else if (this.state.ong) {
      helpType = 'ong';
    }
    if (this.state.coronaDisease) {
      coronaDiseaseType = 'corona positive';
    } else {
      coronaDiseaseType = 'corona negitive';
    }
    if (this.state.soap) {
      soap = 'require';
    } else {
      soap = 'not require';
    }
    if (this.state.egg) {
      eggs = 'eggs require';
    } else {
      eggs = 'not require';
    }
    if (this.state.medicine) {
      Medications = 'require medications';
    } else {
      Medications = 'not require medications';
    }
    Services.needyUserForm(
      name,
      ageRange1,
      ageRange2,
      ageRange3,
      ageRange4,
      ageRange5,
      employment,
      accountDetail,
      helpType,
      coronaDiseaseType,
      eggs,
      soap,
      Medications,
      this.state.userType,
      latitude,
      longitude,
      currentDate,
      (response) => {
        console.log('hererer in home response ', response);
        this.setState({loading: false});
        alert('successfully submitted');
        this.props.navigation.navigate('UserCategory');
      },
    );
  };
  setSelectedValue = () => {};
  render() {
    return (
      <View>
        {this.state.withinTime ? (
          <View
            style={{
              height: hp(100),
              width: wp(100),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
              {this.state.textToShow}
            </Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text
                style={{fontSize: wp(4), fontWeight: 'bold', marginTop: hp(5)}}>
                GO BACK
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.headerStyle}>
              <Text style={styles.headerStyleText}>
                Completa Ios siguientes datos
              </Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
              <ScrollView style={{height: hp(93)}}>
                <View style={{paddingLeft: wp(5), borderBottomWidth: 1}}>
                  <Text>Usted necesita</Text>
                  <View style={styles.oPtioncontainer}>
                    <CheckBox
                      value={this.state.individual}
                      onValueChange={() =>
                        this.setState({
                          individual: !this.state.individual,
                          family: false,
                          ong: false,
                        })
                      }
                      style={styles.checkbox}
                    />
                    <Text style={{width: wp(80), fontSize: wp(5)}}>
                      Ayuda individual (individual help)
                    </Text>
                  </View>
                  <Loader loading={this.state.loading} />
                  <View style={styles.oPtioncontainer}>
                    <CheckBox
                      value={this.state.family}
                      onValueChange={() =>
                        this.setState({
                          family: !this.state.family,
                          individual: false,
                          ong: false,
                        })
                      }
                      style={styles.checkbox}
                    />
                    <Text style={{width: wp(80), fontSize: wp(5)}}>
                      Ayuda familiar (family help)
                    </Text>
                  </View>
                  <View style={styles.oPtioncontainer}>
                    <CheckBox
                      value={this.state.ong}
                      onValueChange={() =>
                        this.setState({
                          ong: !this.state.ong,
                          family: false,
                          individual: false,
                        })
                      }
                      style={styles.checkbox}
                    />
                    <Text style={{width: wp(80), fontSize: wp(5)}}>ong</Text>
                  </View>
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    Nombre de la familia, individuo o ONG (Name or family) Este
                    dato aparecera publico (public data)
                  </Text>
                  <TextInput
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name})}
                    placeholder={'Familia Perez'}
                    style={styles.placeholderStyle}
                  />
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    Cantidad de personas por rangos de edades en su familia
                    (Number of people by age ranges)
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{width: wp(30)}}>Menos de 1 ano:</Text>
                    <TextInput
                      value={this.state.ageRange1}
                      onChangeText={(ageRange1) => this.setState({ageRange1})}
                      style={styles.inPUTminiStyle}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{width: wp(30)}}>De 1 a 12 anos:</Text>
                    <TextInput
                      value={this.state.ageRange2}
                      onChangeText={(ageRange2) => this.setState({ageRange2})}
                      style={styles.inPUTminiStyle}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{width: wp(30)}}>De 13 a 17 anos:</Text>
                    <TextInput
                      value={this.state.ageRange3}
                      onChangeText={(ageRange3) => this.setState({ageRange3})}
                      style={styles.inPUTminiStyle}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{width: wp(30)}}>De 18 a 60 anos:</Text>
                    <TextInput
                      value={this.state.ageRange4}
                      onChangeText={(ageRange4) => this.setState({ageRange4})}
                      style={styles.inPUTminiStyle}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{width: wp(30)}}>De 61 a o mas:</Text>
                    <TextInput
                      value={this.state.ageRange5}
                      onChangeText={(ageRange5) => this.setState({ageRange5})}
                      style={styles.inPUTminiStyle}
                    />
                  </View>
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    ?Enfermedades cronicas en usted o algun familiar?(Chronic
                    disease in you or a family member?)
                  </Text>
                  <View style={styles.boxContainerSTyle}>
                    <Text>Chronic disease</Text>
                    <CheckBox
                      value={this.state.coronaDisease}
                      onValueChange={() =>
                        this.setState({
                          coronaDisease: !this.state.coronaDisease,
                        })
                      }
                      style={styles.checkbox}
                    />
                  </View>
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    Seleccion Ios articulos de aseo personal y limieza de hogar
                    que necesita- (Cleaning)
                  </Text>
                  <View style={styles.boxContainerSTyle}>
                    <Text>jabon de lavar - (Washing soap)</Text>
                    <CheckBox
                      value={this.state.soap}
                      onValueChange={() =>
                        this.setState({soap: !this.state.soap})
                      }
                      style={styles.checkbox}
                    />
                  </View>
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    Seleccione Ios alimentos que necesita - (Food)
                  </Text>

                  <View style={styles.boxContainerSTyle}>
                    <Text>Huevos - (Eggs)</Text>
                    <CheckBox
                      value={this.state.egg}
                      onValueChange={() =>
                        this.setState({egg: !this.state.egg})
                      }
                      style={styles.checkbox}
                    />
                  </View>
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    Medicamentos que necesita - (Medications)
                  </Text>

                  <View style={styles.boxContainerSTyle}>
                    <Text>Malestar gastrointestinal - (Gastrointestinal)</Text>
                    <CheckBox
                      value={this.state.medicine}
                      onValueChange={() =>
                        this.setState({medicine: !this.state.medicine})
                      }
                      style={styles.checkbox}
                    />
                  </View>
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    Estatus laboral para recibir bono o Bolsa solidria del
                    gobiemo (Employment status)
                  </Text>

                  <View style={styles.boxContainerSTyle}>
                    <Picker
                      selectedValue={this.state.selectedValue}
                      style={styles.placeholderStyle}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setSelectedValue(itemValue)
                      }>
                      <Picker.Item
                        label="Estoy desempleado - (i'm unemployed)"
                        value="Estoy desempleado - (i'm unemployed)"
                      />
                      <Picker.Item label="some" value="some" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    Cuenta bancaria para ayuda en dinero (Bank account number
                    for aid)
                  </Text>

                  <TextInput
                    value={this.state.accountDetail}
                    onChangeText={(accountDetail) =>
                      this.setState({accountDetail})
                    }
                    placeholder={'Familia Perez'}
                    style={styles.placeholderStyle}
                  />
                </View>
                <View style={styles.subContainerStyle}>
                  <Text style={styles.detailTextStyle}>
                    Banco, número de cuenta y nombre (Bank, account number and
                    name)
                  </Text>
                </View>
                <CommmonButton
                  onPress={this.onButtonPressLocation}
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
                  Text="Location"
                />
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
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'black',
    width: wp(100),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(6),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  oPtioncontainer: {
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
  detailTextStyle: {width: wp(80), fontSize: wp(3), marginTop: hp(1)},
  subContainerStyle: {
    paddingLeft: wp(5),
    borderBottomWidth: 1,
    paddingBottom: hp(1),
  },
  inPUTminiStyle: {
    borderWidth: 1,
    marginTop: hp(1),
    width: wp(90),
    alignSelf: 'center',
    height: hp(5),
    width: wp(50),
    paddingLeft: wp(2),
    marginLeft: wp(2),
    height: hp(4),
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
