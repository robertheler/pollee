import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Poll from "../Poll.js";
import { ScrollView } from "react-native-gesture-handler";
import PTRView from "react-native-pull-to-refresh";

export default class Feed extends Component {
  constructor({ route, navigation }) {
    super();
    this.state = route.params.route;
    this.state.polls = [];
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.fetchPollsForUser(this.state.userData.id)
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
  refresh() {
    this.fetchPollsForUser(this.state.userData.id)
      .then(polls => {
        this.setState({ polls });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.polls) {
      return (
        <PTRView
          onRefresh={this.refresh}
          style={{ borderTopWidth: 1, borderColor: "#F2F2F2" }}
        >
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
                // only render votes not posted by logged user
                if (this.state.userData.id !== poll.by) {
                  return (
                    <Poll
                      key={i}
                      poll={poll}
                      voter={this.state.userData.id}
                      refresh={this.refresh}
                    />
                  );
                }
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
    marginTop: 50
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
