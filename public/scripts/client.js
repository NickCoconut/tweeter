/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const $newTweet = createTweetElement(tweet);
      $("#tweets-container").prepend($newTweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    let $tweet = `
    <article class="article">
    <header class="user">
      <div>
        <img src=${tweet.user.avatars}>
        <span>${tweet.user.name}</span>
      </div>
      <span>${tweet.user.handle}</span>
    </header>
    <div>
    <div class="line">
      <span class="tweet-content"><strong>${escape(
        tweet.content.text
      )}</strong></span>
      <hr />
    </div>
    <footer class="footer">
      <span class="date">${timeago.format(tweet.created_at)}</span>
      <div class="threeIcons">
        <span class="flag"><i class="fas fa-flag"></i></span>
        <span class="retweet"><i class="fas fa-retweet"></i></span>
        <span class="heart"><i class="fas fa-heart"></i></span>
      </div>
    </footer>
  </div>
  </article>`;

    return $tweet;
  };

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (data) => {
        renderTweets(data);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      },
    });
  }


  $("form").submit(function (event) {
    event.preventDefault();

    const tweetLength = $("#tweet-text").val().length;
    const max = 140;

    if (tweetLength > max) {
      $(".errContainer").slideDown("slow");
      $(".err").text("Too Long. Please shorten your tweet");
    } else if (tweetLength === 0) {
      $(".errContainer").slideDown("slow");
      $(".err").text("Please enter some tweet");
    } else {
      $(".errContainer").slideUp("slow");

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: () => {
          loadTweets();
        },
      });
    }
    $("#tweet-text").val("");
    $(".counter").val(140);
  });

  loadTweets();
});


