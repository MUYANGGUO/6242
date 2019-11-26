function testsfpd(){
    $.ajax({
        url: "https://data.sfgov.org/resource/wg3w-h783.json?incident_day_of_week=Friday",
        type: "GET",
        data: {
        "$limit" : 10,
        "$$app_token" : "m7cdlDr9n2gVd9FLts0mBiDyC"
        }
    }).done(function(data) {
    alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
    });
};