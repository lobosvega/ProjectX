// change (Hamburg) into (X)when click on
$(document).ready(function() {
  // calling button when click event
  $('.nav-button').click(function() {
    // when click on(X) again back to(Hamburg) to do that we use (toggleClass)
    $('.nav-button').toggleClass('change');
  });

  // Use the properties (scrollTop) and (scrollLeft) to get or set the scroll position of an element:

// (window) represents the entire page is attached to scroll enevnts
  $(window).scroll(function() {
    // Where we want to start chamging the (nav-bar)
    let position = $(this).scrollTop();
    // (this) keyword refers to the (window) object and (ScrollTop) calculate position in pixels when we scroll down
    // console.log(position);
    if(position >= 200) {
      $('.nav-menu').addClass('custom-navbar');
      // if the position is less then 200px we want to maintain default number
    } else {
      $('.nav-menu').removeClass('custom-navbar');
    }
  });

// mission 
  $(window).scroll(function() {
    let position = $(this).scrollTop();
    console.log(position);
    if(position >= 650) {
      $('.camera-img').addClass('fromLeft');
      $('.mission-text').addClass('fromRight');
    } else {
      $('.camera-img').removeClass('fromLeft');
      $('.mission-text').removeClass('fromRight');
    }
  });

  $(window).scroll(function() {
    let position = $(this).scrollTop();
    if(position >= 3115) {
      $('.card-1').addClass('moveFromLeft');
      $('.card-2').addClass('moveFromBottom');
      $('.card-3').addClass('moveFromRight');
    } else {
      $('.card-1').removeClass('moveFromLeft');
      $('.card-2').removeClass('moveFromBottom');
      $('.card-3').removeClass('moveFromRight');
    }
  });
});































