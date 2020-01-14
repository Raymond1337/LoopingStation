export default class Memory{	

	constructor(_name, _inputFilter, _outputFilter, _reference){
		console.log("Memory instantiated");
		this.loopstation;
		this.name = _name;
		this.volumen = 1;
		this.outputFilter = _outputFilter; //Get outputfilter from Loopstation
		this.inputFilter = _inputFilter;
		this.blob;
		this.audio;
		this.createUI();
		this.isRecording = false;
		this.isPlaying = true;
		this.isClock;
		this.delay = 0;
		this.delayShift = 100; // compensates inpud lag
	}
	
	record(){
		console.log("record pressed");
		this.inputFilter.startRecord();
		this.delay = this.inputFilter.getDelay() - this.delayShift;
		console.log("delay: ");
		console.log(this.delay);
	}
	
	playSound(){
		//console.log("play pressed");
		setTimeout(function(){
		if(this.audio == null){return;}
			this.audio.play();
			}.bind(this), this.delay)
		//this.audio.play();
	}
	
	stopSound(){
		//console.log("stop pressed");
		if(this.audio == null){return;}
		this.audio.pause();
		this.audio.currentTime = 0; // bc there is no stop function
	}

	stopRecord(){
		this.inputFilter.endRecordAndReceiveClip(this);
	}
	
	setTimer(timer){
		timer.setClock(audio.duration);
	}
	
	setLoopstation(_loopstation){
		this.loopstation = _loopstation;
		this.isClock = (this == this.loopstation.memoryArray[0]);
	}
	
	reciveBlob(_blob){
		console.log("Blob received:");
		console.log(_blob);
		this.blob = _blob;
		const audioURL = window.URL.createObjectURL(this.blob);
		this.audio = new Audio(audioURL);
		
		if(this.isClock){
			// Duration is only getable if metadata has loaded
			this.audio.onloadedmetadata = function() {
				this.loopstation.timer.setClock(this.audio.duration);
			}.bind(this);
		}
	}
	
	pressRecordButton(){
		if(!this.isRecording){
			this.record();
		}else{
			this.stopRecord();
		}
		this.isRecording = !this.isRecording ;
	}
	
	deleteFile(){
		if(this.audio == null){return;}
		this.audio.pause();
		this.audio = null;
	}
	
	unMuteSound(){
		this.audio.volume = this.volumen;
	}
	
	muteSound(){
		this.audio.volume = 0;
	}
	
	setVolumen(volumenInPercent){
		if(volumenInPercent < 0 || volumenInPercent > 1){
			return;
		}
		this.volumen = volumenInPercent
		this.audio.volume = volumen;
	}
	
	receiveBlob(_blob){
		console.log("Blob received");
		console.log(_blob);
		this.blob = _blob;
		const audioURL = window.URL.createObjectURL(this.blob);
		this.audio = new Audio(audioURL);
		console.log(this.audio);
	}

	pressPlayPauseButton(){
		if(!this.isPlaying){
			this.unMuteSound();
			console.log('Play sound');
		}else{
			this.muteSound();
			console.log('Stop sound');
		}
		this.isPlaying = !this.isPlaying;
		var icon = $('#' + 'play' + this.name.replace(" / CLOCK", ""));
		icon.toggleClass('active');
	}
	
	createUI(){
		const soundClips = document.querySelector('.memory');
		const clipName = 'MEMORY ' + this.name;
		const container = document.createElement('article');
		const clipLabel = document.createElement('p');
		const audio = document.createElement('audio');
		const recordButton = document.createElement('Button');
		const playPauseButton = document.createElement('a');
		const editButton = document.createElement('Button');
		const deleteButton = document.createElement('Button');
		const sliderLabel = document.createElement('p');
		const volumeSlider = document.createElement('Input');

		container.classList.add('memoryUnit'); 
		container.classList.add('floatLeft');
		audio.setAttribute('controls', '');
		clipLabel.setAttribute('style', "font-family:verdana");
		clipLabel.setAttribute('style', "font-weight: bold");
		clipLabel.innerHTML = clipName;
		recordButton.innerHTML = "Record";
		recordButton.addEventListener("click", this.pressRecordButton.bind(this));
		playPauseButton.setAttribute('class', 'play');
		playPauseButton.setAttribute('id', 'play' + this.name.replace(' / CLOCK', '')); //remove all Blankspace for the id name
		playPauseButton.addEventListener("click", this.pressPlayPauseButton.bind(this));
		editButton.innerHTML = "Edit";
		deleteButton.innerHTML = "Clear";
		deleteButton.addEventListener("click", this.deleteFile.bind(this));
		sliderLabel.innerHTML = "Volume";
		volumeSlider.setAttribute('type' , 'range');
		volumeSlider.setAttribute('class', 'volumeSlider');

		container.appendChild(clipLabel);
		container.appendChild(playPauseButton);
		container.appendChild(recordButton);
		container.appendChild(editButton);
		container.appendChild(deleteButton);
		container.appendChild(sliderLabel);
		container.appendChild(volumeSlider);
		soundClips.appendChild(container);
	}
}