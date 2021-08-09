from sqlalchemy.orm import backref
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# traveled = db.Table(
#     'traveled',
#     db.Model.metadata,
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'),
#               primary_key=True),
#     db.Column('location_id', db.String(100), db.ForeignKey('locations.api_id'),
#               primary_key=True))


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    avatar = db.Column(db.String(3000))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    reviews = db.relationship('Review', back_populates='users')
    comments = db.relationship('Comment', back_populates='users')
    # locations = db.relationship('Location',  back_populates='users')  # noqa
    feeds = db.relationship('Feed', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            # 'traveled': [t.id for t in self.traveled],

        }
