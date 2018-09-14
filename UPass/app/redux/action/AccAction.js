import * as types from "./Types";
import { deleteAccount, addAccount, getAccount, getAccounts } from "../../data/DbHelper";

export function getAccountDetail(id) {
  return dispatch => {
    dispatch(loadDetail(true, null));
    getAccount(id)
      .then(data => {
        dispatch(loadDetail(false, data));
      })
      .catch(reason => {
        console.log(reason);
        dispatch(loadDetail(false, null));
      });
  };
}

function loadDetail(loading, data) {
  return {
    type: loading ? types.DETAIL_LOADING : types.DETAIL_LOADED,
    data
  }
}

export function getAccountList() {
  return dispatch => {
    dispatch(loadList(true, null));
    getAccounts()
      .then(data => {
        dispatch(loadList(false, data));
      })
      .catch(reason => {
        console.log(reason);
      });
  };
}

function loadList(loading, data) {
  return {
    type: loading ? types.LIST_LOADING : types.LIST_LOADED,
    data
  }
}

export function saveAccount(account) {
  return dispatch => {
    dispatch(saveGoing());
    checkAndSave(account, dispatch);
  };
}

export function delAccount(id, dispatch) {
  return dispatch => {
    dispatch(delGoing());
    checkAndDelete(id, dispatch);
  };
}

function checkAndSave(account, dispatch) {
  const nameLen = account.username.length;
  const pswdLen = account.password.length;
  if (nameLen < 6 || pswdLen < 8) { //Just for test, should validate earlier
    dispatch(validate("Name or password invalid"));
  } else {
    addAccount(account)
      .then(data => {
        dispatch(saveDone(true));
      })
      .catch(reason => {
        console.log(reason);
        dispatch(saveDone(false));
      });
  }
}

function checkAndDelete(id, dispatch) {
  deleteAccount(id)
    .then(row => {
      dispatch(delDone(true));
    })
    .catch(reason => {
      console.log(reason);
      dispatch(delDone(false));
    })
}

function validate(reason) {
  return {
    type : types.VALIDATE_ERR,
    reason: reason,
  }
}

function saveGoing() {
  return {
    type : types.SAVE_GOING,
    loading: true,
  }
}

function saveDone(isSuccess) {
  return {
    type : types.SAVE_DONE,
    loading : false,
    status: isSuccess
  };
}

function delGoing() {
  return {
    type : types.DELETE_GOING,
    loading : false,
  };
}

function delDone(isSuccess) {
  return {
    type: types.DELETE_DONE,
    loading: true,
    status: isSuccess
  };
}
