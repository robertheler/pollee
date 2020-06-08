import React, { useState, Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

export default class You extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return <Text style={{fontSize: 20}}>{this.props.poll.question.toString()}</Text>
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "white",
    flex: 1,
    alignItems: "center"
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
