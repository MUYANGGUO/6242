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

for i in range(1,len(allHomes)):
    for j in range(len(data['features'])):
        if allHomes[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['all_home']=allHomes[i][-1]

for i in range(1,len(singleFamilys)):
    for j in range(len(data['features'])):
        if singleFamilys[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['single_family']=singleFamilys[i][-1]       

for i in range(1,len(condos)):
    for j in range(len(data['features'])):
        if condos[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['condo']=condos[i][-1]          

for i in range(1,len(topTiers)):
    for j in range(len(data['features'])):
        if topTiers[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['top_tier']=topTiers[i][-1]         

for i in range(1,len(middleTiers)):
    for j in range(len(data['features'])):
        if middleTiers[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['middle_tier']=middleTiers[i][-1]

for i in range(1,len(bottomTiers)):
    for j in range(len(data['features'])):
        if bottomTiers[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['bottom_tier']=bottomTiers[i][-1]

for i in range(1,len(studios)):
    for j in range(len(data['features'])):
        if studios[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['studio']=studios[i][-1]

for i in range(1,len(oneBedrooms)):
    for j in range(len(data['features'])):
        if oneBedrooms[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['one_bedroom']=oneBedrooms[i][-1]
            
for i in range(1,len(twoBedrooms)):
    for j in range(len(data['features'])):
        if twoBedrooms[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['two_bedroom']=twoBedrooms[i][-1]
            
for i in range(1,len(threeBedrooms)):
    for j in range(len(data['features'])):
        if threeBedrooms[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['three_bedroom']=threeBedrooms[i][-1]
            
for i in range(1,len(fourBedrooms)):
    for j in range(len(data['features'])):
        if fourBedrooms[i][1]==data['features'][j]['properties']['regionid']:
            data['features'][j]['properties']['four_bedroom']=fourBedrooms[i][-1]


with open('zillowDataCleaned.geojson', 'w') as f:
    dump(data, f)

missing=[]
for t in data['features']:
    if (len(t['properties'])==6):
        missing.append(t)
        print(t['properties']['name'])

for k in range(len(data['features'])):
    data['features'][k]['properties']['flag']=1
    if data['features'][k]['properties']['name']=='Yerba Buena Island':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Central Waterfront - Dogpatch':
        data['features'][k]['properties']['studio']=3100
        data['features'][k]['properties']['one_bedroom']=3700
        data['features'][k]['properties']['two_bedroom']=4500
    elif data['features'][k]['properties']['name']=='Jordan Park - Laurel Heights':
        data['features'][k]['properties']['studio']=2500
        data['features'][k]['properties']['one_bedroom']=2800
        data['features'][k]['properties']['two_bedroom']=3500
        data['features'][k]['properties']['four_bedroom']=8000
    elif data['features'][k]['properties']['name']=='Lakeside':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Van Ness - Civic Center':
        data['features'][k]['properties']['studio']=3300
        data['features'][k]['properties']['one_bedroom']=3500
        data['features'][k]['properties']['two_bedroom']=4000
    elif data['features'][k]['properties']['name']=='Pine Lake Park':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Alkatraz Island':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Twin Peaks':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Inner Parkside':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Central Richmond':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Forest Hill Extension':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Treasure Island':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Eureka Valley - Dolores Heights - Castro':
        data['features'][k]['properties']['one_bedroom']=3000
        data['features'][k]['properties']['two_bedroom']=4500
        data['features'][k]['properties']['four_bedroom']=9000
    elif data['features'][k]['properties']['name']=='Outer Parkside':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Parnassus - Ashbury':
        data['features'][k]['properties']['one_bedroom']=2800
        data['features'][k]['properties']['two_bedroom']=3500
        data['features'][k]['properties']['four_bedroom']=6500
    elif data['features'][k]['properties']['name']=='Central Sunset':
        data['features'][k]['properties']['one_bedroom']=3100
    elif data['features'][k]['properties']['name']=='Merced Heights':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='Yerba Buena':
        data['features'][k]['properties']['flag']=0
    elif data['features'][k]['properties']['name']=='West Portal':
        data['features'][k]['properties']['one_bedroom']=2000
        data['features'][k]['properties']['two_bedroom']=3200
        data['features'][k]['properties']['four_bedroom']=5800
    elif data['features'][k]['properties']['name']=='North Panhandle':
        data['features'][k]['properties']['flag']=0

#with open('zillowDataCleanedv2.geojson', 'w') as f:
 #   dump(data, f)
    
        
    
        
        
