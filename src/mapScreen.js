import React, {Component, Fragment} from 'react';
import {View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {Input, Icon, Item} from 'native-base';
import {Actions} from 'react-native-router-flux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      latitude: 51.5074,
      longitude: -0.1278,
      longitudeDelta: 0.0321,
      latitudeDelta: 0.0522,
    };
  }
  componentDidMount() {
    this.parkingPlaces();
  }
  parkingPlaces = async () => {
    await fetch('https://backend-parking-app.herokuapp.com/parking/places/', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('Response data', res);
        let response = res?.map((item, index) => {
          return {
            ...item,
            Parking: 'Parking Plaza',
            Digit: index,
          };
        });
        this.setState({
          data: response,
        });
        console.log('Res Para data', response);
      });
  };
  AnimatedLocation = async (item) => {
    let tempCoords = {
      latitude: parseFloat(item?.loc_lat),
      longitude: parseFloat(item?.loc_long),
    };
    this._map.animateToCoordinate(tempCoords, 1);
    this.setState({
      latitude: parseFloat(item?.loc_lat),
      longitude: parseFloat(item?.loc_long),
    });
    // Actions.parkingPostion();
    await AsyncStorage.setItem('Address_Id', JSON.stringify(item.id));
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            height: '50%',
          }}>
          <MapView.Animated
            style={{height: '100%'}}
            provider={PROVIDER_GOOGLE}
            ref={(component) => (this._map = component)}
            zoomControlEnabled
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              longitudeDelta: this.state.longitudeDelta,
              latitudeDelta: this.state.latitudeDelta,
            }}>
            <Marker.Animated
              coordinate={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              title="London"
            />
          </MapView.Animated>
        </View>
        <View
          style={{
            height: 70,
            width: '100%',
            backgroundColor: '#2271B0',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.4,
          }}>
          <Text style={{fontSize: 22, opacity: 5, fontWeight: 'bold'}}>
            LOCATION NEAR BY PARKING...
          </Text>
        </View>
        <View
          style={{
            height: 19,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '2%',
            opacity: 5,
            // backgroundColor: 'red',
          }}>
          <Text style={{fontSize: 12, color: '#A08C8C', fontWeight: 'bold'}}>
            BOOK YOUR PLACE Before 30 Minutes of Arrival.
          </Text>
        </View>
        <View
          style={{
            height: 40,
            width: '100%',
            // backgroundColor: 'green',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: '2%',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              alignSelf: 'flex-start',
              marginLeft: '2%',
              marginTop: '2%',
            }}>
            NEAREST PARKING PLACES
          </Text>
        </View>
        <View
          style={{
            height: '39%',
            width: '100%',
            //backgroundColor: 'red',
          }}>
          <ScrollView showsVerticalScrollIndicator={true}>
            {this.state.data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      this.AnimatedLocation(item);
                    }}>
                    <Text
                      onPress={() =>
                        Actions.parkingPostion({
                          addressId: item?.id,
                        })
                      }
                      style={{
                        fontSize: 20,
                        marginLeft: '3%',
                        marginTop: '1%',
                        paddingVertical: 5,
                      }}>
                      {index + 1}: {item?.address}
                    </Text>
                  </TouchableOpacity>
                </Fragment>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
