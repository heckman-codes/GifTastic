$(document).ready(function () {

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
        $("#gif-display").append(newSearch());
    });

    $("#more-button").on("click", function (event) {
        event.preventDefault();
        offsetValue = parseInt($("#limiter").val());
        offset = offset + offsetValue;
        console.log(offset + " | " + offsetValue);
        $("#gif-display").append(newSearch());
    });

    $(".grid-item").on("click", function () {
        console.log($(this).attr("src", results[i].images.fixed_width.url));
        // $(this).attr("src", results[i].images.fixed_width.url);
    });


    $("#limiter").find("option").on("click", function () {
        offsetValue = $(this).val();
        console.log(offsetValue);
    });

    function clearGifs() {
        offset = 0;
        $(".grid").empty();
        console.log(offset);

    }


    function newSearch() {

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
                var gifDiv = $("<div>").addClass("grid-item");
                var gifInfo = $("<div>").addClass("div-info")
                var gifImg = $("<img>");
                $(".grid").css({ "line-height": "0" });
                $(".grid-item").css("float", "left");
                $(gifImg).attr("src", results[i].images.original_still.url);
                $(gifDiv).append(gifImg);
                $(".grid").append(gifDiv);
            }
        });

    }
});
