/* <div class="container">
    <h1>Animals Search</h1>

    <!-- Rendered Buttons will get Dumped Here  -->
    <div id="buttons-view"></div>

    <form id="animal-form">
      <label for="animal-input">Add an Animal!</label>
      <input type="text" id="animal-input"><br>

      <!-- Button triggers new animal to be added -->
      <input id="add-animal" type="submit" value="Add an Animal!">
    </form>


    <div id="animals-view"></div> */





    
    

    var animals = [ "cats", "pandas", "camels" , "Bears"];
   

    function displayGif() {

        var animals = $(this).attr("data-name");
    var queryURL = "http:api.giphy.com/v1/gifs/search?q="+ animals + "&api_key=RLnVQdHTAJwB35VzVlH6u7yKMYJOzjrk&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        
        var results = response.data;
        console.log(results);
         
        for (var i = 0; i < results.length; i++) {
            
            var newDiv = $("<div>");
           
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            
            var imageStill = results[i].images.original_still.url;
            var imageAnimated = results[i].images.original.url;
           
            var animalImage = $("<img>");
            animalImage.attr("src", imageStill );
            animalImage.attr("data-still", imageStill);
            animalImage.attr("data-animated", imageAnimated);
            animalImage.attr("data-state", "still");
            animalImage.attr("class", "images");


            newDiv.prepend(p);
            newDiv.prepend(animalImage);
            $("#animals-view").prepend(newDiv);

          }


      });
    };
      
    
    function renderButtons() {

     
       
        $("#buttons-view").empty();

        // Looping through the array of 
        for (var i = 0; i < animals.length; i++) {


          var a = $("<button>");
          // Adding a class
          a.addClass("animal-btn");
       
          a.attr("data-name", animals[i]);
          
          a.text(animals[i]);
          
          $("#buttons-view").append(a);
        }
      };
    

        $("#add-animal").on("click", function (event) {

            event.preventDefault();

            var animal = $("#animal-input").val().trim();

            animals.push(animal);

            renderButtons();

        });


        $(document).on("click", ".animal-btn", displayGif);
        
        renderButtons();
        $(document).on("click", ".images", function(){
            var state = $(this).attr("data-state");
            var still = $(this).attr("data-still");
            var animated = $(this).attr("data-animated");
            if (state === "still"){
                $(this).attr("src", animated);
                $(this).attr("data-state", "animated");
            } else {
                $(this).attr("src", still);
                $(this).attr("data-state", "still");
            }
        })
    
    
      