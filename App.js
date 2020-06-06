import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import * as Facebook from "expo-facebook";
import { ImageBackground } from "react-native";

console.disableYellowBox = true;

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);

  facebookLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("4127928860565729", {
        permissions: ["public_profile"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then(response => response.json())
          .then(data => {
            setLoggedinStatus(true);
            setUserData(data);
          })
          .catch(e => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  };

  return isLoggedin ? (
    userData ? (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 50 }}
          source={{ uri: userData.picture.data.url }}
          onLoadEnd={() => setImageLoadStatus(true)}
        />
        <ActivityIndicator
          size="large"
          color="#0000ff"
          animating={!isImageLoading}
          style={{ position: "absolute" }}
        />
        <Text style={{ fontSize: 22, marginVertical: 10 }}>
          Hi {userData.name}!
        </Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
          <Text style={{ color: "#fff" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    ) : null
  ) : (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("./assets/background.jpg")}
      >
        <Text style={styles.text}> P O L L E E </Text>
        <Text style={{fontSize: 20, paddingBottom: 60, color: "#e9ebee"}}> Are you ready for the real tea?</Text>
        {/* <Image
          style={{ width: 200, height: 200, borderRadius: 50, marginVertical: 20 }}
          source={require("./assets/pollee.png")} /> */}
        <TouchableOpacity style={styles.loginBtn} onPress={this.facebookLogIn}>
          <Text style={{ fontSize: 20, color: "#e9ebee" }}>
            Login with Facebook
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ebee", //'#e9ebee'
    alignItems: "center",
    justifyContent: "center"
  },
  loginBtn: {
    backgroundColor: "#4267b2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30
  },
  logoutBtn: {
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
    //justifyContent: 'center'
  },
  text: {
    paddingTop: 150,
    paddingBottom: 10,
    fontSize: 30,
    color: "#e9ebee"
  }
});
