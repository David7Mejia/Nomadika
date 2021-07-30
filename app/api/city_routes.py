from flask import Blueprint, jsonify
from app.models import db, Feed, Review, Comment, Location

city_routes = Blueprint('cities', __name__)


@city_routes.route('/<int:id>')
def get_dest_feeds(id):
    print('************************** BACKEND', id)
    post = Location.query.filter_by(api_id=str(id)).first()
    print('****************post', post)
    return post.to_dict()
