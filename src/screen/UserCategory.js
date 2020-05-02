import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import CommmonButton from './CommonButton';
import {FlatList} from 'react-native-gesture-handler';

let button = [
  {
    id: 1,
    text: 'Necesito ayuda',
    color: '#e0e31b',
  },
  {
    id: 2,
    text: 'Quiero ayudar by un individuo',
    color: '#3454e3',
  },
  {
    id: 3,
    text: 'Quiero ayudar Soy una empresa',
    color: '#0b991e',
  },
  {
    id: 4,
    text: 'Crear banco de alimenio distribuido',
    color: '#4287f5',
  },
];
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
      <CommmonButton
        onPress={() => this.onButtonPress(item.id)}
        style={{
          paddingTop: hp(2),
          backgroundColor: item.color,
          alignSelf: 'center',
          justifyContant: 'center',
          alignItems: 'center',
          paddingBottom: hp(2),
          width: wp(90),
          //   paddingLeft: wp(7),
          //   paddingRight: wp(7),
          marginTop: hp(2),
          borderRadius: wp(1),
        }}
        Text={item.text}
      />
    );
  };
  onButtonPress = (id) => {
    if (id === 1) {
      this.props.navigation.navigate('Home');
    } else if (id === 2) {
      this.props.navigation.navigate('IndividualHelperForm');
    } else if (id === 3) {
      this.props.navigation.navigate('IndividualHelperForm');
    } else if (id === 4) {
      this.props.navigation.navigate('BankPoint');
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
