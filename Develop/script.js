var cities = [];

function renderCity() {
    //Clear value on input text
    $("#cities-added").empty();

    for (var i = 0; i < cities.length; i++) {
        //Div for new cities to be inouted into
        var cityDiv = $("<div>");
        //Adding class to new cityDiv
        cityDiv.addClass("city");
        //Added attribute to cities in cities array
        cityDiv.attr("data-name", cities[i]);
        //Adding text to new cityDiv
        cityDiv.text(cities[i]);
        //Adding text to html
        $("#cities-added").append(cityDiv);


    }
}


$("#add-city").click(function(event) {
    //Keep page from refreshing on submit button being clicked
    event.preventDefault();
    //Grab text from input text box
    var inputCity = $("#city-input").val().trim();
    //Push added cities to #cities-added div
    cities.push(inputCity);
    //Push to Local Storage
    localStorage.setItem("cityListItem", inputCity);
    //Calling renderCity function to add to list
    renderCity();
    fiveDayForcast(inputCity);
});

function onPageLoad() {
    $("#cities-added").text(localStorage.getItem("cityListItem"));
}

onPageLoad();


function fiveDayForcast(city) {
    var APIkey = "fe80024a92d6b1c9f72576aaefc212e3";
    var queryURL5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&appid=" + APIkey;
    // api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={API key}
    // https://api.openweathermap.org/data/2.5/forecast/daily?q=Austin&cnt=5&appid=fe80024a92d6b1c9f72576aaefc212e3
    $.ajax({
        url: queryURL5Day,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    })

}





// For Ajax calling data
// var APIkey = "fe80024a92d6b1c9f72576aaefc212e3";
// var queryURLCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;