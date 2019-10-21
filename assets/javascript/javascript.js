$(document).ready(function () {
    var gifIndex = []
    var offset = 0;
    var offsetValue = $("#limiter").val();

    $("#search-button").on("click", function (event) {
        clearGifs();
        event.preventDefault();
        newSearch();
    });

    $("#clear-button").on("click", function (event) {
        event.preventDefault();
        clearGifs();
    });


    $("#more-button").on("click", function (event) {
        event.preventDefault();
        offsetValue = parseInt($("#limiter").val());
        offset = offset + offsetValue;
        console.log(offset + " | " + offsetValue);
        $(".grid").prepend(newSearch());
    });


    $("#limiter").find("option").on("click", function () {
        offsetValue = $(this).val();
        console.log(offsetValue);
    });

    function clearGifs() {
        offset = 0;
        gifIndex = [];
        $(".grid").empty();
        console.log(gifIndex);

    }


    function newSearch() {

        gifIndex = [];
        var limit = $("#limiter").val()
        var searchTerm = $("#search-bar").val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?&api_key=1hTXSjTTporGV2mXgChe2f7BRzGA737n&q=" + searchTerm + "&limit=" + limit + "&offset=" + offset;

        console.log(queryURL);
        console.log(offset);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var results = response.data;
            for (let i = 0; i < results.length; i++) {
                gifIndex.push(response.data[i]);
                var gifDiv = $("<div>").addClass("grid-item");
                var gifInfo = $("<span>").addClass("div-info")
                var gifImg = $("<img>");
                $(".div-info").css("display", "initial");
                $(gifImg).attr("data-gif", results[i].images.original.url);
                $(gifImg).attr("src", results[i].images.original_still.url);
                $(gifDiv).append(gifImg);
                $(gifDiv).append(gifInfo);
                $(gifInfo).prepend("<p> Title: " + results[i].title + "</p><p> Rated: " + results[i].rating + "</p><p> By User: " + results[i].username + "</p>");
                $(".grid").prepend(gifDiv);
            }
            $("img").on("click", function () {
                console.log(this);
                var gif = $(this).attr("data-gif");
                $(this).attr("src", gif)
            });

            $(".grid-item").hover(function () {
                var gif = $(this).attr("data-gif");
                $(this).find("img").attr("src", gif);
                $(this).find(".div-info").toggle("display");
            });
        });

    }
});
