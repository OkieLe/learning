import React, { Component, View, Text } from "react";
import { connect } from "react-redux";

import { init } from "../redux/action/Login";

class Main extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.user != this.props.user || nextProps.hint != this.props.hint;
  }

  componentDidMount() {
    const { initUser } = this.props;
    if (!user) {
      initUser();
    }
  }

  render() {
    return (
      <View>
        <Pages />
        <Text>{ this.props.hint }</Text>
      </View>
    );
  }
}

// 获取 state 变化
const mapStateToProps = state => {
  return {
    status : state.status,
    user : state.user,
    loading : state.loading,
    hint : state.hint,
  };
};

// 发送行为
const mapDispatchToProps = dispatch => {
  return {
    initUser : dispatch(init()),
  };
};

// 进行第二层包装,生成的新组件拥有 接收和发送 数据的能力
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
