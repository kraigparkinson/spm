{
	var test = package => {
		console.log(`Running tests on ${package}`);
		
		let fm = FileManager.iCloud();
		
		dbc.required(spm.config.base, "Expected spm.config.base to be specified.");

		let modulesPath = fm.joinPath(spm.config.base, "scriptable_modules");
		
		let module_homes = [
			fm.documentsDirectory(), 
			modulesPath
		];
		
		let finalPath;
		
		for (var i = 0; i < module_homes.length; i++) {
			let modulePath = fm.joinPath(module_homes[i], `${package}`);
			let testPath = fm.joinPath(modulePath, "test");
			let testIndexPath = fm.joinPath(testPath, "index.js");
		
			if (fm.fileExists(testIndexPath)) {
				finalPath = testIndexPath;
				break;
			} else {
				console.log(`Test path not found at ${testIndexPath}.`);
			}
		}
		
		dbc.required(finalPath, "Requires valid test path is available.");
		console.log(`Attempting to run tests for package, ${package}, at ${finalPath}...`);
		
		dbc.assert(fm.fileExists(finalPath), "Expected test path to be present for module.");
		
		let code = fm.readString(finalPath);
		dbc.required(code, "Expected code to be executed.");
		
//		eval.apply(new Object(), [code]);
		eval(code);
		
		console.log(`Finished running tests for package, ${package}, at ${finalPath}.`);
	}
	
	exports.spm.test = test;
}