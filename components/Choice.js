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

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote() {
    return this.props.handleVote(this.props.index);
  }

  render() {
    let poll = this.props.poll;
    let votes = 0;
    let percentages = [];
    let maxVotes = 0;
    let maxIndex = 0;
    let maxExists = true;
    for (let i = 0; i < poll.answers.length; i++) {
      votes = votes + poll.results[i];
    }
    for (let i = 0; i < poll.answers.length; i++) {
      percentages.push((poll.results[i] / votes) * 100);
      if (poll.results[i] > maxVotes) {
        maxVotes = poll.results[i];
        maxIndex = i;
        maxExists = true;
      }
    }
    let alreadyVoted = false;
    if (poll.voters) {
      for (let i = 0; i < poll.voters.length; i++) {
        if (poll.voters[i] === this.props.voter) {
          alreadyVoted = true;
          break;
        }
      }
    }

    if (alreadyVoted) {
      //current answer is the most popular
      if (maxIndex === this.props.index) {
        return (
          <View style={styles.outterWon}>
            {/* <View
              style={{ borderRadius: 10, width: `${Math.floor(percentages[this.props.index])}%`, borderColor: 'red', borderWidth: 1, selfAlign: "flex-start", opacity: 0.4}}
            > */}
            <Text style={styles.answer}>
              <Text>{poll.answers[this.props.index]}</Text>
              <Text>{poll.results[this.props.index]}</Text>
            </Text>
          </View>
          // </View>
        );
      } else {
        return (
          <View style={styles.outter}>
            {/* <View
            style={{ borderRadius: 10, width: `${Math.floor(percentages[this.props.index])}%`, borderColor: 'red', borderWidth: 1, selfAlign: "flex-start", opacity: 0.4}}
          > */}
            <Text style={styles.answer}>
              <Text>{poll.answers[this.props.index]}</Text>
              <Text>{poll.results[this.props.index]}</Text>
            </Text>
          </View>
          // </View>
        );
      }
    } else {
      return (
        <TouchableOpacity style={styles.outter} onPress={this.handleVote}>
          <View>
            <Text style={styles.answer}>{poll.answers[this.props.index]} </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  outter: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    width: "100%",
    padding: 10,
    paddingRight: 10,
    margin: 3
  },
  outterWon: {
    borderWidth: 3,
    borderColor: "red",
    borderRadius: 15,
    width: "100%",
    padding: 10,
    paddingRight: 10,
    margin: 3
  },

  question: {
    fontSize: 20
  },
  answer: {
    fontSize: 15,
    paddingHorizontal: 10,
    color: "black"
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
