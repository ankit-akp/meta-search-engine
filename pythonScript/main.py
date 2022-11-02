from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from flask_cors import CORS

app = Flask(__name__)
CORS(app, support_credentials = True)

driver = webdriver.Firefox()
driver.minimize_window()

@app.route('/search/google/<string:query>')
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
        text = result.find_element(By.CSS_SELECTOR, css_identifier_text)
        
        data.append({
            'title': title.text, 
            'url': url.get_attribute('href'), 
            'text': text.text
        })

    return jsonify({"results":data})
    # return query

if __name__ == "__main__":
    app.run(debug = True)

driver.quit()

# Show all processes: lsof -i:PORT_NUMBER
# Kill process: kill -9 PID