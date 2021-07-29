from enum import unique

from sqlalchemy.sql.schema import UniqueConstraint
from .db import db


class Feed(db.Model):
    __tablename__ = 'feeds'

    id = db.Column(db.Integer, primary_key=True)
    loc_id = db.Column(db.Numeric, db.ForeignKey(
        'locations.id'), unique=True)

    location = db.relationship('Location', back_populates='feed')
    comments = db.relationship('Comment', back_populates='feed')

    def to_dict(self):
        return {
            'id': self.id,
            'location_id': self.location_id,
            'comment_id': self.comment_id,
            'body': self.body,
            'created_at': self.created_at
        }
