import InputFilter from './InputFilter.js';
import OutputFilter from './OutputFilter.js';
import LSInput from './LSInput.js';
import LSOutput from './LSOutput.js';
import Timer from './Timer.js';
import MidiAPI from './MidiAPI.js';
import Memory from './Memory.js';

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.mediaDevices.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      })

      // Success callback
      .then(function(stream) {
 
        
      })

      // Error callback
      .catch(function(err) {
         console.log('The following getUserMedia error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

class LoopStation{
	memoryArray = [];
	constructor(amountOfMemoryUnits){
		// Singleton pattern
		for(count = 0; count < amountOfMemoryUnits; count++){
			memoryArray.add(new Memory());
		}
	}
}

class InputFilter{
	constructor(_memory, directOutput){
		this.strength = 1;
		this.memory = _memory;
		this.outputFilter = directOutput;
		this.filter;
	}
	
	setStrength(strenthInPercent){
		if(strenthInPercent < 0 || strenthInPercent > 1){
			return;
		}
		this.strength = strenthInPercent;
	}
	
	setFilter(_filter){
		this.filter = _filter;
	}
}

class OutputFilter{
	constructor(_output){
		this.strength = 1;
		this.output = _output;
		this.filter;
	}
	
	setStrenth(strenthInPercent){
		if(strenthInPercent < 0 || strenthInPercent > 1){
			return;
		}
		this.strength = strenthInPercent;
	}
	
	setFilter(_filter){
		this.filter = _filter;
	}
}

class LSInput{
	let chunks = [];
	const mediaRecorder;
	constructor(_inputFilter, stream){
		this.mediaRecorder = new MediaRecorder(stream);	
		this.mediaRecorder.ondataavailable = function(e) {
			chunks.push(e.data);
		}
		this.volumen = 1;
		this.inputFilter = _inputFilter;
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
		this.mediaRecorder.stop();
		return this.chunks;
	}
	
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
}

class LSOutput{
	constructor(){
		this.loopBack = false;
		this.loopBackInput;
	}
	
	setLoopBackInput(input){
		his.loopBackInput = input;
	}
	
	toggleLoopBack(){
		this.loopBack = !this.loopBack;
	}
}

class Timer{
	constructor(firstMemory, memory){
		this.referenceMemory = firstMemory;
	}
}

class MidiAPI{
	constructor(){
		
	}
}

class Memory{
	constructor(_outputFilter){
		//AudioAPI this.soundfile
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
}

var memory = new Memory(); //muss flexibel sein
var lSOutput = new LSOutput();
var outputFilter = new OutputFilter(lSOutput);
var inputFilter = new InputFilter(memory, outputFilter);
var filter = [];
var lSInput = new LSInput(inputFilter);
var timer = new Timer(memory);
var midiAPI = new MidiAPI();