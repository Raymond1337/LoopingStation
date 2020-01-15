import LoopStation from '../LoopStation.js';
var loopstation;

createUI();

function resetLoopstation(memoryCount){
	loopstation = new LoopStation(memoryCount);
}


function createUI(){
		const soundClips = document.querySelector('.generalControlls');
		const container = document.createElement('article');
		const label = document.createElement('p');
		const clearAllButton = document.createElement('Button');
		const muteAllButton = document.createElement('Button');

		container.classList.add('memoryUnit'); 
		container.classList.add('floatLeft');
		label.setAttribute('style', "font-family:verdana");
		label.setAttribute('style', "font-weight: bold");
		label.innerHTML = 'General controls';
		clearAllButton.innerHTML = "Clear All";
		//playPauseButton.setAttribute('id', 'play' + this.name.replace(' / CLOCK', '')); //remove all Blankspace for the id name
		//playPauseButton.addEventListener("click", this.pressPlayPauseButton.bind(this));
		//deleteButton.addEventListener("click", this.deleteFile.bind(this));

		container.appendChild(label);
		container.appendChild(clearAllButton);
		soundClips.appendChild(container);
	}

document.addEventListener("DOMContentLoaded", function () {
	resetLoopstation(4);
    console.log("***************** Page build *****************");
}, false);
