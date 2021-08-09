from flask import Blueprint, jsonify, request
from app.models import db, Feed, Review, Comment, Location
import json
import request

city_routes = Blueprint('cities', __name__)


@city_routes.route('/<int:id>')
def get_dest_feeds(id):
    feed = Location.query.filter_by(api_id=str(id)).first()
    return feed.to_dict()


url1 = 'https://api.foursquare.com/v2/venues/search'


@city_routes.route('/destinfo', methods=['POST', 'GET'])
def get_info():
    req = request.get_json()
    params = dict(
        client_id='CLIENT_ID',
        client_secret='CLIENT_SECRET',
        v='20180323',
        near=req['near'],
        query=req['query'],
        limit=10
    )
    resp = request.get(url=url1, params=params)
    data = json.loads(resp.text)
    return jsonify(data)


@city_routes.route('/<int:id>', methods=['POST'])
def post_feed(id):
    req = request.get_json()
    post = Feed(
        loc_id=req['loc_id'],
        body=req['body'],
        user_id=req['user_id'],
    )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()


@city_routes.route('/<int:id>/location', methods=['POST'])
def post_location(id):

    exist = Location.query.filter_by(api_id=str(id)).first()

    if exist:
        return exist.to_dict()
    else:
        req = request.get_json()
        loc = Location(
            api_id=req['api_id'],
            name=req['name'],
            image_url=req['image_url'],
            description=req['description']
        )

        db.session.add(loc)
        db.session.commit()
        return loc.to_dict()


# @city_routes.errorhandler(500)
# def internal_error(error):
#     return "500 error"

@city_routes.route('/<int:id>/<desc>', methods=['PUT'])
def put_feed(id, desc):
    post = Feed.query.get(id)
    post.body = desc
    db.session.commit()
    return post.to_dict()


@city_routes.route('/<int:id>', methods=['DELETE'])
def delete_feed(id):
    post = Feed.query.get(id)
    db.session.delete(post)
    db.session.commit()
    return {'message': 'Post was deleted successfully'}

