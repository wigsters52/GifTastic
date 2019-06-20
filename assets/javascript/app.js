$(document).ready(function () {

    //opening array 

    var topic = ["Cersei Lannister", "Tormund Giantsbane", "Jorah Mormont", "Davos Seaworth", "Bronn", "Robert Baratheon", "Hodor", "Samwell Tarly", "Jaime Lannister", "Arya Stark", "Sansa Stark", "Tyrion Lannister", "Jon Snow", "Daenerys Targaryen"]

    function buttons() {
        $("#gifButtons").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("gotCharacter");
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtons").append(gifButton);
        }
    }
    //adding a new button and also checking for empty response 
    function addNewButton() {
        $("#addGif").on("click", function () {
            var gotCharacter = $("#topicInput").val().trim();
            if (gotCharacter == "") {
                return false;//no blank buttons
            }
            topic.push(gotCharacter);
            buttons();
        });
    }
    //function to remove last button
    function removeLastButton() {
        $("removeGif").on("click", function () {
            topic.pop(gotCharacter);
                buttons();
        });
    }
    // function that displays the gifs
    function displayGifs() {
        var gotCharacter = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gotCharacter + "&api_key=a7SBNpUQmHA3RuPt9ggr3ytJLvOi0rkz&rating=pg";
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (response) {
                $("#gifsView").empty();
                          // storing the data from the AJAX request in the results variable
                var results = response.data;
                if (results == "") {
                    alert("There is not a gif for this!");
                }
                for (var i = 0; i < 10; i++) {
                    //creating and storing a div tag 
                    var gifDiv = $("<div1>");
                    //pull rating of gif
                    var p = $("<p>").text("Rating: " + results[i].rating );
                    gifDiv.append(p);
                    //pull gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    //paused images
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    //animated images
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    //how images come in
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    //add new div to existing divs
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }
    
    buttons();
    addNewButton();
    removeLastButton();
    
    $(document).on("click", ".gotCharacter", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

});