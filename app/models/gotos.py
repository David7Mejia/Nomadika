from enum import unique

from sqlalchemy.sql.schema import UniqueConstraint
from .db import db


class Goto(db.Model):
    __tablename__ = 'gotos'

    id = db.Column(db.Integer, primary_key=True)
    loc_id = db.Column(db.String(100), db.ForeignKey(
        'locations.api_id'))
    venue_id = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    address = db.Column(db.String(300))
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    location = db.relationship('Location', back_populates='gotos')
    user = db.relationship('User', back_populates='gotos')

    def to_dict(self):
        return {
            'id': self.id,
            'loc_id': self.loc_id,
            'venue_id': self.venue_id,
            'address': self.address,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
