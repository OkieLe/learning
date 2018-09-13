import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux"; // 引入connect函数
import * as loginAction from "../redux/action/Login";

class LoginPage extends Component {

  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
    this.state = {
      password: "",
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("status:" + this.props.status + ",user:" + nextProps.user);
    if (this.props.needAuth || nextProps.needAuth) {
      this.props.initUser();
    }
    // 登录完成,成功登录
    if (nextProps.status && !this.props.status && nextProps.user != null) {
      this.props.navigation.replace("Accounts");
      return false;
    }
    return true;
  }

  render() {
    const { login } = this.props;
    console.log(this.props.user);
    console.log(this.props.hint);
    return (
      <View style={styles.container}>
        <Text>{this.props.hint}</Text>
        <TextInput
          style={styles.input}
          placeholder="Type password here"
          onChangeText={text => this.setState({ password: text })}
        />
        <TouchableOpacity
          onPress={() => login(this.state.password)}
          style={styles.loginBtn}
        >
          <Text>登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF"
  },
  input: {
    height: 40,
    width: 160,
    borderBottomColor: "#000000",
    borderBottomWidth: 1
  },
  loginBtn: {
    marginTop: 30,
    width: 120,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default connect(
  (state, ownProps) => ({
    status: state.login.status,
    user: state.login.user,
    loading: state.login.loading,
    hint: state.login.hint,
  }),
  dispatch => ({
    login: password => {
      dispatch(loginAction.login(password));
    },
    initUser: () => {
      dispatch(loginAction.init());
    },
  })
)(LoginPage);
