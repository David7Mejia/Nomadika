from enum import unique

from sqlalchemy.sql.schema import UniqueConstraint
from .db import db


class Feed(db.Model):
    __tablename__ = 'feeds'

    id = db.Column(db.Integer, primary_key=True)
    loc_id = db.Column(db.String(100), db.ForeignKey(
        'locations.api_id'))
    body = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    location = db.relationship('Location', back_populates='feed')
    comments = db.relationship('Comment', cascade="all, delete-orphan", back_populates='feed' )
    user = db.relationship('User', back_populates='feeds')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'loc_id': self.loc_id,
            'body': self.body,
            'comments': [comment.to_dict() for comment in self.comments],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
