import InputFilter from './InputFilter.js';
import OutputFilter from './OutputFilter.js';
import LSInput from './LSInput.js';
import LSOutput from './LSOutput.js';
import Timer from './Timer.js';
import MidiAPI from './MidiAPI.js';
import Memory from './Memory.js';
import DynamicMemory from './DynamicMemory.js';
import FilterList from './FilterList.js';

export default class LoopStation{
	memoryArray = [];
	numberOfMemories = 0;
	timer;
	
	constructor(amountOfMemoryUnits){
		var lSOutput = new LSOutput();
		var filterList = new FilterList();
		var outputFilter = new OutputFilter(lSOutput, filterList);
		var inputFilter = new InputFilter(outputFilter, filterList);
		var lSInput = new LSInput(inputFilter);
		this.numberOfMemories = amountOfMemoryUnits;
		
		this.createUI();

		// Create standard Memory units
		// Code bei Create dynamic Memory unit bitte auch anpassen wenn ihr was ändert.
		for (var count = 0; count < amountOfMemoryUnits; count++){
			var timerString = '';
			if(count == 0){
				timerString = ' / CLOCK';
			}
			this.memoryArray.push(new Memory(count + 1 + timerString, lSInput, outputFilter)); //LSinput needs to be input filter
			this.memoryArray[count].setLoopstation(this);
		}

		// Create dynamic Memory unit

		new DynamicMemory(this.memoryArray, amountOfMemoryUnits, lSInput, outputFilter); //LSinput needs to be input filter
		
		this.timer = new Timer(this.memoryArray[0], this.memoryArray, lSInput);
		var midiAPI = new MidiAPI();	

		console.log("LoopStation instantiated");		
	}
	
	resetLoopstation(){
		instance = null;
	}
	
	createUI(){
		const soundClips = document.querySelector('.generalControlls');
		const container = document.createElement('article');
		const label = document.createElement('p');
		const muteAllButton = document.createElement('Button');

		container.classList.add('memoryUnit'); 
		container.classList.add('floatLeft');
		label.setAttribute('style', "font-family:verdana");
		label.setAttribute('style', "font-weight: bold");
		label.innerHTML = 'Memory controls';
		//playPauseButton.setAttribute('id', 'play' + this.name.replace(' / CLOCK', '')); //remove all Blankspace for the id name
		//playPauseButton.addEventListener("click", this.pressPlayPauseButton.bind(this));
		muteAllButton.innerHTML = "Mute All";
		//deleteButton.addEventListener("click", this.deleteFile.bind(this));

		container.appendChild(label);
		container.appendChild(muteAllButton);
		soundClips.appendChild(container);
	}
}