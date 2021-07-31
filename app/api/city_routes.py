from flask import Blueprint, jsonify
from app.models import db, Feed, Review, Comment, Location

city_routes = Blueprint('cities', __name__)


@city_routes.route('/<int:id>')
def get_dest_feeds(id):
    feed = Location.query.filter_by(api_id=str(id)).first()
    return feed.to_dict()


@city_routes.route('/<int:id>', methods=['POST'])
def post_feed():
    postJ = request.get_json()
    post = Feed(
        id=postJ['id'],
        loc_id=postJ['loc_id'],
        body=postJ['body']
    )
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict())
