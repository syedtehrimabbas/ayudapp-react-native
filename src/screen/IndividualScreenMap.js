import {Image, StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Geolocation from '@react-native-community/geolocation';
import Images from '../Image/Images';
import MapView from 'react-native-maps';
import Services from '../FireServices/FireServices';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class IndividualScreenMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.navigation.state.params.requests,
      userLocationAll: [],
      loading: true,
      region: {
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      isMapReady: false,
      marginTop: 1,
      userLocation: '',
      regionChangeProgress: false,
    };
    console.log('requests:', this.state.requests);
    console.log('this.props:', this.props);
  }
  async componentDidMount() {
    await Geolocation.getCurrentPosition(
      (position) => {
        console.log('positinon', position);
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        this.setState({
          region: region,
          loading: false,
          error: null,
        });
      },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false,
        });
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
    );
  }

  render() {
    return (
      <View>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              source={Images.arrowBack}
              resizeMode="contain"
              style={{
                height: hp(6),
                width: wp(9),
                tintColor: 'white',
                marginLeft: wp(3),
              }}
            />
          </TouchableOpacity>
        </View>
        <MapView
          style={{
            height: heightPercentageToDP(94),
            width: widthPercentageToDP(100),
          }}
          initialRegion={this.state.region}
          showsUserLocation={true}
          // onMapReady={this.onMapReady}
          // onRegionChangeComplete={this.onRegionChange}
        >
          {this.state.requests.map((i) => {
            console.log('i', i);
            {
              <MapView.Marker
                coordinate={{
                  latitude: i.requests.latitude,
                  longitude: i.requests.longitude,
                }}
                title={'Your Location'}
                draggable
              />;
            }
          })}
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'black',
    width: wp(100),
    height: hp(6),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerStyleText: {
    color: '#fff',
    fontSize: wp(6),
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
