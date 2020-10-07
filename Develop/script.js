var cities = [];


function renderCity() {
    //Clear value on input text
    $("#cities-added").empty();
    //Clear 5 day forcast when new one is entered
    $("#Day1").empty();
    $("#Day2").empty();
    $("#Day3").empty();
    $("#Day4").empty();
    $("#Day5").empty();

    for (var i = 0; i < cities.length; i++) {
        //Div for new cities to be inouted into
        var cityDiv = $("<a>");
        //Adding class to new cityDiv
        cityDiv.addClass("city");
        //Added attribute to cities in cities array
        cityDiv.attr("href", "#");

        //Adding text to new cityDiv
        cityDiv.text(cities[i]);
        //Adding text to html
        $("#cities-added").append(cityDiv);
        $("#cities-added").append($("<br>")).append($("<br>"));


    }
};


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
    currentForecast(inputCity);
    fiveDayForcast(inputCity);
});

function onPageLoad() {
    $("#cities-added").text(localStorage.getItem("cityListItem"));
};

// $(".city").click(function(event) {
//     //Keep page from refreshing
//     event.preventDefault();
//     //Grab value of class clicked on
//     var revisitCity = $(event.target.this).val().trim();

//     cities.push(revisitCity);

//     currentForecast(revisitCity);
//     fiveDayForcast(revisitCity);
// });



function fiveDayForcast(city) {
    var APIkey = "fe80024a92d6b1c9f72576aaefc212e3";
    var queryURL5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=40&units=imperial&appid=" + APIkey;
    $.ajax({
        url: queryURL5Day,
        method: "GET"
    }).then(function(response) {
        //Logging response to console
        console.log(response);

        //Five Day Forcast ID Variables
        var day1 = $("#Day1");
        var day2 = $("#Day2");
        var day3 = $("#Day3");
        var day4 = $("#Day4");
        var day5 = $("#Day5");

        //Dates
        var day1Date = $("<div>").text(response.list[6].dt_txt);
        var day2Date = $("<div>").text(response.list[14].dt_txt);
        var day3Date = $("<div>").text(response.list[22].dt_txt);
        var day4Date = $("<div>").text(response.list[30].dt_txt);
        var day5Date = $("<div>").text(response.list[38].dt_txt);
        day1.append(day1Date);
        day2.append(day2Date);
        day3.append(day3Date);
        day4.append(day4Date);
        day5.append(day5Date);
        //Weather Icons


        //Temp
        var day1Temp = $("<div>").text("Temp: " + response.list[6].main.temp + " °F");
        var day2Temp = $("<div>").text("Temp: " + response.list[14].main.temp + " °F");
        var day3Temp = $("<div>").text("Temp: " + response.list[22].main.temp + " °F");
        var day4Temp = $("<div>").text("Temp: " + response.list[30].main.temp + " °F");
        var day5Temp = $("<div>").text("Temp: " + response.list[38].main.temp + " °F");
        day1.append(day1Temp);
        day2.append(day2Temp);
        day3.append(day3Temp);
        day4.append(day4Temp);
        day5.append(day5Temp);

        //Humidity
        var day1Humidity = $("<div>").text("Humidity: " + response.list[6].main.humidity + "%");
        var day2Humidity = $("<div>").text("Humidity: " + response.list[14].main.humidity + "%");
        var day3Humidity = $("<div>").text("Humidity: " + response.list[22].main.humidity + "%");
        var day4Humidity = $("<div>").text("Humidity: " + response.list[30].main.humidity + "%");
        var day5Humidity = $("<div>").text("Humidity: " + response.list[38].main.humidity + "%");
        day1.append(day1Humidity);
        day2.append(day2Humidity);
        day3.append(day3Humidity);
        day4.append(day4Humidity);
        day5.append(day5Humidity);


    });
};

function currentForecast(city) {
    var APIkey = "fe80024a92d6b1c9f72576aaefc212e3";
    var queryURLCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURLCurrentDay,
        method: "GET",
    }).then(function(response) {

        $("#today").empty();

        //Log response to console
        console.log(response);

        //Current Date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;


        //Current Forecast Div Variable
        var currentDay = $("#today");


        //Name and Date of city
        var cityNameAndDate = $("<h3>").text(response.name + "      " + today);
        currentDay.append(cityNameAndDate);

        //Temperature
        var currentTemp = $("<div>").text("Temperature: " + response.main.temp + " °F");
        currentDay.append(currentTemp);

        //Humidity
        var currentHumidity = $("<div>").text("Humidity: " + response.main.humidity + "%");
        currentDay.append(currentHumidity);

        //Wind Speed
        var currentWind = $("<div>").text("Wind Speed: " + response.wind.speed + " mph");
        currentDay.append(currentWind);

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var queryURLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;

        $.ajax({
            url: queryURLUV,
            method: "GET",
        }).then(function(uv) {
            console.log(uv);
            var uvValue = $("<div>").text("UV Index: " + uv.value);

            if (uv.value < 2) {
                uvValue.addClass("uvgreen");
            } else if (uv.value < 6) {
                uvValue.addClass("uvyellow");
            } else if (uv.value < 8) {
                uvValue.addClass("uvorange");
            } else if (uv.value < 11) {
                uvValue.addClass("uvred");
            } else {
                uvValue.addClass("uvpurple");
            }

            currentDay.append(uvValue);
        });

        localStorage.setItem("currentDayData", currentDay);


    });
};


onPageLoad();