from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    feed_id = db.Column(db.Integer, db.ForeignKey('feeds.id'))
    loc_id = db.Column(db.String(100), db.ForeignKey(
        'locations.api_id'))
    comment = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    users = db.relationship('User', back_populates='comments')
    location = db.relationship('Location', back_populates='comment')
    feed = db.relationship('Feed', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'loc_id': self.loc_id,
            'feed_id': self.feed_id,
            'comment': self.comment,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
