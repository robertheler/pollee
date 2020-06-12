import React, { useState, Component, Fragment } from "react";
import {
  Container,
  Header,
  Content,
  Button,
  Form,
  Root,
  Item,
  Input,
  Thumbnail,
  Textarea,
  Label,
  Toast
} from "native-base";

import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default class Post extends Component {
  constructor({ route, navigation }) {
    super();
    this.state = {
      user: route.params.route.userData,
      poll: {},
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      showToast: false
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
      Toast.show({
        text: `You must fill out:\n   • the question \n   • at least 2 answers`,
        buttonText: "Okay",
        position: "bottom",
        duration: 3000
      });
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

          Toast.show({
            text: "Post submitted!",
            buttonText: "Okay",
            type: "success",
            position: "bottom",
            duration: 3000
          })
        )
      )
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Root>
        <Container>
          <Content>
            <ScrollView>
              <Content contentContainerStyle={styles.contentContainerOuter}>
                <View style={styles.container}>
                  <Content contentContainerStyle={styles.contentContainerInner}>
                    {this.state.user ? (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 40,
                          marginBottom: 0
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContet: "center",
                            alignItems: "center"
                          }}
                        >
                          <Thumbnail
                            source={{
                              uri: `${this.state.user.picture.data.url}`
                            }}
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
                      </View>
                    ) : (
                      <View></View>
                    )}
                    <Form>
                      <Input
                        placeholder="Type your poll here (e.g. Am I pretty?)"
                        placeholderTextColor="gray"
                        value={this.state.question}
                        style={styles.question}
                        getRef={ref => {
                          this.SearchInput = ref;
                        }}
                        onChangeText={val => this.setState({ question: val })}
                        id="question"
                      />

                      <Input
                        placeholder="  Answer 1"
                        placeholderTextColor="#E9E9E9"
                        value={this.state.answer1}
                        getRef={ref => {
                          this.SearchInput = ref;
                        }}
                        onChangeText={val => this.setState({ answer1: val })}
                        id="answer1"
                        style={styles.answer}
                      />

                      <Input
                        placeholder="  Answer 2"
                        placeholderTextColor="#E9E9E9"
                        getRef={ref => {
                          this.SearchInput = ref;
                        }}
                        value={this.state.answer2}
                        onChangeText={val => this.setState({ answer2: val })}
                        id="answer2"
                        style={styles.answer}
                      />

                      <Input
                        placeholder="  Answer 3 (optional)"
                        placeholderTextColor="#E9E9E9"
                        getRef={ref => {
                          this.SearchInput = ref;
                        }}
                        value={this.state.answer3}
                        onChangeText={val => this.setState({ answer3: val })}
                        id="answer3"
                        style={styles.answer}
                      />

                      <Input
                        placeholder="  Answer 4 (optional)"
                        placeholderTextColor="#E9E9E9"
                        getRef={ref => {
                          this.SearchInput = ref;
                        }}
                        value={this.state.answer4}
                        onChangeText={val => this.setState({ answer4: val })}
                        id="answer4"
                        style={styles.answer}
                      />
                    </Form>

                    <TouchableOpacity style={styles.button}>
                      <Text
                        style={{
                          fontSize: 18,
                          alignSelf: "center",
                          color: "#202020"
                        }}
                        onPress={this.onSubmit}
                      >
                        Submit Poll
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginBottom: 5,
                        marginHorizontal: 10,
                        textAlign: "left",
                        fontStyle: "italic",
                        fontSize: 12,
                        alignSelf: "flex-start",
                        color: "gray"
                      }}
                    >
                      {`Note: The poll will be visible to all your Facebook friends!`}
                    </Text>
                  </Content>
                </View>
              </Content>
            </ScrollView>
          </Content>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerOuter: {
    justifyContent: "center"
  },
  contentContainerInner: {
    justifyContent: "center",
    paddingHorizontal: 5
  },
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
  container: {
    borderRadius: 20,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 21,
    marginBottom: 100,
    paddingVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#d9d9d9",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 30
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#202020",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#E9E9E9",
    padding: 0
  },
  answer: {
    fontSize: 15,
    color: "#202020",
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 20,
    height: 40,
    width: "100%",
    alignSelf: "center",
    marginVertical: 3
  },
  button: {
    borderRadius: 25,
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    margin: 40,
    alignSelf: "center",
    backgroundColor: "#FDC100",
    alignItems: "center",
    justifyContent: "center"
  }
});
