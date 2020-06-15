import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Button,
  ScrollView,
  SafeAreaView
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
//import { ScrollView } from "react-native-gesture-handler";
import { Input, Form, Thumbnail, Switch, Toast, Root } from "native-base";
import { Alert, TouchableHighlight, View } from "react-native";
import Comment from "./Comment.js";

export default class Flag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsVisible: false,
      newComment: "",
      block: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.report = this.report.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }
  handleClick = isVisible => {
    if (this.props.type == "flag") {
      this.setState({ commentsVisible: isVisible });
    } else if (this.props.type === "likes") {
      if (this.props.alreadyLiked === false) {
        this.props.like();
      } else {
        //unlike
      }
    }
  };

  toggleSwitch() {
    this.setState({ block: !this.state.block });
  }

  report() {
    this.setState({ commentsVisible: false });
    // report to true in poll
    let block ={
      blockee: this.props.by.id,
      blocker: this.props.voter
    }
    console.log(JSON.stringify(block))
    // add user to blocked list
    fetch(
      `http://3.221.234.184:3001/api/block`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "patch",
        body: JSON.stringify(block)
      }
    )
      .then(response => {
        // flag the poll
        fetch(`http://3.221.234.184:3001/api/flag/${this.props.poll.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "patch"
        });
      })

      .catch(error => {
        console.log(error);
      });

    // }
  }

  render() {
    const { commentsVisible } = this.state;
    return (
      <Root>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            animationIn="zoomIn"
            animationOut="zoomOut"
            transparent={true}
            isVisible={commentsVisible}
            onSwipeComplete={() => this.setState({ commentsVisible: false })}
            //swipeDirection={['right']}
            backdropColor="#FFFFFF"
            backdropOpacity={0.4}
            onBackdropPress={() => this.setState({ commentsVisible: false })}
            scrollOffset={100}

            //https://blog.theodo.com/2018/08/awesome-modal/
          >
            <View style={styles.modalView}>
              <Text
                style={{
                  color: "white",
                  alignSelf: "center",
                  paddingBottom: 10
                }}
              >
                Report Objectionable Content
              </Text>
              <Form
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5,
                  marginBottom: 10
                }}
              >
                <Input
                  placeholder=" Tell us why you are reporting this"
                  placeholderTextColor="#FFFFFF"
                  value={this.state.newComment}
                  getRef={ref => {
                    this.SearchInput = ref;
                  }}
                  onChangeText={val => this.setState({ newComment: val })}
                  id="newComment"
                  style={styles.comment}
                />

                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={this.report}
                >
                  <MaterialCommunityIcons
                    name="send"
                    color={"white"}
                    size={18}
                    style={{ alignSelf: "center", paddingLeft: 5 }}
                  />
                </TouchableOpacity>
              </Form>
              <SafeAreaView style={{ maxHeight: 320, padding: 0, margin: 0 }}>
                <ScrollView style={{ maxHeight: 320, padding: 0, margin: 0 }}>
                  {this.props.type === "comments"
                    ? this.props.items.map((comment, i) => (
                        <Comment
                          key={i}
                          comment={comment}
                          commenter={this.props.commenters[i]}
                        />
                      ))
                    : null}
                  <View style={{ flexDirection: "row", paddingTop: 10 }}>
                    <Text
                      style={{ color: "white", paddingHorizontal: 10 }}
                    >{`Block ${this.props.by.name}?`}</Text>
                    <Switch
                      trackColor={{ false: "white", true: "#FCC101" }}
                      // thumbColor={this.state.anonymous ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#E7E7E7"
                      onValueChange={this.toggleSwitch}
                      value={this.state.block}
                      style={{ alignSelf: "center" }}
                    />
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          </Modal>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 10
            }}
            onPress={() => {
              this.handleClick(true);
            }}
          >
            <Text
              style={{
                color: "#ee6c4d",
                fontWeight: "bold",
                fontSize: 15,
                paddingRight: 5
              }}
            >
              {this.props.type === "comments"
                ? this.props.items.length
                : this.props.items}
            </Text>
            <MaterialIcons
              name={this.props.icon}
              color={"black"}
              size={20}
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 0,
    width: "90%",
    backgroundColor: "#202020", //"#EF7458",
    borderRadius: 20,
    //borderWidth: 1,
    //borderColor: "#FDC100",
    padding: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5
    },
    maxHeight: 160,

    overflow: "scroll",
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: "center",
    paddingVertical: 10,
    zIndex: 999
  },
  sendButton: {
    backgroundColor: "#202020",
    borderRadius: 20,
    height: 40,
    width: 40,
    padding: 0,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  comment: {
    fontSize: 15,
    color: "#FFFFFF",
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    height: 40,
    width: "100%",
    alignSelf: "center",
    marginVertical: 3
  }
});
