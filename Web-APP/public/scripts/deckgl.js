

const Neighborhoods =
  'https://raw.githubusercontent.com/muyangguo/6242/master/Zillow-DataClean/zillow-neighborhoods.geojson';

const icons = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-stations.json';

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 256, mask: true,anchorY:200}
  };
// console.log(Neighborhoods.length);
// import React from 'React';
// const MAPBOX_TOKEN = `${process.env.REACT_APP_MAPBOX_API_KEY}`
// console.log(MAPBOX_TOKEN);


// var rawbase = 'https://raw.githubusercontent.com/';
// var jsonloc = 'muyangguo/6242/master/Zillow-DataClean/zillow-neighborhoods.geojson';

// $.getJSON(rawbase + jsonloc, function( data ) {
//    console.log(data);
//   //do what you want with data
// });

// const heatdata =
//   'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/sf-bike-parking.json';
const mapboxgl_accessToken = 'pk.eyJ1IjoibXV5YW5nZ3VvIiwiYSI6ImNrMnA0b3VrNTAwamgzZW55YTUwZHY4MngifQ.3--4_yqwizMxOLnxtu0QSQ';
//pk.eyJ1IjoibXV5YW5nZ3VvIiwiYSI6ImNrMnA0b3VrNTAwamgzZW55YTUwZHY4MngifQ.3--4_yqwizMxOLnxtu0QSQ
// var map = new mapboxgl.Map({
// container: 'container',
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [-122.4194, 37.7749],
// zoom: 11
// });
 
// map.addControl(new MapboxGeocoder({
// accessToken: mapboxgl.accessToken,
// mapboxgl: deckgl
// }));
const INITIAL_VIEW_STATE = {
    latitude: 37.7549,
    longitude: -122.4194,
    zoom: 12,
    bearing: 0,
    pitch: 60,
};


const base_layer = [
  new deck.GeoJsonLayer({
    id: 'Neighborhoods',
    data: Neighborhoods,
    filled: true,
    pointRadiusMinPixels: 2,
    opacity: 1,
    pointRadiusScale: 200,
    getLineWidth: 20,
    getLineColor: [128,128,128,200],
    getElevation: 30,
    getRadius: f => (11 - f.properties.scalerank),
    getFillColor: [169, 169, 169, 180],
    // Interactive props

    //This is the props when you click on a region
    pickable: true,
    autoHighlight: true,
    onClick: info => info.object && alert(`${info.object.properties.name} (${info.object.properties.city})`)
  }),



  //create scatter plot layer for proping the SFPD fetched data
  // new deck.ScatterplotLayer({
  //   data: [
  //     {position: [-122.402, 37.79], color: [250, 0, 0], radius: 1000}
  //   ],
  //   getPosition: d => d.position,
  //   getRadius: d => d.radius,
  //   getFillColor: d => d.color,
    
  //   opacity: 0.3
  // }),
  // new deck.TextLayer({
  //   data: [
  //     {position: [-122.402, 37.79], text: 'testing'}
  //   ],
  //   getPosition: d => d.position,
  //   getText: d => d.text,
  //   getSize: 28,
  //   getAngle: 0,
  //   getTextAnchor: 'middle',
  //   getAlignmentBaseline: 'bottom'
  // }),

  // new deck.IconLayer({
  //   id: 'icon-layer',
  //   data: icons,
  //   pickable: true,
  // // iconAtlas and iconMapping are required
  // // getIcon: return a string
  //   iconAtlas: 'images/icon-atlas.png',
  //   iconMapping: ICON_MAPPING,
  //   getIcon: d => 'marker',

  //   sizeScale: 15,
  //   getPosition: d => d.coordinates,
  //   getSize: d => 5,
  //   getColor: d => [Math.sqrt(d.exits), 140, 0],
  //   // onHover: ({object, x, y}) => {
  //   // const tooltip = `${object.name}\n${object.address}`;


  // }),
  // new deck.HeatmapLayer({
  //   id: 'heatmapLayer',
  //   data: heatdata,
  //   getPosition: d => d.COORDINATES,
  //   //-----// getWeight: d => d.WEIGHT    
  // })

  // new deck.IconLayer({
  //   id: 'icon-layer',
  //   data,
  // pickable: true,
  // // iconAtlas and iconMapping are required
  // // getIcon: return a string
  // iconAtlas: 'images/icon-atlas.png',
  // iconMapping: ICON_MAPPING,
  // getIcon: d => 'marker',

  // sizeScale: 15,
  // getPosition: d => d.coordinates,
  // getSize: d => 5,
  // getColor: d => [Math.sqrt(d.exits), 140, 0],
  // onHover: ({object, x, y}) => {
  //   const tooltip = `${object.name}\n${object.address}`;
  //   /* Update tooltip
  //      http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
  //   */
  // }
  // })
];

