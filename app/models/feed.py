from .db import db


class Feed(db.Model):
    __tablename__ = 'feeds'

    id = db.Column(db.Integer, primary_key=True)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    body = db.Column(db.String(500))

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
