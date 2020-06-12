import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
  ScrollView
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
//import { ScrollView } from "react-native-gesture-handler";
import { Input, Form, Thumbnail } from "native-base";
import { Alert, TouchableHighlight, View } from "react-native";
import Comment from "./Comment.js";

export default class Stat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsVisible: false,
      newComment: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.comment = this.comment.bind(this);
  }
  handleClick = isVisible => {
    if (this.props.type == "comments" && this.props.items.length > 0) {
      this.setState({ commentsVisible: isVisible });
    } else if (
      this.props.type === "likes" &&
      this.props.alreadyLiked === false
    ) {
      this.props.like();
    }
  };

  comment () {
    if (this.state.newComment !== "") {
      this.props.comment(this.state.newComment)
      this.setState({newComment: ""})
    }
  }

  render() {
    const { commentsVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          animationIn="zoomIn"
          animationOut="zoomOut"
          transparent={true}
          isVisible={commentsVisible}
          backdropColor="#FFFFFF"
          backdropOpacity={0.75}
          onBackdropPress={() => this.setState({ commentsVisible: false })}
          scrollOffset={0}

          //https://blog.theodo.com/2018/08/awesome-modal/
        >
          <View style={styles.modalView}>
            <Form
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <Input
                placeholder="  ...type here"
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
                onPress={this.comment}
              >
                <MaterialCommunityIcons
                  name="send"
                  color={"white"}
                  size={18}
                  style={{ alignSelf: "center", paddingLeft: 5 }}
                />
              </TouchableOpacity>
            </Form>
            {this.props.type === "comments"
              ? this.props.items.map((comment, i) => (
                  <Comment
                    key={i}
                    comment={comment}
                    commenter={this.props.commenters[i]}
                  />
                ))
              : null}
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
          <MaterialCommunityIcons
            name={this.props.icon}
            color={"#ee6c4d"}
            size={18}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>
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
    width: "85%",
    backgroundColor: "#EF7458",
    borderRadius: 20,
    //borderWidth: 1,
    //borderColor: "#FDC100",
    padding: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    shadowColor: "black",
    shadowOffset: {
      width: 5,
      height: 5
    },
    maxHeight: 400,
    overflow: "scroll",
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
    alignSelf: "center",
    paddingVertical: 10,
    zIndex:999
  },
  sendButton: {
    backgroundColor: "#EF7458",
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
    backgroundColor: "#EF7458",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    height: 40,
    width: "100%",
    alignSelf: "center",
    marginVertical: 3,
  }
});