//const deckgl = new deck.DeckGL
const deckgl = new deck.DeckGL({
  container: 'container',
  map:mapboxgl,
  // // Set your Mapbox access token here
  // //Extremely Important, Create your Mapbox account, and use the API KEY generated. Fees will occur if exceeding the free tier limits
  // //////////////////////////////////////////
  mapboxApiAccessToken: mapboxgl_accessToken,
  // //////////////////////////////////////////

  // //I have set the layer correctly with the geo info for SF, so in testing, no need to use MAPBOX to show the underlying map
//   latitude: 37.7749,
//   longitude: -122.4194,
//   zoom: 11,
//   bearing: 0,
//   pitch: 30,
  initialViewState: INITIAL_VIEW_STATE,
  layers: base_layer,
});






// // source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
// const AIR_PORTS =
//   'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

// const INITIAL_VIEW_STATE = {
//   latitude: 51.47,
//   longitude: 0.45,
//   zoom: 4,
//   bearing: 0,
//   pitch: 30
// };

// // Set your mapbox token here
// mapboxgl.accessToken = 'pk.eyJ1IjoibXV5YW5nZ3VvIiwiYSI6ImNrMnA0b3VrNTAwamgzZW55YTUwZHY4MngifQ.3--4_yqwizMxOLnxtu0QSQ'; // eslint-disable-line

// const map = new mapboxgl.Map({
//   container: 'container',
//   style: 'mapbox://styles/mapbox/light-v9',
//   // Note: deck.gl will be in charge of interaction and event handling
//   interactive: false,
//   center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
//   zoom: INITIAL_VIEW_STATE.zoom,
//   bearing: INITIAL_VIEW_STATE.bearing,
//   pitch: INITIAL_VIEW_STATE.pitch
// });

// const deck = new Deck({
//   canvas: 'deck-canvas',
//   width: '100%',
//   height: '100%',
//   initialViewState: INITIAL_VIEW_STATE,
//   controller: true,
//   onViewStateChange: ({viewState}) => {
//     map.jumpTo({
//       center: [viewState.longitude, viewState.latitude],
//       zoom: viewState.zoom,
//       bearing: viewState.bearing,
//       pitch: viewState.pitch
//     });
//   },
//   layers: [
//     new GeoJsonLayer({
//       id: 'airports',
//       data: AIR_PORTS,
//       // Styles
//       filled: true,
//       pointRadiusMinPixels: 2,
//       pointRadiusScale: 2000,
//       getRadius: f => 11 - f.properties.scalerank,
//       getFillColor: [200, 0, 80, 180],
//       // Interactive props
//       pickable: true,
//       autoHighlight: true,
//       onClick: info =>
//         // eslint-disable-next-line
//         info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
//     }),
//     new ArcLayer({
//       id: 'arcs',
//       data: AIR_PORTS,
//       dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
//       // Styles
//       getSourcePosition: f => [-0.4531566, 51.4709959], // London
//       getTargetPosition: f => f.geometry.coordinates,
//       getSourceColor: [0, 128, 200],
//       getTargetColor: [200, 0, 80],
//       getWidth: 1
//     })
//   ]
// });






//--------------------------------------------------------//
// utility functions//
var uber_layer_flag = false;
var my_location_layer_flag = false;

