export default class LSOutput{
	constructor(){
		console.log("LSOutput instantiated");
		this.loopBack = false;
		this.loopBackInput;
	}
	
	setLoopBackInput(input){
		his.loopBackInput = input;
	}
	
	toggleLoopBack(){
		this.loopBack = !this.loopBack;
	}
}