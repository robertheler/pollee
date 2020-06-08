import React, { useState, Component, Fragment } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label
} from "native-base";

import { ScrollView } from "react-native-gesture-handler";
import { Text, StyleSheet, Button } from "react-native";

export default class Post extends Component {
  constructor({ route, navigation }) {
    super();
    this.state = {
      userData: route.params.route.userData,
      poll: {},
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.postPoll = this.postPoll.bind(this);
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
        by: this.state.userData.id,
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
      .then(function(response) {
        this.setState({
          question: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Question (e.g. Am I pretty?)"
                val={this.state.question}
                getRef={ref => (this.SearchInput = ref)}
                onChangeText={value => this.setState({ question: value })}
                id="question"
              />
            </Item>
            <Item last>
              <Input
                placeholder="Answer 1"
                val={this.state.answer1}
                onChangeText={value => this.setState({ answer1: value })}
                id="answer1"
              />
            </Item>
            <Item last>
              <Input
                placeholder="Answer 2"
                val={this.state.answer2}
                onChangeText={value => this.setState({ answer2: value })}
                id="answer2"
              />
            </Item>
            <Item last>
              <Input
                placeholder="Answer 3 (optional)"
                val={this.state.answer3}
                onChangeText={value => this.setState({ answer3: value })}
                id="answer3"
              />
            </Item>
            <Item last>
              <Input
                placeholder="Answer 4 (optional)"
                val={this.state.answer4}
                onChangeText={value => this.setState({ answer4: value })}
                id="answer4"
              />
            </Item>
          </Form>
          <Text style={{ margin: 20 }}>
            Note: The poll will be public (during development only) and your
            name will be assoicated with it
          </Text>
          <Button
            title="Submit"
            onPress={this.onSubmit}
            style={{ margin: 40, borderColor: "#FDDE4E" }}
          ></Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "#FDDE4E",
    flex: 1,
    alignItems: "center"
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
