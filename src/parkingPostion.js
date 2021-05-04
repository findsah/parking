import React, {Component} from 'react';
import {
  Easing,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('window');

const ROWS = 6;
const COLS = 4;
const TIMING = 600;
const TEXT_HEIGHT = 15;
let seats = [];
let seatsAnimation = [];

for (var i = 0; i < ROWS + COLS - 1; i++) {
  seatsAnimation.push(i);
}

Array(ROWS * COLS)
  .join(' ')
  .split(' ')
  .map((_, i) => {
    const currentIndex = (i % COLS) + (Math.floor(i / COLS) % ROWS);
    const currentItem = {
      label: i + 1 < 10 ? '0' + (i + 1) : i + 1,
      s: currentIndex,
      key: i,
      // icOccupied: false,
      selected: false,
      animated: new Animated.Value(1),
    };

    seats.push(currentItem);
  });

export default class BusSeat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      selectedItems: [],
      userId: 0,
      AddressId: 0,
      BusSeat: seats,
      booking: '',
      pressed: false,
      occupied: [],
      isOccupied: false,
    };

    this.selectionAnimation = new Animated.Value(0);

    this.animatedValue = [];
    seatsAnimation.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0);
    });
  }
  getAlert = () => {
    Alert.alert('Successfully Booked', 'Booked', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Show QR Code',

        onPress: () =>
          Actions.qrScreen({
            qr: this.state.booking.qrcode,
          }),
      },
    ]);
  };

  getUserId = async () => {
    await AsyncStorage.getItem('stsUser_id').then((v) => {
      console.log('user id', v);
      this.setState({
        userId: parseInt(v),
      });
    });
    await AsyncStorage.getItem('Address_Id').then((id) => {
      console.log('Address id 27===>>', id);
      this.setState({
        AddressId: parseInt(id),
      });
    });
  };
  componentDidMount = async () => {
    await AsyncStorage.getItem('UserId').then((response) => {
      console.log('Response id checked', JSON.parse(response));
      this.setState({
        BusSeat: JSON.parse(response),
      });
    });
    this.occupiedSpots();
    this.getUserId();
  };

  occupiedSpots = async () => {
    await AsyncStorage.getItem('Address_Id').then((id) => {
      console.log('Address id 14===>>', id);
      this.setState({
        AddressId: parseInt(id),
      });
    });
    var requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
    };
    await fetch(
      'https://backend-parking-app.herokuapp.com/parking/occupied/' +
        this.state.AddressId +
        '/',
      requestOptions,
    )
      .then((response) => response.json())
      .then((res) => {
        // console.log('Item clock data', res.Occupied_Seats);
        this.setState({
          BusSeat: res?.Occupied_Seats?.map((item) => {
            this.state.BusSeat.map((word) => {
              if (word.key.includes(item)) {
                return {
                  ...word,
                  isOccupied: true,
                };
              } else {
                return {
                  ...word,
                  isOccupied: false,
                };
              }
            });
          }),
        });

        console.log('status==>', res);
        // {
        //   this.setState({
        //     occupied: res.Occupied_Seats,
        //   });
        //   console.log('Occupied Seats======>', res.Occupied_Seats);
        // }
      });
  };
  bookSpot = async (item) => {
    console.log(
      'Userid and address',
      this.state.userId,
      this.state.AddressId,
      item.key + 1,
    );
    var requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json',
      },
    };
    await fetch(
      'https://backend-parking-app.herokuapp.com/parking/booking/' +
        item.key +
        1 +
        '/' +
        this.state.AddressId +
        '/' +
        this.state.userId +
        '/',
      requestOptions,
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.status == 'Seat Already occupied') {
          Alert.alert('Sorry', 'Seat Already occupied');
          console.log('status==>', res);
        } else if (res.status == 'Only handicapped users allowed!') {
          Alert.alert(
            'Sorry , First Five Spots are already reserved for handicapped users , Start selecting for number 6;',
            'Only handicapped users allowed!',
          );
        } else {
          this.setState({
            booking: res,
          });
          Alert.alert('Successfully Booked', 'Booked', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Show QR code',

              onPress: () =>
                Actions.qrScreen({
                  qr: this.state.booking.qrcode,
                }),
            },
          ]);
        }
      });
  };
  toggleMethod = async (id) => {
    let obj = this.state.BusSeat?.map((elem) => {
      elem.selected = false;
      if (elem?.key === id) {
        if (elem.selected !== true) {
          return {
            ...elem,
            // selected: true,
            selected: !elem.selected,
          };
        }
        return elem;
      }
      return elem;
    });
    await AsyncStorage.setItem('UserId', JSON.stringify(obj));
    await AsyncStorage.getItem('UserId').then((response) => {
      console.log('Response id checked', JSON.parse(response));
      this.setState({
        BusSeat: JSON.parse(response),
      });
    });
    // seats.push(obj);
  };
  renderItem = ({item}) => {
    const i = item.key;
    // console.log('value======>value======>', item);
    const scale = this.animatedValue[item.s].interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0, 1],
    });
    // const {selectedItems} = this.state;
    // const isSelected = selectedItems.includes(item.key);
    // const itemPressScale = item.animated.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [1, 0, 1],
    // });

    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          this.toggleMethod(item.key);
          this.bookSpot(item);
          return;
          const selected = isSelected
            ? selectedItems.filter((i) => i !== item.key)
            : [...selectedItems, item.key];

          item.animated.setValue(0);
          this.setState(
            {
              selectedItems: selected,
            },
            () => {
              Animated.parallel([
                Animated.timing(this.selectionAnimation, {
                  toValue: -TEXT_HEIGHT * selected.length,
                  duration: 500,
                  useNativeDriver: true,
                  easing: Easing.elastic(1.3),
                }),
                Animated.timing(item.animated, {
                  toValue: 1,
                  duration: 200,
                  useNativeDriver: true,
                }),
              ]).start();
            },
          );
        }}
        style={{
          opacity: 2 - parseInt(item.s) / 15,
        }}>
        <Animated.View
          style={{
            transform: [
              {
                scale: item.animated,
              },
            ],
          }}>
          <Animated.View
            style={[
              {
                backgroundColor: item.selected ? 'green' : 'red',
                margin: '1%',
              },
              styles.item,
              {
                height: 60,
                width: 60,
                alignSelf: 'center',
                marginLeft: 30,
                marginBottom: 1,
                marginTop: 10,

                // transform: [
                //   {
                //     scale,
                //   },
                // ],
              },
            ]}>
            {/* <Animated.Text style={[styles.itemText]}>
              {item.label}
            </Animated.Text> */}
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log('object value======>>>>>>>>', this.state.BusSeat);
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imagesty}
          source={require('../src/pics/login1pic.png')}>
          <Image
            source={require('../src/pics/iconpic.png')}
            style={{alignSelf: 'center', marginTop: '15%'}}
          />
        </ImageBackground>
        <View
          style={{
            height: 30,
            width: '100%',
            // backgroundColor: 'red',
            top: '-6%',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 15, alignSelf: 'center', fontWeight: 'bold'}}>
            CHOOSE YOUR PARKING SPOT
          </Text>
        </View>
        <FlatList
          numColumns={COLS}
          extraData={this.state.selectedItems}
          data={this.state.BusSeat}
          // data={seats}
          style={{width: '100%', height: '1%'}}
          renderItem={this.renderItem}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            flex: 0.2,
          }}>
          <View
            style={{
              height: TEXT_HEIGHT,
              overflow: 'hidden',
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}></View>
          <View
            style={{
              height: 30,
              width: '75%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: '-235%',
              //backgroundColor: 'red',
              left: '350%',
            }}>
            <Text
              onPress={() => Actions.qrScreen()}
              style={{fontSize: 12, fontWeight: 'bold'}}>
              BY CLICKING ON SPOT PLEASE BOOK YOUR SPACE
            </Text>
          </View>
          <View>
            <ImageBackground
              style={styles.image2sty}
              source={require('../src/pics/login1pic.png')}>
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: '7%',
                  color: 'white',
                  fontSize: 13,
                  top: '-6%',
                }}>
                By signing up, you are agree with our
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'white',
                  fontSize: 13,
                  top: '-5%',
                  textDecorationLine: 'underline',
                }}>
                Terms & Conditions
              </Text>
            </ImageBackground>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    marginTop: '50%',
  },
  item: {
    width: width / COLS,
    height: width / COLS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: 'white',
    fontWeight: '700',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
  imagesty: {
    width: '100%',
    height: 180,
    marginTop: '-53%',
    top: '-10%',
  },
  image2sty: {
    width: '100%',
    height: 190,
    marginBottom: '-25%',
    marginTop: '8%',
    marginRight: '50%',
    right: '16%',
  },
});
