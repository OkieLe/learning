import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux'; // 引入connect函数

class EditPage extends Component {

  static navigationOptions = {
    title: 'Detail',
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.user != null && nextProps.user == null) {
      this.props.navigation.goBack();
    }
    return nextProps.user != this.props.user;
  }

  render() {
    const { navigation } = this.props;
    const key = navigation.getParam('key', 'NO-KEY');
    const name = navigation.getParam('name', 'UNSET');
    return(
      <View style={styles.container}>
        <Text style={styles.item} >Key: { key.toString() }</Text>
        <Text style={styles.item} >Name: { name }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    user : state.user,
  })
)(EditPage)