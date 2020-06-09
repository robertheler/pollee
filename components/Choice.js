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
    let maxPercentage = 0;

    for (let i = 0; i < poll.answers.length; i++) {
      votes = votes + poll.results[i];
    }
    for (let i = 0; i < poll.answers.length; i++) {
      percentages.push((poll.results[i] / votes) * 100);
      if ((poll.results[i] / votes) * 100 > maxPercentage) {
        maxPercentage = (poll.results[i] / votes) * 100
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
      return (
        <View style={styles.outter}>
          <View
            style={{
              borderRadius: 20,
              width: `${Math.floor(percentages[this.props.index])}%`,
              backgroundColor: "#227AFF",
              height: 38,
              position: 'absolute',
              selfAlign: "flex-start",
              opacity: `${percentages[this.props.index]/100}%` // or /maxPercentage
            }}
          ></View>

          <View style={styles.answer}>
            <Text>{poll.answers[this.props.index]}</Text>
            <Text>{poll.results[this.props.index]}</Text>
          </View>
        </View>
        // </View>
      );
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
    borderColor: "#E9E9E9",
    borderRadius: 20,
    width: "100%",
    padding: 10,
    paddingRight: 10,
    margin: 3,
    height: 40
  },
  question: {
    fontSize: 20
  },
  answer: {
    fontSize: 15,
    paddingHorizontal: 10,
    color: "black",
    alignItems: "stretch",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row"
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
