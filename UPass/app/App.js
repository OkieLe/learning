import React, { Component } from 'react';

// 引用外部文件
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import configureStore from './redux/store/Store';

import AccountsList from './containers/AccountsList';
import DetailPage from './containers/DetailPage';
import LoginPage from './containers/LoginPage';
import EditPage from './containers/EditPage';

const Pages = createStackNavigator({
  Login: { screen: LoginPage },
  Accounts: { screen: AccountsList },
  Detail: { screen: DetailPage },
  Editor: { screen: EditPage },
});

const store = configureStore();

export default class Root extends Component {
  render() {
    return(
      // 第一层包装,为了让 main 能够拿到 store
      <Provider store={store}>
        <Pages />
      </Provider>
    )
  }
}