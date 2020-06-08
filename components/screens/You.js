import React, { useState, Component, Fragment } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Poll from "../Poll.js";
import {ScrollView} from 'react-native-gesture-handler';


export default class You extends Component {
  constructor({ route, navigation }) {
    super();
    this.state = route.params.route;
    this.state.polls = [];
  }

  componentDidMount() {
    fetchPollsByUser(this.state.userData.id).then(polls => {
      this.setState({ polls });
    });
  }

  render() {
    if (this.state.polls) {
      return (
        <ScrollView>

        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: this.state.userData.picture.data.url }}/>
          <Text style={{fontSize:20}}>Hi {this.state.userData.name}!</Text>
          {this.state.polls.map((poll, i) =>  <Poll key={i} poll={poll} />)}
        </View>

        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={{ uri: this.state.userData.picture.data.url }}/>
          <Text style={{fontSize:20}}>Hi {this.state.userData.name}!</Text>
        </View>
      );
    }
  }
}

//{this.state.polls.map(poll =>  <Text>{poll.toString()}</Text>)}
function fetchPollsByUser(id) {
  return fetch(`http://3.221.234.184:3001/api/polls/${id}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "#F2F2F2",
    backgroundColor: "#FDDE4E",
    flex: 1,
    alignItems: "center",
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
