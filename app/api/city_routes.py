from flask import Blueprint, jsonify, request
from app.models import db, Feed, Review, Comment, Location

city_routes = Blueprint('cities', __name__)


@city_routes.route('/<int:id>')
def get_dest_feeds(id):
    pass
    feed = Feed.query.filter_by(loc_id=str(id)).all()
    print('###################################', feed)
    # return feed.to_dict()
    return [fd.to_dict() for fd in feed]


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
    req = request.get_json()
    locExists = Location.query(api_id=id).exists()
    exists = db.session.query(Location.api_id).filter_by(api_id=id).first() is not None

    print('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', exists)
    pass
    # if locExists:
    #     single_loc = Location.query.get(api_id=id).first()
    #     return single_loc.to_dict()
    # else:
    #     loc = Location(
    #         api_id=req['api_id'],
    #         name=req['name'],
    #         image_url=req['image_url'],
    #         description=req['description']
    #     )

    #     db.session.add(loc)
    #     db.session.commit()
    #     return loc.to_dict()


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
