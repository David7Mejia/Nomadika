from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    feed_id = db.Column(db.Integer, db.ForeignKey('feeds.id'))
    comment = db.Column(db.String(300))

    users = db.relationship('User', back_populates='comments')
    feed = db.relationship('Feed', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'feed_id': self.feed_id,
            'created_at': self.created_at
        }
