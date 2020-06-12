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
      justVoted: [],
      justLiked: [], // continue to render these during these seshion
      lastVoted: null // the very last poll (only one that should be animated in this seshion)
    };
    this.hardRefresh = this.hardRefresh.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleLike = this.handleLike.bind(this);

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

  handleVote(idOfJustVotedPoll) {
    this.fetchPollsForUser(this.props.route.userData.id)
      .then(polls => {
        this.state.justVoted.push(idOfJustVotedPoll);

        this.setState({
          polls: polls,
          lastVoted: idOfJustVotedPoll
        }); //continue to render these inspite of being voted
      })
      .catch(error => console.log(error));
  }

  handleLike(idOfJustLikedPoll) {
    this.fetchPollsForUser(this.props.route.userData.id)
      .then(polls => {
        this.state.justLiked.push(idOfJustLikedPoll);

        this.setState({
          polls: polls,
          lastVoted: null
        }); //continue to render these inspite of being voted
      })
      .catch(error => console.log(error));
  }

  hardRefresh() {
    this.fetchPollsForUser(this.props.route.userData.id)
      .then(polls => {
        this.setState({
          polls: polls,
          justVoted: [],
          lastVoted: null
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

                let shouldAnimate = true;
                let justLiked = false; //this.state.justVoted.includes(poll.id)
                for (let i = 0; i < this.state.justVoted.length; i++) {
                  if (this.state.justLiked[i] === poll.id) {
                    justLiked = true;
                    shouldAnimate = false;
                    break;
                  }
                }


                let justVoted = false; //this.state.justVoted.includes(poll.id)
                for (let i = 0; i < this.state.justVoted.length; i++) {
                  if (this.state.justVoted[i] === poll.id) {
                    justVoted = true;
                    shouldAnimate = false;
                    break;
                  }
                }

                // && !justLiked
                if (poll.id === this.state.lastVoted) {
                    shouldAnimate = true;
                }

                if (
                  (this.props.showSelf == byUser &&
                    this.props.showAlreadyVoted == alreadyVoted &&
                    this.props.showRejected == false) ||
                  justVoted
                ) {
                  return (
                    <Poll
                      key={i}
                      poll={poll}
                      voter={this.props.route.userData.id}
                      handleVote={this.handleVote}
                      handleLike={this.handleLike}
                      handleComment={this.handleLike}
                      animate={shouldAnimate}
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
    marginVertical: 15
  }
});
