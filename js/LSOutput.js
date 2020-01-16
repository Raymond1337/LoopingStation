export default class LSOutput{
	receiver;
	outputFilter = null;
	audioContext = null;
	
	constructor(){
		console.log("LSOutput instantiated");
		this.loopBack = false;
		this.loopBackInput;
	}
	
	setLoopBackInput(input){
		his.loopBackInput = input;
	}
	
	toggleLoopBack(){
		this.loopBack = !this.loopBack;
	}
	
	edit(audio){
		console.log('Edited via output');
		return audio;
	}
	
	setFilter(_filter){
		console.log('Filter set:');
		console.log(_filter);
		this.outputFilter = _filter[1];
		this.audioContext = _filter[0];
	}
}