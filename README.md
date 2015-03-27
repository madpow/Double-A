# Double A
## A responsive tool for locating breakpoints in a stylesheet
#### Original by Annette Arabasz ([arabasz.com](http://arabasz.com)) & Nick Snyder ([fasterhorses.co](http://fasterhorses.co))
#### Contributions by Aaron Boudreau ([flylightmedia.com/aaron/](http://www.flylightmedia.com/aaron/))

Double A is a responsive tool for locating named breakpoints in a stylesheet. It is helpful for locating the area of your CSS issue without having to open the web inspector. 

Double A works by appending a fixed tab to the bottom of your webpage that shows both the current pixel width of the viewport and a color. The color of the tab is representative of the area where the CSS error will happen. While you can assign your own colors, we suggest sticking with the ROYGBIV mnemonic, as it is easy to remember.

#### Demo
[You can test out Double A by clicking here](http://mad-pow.github.io/Double-A/)

You can easily adjust the breakpoints and the colors by passing in different parameters. Please refer to the sample code below:

#### Code Examples

##### Pixel based code example

```
	$(document).ready(function() {
		$(this).doublea({
			baseFontSz: 16,
			mobileFirst: false,
			format: 'px',
			breakpoints: [480, 600, 700, 800, 1000],
			mobileColor: '#444',
			colors: ['#ffb346', '#dfdd4a', '#44ce19', '#7bb8f7', '#c17bf7'],
			clrNames: ['Orange', 'Yellow', 'Green', 'Blue', 'Violet']
		});
	});
```

##### EM based code example

```
	$(document).ready(function() {
		$(this).doublea({
			baseFontSz: 16,
			mobileFirst: true,
			format: 'em',
			mobileColor: '#5f9ea0',
			breakpoints: [30, 50, 60, 80],
			colors: ['#1e90ff', '#1c86ee', '#1874cd', '#104e8b'],
			clrNames: ['$bp-sm', '$bp-md', '$bp-lg', '$bp-xlg']
		});
	});
```

#### Default Parameters
* **baseFontSz** | _Integer_ | (default: 16) Allows you to set a base font-size for Double A
* **mobileFirst** | _Boolean_ | (default: true) Setting to false will show the smallest breakpoint info when window size below smallest breakpoint
* **format** | _String_ | (default: 'px') Allows you to choose whether your breakpoints will be EM or pixel-based. Can be 'em' or 'px'
* **breakpoints** | _Array_ | The breakpoints you'd like to test against. If in the previous parameter you chose 'em', be sure to use 30 rather than 480, for example
* **mobileColor** | _String_ | Array of colors for each breakpoint
* **colors** | _Array_ | The colors for each of the corresponding breakpoints in the previous parameter
* **clrNames** | _Array_ | Names for either colors or breakpoints (if using SASS or LESS you can display the breakpoint variable name)

**The number of items in breakpoints[], colors[] and clrNames[] should be the same.**