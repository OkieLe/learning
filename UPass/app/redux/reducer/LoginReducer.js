import * as types from "../action/Types";

const initialState = {
  loading : false,
  hint : "Please login",
  status : false,
  user : null
};

export default function login(state = initialState, action) {
  switch (action.type) {
  case types.LOGIN_GOING:
    return {
      ...state,
      loading : action.loading,
      hint : "Logining",
      status : action.status,
      user : null
    };
  case types.LOGIN_DONE:
    return {
      ...state,
      loading : action.loading,
      hint : action.status ? "Login success" : "Login failed",
      status : action.status,
      user : action.user
    };
  case types.LOGIN_INIT:
    return {
      ...state,
      loading : false,
      hint : "Please login",
      status : false,
      user : null,
    };
  case types.LOGOUT_GOING:
    return {
      ...state,
      loading : action.loading,
      hint : "Logouting",
    };
  default:
    return state;
  }
}