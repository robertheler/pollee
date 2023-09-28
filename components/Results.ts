import React, { Fragment, Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Thumbnail } from "native-base";
import { Divider } from "react-native-elements";

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
        <View  style={{
          alignItems: "center",
          justifyContent: "center",

        }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              //marginLeft: -2,
              marginVertical: 5,
              paddingLeft:5

            }}
          >
            <Thumbnail
              source={{ uri: this.state.user.url }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                marginRight: 10,
                alignSelf: "center",
                zIndex:99
                //width: "10%"
              }}
            />
            <View
              style={{
                justifyContent: "center",
                width: "90%",
                paddingRight: 7
              }}
            >
              <Text>
                <Text
                  style={[styles.name]}
                >{`${this.state.user.name}: `}</Text>
                <Text style={([styles.answer])}>
                  {this.props.comment}
                </Text>
              </Text>
            </View>
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
    color: "#FFFFFF",
    fontStyle: "italic"
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});
