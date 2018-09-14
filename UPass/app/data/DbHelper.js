import { storage } from "../data/Storage";

export const CATEGORY_DEFAULT = "default";
export const CATEGORY_OS = "os";
export const CATEGORY_WORK = "work";
export const CATEGORY_PERSONAL = "personal";

export const U_PASS_KEY = "uPass";
export const NEXT_KEY = "nextId";
export const ACCOUNTS_KEY = "accounts";

export class Account {
  constructor(username = "", password = "", category = CATEGORY_DEFAULT, type = "") {
    this.id = getNextId();
    this.username = username;
    this.password = password;
    this.category = category;
    this.type = type;
  }
}

async function getNextId() {
  let id = await getValueOfKey(NEXT_KEY);
  return id;
}

export function getValueOfKey(name) {
  return new Promise((resolve, reject) => {
    storage.load(key=name, id=undefined, (data, success) => {
      if (success && data != null) {
        resolve(data);
      } else {
        if (name == NEXT_KEY) {
          resolve(1);
        } else {
          reject("Not exist")
        }
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
        resolve(accounts);
      } else {
        reject("No data");
      }
    });
  });
}

export function addAccount(account) {
  return new Promise((resolve, reject) => {
    getAccount(account.id)
      .then(data => {
        reject("Account exists");
      })
      .catch(reason => {
        storage.save(ACCOUNTS_KEY, account.id, account);
        storage.save(key=NEXT_KEY, obj=account.id + 1);
        resolve(account.id);
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