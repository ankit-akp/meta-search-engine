from selenium.webdriver.common.by import By
from flask import jsonify
from bs4 import BeautifulSoup
import requests as req

def googlenewsSearch(query,driver):
    
    driver.get(f'https://news.google.com/search?q={query}')
    data = []
    d=BeautifulSoup(driver.page_source,'html.parser')
    elms=d.find_all('h3')
    base='https://news.google.com'
    for i in elms:

        title=i.get_text()
        url=base+i.a.get('href')[1:]
        text=i.next_sibling.div.a.string+' : '+i.next_sibling.div.time.string
       
        ## Keyword count
        words=query.split()
        wordcount={}
        total=0
        for w in words:
            wordcount[w]=0

        res=req.get(url,verify=False)
        for w in words:
            wordcount[w]+=res.text.count(w)
            total+=res.text.count(w)

        data.append({'url':url, 'title':title,'text':text,'wordcount':wordcount,'total':total})


    return jsonify({"results":data, "engine": "news"})