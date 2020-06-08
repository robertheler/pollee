import * as React from "react";
import { Component, Fragment } from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Feed from "./screens/Feed.js";
import Post from "./screens/Post.js";
import You from "./screens/You.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeStack = createStackNavigator();

function FeedScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="P O L L E E"
        component={Feed}
        initialParams={{ route: route.params.props }}
      />
    </HomeStack.Navigator>
  );
}

function PostScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="P O L L E E"
        component={Post}
        initialParams={{ route: route.params.props }}
      />
    </HomeStack.Navigator>
  );
}

function YouScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="P O L L E E"
        component={You}
        initialParams={{ route: route.params.props }}
      />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.saveUser(this.props.userData);
  }

  saveUser(userData) {
    let newUser = {
      id: userData.id,
      name: userData.name,
      url: userData.picture.data.url,
      friends: userData.friends || []
    };
    fetch("http://3.221.234.184:3001/api/users", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(newUser)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Answer"
            component={FeedScreen}
            initialParams={{ props: this.props }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="poll" color={color} size={30} />
              )
            }}
          />
          <Tab.Screen
            name="Ask"
            component={PostScreen}
            initialParams={{ props: this.props }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="comment-question-outline" color={color} size={30} />
              )
            }}
          />
          <Tab.Screen
            name="You"
            component={YouScreen}
            initialParams={{ props: this.props }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="face-profile"
                  color={color}
                  size={30}
                />
              )
            }}
          />
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
    justifyContent: "center"
  },
  logoutButton: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    bottom: 0
  }
});
