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
        f"/api/v1.0/bar_graph"
    )


@app.route("/api/v1.0/heat_map")
def heat_maps():
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
   

@app.route("/api/v1.0/bar_graph")
def bar_graph():
    # Create our session (link) from Python to the DB
    session=Session(engine)
    listing= bnb_dset.host_total_listings_count
    county= bnb_dset.county
    price= bnb_dset.price
    bedrooms= bnb_dset.bedrooms
    rs= bnb_dset.review_scores_rating

    sel= [listing,county,price,bedrooms,rs]
    query_2= session.query(*sel).all()
    session.close()
    
    bar_g= []
    for l,c,p,b,r in query_2:
        dict_2={}
        dict_2["county"]=c
        dict_2["listing"]= l
        dict_2["price"]=p
        dict_2["bedrooms"]=b
        dict_2["review_score"]=r
        bar_g.append(dict_2)
        
    
    return jsonify(bar_g)
    

if __name__ == '__main__':
    app.run(debug=True)
