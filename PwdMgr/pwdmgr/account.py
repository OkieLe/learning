# -*- coding: utf-8 -*-
#!/usr/bin/python

'''
Data structure about one account
'''
import time

from const import Constants

class Account(object):
    '''
    Account: a username and a password
    '''

    def __init__(self, name = "", pwd = "", accountType = "", cat = Constants.CATEGORY_DEFAULT, data = None):
        if (type(data) == dict):
            self.initFrom(data)
        else:
            assert type(name) == str and len(name) > 0
            assert type(pwd) == str # empty allowed
            assert cat in Constants.ALL_CATEGORIES
            self.id = int(time.time())
            self.userName = name
            self.password = pwd
            self.category = cat
            self.type = accountType

    def initFrom(self, data):
        self.id = data[Constants.KEY_ID]
        self.userName = data[Constants.KEY_USER_NAME]
        self.password = data[Constants.KEY_PASSWORD]
        self.category = data[Constants.KEY_CATEGORY]
        self.type = data[Constants.KEY_TYPE]

    def __str__(self):
        return "" + str(self.id) + "\t" + self.userName \
                + "\t\t" + self.type + "@" + self.category

    def changePassword(self, newPwd):
        self.password = newPwd

    def updateType(self, newType):
        self.type = newType

    def checkPassword(self, inputPwd):
        return self.password == inputPwd

    def getSavableData(self):
        data = {}
        data[Constants.KEY_ID] = self.id
        data[Constants.KEY_USER_NAME] = self.userName
        data[Constants.KEY_PASSWORD] = self.password
        data[Constants.KEY_CATEGORY] = self.category
        data[Constants.KEY_TYPE] = self.type
        return data

    def equals(self, other):
        return self.category == other.category and self.type == other.type \
                and self.userName == other.userName