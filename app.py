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
        f"/api/v1.0/heat_map<br/>"
    )


@app.route("/api/v1.0/heat_map")
def name_rating():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    lat= bnb_dset.latitude
    long=bnb_dset.longitude
    sel=[lat,long]
    # Setting up the query
    query_l= session.query(*sel).all()
    session.close()
    """Return a list of all passenger names"""
    heat_map_list=[]
    # Unpack the data
    for la,lo in query_l:
        dict_1={}
        dict_1["longitude"]= lo
        dict_1["latitude"]=la

        heat_map_list.append(dict_1)
    return jsonify(heat_map_list)
   

   

if __name__ == '__main__':
    app.run(debug=True)
