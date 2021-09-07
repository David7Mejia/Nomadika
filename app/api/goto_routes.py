from flask import Blueprint
from app.models import db, Feed, Review, Comment, Location, Goto
from flask_login import current_user, login_required

goto_routes = Blueprint('goto', __name__)


# @goto_routes.route('/agit branchpi/goto/:id')
@goto_routes.route('/:id')
@login_required
def add_venue(id):
    """
    Add a venue to users list in database.
    """
    print('#########THIS IS THE ID FOR THE ADD VENUE BACK END:', id)  # noqa
    return id
