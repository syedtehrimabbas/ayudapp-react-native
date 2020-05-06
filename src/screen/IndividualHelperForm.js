import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import Services from '../FireServices/FireServices';

export default class IndividualHelperForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }
  componentDidMount() {
    let ArrayLocation = [];
    Services.getRequestedOrderByUser((res) => {
      console.log('reeeeeee', res);
      res.requests.map((i) => {
        ArrayLocation.push({
          latitude: i.requests.latitude,
          longitude: i.requests.longitude,
        });
      });
      console.log('ArrayLocation', ArrayLocation);
      this.setState({userLocationAll: ArrayLocation});
    });
    Geolocation.getCurrentPosition(
      (position) => {
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
        <MapView
          style={{
            height: heightPercentageToDP(100),
            width: widthPercentageToDP(100),
          }}
          initialRegion={this.state.region}
          showsUserLocation={true}
          // onMapReady={this.onMapReady}
          // onRegionChangeComplete={this.onRegionChange}
        >
          {this.state.userLocationAll.map((i) => {
            <MapView.Marker
              coordinate={{
                latitude: i.latitude,
                longitude: i.longitude,
              }}
              title={'Your Location'}
              draggable
            />;
          })}
        </MapView>
      </View>
    );
  }
}
