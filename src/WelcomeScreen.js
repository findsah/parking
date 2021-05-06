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
                <Text style={styles.text1sty}>Smart Parking</Text>

                <Button
                  onPress={() => Actions.logIn()}
                  style={styles.loginbtnsty}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    LOGIN
                  </Text>
                </Button>
                <Button
                  onPress={() => Actions.register()}
                  style={styles.loginbtnsty}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    SIGN IN
                  </Text>
                </Button>

                <ImageBackground
                  source={require('../src/pics/login1pic.png')}
                  style={{width: '100%', height: '60%', marginTop: '38%'}}>
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
    fontSize: 35,
    marginTop: '23%',
    marginLeft: '12%',
    color: '#1D2226',
    top: '-12%',
    left: '10%',
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
