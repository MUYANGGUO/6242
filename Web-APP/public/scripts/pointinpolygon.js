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
       
       checkwithin = pointinpolygon(-122.50344,37.739,coordx,coordy);
       if (checkwithin == 1){
        console.log("hit")
        console.log(regionid)
        var regionRef = db.collection("regions");
        regionRef.doc(regionid).set({
        name: regionname,
      })
      .then(function() {
          console.log("regionid info updated!");       
          
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
          })
           
       }

      }

  //do what you want with data
});

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
}