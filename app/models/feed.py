from enum import unique

from sqlalchemy.sql.schema import UniqueConstraint
from .db import db


class Feed(db.Model):
    __tablename__ = 'feeds'

    id = db.Column(db.Integer, primary_key=True)
    loc_id = db.Column(db.String(100), db.ForeignKey(
        'locations.api_id'))
    body = db.Column(db.String(500), nullable=False)
    location = db.relationship('Location', back_populates='feed')
    comments = db.relationship('Comment', back_populates='feed')

    def to_dict(self):
        return {
            'id': self.id,
            'loc_id': self.loc_id,
            'body': self.body,
            'comments': self.comments,
            # 'created_at': self.created_at
        }
