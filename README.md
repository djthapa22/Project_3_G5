# Traveling to Minneapolis? We'll find your perfect AirBnB!

## Overview of ETL:
For this project, our group decided to analyze the AirBnB listings data within the greater Twin Cities area.
We wanted to understand how we could use an online datasource (API) to extract data and complete the following steps of ETL steps in driving our visualizations. 

* ***<ins>Extraction:*** </ins>  <br> We utilized the AirBnB data found in below resource for Twin Cities area.
  * We used the CSV method to download the data
* ***<ins> Transform:***</ins> <br>  We used the following steps to clean our code
  * Pandas: Consolidated and updated datatypes to a dataframe to be used for analysis
    * Converted the dataframe into a SQL Lite database 
  * SQL Alchemy: Utilized the datbase to perform SQL Alchemy queryies that tranformed  exact data/ information to flow into our flask JSONified form
* ***<ins>Load:***</ins> <br> We then used a flask API data to house our data to be used for visualizations
  * Flask Code: Created three unique routes to house our three visualizations: Heat Map, Cluster Map & Bar Graph
  * Javascript: Using HTML, CSS,and other configurations used Javascript to create our visualizations.


## 3 Steps to Follow prior to selecting an AirBnB:
1. Initial Visual Overview: Use the Heat Map to see the overall concentration of listing throughout the Twin Cities Area
2. Granular Visual Overiew: Use the Cluster Map to see how many listings are concentrated, then use the markers to interact and understand the name of the listing, overall rating and price per night.
3. Deeper Drop-down View: By using the drop down to Counties, look at average cleanliness score and average rating score.


***Heat Map***
Write description here

![image](https://user-images.githubusercontent.com/119895467/232554678-c90692d9-2487-47b3-84d7-57bcf4b8bd68.png)

***Cluster Map***
Write description here

![image](https://user-images.githubusercontent.com/119895467/232554848-91202569-9471-4a0e-b6e9-78ac2fb33c4e.png)

***Bar Graph***
Write description here

(insert image link)

***Interactive Background***
Write description here

(inster image link)


## Contributors 

* ***DJ Thapa*** <br>
* ***Caleb Steeves***<br>
* ***John Gonzalez*** <br>
* ***Tanner Victorian*** <br>

## Sources

* [Inside Airbnb:](http://insideairbnb.com/twin-cities-msa) <br>
* [Bideo.JS](https://rishabhp.github.io/bideo.js/)

