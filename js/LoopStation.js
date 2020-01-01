import InputFilter from './InputFilter.js';
import OutputFilter from './OutputFilter.js';
import LSInput from './LSInput.js';
import LSOutput from './LSOutput.js';
import Timer from './Timer.js';
import MidiAPI from './MidiAPI.js';
import Memory from './Memory.js';

export default class LoopStation{
	memoryArray = [];
	constructor(amountOfMemoryUnits){
		console.log("LoopStation instantiated");
		// Singleton pattern
		var lSOutput = new LSOutput();
		var outputFilter = new OutputFilter(lSOutput);
		var inputFilter = new InputFilter(outputFilter);
		var filter = [];
		var lSInput = new LSInput(inputFilter);
		
		// Create Memory units
		for(var count = 0; count < amountOfMemoryUnits; count++){
			this.memoryArray.push(new Memory(inputFilter, outputFilter));
		}
		
		var timer = new Timer(this.memoryArray[0]);
		var midiAPI = new MidiAPI();		
	}
}