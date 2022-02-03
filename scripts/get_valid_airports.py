#code to find airports with images
import os
import json    

json_data = open('cfa.json')
cfadata = json.load(json_data)

json_data = open('acotw.json')
acotwdata = json.load(json_data)

#combine the two arrays and then search in sequential order
combined=cfadata+acotwdata

airports=[]
#loop through image directory and get valid airports, by first three letters of filename
for filename in os.listdir ("images"):
    code=filename[:3]
    for loc in combined:
        if loc["code"]==code:
            airports.append(loc)
            break

#produce master file of data
with open('master.json', 'w') as outfile:
  json.dump(airports, outfile)
