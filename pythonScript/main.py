from flask import Flask
from selenium import webdriver
from flask_cors import CORS, cross_origin
import Google_Search as google
import Yahoo_Search as yahoo
import Scholar_Search as scholar
import Stackoverflow_Search as stackoverflow
import GoogleNews_search as googlenews
import GoogleBooks_search as googlebooks


app = Flask(__name__)
CORS(app, support_credentials = True)

driver = webdriver.Chrome()
driver.minimize_window()


# Google
@app.route('/search/google/<string:query>')
@cross_origin(supports_credentials = True)
def googleSearch(query):
   return google.googleSearch(query,driver)


# Yahoo 
@app.route('/search/yahoo/<string:query>')
@cross_origin(supports_credentials = True)
def yahooSearch(query):
    return yahoo.yahooSearch(query,driver)
    

# Google Scholar
@app.route('/search/scholar/<string:query>')
@cross_origin(supports_credentials = True)
def scholarSearch(query):
    return scholar.scholarSearch(query,driver)


# Stackoverflow
@app.route('/search/stackoverflow/<string:query>')
@cross_origin(supports_credentials = True)
def stackoverflowSearch(query):
    return stackoverflow.stackoverflowSearch(query)

# Google News
@app.route('/search/googlenews/<string:query>')
@cross_origin(supports_credentials = True)
def googlenewsSearch(query):
    return googlenews.googlenewsSearch(query,driver)

# Google Books
@app.route('/search/googlebooks/<string:query>')
@cross_origin(supports_credentials = True)
def googlebooksSearch(query):
    return googlebooks.googleBooksSearch(query,driver)


if __name__ == "__main__":
    app.run()
# debug=True
driver.quit()

# Show all processes: lsof -i:PORT_NUMBER
# Kill process: kill -9 PID

# Pending
# Science.gov
# pubmed