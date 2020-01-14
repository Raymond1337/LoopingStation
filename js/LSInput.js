export default class LSInput{
	chunks = [];
	receiver;
	mediaRecorder;
	clockTime;
	delay;
	constructor(_inputFilter, _timer){
		console.log("LSInput instantiated");
		this._stream
		this.timer = _timer;
		// Allow recording via microphone / system input
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		    console.log('getUserMedia supported.');
			  // constraints - only audio needed for this app
		    navigator.mediaDevices.getUserMedia ({audio: true})
				// Success callback
				.then(function(stream) {
					this.createMediaRecorder(_inputFilter, stream);
					this.instantiateBufferCreator();
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
		this.mediaRecorder = new MediaRecorder(stream);
		this.mediaRecorder.ondataavailable = function(e) {
			if(this.receiver == null){return;}
			console.log('pushing data to chunks');
			this.chunks.push(e.data);	
			// Shift record to match clock
			if(!this.receiver.isClock){
				//this.receiver.delay = this.getDelay();
			}		
			console.log(this.chunks);	
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
	
	setupClockDelay(){
		this.clockTime = performance.now();
	}
	
	getDelay(){
		this.delay = performance.now() - this.clockTime;
		console.log('Delay s:');
		console.log(this.delay / 1000);
		return this.delay;
	}
}