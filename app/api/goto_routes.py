from flask import Blueprint
from app.models import db, Feed, Review, Comment, Location, Goto

goto_routes = Blueprint('goto', __name__)


# @goto_routes.route('/agit branchpi/goto/:id')
