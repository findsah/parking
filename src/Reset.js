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

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      setEmail_address: '',
      isLoading: false,
    };
  }
  handleEmail_address = (text) => {
    this.setState({setEmail_address: text});
  };
  userReset = () => {
    if (this.state.setEmail_address === '') {
      alert('Please Enter required field');
    } else {
      let formdata = new FormData();

      formdata.append('email', this.state.setEmail_address);

      console.log('formdata', formdata);
      this.setState({
        isLoading: true,
      });
      fetch('https://backend-parking-app.herokuapp.com/user/forgot/', {
        method: 'POST',

        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        body: formdata,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data', data);

          this.setState({
            userEmail: data,
            isLoading: false,
          });
          Alert.alert('Password Reset', this.state.userEmail.status, [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Enter OPTP',
              onPress: () => Actions.Credentials(),
            },
          ]);
        })
        .catch((error) => {
          console.error(error);
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
                <Text style={styles.text1sty}>Reset your Password</Text>
                <Text style={styles.text2sty}>Please Enter your Email</Text>
                <View style={[styles.s_inputview, {flexDirection: 'row'}]}>
                  <Item style={styles.s_input2}>
                    <Input
                      placeholder="Email Address"
                      placeholderTextColor="#1A1A1A"
                      // value={this.state.password}
                      onChangeText={(text) => this.handleEmail_address(text)}
                    />
                  </Item>
                  <Icon style={styles.Iconsty} type="AntDesign" name="mail" />
                </View>

                <Button
                  onPress={() => this.userReset()}
                  style={styles.loginbtnsty}>
                  {this.state.isLoading === false ? (
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                      }}>
                      Send
                    </Text>
                  ) : (
                    <Loading ShowLoading={this.state.isLoading} clr={'white'} />
                  )}
                </Button>
                <ImageBackground
                  source={require('../src/pics/login1pic.png')}
                  style={{width: '100%', height: '60%', marginTop: '36%'}}>
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
