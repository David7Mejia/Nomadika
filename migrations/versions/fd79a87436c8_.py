"""empty message

Revision ID: fd79a87436c8
Revises: 911331fbf9bf
Create Date: 2021-08-18 15:21:34.820518

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fd79a87436c8'
down_revision = '911331fbf9bf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('gotos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('loc_id', sa.String(length=100), nullable=True),
    sa.Column('venue_id', sa.String(length=100), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('address', sa.String(length=300), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['loc_id'], ['locations.api_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('gotos')
    # ### end Alembic commands ###
