import Memory from './Memory.js';

export default class DynamicMemory{	

	constructor(_memoryArray, _numberOfMemories, _inputFilter, _outputFilter, _reference){
		console.log("Dynamic Memory instantiated");
		
        this.memoryArray = _memoryArray;
        this.numberOfMemories = _numberOfMemories;
		this.outputFilter = _outputFilter; //Get outputfilter from Loopstation
		this.inputFilter = _inputFilter;
		this.createUI();
	}
	
	pressAddNewMemory() {
        document.getElementById('newEmptyDynamicMemory' + this.numberOfMemories).remove();
        this.memoryArray.push(new Memory('' + ++this.numberOfMemories, this.inputFilter, this.outputFilter));
        this.createUI();
    }
	
	createUI(){
		const soundClips = document.querySelector('.memory');
		const container = document.createElement('article');
        const lineBreak1 = document.createElement('br');
        const lineBreak2 = document.createElement('br');
        const lineBreak3 = document.createElement('br');
        const lineBreak4 = document.createElement('br');
        const lineBreak5 = document.createElement('br');
        const lineBreak6 = document.createElement('br');
        const lineBreak7 = document.createElement('br');
        const lineBreak8 = document.createElement('br');
        const lineBreak9 = document.createElement('br');
        const lineBreak10 = document.createElement('br');
        const lineBreak11 = document.createElement('br');
        const lineBreak12 = document.createElement('br');
        const plusNewMemoryButton = document.createElement('Button');
        const plusNewMemoryButtonSpan = document.createElement('Span');

        plusNewMemoryButtonSpan.setAttribute('class', 'glyphicon glyphicon-plus');
        plusNewMemoryButton.setAttribute('class', 'btn btn-default btn-circle btn-xl');
        plusNewMemoryButton.setAttribute('type', 'button');
        plusNewMemoryButton.appendChild(plusNewMemoryButtonSpan);
        plusNewMemoryButton.addEventListener("click", this.pressAddNewMemory.bind(this))

        container.setAttribute('id', 'newEmptyDynamicMemory' + this.numberOfMemories);
		container.classList.add('newMemoryUnit'); 
		container.classList.add('floatLeft');
        container.appendChild(lineBreak1);
        container.appendChild(lineBreak2);
        container.appendChild(lineBreak3);
        container.appendChild(lineBreak4);
        container.appendChild(lineBreak5);
        container.appendChild(lineBreak6);
        container.appendChild(plusNewMemoryButton);
        container.appendChild(lineBreak7);
        container.appendChild(lineBreak8);
        container.appendChild(lineBreak9);
        container.appendChild(lineBreak10);
        container.appendChild(lineBreak11);
        container.appendChild(lineBreak12);
        soundClips.appendChild(container);

		console.log("created Memory UI");
	}
}