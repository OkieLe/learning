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

  logout() {
    this.props.navigation.replace("Login");
    this.props.logout();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}
      onPress={() => {
        this.setState({selected : item.key});
        this.props.navigation.push("Detail", {
          key : item.key,
          name : item.name,
        });
      }} >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          style={ {flex: 1,} }
          data={this.props.data }
          refreshing={this.props.refreshing}
          renderItem = {this.renderItem}
        />
        <TouchableOpacity onPress={this.logout.bind(this)} style={styles.loginBtn}>
          <View>
            <Text>退出登录</Text>
          </View>
        </TouchableOpacity>
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
  loginBtn: {
    marginTop: 20,
    width: 120,
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
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