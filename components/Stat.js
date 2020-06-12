import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, Button } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import {
  Alert,
  TouchableHighlight,
  View
} from "react-native";
import Comment from './Comment.js';


export default class Stat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsVisible: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick = (isVisible) => {
    if (this.props.type == "comments" && this.props.items.length > 0) {
      this.setState({ commentsVisible: isVisible });
    } else if (this.props.type === "likes" && this.props.alreadyLiked === false) {
      this.props.like()
    }
  }

  render() {
    const { commentsVisible } = this.state;
    return (<View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={commentsVisible}
        backdropOpacity={0.7}
        backdropColor="white"
        onBackdropPress={() => this.setState({ commentsVisible: false })}
        onSwipeComplete={() => this.setState({ commentsVisible: false })}
        //https://blog.theodo.com/2018/08/awesome-modal/
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {this.props.type === "comments" ? this.props.items.map((comment, i) => <Comment key={i} comment={comment} commenter={this.props.commenters[i]}/>) : null}
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                this.handleClick(!commentsVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
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
            fontSize: 13,
            paddingRight: 5
          }}
        >

          {this.props.type === "comments" ? this.props.items.length : this.props.items}
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
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    shadowColor: "#d9d9d9",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 30,
    borderWidth:3
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});