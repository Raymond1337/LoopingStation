class reverb{
	constructor(input, strength){

        this.input= input;
	}

	setup (reverbTime=1) {
        this.effect = this.context.createConvolver();

        this.reverbTime = reverbTime;

        this.attack = 0.0001;
        this.decay = 0.1;
        this.release = reverbTime;

        this.wet = this.context.createGain();
    this.input.connect(this.wet);
    this.wet.connect(this.effect);
        this.effect.connect(this.output);    
        
        this.renderTail();
    }

    renderTail () {
    console.log("renderTail")
    const tailContext = this.input;
                    tailContext.oncomplete = (buffer) => {
                        this.effect.buffer = buffer.renderedBuffer;
                    }
        
    const tailOsc = new Noise(tailContext, 1);
          tailOsc.init();
          tailOsc.connect(tailContext.destination);
          tailOsc.attack = this.attack;
          tailOsc.decay = this.decay;
          tailOsc.release = this.release;
        
      
      tailOsc.on({frequency: 500, velocity: 1});
            tailContext.startRendering();
        setTimeout(()=>{
            tailOsc.off(); 
        },1);
            
     
    }

    set decayTime(value) {
        let dc = value/3;
        this.reverbTime = value;
        this.release = dc;
    return this.renderTail();
    }

}