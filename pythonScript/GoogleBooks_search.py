from selenium.webdriver.common.by import By
from flask import jsonify
from bs4 import BeautifulSoup
import requests as req

def googleBooksSearch(query,driver):
    
    driver.get(f'https://www.google.com/search?q={query}&tbm=bks')
    data = []
    
    css_identifier_result = ".bHexk.Tz5Hvf"
    css_identifier_title = "h3"
    css_identifier_link = "a"


    results = driver.find_elements(By.CSS_SELECTOR, css_identifier_result)

    for result in results:
        titleElm = result.find_element(By.CSS_SELECTOR, css_identifier_title)
        title = titleElm.text

        try:
            text = result.find_element(By.CSS_SELECTOR,'.cmlJmd span')
        except:
            text = None
            
            
        urlElm = result.find_element(By.CSS_SELECTOR, css_identifier_link)
        url = urlElm.get_attribute('href')
        ## Keyword count
        words=query.split()
        wordcount={}
        total=0
        for i in words:
            wordcount[i]=0

        res=req.get(url,verify=False)
        for w in words:
            wordcount[w]+=res.text.count(w)
            total+=res.text.count(w)
        
        data.append({
            'title': title, 
            'url': url, 
            'text':'' if text is None else text.text,
            'wordcount':wordcount,
            'total':total
        })

    return jsonify({"results":data, "engine": "books"})