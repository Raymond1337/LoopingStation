export default class Memory{	

	constructor(_outputFilter){
		console.log("Memory instantiated");
		//AudioAPI this.soundfile
		// create UI
		this.createUI();
		this.volumen = 1;
		this.outputFilter = _outputFilter; //Get outputfilter from Loopstation
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
		const clipName = 'memory'

		const clipContainer = document.createElement('article');
		const clipLabel = document.createElement('p');
		const audio = document.createElement('audio');
		const deleteButton = document.createElement('button');
			   
		clipContainer.classList.add('clip');
		audio.setAttribute('controls', '');
		deleteButton.innerHTML = "Reset";
		clipLabel.innerHTML = clipName;

		clipContainer.appendChild(clipLabel);
		clipContainer.appendChild(audio);
		clipContainer.appendChild(deleteButton);
		soundClips.appendChild(clipContainer);

		const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
		chunks = [];
		const audioURL = window.URL.createObjectURL(blob);
		audio.src = audioURL;
		console.log("created Memory UI");
	}
}