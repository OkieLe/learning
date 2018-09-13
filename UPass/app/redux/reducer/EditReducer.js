import * as types from "../action/Types";

const initialState = {
  save : false, // save
  delete : false, // delete
  loading : false, // delete or save ongoing
  result : false, // success or fail
  error : null
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.VALIDATE_ERR:
    return {
      ...state,
      save : false,
      delete : false,
      loading : false,
      result : false,
      error : action.reason,
    }
  case types.SAVE_GOING:
    return {
      ...state,
      save : true,
      delete : false,
      loading : true,
      result : false,
      error : action.reason,
    };
  case types.SAVE_DONE:
    return {
      ...state,
      save : true,
      delete : false,
      loading : false,
      result : action.status,
      error : action.reason,
    };
  case types.DELETE_GOING:
    return {
      ...state,
      save : false,
      delete : true,
      loading : true,
      result : false,
      error : action.reason,
    };
  case types.DELETE_DONE:
    return {
      ...state,
      save : false,
      delete : true,
      loading : false,
      result : action.status,
      error : action.reason,
    };
  default:
    return state;
  }
}