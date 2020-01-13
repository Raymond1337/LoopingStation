export default class FilterList{
	constructor(){
		this.path = './filter/'
		this.filters = [
			// Add filters here / use class name.
			'none',
			'echo',
			'reverb',
			'lowshelf',
			'highshelf',
			'peaking',
		];
		console.log("FilterList instantiated");
	}
	
	getFilterNames(){
		// TODO: Uppercase
		return this.filters;
	}
	
	getFilterPathAt(index){
		return this.path + this.filters[index];
	}
}