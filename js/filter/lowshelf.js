class lowshelf{
    constructor(input){
        this.input= input;

    }

    setup(strength){
        
        this.gainNode = this.context.createGain(); //it should just one time written in InputFilter.js
        this.lowFilter = this.context.createBiquadFilter();
        this.lowFilter.type = "lowshelf";
        this.lowFilter.frequency.value=60 ;
        this.lowFilter.gain.value = strength.value;
        this.lowFilter.connect(thos.gainNode);
        this.gainNode.connect(this.context.destination);
        
    }

    

}