export default class InputFilter{
	constructor(directOutput, _filterList){
		console.log("Inputfiler instantiated");
		this.strength = 1;
		this.outputFilter = directOutput;
		this.filterList = _filterList;
		this.filter;
		// create UI
		this.createUI();
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
		const lableText = 'Input Filter';

		const filterContainer = document.createElement('article');
		const filterComboBox = document.createElement('select');
		const label = document.createElement('p');
		const audio = document.createElement('audio');
		const lineBreak = document.createElement('br');
		const volumeSlider = document.createElement('Input');
			   
		filterContainer.classList.add('clip');
		audio.setAttribute('controls', '');
		label.innerHTML = lableText;
		volumeSlider.setAttribute('type' , 'range');
		
		for(var index = 0; index < this.filterList.getFilterNames().length; index++){
			var filterComboBoxOption = document.createElement('option');
			filterComboBoxOption.setAttribute('value', index);
			filterComboBoxOption.innerHTML = this.filterList.getFilterNames()[index];
			filterComboBox.appendChild(filterComboBoxOption);
		}

		filterContainer.appendChild(label);
		filterContainer.appendChild(filterComboBox);
		soundClips.appendChild(filterContainer);
		filterContainer.appendChild(lineBreak);
		filterContainer.appendChild(volumeSlider);
	}
}