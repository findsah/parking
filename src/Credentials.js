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
      setPassword: '',
      setNewPassword: '',
      setOTP: '',
      isLoading: false,
    };
  }
  handelPassword = (text) => {
    this.setState({setPassword: text});
  };

  handleNewPassword = (text) => {
    this.setState({setNewPassword: text});
  };
  handleOTP = (text) => {
    this.setState({setOTP: text});
  };

  userSignup = () => {
    this.setState({isLoading: true});

    if (
      this.state.setPassword === '' ||
      this.state.setNewPassword === '' ||
      this.state.setOTP === ''
    ) {
      this.setState({isLoading: false});
      Alert.alert('Please Enter required field');
    } else {
      let formdata = new FormData();
      formdata.append('new_password', this.state.setPassword);
      formdata.append('re_password', this.state.setNewPassword);

      console.log('formdata', formdata);
      this.setState({
        isLoading: true,
      });
      fetch(
        'https://backend-parking-app.herokuapp.com/user/update/' +
          this.state.setOTP +
          '/',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
          body: formdata,
        },
      )
        .then((response) => response.json())

        .then((data) => {
          if (data.status == 'Wrong OTP') {
            this.setState({
              isLoading: false,
            });
            Alert.alert('Sorry', 'Wrong OTP');
          } else if (data.status == 'Passwords not matched') {
            this.setState({
              isLoading: false,
            });
            Alert.alert('Sorry', 'Passwords not matched');
          } else {
            this.setState({
              userData: data,
              isLoading: false,
            });
            // this.props.navigation.navigate('welcomScreen');
            Alert.alert('Done', this.state.userData.status, [
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

              <Text style={styles.text1sty}>Reset Password</Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  height: '50%',
                  // backgroundColor: 'red',
                  marginTop: '20%',
                }}>
                <View style={styles.s_inputview}>
                  <Input
                    placeholder=" Enter OTP"
                    placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    onChangeText={(text) => this.handleOTP(text)}
                  />
                </View>
                <View style={styles.s_inputview}>
                  <Input
                    secureTextEntry={true}
                    placeholder=" Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    onChangeText={(text) => this.handelPassword(text)}
                  />
                </View>
                <View style={styles.s_inputview}>
                  <Input
                    secureTextEntry={true}
                    placeholder=" Re-Enter Password"
                    placeholderTextColor="rgba(0, 0, 0, 0.25)"
                    onChangeText={(text) => this.handleNewPassword(text)}
                  />
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
                      Send
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
    //  fontFamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    marginRight: '34%',
    marginTop: '-2%',
    top: '10%',
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

    marginTop: '30%',
    top: '10%',
  },
});
