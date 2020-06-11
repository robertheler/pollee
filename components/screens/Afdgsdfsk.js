import React, { useState, Component, Fragment } from "react";
import { Thumbnail } from "native-base";
import AddChoice from "../AddChoice.js";
import moment from "moment"; // require
import { Animated } from "react-native";
moment().format();

import { StyleSheet, Text, View, TextInput } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Item,
  Input,
  Label
} from "native-base";

export default class Ask extends Component {
  constructor({ route, navigation }) {
    super();
    this.state = {
      user: route.params.route.userData,
      poll: {},
      question: "",
      answers: ["", ""]
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    if (
      this.state.question === "" ||
      this.state.answer1 === "" ||
      this.state.answer2 === ""
    ) {
      // Works on both Android and iOS
      alert("Please fill out the question and at least 2 answers!");
    } else {
      let poll = {
        by: this.state.user.id,
        question: this.state.question,
        answers: [this.state.answer1, this.state.answer2]
      };
      if (this.state.answer3 !== "") {
        poll.answers.push(this.state.answer3);
      }
      if (this.state.answer4 !== "") {
        poll.answers.push(this.state.answer4);
      }
      this.postPoll(poll);
    }
  }

  postPoll(poll) {
    fetch("http://3.221.234.184:3001/api/polls", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(poll)
    })
      .then(response =>
        //alert('Poll was submitted! Check the feed to see responses!')
        this.setState(
          {
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: ""
          },
          alert("Poll was submitted! Check the feed to see responses!")
        )
      )
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.user) {
      return (
        <View style={styles.form}>
          <View style={styles.container}>
            <View
              style={{
                borderWidth:3,
                flex: 1,
                flexDirection: 'row',
                justifyContent: "center",
                alignItems: "flex-start",
                borderWidth:1,
                borderColor: 'blue',
                height: 40
              }}
            >
              <View
                style={{
                  borderWidth:2,
                  flex: 1,
                  flexDirection: "row",
                  justifyContet: "center",
                  alignItems: "center"
                }}
              >
                <Thumbnail
                  source={{ uri: `${this.state.user.picture.data.url}` }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    marginRight: 10
                  }}
                />
                <Text
                  style={{ color: "#202020" }}
                >{`${this.state.user.name}`}</Text>
              </View>
              <View
                style={{
                  textAlign: "right",
                  alignSelf: "flex-start",
                  alignContent: "center",
                  fontStyle: "italic",
                  fontSize: 10,
                  color: "gray",
                  borderWidth:4,
                  borderColor: 'red'
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    alignSelf: "flex-start",
                    alignContent: "flex-start",
                    fontStyle: "italic",
                    fontSize: 10,
                    color: "gray"
                  }}
                >
                  {moment(new Date()).fromNow()}
                </Text>
              </View>
            </View>

              <TextInput style={styles.question} placeholder="Ask your friends something (e.g. Am I a good friend?)">
              </TextInput>

            {this.state.answers.map((answer, i) => {
              return <AddChoice key={i} />;
            })}
          </View>
        </View>
      );
    } else {
      return <Text> hI! </Text>;
    }
  }
}

const styles = StyleSheet.create({
  question: {
    fontSize: 15,
    alignSelf: "flex-start",
    paddingLeft: 0,
    marginVertical: 10,
    fontWeight: "bold",
    color: "#202020",
    width: '100%',
    borderWidth: 1,
    borderColor: "#E9E9E9",
    height: 'auto'

  },
  new: {
    borderColor: "#FDDE4E",
    borderWidth: 1
  },
  container: {
    borderWidth:10,
    borderRadius: 20,
    backgroundColor: "white",
    flex: 1,
    flexDirection:'column',
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
  },
  thumbnail: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10
  },
  form: {
    borderWidth:4,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 50,
    paddingHorizontal: 20
  }
});
