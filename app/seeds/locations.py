from app.models import db, Location


# Adds a demo user, you can add other users here if you want
def seed_locations():
    boston = Location(
        api_id="72057594042858892", name='boston', image_url='null', description='amazing!')  # noqa

    db.session.add(boston)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_locations():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
