var cities = [];


function renderCity() {
    //Clear value on input text
    $("#cities-added").empty();
    $("#Day1").empty();
    $("#Day2").empty();
    $("#Day3").empty();
    $("#Day4").empty();
    $("#Day5").empty();

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
    currentForecast(inputCity);
    fiveDayForcast(inputCity);
});

function onPageLoad() {
    $("#cities-added").text(localStorage.getItem("cityListItem"));
}

onPageLoad();


function fiveDayForcast(city) {
    var APIkey = "fe80024a92d6b1c9f72576aaefc212e3";
    var queryURL5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=40&units=imperial&appid=" + APIkey;
    // var queryURL5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&untis=imperial&appid=" + APIkey;
    // https://api.openweathermap.org/data/2.5/forecast/daily?q=Austin&cnt=5&appid=fe80024a92d6b1c9f72576aaefc212e3
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
        var day1Date = $("<div>").text(response.list[0].dt_txt);
        var day2Date = $("<div>").text(response.list[8].dt_txt);
        var day3Date = $("<div>").text(response.list[16].dt_txt);
        var day4Date = $("<div>").text(response.list[24].dt_txt);
        var day5Date = $("<div>").text(response.list[32].dt_txt);
        console.log(day1Date);
        console.log(day2Date);
        console.log(day3Date);
        console.log(day4Date);
        console.log(day5Date);
        day1.append(day1Date);
        day2.append(day2Date);
        day3.append(day3Date);
        day4.append(day4Date);
        day5.append(day5Date);
        //Temp
        var day1Temp = $("<div>").text("Temp: " + response.list[0].main.temp + " °F");
        var day2Temp = $("<div>").text("Temp: " + response.list[8].main.temp + " °F");
        var day3Temp = $("<div>").text("Temp: " + response.list[16].main.temp + " °F");
        var day4Temp = $("<div>").text("Temp: " + response.list[24].main.temp + " °F");
        var day5Temp = $("<div>").text("Temp: " + response.list[32].main.temp + " °F");
        console.log(day1Temp);
        console.log(day2Temp);
        console.log(day3Temp);
        console.log(day4Temp);
        console.log(day5Temp);
        day1.append(day1Temp);
        day2.append(day2Temp);
        day3.append(day3Temp);
        day4.append(day4Temp);
        day5.append(day5Temp);

        //Humidity
        var day1Humidity = $("<div>").text("Humidity: " + response.list[0].main.humidity + "%");
        var day2Humidity = $("<div>").text("Humidity: " + response.list[8].main.humidity + "%");
        var day3Humidity = $("<div>").text("Humidity: " + response.list[16].main.humidity + "%");
        var day4Humidity = $("<div>").text("Humidity: " + response.list[24].main.humidity + "%");
        var day5Humidity = $("<div>").text("Humidity: " + response.list[32].main.humidity + "%");
        console.log(day1Humidity);
        console.log(day2Humidity);
        console.log(day3Humidity);
        console.log(day4Humidity);
        console.log(day5Humidity);
        day1.append(day1Humidity);
        day2.append(day2Humidity);
        day3.append(day3Humidity);
        day4.append(day4Humidity);
        day5.append(day5Humidity);

    })
};

function currentForecast(city) {
    var APIkey = "fe80024a92d6b1c9f72576aaefc212e3";
    var queryURLCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIkey;

    $.ajax({
        url: queryURLCurrentDay
        method: "GET",
    }).then(function(response) {
        //Log response to console


    })



}





// For Ajax calling data
// var APIkey = "fe80024a92d6b1c9f72576aaefc212e3";
// var queryURLCurrentDay = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;