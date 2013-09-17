# Double A
## A responsive tool for locating breakpoints in a stylesheet
#### Original by Annette Arabasz ([arabasz.com](http://arabasz.com)) & Nick Snyder ([fasterhorses.co](http://fasterhorses.co))
#### Contributions by Aaron Boudreau ([flylightmedia.com/aaron/](http://www.flylightmedia.com/aaron/))

Double A is a responsive tool for locating named breakpoints in a stylesheet. It is helpful for locating the area of your CSS issue without having to open the web inspector. 

Double A works by appending a fixed tab to the bottom of your webpage that shows both the current pixel width of the viewport and a color. The color of the tab is representative of the area where the CSS error will happen. While you can assign your own colors, we suggesting sticking with the ROYGBIV mnemonic, as it is easy to remember.

You can easily adjust the breakpoints and the colors by passing in different parameters. Please refer to the sample code below:

#### Code Example
    $(document).ready(function() {
        $(this).doublea({
            baseFontSz: 16,
            format: 'em',
            breakpoints: [30, 40, 50, 60, 75],
            colors: ['#ffb346', '#dfdd4a', '#44ce19', '#7bb8f7', '#c17bf7'],
            clrNames: ['Orange', 'Yellow', 'Green', 'Blue', 'Violet']
        });
    });

#### Default Parameters
* baseFontSz: 16,    // Numbers
* * Allows you to set a font-size for Double A
* format: 'em',    // String
* * Allows you to choose whether your breakpoints will be EM or pixel-based. 
* breakpoints: [],         // Array
* * The breakpoints you'd like to test against. If in the previous parameter you chose 'em', be sure to use 30 rather than 480, for example.
* colors: [],              // Array
* * The colors for each of the corresponding breakpoints in the previous parameter. **The number of items in both breakpoints[] and colors[] should match**.

