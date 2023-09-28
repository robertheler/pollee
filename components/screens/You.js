import React, { Fragment } from "react";
import PollFilter from "../PollFilter.js";
import { Thumbnail } from "native-base";
import { TouchableOpacity, Text } from "react-native";
import Result from "../Result.js";

export default function({ route, navigation }) {
  console.log(route.params.route);
  return (
    <Fragment>
      <TouchableOpacity
        style={{ alignSelf: "center" }}
        onPress={route.params.route.logout}
      >
        <Text style={{ fontSize: 20, color: "gray", paddingTop: 20 }}>
          Log Out
        </Text>
      </TouchableOpacity>
      <PollFilter
        route={route.params.route}
        showSelf={true}
        showAlreadyVoted={true}
        showRejected={false}
      />
       <Result
        route={route.params.route}
        showSelf={true}
        showAlreadyVoted={true}
        showRejected={false}
      />
    </Fragment>
  );
}
