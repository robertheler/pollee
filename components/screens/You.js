import React, { Fragment } from "react";
import PollFilter from "../PollFilter.js";
import {Thumbnail} from "native-base";

export default function({ route, navigation }) {
  return (
    <Fragment>
      <PollFilter
        route={route.params.route}
        showSelf={true}
        showAlreadyVoted={true}
        showRejected={false}
      />
    </Fragment>
  );
}
