import React, { useState, Component, Fragment } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {Animated} from "react-native";

export default function Feed ({route, navigation}){
  let params = route.params.route
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>F E E D</Text>
    </View>)
}

