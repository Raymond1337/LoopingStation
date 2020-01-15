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
		console.log("filter:");
		console.log(_filter);
		console.log(this.filterList);
		console.log(this.filterList.filters[_filter]);
		//this.filterList[_filter];
		//this.filter = _filter;
	}
	
	createUI(){
		const soundClips = document.querySelector('.inputFilter');
		const lableText = 'Input Filter';

		const container = document.createElement('article');
		const filterComboBox = document.createElement('select');
		const label = document.createElement('p');
		const sliderLabel = document.createElement('p');
		const lineBreak = document.createElement('br');
		const volumeSlider = document.createElement('Input');
			   
		container.classList.add('clip');
		label.innerHTML = lableText;
		sliderLabel.innerHTML = "Strength";
		volumeSlider.setAttribute('type' , 'range');
		volumeSlider.setAttribute('min' , '0');
		volumeSlider.setAttribute('max' , '200');
		volumeSlider.setAttribute('value' , '100');
		
		filterComboBox.onchange = function(){this.setFilter(filterComboBox.value);}.bind(this);
		
		for(var index = 0; index < this.filterList.getFilterNames().length; index++){
			var filterComboBoxOption = document.createElement('option');
			filterComboBoxOption.setAttribute('value', index);
			filterComboBoxOption.innerHTML = this.filterList.getFilterNames()[index];
			filterComboBox.appendChild(filterComboBoxOption);
		} 

		container.appendChild(label);
		container.appendChild(filterComboBox);
		soundClips.appendChild(container);
		container.appendChild(sliderLabel);
		//container.appendChild(lineBreak);
		container.appendChild(volumeSlider);
	}
}