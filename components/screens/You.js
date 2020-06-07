import React, { useState, Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Animated } from "react-native";

export default function You({ route, navigation }) {
  let params = route.params.route;
  console.log(params);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: params.userData.picture.data.url }}
      />
      <Text>Hi {params.userData.name}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  image: {
    borderTopWidth: 2,
    borderColor: "#F2F2F2",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 15
  }
});
