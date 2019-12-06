
var match_layer = [];
var count = 0;
var newpoly=[]
//const trial_data ='https://raw.githubusercontent.com/uber-common/deck.gl-data/master/website/bart-stations.json';
async function match(){

  var checkresult = await clear_previous_matched_logs();

  console.log(checkresult)
  match_layer = [];
  newpoly=[]

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
        confirmButtonText: 'Click Side Bar to Show Your Match'
      })
      // document.getElementById("match_button").setAttribute('hidden', 'true');
      document.getElementById("show_match_button").removeAttribute('hidden');
    }
    var rawbase = 'https://raw.githubusercontent.com/';
    var jsonloc = 'muyangguo/6242/master/Zillow-DataClean/zillowDataCleanedv2.geojson';
    $.getJSON(rawbase + jsonloc, async function( data ) {
      var regions=data['features']
      var matchedRegions=[]
      var matchedpoly={}
      var host=await check_host(result)
      matchedRegions=matchedRegions.concat(host)
      for (region of regions){
        var regionId=region["properties"]["regionid"]
        var regionPrice=region['properties'][result.value[0]]
        if (regionPrice!=null && regionPrice<=result.value[1] && regionPrice>=result.value[2]){
          matchedRegions.push(regionId)
        }
        matchedpoly[regionId]=region["geometry"]["coordinates"]
      }
      var temppoly=[]
      for (matchedRegion of matchedRegions.slice(0,5)){
        temppoly.push(matchedpoly[matchedRegion])
      }
      console.log(temppoly)
      for(poly of temppoly){
        var temp={"contour":poly}
        newpoly.push(temp)
      }
      console.log(newpoly)
      console.log(matchedRegions.slice(0,5))
      var user = firebase.auth().currentUser;
      var useruid;
      if (user != null) {
        useruid = user.uid
        // The user's ID, unique to the Firebase project.
      }

    db.collection("users").doc(useruid).get().then(async function(doc){
        var data=doc.data()
        var usertype=data['type']
        if (usertype=='landlord'){
           matchedRegions=[]
           matchedRegions.push(data['region'])
           db.collection('users').doc(useruid).update({
             house:result.value[0],
             upper:result.value[1],
             lower:result.value[2],
             matchedRegions:matchedRegions
           })
        }else{
          db.collection("users").doc(useruid).update({
            matchedRegions: matchedRegions.slice(0,5),
          })
        }
        console.log(matchedRegions)
        var matched=new Set()
        matched.add(useruid)
        for (matchedRegion of matchedRegions.slice(0,5)){
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
       /////// async here
        var matchedresults = db.collection("matchedresults").doc(useruid);



      /////// async here
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

      // db.collection("users").doc(useruid).update({
      //   matchedRegions: matchedRegions.slice(0,5),
      // })


    })

  })



  function get_match_user(matchedRegion){
    var matchedUid=new Set()
    db.collection('regions').doc(matchedRegion).collection('users').get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        var matchedData=doc.data()
        var flag=matchedData['flag']
        if (flag!=null){
          matchedUid.add(matchedData['uid'])
        }
      })
    })
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(matchedUid);
      }, 1000);
    });
  };


  return new Promise(resolve => {
    setTimeout(() => {
      resolve('clean and pushed data to matched results');
    }, 1000);
  });

};
function check_host(result){
  var matchedHost=[]
  db.collection('users').get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      var hostdata=doc.data()
      if (hostdata['type']=='landlord' && hostdata['house']==result.value[0] && hostdata['upper']<=result.value[1] && hostdata['lower']>=result.value[2]){
        matchedHost.push(hostdata['region'])
      }
    })
  })
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(matchedHost);
    }, 1000);
  });
}

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
let timerInterval
Swal.fire({
  title: 'Fetching your match request ... ',
  html: 'Fetching your matched results in <b></b> milliseconds.',
  timer: 5500,
  timerProgressBar: true,
  onBeforeOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      Swal.getContent().querySelector('b')
        .textContent = Swal.getTimerLeft()
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.timer
  ) {
    // console.log('I was closed by the timer') // eslint-disable-line

    var user = firebase.auth().currentUser;
    var useruid;
    if (user != null) {
      useruid = user.uid  // The user's ID, unique to the Firebase project.
      // var test = await clear_previous_matched_logs();
      // console.log(test)
    }
    var docRef = db.collection("matchedresults").doc(useruid);
    docRef.get().then(async function(doc) {

      if (doc.exists) {

          // document.getElementById("match-button").removeAttribute('hidden');
          console.log('fetching matched results')
          var data = doc.data();
          var data_final = data.datacollection;
          var handlepoly=newpoly;

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
                    imageUrl: userinfo.photoURL,
                    imageWidth: 300,
                    imageHeight: 300,
                    // icon:'success',
                    showCloseButton: true,
                    showCancelButton: true,
                    background: `rgb(0,0,0)`,
                    title: d.name,
                    html: "User id: "+ userinfo.id+"<br>Email: "+userinfo.email+"<br>Gender: "+userinfo.gender+"<br>Role: "+userinfo.type,
                    //"the userid: "+d.id,
                    allowOutsideClick:false,
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

                      openMessage(userinfo.id, userinfo.name, userinfo.photoURL);


                    }
                  })

                },

            }),

