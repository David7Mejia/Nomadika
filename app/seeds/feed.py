from app.models import db, Feed


# Adds a demo user, you can add other users here if you want
def seed_feed():
    boston = Feed(
        id=1, loc_id="72057594042858892", body='This place was great')

    db.session.add(boston)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_feed():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
