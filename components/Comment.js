import React, { Fragment, Component } from "react";
import { Thumbnail, Text, View } from "native-base";
import { createLanguageService } from "typescript";

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }
  componentDidMount() {
    this.grabUserInfo(this.props.commenter).then(user => {
      this.setState({ user });
    });
  }

  grabUserInfo(id) {
    return fetch(`http://3.221.234.184:3001/api/users/${id}`)
      .then(response => response.json())
      .then(json => {
        return json[0];
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.user) {
      return (
        <View>
          <Thumbnail
            source={{ uri: `${this.state.user.url}` }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginRight: 10
            }}
          />
          <Text style={{ color: "#202020" }}>{`${this.state.user.name}`}</Text>
          <Text>{this.props.comment}</Text>
        </View>
      );
    } else {
      return <Text>{this.props.comment}</Text>;
    }
  }
}
