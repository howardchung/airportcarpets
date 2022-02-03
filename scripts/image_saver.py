#code to pull images

import json    
import urllib

json_data = open('acotw.json')
data = json.load(json_data)

for airport in data:
    try:
        resource = urllib.urlopen(airport["image_path"])
        output = open(airport["code"]+"."+airport["image_path"].split(".")[-1],"wb")
        output.write(resource.read())
        output.close()
    except:
        continue