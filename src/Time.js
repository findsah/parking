import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Actions} from 'react-native-router-flux';
export default class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: '',
      isDateTimePickerVisible: false,
    };
  }
  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
  };

  componentDidMount() {
    this.Clock = setInterval(() => this.GetTime(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  GetTime() {
    // Creating variables to hold time.
    var date, TimeType, hour, minutes, seconds, fullTime;

    // Creating Date() function object.
    date = new Date();

    // Getting current hour from Date object.
    hour = date.getHours();

    // Checking if the Hour is less than equals to 11 then Set the Time format as AM.
    if (hour <= 12) {
      TimeType = 'AM';
    } else {
      // If the Hour is Not less than equals to 11 then Set the Time format as PM.
      TimeType = 'PM';
    }

    // IF current hour is grater than 12 then minus 12 from current hour to make it in 12 Hours Format.
    if (hour > 12) {
      hour = hour - 12;
    }

    // If hour value is 0 then by default set its value to 12, because 24 means 0 in 24 hours time format.
    if (hour == 0) {
      hour = 12;
    }

    // Getting the current minutes from date object.
    minutes = date.getMinutes();

    // Checking if the minutes value is less then 10 then add 0 before minutes.
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    //Getting current seconds from date object.
    seconds = date.getSeconds();

    // If seconds value is less than 10 then add 0 before seconds.
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    // Adding all the variables in fullTime variable.
    fullTime =
      hour.toString() +
      ':' +
      minutes.toString() +
      ':' +
      seconds.toString() +
      ' ' +
      TimeType.toString();

    // Setting up fullTime variable in State.
    this.setState({
      time: fullTime,
    });
  }

  showTime = () => {
    Alert.alert('Your Current time is', this.state.time.toString());
  };

  render() {
    return (
      <View style={styles.MainContainer}>
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
              style={{alignSelf: 'center', marginTop: '21%'}}
            />
          </ImageBackground>
        </View>
        <View
          style={{
            height: 100,
            width: '80%',
            // backgroundColor: 'red',
            bottom: '30%',
          }}>
          <Text style={styles.TextStyle}> {this.state.time} </Text>

          <Button
            title="Click Here To Get Current Time"
            onPress={this.showTime}
          />
        </View>
        <View
          style={{
            height: 50,
            width: '100%',
            //backgroundColor: 'red',
            top: '-20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            title="Select Time"
            onPress={() => this.showDateTimePicker()}
          />
          {/* this.showDateTimePicker */}
          <DateTimePicker
            mode="time"
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
        </View>
        <View
          style={{
            height: '20%',
            width: '100%',
            // backgroundColor: 'red',
            marginBottom: '-40%',
            bottom: '-17%',
          }}>
          <ImageBackground
            source={require('../src/pics/login1pic.png')}
            style={{width: '100%', height: 180, marginTop: '1%'}}>
            <Text
              style={{
                alignSelf: 'center',
                marginTop: '15%',
                color: 'white',
                fontSize: 13,
                top: '-20%',
              }}>
              By signing up, you are agree with our
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: 13,
                top: '-18%',
                textDecorationLine: 'underline',
              }}>
              Terms & Conditions
            </Text>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // margin: 10,
  },

  TextStyle: {
    fontSize: 26,
    textAlign: 'center',
    color: '#009688',
    marginBottom: 20,
  },
  imagesty: {
    width: '100%',
    height: 190,
    marginTop: '-20%',
    top: '-225%',
  },
});
