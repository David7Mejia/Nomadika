from flask import Blueprint, jsonify
from app.models import db, Feed, Review, Comment

location_routes = Blueprint('feed', __name__)


@location_routes.route('/')
def get_all_feeds():
    feeds = Feed.query.order_by(Feed.id.desc())
    comments = Comment.query.order_by(Comment.id.desc())
    return {
        'posts': [post.to_dict() for post in posts],
        'comments': [comment.to_dict() for comment in comments]
    }
