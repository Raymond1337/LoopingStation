export default class Memory{	

	constructor(_name, _input, _outputFilter, _reference){
		console.log("Memory instantiated");
		this.loopstation;
		this.name = _name;
		this.volumen = 1;
		this.outputFilter = _outputFilter; //Get outputfilter from Loopstation
		this.input = _input;
		this.blob;
		this.audio;
		this.createUI();
		this.isRecording = false;
		this.isPlaying = true;
		this.isClock;
		this.delay = 0;
		this.delayShift = 100; // compensates inpud lag
		this.volumeSlider;
	}
	
	record(){
		console.log("record pressed");
		this.input.startRecord();
		if(!this.isClock){
			this.delay = this.input.getDelay() - this.delayShift;
		}
	}
	
	playSound(){
		setTimeout(function(){
			if(this.audio == null){return;}
			this.audio.play();
			}.bind(this), this.delay)
	}
	
	stopSound(){
		if(this.audio == null){return;}
		this.audio.pause();
		this.audio.currentTime = 0; // bc there is no stop function
	}

	stopRecord(){
		this.input.endRecordAndReceiveClip(this);
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
		var icon = $('#' + 'record' + this.name.replace(" / CLOCK", ""));
		icon.toggleClass('active');
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
		this.isPlaying = true;
		if(this.audio == null){return;}
		this.audio.volume = this.volumen;
	}
	
	muteSound(){
		this.isPlaying = false;
		if(this.audio == null){return;}
		this.audio.volume = 0;
	}
	
	setVolumen(volumenInPercent){
		if(volumenInPercent < 0 || volumenInPercent > 1){
			return;
		}
		this.volumen = volumenInPercent
		this.volumeSlider.value = volumenInPercent * 100;
		if(this.audio == null){return;}
		this.audio.volume = this.volumen;
	}
	
	receiveAudio(_audio){
		console.log("Audio received");
		this.audio = _audio;

		if(this.isClock){
			// Duration is only getable if metadata has loaded
			this.audio.onloadedmetadata = function() {
				this.loopstation.timer.setClock(this.audio.duration);
			}.bind(this);
		}
	}

	pressPlayPauseButton(){
		var muteTrackButton = document.getElementById('muteTrackButton'+ this.name.replace(' / CLOCK', ''));
		if(!this.isPlaying){
			muteTrackButton.innerHTML = "Mute Track &#128263";
			this.unMuteSound();
			console.log('Unmute sound');
		}else{
			muteTrackButton.innerHTML = "Unmute Track &#128266";
			this.muteSound();
			console.log('Mute sound');
		}
	}
	
	
	pressEditButton(){
		this.audio = this.outputFilter.edit(this.audio);
	}
	
	createUI(){
		const soundClips = document.querySelector('.memory');
		const clipName = 'MEMORY ' + this.name;
		const container = document.createElement('article');
		const clipLabel = document.createElement('p');
		const recordingButton = document.createElement('a');
		const muteTrackButton = document.createElement('Button');
		const editButton = document.createElement('Button');
		const deleteButton = document.createElement('Button');
		const sliderLabel = document.createElement('p');
		this.volumeSlider = document.createElement('Input');

		container.classList.add('memoryUnit'); 
		container.classList.add('floatLeft');
		clipLabel.setAttribute('style', "font-family:verdana");
		clipLabel.setAttribute('style', "font-weight: bold");
		clipLabel.innerHTML = clipName;
		muteTrackButton.innerHTML = "Mute Track &#128263";
		muteTrackButton.setAttribute('id', 'muteTrackButton'+ this.name.replace(' / CLOCK', ''));
		muteTrackButton.addEventListener("click", this.pressPlayPauseButton.bind(this));

		recordingButton.setAttribute('class', 'record');
		recordingButton.setAttribute('id', 'record' + this.name.replace(' / CLOCK', '')); //remove all Blankspace for the id name
		recordingButton.addEventListener("click", this.pressRecordButton.bind(this));

		editButton.innerHTML = "Edit &#x270D";
		editButton.addEventListener("click", this.pressEditButton.bind(this));
		deleteButton.innerHTML = "Clear &#128465";
		deleteButton.addEventListener("click", this.deleteFile.bind(this));
		sliderLabel.innerHTML = "Volume";
		this.volumeSlider.setAttribute('type' , 'range');
		this.volumeSlider.setAttribute('min' , '0');
		this.volumeSlider.setAttribute('max' , '100');
		this.volumeSlider.setAttribute('value' , '50');
		this.volumeSlider.setAttribute('class', 'volumeSlider');
		this.volumeSlider.addEventListener('input', function() {
			this.setVolumen(this.volumeSlider.value / 100);
		}.bind(this));

		container.appendChild(clipLabel);
		container.appendChild(recordingButton);
		container.appendChild(muteTrackButton);
		container.appendChild(editButton);
		container.appendChild(deleteButton);
		container.appendChild(sliderLabel);
		container.appendChild(this.volumeSlider);
		soundClips.appendChild(container);
	}
}