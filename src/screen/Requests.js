import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Services from '../FireServices/FireServices';
import auth from '@react-native-firebase/auth';

export default class Requests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    };
  }
  componentDidMount() {
    console.log('herererererer');
    Services.getRequestedOrderByUser((UserRequests) => {
      console.log('UserRequests', UserRequests);
      let requests = UserRequests.requests.forEach((i) => {
        console.log('i', i);
        return i.requests.userId === auth().currentUser.uid;
      });
      this.setState({requests: requests});
    });
  }
  render() {
    return (
      <View>
        <FlatList data={this.state.requests} renderItem={this.renderRequest} />
      </View>
    );
  }
  renderRequest = ({item}) => {
    console.log('item', item);

    return (
      <View style={styles.placeholderStyle}>
        <Text style={{color: 'black'}}>{item.requests.eggs}</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  placeholderStyle: {
    borderWidth: 1,
    marginTop: hp(1),
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: 'black',
  },
});
