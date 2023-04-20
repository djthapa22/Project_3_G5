///// CREATING HEAT MAP /////

// Defining initial Map
let map1 = L.map("map1", {
    center: [44.9778, -93.2650],
    zoom: 10
  });

// Adding Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map1);

// flask API url to get data
let heatmapUrl = "http://127.0.0.1:5000/api/v1.0/heat_map"

// using d3 to select data
d3.json(heatmapUrl).then(function(response) {

    // console.log(response); 

    // creating empty array
    let heatArray = [];
  
    // for loop to iterate through response 
    for (let i = 0; i < response.length; i++) {
      let location = response[i];

      // if statement is checking for none nulls
      if (location) {
        //pushing coordinates to array
        heatArray.push([location.latitude, location.longitude]);
      }
  
    }
    // defining heat map style
    let heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 5
    }).addTo(map1);
  
  });


///// CREATING INTERACTIVE MAP /////
let map2 = L.map("map2", {
    center: [44.9778, -93.2650],
    zoom: 10
  });

// Adding Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map2);

// Flask API Url
let clusterUrl = "http://127.0.0.1:5000/api/v1.0/cluster_map" 

// using d3 to select data
d3.json(clusterUrl).then(function(response){

    // defining marker category
    let markers = L.markerClusterGroup();

    // for loop to iterate through responses
    for (let i=0; i<response.length;i++){
        let location = response[i];

        // if statment to check for nulls
        if (location) {

            // adding marker layer
            markers.addLayer(L.marker([location.latitude,location.longitude])

            // binding popup
            .bindPopup(`<h3> ${response[i].name} </h3> <hr> <h4> ${response[i].property_type} -- accomodates: ${response[i].people_accommodates} </h4> 
            <hr> <h4> Price Per Night: $${response[i].price} -- Review Score: ${response[i].review_score} </h4> <hr> <h4>  County: ${response[i].county} -- <a href=${response[i].url}>AirBnb Link</a> </h4>`));
        }
    }
    // adding layer to map
    map2.addLayer(markers);

});


///// CREATING DROP DOWN MENU /////
let graphUrl = "http://127.0.0.1:5000/api/v1.0/bar_graph"

// init function to pre populate graphs
function init(){
    // D3 to select dropdown menu
    let dropMenu = d3.select("#selDataset");

    // Retreiving json data and logging it
    d3.json(graphUrl).then((data)=>{

        // console.log(data)

        // data array for counties
        let counties = [];

        // populate array with values from query
        for (let i = 0; i < data.length; i++) {

          let county = data[i].county
          
          // pushing county name to empty array
          counties.push(county);
    
        };

        // interating through each county in the array and adding it to the drop down.
        counties.forEach((place) => {
            dropMenu.append("option").text(place).property("value",place);
        });

        // pre populating
        let place = counties[0];

        // calling functions to create graphs
        barGraph(place);
        gauge(place);

    });
}

///// CREATING BAR GRAPH /////

// creating barGraph function
function barGraph(selection){

  // using d3 to select data
d3.json(graphUrl).then(function(response){

  // creating an array of the entire response
  let counties = response;

  // filtering response for what is selected
  let filteredData = counties.filter((data)=>data.county == selection)

  // calling the selected county
  let entry = filteredData[0];

  // console.log(entry)

  // defining the data for the cleanliness score
  let trace1 = {
    x:[entry.county],
    y:[entry.avg_cleanliness_score],
    name:'cleanliness score',
    type:'bar'

  }

  // defining the data for the review score
  let trace2 = {
    x:[entry.county],
    y:[entry.avg_review_score],
    name:'Review score',
    type:'bar'
  }

  // defining the size of the graph
  let layout = {
    height: 400,
    width: 700
};

  // combining the traces
  let data =[trace1,trace2]

  // plotting the bar graph
  Plotly.newPlot('chart1', data, layout);

});

}

///// CREATING GUAGE /////

// creating gauge function
function gauge(selection) {

  // using d3 to select data
  d3.json(graphUrl).then((data) => {

    // creating array of the entire response
    let counties = data;

    // filter array for the selected county
    let filteredData = counties.filter((data)=>data.county == selection)

    // calling the data for the selected county 
    let entry = filteredData[0];

    // defining gauge
    let trace1 = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: entry.avg_price,
      type: "indicator",
      mode:"gauge+number",
      gauge: {
        axis: {range:[null,500]},
        bar: {color:"rgb(68,166,198)"},
        steps: [
          { range: [0, 50], color: "rgb(233,245,248)" },
          { range: [50, 100], color: "rgb(218,237,244)" },
          { range: [150, 200], color: "rgb(203,230,239)" },
          { range: [200, 250], color: "rgb(188,223,235)" },
          { range: [250, 300], color: "rgb(173,216,230)" },
          { range: [300, 350], color: "rgb(158,209,225)" },
          { range: [350, 400], color: "rgb(143,202,221)" },
          { range: [400, 450], color: "rgb(128,195,216)" },
          { range: [450, 500], color: "rgb(113,187,212)" }
      ]
      }
    }];

    // plotting gauge
    Plotly.newPlot("gauge",trace1);

  });
}

// function for anytime the drop down menu is changed
function optionChanged(selection){
  barGraph(selection);
  gauge(selection);
};

// init to pre populate graphs
init();