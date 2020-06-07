import * as React from 'react';
import { Component, Fragment} from "react";
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import Feed from './screens/Feed.js'
import Post from './screens/Post.js'
import You from './screens/You.js'

const HomeStack = createStackNavigator();

function FeedScreen({route, navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen  name="P O L L E E" component={Feed} initialParams={{route: route.params.props}}/>
    </HomeStack.Navigator>
  );
}

function PostScreen({route, navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen  name="P O L L E E" component={Post} initialParams={{route: route.params.props}}/>
    </HomeStack.Navigator>
  );
}

function YouScreen({route, navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen  name="P O L L E E" component={You} initialParams={{route: route.params.props}}/>
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default class Welcome extends Component {
  constructor(props){
    super(props);
  }

  render () {
    return (
      <NavigationContainer style={{position: "absolute"}}>
        <Tab.Navigator>
          <Tab.Screen name="Feed" component={FeedScreen} initialParams={{props: this.props}}/>
          <Tab.Screen name="Post" component={PostScreen} initialParams={{props: this.props}}/>
          <Tab.Screen name="You" component={YouScreen} initialParams={{props: this.props}}/>
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