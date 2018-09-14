import { storage } from "../data/Storage";

export const CATEGORY_DEFAULT = "default";
export const CATEGORY_OS = "os";
export const CATEGORY_WORK = "work";
export const CATEGORY_PERSONAL = "personal";

export const U_PASS_KEY = "uPass";
export const NEXT_KEY = "nextId";
export const ACCOUNTS_KEY = "accounts";

export class Account {
  constructor(obj) {
    this.id = obj.id > 0 ? obj.id : getNextId();
    this.username = obj.username;
    this.password = obj.password;
    this.category = obj.category;
    this.type = obj.type;
    console.log("id->" + this.id);
  }
}

function getNextId() {
  return parseInt(new Date().getTime()/1000);
  // await getValueOfKey(NEXT_KEY)
  //   .then(data => {
  //     console.log("getValue " + data);
  //     return data;
  //   })
  //   .catch(reason => {
  //     console.log("getValue null");
  //     return 1;
  //   });
}

export function getValueOfKey(name) {
  return new Promise((resolve, reject) => {
    storage.loadMeta(key=name, (data, success) => {
      if (success && data != null) {
        resolve(data);
      } else {
        reject("Not exist");
      }
    });
  });
}

export function getAccount(id) {
  return new Promise((resolve, reject) => {
    storage.load(ACCOUNTS_KEY, id, (data, success) => {
      if (success && data != null) {
        resolve(data);
      } else {
        reject("Not exist");
      }
    });
  });
}

export function getAccounts() {
  return new Promise((resolve, reject) => {
    storage.getAllDataForKey(ACCOUNTS_KEY, (accounts) => {
      if (accounts == null || accounts.length == 0) {
        reject("No data");
      } else {
        resolve(accounts);
      }
    });
  });
}

export function addAccount(account) {
  let savableData = new Account(account);
  if (account.id > 0) {
    return new Promise((resolve, reject) => {
      storage.save(ACCOUNTS_KEY, savableData.id, savableData);
      resolve(savableData.id);
    });
  }
  return new Promise((resolve, reject) => {
    getAccount(savableData.id)
      .then(data => {
        reject("Account exists");
      })
      .catch(reason => {
        storage.save(ACCOUNTS_KEY, savableData.id, savableData);
        storage.saveMeta(NEXT_KEY, savableData.id + 1);
        resolve(savableData.id);
      });
  });
}

export function deleteAccount(id, dispatch) {
  return new Promise((resolve, reject) => {
    getAccount(account.id)
      .then(data => {
        storage.remove(ACCOUNTS_KEY, account.id);
        resolve(1);
      })
      .catch(reason => {
        reject("Account not exist");
      });
  });
}

export function toJson(obj) {
  return JSON.stringify(obj);
}

export function fromJson(jsonStr) {
  return JSON.parse(jsonStr);
}