QUnit.test( "init creates package.json and directories for Scriptable module in Scriptable document dir" , assert => {
	let fm = FileManager.iCloud();
	let package = "SPM Test Package";

	let expectedPackageDirPath = fm.joinPath(fm.documentsDirectory(), package);
	
	try {
		spm.initialize(package);
		
		assert.ok(fm.fileExists(expectedPackageDirPath), "Expects package directory to be present under package.");
		
		let expectedPackageSpecPath = fm.joinPath(expectedPackageDirPath, "package.json");
		assert.ok(fm.fileExists(expectedPackageSpecPath), "Expects package.json to be present under package directory.");
		
		let expectedPackageTestPath = fm.joinPath(expectedPackageDirPath, "test");
		assert.ok(fm.fileExists(expectedPackageTestPath), "Expects test directory to be present under package directory");
		
		let expectedPackageLibPath = fm.joinPath(expectedPackageDirPath, "lib");
		assert.ok(fm.fileExists(expectedPackageDirPath), "Expects lib directory to be present under package directory.");
	} finally {
		if (fm.fileExists(expectedPackageDirPath)) {
			fm.remove(expectedPackageDirPath);
		}
	}
});