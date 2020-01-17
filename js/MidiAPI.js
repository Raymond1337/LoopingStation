export default class MidiAPI{
	constructor(){
		if (navigator.requestMIDIAccess) {
				navigator.requestMIDIAccess().then(        
					this.midiSuccess,          
					this.midiFailure); 
		} else {     
			console.log("Midi could not get access");
		}
        this.midiMapping = new Map();
		
		console.log("MidiApi instantiated");
		
		this.mapMidi(1, (value) => {
			console.log("MIDI BUTTON USED!");
			if (value === 127) {
			}
		});
	}
	
	midiFailure(){
		console.log("MidiApi failed");
	}
	
	midiSuccess(midi) { 
		var inputs = midi.inputs; 
		for (var input of inputs.values()) { 
			console.log(input);
			input.onmidimessage = this.onMidiMessage;
		} 
	}
	
	onMidiMessage(event) {
		console.log(event.target.name,  event.data,  event.receivedTime); 
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

        console.log(`cmd: ${cmd}, channel: ${channel}, btnID: ${btnID}, value: ${value}`);

        if (this.midiMapping.has(btnID)) {
            const callbackFn = this.midiMapping.get(btnID);
            callbackFn(value);
        }
    }
	
    mapMidi(btnID, callbackFn) {
        this.midiMapping.set(btnID, callbackFn);
    }
}