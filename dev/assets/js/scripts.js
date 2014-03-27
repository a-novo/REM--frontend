(function(window, document, $) { // put the vars you need and match them at the bottom

  // All 4 vars are localized in here - makes them read faster b/c they are in local scope
  // $ works as alias for jQuery in here - ensures no conflict with other libs
  // R works as alias for Response in here - R.band(320) instead of Response.band(320)
  // window and document minify down to single letter vars

  var $body = $('body');

  $('#nav--global').headroom({
    'tolerance': 12,
    'offset': 0,
  });

  $(window).on('scroll_perf', function (event) {
    // body...
    // console.log(event.scrollTop);

    if (event.scrollTop > 0) {
      $('.nav--local').find('.ui--dropdown').css('background', 'none');
    } else {
      $('.nav--local').find('.ui--dropdown').css('background', '');
    }

  });

// TODO:
// get element
// find position
// apply class when window reaches the position


// TODO:
var sideNavTooltip = function () {
  // body...
  var nav       = $('#nav--local');
  var navHeight = nav.height();
  var tooltip   = nav.find('.nav--tooltip');
  var tooltipOffset   = tooltip.outerHeight() / 2;

  var currentPage       = $body.data('page');
  var navLinks = nav.find('li>a');


  $.fn.clickHandler = function () {
    // e.preventDefault();
    var $this = $(this);
    var elem = $this.parent();
    var coordinates = elem.position().top + (elem.height() / 2) - tooltipOffset;

    tooltip.transition({
      'top': coordinates
    });

    navLinks.removeClass('active');
    $this.addClass('active');

    return $this;
  };

  navLinks.filter(function() {
    return $(this).data('page') === currentPage;
  }).clickHandler();

  navLinks.on('click', function(e) {
    // e.preventDefault();
    $(this).clickHandler();
  });

  // console.log(currentPage);
  console.log(navLinks.eq(1));

};
// init
sideNavTooltip();



}(this, this.document, this.jQuery)); // in global scope, this === window
