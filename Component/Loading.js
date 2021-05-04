import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";

export class Loading extends Component {
  render() {
    return (
      <View>
        {this.props.ShowLoading ? (
          <View
            style={{
              // height:100,
              // width:100,
              alignItems: "center",
              justifyContent: "center",
              //  marginTop:-6,
              //  backgroundColor:'#0004',
              //  zIndex:1,
              //  position:'absolute'
            }}
          >
            <ActivityIndicator color={this.props.clr} size={"large"} />
            {/* <Text style={{color:'blue',fontSize:25}}>Please Wait</Text> */}
          </View>
        ) : null}
      </View>
    );
  }
}
