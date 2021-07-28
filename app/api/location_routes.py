# from flask import Blueprint, jsonify
# import json
# import requests
# import os

# location_routes = Blueprint('query', __name__)

# url = 'https://api.foursquare.com/v2/venues/explore'


# @location_route.route('/')
# def location():
#     params = dict(
#         client_id=os.environ.get('REACT_APP_CLIENT_ID'),
#         client_secret=os.environ.get('REACT_APP_CLIENT_SECRET'),
#         v='20180323',
#         ll='40.7243,-74.0018',
#         query='coffee',
#         limit=1
#     )


# resp = requests.get(url=url, params=params)
# data = json.loads(resp.text)
# print('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', params)
