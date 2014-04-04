/*
 * scroll_perf: special jquery plugin using requestAnimationFrame for scrolling events
 *
 * latest version and complete README available on Github:
 * https://github.com/Sirk/scroll_perf
 *
 * Released under the MIT Licence
 *
 * Inspired by LouisRemi jquery-smartresize : https://github.com/louisremi/jquery-smartresize
 */

(function($) {

    "use strict";

    var raf = window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 60);
              };

    // Caching some reusable variables
    var scrollPerf,
        uid = 'scroll_perf.ID',
        unique = 0,
        scrollTop;


    // Wrapper
    scrollPerf = $.event.special.scroll_perf = {

        elements:{},

        scrollHandler:function(event) {
            var spe = scrollPerf.elements[ $(this).data(uid) ];

            // Don't do nothing if we are busy
            if ( spe.isBusy ) return false;

            // Wainting for the next frame available
            raf(function() {

                spe.isBusy = true;
                spe.scrollTop = spe.$el.scrollTop();
                spe.$el.trigger('scroll_perf');

            });
        },

        remove:function(handleObj) {

            var $el = $(this);

            // Remove the element reference
            $el.removeData(uid);

            // Delete the elements object
            delete scrollPerf.elements[ $el.data(uid) ];

        },

        _default:function(event) {

            // On callback, we are not busy anymore
            scrollPerf.elements[ $(event.currentTarget).data(uid) ].isBusy = false;

        },

        add:function(handleObj, b, c, d) {
            var $el,
                oldHandler,
                id = unique++,
                hasBeenRegistered = false;

            // Get the target element, delegated or not
            $el = typeof handleObj.selector !== 'undefined' ? $(this).find(handleObj.selector) : $(this);

            // Check if new element is already elements
            if ( typeof $el.data(uid) !== 'undefined' ) {
                return false;
            }

            // Set the scroll_perf ID to the element
            $el.data('scroll_perf.ID', id);

            // Registering the element
            scrollPerf.elements[id] = {
                $el  : $el,
                scrollTop : $el.scrollTop(),
                isBusy    : false
            };

            // Bind scroll event
            $el.on('scroll', scrollPerf.scrollHandler);

            // Save a reference to the bound event handler.
            oldHandler = handleObj.handler;

            handleObj.handler = function( event ) {

                // Prevent window to be triggered for window child elements
                event.stopPropagation();

                // Getting new scrolltop position for current element
                event.scrollTop = scrollPerf.elements[ $(this).data(uid) ].scrollTop;

                // Call the originally-bound event handler and return its result.
                return oldHandler.apply( this, arguments );
            };

        }
    };

})(jQuery);
