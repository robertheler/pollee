import React, { useState, Component } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {Animated} from "react-native";


export default class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {
      fadeValue: new Animated.Value(1)
    };
  }

  componentDidMount = () => {
    this.fadeOut();
  }
  fadeOut = () => {
    console.log('fading');
    Animated.timing(this.state.fadeValue, {
      toValue: 0,
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
          opacity: this.state.fadeValue,
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