var update_layer = [];
function push_user_location(){
  const my_location_layer = [];
  var user = firebase.auth().currentUser;
  var useruid = user.uid;
  var docRef = db.collection("users").doc(useruid);
  docRef.get().then(function(doc) {
    if (doc.exists) {
        // document.getElementById("match-button").removeAttribute('hidden');
        console.log('pushing user location')
        var data = doc.data();
        var userinfo = [data["id"]];

        var coords = [data["coordinates"]["longtitude"],data["coordinates"]["latitude"]];
        my_location_layer.push(      
          new deck.ScatterplotLayer({
          data: [
            {position: coords, color: [65,105,225], radius: 150}
          ],
          getPosition: d => d.position,
          getRadius: d => d.radius,
          getFillColor: d => d.color,
          
          opacity: 0.3
        }),
      
        new deck.IconLayer({
          id: 'icon-layer',
          // data: icons,
          data: [
            {position: coords,color: [65,105,225],id:userinfo}

          ],
          pickable: true,
          autoHighlight: true,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
          iconAtlas: 'images/icon-atlas.png',
          iconMapping: ICON_MAPPING,
          getIcon: d => 'marker',
          
          sizeScale: 3,
          sizeMinPixels: 100,
          getPosition: d => d.position,
          getSize: d => 80,
          getColor: d => d.color,
          // onHover: ({object, x, y}) => {
          // const tooltip = `${object.name}\n${object.address}`;
          onClick: (event) => {
            icon_event(data);
            console.log(data.id);
          },

          
        }),

        )
        // var new_layer = my_location_layer.concat(base_layer).concat(update_layer);
        if (my_location_layer_flag != true){
          var new_layer = my_location_layer.concat(base_layer).concat(update_layer);
          update_layer = my_location_layer;
        console.log(update_layer)
        deckgl.setProps({layers: new_layer});
        my_location_layer_flag = true;
        }
        // update_layer = my_location_layer;
        // console.log(update_layer)
        // deckgl.setProps({layers: new_layer});
        // return true;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

  // console.log(useruid)
  
  // console.log(my_location_layer)
  
};


const uber_data = 'https://raw.githubusercontent.com/MUYANGGUO/6242/master/Uber-DataClean/Uber_Speed_Data/uber_traffic_data.json'
function push_uber_data(){

const uber_layer = [];

uber_layer.push(
  new deck.LineLayer({
    id: 'line-layer',
    data: uber_data,
    pickable: true,

    getWidth: 4,
    getSourcePosition: d => d.start,
    getTargetPosition: d => d.end,
    getColor:function(d){
      // var percent=100*d.speed/65
      // var red=(percent>50?1-2*(percent-50)/100.0:1.0)*255
      // var green=(percent>50?1.0:2*percent/100.0)*255
      // return[red*1.1,green,0]
      // console.log(color(d.speed))

      // return color(d.speed)
      if(d.speed>45)
      return  [0,255,0] ;   
      else if(d.speed>35)  
      return [75,255,0];
      else if(d.speed>30)  
      return  [125,255,0];
      else if(d.speed>25)  
      return  [255,255,0];
      else if(d.speed>20)  
      return [255,191,0];
      else if(d.speed>15)  
      return [255,125,0];
      else if(d.speed>10)
      return [255,45,0];
      else if(d.speed>5)
      return [255,0,0];
      else return [54.5,0,0];
      
        }  

       }    // onHover: ({object, x, y}) => {      // const tooltip = `${object.from.name} to ${object.to.name}`;      /* Update tooltip         http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object      */    // }    }),
))

//var new_layer = uber_layer.concat(base_layer).concat(update_layer);
if (uber_layer_flag != true){
  var new_layer = uber_layer.concat(base_layer).concat(update_layer);
  update_layer = update_layer.concat(uber_layer);
  deckgl.setProps({layers: new_layer});
  uber_layer_flag = true;
}

};






function mapbox_geocoding(location){
  //add mapboxgl.accessToken
  mapboxgl.accessToken = mapboxgl_accessToken;
  var request = new XMLHttpRequest()
  
  request.open('GET', 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+String(location)+'.json?access_token='+mapboxgl.accessToken+'&limit=3&types=address&autocomplete=true')
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      var user = firebase.auth().currentUser;
      var useruid;
      if (user != null) {
        useruid = user.uid;  // The user's ID, unique to the Firebase project.
      }
      var coordinates = data['features'][0]['geometry']['coordinates']
      var latitude = coordinates[1];
      var longtitude = coordinates[0];

      db.collection("users").doc(useruid).update({
          coordinates:{
            latitude:latitude,
            longtitude,longtitude,
          },
          })
          .then(function() {
          console.log("successfully updated user location lat/long to database!");
          update_user_region(longtitude,latitude)
          my_location_layer_flag = false;
          push_user_location();
          })
          .catch(function(error) {
        // The document probably doesn't exist.
          console.error("Error updating document: ", error);
          });
    } else {
      console.log('XML HTTP request error');
    }
  }

  request.send()


};

function reset_layers(){
update_layer = [];
uber_layer_flag = false;
my_location_layer_flag = false;
var reset_layers = base_layer;
deckgl.setProps({layers: reset_layers});
};





function match(){

  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    showConfirmButton: true,
    position: 'top',
    background: `rgb(0,0,0,0.9)`,
    // confirmButtonColor: `rgb(0,0,0)`,
    // cancelButtonColor:`rgb(0,250,0)`,
    progressSteps: ['1', '2', '3']
  }).queue([
    {
      text: 'Which type of apartment do you want to live in?',
      input: 'select',
      inputOptions: {
        'all_home':'All Home',
        'single_family':'Single Family',
        'condo':'Condo',
        'top_tier':'Top Tier',
        'middle_tier':'Middle Tier',
        'bottom_tier':'Bottom Tier',
        'studio':'Studio',
        'one_bedroom':'One Bedroom',
        'two_bedroom':'Two Bedroom',
        'three_bedroom':'Three Bedroom',
        'four_bedroom':'Four Bedroom'
      } 
    },
    {
      text: "What's the maximum monthly rental",
      input: 'number'
    },
    {
      text: "What's the minimum monthly rental",
      input: 'number'
    }
  ]).then((result) => {
    if (result.value) {
      const answers = JSON.stringify(result.value)
      Swal.fire({
        title: 'All done!',
        html: `
          Your answers:
          <pre><code>${answers}</code></pre>
        `,
        position: 'top',
        background: `rgb(0,0,0,9)`,
        confirmButtonColor: `rgb(0,0,0)`,
        confirmButtonText: 'Finish!'
      })
    }
    var rawbase = 'https://raw.githubusercontent.com/';
    var jsonloc = 'muyangguo/6242/master/Zillow-DataClean/zillowDataCleanedv2.geojson';
    $.getJSON(rawbase + jsonloc, function( data ) {
      var regions=data['features']
      var matchedRegions=[]
      for (region of regions){
        var regionId=region["properties"]["regionid"]
        var regionPrice=region['properties'][result.value[0]] 
        if (regionPrice!=null && regionPrice<=result.value[1] && regionPrice>=result.value[2]){
          matchedRegions.push(regionId)
        }
      }
      var user = firebase.auth().currentUser;
      var useruid;
      var usertype;
      if (user != null) {
        useruid = user.uid  // The user's ID, unique to the Firebase project.
      }
      db.collection("users").doc(useruid).get().then(function(doc){
        var data=doc.data()
        console.log(doc.data())
        usertype=data['type']
        console.log(usertype)
        for (matchedRegion of matchedRegions){
          db.collection('regions').doc(matchedRegion).collection('users').doc(useruid).set(
            {
              uid: useruid,
              type: usertype,
              flag:1
            }
          )
        }
      })
      db.collection("users").doc(useruid).update({
        matchedRegions: matchedRegions
      }) 
    });
    
  })
  // var user = firebase.auth().currentUser;
  // var useruid = user.uid;
  // var UserRef = db.collection("users").doc(useruid);
  // UserRef.get().then(function(doc) {
  //   if (doc.exists) {

      





  //   }
  //   else {
  
  //   console.log("No such document!");
  // }
  //   }).catch(function(error) {
  //   console.log("Error getting document:", error);
  // });

};

