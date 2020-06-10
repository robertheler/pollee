import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Poll from "./Poll.js";
import { ScrollView } from "react-native-gesture-handler";
import PTRView from "react-native-pull-to-refresh";

export default class PollFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      justVoted: [] // continue to render these during these seshion
    };
    this.hardRefresh = this.hardRefresh.bind(this);
    this.softRefresh = this.softRefresh.bind(this);
  }

  componentDidMount() {
    this.fetchPollsForUser(this.props.route.userData.id)
      .then(polls => {
        this.setState({ polls });
      })
      .catch(error => console.log(error));
  }

  fetchPollsForUser(id) {
    return fetch(`http://3.221.234.184:3001/api/feed/${id}`) //returns all polls ATM
      .then(response => response.json())
      .then(json => {
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }

  softRefresh(idOfJustVotedPoll) {
    console.log('soft refresh');
    this.fetchPollsForUser(this.props.route.userData.id)
      .then(polls => {
        this.state.justVoted.push(idOfJustVotedPoll)

        this.setState({
          polls: polls,
        }) //continue to render these inspite of being voted
      })
      .catch(error => console.log(error));
  }

  hardRefresh() {
    this.fetchPollsForUser(this.props.route.userData.id)
      .then(polls => {
        this.setState({
          polls: polls,
          justVoted: []
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.polls && this.state.justVoted) {
      return (
        <PTRView onRefresh={this.hardRefresh}>
          <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
              <Text
                style={{
                  marginTop: 0,
                  marginBottom: 10,
                  alignSelf: "center",
                  fontSize: 40
                }}
              >
                ⌄
              </Text>
              {this.state.polls.map((poll, i) => {
                let alreadyVoted = false;
                if (poll.voters) {
                  for (let i = 0; i < poll.voters.length; i++) {
                    if (poll.voters[i] === this.props.route.userData.id) {
                      alreadyVoted = true;
                      break;
                    }
                  }
                }
                let byUser = this.props.route.userData.id === poll.by;

                let justVoted = false //this.state.justVoted.includes(poll.id)

                for (let i = 0; i < this.state.justVoted.length; i++) {
                  if (this.state.justVoted[i] === poll.id) {
                    justVoted = true;
                    break;
                  }
                }

                if (
                  (this.props.showSelf == byUser &&
                  this.props.showAlreadyVoted == alreadyVoted &&
                  this.props.showRejected == false) || justVoted
                ) {
                  return (
                    <Poll
                      key={i}
                      poll={poll}
                      voter={this.props.route.userData.id}
                      refresh={this.softRefresh}
                      alreadyVoted={alreadyVoted}
                    />
                  );
                } else return <View key={i}></View>;
              })}
            </View>
          </ScrollView>
        </PTRView>
      );
    } else {
      return <View style={styles.container}></View>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 50
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
