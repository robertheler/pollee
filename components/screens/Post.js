import React, { useState, Component, Fragment } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";


export default function Post ({route, navigation}){
  let params = route.params.route
  // $.ajax({
  //   url: '/api/polls',
  //   type: 'POST',
  //   success: (response) => {
  //     console.log(response);
  //   },
  //   data: {
  //     "by": "10158294838614732",
  //     "question": "Does this reach the api?",
  //     "answers":  "{Yes, No}"
  //   },
  //   error: (e) => {
  //     console.log(e);
  //   },
  //   dataType: 'json',
  // });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>P O S T</Text>
    </View>)
}

