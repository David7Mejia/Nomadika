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
        # query='coffee',
        limit=1
    )
    resp = requests.get(url=url, params=params)
    data = json.loads(resp.text)
    print('###################################################################', data)
    return data
