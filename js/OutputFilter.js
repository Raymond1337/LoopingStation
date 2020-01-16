export default class OutputFilter{
	constructor(_output, _filterList){
		console.log("Outputfilter instantiated");
		this.strength = 1;
		this.output = _output;
		this.filterList = _filterList;
		this.filter;
		// create UI
		this.createUI();
	}
	
	setStrenth(strenthInPercent){
		if(strenthInPercent < 0 || strenthInPercent > 1){
			return;
		}
		this.strength = strenthInPercent;
	}
	
	setFilter(_filter){
		this.filter = _filter;
		console.log("filter:");
		//console.log(_filter);
		//console.log(this.filterList);
		this.filter = this.filterList.filterInstances[_filter];
		console.log(this.filter);
		if(_filter[0] == null)
		{
			this.filter = null;
		}
	}
	
	edit(audio){
		console.log("Edited");
		if(this.filter[0] != null){
				console.log('this.outputFilter != null');
				var context = this.filter[0];
				var source = context.createMediaElementSource(audio);
				var filter = this.filter[1];
				source.connect(filter);
				filter.connect(context.destination);
		}
		return audio;
	}
	
	createUI(){
		const soundClips = document.querySelector('.outputFilter');
		const lableText = 'Edit Filter'

		const container = document.createElement('article');
		const filterComboBox = document.createElement('select');
		const label = document.createElement('p');
		const audio = document.createElement('audio');
		const sliderLabel = document.createElement('p');
		const lineBreak = document.createElement('br');
		const volumeSlider = document.createElement('Input');
			   
		container.classList.add('clip');
		audio.setAttribute('controls', '');
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