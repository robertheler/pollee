import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Item, Input, Text } from "native-base";

export default class AddChoice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Item last>
        <Input
          placeholder="Answer 1"
          //value={this.props.answer}
          //getRef={(ref) => { this.SearchInput = ref; }}
          //onChangeText={val => this.setState({ answer1: val })}
          //id="answer1"
        />
      </Item>
    );
  }
}
