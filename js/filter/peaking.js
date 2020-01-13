class peaking{
    constructor(input){
        this.input= input;
        this.setup();
    }

    setup(strength){
        this.gainNode = this.context.createGain();
        this.peaking = this.context.createBiquadFilter();
        this.peaking.type = "peaking";
        this.peaking.frequency.value=2000 ;
        this.peaking.gain.value = strength.value;
        this.peaking.connect(this.gainNode);
        this.gainNode.connect(this.context.destination)
    }
}