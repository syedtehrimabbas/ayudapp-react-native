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

export default class Home extends Component {
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
            Completa Ios siguientes datos
          </Text>
        </View>
        <ScrollView style={{height: hp(84)}}>
          <View style={{paddingLeft: wp(5), borderBottomWidth: 1}}>
            <Text>Usted necesita</Text>
            <View style={styles.oPtioncontainer}>
              <CheckBox
                value={this.state.individual}
                onValueChange={() =>
                  this.setState({individual: !this.state.individual})
                }
                style={styles.checkbox}
              />
              <Text style={{width: wp(80), fontSize: wp(5)}}>
                Ayuda individual
              </Text>
            </View>
            <View style={styles.oPtioncontainer}>
              <CheckBox
                value={this.state.individual}
                onValueChange={() =>
                  this.setState({individual: !this.state.individual})
                }
                style={styles.checkbox}
              />
              <Text style={{width: wp(80), fontSize: wp(5)}}>
                Ayuda familiar
              </Text>
            </View>
            <View style={styles.oPtioncontainer}>
              <CheckBox
                value={this.state.ong}
                onValueChange={() => this.setState({ong: !this.state.ong})}
                style={styles.checkbox}
              />
              <Text style={{width: wp(80), fontSize: wp(5)}}>ong</Text>
            </View>
          </View>
          <View style={styles.subContainerStyle}>
            <Text style={styles.detailTextStyle}>
              Nombre de la familia, individuo o ONG (Name or family) Este dato
              aparecera publico (public data)
            </Text>
            <TextInput
              placeholder={'Familia Perez'}
              style={styles.placeholderStyle}
            />
          </View>
          <View style={styles.subContainerStyle}>
            <Text style={styles.detailTextStyle}>
              Cantidad de personas por rangos de edades en su familia (Number of
              people by age ranges)
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: wp(30)}}>Menos de 1 ano:</Text>
              <TextInput style={styles.inPUTminiStyle} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: wp(30)}}>De 1 a 12 anos:</Text>
              <TextInput style={styles.inPUTminiStyle} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: wp(30)}}>De 13 a 17 anos:</Text>
              <TextInput style={styles.inPUTminiStyle} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: wp(30)}}>De 18 a 60 anos:</Text>
              <TextInput style={styles.inPUTminiStyle} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{width: wp(30)}}>De 61 a o mas:</Text>
              <TextInput style={styles.inPUTminiStyle} />
            </View>
          </View>
          <View style={styles.subContainerStyle}>
            <Text style={styles.detailTextStyle}>
              ?Enfermedades cronicas en usted o algun familiar?(Chronic disease
              in you or a family member?)
            </Text>
            <View style={styles.boxContainerSTyle}>
              <Text>Chronic disease</Text>
              <CheckBox
                value={this.state.ong}
                onValueChange={() => this.setState({ong: !this.state.ong})}
                style={styles.checkbox}
              />
            </View>
          </View>
          <View style={styles.subContainerStyle}>
            <Text style={styles.detailTextStyle}>
              Seleccion Ios articulos de aseo personal y limieza de hogar que
              necesita- (Cleaning)
            </Text>
            <View style={styles.boxContainerSTyle}>
              <Text>jabon de lavar - (Washing soap)</Text>
              <CheckBox
                value={this.state.ong}
                onValueChange={() => this.setState({ong: !this.state.ong})}
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
                value={this.state.ong}
                onValueChange={() => this.setState({ong: !this.state.ong})}
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
                value={this.state.ong}
                onValueChange={() => this.setState({ong: !this.state.ong})}
                style={styles.checkbox}
              />
            </View>
          </View>
          <View style={styles.subContainerStyle}>
            <Text style={styles.detailTextStyle}>
              Estatus laboral para recibir bono o Bolsa solidria del gobiemo
              (Employment status)
            </Text>

            <View style={styles.boxContainerSTyle}>
              <Picker
                selectedValue={this.state.selectedValue}
                style={styles.placeholderStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
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
              Cuenta bancaria para ayuda en dinero (Bank account number for aid)
            </Text>

            <TextInput
              placeholder={'Familia Perez'}
              style={styles.placeholderStyle}
            />
          </View>
          <View style={styles.subContainerStyle}>
            <Text style={styles.detailTextStyle}>
              Guardar mi ubicacion con GPS para la ayuda (Save my location with
              GPS)
            </Text>
          </View>
        </ScrollView>
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
