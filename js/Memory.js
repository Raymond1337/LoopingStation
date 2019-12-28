export default class Memory{
	constructor(_outputFilter){
		console.log("Memory instantiated");
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