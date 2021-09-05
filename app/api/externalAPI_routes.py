import os
from flask import Blueprint
import requests
import json

externalAPI_routes = Blueprint('externalAPI', __name__)

client_id = os.environ.get('CLIENT_ID')
client_secret = os.environ.get('CLIENT_SECRET')


@externalAPI_routes.route('/<string:id>')
def location(id):
    url = 'https://api.foursquare.com/v2/venues/search'

    params = dict(
        client_id=client_id,
        client_secret=client_secret,
        v='20180323',
        near=f'{id}',
        limit=1
    )
    resp = requests.get(url=url, params=params)
    data = json.loads(resp.text)
    return data


@externalAPI_routes.route('/venue/<string:place>/<string:venue>')
def venue(venue, place):
    url = 'https://api.foursquare.com/v2/venues/explore'

    params = dict(
        client_id=client_id,
        client_secret=client_secret,
        v='20180323',
        near=f'{place}',
        query=f'{venue}',
        limit=20
    )
    resp = requests.get(url=url, params=params)
    print('##########################################', resp.text)
    data = json.loads(resp.text)
    return data
