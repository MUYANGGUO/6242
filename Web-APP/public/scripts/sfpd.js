


function testsfpd(){
    var lat = JSON.stringify(37.760);
    var long = JSON.stringify(-122.38);
    $.ajax({
        url: "https://data.sfgov.org/resource/wg3w-h783.json?",
        type: "GET",
        data: {
        "$where" : "within_circle(point,"+ lat +","+long+", 2000)",
        "$limit" : 12,
        "$$app_token" : "m7cdlDr9n2gVd9FLts0mBiDyC"
        }
    }).done(function(data) {
    alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
    });
};