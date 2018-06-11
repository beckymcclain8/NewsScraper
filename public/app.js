
 //probably won't work...
 $("#goodNewsBtn").on("click", function(event) {
   $("#goodNewsBtn").hide();
 });
 
 $("#commentId").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    console.log("button clicked");
    // event.preventDefault();

    var thisId = $(this).attr("data-id");
console.log("thisId", thisId);
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId,
    }).then(
      function(data) {
        console.log("data", data);
        // Reload the page to get the updated list
        // data: {
        //   body: $("#com").val().trim()
        // }
        $("#comments").append(data.body);
        location.reload();
      }
    );
  });

  // When you click the savenote button
  $(document).on("click", "#saveBtn", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    var newComment = $("#com").val().trim();
      
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
       data:{
        body: newComment
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the comments section
        $("#comments").empty();
      });
  });
  