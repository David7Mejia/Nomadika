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
    image_url = db.Column(db.String(1000))
    description = db.Column(db.String(1000))

    feed = db.relationship('Feed', back_populates='location')
    reviews = db.relationship('Review', back_populates='location')

    def to_dict(self):
        return {
            'id': self.id,
            'feed_id': self.feed_id,
            'image_url': self.image_url,
            'description': self.description,
            'created_at': self.created_at,
            # 'traveled': [t.to_dict() for t in self.traveled],
        }