//
            new deck.IconLayer({
              id: 'icon-layer-image-matched'+JSON.stringify(count),
              // data: icons,
              data: data_final,
              pickable: true,
              autoHighlight: true,
            // iconAtlas and iconMapping are required
            // getIcon: return a string
              // iconAtlas: 'images/icon-atlas.png',
              // iconMapping: ICON_MAPPING,
              // getIcon: d => 'marker',
              getIcon: d => ({

                url: d.photoURL,
                width: 128,
                height: 128,
                anchorY: 220,
                anchorX: -50,
              }),

              sizeScale: 1,
              sizeMinPixels: 80,
              getPosition: d => [d.coordinates.longtitude,d.coordinates.latitude],
              getSize: d => 40,
              // getColor: d => d.color,
              // onHover: ({object, x, y}) => {
              // const tooltip = `${object.name}\n${object.address}`;
              onClick: function(d){
                var userinfo = d.object;
                console.log(userinfo)
                var user_lat = userinfo.coordinates.latitude;
                var user_long = userinfo.coordinates.longtitude;
                global_lat = user_lat;
                global_long= user_long;
                Swal.fire({
                  position: 'middle',
                  imageUrl: userinfo.photoURL,
                  imageWidth: 300,
                  imageHeight: 300,
                  // icon:'success',
                  showCloseButton: true,
                  showCancelButton: true,
                  background: `rgb(0,0,0)`,
                  title: d.name,
                  html: "User id: "+ userinfo.id+"<br>Email: "+userinfo.email+"<br>Gender: "+userinfo.gender+"<br>Role: "+userinfo.type,
                  //"the userid: "+d.id,
                  allowOutsideClick:false,
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

                    openMessage(userinfo.id, userinfo.name, userinfo.photoURL);



                  }
                })

              },

          }),

//

