import * as React from "react";
import { Component, Fragment } from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Answer from "./screens/Answer.js";
import Results from "./screens/Results.js";
import Ask from "./screens/Ask.js";
import You from "./screens/You.js";
import Discover from "./screens/Discover.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white"
  }
};
const HomeStack = createStackNavigator();

function AnswerScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FDC100"
        },
        headerTintColor: "#202020",
        headerTitleStyle: {
          fontWeight: "bold"
        }
        //headerShown: false
      }}
    >
      <HomeStack.Screen
        style={{ backgroundColor: "white" }}
        name="P O L L E E"
        component={Answer}
        initialParams={{ route: route.params.props }}
      />
    </HomeStack.Navigator>
  );
}

function ResultsScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FDC100"
        },
        headerTintColor: "#202020",
        headerTitleStyle: {
          fontWeight: "bold"
        }
        //headerShown: false
      }}
    >
      <HomeStack.Screen
        name="A C T I V I T Y"
        component={Results}
        initialParams={{ route: route.params.props }}
      />
    </HomeStack.Navigator>
  );
}

function DiscoverScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FDC100"
        },
        headerTintColor: "#202020",
        headerTitleStyle: {
          fontWeight: "bold"
        }
        //headerShown: false
      }}
    >
      <HomeStack.Screen
        name="D I S C O V E R"
        component={Discover}
        initialParams={{ route: route.params.props }}
      />
    </HomeStack.Navigator>
  );
}

function AskScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FDC100"
        },
        headerTintColor: "#202020",
        headerTitleStyle: {
          fontWeight: "bold"
        }
        //headerShown: false
      }}
    >
      <HomeStack.Screen
        name="N E W  P O L L"
        component={Ask}
        initialParams={{ route: route.params.props }}
      />
    </HomeStack.Navigator>
  );
}

function YouScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FDC100"
        },
        headerTintColor: "#202020",
        headerTitleStyle: {
          fontWeight: "bold"
        }
        //headerShown: false
      }}
    >
      <HomeStack.Screen
        name="Y O U"
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
  logout () {
    this.props.logout()
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
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(newUser)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {})
      .catch(error => {
        console.error("Error:", error);
      });
  }
  render() {
    return (
      <NavigationContainer style={{ backgroundColor: "white" }} theme={MyTheme}>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            inactiveTintColor: "#C1C1C1",
            activeTintColor: "#202020", //"#202020",FDDE4E
            tabStyle: {
              marginTop: 10
            },
            style: {
              backgroundColor: "white", //FDC100
              alingItems: "center",
              justifyContent: "center"
            }
          }}
        >
          <Tab.Screen
            style={{ backgroundColor: "gray" }}
            name="Answer"
            component={AnswerScreen}
            initialParams={{ props: this.props }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="poll" color={color} size={35} />
              )
            }}
          />
          {/* <Tab.Screen
            style={{ backgroundColor: "gray" }}
            name="Discover"
            component={DiscoverScreen}
            initialParams={{ props: this.props }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-globe" color={color} size={40} />
              )
            }}
          /> */}
          <Tab.Screen
            style={{ backgroundColor: "white" }}
            name="Ask"
            component={AskScreen}
            initialParams={{ props: this.props }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="add-circle-outline"
                  color={color}
                  size={42}
                />
              )
            }}
          />
          <Tab.Screen
            style={{ backgroundColor: "white" }}
            name="Results"
            component={ResultsScreen}
            initialParams={{ props: this.props }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="history"
                  color={color}
                  size={44}
                />
              )
            }}
          />
          <Tab.Screen
            style={{ backgroundColor: "white" }}
            name="You"
            component={YouScreen}
            initialParams={{ props: this.props }}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user" color={color} size={35} />
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
