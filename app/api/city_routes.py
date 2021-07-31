from flask import Blueprint, jsonify, request
from app.models import db, Feed, Review, Comment, Location

city_routes = Blueprint('cities', __name__)


@city_routes.route('/<int:id>')
def get_dest_feeds(id):
    feed = Location.query.filter_by(api_id=str(id)).first()
    return feed.to_dict()


@city_routes.route('/<int:id>', methods=['POST'])
def post_feed(id):
    print('^^^^^^^^^^^^^^^^^^^^^', id)
    req = request.get_json()
    post = Feed(
        loc_id=req['loc_id'],
        body=req['body']
    )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()


@city_routes.route('/<int:id>/location', methods=['POST'])
def post_location(id=None):
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
