import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///abnb.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
bnb_dset = Base.classes.bnb_dset

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/name_rating<br/>"
    )


@app.route("/api/v1.0/name_rating")
def name_rating():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(bnb_dset.name, bnb_dset.review_scores_value).all()

    session.close()

    # Convert list of tuples into normal list
    all_info = []
    for name, review_scores_value in results:
        dict = {}
        dict["name"] = name
        dict["review_scores_value"] = review_scores_value
        all_info.append(dict)
   

    return jsonify(all_info)

if __name__ == '__main__':
    app.run(debug=True)
