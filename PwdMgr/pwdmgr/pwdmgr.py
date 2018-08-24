# -*- coding: utf-8 -*-
#!/usr/bin/python

import getpass
import json

import os
import sys

from account import Account
from const import Constants

class PasswordManager(object):
    '''
    This is a command line tool for users
    to manage their accounts
    '''
    def __init__(self, name):
        self.fileName = name
        self.accountsList = []
        self.initFromFile()

    def ensureFile(self, mode):
        path = os.environ["HOME"] + os.path.sep + "pwdmgr" + os.path.sep
        if (not os.path.exists(path)):
            os.makedirs(path)
        self.db = path + self.fileName
        if (not os.path.exists(self.db)):
            db = open(self.db, "w")
            db.write("[]")
            db.close()

        return open(self.db, mode)

    def initFromFile(self):
        storageFile = self.ensureFile("r")

        dataStr = ""
        try:
            for line in storageFile:
                dataStr += line
        except IOError as err:
            print("Read file err " + err.message)
        else:
            if (not storageFile.closed):
                storageFile.close()

        dataList = json.loads(dataStr, encoding="utf-8")
        for item in dataList:
            account = Account(data = item)
            self.accountsList.append(account)

    def saveToFile(self):
        storageFile = self.ensureFile("w")

        dataStr = []
        try:
            for item in self.accountsList:
                dataStr.append(item.getSavableData())
            storageFile.write(json.dumps(dataStr))
        except IOError as err:
            print("Write to file err " + err.message)
        else:
            if (not storageFile.closed):
                storageFile.close()

    def __del__(self):
        self.saveToFile()

    def showMenu(self):
        while (True):
            opt = self._readInput(Constants.MENU_MAIN)
            if (opt == "1"):
                self.addAccount()
            elif (opt == "2"):
                self.updateAccount()
            elif (opt == "3"):
                self.removeAccount()
            elif (opt == "4"):
                self.listAccounts()
            else:
                print("Leaving password manager")
                break

    def addAccount(self):
        category = self.chooseCategory()
        accType = self._readInput("Input type of the account:")
        user = self._readInput("User name:")
        password = self._readPassword("Input password:")

        account = self.checkValidation(user, category, accType)
        if (account is None):
            self.accountsList.append(Account(name=user, pwd=password, accountType=accType, cat=category))
        else:
            print("Account already exists!")

    def chooseCategory(self):
        option = self._readInput(Constants.MENU_CATEGORY)
        return self.getCategoryFromOption(option)

    def getCategoryFromOption(self, option):
        if (option == "1"):
            return Constants.CATEGORY_OS
        elif (option == "2"):
            return Constants.CATEGORY_WORK
        elif (option == "3"):
            return Constants.CATEGORY_PERSONAL
        else:
            return Constants.CATEGORY_DEFAULT

    def checkValidation(self, user, category, accType):
        '''
        return account with password if account exists, None else
        '''
        account = Account(name = user, cat = category, accountType = accType)
        for item in self.accountsList:
            if (item.equals(account)):
                return item
        return None


    def updateAccount(self):
        account = self.authUser()
        if (account is not None):
            option = self._readInput(Constants.MENU_UPDATE)
            if (option == "1"):
                newPwd = self.getNewPassword()
                if (newPwd is not None):
                    account.changePassword(newPwd)
                    print("Password changed!")
            else:
                newType = self._readInput("Input new type:")
                if (len(newType) > 0):
                    account.updateType(newType)
                    print("Type changed!")
                else:
                    print("Nothing changed!")


    def removeAccount(self):
        account = self.authUser()
        if (account is not None):
            option = self._readInput(Constants.MENU_CONFIRM_REMOVE)
            if (option == "yes"):
                self.accountsList.remove(account)
                print("Account removed!")

    def authUser(self):
        category = self.chooseCategory()
        accType = self._readInput("Input type of the account:")
        user = self._readInput("User name:")
        accountSaved = self.checkValidation(user, category, accType)
        if (accountSaved is not None):
            for index in range(0, 3):
                password = self._readPassword("Verify password:")
                if (accountSaved.checkPassword(password)):
                    return accountSaved
                elif (index == 2):
                    print("Input wrong passwords too many times!")
                    return None
                else:
                    print("Please verify again!")
        else:
            print("Account not exists")
            return None

    def getNewPassword(self):
        for i in range(0, 3):
            passwordOne = self._readPassword("New password:")
            passwordTwo = self._readPassword("Confirm new password:")
            if (passwordOne == passwordTwo):
                return passwordOne
            elif (i < 2):
                print("Please try again, remaining times: " + (3 - i - 1) )
        else:
            print("Are you kidding?")
            return None


    def listAccounts(self):
        if (len(self.accountsList) == 0):
            print("No accounts to show!")
        else:
            print("\nID\t\tUSERNAME\tTYPE@CAT")
            for item in self.accountsList:
                print(str(item))

    def _readInput(self, message):
        return raw_input(message)

    def _readPassword(self, message):
        return getpass.getpass(message)