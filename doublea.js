/*

	Double A - a development tool for resposive web design
	by Annette Arabasz (annettea@gmail.com) & Nick Snyder (nick@fasterhorses.co)
	Contributions by Aaron Boudreau (bluepop4@gmail.com)


	--- USAGE --------------------

	$(document).ready(function() {
		$(this).doublea({
			baseFontSz: 16,
			mobileFirst: true,
			format: 'px',
			breakpoints: [480, 600, 700, 800, 1000],
			mobileColor: '#444',
			colors: ['#ffb346', '#dfdd4a', '#44ce19', '#7bb8f7', '#c17bf7'],
			clrNames: ['Orange', 'Yellow', 'Green', 'Blue', 'Violet']
		});
	});

	--- MIT LICENSE --------------------

	Copyright (c) 2013 Annette Arabasz & Nick Snyder

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


*/

(function($) {

	$.fn.doublea = function(opt) {

		var defaults = {
				baseFontSz: 16,
				mobileFirst: true,
				format: 'px',
				breakpoints: [480, 600, 700, 800, 1000],
				mobileColor: '#444',
				colors: ['#ffb346', '#dfdd4a', '#44ce19', '#7bb8f7', '#c17bf7'],
				clrNames: ['Orange', 'Yellow', 'Green', 'Blue', 'Violet']
			},
			options = $.extend({}, defaults, opt),
			breakpoints = {},
			windowSize = $(window).width(),
			// Main double A wrapper
			$doubleA = $('<div/>', {
					'class': 'isDown',
					id: 'doubleA',
					css: {
						background: '#444',
						'-webkit-border-radius': '0 4px 0 0',
						'-moz-border-radius': '0 4px 0 0',
						borderRadius: '0 4px 0 0',
						bottom: '0',
						color: 'white',
						fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
						fontSize: '11px',
						left: '10px',
						lineHeight: '1.5em',
						padding: '6px 8px',
						position: 'fixed',
						textAlign: 'center',
						textShadow: '-1px -1px 0px rgba(0, 0, 0, 0.25)',
						zIndex: '9999'
					}
			}).prependTo('body'),
			// Current window size box
			$winSz = $('<span/>', {
					'class': 'winSz',
					css: {
						borderBottom: '1px solid #fff',
						clear: 'both',
						display: 'block',
						fontSize: '1.125em',
						fontWeight: 'bold',
						marginBottom: '0.25em',
						paddingBottom: '0.125em'
					},
					text: function() {
						if (options.format === 'em') {
							$(this).text($(window).width() / options.baseFontSz + options.format);
						} else if (options.format === 'px') {
							$(this).text($(window).width() + options.format);
						}
					}
			}).prependTo($doubleA),
			// Current breakpoint box
			$brkPt = $('<span/>', {
					'class': 'brkPt',
					css: {
						display: 'inline-block',
						padding: '0 0.5em 0 0'
					}
			}).appendTo($doubleA),
			// Color or breakpoint name box
			$clrName = $('<span/>', {
					'class': 'clrName',
					css: {
						display: 'inline-block'
					}
			}).appendTo($doubleA),
			// Swap mode from px/em button
			$swapMode = $('<a/>', {
					'class': 'swapMode',
					css: {
						backgroundColor: 'rgba(255, 255, 255, 0.3)',
						border: '1px solid #fff',
						'-webkit-border-radius': '2px',
						'-moz-border-radius': '2px',
						borderRadius: '2px',
						color: '#fff',
						display: 'block',
						fontSize: '0.875em',
						fontWeight: 'bold',
						letterSpacing: '0.025em',
						marginTop: '0.75em',
						padding: '1px 4px',
						textAlign: 'center',
						textDecoration: 'none'
					},
					href: '#',
					text: 'Mode Swap'
			}).appendTo($doubleA),
			// Button to minimize/maxamize double A
			$trigger = $('<div/>', {
					'class': 'trigger',
					css: {
						background: '#de5968',
						'-webkit-border-radius': '2px 2px 0 0',
						'-moz-border-radius': '2px 2px 0 0',
						borderRadius: '2px 2px 0 0',
						color: '#fff',
						cursor: 'pointer',
						height: '16px',
						left: '0',
						lineHeight: '1',
						padding: '2px 7px',
						position: 'absolute',
						top: '-16px'
					},
					html: '&curren;'
			}).prependTo($doubleA);

		function emToPx (num) {
			return num * options.baseFontSz;
		}

		function changeBreakpoint (winW) {
			if (options.format === 'em') {
				$winSz.text(winW / options.baseFontSz + options.format);
			} else if (options.format === 'px') {
				$winSz.text(winW + options.format);
			}

			if (options.mobileFirst && (winW < breakpoints[0].point) ) {

				$doubleA.add($trigger).css('background', options.mobileColor);
				$clrName.text('mobile');
				$brkPt.hide(0);

			} else {

				// Show breakpoint box if hidden
				if (!$brkPt.is('visible')) { $brkPt.show(0); }

				if (!options.mobileFirst && (winW < breakpoints[0].point)) {
					// no mobile first and below smallest breakpoint info
					$doubleA.add($trigger).css('background', breakpoints[0].color);
					$clrName.text(breakpoints[0].label);
					if (options.format === 'em') {
						$brkPt.text(breakpoints[0].point / options.baseFontSz + options.format);
					} else if (options.format === 'px') {
						$brkPt.text(breakpoints[0].point + options.format);
					}
				} else {
					// display current breakpoint info
					for (var i = 0; i < options.breakpoints.length; i++) {
						if (winW >= breakpoints[i].point)  {
							$doubleA.add($trigger).css('background', breakpoints[i].color);
							$clrName.text(breakpoints[i].label);
							if (options.format === 'em') {
								$brkPt.text(breakpoints[i].point / options.baseFontSz + options.format);
							} else if (options.format === 'px') {
								$brkPt.text(breakpoints[i].point + options.format);
							}
						}
					}
				}
			}
		}

		// Create breakpoint object
		for (var i = 0; i < options.breakpoints.length; i++) {
			var key = i,
				bPoint;

			if (options.format === 'em') {
				bPoint = emToPx(options.breakpoints[i]);
			} else if (options.format === 'px') {
				bPoint = options.breakpoints[i];
			}

			breakpoints[key] = {
				point: bPoint,
				color: options.colors[i],
				label: options.clrNames[i]
			};
		}

		$swapMode.on('click', function(event) {
			event.preventDefault();
			if (options.format === 'em') {
				options.format = 'px';
			} else if (options.format === 'px') {
				options.format = 'em';
			}
			changeBreakpoint(windowSize);
		});

		$trigger.on('click', function() {
			if ($doubleA.hasClass('isDown') ) {
				$doubleA.animate({bottom: - $doubleA.outerHeight() + 'px'}, 300);
				$doubleA.removeClass('isDown');
			} else {
				$doubleA.animate({bottom: '0'}, 300);
				$doubleA.addClass('isDown');
			}
		});

		$(window).resize(function() {
			windowSize = $(window).width();
			changeBreakpoint(windowSize);
		});

		// init double A
		changeBreakpoint(windowSize);

	};

})(jQuery);