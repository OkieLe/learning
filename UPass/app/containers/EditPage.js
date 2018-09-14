import React, { Component } from 'react';
import {
  Alert,
  Picker,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { connect } from 'react-redux'; // 引入connect函数
import { CATEGORY_DEFAULT, CATEGORY_OS, CATEGORY_PERSONAL, CATEGORY_WORK, } from '../data/DbHelper';
import * as accAction from '../redux/action/AccAction';

class EditPage extends Component {

  static navigationOptions = {
    title: 'Editor',
  };

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    const id = navigation.getParam('id', -1);
    const username = navigation.getParam('username', null);
    const password = navigation.getParam('password', null);
    const category = navigation.getParam("category", CATEGORY_DEFAULT);
    const type = navigation.getParam("type", null);
    this.state = {
      id: id,
      username: username,
      password: password,
      category: category,
      type: type,
      dataChanged: false,
    };
    this.goBackWithResult.bind(this);
    this.validInput.bind(this);
    this.alertInvalid.bind(this);
  }

  validInput(account) {
    if (account.username == null || account.password == null || account.type == null) {
      return false;
    } else if (account.username.length < 6 || account.password.length < 8) {
      return false;
    }
    return true;
  }

  save() {
    if (!this.validInput(this.state)) {
      console.log("Required field invalid");
      this.alertInvalid("Invalid input");
      return;
    }
    if (this.state.dataChanged) {
      this.props.saveAcc(this.state);
    } else {
      console.log("Nothing to save");
      this.goBackWithResult(false);
    }
  }

  goBackWithResult(result) {
    this.props.navigation.state.params.setResult(result);
    this.props.navigation.goBack();
  }

  alertInvalid(message) {
    Alert.alert(
      'Saving',
      message,
      [
        {text: 'OK', onPress: () => {
            console.log("I see");
          }
        },
      ],
    );
  }

  cancel() {
    if (this.state.dataChanged) {
      Alert.alert(
        'Cancel',
        'Dismiss all your changes?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => {
              console.log('OK Pressed');
              this.goBackWithResult(false);
            }
          },
        ],
        { cancelable: false });
    } else {
      this.goBackWithResult(false);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.save && nextProps.result) {
      this.goBackWithResult(true);
    }
    return true;
  }

  render() {
    return(
      <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        keyboardShouldPersistTaps={"handled"}
        >
        <Text style={styles.header} >Category</Text>
        <Picker
          selectedValue={ this.state.category }
          mode="dropdown"
          style={ styles.picker }
          itemStyle={ styles.pickerItem }
          onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
          <Picker.Item label="Default" value={CATEGORY_DEFAULT} />
          <Picker.Item label="OS" value={CATEGORY_OS} />
          <Picker.Item label="Personal" value={CATEGORY_PERSONAL} />
          <Picker.Item label="Work" value={CATEGORY_WORK} />
        </Picker>
        <Text style={styles.header} >User name</Text>
        <TextInput
          style={styles.input}
          placeholder="John Doe"
          defaultValue={ this.state.username }
          maxLength={16}
          onChangeText={text => {
              this.setState({ username: text });
              this.setState({dataChanged: true});
            }}
          />
        <Text style={styles.header} >Password</Text>
        <TextInput
          style={styles.input}
          defaultValue={ this.state.password }
          placeholder="Type password here"
          textContentType={"password"}
          secureTextEntry={true}
          keyboardType={"default"}
          maxLength={16}
          onChangeText={text => {
              this.setState({ password: text });
              this.setState({dataChanged: true});
            }}
          />
        <Text style={styles.header} >Custom type</Text>
        <TextInput
          style={styles.input}
          defaultValue={ this.state.type }
          placeholder="github.com"
          onChangeText={text => {
              this.setState({ type: text });
              this.setState({dataChanged: true});
            }}
          />
        </ScrollView>
        <View style={styles.buttonBar}>
          <TouchableOpacity onPress={this.save.bind(this)} style={styles.loginBtn}>
              <Text>保存</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.cancel.bind(this)} style={styles.loginBtn}>
              <Text>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: 'flex-start',
    backgroundColor: '#F5FFFF'
  },
  scroll: {
    flex: 1,
    padding: 16,
    width: '100%',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomColor: "#558888",
    borderBottomWidth: 0.5,
    marginBottom: 4,
  },
  input: {
    height: 48,
    width: "100%",
    fontSize: 20,
    marginBottom: 16,
    borderBottomColor: "#000000",
    borderBottomWidth: 1
  },
  picker: {
    height: 48,
    width: 200,
    alignItems: "flex-start",
    marginBottom: 8,
  },
  pickerItem: {
    height: 48,
    width: 200,
  },
  buttonBar: {
    marginTop: 12,
    marginBottom: 12,
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
    marginLeft: 16,
    marginRight: 16,
    padding: 10
  }
})

export default connect(
  (state) => ({
    save : state.editor.save,
    result : state.editor.result,
  }),
  (dispatch) => ({
    saveAcc : (account) => dispatch(accAction.saveAccount(account)),
  })
)(EditPage)