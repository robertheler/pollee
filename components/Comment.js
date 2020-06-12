import React, { Fragment } from "react";
import {Thumbnail, Text} from "native-base";

export default function(props) {
  return (
    <Text>{props.comment}</Text>
  );
}
