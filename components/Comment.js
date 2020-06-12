import React, { Fragment, Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Thumbnail } from "native-base";
import { Divider } from 'react-native-elements';

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
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            marginLeft: -5
          }}
        >
          <Thumbnail
            source={{ uri: this.state.user.url }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              marginRight: 10,
              alignSelf: "center",
              width: "10%"
            }}
          />
          <View
            style={{
              borderWidth: 1,
              borderColor: "red",
              justifyContent: "center",
              width: "90%"
            }}
          >
            <Text>
              <Text
                style={[styles.answer, styles.name]}
              >{`${this.state.user.name}: `}</Text>
              <Text style={[styles.answer], {fontStyle: "italic"}}>{this.props.comment}</Text>
            </Text>
          <View style={{borderBottomWidth: 1, borderColor: "#EEEEEE"}}></View>
          </View>
        </View>
      );
    } else {
      return <Text></Text>;
    }
  }
}
const styles = StyleSheet.create({
  answer: {
    fontSize: 15,
    color: "#202020"
  },
  name: {
    fontWeight: "bold"
  }
});
