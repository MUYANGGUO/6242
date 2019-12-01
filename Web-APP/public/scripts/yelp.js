

var yelp_controller_layer= [];



function startyelpfinding(interesteditem,user_lat,user_long) {
var yelp_layer = [];
var lat = JSON.stringify(user_lat);
var long = JSON.stringify(user_long);
// var lat = JSON.stringify(37.786882);
// var long = JSON.stringify(-122.399972);
// var interesteditem = JSON.stringify("print center");
// var interesteditem = JSON.stringify(interest);
var limitnumofresults = JSON.stringify(20);
console.log(status);

  

  $(function (){
    $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?radius=2000&latitude="+ lat + "&longitude="+ long +"&sort_by=rating&term="+ interesteditem +"&limit="+ limitnumofresults,
      type: "GET",
      beforeSend: function(request) {
        request.setRequestHeader("Authorization", "Bearer Dk_NngRSHCj1zE1iQ_dgZLTADj7cn3_2JW4dKKFaOmPt9Eqd4feBLXN3Er7xu5TXeSOZjc5VVxFDmYKFLy_QGlm_95vOp5REw33EwoYvMu6MYrre-bPaCH8XhFvcXXYx");

      },

      success: function(data){
        // console.log('success',data);
        // console.log('success',data.businesses[0].coordinates.longitude);

        var data_parsed = data["businesses"];

        console.log(data_parsed)

        yelp_layer.push(
           new deck.IconLayer({
            data: data_parsed,
            pickable: true,
            autoHighlight: true,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
            iconAtlas: 'images/icon-atlas.png',
            iconMapping: ICON_MAPPING,
            getIcon: d => 'marker',
          
            sizeScale: 2,
            sizeMinPixels: 100,
            getSize: d => 50,
            // getColor:[255,255,0],
            getColor: d => [1+(d.rating/5)*249, 50, 0],
            getPosition: d=>[d.coordinates.longitude,d.coordinates.latitude],
            onHover: info => yelpTooltip(info.object, info.x, info.y),
            

          }),
        
        
        )
        var yelp_layer_finalized = yelp_layer.concat(update_layer).concat(base_layer);
        deckgl.setProps({layers: yelp_layer_finalized});
      },
    })





  });








};



function show_yelp_layer(){

Swal.mixin({
  input: 'text',
  confirmButtonText: 'Look Up &rarr;',
  showCancelButton: true,
  // progressSteps: ['1'],
  background: `rgb(0,0,0)`,
}).queue([
  {
    title: 'Which points of interest do you want to find?',
  },
]).then((result) => {
  if (result.value) {
    const user_typed_interest = JSON.stringify(result.value)
    startyelpfinding(user_typed_interest,global_lat, global_long);
  }
})




};

 




function yelpTooltip(object, x, y) {
  // console.log(object)
  const el = document.getElementById('tooltip');

  if (object) {


    el.innerHTML =  
    '<img src='+object.image_url+' width="100" height="100">'+'<img src=images/icon_yelp.png width="100" height="100" align="right">'+
      '<pre style="color:white;font-size: 18px;">'+
    'Place Name : '+object.name+ '</pre>'+'<pre style="color:white;font-size: 16px;">Cateogry : '+ object.categories[0].title+'</pre>'
    +'<pre style="color:white;font-size: 16px;">Rating : '+ object.rating+' ;  Review Count : '+ object.review_count +'</pre>' +'<pre style="color:orange;font-size: 16px;">Price : '+ object.price+'</pre>'
    +'<pre style="color:white;font-size: 16px;">Location : '+ object.location.display_address+'</pre>'
 ;
    

  //   color value is the count in this area
    el.style.display = 'block';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  } else {
    el.style.display = 'none';
  }
};

