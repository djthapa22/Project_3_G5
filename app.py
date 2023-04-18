import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_cors import CORS, cross_origin

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
CORS(app, support_credentials=True)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/heat_map<br/>"
        f"/api/v1.0/cluster_map<br/>"
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
    session= Session(engine)
    county= bnb_dset.county
    listing= func.avg(bnb_dset.host_total_listings_count)
    price= func.avg(bnb_dset.price)
    clean= func.avg(bnb_dset.review_scores_cleanliness)
    loc= func.avg(bnb_dset.review_scores_location)
    rs= func.avg(bnb_dset.review_scores_rating)

    sel= [county,listing,price,clean,loc,rs]
    query_2= session.query(*sel).group_by(bnb_dset.county).all()
    session.close()
    bar_g= []
    for c,li,p,cl,lo,r in query_2:
        dict_2={}
        dict_2["avg_listing_count"]= li
        dict_2["county"]=c
        dict_2["avg_price"]=p
        dict_2["avg_cleanliness_score"]=cl
        dict_2["avg_review_score"]=r
        dict_2["avg_loc_score"]=lo
        bar_g.append(dict_2)
        
    return jsonify(bar_g)
    
@app.route("/api/v1.0/cluster_map")
def cluster_m():
    # Create our session (link) from Python to the DB
    session=Session(engine)
    name= bnb_dset.name
    super_host= bnb_dset.host_is_superhost
    price= bnb_dset.price
    lat= bnb_dset.latitude
    long=bnb_dset.longitude
    rs= bnb_dset.review_scores_rating
    accom= bnb_dset.accommodates
    link_url= bnb_dset.listing_url


    sel= [name,super_host,price,lat,long,rs,accom,link_url]
    query_3= session.query(*sel).all()

    cluster_g= []
    for n,s,p,la,lo,r,a,k in query_3:
        
        dict_3={}
        dict_3["name"]= n
        dict_3["super_host"]=s
        dict_3["price"]=p
        dict_3["latitude"]=la
        dict_3["longitude"]=lo
        dict_3["review_score"]=r
        dict_3["people_accommodates"]=a
        dict_3["url"]=k
    
        cluster_g.append(dict_3)
        
    return jsonify(cluster_g)

if __name__ == '__main__':
    app.run(debug=True)
