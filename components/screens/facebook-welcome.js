import React, { useState, Component, Fragment } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {Animated} from "react-native";

export default class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {
      fadeOutValue: new Animated.Value(1),
      fadeInValue: new Animated.Value(0)
    };
  }

  componentDidMount = () => {
    this.fadeOutAndDisplayApp();
  }

  fadeOutAndDisplayApp = () => {
    Animated.timing(this.state.fadeOutValue, {
      toValue: 0,
      duration: 2000
    }).start();
    Animated.timing(this.state.fadeInValue, {
      toValue: 1,
      duration: 2000
    }).start();
  };

  render() {
    return (

        <Animated.View style={{
          flex: 1,
          backgroundColor: "#e9ebee",
          alignItems: "center",
          justifyContent: "center",
          opacity: this.state.fadeOutValue,
        }}>
          <Image
            style={{ width: 200, height: 200, borderRadius: 40 }}
            source={{ uri: this.props.userData.picture.data.url }}/>
          <Text style={{ fontSize: 22, marginVertical: 10 }}>Hi {this.props.userData.name}!</Text>
          {/* <TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity> */}
        </Animated.View>)

        }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ebee",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    bottom: 0
  }
});
