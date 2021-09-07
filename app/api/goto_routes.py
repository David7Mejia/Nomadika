from flask import Blueprint, request
from app.models import db, Feed, Review, Comment, Location, Goto
from flask_login import current_user, login_required

goto_routes = Blueprint('goto', __name__)


# @goto_routes.route('/agit branchpi/goto/:id')
@goto_routes.route('/<int:id>', methods=['POST'])
@login_required
def add_venue(id):
    req = request.get_json()
    newGoto = Goto(
        user_id=current_user.id,
        loc_id=req['loc_id'],
        venue_name=req['venue_name'],
        venue_id=req['venue_id'],
        address=req['address'],
    )
    db.session.add(newGoto)
    db.session.commit()
    print('#########THIS IS THE GOTO FOR THE ADD VENUE BACK END:', newGoto)  # noqa
    return newGoto.to_dict()
