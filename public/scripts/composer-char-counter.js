$(document).ready(function() {
  const $newTweet = $(".new-tweet");

  $newTweet.on("input", "textarea", function(event) {
    const maxCount = 140;
    const inputLength = $(this).val().length;
    const textCount = maxCount - inputLength;
    const $form = $(this).parent(); //traversing the DOM tree to eventually get to the counter located in section
    const $section = $form.parent();
    const $counter = $section.find(".counter");
    
    $counter.text(textCount);

    if (textCount <= 0) {
      $counter.addClass("maxCount");
    } else {
      $counter.removeClass("maxCount");
    }
  });
});