new deck.PolygonLayer({
  id: 'polygon-layer'+JSON.stringify(count),
  data: handlepoly,
  pickable: true,
  stroked: true,
  filled: true,
  extruded: true,
  wireframe: true,
  lineWidthMinPixels: 10,
  getPolygon: data=>data.contour,
  getElevation: 100,
  getFillColor: [255,215,0],
  getLineColor: [255, 215, 0],
  getLineWidth: 20,
  opacity: 0.8,
  autoHighlight:true,
  onClick:function(d){

    var userinfo = d.object;
    console.log(userinfo)
    var contour = userinfo.contour;
    console.log(contour)
    center = getcenter(contour[0]);
    console.log(center)
    var user_lat = center[1];
    var user_long = center[0];
    global_lat = user_lat;
    global_long= user_long;
    Swal.fire({
      position: 'middle',
      // imageUrl: userinfo.photoURL,
      // imageWidth: 300,
      // imageHeight: 300,
      // icon:'success',
      showCloseButton: true,
      showCancelButton: true,
      background: `rgb(0,0,0)`,
      // title: d.name,
      // html: "User id: "+ userinfo.id+"<br>Email: "+userinfo.email+"<br>Gender: "+userinfo.gender+"<br>Role: "+userinfo.type,
      //"the userid: "+d.id,
      allowOutsideClick:false,
      confirmButtonText: "View Location Stats",
      cancelButtonText: "Cancel",
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
      //   openMessage(userinfo.id),
      //   othername = userinfo.name;
      //   otheruid = userinfo.id;

      //  otherphoto = userinfo.photoURL;

      }
    })


  },
}),






            )

            var matched_finalized_layer = match_layer.concat(update_layer).concat(base_layer);

            update_layer.push(match_layer);
            count = count +1;
            console.log(update_layer)
            deckgl.setProps({layers:matched_finalized_layer});



      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });









  }
})
//     // document.getElementById("show_match_button").setAttribute('hidden','true');
//     var user = firebase.auth().currentUser;
//     var useruid;
//     if (user != null) {
//       useruid = user.uid  // The user's ID, unique to the Firebase project.
//       // var test = await clear_previous_matched_logs();
//       // console.log(test)
//     }
//     var docRef = db.collection("matchedresults").doc(useruid);
//     docRef.get().then(async function(doc) {

//       if (doc.exists) {

//           // document.getElementById("match-button").removeAttribute('hidden');
//           console.log('fetching matched results')
//           var data = doc.data();
//           var data_final = data.datacollection;


//           match_layer.push(
//             new deck.IconLayer({
//               id: 'match-layer'+JSON.stringify(count),
//               // data: icons,
//               data: data_final,
//               pickable: true,
//               autoHighlight: true,
//             // iconAtlas and iconMapping are required
//             // getIcon: return a string
//               iconAtlas: 'images/icon_position.png',

//               iconMapping: POSITION_ICON_MAPPING,
//               getIcon: d => 'marker',
//               sizeMinPixels: 80,
//               sizeScale: 1,
//               getPosition: d => [d.coordinates.longtitude,d.coordinates.latitude],
//               getSize: d => 80,
//             //   getColor: [65,105,225],
//             getColor: function(d){
//                 if (d.type == "landlord")
//                 return [105,0,0];
//                 else if(d.type == "tenant")
//                 return [0,105,0];
//                 else
//                 return [0,0,0];

//             },
//               // onHover: ({object, x, y}) => {
//               // const tooltip = `${object.name}\n${object.address}`;

//             //   onClick: (event) => {
//             //     icon_event_matched(data_final);
//             //     // console.log(data_final);
//             //     // console.log(data.id);
//             //   },

//               onClick: function(d){
//                   var userinfo = d.object;
//                   console.log(userinfo)
//                   var user_lat = userinfo.coordinates.latitude;
//                   var user_long = userinfo.coordinates.longtitude;
//                   global_lat = user_lat;
//                   global_long= user_long;
//                   Swal.fire({
//                     position: 'middle',
//                     imageUrl: userinfo.photoURL,
//                     imageWidth: 300,
//                     imageHeight: 300,
//                     // icon:'success',
//                     showCloseButton: true,
//                     showCancelButton: true,
//                     background: `rgb(0,0,0)`,
//                     title: d.name,
//                     html: "User id: "+ userinfo.id+"<br>Email: "+userinfo.email+"<br>Gender: "+userinfo.gender+"<br>Role: "+userinfo.type,
//                     //"the userid: "+d.id,

