from .db import db
from flask_login import UserMixin


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(300))

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    loc_id = db.Column(db.Numeric, db.ForeignKey('locations.id'))

    users = db.relationship('User', back_populates='reviews')
    location = db.relationship('Location', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'review': self.review,
            'user_id': self.user_id,
            'created_at': self.created_at
        }
