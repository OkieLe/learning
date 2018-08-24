# -*- coding: utf-8 -*-
#!/usr/bin/python

'''
Constants
'''

class Constants(object):
    KEY_ID = "id"
    KEY_USER_NAME = "userName"
    KEY_PASSWORD = "password"
    KEY_TYPE = "type"
    KEY_CATEGORY = "category"

    CATEGORY_DEFAULT = "default"
    CATEGORY_OS = "os"
    CATEGORY_WORK = "work"
    CATEGORY_PERSONAL = "personal"
    ALL_CATEGORIES = (CATEGORY_DEFAULT, CATEGORY_OS, CATEGORY_PERSONAL, CATEGORY_WORK)

    MENU_MAIN = '''
Welcome to password manager!
Enter the leading number of the option you choose,
and Press "ENTER".

1. Add account
2. Update account
3. Remove account
4. List account
5. Quit

Your option(5):
'''

    MENU_CATEGORY = '''
Please choose which category the account is in

1. OS
2. Work
3. Personal
4. <Anything else>

Your option(4):
'''

    MENU_UPDATE = '''
What do you want change ?

1. password
2. type

Option(2):
'''

    MENU_CONFIRM_REMOVE = '''
Are you sure?
Please enter yes or no.
no ?'''