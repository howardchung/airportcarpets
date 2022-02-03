airports=[]
from bs4 import BeautifulSoup
soup=BeautifulSoup(open('data.xml'))
for loc in soup.findAll("location"):
    name=loc["copy_title"]
    coordinates=[loc["long"], loc["lat"]]
    description=loc["copy_text"]
    image_path = loc["image_path"]
    code=loc["airport_code"]
    newairport={}
    newairport["name"]=name
    newairport["code"]=code
    newairport["image_path"]="http://carpetsforairports.com/img-carpet/large/"+image_path
    newairport["description"]=description
    newairport["long"]=coordinates[0]
    newairport["lat"]=coordinates[1]
    airports.append(newairport)

import json
with open('cfa.json', 'w') as outfile:
  json.dump(airports, outfile)
