export default class FilterList{
	constructor(){
		this.filters = [
			// Add filters here / use class name.
			'none',
			'lowpass',
			'highshelf'
			//'echo',
			//'reverb',
			//'lowshelf',
			//'peaking',
		];
		
		this.filterInstances = [
			// Add filters here / use class name.
			this.getFilterNone(), // 'none'
			this.getFilterLowpass(),//'echo', 
			this.getFilterHighshelf(),//'highshelf', 
			//'reverb',
			//'lowshelf'
			//'peaking'
		];
		
		console.log("FilterList instantiated");
	}
	
	getFilterNames(){
		// TODO: Uppercase
		return this.filters;
	}
	
	setFilterAndStrength(strength){
		//for()
			// 
	}
	
	getFilterPathAt(index){
		return this.path + this.filters[index];
	}
	
	getFilterNone(){
		return [null, null];
	}
	
	getFilterLowpass(){
		var context = new AudioContext();
		
		var gainNode = context.createGain();
		gainNode.gain.value = 10;
		
		var filter = context.createBiquadFilter();
		filter.frequency.value = 300;
		filter.gain.value = 100;
		
		gainNode.connect(filter);
		
		return [context, filter];
	}
	
	getFilterHighshelf(){
		var context = new AudioContext();
		
		var gainNode = context.createGain(); // it should just one time written in InputFilter.js
        var highFilter = context.createBiquadFilter();
        highFilter.type = "highshelf";
        highFilter.frequency.value=4000;
        highFilter.gain.value = 100 //strength.value;
        highFilter.connect(gainNode);
		
		return [context, highFilter];
	}
}