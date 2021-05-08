/*!
 * jQuery Visibility Plugin v1.0.0 (2019-05-31)
 * https://github.com/alexanevsky/visibility
 *
 * Copyright 2019 Alexanevsky (https://lashchevsky.me)
 *
 * Released under the MIT license.
 *
 */

(function($) {

    function visibility(el, action, inputOpt, inputDisplay, inputComplete) {

        var $el = $(el);
        var duration = 400;
        var durationSlide = 0; // speed * .75 ceil
        var durationOpacity = 0; // speed * .75 floor
        var delay = 0; // speed half round
        var display = 'block';
        var easing = 'swing';
        var start = null;
        var complete = null;

        if ($.type(inputOpt) !== 'undefined' && $.type(inputOpt) !== 'number' && $.type(inputOpt) !== 'string' && $.type(inputOpt) !== 'object') {
            console.error('visibilityToggle() parameter "duration" is incorrect');
            return;
        }

        else if ($.type(inputDisplay) !== 'undefined' && $.type(inputDisplay) !== 'string' && $.type(inputDisplay) !== 'function') {
            console.error('visibilityToggle() parameter "display" is incorrect');
            return;
        }

        else if ($.type(inputComplete) !== 'undefined' && $.type(inputComplete) !== 'function') {
            console.error('visibilityToggle() parameter "complete" is incorrect');
            return;
        }

        if ($.type(inputOpt) === 'object') {

            if (inputOpt.duration) {
                if ($.type(inputOpt.duration) === 'number')
                    duration = inputOpt.duration;
                else if ($.type(inputOpt.duration) === 'string' && inputOpt.duration == 'fast')
                    duration = 200;
                else if ($.type(inputOpt.duration) === 'string' && inputOpt.duration == 'normal')
                    duration = 400;
                else if ($.type(inputOpt.duration) === 'string' && inputOpt.duration == 'slow')
                    duration = 600;
                else console.error('visibilityToggle() parameter "duration" is incorrect');
            }

            if (inputOpt.display) {
                if ($.type(inputOpt.display) === 'string') display = inputOpt.display;
                else console.error('visibilityToggle() parameter "display" is incorrect');
            }

            if (inputOpt.easing) {
                if ($.type(inputOpt.easing) === 'string') easing = inputOpt.easing;
                else console.error('visibilityToggle() parameter "easing" is incorrect');
            }

            if (inputOpt.start) {
                if ($.type(inputOpt.start) === 'function') start = inputOpt.start;
                else console.error('visibilityToggle() parameter "start" is incorrect');
            }

            if (inputOpt.complete) {
                if ($.type(inputOpt.complete) === 'function') complete = inputOpt.complete;
                else console.error('visibilityToggle() parameter "complete" is incorrect');
            }
        }
        else if ($.type(inputOpt) === 'number' || $.type(inputOpt) === 'string') {

            if ($.type(inputOpt) === 'number')
                duration = inputOpt;
            else if ($.type(inputOpt) === 'string' && inputOpt == 'fast')
                duration = 200;
            else if ($.type(inputOpt) === 'string' && inputOpt == 'normal')
                duration = 400;
            else if ($.type(inputOpt) === 'string' && inputOpt == 'slow')
                duration = 600;
            else console.error('visibilityToggle() parameter "duration" is incorrect');

            if ($.type(inputDisplay) === 'function')
                complete = inputDisplay;

            else if ($.type(inputDisplay) === 'string')
                display = inputDisplay;

            if ($.type(inputDisplay) !== 'function' && $.type(inputComplete) === 'function')
                complete = inputComplete;
        }

        durationSlide = Math.ceil(duration * .75);
        durationOpacity = Math.floor(duration * .75);
        delay = Math.round(duration/2);

        if (start)
            start();

        if (action == 'hide') {
            $el.animate({'opacity': 0}, durationOpacity);
            $el.delay(delay).slideUp({duration: durationSlide, easing: easing});

        } else {
            $el.slideDown({duration: durationSlide, easing: easing});

            if (display != 'block') {
                $el.css('display', display);
            }

            $el.delay(delay).animate({'opacity': 1}, durationOpacity);
        }

        if (complete) {
            setTimeout(function() {
                complete();
            }, duration);
        }
    }

    $.fn.visibilityToggle = function(inputOpt, inputDisplay, inputComplete) {
        if ( $(this).is(':visible') )
            visibility($(this), 'hide', inputOpt, inputDisplay, inputComplete);
        else if ( $(this).is(':hidden') )
            visibility($(this), 'show', inputOpt, inputDisplay, inputComplete);
    };

    $.fn.visibilityShow = function(inputOpt, inputDisplay, inputComplete) {
        visibility($(this), 'show', inputOpt, inputDisplay, inputComplete);
    };

    $.fn.visibilityHide = function(inputOpt, inputDisplay, inputComplete) {
        visibility($(this), 'hide', inputOpt, inputDisplay, inputComplete);
    };
}(jQuery));