export default class Memory{	

	constructor(_name, _inputFilter, _outputFilter, _reference){
		console.log("Memory instantiated");
		// AudioAPI this.soundfile
		// create UI
		
		this.name = _name;
		this.volumen = 1;
		this.outputFilter = _outputFilter; //Get outputfilter from Loopstation
		this.inputFilter = _inputFilter;
		this.blob;
		this.audio;
		this.createUI();
		this.isRecording = false;
		this.isPlaying = false;
	}
	
	record(){
		console.log("record pressed");
		this.inputFilter.startRecord();
	}
	
	playSound(){
		console.log("play pressed");
		this.audio.play();
	}
	
	stopSound(){
		console.log("stop pressed");
		this.audio.pause();
	}

	stopRecord(){
		console.log("clear pressed");
		this.inputFilter.endRecordAndReceiveClip(this);
	}
	
	setTimer(timer){
		timer.setClock(audio.duration);
	}
	
	reciveBlob(_blob){
		console.log("Blob received");
		console.log(_blob);
		this.blob = _blob;
		const audioURL = window.URL.createObjectURL(this.blob);
		this.audio = new Audio(audioURL);
		console.log(this.audio);
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
		this.audio = null;
	}
	
	setVolumen(volumenInPercent){
		if(volumenInPercent < 0 || volumenInPercent > 1){
			return;
		}
		this.volumen = volumenInPercent;
	}
	
	receiveBlob(_blob){
		console.log("Blob received");
		console.log(_blob);
		this.blob = _blob;
		const audioURL = window.URL.createObjectURL(this.blob);
		this.audio = new Audio(audioURL);
		console.log(this.audio);
	}
	
	createUI(){
		const soundClips = document.querySelector('.memory');
		const clipName = 'Memory ' + this.name;

		const container = document.createElement('article');
		const clipLabel = document.createElement('p');
		const audio = document.createElement('audio');
		const lineBreak = document.createElement('br');
		const recordButton = document.createElement('Button');
		const playButton = document.createElement('Button');
		const editButton = document.createElement('Button');
		const deleteButton = document.createElement('Button');
		const sliderLabel = document.createElement('p');
		const volumeSlider = document.createElement('Input');
			   
		container.classList.add('memoryUnit'); 
		container.classList.add('floatLeft');
		audio.setAttribute('controls', '');
		recordButton.innerHTML = "Record";
		recordButton.addEventListener("click", this.pressRecordButton.bind(this));
		playButton.innerHTML = "&#9658; / &#10074;&#10074;";
		playButton.addEventListener("click", this.pressPlayPauseButton.bind(this));
		editButton.innerHTML = "Edit";
		deleteButton.innerHTML = "Clear";
		deleteButton.addEventListener("click", this.deleteFile.bind(this));
		sliderLabel.innerHTML = "Volume";
		volumeSlider.setAttribute('type' , 'range');
		clipLabel.innerHTML = clipName;

		container.appendChild(clipLabel);
		container.appendChild(recordButton);
		container.appendChild(playButton);
		container.appendChild(editButton);
		container.appendChild(deleteButton);
		container.appendChild(sliderLabel);
		//container.appendChild(lineBreak);
		container.appendChild(volumeSlider);
		soundClips.appendChild(container);

		console.log("created Memory UI");
	}
}