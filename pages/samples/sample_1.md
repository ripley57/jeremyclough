---
layout: sample
title: Samples
---
<div id="wrapper">
<div id="content_area">
<div id="content_body">
<h1>Sample 1</h1>

{% include sample_form.html %}

<div id="placeholder1"></div>
<div id="placeholder2"></div>
<div id="placeholder3"></div>
</div>
</div>

<script type="text/javascript">
function decryptAllImages() {
        setFeedback('Decrypting ...');
	var password = document.getElementById('password').value;
	var def1 = decryptAndDisplaySingleImage('../../assets/images/samples/SAMP01-1.jpg.encrypted',password,'placeholder1');
	def1.fail(function(err) {
		setFeedback(err);
	});
	def1.done(function() {
		var def2 = decryptAndDisplaySingleImage('../../assets/images/samples/SAMP01-2.jpg.encrypted',password,'placeholder2');
		def2.fail(function(err) {
			setFeedback(err);	
		});
		def2.done(function() {
			var def3 = decryptAndDisplaySingleImage('../../assets/images/samples/SAMP01-3.jpg.encrypted',password,'placeholder3');
			def3.fail(function(err) {
				setFeedback(err);	
			});
			def3.done(function() {
				// All images successfully decrypted and displayed. 
				// Which means we can now hide the password form.
				$("#form_password").toggle();
				// And let's now un-hide the images.
				$('.fadein').toggle('slow');
			});
		});
	});
}
</script>

{% include samples_list.html %}
{% include sample_active.html sample_id="'sample1'" %}
</div>
