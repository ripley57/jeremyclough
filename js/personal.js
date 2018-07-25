
	function getEncryptedImageData(url) {
		const deferred = new $.Deferred(function(resolve, reject) {
	 		const request = new XMLHttpRequest();
			request.open('GET', url);
			request.onload = function() {
				if (request.status === 200) {
					deferred.resolve(request.response);
				} else {
					deferred.reject(Error(request.statusText));
				}
			};
			request.onerror = function() {
				reject(Error('Error fetching data.'));
			};
			// This triggers the asynchronous GET request.
			request.send();
		});	
		return deferred.promise();
	}

	function getDecryptedImageData(encrypted_data,password) {
		const deferred = new $.Deferred(function(resolve, reject) {
			// Resolve the promise. The following is synchronous AFAIK, so we are 
			// using a promise here simply so that we can chain our function calsl using "then".
			var decrypted_data = CryptoJS.AES.decrypt(encrypted_data.split(/\s/).join(''), password).toString(CryptoJS.enc.Base64);
			// We need to wrap this in a timeout to prevent "use before declaration" run-time error.
			setTimeout(function(){deferred.resolve(decrypted_data);}, 100);
		});
		return deferred.promise();
	}
			
	function displayDecryptedImage(decrypted_data,placeholder,id) {
		const deferred = new $.Deferred(function(resolve, reject) {
			var newImg = document.createElement("img");
			newImg.setAttribute('alt','If you can see this then the image decryption probably failed!');
			newImg.setAttribute('style', 'display:none'); // Start with image hidden.
			newImg.setAttribute('class', 'fadein'); // So we can later un-hide the image.
			newImg.setAttribute('id', id); // Set id so we can later resize the image.
			newImg.setAttribute('border', '2'); // Add image border to clearly indicate each page.
			newImg.onload = function() { 
				document.getElementById(placeholder).appendChild(newImg);
				deferred.resolve("Image decryption and display successful");
			};
			newImg.onerror = function() {
				console.log('Unable to display image. Decryption password is most likely incorrect.');
				deferred.reject(Error('Unable to display image'));
			};
			// I suspect this is what triggers the image loading.
			newImg.setAttribute('src', 'data:image/jpg;base64,' + decrypted_data);
		});
		return deferred.promise();
	}
			
	function decryptAndDisplaySingleImage(url,password,placeholder,id) {
		const deferred = new $.Deferred(function(resolve, reject) {
			var deferred_1 = getEncryptedImageData(url);
			deferred_1.done(function(encrypted_data) {
				var deferred_2 = getDecryptedImageData(encrypted_data,password);
				deferred_2.done(function(decrypted_data) {
					var deferred_3 = displayDecryptedImage(decrypted_data,placeholder,id);
					deferred_3.done(function() {
						console.log('Image displayed successfully: ' + basename(url));
						deferred.resolve('Image displayed successfully: ' + basename(url));
					})
					.fail(function() {
						deferred.reject(Error('Unable to display image: ' + basename(url)));
					});
				})
				.fail(function() {
					deferred.reject(Error('Unable to decrypt image data: ' + basename(url)));
				});
			})
			.fail(function() {
				deferred.reject(Error('Unable to get image data: ' + basename(url)));
			});
		});
		return deferred.promise();
	}

	function setFeedback(txt) {
		$('#decryption_feedback').html(txt);
	}
	function clearFeedback() {
		setFeedback('');
	}

	function basename(str) {
   		var base = new String(str).substring(str.lastIndexOf('/') + 1); 
    		if(base.lastIndexOf(".") != -1)       
        		base = base.substring(0, base.lastIndexOf("."));
   		return base;
	}
