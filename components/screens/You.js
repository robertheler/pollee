import React, { useState, Component, Fragment } from "react";
import {
  StyleSheet,
  Container,
  Content,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import Poll from "../Poll.js";
import { ScrollView } from "react-native-gesture-handler";
import PTRView from "react-native-pull-to-refresh";

export default class You extends Component {
  constructor({ route, navigation }) {
    super();
    this.state = route.params.route;
    this.state.polls = [];
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    fetchPollsByUser(this.state.userData.id).then(polls => {
      this.setState({ polls });
    });
  }

  refresh() {
    fetchPollsByUser(this.state.userData.id)
      .then(polls => {
        this.setState({ polls });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.polls) {
      return (
        <PTRView onRefresh={this.refresh}>
          <ScrollView style={{backgroundColor: "white"}} >
            <View style={styles.container}>

              <Image
                style={styles.image}
                source={{ uri: this.state.userData.picture.data.url }}
              />
               <Text style={{ fontSize: 20, color: '#202020'}}>Welcome {this.state.userData.name.substring(0, this.state.userData.name.indexOf(' '))}!</Text>
              <Text style={{marginTop: 0, marginBottom: 10, alignSelf: 'center', fontSize:40}}>⌄</Text>
              {this.state.polls.map((poll, i) => (
                <Poll key={i} poll={poll} voter={this.state.userData.id} refresh={this.refresh} />
              ))}
            </View>
          </ScrollView>
        </PTRView>
      );
    } else {
      return (
        <PTRView onRefresh={this.refresh}>
        </PTRView>
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
    marginTop:50,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white"
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
