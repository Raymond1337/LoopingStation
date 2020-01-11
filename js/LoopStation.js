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

	constructor(amountOfMemoryUnits){
		console.log("LoopStation instantiated");
		// Singleton pattern
		var lSOutput = new LSOutput();
		var filterList = new FilterList();
		var outputFilter = new OutputFilter(lSOutput, filterList);
		var inputFilter = new InputFilter(outputFilter, filterList);
		var lSInput = new LSInput(inputFilter);
		this.numberOfMemories = amountOfMemoryUnits;

		// Create standard Memory units
		// Code bei Create dynamic Memory unit bitte auch anpassen wenn ihr was ändert.
		for (var count = 0; count < amountOfMemoryUnits; count++){
			var timerString = '';
			if(count == 0){
				timerString = ' / CLOCK';
			}
			this.memoryArray.push(new Memory(count + 1 + timerString, lSInput, outputFilter)); //LSinput needs to be input filter
		}

		// Create dynamic Memory unit

		new DynamicMemory(this.memoryArray, amountOfMemoryUnits, lSInput, outputFilter); //LSinput needs to be input filter
		
		var timer = new Timer(this.memoryArray[0], this.memoryArray);
		var midiAPI = new MidiAPI();		
	}
}