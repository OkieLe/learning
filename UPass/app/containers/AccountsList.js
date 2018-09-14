import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux'; // 引入connect函数

import * as loginAction from '../redux/action/Login';// 导入action方法
import * as accAction from '../redux/action/AccAction';

class AccountsList extends Component {

  static navigationOptions = {
    title: 'Accounts',
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
    };
  }

  componentDidMount() {
    this.props.loadData();
  }

  logout() {
    this.props.navigation.replace("Login");
    this.props.logout();
  }

  addNew() {
    this.props.navigation.push("Editor");
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}
      onPress={() => {
        this.setState({selected : item.id});
        this.props.navigation.push("Detail", {
          id : item.id,
        });
      }} >
      <Text>{item.username}</Text>
    </TouchableOpacity>
  );

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          style={ {flex: 1,} }
          data={this.props.data }
          keyExtractor={(item, index) => item.id.toString()}
          refreshing={this.props.refreshing}
          renderItem = {this.renderItem}
        />
        <View style={styles.buttonBar}>
          <TouchableOpacity onPress={this.logout.bind(this)} style={styles.loginBtn}>
              <Text>退出登录</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addNew.bind(this)} style={styles.loginBtn}>
              <Text>添加账户</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#F5FFFF',
    padding: 20
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  buttonBar: {
    marginTop: 20,
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center"
  },
  loginBtn: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    marginLeft: 10,
    marginRight: 10,
    padding: 10
  }
})

export default connect(
  (state) => ({
    loading : state.login.loading,
    hint : state.login.hint,
    user : state.login.user,
    data : state.query.list,
    refreshing : state.query.listLoading,
  }),
  (dispatch) => ({
    logout : () => dispatch(loginAction.logout()),
    loadData : () => dispatch(accAction.getAccountList())
  })
)(AccountsList)