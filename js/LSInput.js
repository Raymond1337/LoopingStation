export default class LSInput{
	chunks = [];
	receiver;
	mediaRecorder;
	clockTime;
	recordTime;
	delay = 0;
	inputFilter = null;
	
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
			console.log(this.chunks);	
			var blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
			console.log(blob);
			console.log('sending Blob');
			const audioURL = window.URL.createObjectURL(blob);
			var audio = new Audio(audioURL);
			
			// Apply Filter
			if(this.inputFilter != null){
				console.log('this.inputFilter != null');
				console.log(this.inputFilter);
				var context = new AudioContext();
				var source = context.createMediaElementSource(audio);
				var filter = this.inputFilter;
				
				//filter = context.createBiquadFilter();
				//filter.frequency.value = 70;
				//filter.gain.value = 200;
				//return filter;
				
				source.connect(filter);
				filter.connect(context.destination);
			}
			
			this.receiver.receiveAudio(audio);
			console.log('clear Chunks');
			this.chunks = [];
		}.bind(this);
		this.volumen = 1;
				
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
		this.recordTime = this.clockTime;
	}
		
	endRecordAndReceiveClip(memory){
		this.receiver = memory;
		this.mediaRecorder.stop();
	}	
	
	setupClockDelay(){
		this.clockTime = performance.now();
	}
	
	getDelay(){
		this.delay = performance.now() - this.recordTime;
		return this.delay;
	}
	
	setFilter(_filter){
		console.log('Filter set:');
		console.log(_filter);
		this.inputFilter = _filter;
	}
}