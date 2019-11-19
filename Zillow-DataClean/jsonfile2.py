# -*- coding: utf-8 -*-
"""
Created on Tue Nov 19 15:21:02 2019

@author: songl
"""

import csv
import json
from pprint import pprint
from geojson import Point, Feature, FeatureCollection, dump
with open('zillow-neighborhoods.geojson') as f:
    data=json.load(f)
    
print(json.dumps(data, indent=4, sort_keys=True))

allHomes = [] 
with open("allHome.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for allHome in csvreader: 
        allHomes.append(allHome) 
        
singleFamilys = [] 
with open("singleFamily.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for singleFamily in csvreader: 
        singleFamilys.append(singleFamily) 
        
condos = [] 
with open("condo.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for condo in csvreader: 
        condos.append(condo) 
        
topTiers = [] 
with open("topTier.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for topTier in csvreader: 
        topTiers.append(topTier) 

middleTiers = [] 
with open("middleTier.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for middleTier in csvreader: 
        middleTiers.append(middleTier) 

bottomTiers = [] 
with open("bottomTier.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for bottomTier in csvreader: 
        bottomTiers.append(bottomTier)       

studios = [] 
with open("studio.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for studio in csvreader: 
        studios.append(studio)  

oneBedrooms = [] 
with open("oneBedroom.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for oneBedroom in csvreader: 
        oneBedrooms.append(oneBedroom)  

twoBedrooms = [] 
with open("twoBedroom.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for twoBedroom in csvreader: 
        twoBedrooms.append(twoBedroom)  

threeBedrooms = [] 
with open("threeBedroom.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for threeBedroom in csvreader: 
        threeBedrooms.append(threeBedroom)  

fourBedrooms = [] 
with open("fourBedroom.csv", 'r') as csvfile: 
    # creating a csv reader object 
    csvreader = csv.reader(csvfile) 
    for fourBedroom in csvreader: 
        fourBedrooms.append(fourBedroom)  

map1=data['features']
new_data={'type':'FeatureCollection','features':[]}


for i in range(1,len(allHomes)):
    for j in range(len(data['features'])):
        if allHomes[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['allHomes']=allHomes[i][-1]

for i in range(1,len(singleFamilys)):
    for j in range(len(data['features'])):
        if singleFamilys[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['singleFamilys']=singleFamilys[i][-1]       

for i in range(1,len(condos)):
    for j in range(len(data['features'])):
        if condos[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['condos']=condos[i][-1]          

for i in range(1,len(topTiers)):
    for j in range(len(data['features'])):
        if topTiers[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['topTiers']=topTiers[i][-1]         

for i in range(1,len(middleTiers)):
    for j in range(len(data['features'])):
        if middleTiers[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['middleTiers']=middleTiers[i][-1]

for i in range(1,len(bottomTiers)):
    for j in range(len(data['features'])):
        if bottomTiers[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['bottomTiers']=bottomTiers[i][-1]

for i in range(1,len(studios)):
    for j in range(len(data['features'])):
        if studios[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['studios']=studios[i][-1]

for i in range(1,len(oneBedrooms)):
    for j in range(len(data['features'])):
        if oneBedrooms[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['oneBedrooms']=oneBedrooms[i][-1]
            
for i in range(1,len(twoBedrooms)):
    for j in range(len(data['features'])):
        if twoBedrooms[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['twoBedrooms']=twoBedrooms[i][-1]
            
for i in range(1,len(threeBedrooms)):
    for j in range(len(data['features'])):
        if threeBedrooms[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['threeBedrooms']=threeBedrooms[i][-1]
            
for i in range(1,len(fourBedrooms)):
    for j in range(len(data['features'])):
        if fourBedrooms[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['fourBedrooms']=fourBedrooms[i][-1]


with open('zillowDataPrice.geojson', 'w') as f:
    dump(data, f)