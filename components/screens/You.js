import React from "react";
import PollFilter from "../PollFilter.js"
export default function({ route, navigation }) {
  return (
    <PollFilter
      route={route.params.route}
      showSelf={true}
      showAlreadyVoted={true}
      showRejected={false}
    />
  );
}
