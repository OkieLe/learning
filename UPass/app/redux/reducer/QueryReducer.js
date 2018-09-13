import * as types from "../action/Types";

const initialState = {
  listLoading : false,
  list : null,
  detailLoading : false,
  detail : null,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.LIST_LOADING:
    return {
      ...state,
      loading : true,
    };
  case types.LIST_LOADED:
    return {
      ...state,
      loading : false,
      list : action.data,
    };
  case types.DETAIL_LOADING:
    return {
      ...state,
      detailLoading : true,
    };
  case types.DETAIL_LOADED:
    return {
      ...state,
      detailLoading : false,
      detail : action.data,
    };
  default:
    return state;
  }
}