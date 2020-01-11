export default class Timer{
	constructor(firstMemory, _memories){
		console.log("Timer instantiated");
		this.referenceMemory = firstMemory;
		this.memories = _memories;
		this.interval;
		
		//TODO: remove
		//console.log(this.memories);
		//this.setClock(8000);
	}

	cancel(){
		console.log("Timer canceled");
		interval = null;
	}
	
	setClock(time){
		console.log("Timer set to:");
		console.log(time);
		this.interval = window.setInterval(this.runAllMemories.bind(this), time);
	}
	
	runAllMemories(){
		console.log('trying to run memories');
		for (var index = 0; index < this.memories.length; index++){
			this.memories[index].stopSound();
			this.memories[index].playSound();	
			console.log(this.memories[index]);
		}
	}
}