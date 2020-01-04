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
	constructor(amountOfMemoryUnits){
		console.log("LoopStation instantiated");
		// Singleton pattern
		var lSOutput = new LSOutput();
		var filterList = new FilterList();
		var outputFilter = new OutputFilter(lSOutput, filterList);
		var inputFilter = new InputFilter(outputFilter, filterList);
		var lSInput = new LSInput(inputFilter);
		
		// Create Memory units
		for(var count = 0; count < amountOfMemoryUnits; count++){
			this.memoryArray.push(new Memory(count + 1, inputFilter, outputFilter));
		}
		
		var timer = new Timer(this.memoryArray[0]);
		var midiAPI = new MidiAPI();		
	}
}