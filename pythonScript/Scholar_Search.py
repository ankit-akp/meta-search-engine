from selenium.webdriver.common.by import By
from flask import jsonify
from bs4 import BeautifulSoup
import requests as req

def scholarSearch(query,driver):
    
    driver.get(f'https://scholar.google.com/scholar?q={query}')
    data = []

    css_identifier_result = ".gs_ri"
    css_identifier_title = "h3"
    css_identifier_link = "a"
    css_identifier_text = ".gs_rs"

    results = driver.find_elements(By.CSS_SELECTOR, css_identifier_result)

    for result in results:
        title = result.find_element(By.CSS_SELECTOR, css_identifier_title)
        url = result.find_element(By.CSS_SELECTOR, css_identifier_link)
        try:
            text = result.find_element(By.CSS_SELECTOR, css_identifier_text)
        except: 
            text = None

        if title.text=='':
            continue
        ## Keyword count
        words=query.split()
        wordcount={}
        total=0
        for i in words:
            wordcount[i]=0

        res=req.get(url.get_attribute('href'),verify=False,headers={"User-Agent":"Mozilla/5.0"})
        for w in words:
            wordcount[w]+=res.text.count(w)
            total+=res.text.count(w)

        data.append({
            'title': title.text, 
            'url': url.get_attribute('href'), 
            'text': '' if text is None else text.text,
            'wordcount':wordcount,
            'total':total
        })

    return jsonify({"results":data, "engine": "scholar"})