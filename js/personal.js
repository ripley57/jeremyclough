
		function decryptImage(image_path,placeholder) {
			jQuery.get(image_path, function(data) {
				var password = document.getElementById('password').value;
				var decrypted = CryptoJS.AES.decrypt(data.split(/\s/).join(''), password).toString(CryptoJS.enc.Base64);
				var newImg = document.createElement("img");
				
				newImg.setAttribute('alt','If you can see this then the image decryption failed!');
				newImg.setAttribute('src', 'data:image/jpg;base64,' + decrypted);
				
				// Start with image being hidden. 
				//newImg.setAttribute('style', 'display:none');
				//newImg.setAttribute('class', 'fadein');
				newImg.setAttribute('border', '5');
				
				newImg.addEventListener('error', function(){ 
					// Image decryption failed.
					document.getElementById("decryption_feedback").innerHTML = "Decryption failed!";
					// Blink the feedback message.
					$(".blink").animate({opacity:0},200,"linear",function(){
						$(this).animate({opacity:1},200);
					});
					// Then clear the feedback message.
					setTimeout(function(){
						document.getElementById("decryption_feedback").innerHTML = "";
					}, 2000);
				});
				if (newImg.complete) {
					console.log('1 placeholder=' + placeholder);
					// Image decryption successful.
					document.getElementById(placeholder).appendChild(newImg);
					// Display the image.
					//$('.fadein').toggle('slow');
				}
				else {
					console.log('2 placeholder=' + placeholder);
					newImg.addEventListener('load', function(){ 
						// Image decryption successful.
						document.getElementById(placeholder).appendChild(newImg);
						// Display the image.
						//$('.fadein').toggle('slow');
					});
				}
			});
		}
