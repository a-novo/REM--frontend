(function(window, document, $) { // put the vars you need and match them at the bottom

  // All 4 vars are localized in here - makes them read faster b/c they are in local scope
  // $ works as alias for jQuery in here - ensures no conflict with other libs
  // R works as alias for Response in here - R.band(320) instead of Response.band(320)
  // window and document minify down to single letter vars

  $('#nav--global').headroom({
    'tolerance': 12,
    'offset': 0,
  });

  $(window).on('scroll_perf', function (event) {
    // body...
    console.log(event.scrollTop);

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

$('');


}(this, this.document, this.jQuery)); // in global scope, this === window
