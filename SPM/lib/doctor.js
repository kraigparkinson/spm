(function ( globalContext ) {
	var doctor = function() {
	//	let fm = FileManager.iCloud();
		
		console.log("Running spm doctor.");
		
		let testPath = fm.joinPath(basePath, "test");
		console.log("Looking for tests in path: " + testPath);
		
		dbc.assert(fm.fileExists(testPath), "Test path should exist.");
		
		/*
		let contents = fm.listContents(testPath);
		console.log("Running tests: " + contents);
		_.forEach(contents, function(test, index, list){
			console.log(test);
			
			eval(fm.readString(fm.joinPath(testPath, test)));
		});
		*/
		
		let testIndexPath = fm.joinPath(testPath, "index.js");
		dbc.assert(fm.fileExists(testIndexPath), "Expected test runner, index.js, to be present.");
		eval(fm.readString(testIndexPath));
		
	}
	//return doctor;
	exports.spm.doctor = doctor;
})(this);