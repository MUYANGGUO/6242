
const Neighborhoods =
  'https://raw.githubusercontent.com/muyangguo/6242/master/Zillow-DataClean/zillow-neighborhoods.geojson';

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
mapboxgl.accessToken = 'pk.eyJ1IjoibXV5YW5nZ3VvIiwiYSI6ImNrMnA0b3VrNTAwamgzZW55YTUwZHY4MngifQ.3--4_yqwizMxOLnxtu0QSQ';

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
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 11,
    bearing: 0,
    pitch: 30,
};



//const deckgl = new deck.DeckGL
const deckgl = new deck.DeckGL({
  container: 'container',
  map:mapboxgl,
  // // Set your Mapbox access token here
  // //Extremely Important, Create your Mapbox account, and use the API KEY generated. Fees will occur if exceeding the free tier limits
  // //////////////////////////////////////////
  mapboxApiAccessToken: mapboxgl.accessToken,
  // //////////////////////////////////////////

  // //I have set the layer correctly with the geo info for SF, so in testing, no need to use MAPBOX to show the underlying map
//   latitude: 37.7749,
//   longitude: -122.4194,
//   zoom: 11,
//   bearing: 0,
//   pitch: 30,
  initialViewState: INITIAL_VIEW_STATE,
  layers: [
    new deck.GeoJsonLayer({
      id: 'Neighborhoods',
      data: Neighborhoods,
      // Styles
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
    new deck.ScatterplotLayer({
      data: [
        {position: [-122.402, 37.79], color: [250, 0, 0], radius: 1000}
      ],
      getPosition: d => d.position,
      getRadius: d => d.radius,
      getFillColor: d => d.color,
      opacity: 0.3
    }),
    new deck.TextLayer({
      data: [
        {position: [-122.402, 37.79], text: 'testing'}
      ],
      getPosition: d => d.position,
      getText: d => d.text,
      getSize: 28,
      getAngle: 0,
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'bottom'
    }),

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

  ]
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

