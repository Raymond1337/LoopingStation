export default class MidiAPI{
	constructor(_loopstation){
		if (navigator.requestMIDIAccess) {
				navigator.requestMIDIAccess().then(        
					this.midiSuccess.bind(this),          
					this.midiFailure); 
		} else {     
			console.log("Midi could not get access");
		}
        this.buttonMapping = new Map();
        this.sliderMapping = new Map();
		this.loopstation = _loopstation;

		console.log("MidiApi instantiated");
		
		// Clear All
		this.mapMidiButton(18, (value) => {
			
			console.log(this.loopstation.app);
			this.loopstation.resetFunction();
		});	
		
		// track 1
		this.mapMidiButton(19, (value) => {
			this.loopstation.memoryArray[0].pressEditButton();
		});	
		
		this.mapMidiButton(20, (value) => {
			this.loopstation.memoryArray[0].deleteFile();

		});	
		
		this.mapMidiButton(48, (value) => {
			this.loopstation.memoryArray[0].pressRecordButton();

		});		
		
		this.mapMidiSlider(48, (value) => {
			this.loopstation.memoryArray[0].setVolumen(value/127);
		});	
		
		// track 2
		this.mapMidiButton(23, (value) => {
			this.loopstation.memoryArray[1].pressEditButton();
		});	
		
		this.mapMidiButton(24, (value) => {
			this.loopstation.memoryArray[1].deleteFile();

		});	
		
		this.mapMidiButton(49, (value) => {
			this.loopstation.memoryArray[1].pressRecordButton();

		});		
		
		this.mapMidiSlider(49, (value) => {
			this.loopstation.memoryArray[1].setVolumen(value/127);
		});
		
		// track 3
		this.mapMidiButton(27, (value) => {
			this.loopstation.memoryArray[2].pressEditButton();
		});	
		
		this.mapMidiButton(28, (value) => {
			this.loopstation.memoryArray[2].deleteFile();

		});	
		
		this.mapMidiButton(50, (value) => {
			this.loopstation.memoryArray[2].pressRecordButton();

		});		
		
		this.mapMidiSlider(50, (value) => {
			this.loopstation.memoryArray[2].setVolumen(value/127);
		});
		
		// track 4
		this.mapMidiButton(31, (value) => {
			this.loopstation.memoryArray[3].pressEditButton();
		});	
		
		this.mapMidiButton(32, (value) => {
			this.loopstation.memoryArray[3].deleteFile();

		});	
		
		this.mapMidiButton(51, (value) => {
			this.loopstation.memoryArray[3].pressRecordButton();

		});		
		
		this.mapMidiSlider(51, (value) => {
			this.loopstation.memoryArray[3].setVolumen(value/127);
		});
	}
	
	midiFailure(){
		console.log("MidiApi failed");
	}
	
	midiSuccess(midi) { 
		var inputs = midi.inputs; 
		for (var input of inputs.values()) {
			console.log(this);
			console.log(input);
			input.onmidimessage = function (e){
					this.onMidiEvent(e);
					//console.log(this);
				}.bind(this);
		} 
	}
		
	// Blatantly stolen
	// How do I undo comments?
	onMidiDevice(access) {
		console.log("Midi has access");
        const inputs = access.inputs.values();
        const outputs = access.outputs.values();

        for (const input of inputs) {
            console.log(input);
            input.onmidimessage = this.onMidiEvent.bind(this);
        }
    }
	
	onMidiEvent(event) {
        let cmd = event.data[0] >> 4;
        let channel = event.data[0] & 0xf;
        let btnID = event.data[1];
        let value = event.data[2];

        //console.log(`cmd: ${cmd}, channel: ${channel}, btnID: ${btnID}, value: ${value}`);

		// BUTTON down
		if(cmd == 9){
			if (this.buttonMapping.has(btnID)) {
				const callbackFn = this.buttonMapping.get(btnID);
				callbackFn(value);
			}
		}
		
		// SLIDER moved
		if(cmd == 11){
			if (this.sliderMapping.has(btnID)) {
				const callbackFn = this.sliderMapping.get(btnID);
				callbackFn(value);
			}
		}
    }
	
    mapMidiButton(btnID, callbackFn) {
        this.buttonMapping.set(btnID, callbackFn);
    }
	
    mapMidiSlider(btnID, callbackFn) {
        this.sliderMapping.set(btnID, callbackFn);
    }
}