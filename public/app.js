//probably won't work...
//  $("#goodNewsBtn").on("click", function(event) {
//    $("#goodNewsBtn").hide();
//  });

// $(".form").hide();

$(document).on("click", ".commentId", function() {
  // Make sure to preventDefault on a submit event.
  console.log("button clicked");
  // event.preventDefault();
  $(".comments").empty();
  var thisId = $(this).attr("data-id");
  console.log("thisId", thisId);
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log("data", data);
    // Reload the page to get the updated list
    // data: {
    //   body: $("#com").val().trim()
    // }
    $(".comments").append("<h1> Comments <h2>");
    $(".comments").append("<textarea id='com' name'comment'></textarea>");
    $(".comments").append(
      "<button data-id='" + data._id + "'id='saveBtn'>Save Comment</button>"
    );

    // location.reload();
    if (data.comment) {
      $("#com").val(data.comment.body);
    }
  });
});

// $(".close").on("click", function(event) {
//   $(".comments").empty();
// });

// When you click the savenote button
$(document).on("click", "#saveBtn", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // var newComment = $("#com")
  //   .val()
  //   .trim();

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      body: $("#com").val()
    }

    // data: {
    //   body: newComment
    // }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the comments section
      $(".comments").empty();
    });

  $("#com").val("");
});
