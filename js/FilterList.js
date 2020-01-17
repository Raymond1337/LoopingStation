export default class FilterList{
	constructor(){
		this.filters = [
			// Add filters here / use class name.
			'none',
			'lowpass',
			'highshelf',
			//'echo',
			//'reverb',
			//'lowshelf',
			'peaking',
			'notch',
			'allpass',
			'bandpass'
		];
		
		this.filterInstances = [
			// Add filters here / use class name.
			this.getFilterNone(),
			this.getFilterLowpass(), 
			this.getFilterHighshelf(),
			this.getFilterPeaking(),
			this.getNotchFilter(),
			this.getAllpassFilter(),
			this.getBandpassFilter()
		
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

	getFilterPeaking(){
		var context = new AudioContext();

		var gainNode = context.createGain(); // it should just one time written in InputFilter.js
		var peakingFilter = context.createBiquadFilter();
		peakingFilter.type = "peaking";
		peakingFilter.frequency.value=300;
		peakingFilter.gain.value = 100 //strength.value;
		peakingFilter.connect(gainNode);

		return [context, peakingFilter];
	}

	getNotchFilter(){
		var context = new AudioContext();

		var gainNode = context.createGain(); // it should just one time written in InputFilter.js
		var notchFilter = context.createBiquadFilter();
		notchFilter.type = "notch";
		notchFilter.frequency.value=60;
		notchFilter.gain.value = 10 //strength.value;
		notchFilter.connect(gainNode);

		return [context, notchFilter];
	}

	getAllpassFilter(){
		var context = new AudioContext();

		var gainNode = context.createGain(); // it should just one time written in InputFilter.js
		var allpassFilter = context.createBiquadFilter();
		allpassFilter.type = "notch";
		allpassFilter.frequency.value=1000;
		allpassFilter.gain.value = 30 //strength.value;
		allpassFilter.connect(gainNode);

		return [context, allpassFilter];
	}

	getBandpassFilter(){
		var context = new AudioContext();

		var gainNode = context.createGain(); // it should just one time written in InputFilter.js
		var bandpassFilter = context.createBiquadFilter();
		bandpassFilter.type = "bandpass";
		bandpassFilter.frequency.value=1000;
		bandpassFilter.gain.value = 30 //strength.value;
		bandpassFilter.connect(gainNode);

		return [context, bandpassFilter];
	}
}