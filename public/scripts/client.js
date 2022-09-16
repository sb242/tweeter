$(() => {
  //jquery element selectors
  const $tweetContainer = $( ".tweet-container" );
  const $form = $('#tweet-form');
  const $error = $('.error-message');

  $error.hide(); //initially hides elements containing error message
  
  //helper function used to prevent XSS by removing html syntax from string
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //retrieves database of existing tweets using a get request and then calls renderTweets with that data
  const loadTweets = () => {
    $.get('/tweets', (data) => {
      $tweetContainer.empty(); //clearing tweets before rendering the data back so it is not being duplicated
      renderTweets(data);
    })
  }
  
  //prepends all tweets from the database onto document object
  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.prepend($tweet);
    });
  };
  
  //takes in tweet information and creates html markup to push onto the document object
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
                        <p class="tweet-content">${escape(tweetContent)}</p>
                        <footer class = tweet-footer>
                          <p class="date-posted">${timeago.format(dateCreated)}</p>
                          <div class="icons">
                            <i class="fa-solid fa-flag"></i>
                            <i class="fa-solid fa-arrows-rotate"></i>
                            <i class="fa-solid fa-heart"></i>
                          </div>
                        </footer>
                      </article>`);
    return $tweet;
  };
  
  //event listener for tweet form
  $form.on('submit', (event) => {
    event.preventDefault(); //prevents default behavoir of form behaviour from happening, such as refreshing the page
    const serializedData = $form.serialize();
    const serializedDataText = serializedData.split("=")[1].length; //selects only the text input from serialize()
    const $errorMessage = $error.children('p'); //targets p element in error message to use custom messages
    
    //form validation
    if(serializedDataText < 1) {
      $errorMessage.text('Error! Your input is empty.');
      $error.slideDown();
      return;
    }
    
    //form validation
    if(serializedDataText >= 140) {
      $errorMessage.text('Error! Please reduce your character count to 140 or below.');
      $error.slideDown();
      return;
    }
    
    $error.slideUp(); //removes error message on successful submit
    $form.trigger('reset'); //clears form after a successful submit

    //makes a post request to add a new tweet to the database, reloads all tweets after sucess.
    $.post('/tweets', serializedData, (res) => {
      loadTweets();
    });
  });

  //inital call to load tweets in database when page is first rendered
  loadTweets();
});

