from selenium.webdriver.common.by import By
from flask import jsonify

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
        
        data.append({
            'title': title.text.replace(extraTitle.text, '').replace('\n',''), 
            'url': url.get_attribute('href'), 
            'text': text.text
        })

    return jsonify({"results":data, "engine": "yahoo"})