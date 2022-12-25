from bs4 import BeautifulSoup
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
            
        ## Keyword count
        words=query.split()
        wordcount={}
        total=0
        for w in words:
            wordcount[w]=0

        res=req.get(i['link'])
        for w in words:
            wordcount[w]+=res.text.count(w)
            total+=res.text.count(w)
        results.append({'url':i['link'],'title':re.sub("&.{3};|&.{4};","",i['title']),'text':re.sub("&.{3};|&.{4};","",' '.join(i['tags'])),"wordcount":wordcount,'total':total})
 
    return jsonify({'results':results, "engine": "stackoverflow"})