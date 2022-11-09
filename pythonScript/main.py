from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials = True)

driver = webdriver.Chrome()
driver.minimize_window()

@app.route('/search/google/<string:query>')
@cross_origin(supports_credentials = True)
def googleSearc(query):
    
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
    # return query

@app.route('/search/yahoo/<string:query>')
@cross_origin(supports_credentials = True)
def yahooSearc(query):
    
    driver.get(f'https://search.yahoo.com/search?p={query}')
    data = []

    css_identifier_result = ".searchCenterMiddle li .relsrch"
    css_identifier_title = ".compTitle a.d-ib"
    css_identifier_extra_title = ".compTitle a.d-ib span"
    css_identifier_link = ".compTitle a.d-ib"
    css_identifier_text = ".compText p"

    results = driver.find_elements(By.CSS_SELECTOR, css_identifier_result)

    for result in results:
        result._execute
        title = result.find_element(By.CSS_SELECTOR, css_identifier_title)
        extraTitle = result.find_element(By.CSS_SELECTOR, css_identifier_extra_title)
        url = result.find_element(By.CSS_SELECTOR, css_identifier_link)
        text = result.find_element(By.CSS_SELECTOR, css_identifier_text)
        
        data.append({
            'title': title.text.replace(extraTitle.text, '').replace('\n',''), 
            'url': url.get_attribute('href'), 
            'text': text.text
        })

    return jsonify({"results":data})

if __name__ == "__main__":
    app.run(debug=True)

driver.quit()

# Show all processes: lsof -i:PORT_NUMBER
# Kill process: kill -9 PID