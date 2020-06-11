import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export default function(props) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 50
      }}
    >
      <Text
        style={{ color: "#ee6c4d", fontWeight: "bold", fontSize: 13, paddingRight: 5}}
      >{props.items.length}</Text>
      <MaterialCommunityIcons
        name={props.icon}
        color={"#ee6c4d"}
        size={18}
        style={{ alignSelf: "center" }}
      />
    </TouchableOpacity>
  );
}
