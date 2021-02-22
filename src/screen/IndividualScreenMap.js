import {Image, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {
    heightPercentageToDP,
    heightPercentageToDP as hp,
    widthPercentageToDP,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Geolocation from '@react-native-community/geolocation';
import Images from '../Image/Images';
import MapView from 'react-native-maps';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class IndividualScreenMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.navigation.state.params.requests,
      poliline: false,
      polLat: 0,
      polLong: 0,
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
      lat: 0,
      long: 0,
      polCoords: [],
    };
    console.log('requests:', this.state.requests[0].requests.latitude);
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
          lat: position.coords.latitude,
          long: position.coords.longitude,
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
  // onMarkerPress = (marker) => {
  //   console.log('marker-------------------', marker);
  //   let coords = [];
  //   let markerLocation = {
  //     latitude: marker.latitude,
  //     longitude: marker.polLong,
  //   };
  //   let currentLocation = {
  //     latitude: this.state.lat,
  //     longitude: this.state.long,
  //   };
  //   coords.push(currentLocation, markerLocation);
  //   this.setState({
  //     polCoords: coords,
  //     poliline: true,
  //     polLat: marker.latitude,
  //     polLong: marker.polLong,
  //   });
  // };
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
          initialRegion={{
            latitude: this.state.requests[0].requests.latitude,
            longitude: this.state.requests[0].requests.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          showsUserLocation={true}
          // onMapReady={this.onMapReady}
          // onRegionChangeComplete={this.onRegionChange}
        >
          {this.state.requests.map((i) => {
            return (
              <MapView.Marker
                onPress={() => this.onMarkerPress(i.requests)}
                coordinate={{
                  latitude: i.requests.latitude,
                  longitude: i.requests.longitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                }}
                title={'Your Location'}
                draggable
              />
            );
          })}

          {/* <MapView.Polyline
            coordinates={this.state.polCoords}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000',
            ]}
            strokeWidth={6}
          /> */}
          {/* {this.state.poliline && (
           
          )} */}
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
