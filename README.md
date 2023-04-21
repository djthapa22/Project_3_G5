# Project_3_G5
# Twin Cities Airbnb Analysis

This project analyzes the Twin Cities Airbnb dataset to help users decide where to book their next trip to Minnesota. The project includes four visualizations - Heat map, Cluster map, Price Gauge, and Bar chart - to provide users with all the information they need to make an informed decision.

## Technologies Used

The project uses the following technologies:

- Python
- Pandas
- SQLite Database
- Flask API
- HTML
- CSS
- JavaScript

Steps we took in this project :
1. CSV file from datasource -- insideairbnb.com 
2. Import CSV into pandas to clean data 
3. Load to SQLite Database 
4. Create Flask API 
5. Create HTML 
6. In JS, call from flask API to transform data 
7. Style with CSS

## Heat Map

The Heat Map shows the density of listings in the Twin Cities area, allowing users to quickly identify the most popular areas.

![Screen Shot 2023-04-20 at 7 07 37 PM](https://user-images.githubusercontent.com/119380122/233511502-b3800ceb-4986-4c68-bdf0-8409e8255cd2.png)


## Cluster Map

The Cluster Map allows users to zoom in and out to find the number of listings, as well as information about the listing, including the name, accommodation type, price per night, and county.

![Screen Shot 2023-04-20 at 7 09 36 PM](https://user-images.githubusercontent.com/119380122/233511547-6a162710-8eef-4f11-a95f-1810609de6b9.png)


## Bar Graph

The Bar Graph provides users with information about the average overall rating and average cleanliness rating for a selected county.


![Screen Shot 2023-04-20 at 7 10 00 PM](https://user-images.githubusercontent.com/119380122/233511590-fda6da22-c8a9-4b99-9958-f4e68b7f4e78.png)


## Interactive Background

The site uses the VidBG JavaScript library to display a unique background video of Minneapolis downtown.


![Screen Shot 2023-04-20 at 7 10 28 PM](https://user-images.githubusercontent.com/119380122/233511632-39c0b170-1ec4-462e-85de-1e90f8d7e1e3.png)


## Price Gauge

The Price Gauge updates the average county cost depending on the user's selection, providing insights into the most affordable and expensive areas.

![Screen Shot 2023-04-20 at 7 10 47 PM](https://user-images.githubusercontent.com/119380122/233511660-e6786357-330f-489c-a5ef-8f34140677a6.png)

## Conclusion

The Twin Cities Airbnb Analysis project provides users with easy-to-understand visualizations that enable them to make informed decisions about where to book their next trip to Minnesota. The project highlights Hennepin as the county with the most listings and the median average per night of $158. Ramsey is the most affordable county, with a median average of $139/night, making it the perfect choice for price-sensitive travelers. Finally, LeSauer has the highest cleanliness score of 4.92 and a median average of $290/night.
