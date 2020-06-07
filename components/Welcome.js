import * as React from 'react';
import { Component, Fragment} from "react";
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {Animated} from "react-native";
import Home from './screens/facebook-welcome.js'
import Feed from './screens/Feed.js'


function FeedScreen({ navigation, screenProps }) {
  //console.log('screen Props:', screenProps);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{screenProps}</Text>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </View>
  );
}


const Tab = createBottomTabNavigator();

export default class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render () {
    return (
      <NavigationContainer style={{position: "absolute"}}>
        <Tab.Navigator>
          <Tab.Screen name="Feed" component={Feed} initialParams={{props: this.props}}/>

          <Tab.Screen name="Settings" component={SettingsScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
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