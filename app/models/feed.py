from .db import db


class Feed(db.Model):
    __tablename__ = 'feeds'

    id = db.Column(db.Integer, primary_key=True)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    body = db.Column(db.String(500))

    comments = db.relationship(
        'Comment', back_populates='feeds', foreign_keys='Feed.comment_id')
    locations = db.relationship(
        'Location', back_populates='feeds', foreign_keys='Feed.location_id')

    def to_dict(self):
        return {
            'id': self.id,
            'location_id': self.location_id,
            'comment_id': self.comment_id,
            'body': self.body,
            'created_at': self.created_at
        }
