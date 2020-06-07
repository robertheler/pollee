import React, { useState, Component, Fragment } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {Animated} from "react-native";

export default class Feed extends Component {
  constructor({route, navigation}){
    const { props } = route.params;
    console.log(props);
    super();

  }



  render() {
    return <Text>Hi</Text>
  }
}

