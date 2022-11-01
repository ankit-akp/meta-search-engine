from distutils.log import debug
from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By


app = Flask(__name__)

driver=webdriver.Chrome(executable_path='/usr/bin/chromedriver')
# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

# @app.route('/string/<string:n>')
# def test(n):
#     result={
#         "string":n
#     }
#     return jsonify(result)

# @app.route('/int/<int:n>')
# def testint(n):
#     result={
#         "Number":n
#     }
#     return jsonify(result)


@app.route('/search/google/<string:query>')
def googleSearc(query):
    driver.get(f'https://www.google.com/search?q={query}&')
    data=[]

    elms=driver.find_elements(By.CSS_SELECTOR,'.UK95Uc .yuRUbf a')

    for i in elms:
        text=i.find_element(By.TAG_NAME,'h3').text
        url=i.get_attribute('href')
        data.append({'text':text,'url':url})

    return jsonify({"results":data})
    # return query

if __name__=="__main__":
    app.run(debug=True)

# Show all processes: lsof -i:PORT_NUMBER
# Kill process: kill -9 PID