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
import {Actions} from 'react-native-router-flux';
import {Loading} from '../Component/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
var validator = require('email-validator');
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setEmail: '',
      setPassword: '',
      isLoading: false,
      stsUser_id: '',
    };
  }
  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    AsyncStorage.getItem('user_id', (token) => {
      console.log('Token===========================>', token);
    });
  };
  handleEmail = (text) => {
    this.setState({setEmail: text});
  };
  handlePassword = (text) => {
    this.setState({setPassword: text});
  };
  login = () => {
    this.setState({isLoading: true});
    const valid = validator.validate(this.state.setEmail.trim()); // true
    if (this.state.setEmail === '' || this.state.setPassword === '') {
      this.setState({isLoading: false});
      Alert.alert('Sorry', 'Please Enter Required Field');
    } else if (valid === false) {
      this.setState({isLoading: false});
      Alert.alert('Sorry', 'Please Enter valid Email');
    } else {
      console.log('request send');
      let formdata = new FormData();
      formdata.append('email_address', this.state.setEmail.trim());
      formdata.append('password', this.state.setPassword);
      console.log('FormData===>', formdata);
      fetch('https://backend-parking-app.herokuapp.com/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json, text/plain',
        },
        body: formdata,
      })
        .then((response) => response.json())

        .then(async (responsejosn) => {
          if (responsejosn.response == 'Wrong Credentials, Please try again') {
            this.setState({isLoading: false});
            Alert.alert('Sorry', 'Wrong Credentials, Please try again');
            console.log('Response===>', responsejosn);
          }
          // console.log('Response===>', responsejosn);
          else {
            const User_id = responsejosn.user_id;
            const authToken = responsejosn.token;
            this.setState({
              isLoading: false,
              stsUser_id: User_id,
              userToken: authToken,
            });
            await AsyncStorage.setItem('stsUser_id', JSON.stringify(User_id));
            await AsyncStorage.setItem('userToken', JSON.stringify(authToken));
            Actions.mapScreen();

            console.log(responsejosn.user_id);

            console.log('response send');
          }
        });
    }
  };
  render() {
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

              <View
                style={{
                  width: '100%',
                  alignItems: 'flex-start',
                  height: '100%',
                  marginTop: '15%',
                }}>
                <Text style={styles.text1sty}>Login</Text>
                <Text style={styles.text2sty}>
                  Please login to your account
                </Text>
                <View style={[styles.s_inputview, {flexDirection: 'row'}]}>
                  <Item style={styles.s_input2}>
                    <Input
                      placeholder="Email Address"
                      placeholderTextColor="#1A1A1A"
                      // value={this.state.password}
                      onChangeText={(text) => this.handleEmail(text)}
                    />
                  </Item>
                  <Icon style={styles.Iconsty} type="AntDesign" name="mail" />
                </View>
                <View style={[styles.s_inputview, {flexDirection: 'row'}]}>
                  <Item style={styles.s_input2}>
                    <Input
                      placeholder="Password"
                      placeholderTextColor="#1A1A1A"
                      secureTextEntry={true}
                      // value={this.state.password}
                      onChangeText={(text) => this.handlePassword(text)}
                    />
                  </Item>
                  <Icon
                    style={styles.Iconsty}
                    type="Ionicons"
                    name="lock-closed-outline"
                  />
                </View>
                <Button onPress={() => this.login()} style={styles.loginbtnsty}>
                  {this.state.isLoading === false ? (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      LOGIN
                    </Text>
                  ) : (
                    <Loading ShowLoading={this.state.isLoading} clr={'white'} />
                  )}
                </Button>
                <Text
                  onPress={() => Actions.Reset()}
                  style={{
                    fontSize: 14,
                    marginTop: '1%',
                    marginLeft: '60%',
                    color: '#3A3F43',
                    top: '-1%',
                    opacity: 0.9,
                  }}>
                  Forgot Password?
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: '5%',
                  }}>
                  <Text style={{fontSize: 15, color: '#7C7D7E'}}>
                    Don't Have an Account?
                  </Text>
                  <Text
                    onPress={() => Actions.register()}
                    style={{
                      color: '#7C7D7E',
                      marginLeft: 5,
                      fontSize: 15,
                      textDecorationLine: 'underline',
                    }}>
                    Create new one
                  </Text>
                </View>
                <ImageBackground
                  source={require('../src/pics/login1pic.png')}
                  style={{width: '100%', height: '56%', marginTop: '5%'}}>
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
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: '23%',
    marginLeft: '12%',
    color: '#1D2226',
    top: '1%',
  },
  text2sty: {
    fontSize: 18,
    marginLeft: '12%',
    color: '#3A3F43',
    marginTop: '1%',
    top: '1%',
    opacity: 0.4,
  },
  s_inputview: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 22,
    borderColor: '#1A1A1A',
    backgroundColor: '#ECEFF4',
    justifyContent: 'center',
    marginTop: '3%',
    alignSelf: 'center',
    opacity: 0.9,
  },
  s_input2: {
    width: '100%',
    paddingHorizontal: 20,
    opacity: 0.5,
  },
  Iconsty: {
    position: 'absolute',
    right: '8%',
    top: '16%',
    fontSize: 29,
    opacity: 0.2,
  },
  image2sty: {
    width: '100%',
    height: 200,
    marginBottom: '-20%',
    marginTop: '5%',
  },
  loginbtnsty: {
    height: 50,
    width: '80%',
    borderRadius: 25,
    backgroundColor: '#2271B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
    bottom: '2%',
    alignSelf: 'center',
  },
});
