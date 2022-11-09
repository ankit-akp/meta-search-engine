from flask import Flask
from selenium import webdriver
from flask_cors import CORS, cross_origin
import Google_Search as google
import Yahoo_Search as yahoo
import Scholar_Search as scholar

app = Flask(__name__)
CORS(app, support_credentials = True)

driver = webdriver.Firefox()
driver.minimize_window()

@app.route('/search/google/<string:query>')
@cross_origin(supports_credentials = True)
def googleSearch(query):
   return google.googleSearch(query,driver)
    # return query

@app.route('/search/yahoo/<string:query>')
@cross_origin(supports_credentials = True)
def yahooSearch(query):
    return yahoo.yahooSearch(query,driver)
    
@app.route('/search/scholar/<string:query>')
@cross_origin(supports_credentials = True)
def scholarSearch(query):
    return scholar.scholarSearch(query,driver)

if __name__ == "__main__":
    app.run()
# debug=True
driver.quit()

# Show all processes: lsof -i:PORT_NUMBER
# Kill process: kill -9 PID