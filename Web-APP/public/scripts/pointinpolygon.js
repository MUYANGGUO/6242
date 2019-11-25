// function resolveAfter2Seconds() {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve('resolved');
//       }, 2000);
//     });
//   }
  
async function asyncCall() {
    console.log('calling');
    var result = await get_user_identity();
    console.log(result);
    // expected output: 'resolved'
  }
  

function get_user_identity(){
    var user = firebase.auth().currentUser;
    var useruid;

    if (user != null) {
      useruid = user.uid; 
      var docRef = db.collection("users").doc(useruid); // The user's ID, unique to the Firebase project.
      console.log(useruid)
      
    }


    return new Promise(resolve => {
        setTimeout(() => {
          resolve("resolved");
        }, 1000);
      });
}
// asyncCall();
//write region data to database
// Note this script is only run by once, to automatically load the regions to firestore datase
// var rawbase = 'https://raw.githubusercontent.com/';
// var jsonloc = 'muyangguo/6242/master/Zillow-DataClean/zillow-neighborhoods.geojson';

// $.getJSON(rawbase + jsonloc, function( data ) {

// var regionids = data["features"];
//    console.log(regionids)

// for (region of regionids.slice(0)){
//     var regionid = region["properties"]["regionid"];
//     var regionname = region["properties"]["name"];
//     var polygon = region["geometry"]["coordinates"][0];
//     var long = region["properties"]["geo_point_2d"][1];
//     var lat = region["properties"]["geo_point_2d"][0];
//     console.log(region)
//     //    console.log(polygon)
//     var coordx = [];
//     var coordy = [];
//     for (coords of polygon){
//         coordx.push(coords[0]);
//         coordy.push(coords[1]);
//     }
    
//     checkwithin = pointinpolygon(long,lat,coordx,coordy);
//     if (checkwithin == 1){
//         console.log("found the region!")
//         console.log(regionid)
//         var regionRef = db.collection("regions");
//         regionRef.doc(regionid).set({
//         name: regionname,
//     })
//     .then(function() {
//         console.log("user regionid info updated!");       
        
//     })
//     .catch(function(error) {
//         console.error("Error writing document: ", error);
//         })
        
//     }

//     }

// });


function clear_previous_user_region_logs(){
    var user = firebase.auth().currentUser;
    var useruid;
    
    if (user != null) {
      useruid = user.uid;  // The user's ID, unique to the Firebase project.
    
    }
    var docRef = db.collection("users").doc(useruid);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var data = doc.data();
            var regionid = data["region"];
            var useridentity = data["type"]
            
            var regionRef = db.collection("regions").doc(regionid).collection(useridentity).doc(useruid);
            regionRef.delete().then(function() {
                console.log("Document successfully deleted!");


            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 1000);
      });
};


// The deploying codes here:

function update_user_region (long,lat) {  
    // clear_previous_user_region_logs();
    var rawbase = 'https://raw.githubusercontent.com/';
    var jsonloc = 'muyangguo/6242/master/Zillow-DataClean/zillow-neighborhoods.geojson';

    $.getJSON(rawbase + jsonloc, function( data ) {

    var regionids = data["features"];
    //    console.log(regionids)

    for (region of regionids){
        var regionid = region["properties"]["regionid"];
        var regionname = region["properties"]["name"];
        var polygon = region["geometry"]["coordinates"][0];
        //    console.log(polygon)
        var coordx = [];
        var coordy = [];
        for (coords of polygon){
            coordx.push(coords[0]);
            coordy.push(coords[1]);
        }
        
        checkwithin = pointinpolygon(long,lat,coordx,coordy);
        if (checkwithin == 1){
            console.log("found the region!")
            console.log(regionid)
            var user = firebase.auth().currentUser;
            var useruid;
            if (user != null) {
            useruid = user.uid; 
            // The user's ID, unique to the Firebase project.
            }
            var regionRef = db.collection("regions").doc(regionid);
            regionRef.collection("landlord").doc(useruid).set({
            uid: useruid,
        })
        .then(function() {
            console.log("assign the userid to regions profile!");
            
                   
            
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            })
         
        var UserRef = db.collection("users").doc(useruid);
            UserRef.update({
            region: regionid,
        })
        .then(function() {
            console.log("assigned region id to user profile");
            
                   
            
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            })
            
        }

        }

    });
};

function pointinpolygon (x, y, cornersX, cornersY) {

  var i, j=cornersX.length-1 ;
  var odd = false;

  var pX = cornersX;
  var pY = cornersY;

  for (i=0; i<cornersX.length; i++) {
      if ((pY[i]< y && pY[j]>=y ||  pY[j]< y && pY[i]>=y)
          && (pX[i]<=x || pX[j]<=x)) {
            odd ^= (pX[i] + (y-pY[i])*(pX[j]-pX[i])/(pY[j]-pY[i])) < x; 
      }

      j=i; 
  }

return odd;
};