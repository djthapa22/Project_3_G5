///// CREATING HEAT MAP /////

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

d3.json(heatmapUrl).then(function(response) {

    // console.log(response); 
  
    let heatArray = [];
  
    for (let i = 0; i < response.length; i++) {
      let location = response[i];

      // if statement is checking for none nulls
      if (location) {
        //console.log(location);
        heatArray.push([location.latitude, location.longitude]);
      }
  
    }
  
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

let clusterUrl = "http://127.0.0.1:5000/api/v1.0/cluster_map" 

d3.json(clusterUrl).then(function(response){
    let markers = L.markerClusterGroup();

    for (let i=0; i<response.length;i++){
        let location = response[i];

        if (location) {
            markers.addLayer(L.marker([location.latitude,location.longitude]).bindPopup(response[i].name));
        }
    }

    map2.addLayer(markers);

});


///// CREATING bar chart-- jc. Ignore below but keep for now.


// let graphUrl = "http://127.0.0.1:5000/api/v1.0/bar_graph"

// const aggregateArray = arr => {
//   return arr.reduce((acc, val) => {
//      const index = acc.findIndex(obj => obj.county === val.county);
//      if(index !== -1){
//         acc[index].price += val.price;
//         acc[index].count++;
//      }else{
//         acc.push({
//            county: val.county,
//            price: val.price,
//            count: 1
//         });
//      };
//      return acc;
//   }, []).map(obj => {
//      obj.avg = obj.price / obj.count;
//      return obj;
//   });
// };

// d3.json(graphUrl).then(function(data){
//   console.log(data);

//   const aggregatedData = aggregateArray(data);
//   console.log(aggregatedData);

//   aggregatedData.forEach(obj => {
//     console.log(`${obj.county}: ${obj.avg}`);
//   });
// });


let graphUrl = "http://127.0.0.1:5000/api/v1.0/bar_graph"


d3.json(graphUrl).then(function(data){
  console.log(data);

  var clean_rating = data.map(d => d.avg_cleanliness_score);
  var overall_rating = data.map(d => d.avg_review_score);
  var county_names = data.map(d => d.county);
  var price = data.map(d => d.avg_price)

  let trace1 = {
    x: county_names,
    y: clean_rating,
    name: 'cleanliness rating',
    type: 'bar'
  };
  
  let trace2 = {
    x: county_names,
    y: overall_rating,
    name: 'overall rating',
    type: 'bar'
  };
  
  var data = [trace1, trace2];


  var layout = {
    title: 'Rating Comparison by County',
    xaxis: { title: 'County' },
    yaxis: { title: 'Rating' }
  };
  
  
  Plotly.newPlot('chart1', data, layout);


  let trace3 = {
    x: county_names,
    y: price,
    name: 'price scatter plot',
    type: 'scatter'
  };

  var layout2 = {
    title: 'Average Price by County',
    xaxis: { title: 'County' },
    yaxis: { title: 'Price' }
  };


  Plotly.newPlot('chart2', [trace3], layout2);
});



  



///// CREATING DROP DOWN MENU /////
// function init(){
//     // D3 to select dropdown menu
//     let dropMenu = d3.select("#selDataset");

//     // Retreiving json data and logging it
//     d3.json(graphUrl).then((data)=>{

//         // data array for counties
//         let counties = data.counties;

//         console.log(counties)

//         counties.forEach(function(county){
//             dropMenu.append("option").text(county).property("value",county);
//         });

//         let county = counties[0]
//     });
// }

// select the dropdown menu
let dropMenu = d3.select("#selDataset");
    // Retreiving json data and logging it
    d3.json(graphUrl).then((data)=>{
        console.log(data)
        // data array for counties
        let counties = [];
        // populate array with values from query
        for (let i = 0; i < data.length; i++) {
          let county = data[i].county
          counties.push(county);
        };
        counties.forEach((place) => {
            dropMenu.append("option").text(place).property("value",place);
        });
       let place = counties[0];
       barGraph(place)
  

  function updateChart(selectedCounty) {
    var filteredData = data.filter(function(d) {
      return d.county === selectedCounty;
    });

    var clean_rating = filteredData.map(d => d.avg_cleanliness_score);
    var overall_rating = filteredData.map(d => d.avg_review_score);

    var trace1 = {
      x: [selectedCounty],
      y: clean_rating,
      name: 'cleanliness rating',
      type: 'bar'
    };

    var trace2 = {
      x: [selectedCounty],
      y: overall_rating,
      name: 'overall rating',
      type: 'bar'
    };

    var updatedData = [trace1, trace2];

  Plotly.update('chart1', updatedData);
}

})

Infinity()

// // Retreiving json data and logging it
// d3.json(graphUrl).then((response)=>{

//     // create empty array
//     let counties = []

//     // populate array with values from query
//     for (let i = 0; i < response.length; i++) {

//         let county = response[i].county
        
//         counties.push(county);
    
//         };
        
//     // creating new array to filter out duplicates
//     let countiesFinal = counties.filter((value, index, array) => array.indexOf(value) === index);


//     // append dropdown menu with values from the array.
//     for (let i = 0; i < countiesFinal.length; i++) {
        
//         let test = countiesFinal[i]
//         dropMenu.append("option").text(test).property("value",test);

//     };
//   //bargraph(test)
// })

///// CREATING histogram GRAPH /////

