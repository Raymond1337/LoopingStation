export default class LSInput{
	chunks = [];
	mediaRecorder;
	constructor(_inputFilter){
		console.log("LSInput instantiated");
		this._stream
		// Allow recording via microphone / system input
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		    console.log('getUserMedia supported.');
			  // constraints - only audio needed for this app
		    navigator.mediaDevices.getUserMedia ({audio: true})
				// Success callback
				.then(function(stream) {
					console.log(this);
					this.createMediaRecorder(_inputFilter, stream);
				}.bind(this))
				// Error callback
				.catch(function(err) {
					console.log('The following getUserMedia error occured: ' + err);
				}
		    );
		} else {
		   console.log('getUserMedia not supported on your browser!');
		}
	}
	
	createMediaRecorder(_inputFilter, stream){
		// Create Recorder
		this.mediaRecorder = new MediaRecorder(stream);
		//Exeption was thrown
		this.mediaRecorder.ondataavailable = function(e) {
			this.chunks.push(e.data);
		}.bind(this);
		this.volumen = 1;
		this.inputFilter = _inputFilter;
				
		this.mediaRecorder.onstop = function(e) {
			console.log("recorder stopped");
			//this.chunks = [];
		}.bind(this);
		
		console.log('MediaRecorder enabled and allowed');
	}
	
	setVolumen(volumenInPercent){
		if(volumenInPercent < 0 || volumenInPercent > 1){
			return;
		}
		this.volumen = volumenInPercent;
	}
	
	startRecord(){
		this.mediaRecorder.start();
	}
	
	endRecordAndReceiveClip(){
		var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
		const audioURL = window.URL.createObjectURL(blob);
		this.mediaRecorder.stop();
		console.log(blob);
		return audioURL;
	}	
}