function click_user(){
  Swal.fire({
    position: 'top',
    icon:'success',
    background: `rgb(0,0,0,9)`,
    text:"success",
    confirmButtonColor: `rgb(0,0,0)`,
  })
};


var global_lat;
var global_long;
function icon_event(d){
  console.log(update_layer);
  var user_lat = d.coordinates.latitude;
  var user_long = d.coordinates.longtitude;
  global_lat = user_lat;
  global_long= user_long;
  console.log(d);
  // push_sfpd_layer(user_lat,user_long);
  Swal.fire({
    position: 'middle',
    imageUrl: d.photoURL,
    imageWidth: 300,
    imageHeight: 300,
    // icon:'success',
    showCloseButton: true,
    showCancelButton: true,
    background: `rgb(0,0,0)`,
    title: d.name,
    html: "User id: "+ d.id+"<br>Email: "+d.email+"<br>Gender: "+d.gender+"<br>Role: "+d.type,
    //"the userid: "+d.id,

    confirmButtonText: "View Stats",
    cancelButtonText: "Messages",
  }).then((result) => {
    if (result.value) {
      openNav_picker();
      push_sfpd_layer(user_lat,user_long);
    // push_sfpd_layer(user_lat,user_long);
    }
    else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire(
        'communcation starting',
        'success'
      )

      






        // push_sfpd_layer(user_lat,user_long);
    }
  })
  
};

