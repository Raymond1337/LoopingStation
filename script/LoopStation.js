var memory = new Memory(); //muss flexibel sein
var lSOutput = new LSOutput();
var outputFilter = new OutputFilter(lSOutput);
var inputFilter = new InputFilter(memory, outputFilter);
var filter = [];
var lSInput = new LSInput(inputFilter);
var timer = new Timer(memory);
var midiAPI = new MidiAPI();

class InputFilter{
	constructor(Memory _memory, OutputFilter directOutput){
		this.strength = 1;
		this.memory = _memory;
		this.outputFilter = directOutput;
		this.filter;
	}
	
	setStrenth(float strenthInPercent){
		if(strenthInPercent < 0 || strenthInPercent > 1){
			return;
		}
		this.strength = strenthInPercent;
	}
	
	setFilter(Filter _filter){
		this.filter = _filter;
	}
}

class OutputFilter{
	constructor(LSOutput _output){
		this.strength = 1;
		this.output = _output;
		this.filter;
	}
	
	setStrenth(float strenthInPercent){
		if(strenthInPercent < 0 || strenthInPercent > 1){
			return;
		}
		this.strength = strenthInPercent;
	}
	
	setFilter(Filter _filter){
		this.filter = _filter;
	}
}

class LSInput{
	constructor(InputFilter _inputFilter){
		//Add audioAPI
		this.volumen = 1;
		this.inputFilter = _inputFilter;
	}
	
	setVolumen(float volumenInPercent){
		if(volumenInPercent < 0 || volumenInPercent > 1){
			return;
		}
		this.volumen = volumenInPercent;
	}
}

class LSOutput{
	constructor(){
		this.loopBack = flase;
		this.loopBackInput;
	}
	
	setLoopBackInput(lSInput input){
		his.loopBackInput = input;
	}
	
	toggleLoopBack(){
		this.loopBack = !this.loopBack;
	}
}

class Timer{
	constructor(Memory firstMemory, Memory[]){
		this.referenceMemory = firstMemory;
	}
}

class MidiAPI{
	constructor(){
		
	}
}

class Memory{
	constructor(){
		//AudioAPI this.soundfile
		this.volumen = 1;
		this.outputFilter = _outputFilter; //Get outputfilter from Loopstation
	}
	
	recordSound(){}
	deleteFile(){}
	playSound(){}
	stopSount(){}
	
	setVolumen(float volumenInPercent){
		if(volumenInPercent < 0 || volumenInPercent > 1){
			return;
		}
		this.volumen = volumenInPercent;
	}
}