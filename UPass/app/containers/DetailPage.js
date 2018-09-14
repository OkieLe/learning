import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux'; // 引入connect函数
import { CATEGORY_DEFAULT } from '../data/DbHelper';
import * as accAction from "../redux/action/AccAction";

class DetailPage extends Component {

  static navigationOptions = {
    title: 'Detail',
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const id = navigation.getParam('id', -1);
    this.state = {
      id : id,
    };
  }

  componentDidMount() {
    this.props.loadData(this.state.id);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text
          style={styles.item} >
          Key: { this.state.id.toString() }</Text>
        <Text style={styles.item} >Name: { this.props.data == null ? "" : this.props.data.username }</Text>
        <Text style={styles.item} >Category: {this.props.data == null ? "" : this.props.data.category}</Text>
        <Text style={styles.item} >Type: {this.props.data == null ? "" : this.props.data.type}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'flex-start',
    backgroundColor: '#F5FFFF'
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
})

export default connect(
  (state) => ({
    loading : state.query.detailLoading,
    data : state.query.detail,
    result : state.editor.result,
  }),
  dispatch => ({
    loadData : (id) => dispatch(accAction.getAccountDetail(id)),
    delAcc : (id) => dispatch(accAction.delAccount(id)),
  })
)(DetailPage)