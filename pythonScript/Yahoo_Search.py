from selenium.webdriver.common.by import By
from flask import jsonify
from bs4 import BeautifulSoup
import requests as req

def yahooSearch(query,driver):
    
    driver.get(f'https://search.yahoo.com/search?p={query}')
    data = []

    css_identifier_result = ".searchCenterMiddle li .relsrch"
    css_identifier_title = ".compTitle a.d-ib"
    css_identifier_extra_title = ".compTitle a.d-ib span"
    css_identifier_link = ".compTitle a.d-ib"
    css_identifier_text = ".compText p"

    results = driver.find_elements(By.CSS_SELECTOR, css_identifier_result)

    for result in results:
        title = result.find_element(By.CSS_SELECTOR, css_identifier_title)
        extraTitle = result.find_element(By.CSS_SELECTOR, css_identifier_extra_title)
        url = result.find_element(By.CSS_SELECTOR, css_identifier_link)
        text = result.find_element(By.CSS_SELECTOR, css_identifier_text)
        ## Keyword count
        words=query.split()
        wordcount={}
        total=0
        for i in words:
            wordcount[i]=0

        res=req.get(url.get_attribute('href'))
        for w in words:
            wordcount[w]+=res.text.count(w) 
            total+=res.text.count(w)      
        data.append({
            'title': title.text.replace(extraTitle.text, '').replace('\n',''), 
            'url': url.get_attribute('href'), 
            'text': text.text,
            'wordcount':wordcount,
            'total':total
        })

    return jsonify({"results":data, "engine": "yahoo"})