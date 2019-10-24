# -*- coding: utf-8 -*-
"""
Created on Thu Oct 24 15:25:21 2019

@author: songl
"""

with open("regionNameIDs.csv", 'w',newline='') as f:
    writer = csv.writer(f)
    writer.writerows(regionNameIDs)