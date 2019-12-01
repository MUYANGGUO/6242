
var match_layer = [];
var count = 0;
const trial_data ='https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-stations.json';
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
        var matchedresults = db.collection("matchedresults").doc(useruid);
        matchedresults.set({});
        for (matchId of matched){
          docRef = db.collection("users").doc(matchId)
          docRef.get().then(function(doc) {
          if (doc.exists) {
              // document.getElementById("match-button").removeAttribute('hidden');
            //   console.log('pushing match location')





              var data = doc.data();

              count = count +1;

              
              matchedresults.update({
                datacollection: firebase.firestore.FieldValue.arrayUnion(data)
            });
            
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
        
  
    })
  
      db.collection("users").doc(useruid).update({
        matchedRegions: matchedRegions
      }) 

      push_match_data()
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

function push_match_data(){
    var user = firebase.auth().currentUser;
    var useruid;
    if (user != null) {
      useruid = user.uid  // The user's ID, unique to the Firebase project.
    }
    var docRef = db.collection("matchedresults").doc(useruid);
    docRef.get().then(function(doc) {
      if (doc.exists) {
          // document.getElementById("match-button").removeAttribute('hidden');
          console.log('fetching matched results')
          var data = doc.data();
          var data_final = data.datacollection;

          match_layer.push(     
            new deck.IconLayer({
              id: 'match-layer'+JSON.stringify(count),
              // data: icons,
              data: data_final,
              pickable: true,
              autoHighlight: true,
            // iconAtlas and iconMapping are required
            // getIcon: return a string
              iconAtlas: 'images/icon_position.png',
              
              iconMapping: POSITION_ICON_MAPPING,
              getIcon: d => 'marker',
              sizeMinPixels: 80,
              sizeScale: 1,
              getPosition: d => [d.coordinates.longtitude,d.coordinates.latitude],
              getSize: d => 80,
            //   getColor: [65,105,225],
            getColor: function(d){
                if (d.type == "landlord")
                return [105,0,0];
                else if(d.type == "tenant")
                return [0,105,0];
                else 
                return [0,0,0];

            },
              // onHover: ({object, x, y}) => {
              // const tooltip = `${object.name}\n${object.address}`;

            //   onClick: (event) => {
            //     icon_event_matched(data_final);
            //     // console.log(data_final);
            //     // console.log(data.id);
            //   },

              onClick: function(d){
                  var userinfo = d.object;
                  console.log(userinfo)
                  var user_lat = userinfo.coordinates.latitude;
                  var user_long = userinfo.coordinates.longtitude;
                  global_lat = user_lat;
                  global_long= user_long;
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
                    html: "User id: "+ userinfo.id+"<br>Email: "+userinfo.email+"<br>Gender: "+userinfo.gender+"<br>Role: "+userinfo.type,
                    //"the userid: "+d.id,
                
                    confirmButtonText: "View Location Stats",
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

                    }
                  })
                  
                },

            }),
            )
            var matched_finalized_layer = match_layer.concat(update_layer).concat(base_layer);
            update_layer.push(match_layer);

            deckgl.setProps({layers:matched_finalized_layer});
  
          

      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
    // console.log(match_layer)
    // deckgl.setProps({layers:match_layer})
}

function icon_event_matched(d){
    console.log(d)
    // console.log(update_layer);
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
  
  