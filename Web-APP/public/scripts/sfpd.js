var sfpdyelp_controller_layer =[];
// const buildings = "https://data.sfgov.org/resource/ynuv-fyni.json?";
const layerVisibility = {safetylayer: true, poilayer: true};
function push_sfpd_layer(user_lat,user_long){
    var sfpdlayer = [];
    var lat = JSON.stringify(user_lat);
    var long = JSON.stringify(user_long);
    $.ajax({
        url: "https://data.sfgov.org/resource/wg3w-h783.json?",
        type: "GET",
        data: {
        "incident_year" : 2019,
        "$where" : "within_circle(point,"+ lat +","+long+", 2000)",
        "$limit" : 5000,

        "$$app_token" : "m7cdlDr9n2gVd9FLts0mBiDyC"
        }
    }).done(function(data) {
    console.log('pushing sfpd data')
    sfpdlayer.push(
        new deck.HexagonLayer({
            data: data,
            pickable: true,
            autoHighlight: true,
            extruded: true,
            radius: 200,
            elevationScale: 0.75,
            opacity:0.3,
            visible: layerVisibility.safetylayer,
            getPosition: d => d.point.coordinates,
            onHover: info => sfpdTooltip(info.object, info.x, info.y)

          }),
        )
        console.log(update_layer);
        sfpdyelp_controller_layer=sfpdlayer;
        // var newlayer = sfpdlayer.concat(base_layer).concat(update_layer);
        // console.log(newlayer);
        // deckgl.setProps({layers: newlayer});

    });
};

function sfpdTooltip(object, x, y) {
    const el = document.getElementById('tooltip');

    if (object) {

  
    var count_categroy = count_incident_category(object.points);

    // console.log(count_categroy);
    var count_category_sorted = Object.keys(count_categroy).sort(function(a,b){return count_categroy[b]-count_categroy[a]});

      el.innerHTML =  
      
        '<pre style="color:gray;font-size: 18px;">'+
      'Total Incidents :'+object.colorValue+ '</pre>'+'<pre style="color:gray;font-size: 12px;">Top 5 Incidents :'+ '</pre>'

   ;
      
     for (var i = 0; i < count_category_sorted.slice(0,5).length; i++) {
        el.innerHTML +=  
      
        count_category_sorted[i]+' :'+count_categroy[count_category_sorted[i]]+ '<br />'


     }
    //   color value is the count in this area
      el.style.display = 'block';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    } else {
      el.style.display = 'none';
    }
  };

  function count_incident_category(input) {
    var arr = input, obj = {};
    for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i].incident_category]) {
        obj[arr[i].incident_category] = 1;
      } else if (obj[arr[i].incident_category]) {
        obj[arr[i].incident_category] += 1;
      }
    }
    return obj;
  };


function show_sfpd_layer(){
    push_sfpd_layer(global_lat,global_long);
    var sfpd= sfpdyelp_controller_layer.concat(update_layer).concat(base_layer);
    console.log(sfpd);
    deckgl.setProps({layers: sfpd});   
};


function reset_picker_layers(){
        // reset_layers();
        // // push_user_location();
        var stats_layer = update_layer.concat(base_layer);
        deckgl.setProps({layers: stats_layer});  

        // render a empty push matched layers here(rerender); does not need to reset, reset is to show the matched users layer only
};
    




