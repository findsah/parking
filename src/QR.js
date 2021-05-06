import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default class QR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      save: '',
    };
  }

  onSuccess = (e) => {
    console.log('Data', e);
    e.data;
    console.log('E.DATA===>', e.data);
    console.log('Dataaaaaaa======>>>', this.state.setToken);
    this.Image(e.data);
  };
  Image = (token) => {
    fetch(
      'https://backend-parking-app.herokuapp.com/parking/cancel/' + token + '/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
      .then((response) => response.json())

      .then((responsejosn) => {
        this.setState({
          save: responsejosn,
        });
        Alert.alert('Deleted', this.state.save.status);

        console.log('Response', responsejosn);
      });
  };

  render() {
    return (
      <QRCodeScanner
        cameraType="back"
        showMarker={true}
        onRead={this.onSuccess}
        fadeIn={true}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>Scan QR-code </Text>
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 18,
    marginTop: '2%',
    top: '20%',
  },
});
