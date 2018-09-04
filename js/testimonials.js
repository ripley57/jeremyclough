
var testimonials_array_orig = testimonials_data;
var testimonials_array = testimonials_array_orig.slice(0); // Clone original array.
function getNextTestimonial() {
	if (testimonials_array.length == 0) {
		// Run out of testimonials in the acive array,
		// so create a new clone of the orignal array.
		testimonials_array = testimonials_array_orig.slice(0);
	}

	// Randomly select a testimonial to display.
	var t_idx = Math.floor(Math.random() * (testimonials_array.length));

        var testimonial_txt = testimonials_array[t_idx].testimonial;

	// Create redaction block characters, if any are present.
	// A redaction character is denoted by "XX" in the string.
	// See http://www.fileformat.info/info/unicode/char/2588/index.htm
	testimonial_txt = testimonial_txt.replace(/XX/g, "&#9608;&#9608;"); 

        var t_testimonial = '<span class="t_testimonial">"' + testimonial_txt + '"</span>';
	var t_jobtitle    = '<div class="t_jobtitle">'    + testimonials_array[t_idx].jobtitle    + '</div>';
	var t_html = t_testimonial + '<br/><br/>' + t_jobtitle;

	// Remove the testimonal from the active array.
	testimonials_array.splice(t_idx,1);

	return t_html;
}


// Our colours array.
// Colour picker, giving you the '#nnnnnn' value: https://html-color-codes.info/
// Enter the '#nnnnnn' value and see the colour: https://www.w3schools.com/colors/colors_hexadecimal.asp
var colors = [];
colors.push('#EFFBEF'); 	// Pale blue.
colors.push('#F8E0E6'); 	// Pale purple.
colors.push('#D8D8D8'); 	// Gray.
colors.push('#E0F8E0');		// Pale green.
				
var paused = false;
function makeDiv() {
	// Creating slightly varying size of div.
	var divsizeH = ((Math.random()*40)  + 140).toFixed();
	var divsizeW = ((Math.random()*100) + 600).toFixed();
		
	// Center the div.
	var posy = $(window).height()/2 - divsizeH/2 - 10; // Up a bit more.
	var posx = $(window).width()/2 - divsizeW/2;

	// Randomly pick a colour.
	var color = colors[Math.floor(Math.random() * colors.length)]; 
	
	// Create a new div, if not paused by the user.
	if (paused == false) {
		$newdiv = $('<div>', {
				'class'			: "testimonial_div",
				css : {
				'width'            	: divsizeW+'px',
				'height'           	: divsizeH+'px',
				'borderRadius'     	: '1em',
				/* 
				** Hide the div box.
				'background-color' 	: color,
				'border'           	: '1px solid black',
				'box-shadow'       	: '5px 5px grey',
				*/
				'position'		: 'absolute',
				'left'     		: posx+'px',
				'top'      		: posy+'px',
				'display'  		: 'none',
				'text-align'		: 'center', 
				'font-family'		: 'arial, sans-serif, "times roman"',
				'font-size'		: 'small',
				'padding'     		: '20px 20px 20px 20px'
				}
			}).appendTo('body').append(getDivText()).fadeIn(1000);
								
		// Auto-remove this new div after a delay, then create the next one.
		$newdiv.delay(10000).fadeOut(1000, function() {
			$(this).remove();
			makeDiv();
		});
	}
}
			
function getDivText()
{
	var txt = getNextTestimonial();
	return txt;
}
			
function onDivsBtn()
{
	var txt = $('#divs_btn').text();
	if (txt == "Pause") {
		// Pause drawing divs and change button text to "Resume".
					
		// Stop any in-progress fadeOut/fadeIn. We want to prevent a div
		// from fading-out if the user has pressed the "Pause" button.
		// 1st boolean arg : clear the event queue for this element.
		// 2nd boolean arg : skip to the end of the current fadeIn/fadeOut for this element.
		$('.testimonial_div').last().stop(true,false);

		$('#divs_btn').text("Resume");
		paused = true;
	}
	else {
		// Resume drawing divs and change button text to "Pause".
					
		// Clear existing div.
		$('.testimonial_div').remove();

		$('#divs_btn').text("Pause");

		// Resume drawing divs.
		paused = false;
		makeDiv();
	}

}

