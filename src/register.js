import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Icon, Button, Item, Input} from 'native-base';
import {Loading} from '../Component/Loading';
import {Actions} from 'react-native-router-flux';
import {RadioButton} from 'react-native-paper';
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'first',
      setName: '',
      setMembership_id: '',
      setContact_number: '',
      setVehicle_number: '',
      setEmail: '',
      setPassword: '',
      setHandicap: '',
      isLoading: false,
    };
  }
  handleName = (text) => {
    this.setState({setName: text});
  };

  handleMembership = (text) => {
    this.setState({setMembership_id: text});
  };

  handleContact_number = (text) => {
    this.setState({setContact_number: text});
  };

  handleVehicle = (text) => {
    this.setState({setVehicle_number: text});
  };

  handelEmail = (text) => {
    this.setState({setEmail: text});
  };
  handelPassword = (text) => {
    this.setState({setPassword: text});
  };

  handelHandicap = (text) => {
    this.setState({setHandicap: text});
    {
      this.setState({checked: 'first'});
    }
    {
      this.setState({checked: 'second'});
    }
  };

  userSignup = () => {
    this.setState({isLoading: true});

    if (
      this.state.setName === '' ||
      this.state.setMembership_id === '' ||
      this.state.setContact_number === '' ||
      this.state.setVehicle_number === '' ||
      this.state.setEmail === '' ||
      this.state.setPassword === '' ||
      this.state.setHandicap === ''
    ) {
      this.setState({isLoading: false});
      Alert.alert('Please Enter required field');
    } else {
      let formdata = new FormData();
      formdata.append('name', this.state.setName);
      formdata.append('membership_id', this.state.setMembership_id);
      formdata.append('contact_number', this.state.setContact_number);
      formdata.append('vehicle_number', this.state.setVehicle_number);
      formdata.append('email_address', this.state.setEmail);
      formdata.append('password', this.state.setPassword);
      formdata.append('handicap', this.state.setHandicap);

      console.log('formdata', formdata);
      this.setState({
        isLoading: true,
      });
      fetch('https://backend-parking-app.herokuapp.com/user/register/', {
        method: 'POST',

        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        body: formdata,
      })
        .then((response) => response.json())

        .then((data) => {
          if (
            data.vehicle_number ==
            'User with this Vehicle Number already exists.'
          ) {
            this.setState({isLoading: false});
            Alert.alert(
              'Sorry',
              'User with this Vehicle Number already exists.',
            );
            console.log('Data', data);
          } else if (
            data.email_address == 'User with this email already exists.'
          ) {
            this.setState({isLoading: false});
            Alert.alert('Sorry', 'User with this email already exists.');
          } else {
            this.setState({
              // userData: data,
              isLoading: false,
            });
            Alert.alert('Registered', ' Go to Login', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Login',
                onPress: () => Actions.logIn(),
                style: 'default',
              },
            ]);
          }
        })

        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    const {checked} = this.state;
    return (
      <>
        <SafeAreaView
          style={{backgroundColor: '#F7F7F7', justifyContent: 'center'}}
        />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: '#F7F7F7',
            justifyContent: 'center',
          }}>
          <ScrollView>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <ImageBackground
                style={styles.imagesty}
                source={require('../src/pics/login1pic.png')}>
                <Image
                  source={require('../src/pics/iconpic.png')}
                  style={{alignSelf: 'center', marginTop: '15%'}}
                />
              </ImageBackground>

              <Text style={styles.text1sty}>Registration</Text>
              <View
                style={{width: '100%', alignItems: 'center', height: '68%'}}>
                <View style={styles.s_inputview}>
                  <Input
                    placeholder=" Name"
                    placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    onChangeText={(text) => this.handleName(text)}
                  />
                </View>
                <View style={styles.s_inputview}>
                  <Input
                    keyboardType="number-pad"
                    placeholder=" Membership ID"
                    placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    onChangeText={(text) => this.handleMembership(text)}
                  />
                </View>
                <View style={styles.s_inputview}>
                  <Input
                    keyboardType="number-pad"
                    placeholder=" Contact Number"
                    placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    onChangeText={(text) => this.handleContact_number(text)}
                  />
                </View>
                <View style={styles.s_inputview}>
                  <Input
                    keyboardType="number-pad"
                    placeholder=" Vehical Number"
                    placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    onChangeText={(text) => this.handleVehicle(text)}
                  />
                </View>
                <View style={[styles.s_inputview, {flexDirection: 'row'}]}>
                  <Item style={styles.s_input2}>
                    <Input
                      placeholder="Email Address"
                      placeholderTextColor="rgba(0, 0, 0, 0.25)"
                      secureTextEntry={this.state.hide}
                      onChangeText={(text) => this.handelEmail(text)}
                    />
                  </Item>
                  <Icon style={styles.Iconsty} type="AntDesign" name="mail" />
                </View>
                <View style={[styles.s_inputview, {flexDirection: 'row'}]}>
                  <Item style={styles.s_input2}>
                    <Input
                      placeholder="Password"
                      placeholderTextColor="rgba(0, 0, 0, 0.25)"
                      secureTextEntry={true}
                      onChangeText={(text) => this.handelPassword(text)}
                    />
                  </Item>
                  <Icon
                    style={styles.Iconsty}
                    type="Ionicons"
                    name="lock-closed-outline"
                  />
                </View>
                <View
                  style={{
                    height: '7%',
                    width: '80%',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    marginLeft: '5%',
                    marginTop: '-2%',
                    top: '4%',
                    // backgroundColor: 'red',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#0D0108',
                      top: '2%',
                      letterSpacing: 2,
                      left: '-20%',
                    }}>
                    Are you Handicap Person?
                  </Text>
                  <RadioButton
                    color="#0D8393"
                    uncheckedColor="#0D8393"
                    value="first"
                    status={checked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => this.handelHandicap('yes')}
                  />
                  <RadioButton
                    color="#0D8393"
                    uncheckedColor="#0D8393"
                    value="second"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => this.handelHandicap('no')}
                  />
                  <Text style={{top: '9%', right: '180%', fontSize: 12}}>
                    Yes
                  </Text>
                  <Text style={{top: '9%', right: '125%', fontSize: 12}}>
                    No
                  </Text>
                </View>
                <Button
                  onPress={() => this.userSignup()}
                  style={styles.registerbtnsty}>
                  {this.state.isLoading === false ? (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 25,
                      }}>
                      Register
                    </Text>
                  ) : (
                    <Loading ShowLoading={this.state.isLoading} clr={'white'} />
                  )}
                </Button>
                <ImageBackground
                  style={styles.image2sty}
                  source={require('../src/pics/login1pic.png')}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: '7%',
                      color: 'white',
                      fontSize: 13,
                      top: '-2%',
                    }}>
                    By signing up, you are agree with our
                  </Text>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: 'white',
                      fontSize: 13,
                      top: '-2%',
                      textDecorationLine: 'underline',
                    }}>
                    Terms & Conditions
                  </Text>
                </ImageBackground>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagesty: {
    width: '100%',
    height: 190,
    marginTop: '-13%',
  },

  text1sty: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    marginRight: '34%',
    marginTop: '-2%',
  },
  s_inputview: {
    height: 45,
    width: '80%',
    borderWidth: 1,
    borderRadius: 22,
    borderColor: '#000000',
    backgroundColor: '#ECEFF4',
    justifyContent: 'center',
    marginTop: '2%',
    alignSelf: 'center',
    top: '3%',
    paddingHorizontal: 20,
  },
  s_input2: {
    width: '100%',
  },
  Iconsty: {
    position: 'absolute',
    right: '8%',
    top: '16%',
    fontSize: 29,
    opacity: 0.2,
  },
  registerbtnsty: {
    height: 50,
    width: '80%',
    borderWidth: 0.6,
    borderRadius: 25,
    borderColor: '#000000',
    backgroundColor: '#2271B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%',
    alignSelf: 'center',
    top: '3%',
  },
  image2sty: {
    width: '100%',
    height: 200,

    marginTop: '1%',
    top: '10%',
  },
});
