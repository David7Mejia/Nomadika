from .db import db
from flask_login import UserMixin

# traveled = db.Table(
#     'traveled',
#     db.Column('user_id', db.Integer, db.ForeignKey('user.id'),
#               primary_key=True),
#     db.Column('location_id', db.Integer, db.ForeignKey('location.id'),
#               primary_key=True))


class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    feed_id = db.Column(db.Integer, db.ForeignKey('feeds.id'))
    image_url = db.Column(db.String(300))
    description = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(),
                           onupdate=db.func.current_timestamp())
    users = db.relationship('User', secondary='traveled',
                            back_populates='locations')
    reviews = db.relationship('Review', back_populates='locations')
    feeds = db.relationship(
        'Feed', back_populates='locations', foreign_keys='Location.feed_id')

    def to_dict(self):
        return {
            'id': self.id,
            'feed_id': self.feed_id,
            'image_url': self.image_url,
            'description': self.description,
            'created_at': self.created_at,
            # 'traveled': [t.to_dict() for t in self.traveled],
        }
