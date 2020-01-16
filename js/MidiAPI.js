export default class MidiAPI{
	constructor(){
		//if (navigator.requestMIDIAccess) { 
			navigator.requestMIDIAccess().then( this.onMidiDevice.bind(this))
				// Error callback
				.catch(function(err) {
					console.log('The following requestMIDIAccess error occured: ' + err);
				}  
		); 
		//} else {
		//	console.log("Midi could not get access");
		//}
        this.midiMapping = new Map();
		
		console.log("MidiApi instantiated");
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
}