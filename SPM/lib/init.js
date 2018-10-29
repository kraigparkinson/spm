{
	var initialize = package => {
		console.log(package);
		
		let fm = FileManager.iCloud();
		
		let modulePath = fm.joinPath(fm.documentsDirectory(), `${package}`);
		
		dbc.assert(! fm.fileExists(modulePath), "Expected module path to be vacant.");
		fm.createDirectory(modulePath);
		console.log("Created directory, " + modulePath);
		
		let packageSpec = JSON.stringify({name:package, version:"0.0.1"});
		
		let packageSpecPath = fm.joinPath(modulePath, "package.json");
		
		fm.writeString(packageSpecPath, packageSpec);
		console.log("Created directory, " + modulePath);
		
		let supportingDirs = ["lib", "test"];
		supportingDirs.forEach((item, a, b) => {
			let supportingDir = fm.joinPath(modulePath, item); 
			fm.createDirectory(supportingDir);
			console.log("Created directory, " + supportingDir);
		});
		
		dbc.assert(fm.fileExists(modulePath), "Ensures a module directory is present.");
		dbc.assert(fm.fileExists(packageSpecPath), "Ensures module/package.json is present.")
		dbc.assert(fm.fileExists(fm.joinPath(modulePath, "lib")), "Ensures module/lib directory is present.");
		dbc.assert(fm.fileExists(fm.joinPath(modulePath, "test")), "Ensures module/test directory is present.");
	}
	
	exports.spm.initialize = initialize;
}