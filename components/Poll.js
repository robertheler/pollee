import React, {Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Thumbnail } from "native-base";
import Choice from "./Choice.js";
import moment from "moment"; // require
import { Animated } from "react-native";
moment().format();

export default class You extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      initialOpacity: new Animated.Value(0)
    };
    this.handleVote = this.handleVote.bind(this);
  }

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
    let id = this.props.poll.id;
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
          refresh(id);
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
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
        maxPercentage = (poll.results[i] / votes) * 100;
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

    if (this.state.user) {
      return (
        <View style={[styles.container]}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
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
                source={{ uri: `${this.state.user.url}` }}
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
                alignContent: "flex-start",
                fontStyle: "italic",
                fontSize: 10,
                color: "gray"
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
                {moment(this.props.poll.created).fromNow()}
              </Text>
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
                width={new Animated.Value(0)}
                percentage={this.props.poll.results[i]/votes*100}
                maxPercentage={maxPercentage}
                alreadyVoted={alreadyVoted}
                animate={this.props.animate}
                isSelf={this.props.voter.id === this.props.poll.by}
              />
            );
          })}
        </View>
      );
    } else {
      return (<View></View>)

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
    color: "#202020"
  },
  new: {
    borderColor: '#FDDE4E',
    borderWidth: 1
  },
  container: {
    borderRadius: 20,
    backgroundColor: "white",
    flex: 1,
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
    borderTopWidth: 2,
    borderColor: "#F2F2F2",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 15
  }
});
