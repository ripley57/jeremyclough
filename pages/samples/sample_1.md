---
layout: sample
title: Samples
---
<div id="wrapper">
<div id="content_area">
<div id="content_body">
<h2>sample 1</h2>

{% include sample_form.html %}
{% include sample_resize.html %}

<div id="placeholder1"></div>
<div id="placeholder2"></div>
</div>
</div>

<script type="text/javascript">
function growImages() {
	 growImage('#img1');
	 growImage('#img2');
}

function shrinkImages() {
	 shrinkImage('#img1');
	 shrinkImage('#img2');
}

function decryptAllImages() {
        setFeedback('Decrypting ...');
	var password = document.getElementById('password').value;
	var def1 = decryptAndDisplaySingleImage('../../assets/images/samples/SAMP01-1.jpg.encrypted',password,'placeholder1','img1');
	def1.fail(function(err) {
		setFeedback(err);
	});
	def1.done(function() {
	var def2 = decryptAndDisplaySingleImage('../../assets/images/samples/SAMP01-2.jpg.encrypted',password,'placeholder2','img2');
	def2.fail(function(err) {
		setFeedback(err);	
	});
	def2.done(function() {
		$("#form_password").toggle();		// Hide the password form.
		$('.fadein').toggle('slow');		// Un-hide the images.
		$("#sample_resize_buttons").toggle();	// Un-hide image resize buttons.
	});
	});
}
</script>
{% include samples_list.html %}
{% include sample_active.html sample_id="'sample1'" %}
</div>

