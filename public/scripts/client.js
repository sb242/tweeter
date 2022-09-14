/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  const $tweetContainer = $( ".tweet-container" );
  
  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    });
  }
  
  const createTweetElement = function(tweetData) {
  
    const name = tweetData.user.name;
    const avatar = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const dateCreated = tweetData.created_at;
    const tweetContent = tweetData.content.text;
  
    const $tweet = $(`<article class="tweet">
                      <header class = tweet-header>
                        <div class = "avatarName">
                          <img class="avatar" src="${avatar}">
                          <p class="name">${name}</p>
                        </div>
                        <p class="user-name">${handle}</p>
                      </header>
                      <p class="tweet-content">${tweetContent}</p>
                      <footer class = tweet-footer>
                        <p class="date-posted">${dateCreated}</p>
                        <div class="icons">
                          <i class="fa-solid fa-flag"></i>
                          <i class="fa-solid fa-arrows-rotate"></i>
                          <i class="fa-solid fa-heart"></i>
                        </div>
                      </footer>
                    </article>`);
    return $tweet;
  }
  
  const $form = $('#tweet-form');

  $form.on('submit', (event) => {
    event.preventDefault();

    const serializedData = $form.serialize();

    $.post('/tweets', serializedData, (res) => {
      console.log(res);
    });

  });
  
  renderTweets(data);
});

