var addCity = $("#add-city");
var cityInput = $("#city-input");

var cities = [];




function renderCity() {
    $("#cities-added").empty();


    for (var i = 0; i < cities.length, i++) {
        //Div for new cities to be inouted into
        var cityDiv = $("<div>");
        //Adding class to new cityDiv
        cityDiv.addClass("city");
        //Added attribute to cities in cities array
        cityDiv.attr("data-name", cities[i]);
        //Adding text to new cityDiv
        cityDiv.text(cities[i]);
        //Adding text to html



    }
}

$(cityInput).click(function() {




    renderCity();
})



// For Ajax calling data
// var APIkey = "fe80024a92d6b1c9f72576aaefc212e3";
// var queryURLCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;