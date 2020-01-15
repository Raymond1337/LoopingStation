import("./filter/none.js");
import("./filter/echo.js");
import("./filter/reverb.js");
import("./filter/lowshelf.js");
import("./filter/highshelf.js");
import("./filter/peaking.js");

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