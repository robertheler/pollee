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
import {Animated} from "react-native";
moment().format();

//import Poll from 'react-polls';

export default class You extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      initialOpacity: new Animated.Value(0),
      hasUpdated: false
    };
    this.handleVote = this.handleVote.bind(this);

  }

  loadGraphBars = () => {
    Animated.timing(this.state.initialOpacity, {
      toValue: 1,
      duration: 2000
    }).start();
  };
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
    // only vote if haven't voted already
    let alreadyVoted = false;
    if (this.props.poll.voters) {
      for (let i = 0; i < this.props.poll.voters.length; i++) {
        if (this.props.poll.voters[i] === this.props.voter) {
          alreadyVoted = true;
          break;
        }
      }
    }

    if (!alreadyVoted) {
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
          refresh();
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
    this.setState({
      hasUpdated: !this.state.hasUpdated
    })
  }

  render() {
    if (this.state.user) {
      return (
        <View style={styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: 'center'
            }}
          >
            <View style={{
              flex: 1,
              flexDirection: "row",
              justifyContet: "center",
              alignItems: 'center'
            }}>
              <Thumbnail
                source={{ uri: `${this.state.user.url}` }}
                style={{
                  width:24,
                  height: 24,
                  borderRadius: 12,
                  marginRight: 10,
                }}
              />
              <Text style={{color: '#202020'}}>{`${this.state.user.name}`}</Text>
            </View>
            <View
              style={{
                textAlign: "right",
                alignSelf: "flex-start",
                alignContent: 'flex-start',
                fontStyle: "italic",
                fontSize: 10,
                color: 'gray'
              }}
            >
              <Text style={{
                textAlign: "right",
                alignSelf: "flex-start",
                alignContent: 'flex-start',
                fontStyle: "italic",
                fontSize: 10,
                color: 'gray'
              }}>{moment(this.props.poll.created).fromNow()}</Text>
            </View>
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
                hasUpdated={this.state.hasUpdated}
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
    fontSize: 15,
    alignSelf: 'flex-start',
    paddingLeft: 0,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#202020'
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

    shadowColor: "#d9d9d9", //#FDDE4E //d9d9d9
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
