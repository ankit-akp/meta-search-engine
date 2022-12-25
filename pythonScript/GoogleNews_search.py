from selenium.webdriver.common.by import By
from flask import jsonify
from bs4 import BeautifulSoup
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
        
        data.append({'url':url, 'title':title,'text':text})

    return jsonify({"results":data, "engine": "news","wordcount":{"abc":1,"def":2,"ghi":3,"jkl":4}})