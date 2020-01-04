export default class Memory{	

	constructor(_name, _inputFilter, _outputFilter){
		console.log("Memory instantiated");
		//AudioAPI this.soundfile
		// create UI
		this.name = _name;
		this.createUI();
		this.volumen = 1;
		this.outputFilter = _outputFilter; //Get outputfilter from Loopstation
		this.inputFilter = _inputFilter;
	}
	
	recordSound(){}
	deleteFile(){}
	playSound(){}
	stopSount(){}
	
	setVolumen(volumenInPercent){
		if(volumenInPercent < 0 || volumenInPercent > 1){
			return;
		}
		this.volumen = volumenInPercent;
	}
	
	createUI(){
		// chunks defined for debugging
		let chunks = [];
		
		const soundClips = document.querySelector('.memory');
		const clipName = 'memory ' + this.name;

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
		playButton.innerHTML = "&#9658; / &#10074;&#10074;";
		editButton.innerHTML = "Edit";
		deleteButton.innerHTML = "Reset";
		sliderLabel.innerHTML = "Volume";
		volumeSlider.setAttribute('type' , 'range')
		clipLabel.innerHTML = clipName;

		container.appendChild(clipLabel);
		//container.appendChild(audio);
		container.appendChild(recordButton);
		container.appendChild(playButton);
		container.appendChild(editButton);
		container.appendChild(deleteButton);
		container.appendChild(sliderLabel);
		//container.appendChild(lineBreak);
		container.appendChild(volumeSlider);
		soundClips.appendChild(container);

		const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
		chunks = [];
		const audioURL = window.URL.createObjectURL(blob);
		audio.src = audioURL;
		console.log("created Memory UI");
	}
}