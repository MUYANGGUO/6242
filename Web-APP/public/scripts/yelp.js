// function YelpAPI(location){
//     //add mapboxgl.accessToken
//     mapboxgl.accessToken = mapboxgl_accessToken;
//     var request = new XMLHttpRequest()
    
//     request.open('GET', 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+String(location)+'.json?access_token='+mapboxgl.accessToken+'&limit=3&types=address&autocomplete=true')
//     request.onload = function() {
//       // Begin accessing JSON data here
//       var data = JSON.parse(this.response)
//       if (request.status >= 200 && request.status < 400) {
//         var user = firebase.auth().currentUser;
//         var useruid;
//         if (user != null) {
//           useruid = user.uid;  // The user's ID, unique to the Firebase project.
//         }
//         var coordinates = data['features'][0]['geometry']['coordinates']
//         var latitude = coordinates[1];
//         var longtitude = coordinates[0];
  
//         db.collection("users").doc(useruid).update({
//             coordinates:{
//               latitude:latitude,
//               longtitude,longtitude,
//             },
//             })
//             .then(function() {
//             console.log("successfully updated user location lat/long to database!");
//             update_user_region(longtitude,latitude)
//             my_location_layer_flag = false;
//             push_user_location();
//             })
//             .catch(function(error) {
//           // The document probably doesn't exist.
//             console.error("Error updating document: ", error);
//             });
//       } else {
//         console.log('XML HTTP request error');
//       }
//     }
  
//     request.send()
  
  
//   };

// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function TestYelpAPI(){

    var data = null;
    var xhr = new XMLHttpRequest();
// // See this website:  https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9

// // see the following example:

// // https://cors-anywhere.herokuapp.com/https://joke-api-strict-cors.appspot.com/jokes/random

    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?radius=2000&latitude=37.786882&longitude=-122.399972&sort_by=rating&term=print center&limit=50");
    xhr.setRequestHeader("Authorization", "Bearer Dk_NngRSHCj1zE1iQ_dgZLTADj7cn3_2JW4dKKFaOmPt9Eqd4feBLXN3Er7xu5TXeSOZjc5VVxFDmYKFLy_QGlm_95vOp5REw33EwoYvMu6MYrre-bPaCH8XhFvcXXYx");
    // xhr.setRequestHeader("Access-Control-Allow-Origin","*");

    console.log(xhr.status);





    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        data = JSON.parse(this.responseText);
        console.log(data);
      }
    });
    xhr.send(data);
    // $.ajax({
    //     url: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
    //     type: "GET",
    //     data: {
    //         "$latitude" : 37.786882,
    //         "$longitude" : -122.399972,
    //         "$Authorization" : "Bearer Dk_NngRSHCj1zE1iQ_dgZLTADj7cn3_2JW4dKKFaOmPt9Eqd4feBLXN3Er7xu5TXeSOZjc5VVxFDmYKFLy_QGlm_95vOp5REw33EwoYvMu6MYrre-bPaCH8XhFvcXXYx",
    //         "$limit" : 10,
    //     }

    // }).done(function(data) {
    //     alert("retrieved " + data.length + " records from the dataset!");
    //     console.log(data);
    // });


};






TestYelpAPI();

 