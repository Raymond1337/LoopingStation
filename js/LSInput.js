export default class LSInput{
	chunks = [];
	mediaRecorder;
	constructor(_inputFilter, stream){
		console.log("LSInput instantiated");
		// Allow recording via microphone / system input
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		    console.log('getUserMedia supported.');
			  // constraints - only audio needed for this app
		    navigator.mediaDevices.getUserMedia ({audio: true})
				// Success callback
				.then(function(stream) {
					// Create Recorder
					this.mediaRecorder = new MediaRecorder(stream);	
					this.mediaRecorder.ondataavailable = function(e) {
						chunks.push(e.data);
					}
					this.volumen = 1;
					this.inputFilter = _inputFilter;
							
					this.mediaRecorder.onstop = function(e) {
						console.log("recorder stopped");

						const clipName = prompt('Enter a name for your sound clip');

						const clipContainer = document.createElement('article');
						const clipLabel = document.createElement('p');
						const audio = document.createElement('audio');
						const deleteButton = document.createElement('button');
							   
						clipContainer.classList.add('clip');
						audio.setAttribute('controls', '');
						deleteButton.innerHTML = "Delete";
						clipLabel.innerHTML = clipName;

						clipContainer.appendChild(audio);
						clipContainer.appendChild(clipLabel);
						clipContainer.appendChild(deleteButton);
						soundClips.appendChild(clipContainer);

						const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
						chunks = [];
						const audioURL = window.URL.createObjectURL(blob);
						audio.src = audioURL;
					}
			  })
			  // Error callback
			  .catch(function(err) {
				 console.log('The following getUserMedia error occured: ' + err);
			  }
		    );
		} else {
		   console.log('getUserMedia not supported on your browser!');
		}
	}
	
	setVolumen(volumenInPercent){
		if(volumenInPercent < 0 || volumenInPercent > 1){
			return;
		}
		this.volumen = volumenInPercent;
	}
	
	startRecord(){
		alert('rec start');
		this.mediaRecorder.start();
	}
	
	endRecordAndReceiveClip(){
		this.mediaRecorder.stop();
		return this.chunks;
	}	
}