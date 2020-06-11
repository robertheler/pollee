import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{ color: "#ee6c4d", fontWeight: "bold", fontSize: 13 }}
      >{props.value}</Text>
      <MaterialCommunityIcons
        name={props.icon}
        color={"#ee6c4d"}
        size={18}
        style={{ alignSelf: "center" }}
      />
    </View>
  );
}
