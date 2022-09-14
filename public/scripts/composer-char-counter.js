// document.addEventListener("DOMContentLoaded", () => {
  
//   const tweetText = document.getElementById("tweet-text");

//   tweetText.addEventListener('keydown', (event) => {
//     console.log(event);
    
//   })
// })

$(document).ready(function() {
  const newTweet = $( ".new-tweet" );
  const counter = $ ( "#counter" );

  newTweet.on("input", "textarea", function (event) {
    const maxCount = 140;
    const textCount = maxCount - $(this).val().length;
    
    console.log($(this).val().length);
    
    const form = $(this).parent();
    const section = form.parent();
    const counter = section.find(".counter");
    counter.text(textCount);

    if(textCount <= 0) {
      $(counter).addClass("maxCount")
    } else {
      $(counter).removeClass("maxCount");
    }
  });
});