import React, { useState, Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

//import Poll from 'react-polls';

export default class You extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    }
  }

  componentDidMount() {
    this.grabUserInfo(this.props.poll.by).then(user => {
      this.setState({ user });
    });
  }
  handleVote() {}

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
        <View style={styles.container}>
          <Text>{`${this.state.user.name} asked...`}</Text>
          <Text style={styles.question}>{this.props.poll.question}</Text>
          {this.props.poll.answers.map((answer, i) => {
            return (
              <Text style={styles.answer} key={i}>
                {answer + ": " + this.props.poll.results[i]}
              </Text>
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
              <Text style={styles.answer} key={i}>
                {answer + ": " + this.props.poll.results[i]}
              </Text>
            );
          })}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  question: {
    fontSize: 20
  },
  answer: {
    fontSize: 15,
    paddingHorizontal: 10,
    color: "#DF5043"
  },
  container: {
    borderRadius: 30,
    //borderWidth: 1,
    backgroundColor: "#FDDE4E",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 15,
    margin: 5,
    width: "95%",
    shadowColor: "#d7bd42",
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.74,
    shadowRadius: 10.32,

    elevation: 16
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
