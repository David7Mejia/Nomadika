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
    api_id = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(1000))
    description = db.Column(db.String(1000))

    comment = db.relationship('Comment', back_populates='location')
    feed = db.relationship('Feed', cascade="all, delete-orphan", back_populates='location')  # noqa
    reviews = db.relationship('Review', cascade="all, delete-orphan", back_populates='location')  # noqa
    gotos = db.relationship('Goto', back_populates='location')  # noqa

    def to_dict(self):
        return {
            'id': self.id,
            'image_url': self.image_url,
            'description': self.description,
            # 'users': self.users,
            'feeds': [f.to_dict() for f in self.feed],
            'comments': [c.to_dict() for c in self.comment]
        }
