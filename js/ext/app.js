import LoopStation from '../LoopStation.js';
var loopstation;

createUI();

function resetLoopstation(){
	clearUI();
	createUI();
	loopstation = new LoopStation(4);
	//location.reload();
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
		clearAllButton.addEventListener("click", resetLoopstation);

		container.appendChild(label);
		container.appendChild(clearAllButton);
		soundClips.appendChild(container);
	}
function clearUI(){
		const soundClips = document.querySelector('.memory');
		const outClips = document.querySelector('.outputFilter');
		const inClips = document.querySelector('.inputFilter');
		const controlClips = document.querySelector('.generalControlls');
		soundClips.innerHTML = "";
		outClips.innerHTML = "";
		inClips.innerHTML = "";
		controlClips.innerHTML = "";
}
document.addEventListener("DOMContentLoaded", function () {
	loopstation = new LoopStation(4);
    console.log("***************** Page build *****************");
}, false);
