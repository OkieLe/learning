import * as types from "./Types";

export function login(password) {
  return dispatch => {
    dispatch(logining());
    dispatch(checkPassword(password));
  };
}

export function logout() {
  return dispatch => {
    dispatch(logoutGoing());
    dispatch(initUser());
  };
}

export function init() {
  return dispatch => {
    dispatch(initUser())
  }
}

let fakeUser = {
  "name" : "Aha",
  "key" : 0,
};

function checkPassword(password) {
  if (password == "123456") {
    return loginSuccess(true, fakeUser);
  } else {
    return loginSuccess(isSuccess=false, user=null);
  }
}

function initUser() {
  return {
    type : types.LOGIN_INIT,
    loading: false,
    status: false,
    user: null
  }
}

function logining() {
  return {
    type : types.LOGIN_GOING,
    loading : true
  };
}

function loginSuccess(isSuccess, user) {
  return {
    type : types.LOGIN_DONE,
    loading : false,
    status : isSuccess,
    user : user
  };
}

function logoutGoing() {
  return {
    type: types.LOGOUT_GOING,
    loading: true,
  };
}
