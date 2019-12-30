export default class InputFilter{
	constructor(directOutput){
		// create UI
		this.createUI();
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
	
	createUI(){
		const soundClips = document.querySelector('.inputFilter');
		const lableText = 'Input Filter'

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