from bottle import route, run, request
import http.client

@route('/')
def main():
  return "hello world"

run(host='localhost', port=8080, debug=True)
