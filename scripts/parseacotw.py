import xml.etree.ElementTree as ET
tree = ET.parse('AirportCarpetsoftheWorld.kml')
root = tree.getroot()

airports=[]
from bs4 import BeautifulSoup

for node in root[0]:
    if "Placemark" in node.tag:
        soup=BeautifulSoup(ET.tostring(node))
        name=soup.find('ns0:name').text
        coordinates=soup.find('ns0:point').find('ns0:coordinates').text.split(",")
        soup2 = BeautifulSoup(soup.find("ns0:description").contents[0])
        if soup2.find('img')!=None:
            image_path = soup2.find('img')["src"]
            comment=soup2.text
            code=name[:3]
            newairport={}
            newairport["name"]=name
            newairport["code"]=code
            newairport["image_path"]=image_path
            newairport["description"]=comment
            newairport["long"]=coordinates[0]
            newairport["lat"]=coordinates[1]
            airports.append(newairport)

import json
with open('acotw.json', 'w') as outfile:
  json.dump(airports, outfile)
