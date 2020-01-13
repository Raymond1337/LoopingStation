class highshelf{
    constructor(input){
        this.input=input;
    }

    setup(strength){
        this.gainNode = this.context.createGain(); // it should just one time written in InputFilter.js
        this.highFilter = this.context.createBiquadFilter();
        this.highFilter.type = "highshelf";
        this.highFilter.frequency.value=4000;
        this.highFilter.gain.value = strength.value;
        this.highFilter.connect(this.gainNode);
        this.gainNode.connect(this.context.destination)
    }
}