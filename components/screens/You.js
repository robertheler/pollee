import React, { useState, Component, Fragment } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {Animated} from "react-native";

export default function You ({route, navigation}){
  let params = route.params.route
  console.log(params);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Y O U</Text>
    </View>)
}

