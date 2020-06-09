import React, { useState, Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import Choice from "./Choice.js";
import moment from "moment"; // require
moment().format();

//import Poll from 'react-polls';

export default class You extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount() {
    this.grabUserInfo(this.props.poll.by).then(user => {
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

  handleVote(index) {
    //re-render
    let refresh = this.props.refresh;
    let vote = {
      id: this.props.poll.id,
      user: this.props.voter,
      choice: index + 1 //postgres is not 0-indexed
    };
    console.log(
      `http://3.221.234.184:3001/api/polls/${vote.id}/${vote.user}/${vote.choice}`
    );

    fetch(
      `http://3.221.234.184:3001/api/polls/${vote.id}/${vote.user}/${vote.choice}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "patch"
      }
    )
      .then(function(response) {
        console.log("success");
        refresh();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  render() {
    if (this.state.user) {
      return (
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContet: "space-between",
              alignItems: "flex-end"
            }}
          >
            <View>
              <Thumbnail
                source={{ uri: `${this.state.user.url}` }}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  marginRight: 10
                }}
              />
              <Text>{`${this.state.user.name}`}</Text>
            </View>
            <Text
              style={{
                textAlign: "right",
                alignSelf: "flex-end",
                fontStyle: "italic"
              }}
            >
              {moment(this.props.poll.created).fromNow()}
            </Text>
          </View>
          <Text style={styles.question}>{this.props.poll.question}</Text>
          {this.props.poll.answers.map((answer, i) => {
            return (
              <Choice
                key={i}
                poll={this.props.poll}
                index={i}
                handleVote={this.handleVote}
                voter={this.props.voter}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.question}>{this.props.poll.question}</Text>
          {this.props.poll.answers.map((answer, i) => {
            return (
              <Choice
                key={i}
                poll={this.props.poll}
                index={i}
                handleVote={this.handleVote}
                voter={""}
              />
            );
          })}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    alignSelf: "flex-start",
    margin: 5
  },
  answer: {
    fontSize: 15,
    paddingHorizontal: 10,
    color: "#DF5043"
  },
  container: {
    borderRadius: 20,
    //borderWidth: 1,
    backgroundColor: "white",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 15,
    marginVertical: 10,
    width: "90%",

    shadowColor: "#d9d9d9",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 10,

    elevation: 30
    // box-shadow:  20px 20px 60px #d7bd42,
    //          -20px -20px 60px #ffff5a;
  },
  image: {
    borderTopWidth: 2,
    borderColor: "#F2F2F2",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 15
  }
});
