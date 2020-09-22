// Creating map object
var myMap = L.map("map-id", {
  center: [37.54, -77.45],
  zoom: 10
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var link = "https://opendata.arcgis.com/datasets/3c27cb8526a14b4fa9dd96e928b797a9_0.geojson";

// Function that will determine the color of a neighborhood based on the borough it belongs to


var url = "https://data.richmondgov.com/resource/vm9j-9f88.json";

d3.json(url, function (response) {

  var heatArray = [];

  for (var i = 0; i < response.length; i++) {
    var location_1 = response[i].location_1;

    var value = response[i].total_value;

    if (location_1) {
      heatArray.push([location_1.latitude, location_1.longitude, value]);
    }
  }

  var heat = L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  }).addTo(myMap);

});


function createParks(){
// Grabbing our GeoJSON data..
d3.json(link, function (data) {
  // Creating a geoJSON layer with the retrieved data
  var parks = L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function (feature) {
      return {
        color: "green",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: 'green',
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function (feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function (event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.ParkName + "</h1> <hr> <h2>" + "Park Size: " + feature.properties.Shape__Area + " ftsq" + "</h2>");

    }
  }).addTo(myMap)
  // createMap(parks);
  // console.log(parks)
});
}




// function createEMS() {
//   d3.csv('/static/js/emergency.csv', function (d) {
//     emergencies = omnivore.csv('static/js/emergency.csv')
//       .bindPopup("<h3>" + d.Name + "<h3><h3>Type: " + d.Type + "</h3>")
//       .addTo(myMap);
//     console.log(d.Name)
//     console.log(d)

//   });
// }

var eMap = 'https://althea1900.github.io/project-2/static/js/csvjson.json'
function createEMS() {
  function createMarkers(response) {
    // Pull the "stations" property off of response.data
    var stations = response.places;

    // Initialize an array to hold bike markers
    var bikeMarkers = [];
  
    // Loop through the stations array
    for (var index = 0; index < stations.length; index++) {
      var station = stations[index];
  
      // For each station, create a marker and bind a popup with the station's name
      var bikeMarker = L.marker([station.Latitude, station.Longitude])
        .bindPopup("<h3>" + station.Name + "<h3><h3>Type: " + station.Type + "</h3>").addTo(myMap);
        // Add the marker to the bikeMarkers array
      bikeMarkers.push(bikeMarker);
      console.log(station.Name)
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
  }
  
  d3.json(eMap, createMarkers)

}


function refreshPage(){
  window.location.reload(true)
}

var button1 = d3.select("#pksBtn");
var form = d3.select("#container")
button1.on("click", createParks);
form.on("submit",createParks);

var button2 = d3.select("#emsBtn");
var form = d3.select("#container")
button2.on("click", createEMS);
form.on("submit", createEMS);

