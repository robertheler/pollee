import * as React from 'react';
import { Component, Fragment} from "react";
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import {Animated} from "react-native";
import Home from './screens/Home.js'

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {
      fadeOutValue: new Animated.Value(1),
      fadeInValue: new Animated.Value(0)
    };
  }

  componentDidMount = () => {
    this.fadeOutAndDisplayApp();
  }

  fadeOutAndDisplayApp = () => {
    Animated.timing(this.state.fadeOutValue, {
      toValue: 0,
      duration: 2000
    }).start();
    Animated.timing(this.state.fadeInValue, {
      toValue: 1,
      duration: 2000
    }).start();
  };


  render () {
    return (
      <NavigationContainer style={{position: "absolute"}}>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Settings" component={SettingsStackScreen} />
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