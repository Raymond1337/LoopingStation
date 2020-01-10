export default class LSInput{
	chunks = [];
	mediaRecorder;
	receiver;
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
			console.log('pushing data to chunks');
			this.chunks.push(e.data);		
			var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
			console.log(blob);
			console.log('sending Blob');
			this.receiver.reciveBlob(blob);
			console.log('clear Chunks');
			this.chunks = [];
		}.bind(this);
		this.volumen = 1;
		this.inputFilter = _inputFilter;
				
		this.mediaRecorder.onstop = function(e) {
			console.log("recorder stopped");
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
	
	endRecordAndReceiveClip(memory){
		this.receiver = memory;
		this.mediaRecorder.stop();
	}	
}