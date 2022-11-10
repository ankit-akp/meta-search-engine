import requests as req
import re
from flask import jsonify
def stackoverflowSearch(query):
    url=f'https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&site=stackoverflow&q={query}'

    res=req.get(url)
    # print(res.json())
    results=[]
    data=res.json()['items']
    for i in data:
        results.append({'url':i['link'],'title':re.sub("&.{3};|&.{4};","",i['title']),'text':re.sub("&.{3};|&.{4};","",' '.join(i['tags']))})
    
    return jsonify({'results':results})