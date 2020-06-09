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
import {Animated} from "react-native";
//import Poll from 'react-polls';

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.state = {
      width: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.state = {
      width: new Animated.Value(0)
    };
    // console.log('mounted');
    // let poll = this.props.poll;
    // let votes = 0;
    // for (let i = 0; i < poll.answers.length; i++) {
    //   votes = votes + poll.results[i];
    // }

    // let percentage = Math.floor(poll.results[this.props.index] / votes * 100)
    // this.loadGraphBars(percentage);
  }
  handleVote() {
    return this.props.handleVote(this.props.index);
  }

  loadGraphBars = (finalWidth) => {
    Animated.timing(this.state.width, {
      toValue: finalWidth,
      duration: 1500
    }).start();
  };

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

    let percentage = Math.floor(poll.results[this.props.index] / votes * 100)
    this.loadGraphBars(percentage);

    if (alreadyVoted && percentages[this.props.index] > 0) {
      //current answer is the most popular
      return (
        <TouchableOpacity style={styles.outter}>
          <Animated.View
            style={{
              borderRadius: 20,
              //width: `${Math.floor(percentages[this.props.index])}%`,
              width: this.state.width.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: "#FDDE4E", //FDDE4E //227AFF
              height: 'auto',
              position: 'absolute',
              top: 0,
              bottom: 0,
              selfAlign: "flex-start",
              opacity: `${percentages[this.props.index]/maxPercentage}%` //100 or /maxPercentage
              //opacity: this.state.opacity
            }}
          ></Animated.View>

          <View style={styles.answer}>
            <Text style={{width: '80%'}} >{poll.answers[this.props.index]}</Text>
            <View style={{width: 10}}></View>
            <Text style={{color: 'gray'}}>{`${Number(percentages[this.props.index]).toFixed(0)}%`}</Text>
          </View>
        </TouchableOpacity>
        // </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.outter} onPress={this.handleVote}>
            <Text style={styles.answer}>{poll.answers[this.props.index]} </Text>
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
    paddingVertical: 10,
    paddingHorizontal: 0,
    margin: 3,
    alignSelf: 'center'
  },

  answer: {
    fontSize: 15,
    paddingHorizontal: 12,
    color: "#202020",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
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
