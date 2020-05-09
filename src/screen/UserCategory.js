import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CommmonButton from './CommonButton';
import {FlatList} from 'react-native-gesture-handler';
import Images from '../Image/Images';
import Services from '../FireServices/FireServices';

let button = [
  {
    id: 1,
    text: 'Necesito ayuda',
    color: '#ffcb08',
    icon: Images.needhelp,
  },
  {
    id: 2,
    text: 'Quiero ayudar by un individuo',
    color: '#231f20',
    icon: Images.individual,
  },
  {
    id: 3,
    text: 'Quiero ayudar Soy una empresa',
    color: '#a6ce39',
    icon: Images.company,
  },
  {
    id: 4,
    text: 'Crear banco de alimenio distribuido',
    color: '#0095da',
    icon: Images.foodbank,
  },
  {
    id: 5,
    text: 'Ver estadisticas y resumen',
    color: '#da0101',
    icon: Images.statistics,
  },
];
let userStatus = '';
export default class UserCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.headerStyleText}>¿Qué deseas hacer? </Text>
          <Text style={styles.headerStyleTextSub}>You want to do?</Text>
        </View>
        <View>
          <FlatList data={button} renderItem={this.renderButton} />
        </View>
      </View>
    );
  }
  renderButton = ({item}) => {
    return (
      <View
        style={{
          width: wp(90),
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: hp(5),
        }}>
        <Image
          source={item.icon}
          resizeMode="cover"
          style={{
            height: hp(8),
            width: wp(15),
            marginTop: hp(2),
          }}
        />
        <CommmonButton
          onPress={() => this.onButtonPress(item.id)}
          buttonTextStyle={{
            fontWeight: 'bold',
            fontSize: wp(5),
            textAlign: 'center',
            alignSelf: 'center',
            width: wp(70),
          }}
          TextStyle={{fontSize: 12}}
          style={{
            paddingTop: hp(2),
            backgroundColor: item.color,
            alignSelf: 'center',
            justifyContant: 'center',
            alignItems: 'center',
            paddingBottom: hp(2),
            width: wp(75),
            //   paddingLeft: wp(7),
            //   paddingRight: wp(7),
            marginTop: hp(2),
            borderRadius: wp(1),
          }}
          Text={item.text}
        />
      </View>
    );
  };
  onButtonPress = (id) => {
    if (id === 1) {
      userStatus = 'Needy';
      Services.updateUserStatus(userStatus, (res) => {
        if (res.isSuccess) {
          this.props.navigation.navigate('Home', {type: userStatus});
        }
      });
    } else if (id === 2) {
      userStatus = 'IndevidualHelper';
      Services.updateUserStatus(userStatus, (res) => {
        if (res.isSuccess) {
          this.props.navigation.navigate('IndividualHelperForm');
        }
      });
    } else if (id === 3) {
      userStatus = 'CompanyHelper';
      Services.updateUserStatus(userStatus, (res) => {
        if (res.isSuccess) {
          this.props.navigation.navigate('IndividualHelperForm');
        }
      });
    } else if (id === 4) {
      userStatus = 'BankPoint';
      Services.updateUserStatus(userStatus, (res) => {
        if (res.isSuccess) {
          this.props.navigation.navigate('BankPoint', {type: userStatus});
        }
      });
    }
  };
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'black',
    width: wp(100),
    height: hp(10),
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(8),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  headerStyleTextSub: {
    color: '#fff',
    fontSize: wp(5),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
