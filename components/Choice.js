import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Animated, Easing } from "react-native";

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote() {
    this.loadGraphBars(this.props.percentage);
    this.props.handleVote(this.props.index);
  }

  loadGraphBars(finalWidth) {
    Animated.timing(this.props.width, {
      toValue: finalWidth,
      duration: 1500,
      easing: Easing.bounce //can delete, it's pretty aggressive
    }).start();
  };

  render() {
    this.props.animate ? this.loadGraphBars(this.props.percentage) : null;
    if (this.props.alreadyVoted) {
      return (
        <TouchableOpacity style={styles.outter}>
          <Animated.View
            style={{
              borderRadius: 20,
              width: this.props.animate ? this.props.width.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"]
              }) : `${this.props.percentage}%`,
              backgroundColor: "#FDC100",
              height: "auto",
              position: "absolute",
              top: 0,
              bottom: 0,
              selfAlign: "flex-start",
              opacity: `${this.props.percentage / this.props.maxPercentage}%`
            }}
          ></Animated.View>
          <View style={styles.answer}>
            <Text style={{ width: "80%" }}>
              {this.props.poll.answers[this.props.index]}
            </Text>
            <View style={{ width: 10 }}></View>
            <Text style={{ color: "gray" }}>{`${Number(
              this.props.percentage
            ).toFixed(0)}%`}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity style={styles.outter} onPress={this.handleVote}>
          <Text style={styles.answer}>{this.props.poll.answers[this.props.index]} </Text>
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
    alignSelf: "center"
  },
  answer: {
    fontSize: 15,
    paddingHorizontal: 12,
    color: "#202020",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row"
  }
});
