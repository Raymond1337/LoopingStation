export default class OutputFilter{
	constructor(_output){
		console.log("Outputfilter instantiated");
		this.strength = 1;
		this.output = _output;
		this.filter;
	}
	
	setStrenth(strenthInPercent){
		if(strenthInPercent < 0 || strenthInPercent > 1){
			return;
		}
		this.strength = strenthInPercent;
	}
	
	setFilter(_filter){
		this.filter = _filter;
	}
}