# -*- coding: utf-8 -*-
"""
Created on Sun Oct 20 16:06:09 2019

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

k=0
for i in range(1,len(allHomes)):
    for j in range(len(map1)):
        if allHomes[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['allHomes']=[]
            for m in range(2,len(allHomes[i])):
                new_data['features'][k]['properties']['allHomes'].append({allHomes[0][m]:allHomes[i][m]})
            k+=1
            
k=0
for i in range(1,len(singleFamilys)):
    for j in range(len(map1)):
        if singleFamilys[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['singleFamilys']=[]
            for m in range(2,len(singleFamilys[i])):
                new_data['features'][k]['properties']['singleFamilys'].append({singleFamilys[0][m]:singleFamilys[i][m]})
            k+=1
            
k=0
for i in range(1,len(condos)):
    for j in range(len(map1)):
        if condos[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['condos']=[]
            for m in range(2,len(condos[i])):
                new_data['features'][k]['properties']['condos'].append({condos[0][m]:condos[i][m]})
            k+=1
            
k=0
for i in range(1,len(topTiers)):
    for j in range(len(map1)):
        if topTiers[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['topTiers']=[]
            for m in range(2,len(topTiers[i])):
                new_data['features'][k]['properties']['topTiers'].append({topTiers[0][m]:topTiers[i][m]})
            k+=1

k=0
for i in range(1,len(middleTiers)):
    for j in range(len(map1)):
        if middleTiers[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['middleTiers']=[]
            for m in range(2,len(middleTiers[i])):
                new_data['features'][k]['properties']['middleTiers'].append({middleTiers[0][m]:middleTiers[i][m]})
            k+=1 

k=0
for i in range(1,len(bottomTiers)):
    for j in range(len(map1)):
        if bottomTiers[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['bottomTiers']=[]
            for m in range(2,len(bottomTiers[i])):
                new_data['features'][k]['properties']['bottomTiers'].append({bottomTiers[0][m]:bottomTiers[i][m]})
            k+=1 

k=0
for i in range(1,len(studios)):
    for j in range(len(map1)):
        if studios[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['studios']=[]
            for m in range(2,len(studios[i])):
                new_data['features'][k]['properties']['studios'].append({studios[0][m]:studios[i][m]})
            k+=1 
            
k=0
for i in range(1,len(oneBedrooms)):
    for j in range(len(map1)):
        if oneBedrooms[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['oneBedrooms']=[]
            for m in range(2,len(oneBedrooms[i])):
                new_data['features'][k]['properties']['oneBedrooms'].append({oneBedrooms[0][m]:oneBedrooms[i][m]})
            k+=1 
            
k=0
for i in range(1,len(twoBedrooms)):
    for j in range(len(map1)):
        if twoBedrooms[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['twoBedrooms']=[]
            for m in range(2,len(twoBedrooms[i])):
                new_data['features'][k]['properties']['twoBedrooms'].append({twoBedrooms[0][m]:twoBedrooms[i][m]})
            k+=1 

k=0
for i in range(1,len(threeBedrooms)):
    for j in range(len(map1)):
        if threeBedrooms[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['threeBedrooms']=[]
            for m in range(2,len(threeBedrooms[i])):
                new_data['features'][k]['properties']['threeBedrooms'].append({threeBedrooms[0][m]:threeBedrooms[i][m]})
            k+=1 

k=0
for i in range(1,len(fourBedrooms)):
    for j in range(len(map1)):
        if fourBedrooms[i][1]==map1[j]['properties']['regionid']:
            new_data['features'].append(map1[j])
            new_data['features'][k]['properties']['fourBedrooms']=[]
            for m in range(2,len(fourBedrooms[i])):
                new_data['features'][k]['properties']['fourBedrooms'].append({fourBedrooms[0][m]:fourBedrooms[i][m]})
            k+=1 

with open('myfile.geojson', 'w') as f:
   dump(new_data, f)


          



    
