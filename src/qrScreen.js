import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import Swipeout from 'react-native-swipeout';
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {qr} = this.props;
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
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flex: 1,
            }}>
            <ScrollView style={{width: '100%'}}>
              <ImageBackground
                style={styles.imagesty}
                source={require('../src/pics/login1pic.png')}>
                <Image
                  source={require('../src/pics/iconpic.png')}
                  style={{alignSelf: 'center', marginTop: '18%'}}
                />
              </ImageBackground>

              <Text style={{fontSize: 18, marginTop: '3%', marginLeft: '20%'}}>
                Scan your QR code while parking
              </Text>
              <Image
                source={{uri: 'https://backend-parking-app.herokuapp.com' + qr}}
                style={{
                  alignSelf: 'center',
                  marginTop: '2%',
                  top: '5%',
                  height: 200,
                  width: 200,
                }}
              />

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
            </ScrollView>
          </View>
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
    height: 180,
    marginTop: '-15%',
  },

  text1sty: {
    //  fontFamily: 'Century Gothic',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  s_inputview: {
    height: 55,
    width: '80%',
    // borderWidth: 1,
    borderRadius: 22,
    // borderColor: '#000000',
    // backgroundColor: '#2271B0',
    justifyContent: 'center',
    marginTop: '25%',
    marginBottom: '15%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  s_input2: {
    borderColor: 'transparent',
    width: '100%',
    paddingRight: 25,
  },
  Iconsty: {
    position: 'absolute',
    right: 15,
    top: 12,
    fontSize: 23,
  },
  registerbtnsty: {
    height: 45,
    width: '50%',
    borderWidth: 0.6,
    borderRadius: 15,
    borderColor: '#000000',
    backgroundColor: '#2271B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    alignSelf: 'center',
  },
  image2sty: {
    width: '100%',
    height: 200,
    marginBottom: '-20%',
    marginTop: '60%',
  },
});
