# -*- coding: utf-8 -*-
#!/usr/bin/python

import os
import sys

if not __package__:
    path = os.path.join(os.path.dirname(__file__), os.pardir)
    sys.path.insert(0, path)

from pwdmgr import PasswordManager

if __name__ == "__main__":
    PasswordManager("main.db").showMenu()