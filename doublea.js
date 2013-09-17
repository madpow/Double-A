/*

	Double A - a development tool for resposive web design
	Original by Annette Arabasz (annettea@gmail.com) & Nick Snyder (nick@fasterhorses.co)
	Contributions by Aaron Boudreau (bluepop4@gmail.com)
	
	
	 --- USAGE -------------------- 
	
	$(document).ready(function() {
		$(this).doublea({
			baseFontSz: 16,
			format: 'em',
			breakpoints: [30, 40, 50, 60, 75],
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

	$.fn.doublea = function(options) {

		var defaults = {
			baseFontSz: 16,
			format: 'em',
			breakpoints: [30, 40, 50, 60, 75],
			colors: ['#ffb346', '#dfdd4a', '#44ce19', '#7bb8f7', '#c17bf7'],
			clrNames: ['Orange', 'Yellow', 'Green', 'Blue', 'Violet']
		},
		options = $.extend({}, defaults, options),
		breakpoints = {},
		windowSize = $(window).width(),
		$doubleA = $('<div/>', {
				id: 'doubleA',
				css: {
					background: '#de5968',
					'-webkit-border-radius': '4px 4px 0 0',
					'-moz-border-radius': '4px 4px 0 0',
					borderRadius: '4px 4px 0 0',		
					bottom: '0',
					color: 'white',
					fontSize: '.675em',
					left: '20px',
					lineHeight: '1.5em',
					padding: '6px 8px',
					position: 'fixed',
					textAlign: 'center',
					textShadow: '-1px -1px 0px rgba(0, 0, 0, 0.25)',
					zIndex: '9999' 
					}
			}).prependTo('body'),

		$winSz = $('<span/>', {
				class: 'winSz',
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

		$brkPt = $('<span/>', {
				class: 'brkPt',
				css: {
					display: 'inline-block',
					padding: '0 0.5em 0 0'
				}
			}).appendTo($doubleA),

		$clrName = $('<span/>', {
				class: 'clrName',
				css: {
					display: 'inline-block'
				}
			}).appendTo($doubleA),

		$swapMode = $('<a/>', {
				class: 'swapMode',
				css: {
					backgroundColor: '#fff',
					backgroundColor: 'rgba(255, 255, 255, 0.3)',
					'-webkit-border-radius': '2px',
					'-moz-border-radius': '2px',
					border: '1px solid #fff',
					borderRadius: '2px',
					color: '#fff',
					display: 'block',
					fontSize: '0.875em',
					fontWeight: 'bold',
					letterSpacing: '0.125em',
					marginTop: '0.75em',
					padding: '1px 4px',
					textAlign: 'center',
					textDecoration: 'none'
				},
				href: '#',
				text: 'Mode Swap'
			}).appendTo($doubleA);

		if (options.format === 'em') {		
			for (var i = 0; i < options.breakpoints.length; i++) {
				var key = i;
				breakpoints[key] = {
					point: emToPx(options.breakpoints[i]),
					color: options.colors[i],
					label: options.clrNames[i]
				}
			}			
		} else if (options.format === 'px') {			
			for (var i = 0; i < options.breakpoints.length; i++) {
				var key = i;
				breakpoints[key] = {
					point: options.breakpoints[i],
					color: options.colors[i],
					label: options.clrNames[i]
				}
			}
		}

		for (var i = 0; i < options.breakpoints.length; i++) {
		    if (windowSize < breakpoints[0]['point']) { 
			    $doubleA.css('background', breakpoints[0]['color']);
				$clrName.text(breakpoints[0]['label']);
				if (options.format === 'em') {
					$brkPt.text(breakpoints[i]['point']/options.baseFontSz + options.format);
				} else if (options.format === 'px') {
					$brkPt.text(breakpoints[i]['point'] + options.format);
				}
		    }

			if (windowSize >= breakpoints[i]['point'])  { 
				$doubleA.css('background', breakpoints[i]['color']);
				$clrName.text(breakpoints[i]['label']);
				if (options.format === 'em') {
					$brkPt.text(breakpoints[i]['point']/options.baseFontSz + options.format);
				} else if (options.format === 'px') {
					$brkPt.text(breakpoints[i]['point'] + options.format);
				}
			}
		}

		$swapMode.on('click', function(event) {
			event.preventDefault();
			if (options.format === 'em') {
				options.format = 'px';
			} else if (options.format === 'px') {
				options.format = 'em';
			}
			$(window).trigger('resize');
		});

		$(window).resize(function() {
			var windowMeasure = $(window).width();
			if (options.format === 'em') {
				$winSz.text(windowMeasure / options.baseFontSz + options.format);
			} else if (options.format === 'px') {
				$winSz.text(windowMeasure + options.format);
			}

			for (var i = 0; i < options.breakpoints.length; i++) {
				if (windowMeasure >= breakpoints[i]['point'])  { 
					$doubleA.css('background', breakpoints[i]['color']);
					$clrName.text(breakpoints[i]['label']);
					if (options.format === 'em') {
						$brkPt.text(breakpoints[i]['point'] / options.baseFontSz + options.format);
					} else if (options.format === 'px') {
						$brkPt.text(breakpoints[i]['point'] + options.format);
					}
				}
			}

		});

		function emToPx(num) {
			return num * options.baseFontSz;
		}
	}

})(jQuery);