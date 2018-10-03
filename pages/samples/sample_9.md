---
layout: sample
title: Samples
---
<div id="wrapper">
<div id="content_area">
<div id="content_body">

<div id="sample">
<h2>sample 9</h2>
{% include password_form.html %}
{% include image_resize.html %}
<div id="placeholder1"></div>
<div id="placeholder2"></div>
</div>

</div>
</div>
{% include samples_list.html %}
{% include sample_active.html sample_id='"sample_9"' %}
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
	var def1 = decryptAndDisplaySingleImage('/jeremyclough/assets/images/samples/SAMP-355-1.jpg.encrypted',password,'placeholder1','img1');
	def1.fail(function(err) {
		setFeedback(err);
	});
	def1.done(function() {
	var def2 = decryptAndDisplaySingleImage('/jeremyclough/assets/images/samples/SAMP-355-2.jpg.encrypted',password,'placeholder2','img2');
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