//                     confirmButtonText: "View Location Stats",
//                     cancelButtonText: "Messages",
//                   }).then((result) => {
//                     if (result.value) {
//                       openNav_picker();
//                       push_sfpd_layer(user_lat,user_long);
//                     // push_sfpd_layer(user_lat,user_long);
//                     }
//                     else if (
//                       /* Read more about handling dismissals below */
//                       result.dismiss === Swal.DismissReason.cancel
//                     ) {
//                       openMessage(userinfo.id),
//                       othername = userinfo.name;
//                       otheruid = userinfo.id;

//                      otherphoto = userinfo.photoURL;

//                     }
//                   })

//                 },

//             }),

// //
//             new deck.IconLayer({
//               id: 'icon-layer-image-matched'+JSON.stringify(count),
//               // data: icons,
//               data: data_final,
//               pickable: true,
//               autoHighlight: true,
//             // iconAtlas and iconMapping are required
//             // getIcon: return a string
//               // iconAtlas: 'images/icon-atlas.png',
//               // iconMapping: ICON_MAPPING,
//               // getIcon: d => 'marker',
//               getIcon: d => ({

//                 url: d.photoURL,
//                 width: 128,
//                 height: 128,
//                 anchorY: 220,
//                 anchorX: -50,
//               }),

//               sizeScale: 1,
//               sizeMinPixels: 80,
//               getPosition: d => [d.coordinates.longtitude,d.coordinates.latitude],
//               getSize: d => 40,
//               // getColor: d => d.color,
//               // onHover: ({object, x, y}) => {
//               // const tooltip = `${object.name}\n${object.address}`;
//               onClick: function(d){
//                 var userinfo = d.object;
//                 console.log(userinfo)
//                 var user_lat = userinfo.coordinates.latitude;
//                 var user_long = userinfo.coordinates.longtitude;
//                 global_lat = user_lat;
//                 global_long= user_long;
//                 Swal.fire({
//                   position: 'middle',
//                   imageUrl: userinfo.photoURL,
//                   imageWidth: 300,
//                   imageHeight: 300,
//                   // icon:'success',
//                   showCloseButton: true,
//                   showCancelButton: true,
//                   background: `rgb(0,0,0)`,
//                   title: d.name,
//                   html: "User id: "+ userinfo.id+"<br>Email: "+userinfo.email+"<br>Gender: "+userinfo.gender+"<br>Role: "+userinfo.type,
//                   //"the userid: "+d.id,

//                   confirmButtonText: "View Location Stats",
//                   cancelButtonText: "Messages",
//                 }).then((result) => {
//                   if (result.value) {
//                     openNav_picker();
//                     push_sfpd_layer(user_lat,user_long);
//                   // push_sfpd_layer(user_lat,user_long);
//                   }
//                   else if (
//                     /* Read more about handling dismissals below */
//                     result.dismiss === Swal.DismissReason.cancel
//                   ) {
//                     openMessage(userinfo.id),
//                     othername = userinfo.name;
//                     otheruid = userinfo.id;

//                    otherphoto = userinfo.photoURL;

//                   }
//                 })

//               },

//           }),

// //








//             )

//             var matched_finalized_layer = match_layer.concat(update_layer).concat(base_layer);

//             update_layer.push(match_layer);
//             count = count +1;

//             deckgl.setProps({layers:matched_finalized_layer});



//       } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//       }
//   }).catch(function(error) {
//       console.log("Error getting document:", error);
//   });
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
        openMessage(d),
        myname = d.name;
        targetuid = d.id;
        targetname = d.name;
        targetphoto = d.photoURL;








          // push_sfpd_layer(user_lat,user_long);
      }
    })

  };




function getcenter (arr)
{
    var minX, maxX, minY, maxY;
    for (var i = 0; i < arr.length; i++)
    {
        minX = (arr[i][0] < minX || minX == null) ? arr[i][0] : minX;
        maxX = (arr[i][0] > maxX || maxX == null) ? arr[i][0] : maxX;
        minY = (arr[i][1] < minY || minY == null) ? arr[i][1] : minY;
        maxY = (arr[i][1] > maxY || maxY == null) ? arr[i][1] : maxY;
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
};
