---
layout: sample
title: Samples
---
<div id="wrapper">
<div id="content_area">
<div id="content_body">
<h1>Sample 1</h1>

	<form id="form_decrypt" name="f">
	Password:&nbsp;<input type="text" id="password" size="20" value="" />
	<input type="button" onclick="decryptAllImages();" value="Decrypt" />
	<p id="decryption_feedback" class="blink"></p>
	</form>

	<div id="placeholder1"></div>
	<div id="placeholder2"></div>
	<div id="placeholder3"></div>
</div>
</div>
	<script type="text/javascript">
	function decryptAllImages() {
		document.getElementById("decryption_feedback").innerHTML = "";

		decryptImage('../../assets/images/samples/SAMP01-1.jpg.encrypted','placeholder1');
		decryptImage('../../assets/images/samples/SAMP01-2.jpg.encrypted','placeholder2');
		decryptImage('../../assets/images/samples/SAMP01-3.jpg.encrypted','placeholder3');
	}
	</script>

    {% include samples_list.html %}

    {% include sample_active.html sample_id="'sample1'" %}
</div>
