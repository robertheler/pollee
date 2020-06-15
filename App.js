import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { ImageBackground } from "react-native";
import Welcome from "./components/Welcome.js";
// import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";

//console.disableYellowBox = true;
//import {FB} from 'fb';

export default function App() {
  const [isLoggedin, setLoggedinStatus] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isImageLoading, setImageLoadStatus] = useState(false);


  skipLogin = () => {
    setLoggedinStatus(true);
    let user = {
      id: Math.floor(Math.random() * 1000000).toString(),
      name: "Anonymous",
      picture: {
        data: {
          height: 720,
          is_silhouette: false,
          url:
            "https://adidasproducts.s3-us-west-1.amazonaws.com/images/anonymous.png",
          width: 719
        }
      }
    };
    setUserData(user);
  };

  logout = () => {
    setLoggedinStatus(false);
    setUserData(null);
    setImageLoadStatus(false);
  };
  let fakeData = {
    id: "10158294838614730",
    name: "Robert Heler",
    picture: {
      data: {
        height: 720,
        is_silhouette: false,
        url:
          "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10158294838614730&height=500&ext=1594176755&hash=AeSSm7OG2O09s7O8",
        width: 719
      }
    }
  };
  //return <Welcome userData={fakeData}/>
  if (isLoggedin && userData) {
    return <Welcome userData={userData} logout={this.logout} />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("./assets/background.jpg")}
        >
          <Text style={styles.text}>P O L L E E</Text>
          <Text style={{ fontSize: 20, paddingBottom: 40, color: "#e9ebee" }}>
            Are you ready for the real tea?
          </Text>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={5}
            style={{ width: 220, height: 44, padding: 20, margin: 20 }}
            onPress={async () => {
              try {
                const credential = await AppleAuthentication.signInAsync({
                  requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                  ]
                });
                // signed in
                console.log(credential);
                setLoggedinStatus(true);
                setUserData({
                  id: credential.user,
                  name: `${credential.fullName.givenName} ${credential.fullName.familyName}`,
                  picture: {
                    data: {
                      height: 720,
                      is_silhouette: false,
                      url: "https://picsum.photos/719/720",
                      width: 719
                    }
                  }
                });
              } catch (e) {
                if (e.code === "ERR_CANCELED") {
                  // handle that the user canceled the sign-in flow
                } else {
                  // handle other errors
                }
              }
            }}
          />
          <TouchableOpacity onPress={this.skipLogin}>
            <Text style={{ fontSize: 20, color: "#e9ebee", padding: 20 }}>
              continue as a guest
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
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
    paddingTop: 80,
    fontSize: 30,
    color: "#e9ebee"
  }
});
