from bottle import route, run, request
import json
import requests
from pprint import pprint

@route('/')
def main():
    r = requests.get(
        url="http://api.diffbot.com/v3/article",
        params = {
            "token": "0d5c56d2a7a3a5a4ad6c644b326993c2",
            "url": "https://www.spotify.com/us/legal/end-user-agreement/"
        }
    )

    data = r.json()
    tos = data["objects"][0]["text"]

    return tos

run(host='localhost', port=8080, debug=True)
