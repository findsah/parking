import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {View, Text, ActivityIndicator} from 'react-native';
import {
  Router,
  Scene,
  ActionConst,
  Stack,
  Actions,
} from 'react-native-router-flux';
import logIn from './src/logIn';
import register from './src/register';
import mapScreen from './src/mapScreen';
import parkingPostion from './src/parkingPostion';
import qrScreen from './src/qrScreen';
import Time from './src/Time';
import Reset from './src/Reset';
import Credentials from './src/Credentials';
import QR from './src/QR';
export default class App extends Component {
  // componentDidMount() {
  //   SplashScreen.hide();
  // }
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene
            key="logIn"
            initial={logIn}
            component={logIn}
            hideNavBar={true}
          />
          <Scene key="register" component={register} hideNavBar={true} />
          <Scene key="mapScreen" component={mapScreen} hideNavBar={true} />
          <Scene
            key="parkingPostion"
            component={parkingPostion}
            hideNavBar={true}
          />
          <Scene key="qrScreen" component={qrScreen} hideNavBar={true} />
          <Scene key="Time" component={Time} hideNavBar={true} />
          <Scene key="Reset" component={Reset} hideNavBar={true} />
          <Scene key="QR" component={QR} hideNavBar={true} />
          <Scene key="Credentials" component={Credentials} hideNavBar={true} />
        </Stack>
      </Router>
    );
  }
}
