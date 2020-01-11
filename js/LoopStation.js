import InputFilter from './InputFilter.js';
import OutputFilter from './OutputFilter.js';
import LSInput from './LSInput.js';
import LSOutput from './LSOutput.js';
import Timer from './Timer.js';
import MidiAPI from './MidiAPI.js';
import Memory from './Memory.js';
import FilterList from './FilterList.js';

export default class LoopStation{
	memoryArray = [];
	timer;
	
	constructor(amountOfMemoryUnits){
		var lSOutput = new LSOutput();
		var filterList = new FilterList();
		var outputFilter = new OutputFilter(lSOutput, filterList);
		var inputFilter = new InputFilter(outputFilter, filterList);
		var lSInput = new LSInput(inputFilter);
		
		// Create Memory units
		for(var count = 0; count < amountOfMemoryUnits; count++){
			var timerString = '';
			if(count == 0){
				timerString = ' / Clock';
			}
			this.memoryArray.push(new Memory(count + 1 + timerString, lSInput, outputFilter)); //LSinput needs to be input filter
			this.memoryArray[count].setLoopstation(this);
		}
		
		this.timer = new Timer(this.memoryArray[0], this.memoryArray);
		var midiAPI = new MidiAPI();	

		console.log("LoopStation instantiated");		
	}
	
	resetLoopstation(){
		instance = null;
	}
}