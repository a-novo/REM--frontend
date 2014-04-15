// TODO:
// betterify this function at some point
// add back button functionality

var sideNavTooltip = function () {
  // body...
  var nav       = $('#nav--local');
  var navHeight = nav.height();
  var tooltip   = nav.find('.nav--local-tooltip');
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

var sideNavTooltip2 = {
  config: {
    nav        : $('#nav--local'),
    navHeight  : nav.height(),
    navTooltip : nav.find('.nav--local-tooltip'),
    navTooltipOffset : tooltip.outerHeight() / 2,
  },
  init: {

  }
};
