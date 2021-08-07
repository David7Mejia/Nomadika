from flask import Blueprint, request, redirect
from app.models import db, Comment, Feed
# from app.forms import CommentForm
from flask_login import current_user, login_required

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>',)
@login_required
def get_comments():
    # req = request.get_json()
    comment = Comment.query.filter_by(feed_id=Feed.id).first()
    return comment.to_dict()


@comment_routes.route('/create', methods=['POST'])
@login_required
def index():
    req = request.get_json()
    newComment = Comment(
        user_id=current_user.id,
        feed_id=req['feed_id'],
        comment=req['comment']
    )
    db.session.add(newComment)
    db.session.commit()
    return newComment.to_dict()


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    deleteComment = Comment.query.get(id)
    if (deleteComment.user_id == current_user.id):
        db.session.delete(deleteComment)
        db.session.commit()
    return {'message': 'Comment Deleted'}


@comment_routes.route('/<int:id>/<comment>', methods=['PUT'])
@login_required
def edit_comment(id, comment):

    cmt = Comment.query.get(id)
    cmt.comment = comment

    db.session.commit()
    return cmt.to_dict()
