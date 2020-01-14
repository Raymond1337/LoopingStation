export default class Timer{
	constructor(firstMemory, _memories, _lsInput){
		console.log("Timer instantiated");
		this.referenceMemory = firstMemory;
		this.memories = _memories;
		this.lsInput = _lsInput;
		this.replayInterval;
		this.bufferInterval;
	}

	cancel(){
		console.log("Timer canceled");
		replayInterval = null;
		bufferInterval = null;
	}
	
	setClock(time){
		time = time * 1000; // seconds to ms
		// run instant after recording
		this.runAllMemories();
		this.lsInput.setupClockDelay();
		// start loop after interval
		this.replayInterval = window.setInterval(this.runAllMemories.bind(this), time);
		this.bufferInterval = window.setInterval(this.lsInput.setupClockDelay.bind(this.lsInput), time);
	}
	
	runAllMemories(){
		console.log("Clock time: "+ Date.now());
		for (var index = 0; index < this.memories.length; index++){
			this.memories[index].stopSound();
			this.memories[index].playSound();	
		}
	}
}