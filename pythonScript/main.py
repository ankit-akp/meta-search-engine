from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from flask_cors import CORS, cross_origin
import Google_Search as google
import Yahoo_Search as yahoo

app = Flask(__name__)
CORS(app, support_credentials = True)

driver = webdriver.Chrome()
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
    


if __name__ == "__main__":
    app.run()
# debug=True
driver.quit()

# Show all processes: lsof -i:PORT_NUMBER
# Kill process: kill -9 PID