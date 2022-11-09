from selenium.webdriver.common.by import By
from flask import jsonify

def googleSearch(query,driver):
    
    driver.get(f'https://www.google.com/search?q={query}')
    data = []

    css_identifier_result = ".tF2Cxc"
    css_identifier_title = "h3"
    css_identifier_link = ".yuRUbf a"
    css_identifier_text = ".VwiC3b"

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

        data.append({
            'title': title.text, 
            'url': url.get_attribute('href'), 
            'text': '' if text is None else text.text
        })

    return jsonify({"results":data})