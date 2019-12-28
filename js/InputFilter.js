export default class InputFilter{
	constructor(directOutput){
		console.log("Inputfiler instantiated");
		this.strength = 1;
		this.outputFilter = directOutput;
		this.filter;
	}
	
	setStrength(strenthInPercent){
		if(strenthInPercent < 0 || strenthInPercent > 1){
			return;
		}
		this.strength = strenthInPercent;
	}
	
	setFilter(_filter){
		this.filter = _filter;
	}
}