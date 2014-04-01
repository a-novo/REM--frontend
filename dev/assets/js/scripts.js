// Returns a number whose value is limited to the given range.
//
// Example: limit the output of this computation to between 0 and 255
// (x * 255).clamp(0, 255)
//
// @param {Number} min The lower boundary of the output range
// @param {Number} max The upper boundary of the output range
// @returns A number in the range [min, max]
// @type Number
//
// clamp func
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

(function($,sr){
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          }

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 200);
      };
  };
	// smartresize
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


(function(window, document, $) { // put the vars you need and match them at the bottom

  // All 4 vars are localized in here - makes them read faster b/c they are in local scope
  // $ works as alias for jQuery in here - ensures no conflict with other libs
  // R works as alias for Response in here - R.band(320) instead of Response.band(320)
  // window and document minify down to single letter vars

  var $window = $(window);
  var $body = $('body');

  var scrollPos = 0;

  $('#nav--global').headroom({
    'tolerance': 12,
    'offset': 0,
  });

  $window.on('scroll_perf', function (event) {
    // body...
    // console.log(event.scrollTop);
    scrollPos = event.scrollTop;
    // console.log(scrollPos);

    if (event.scrollTop > 0) {
      $('.nav--local').find('.ui--dropdown').css('background', 'none');
    } else {
      $('.nav--local').find('.ui--dropdown').css('background', '');
    }

    updateTop();

  });

  $(window).smartresize(function(){
    // code that takes it easy...
    console.log('hello');
    myFunc();
  });

// TODO:
// get element
// find position
// apply styles

var updateTop;
var myFunc = function (argument) {
  // body...
  var filterObj       = $('.module--f');
  var filterContainer = filterObj.parent();
  var targetWidth     = filterContainer.width();
  var targetPos       = filterContainer.offset();

  console.log(targetWidth, targetPos);

  filterObj.css({
    width: targetWidth,
    position: 'fixed'
  });

  updateTop = function () {
    // body...
    var targetTop = (targetPos.top - scrollPos).clamp(0, targetPos.top);
    console.log(targetTop);

    filterObj.css({top: targetTop + 'px'});
  };

};
myFunc();


// TODO:
// betterify this function at some point
// add back button functionality

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
