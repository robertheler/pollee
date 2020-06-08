import React, { useState } from "react";
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import * as Facebook from "expo-facebook";
import { ImageBackground } from "react-native";
import Welcome from './components/Welcome.js';

//console.disableYellowBox = true;

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  login = async () => {
    try {
      const fbResponse = await Facebook.logInWithReadPermissionsAsync("4127928860565729", {
        permissions: ["public_profile"]
      });

      if (fbResponse.type === "success") {
        // Get the user's name using Facebook's Graph API
        fetch(`https://graph.facebook.com/me?access_token=${fbResponse.token}&fields=id,name,picture.height(500)`)
          .then(response => response.json())
          .then(data => {
            //console.log(data);
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch(e => console.log(e));
      }
    } catch ({ error }) {
      alert(`Facebook Login Error: ${error}`);
    }
  };

  logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  };
  let fakeData = {
    "id": "10158294838614730",
    "name": "Robert Heler",
    "picture": {
      "data": {
        "height": 720,
        "is_silhouette": false,
        "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158294838614730&height=500&ext=1594176755&hash=AeSSm7OG2O09s7O8",
        "width": 719,
      },
    },
  };
  return <Welcome userData={fakeData}/>
  if (isLoggedin && userData) {
    return <Welcome userData={userData}/>
  } else {
    return (
      <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("./assets/background.jpg")}>
        <Text style={styles.text}>P O L L E E</Text>
        <Text style={{fontSize: 20, paddingBottom: 60, color: "#e9ebee"}}>Are you ready for the real tea?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={this.login}>
        <Text style={{ fontSize: 20, color: "#e9ebee" }}>Login with Facebook</Text>
      </TouchableOpacity>
    </ImageBackground>
    </View>)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ebee",
    alignItems: "center",
    justifyContent: "center"
  },
  loginButton: {
    backgroundColor: "#4267b2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30
  },
  logoutButton: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    bottom: 0
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center"
  },
  text: {
    paddingTop: 150,
    paddingBottom: 10,
    fontSize: 30,
    color: "#e9ebee"
  }
});
