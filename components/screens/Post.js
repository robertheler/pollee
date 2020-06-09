import React, { useState, Component, Fragment } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Item,
  Input,
  Text,
  Label
} from "native-base";

import { ScrollView } from "react-native-gesture-handler";
import {StyleSheet } from "react-native";

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

;
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
      .then(response =>
        //alert('Poll was submitted! Check the feed to see responses!')
        this.setState({
          question: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: ""
        }, alert('Poll was submitted! Check the feed to see responses!'))
      )
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.contentContainer}>
          <Form>
            <Item>
              <Input
                placeholder="Ask the world something (e.g. Am I pretty?)"
                value={this.state.question}
                getRef={(ref) => { this.SearchInput = ref; }}
                onChangeText={val => this.setState({ question: val })}
                id="question"
              />
            </Item>
            <Item last>
              <Input
                placeholder="Answer 1"
                value={this.state.answer1}
                getRef={(ref) => { this.SearchInput = ref; }}
                onChangeText={val => this.setState({ answer1: val })}
                id="answer1"
              />
            </Item>
            <Item last>
              <Input
                placeholder="Answer 2"
                getRef={(ref) => { this.SearchInput = ref; }}
                value={this.state.answer2}
                onChangeText={val => this.setState({ answer2: val })}
                id="answer2"
              />
            </Item>
            <Item last>
              <Input
                placeholder="Answer 3 (optional)"
                getRef={(ref) => { this.SearchInput = ref; }}
                value={this.state.answer3}
                onChangeText={val => this.setState({ answer3: val })}
                id="answer3"
              />
            </Item>
            <Item last>
              <Input
                placeholder="Answer 4 (optional)"
                getRef={(ref) => { this.SearchInput = ref; }}
                val={this.state.answer4}
                onChangeText={val => this.setState({ answer4: val })}
                id="answer4"
              />
            </Item>
          </Form>
          <Text style={{ marginVertical: 40, marginHorizontal: 20, textAlign: 'center' }}>
            Note: The poll will be public and your name will be assoicated with it!
          </Text>
            <Button primary rounded
            onPress={this.onSubmit}
            style={{justifyContent: 'center', width: '50%',  alignSelf: 'center'}}>
            <Text>Send Poll</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer:{
    marginTop: 50,
    justifyContent: 'center',
    width: '100%'

  },
  container: {
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
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
