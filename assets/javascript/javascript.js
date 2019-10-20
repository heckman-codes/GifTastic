$(document).ready(function () {

    var offset = 0;
    var offsetValue = parseInt($("#limiter").val());

    $("#search-button").on("click", function (event) {
        event.preventDefault();
        newSearch();
    });

    $("#clear-button").on("click", function (event) {
        event.preventDefault();
        clearGifs();
    });

    $("#more-button").on("click", function (event) {
        event.preventDefault();
        offset = offset + offsetValue;
        console.log(offset + " | " + offsetValue);
        newSearch();
    });

    function clearGifs() {
        offset = 0;
        $("#gif-display").empty();
    }

    function newSearch() {
        var searchTerm = $("#search-bar").val().trim();
        var limit = $("#limiter").val()
        var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=1hTXSjTTporGV2mXgChe2f7BRzGA737n&q=" + searchTerm + "&limit=" + limit + "&offset=" + offset;

        console.log(queryURL);


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            clearGifs();
            for (let i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var gifImg = $("<img>");
                $(gifDiv).addClass("img-holder");
                $(".img-holder").css("float", "left");
                $(".img-holder").css("margin", "0");
                $(".img-holder").css("display", "inline-block");
                $(gifImg).attr("src", results[i].images.fixed_height.url);
                $(gifDiv).append(gifImg);
                $("#gif-display").append(gifDiv);
            }
        });

    }
});
