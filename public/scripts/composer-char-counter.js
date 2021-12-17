$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    const tweetLength = $(this).val().length;
    const max = 140;
    const counter = $(this).siblings("div").children(".counter");
    counter.text(max - tweetLength);
    if (tweetLength > max) {
      counter.css("color", "red");
    } else {
      counter.css("color", "black");
    }
  });
});
