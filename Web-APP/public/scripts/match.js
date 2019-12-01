var match_layer_flag = false;
var match_data_global =[];
var match_data_obj = {datakey:[],color:[65,105,225]};
const trial_data ='https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-stations.json';
function match(){
var match_layer = [];
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
      if (user != null) {
        useruid = user.uid  // The user's ID, unique to the Firebase project.
      }
      
    db.collection("users").doc(useruid).get().then(async function(doc){
        var data=doc.data()
        var usertype=data['type']  
        var matched=new Set()
        matched.add(useruid)   
        for (matchedRegion of matchedRegions){
          var temp=await get_match_user(matchedRegion);
          temp.forEach(matched.add,matched)
          db.collection('regions').doc(matchedRegion).collection('users').doc(useruid).set(
            {
              uid: useruid,
              type: usertype,
              flag:1
            }
          )  
        }
        matched.delete(useruid)
        console.log(matched)
        var match_data=[];
        var match_data_obj = {datakey:[],color:[65,105,225]};
        for (matchId of matched){
          docRef = db.collection("users").doc(matchId)
          docRef.get().then(async function(doc) {
          if (doc.exists) {
              // document.getElementById("match-button").removeAttribute('hidden');
            //   console.log('pushing match location')
              var data = doc.data();
              await match_data_obj.datakey.push(data);
            //   console.log(data)
            //   var userinfo = [data["id"]];
            //   var coords = [data["coordinates"]["longtitude"],data["coordinates"]["latitude"]];
            //   match_data.push({"position": coords, "color": [65,105,225],"id":userinfo});
          } else {
            console.log("No such document!");
         }}).catch(function(error) {
          console.log("Error getting document:", error);
          });
        }
        // console.log(match_data)
        // match_data_global = match_data;
        // console.log(match_data["position"])
        // var match_data_obj = {datakey:match_data};


        // console.log(check.coordinates)
        match_layer.push(     
        new deck.IconLayer({
          id: 'match-layer',
          // data: icons,
          data: check,
          pickable: true,
          autoHighlight: true,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
          iconAtlas: 'images/icon-atlas.png',
          iconMapping: ICON_MAPPING,
          getIcon: d => 'marker',
          sizeMinPixels: 100,
          sizeScale: 20,
          getPosition: d => [d.coordinates.longtitude,d.coordinates.latitude],
          getSize: d => 10,
          getColor: [65,105,225],
          // onHover: ({object, x, y}) => {
          // const tooltip = `${object.name}\n${object.address}`;
          onClick: (event) => {
            icon_event(data);
            // console.log(data.id);
          },
          
        }),
        )
        if (match_layer_flag != true){
          
          //var new_layer = match_layer.concat(base_layer).concat(update_layer);
          //update_layer = update_layer.concat(match_layer);
          //deckgl.setProps({layers: new_layer});
          deckgl.setProps({layers:match_layer});
          match_layer_flag = true;
        //   console.log(match_layer);
        //   console.log(match_data);
        //   console.log("check");
        }    
    })
    var check = match_data_obj.datakey;
    console.log(check.length);
      db.collection("users").doc(useruid).update({
        matchedRegions: matchedRegions
      }) 
    })
  })
  function get_match_user(matchedRegion){
    var matchedUid=new Set()
    db.collection('regions').doc(matchedRegion).collection('users').get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        var matchedData=doc.data()
        matchedUid.add(matchedData['uid'])
      })
    })
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(matchedUid);
      }, 1000);
    });
  }
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