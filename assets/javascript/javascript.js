   
// Button Topics
var topics = ["simpsons", "thad castle", "catbug", "puppycat", "bread cat", "bruce lee"];

// Create buttons for values in array
var createButton = function() {
    $("#btn-row").empty(); 
    for (var i = 0; i < topics.length; i++) {
        console.log(topics[i]);
            var newButton = $("<button>");
            $("#btn-row").append(newButton);
            newButton.attr("data-content", topics[i]);
            newButton.addClass("button");
            newButton.text(topics[i]);
    }
}

// On submit button click
$("#button-input").on("click", function(event){
    event.preventDefault();
    var newTopic = $("#new-topic").val().trim(); // Takes value from form and pushes it into topics array
    topics.push(newTopic); 
    createButton(); // refresh button display
})    

createButton();

// On array button click
$(document).on("click", ".button", function(){
    var content = $(this).attr("data-content");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
    + content + "&api_key=870GYH5jPzsxItnRImQEmSIaqCr71Mcc&limit=10";

    $("#giftainer").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        
        var results = response.data;
        var giftainer = $("#giftainer");
     
        // For each ajax result
        for(var i = 0; i < results.length; i++ ) {

            var gifDiv = $("<div class='item'>");   // New div with "item" class


            var movingLink = results[i].images.fixed_height.url;    // latches to both image types stored as variables
            var stillLink = results[i].images.fixed_height_still.url;

            
            var rating = results[i].rating;     // ratings stored and added to p tag
            var p = $("<p>").text("Rated " + rating);



            var gifImg = $("<img>");        // image tag generated w/"clickable" class
            gifImg.addClass("clickMe");


            gifImg.attr("src", movingLink);     // image given source and data-attributes for later
            gifImg.attr("data-state", 'still');
            gifImg.attr("data-animate", movingLink);
            gifImg.attr('data-still', stillLink);
    
            
            gifDiv.append(gifImg);      // image & rating appended to div
            gifDiv.append(p); 
           
            giftainer.append(gifDiv);   // div appended to main container  
        }
    });
});


// When a gif is clicked
$(document).on('click', '.clickMe', function(){   

      var state = $(this).attr("data-state");   // data-state toggled from still to moving, etc.
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    })

    
