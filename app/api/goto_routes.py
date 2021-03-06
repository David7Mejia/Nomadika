from flask import Blueprint, request
from app.models import db, Feed, Review, Comment, Location, Goto
from flask_login import current_user, login_required

goto_routes = Blueprint('goto', __name__)


@goto_routes.route('/<int:id>', methods=['POST'])
@login_required
def add_venue(id):
    req = request.get_json()
    newGoto = Goto(
        user_id=current_user.id,
        loc_id=req['loc_id'],
        loc_name=req['loc_name'],
        venue_name=req['venue_name'],
        venue_id=req['venue_id'],
        address=req['address'],
    )
    db.session.add(newGoto)
    db.session.commit()
    return newGoto.to_dict()


@goto_routes.route('/<int:id>')
def get_venues_by_loc(id):
    user = current_user.id
    venues = Goto.query.filter_by(loc_id=str(id), user_id=user).all()
    return {
        'venues': [v.to_dict() for v in venues],
    }


@goto_routes.route('/<int:id>', methods=['DELETE'])
def delete_venue(id):
    venue = Goto.query.get(id)
    if (venue.user_id == current_user.id):
        db.session.delete(venue)
        db.session.commit()
    return {'message': 'Venue Deleted'}


@goto_routes.route('/user/<int:id>')
def get_venues_by_user(id):
    # user = current_user.id
    venues = Goto.query.filter_by(user_id=id).all()
    return {
        'venues': [v.to_dict() for v in venues],
    }
