import json
import os

new=[]
json_data = open('cfa.json')
current = json.load(json_data)
#loop through image directory and get valid airports, by first three letters of filename
for filename in os.listdir ("../images"):
    code=filename[:3]
    found=False
    for loc in current:
        if loc["code"]==code:
            new.append(loc)
            print "found"
            found=True
            break
    if not found:
        obj={"image_path":"",
        "code":code,
        "description":"",
        "long":"",
        "lat":"",
        "name":""}
        new.append(obj)
        print "notfound"

#produce master file of data
with open('new.json', 'w') as outfile:
  json.dump(new, outfile)
