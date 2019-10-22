$(document).ready(function () {
    var gifIndex = []
    var offset = 0;
    var offsetValue = $("#limiter").val();
    // var searchVal = $("input[type=text]").val();

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
        newSearch();
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

    // $(document).on("click", ".recent-button", function () {
    //     searchVal = $(this).val("data-query");
    //     newSearch();
    // });

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
            var searchButton = $("<button>")
            $(searchButton).addClass("recent-button").attr("data-query", searchTerm).text(searchTerm);

            // for (let i = 0; i < $("#search-button").length; i++) {
            //     if (searchButton.val("data-query") !== $("#search-buttons").val("data-query")) {
            //         $("#search-buttons").append(searchButton);
            //     }
            // }


            for (let i = 0; i < results.length; i++) {
                gifIndex.push(response.data[i]);
                var gifDiv = $("<div>").addClass("grid-item");
                var gifInfo = $("<span>").addClass("div-info");
                var favGif = $("<button>").addClass("fav-gif").text("Favorite");
                var removeGif = $("<button>").addClass("remove-gif").text("Remove").hide();
                var gifImg = $("<img>");
                $(gifImg).attr("data-still", results[i].images.downsized_still.url);
                $(gifImg).attr("data-gif", results[i].images.downsized.url);
                $(gifImg).attr("src", results[i].images.downsized_still.url);
                $(gifDiv).append(gifImg);
                $(gifDiv).append(gifInfo);
                $(gifInfo).append("<p>" + results[i].username + "</p><p> Rated: " + results[i].rating + "</p>");
                $(gifInfo).append(favGif);
                $(gifInfo).append(removeGif);
                $(".grid").prepend(gifDiv);

            }


            // $(".div-info").toggle(function () {
            //     var gif = $(this).parent().find("img").attr("data-gif");
            //     $(this).parent().find("img").attr("src", gif);
            // }, function () {
            //     var still = $(this).parent().find("img").attr("data-still");
            //     $(this).parent().find("img").attr("src", still);
            // });

            $(".div-info").on("click", function () {
                var gif = $(this).parent().find("img").attr("data-gif");
                $(this).parent().find("img").attr("src", gif);
            });

            $(".grid-item").hover(function () {
                $(this).find(".div-info").show();
            }, function () {
                $(this).find(".div-info").hide();

            });
            //adds gifs to favorite section
            $(".fav-gif").on("click", function () {
                $(this).removeClass("fav-gif").text("Remove");
                $(this).parents(".grid-item").appendTo(".fav-grid");
                $(this).hide();
                $(this).parent().find(".remove-gif").show();
                console.log(this);
            });

            $(".remove-gif").on("click", function () {
                $(this).parents(".grid-item").remove();
            });



        });

    }
});
