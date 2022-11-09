import requests as req
from flask import jsonify
def stackoverflowSearch(query):
    url=f'https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&site=stackoverflow&q={query}'

    res=req.get(url)
    # print(res.json())
    results=[]
    data=res.json()['items']
    for i in data:
        results.append({'url':i['link'],'title':i['title'],'text':" ".join(i['tags'])})
    
    return jsonify({'results':results})