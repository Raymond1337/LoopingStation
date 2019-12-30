export default class OutputFilter{
	constructor(_output){
		// create UI
		this.createUI();
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
	
	createUI(){
		const soundClips = document.querySelector('.outputFilter');
		const lableText = 'Output Filter'

		const filterContainer = document.createElement('article');
		const filterComboBox = document.createElement('select');
		const label = document.createElement('p');
		const audio = document.createElement('audio');
			   
		filterContainer.classList.add('clip');
		audio.setAttribute('controls', '');
		label.innerHTML = lableText;

		filterContainer.appendChild(label);
		filterContainer.appendChild(filterComboBox);
		soundClips.appendChild(filterContainer);
	}
}