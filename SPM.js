// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// always-run-in-app: true; icon-color: deep-brown;
// icon-glyph: magic; share-sheet-inputs: file-url, plain-text;
if (typeof need == 'undefined') eval(FileManager.iCloud().readString(FileManager.iCloud().joinPath(FileManager.iCloud().documentsDirectory(), "need.js")));

const debug = false;

let fm = FileManager.iCloud();
let basePath = fm.joinPath(fm.documentsDirectory(), Script.name());

//require("dbc");
await need("dbc");
await need("underscore");
//require("underscore");

dbc.assert(Script.name() == "SPM");	

spm = new Object();
spm.config = {
	autostart:true,
	base:basePath
};
// Init


var downloadModule = async function( packageName, path ) {
	console.log("Preparing to download package, " + packageName);

    let unpkg = new Request(`https://unpkg.com/${packageName}`);
	let unpkgCode;
	// Using await. 
	try {
 		unpkgCode = await unpkg.load();
		if (debug) console.log("need: response: " + JSON.stringify(unpkg.response));
		if (debug) console.log("need: status code: " + unpkg.response.statusCode);
	} catch(error){ 
		console.logError(error); 
		throw error;
	}
			
	if (unpkg.response.statusCode == 404) {
		throw new Error("Cannot find valid remote package.");
	} 
			
	if (debug) console.log("need: Unpackage reply: " + unpkgCode.toRawString());
	
    fm.write(path, unpkgCode);
    
	if (debug) console.log(`need: Wrote package (${packageName}) to disk at ${path}.`);
}


// Install
var installGlobal = async function( packageName ) {
	
	let modulesPath = fm.joinPath(basePath, "scriptable_modules");
	
	dbc.required(packageName, "Requires package name as first argument");
 	dbc.assert(fm.fileExists(modulesPath), "Base directory must exist. Run 'init' first.");
	
	let moduleFolderPath = fm.joinPath(modulesPath, packageName);
	
	// Create directory for module. 
	if (! fm.fileExists(moduleFolderPath)) {
		fm.createDirectory(moduleFolderPath);
	}
	
	let modulePath = fm.joinPath(moduleFolderPath, `${packageName}.js`);
	
	if (! fm.fileExists(modulePath)) {
		// Download module to directory. 
	 	downloadModule(packageName, modulePath);
	}
	
	dbc.assert(
		fm.fileExists(moduleFolderPath), 
		"Ensures contract failed: Module folder exists.");
	dbc.assert(
		fm.fileExists(modulePath),
		"Ensures contract failed: Module exists in module folder.")
}
spm.installGlobal = installGlobal;

// Doctor
requireScript("SPM/lib/doctor");
dbc.required(spm.doctor, "Expects 'doctor' has been defined.");

requireScript("SPM/lib/init");
dbc.required(spm.initialize, "Expects 'initialize' has been defined.");

requireScript("SPM/lib/test");
dbc.required(spm.test, "Expects 'test' has been defined.");

requireScript("SPM/lib/package");
dbc.required(spm.package, "Expects 'package' has been defined.");


// Test
var runTestForModule = function(module) {
	let modulesPath = fm.joinPath(basePath, "scriptable_modules");
	let modPath = fm.joinPath(modulesPath, module.name);
	let testPath = fm.joinPath(mod, "test");
	
	dbc.check(fm.fileExists(testPath), "Test path should exist.");
	
	let contents = fm.listContents(testPath);
	contents.forEach(function(aTestPath){
		eval(fm.readString(aTestPath));
	});
}

// Main
var promptToInstallModule = async function() {
	if (debug) console.log("Prompting to install module.");
	let prompt = new Alert();
	prompt.message = "Install module";
	prompt.addTextField("module name");
	prompt.addAction("Install")
	prompt.addCancelAction("Cancel");
	let idx = await prompt.presentAlert();
	
	if (idx == 0) {
		let packageName = prompt.textFieldValue(0);
		try {
			installGlobal(packageName);
			let confirmation = new Alert();
			confirmation.message = `${packageName} installed successfully.`;
			confirmation.addAction("OK");
			await confirmation.presentAlert();
		} catch (error) {
			let alert = new Alert();
			alert.message = `Error installing ${packageName}. See console for more info.`;
			alert.addAction("OK");
			await alert.presentAlert();
		}
		
	}
	console.log(idx);
}

/*
class ScriptablePackage {
	static extractPackageNameFromFileURL(url) {
		let regex = new RegExp("(?:.*)\/(.*?).scriptable");
		
		dbc.required(url, "Requires a possible URL to be defined.");
		dbc.assert(regex.test(url), "Should be a file url.");
		
		var matches = regex.exec(url);
		dbc.assert(matches.length == 1, "Should have a single match.");
		let packageName = matches[0];
		return packageName;
	}
	
	static isFileURL(url) {
		let regex = new RegExp("(?:.*)\/(.*?).scriptable");
		return regex.test(url);		
	}
	
}
*/

//function main(args) {
	let package;
	
	if (spm.ScriptableFileURL.isScriptableFileURL(args.plainTexts[0])) {
		package = spm.ScriptableFileURL.extractPackageNameFromFileURL(args.plainTexts[0]);
	}
	
	let allargs = args.all;
	let packageName = package;
	
		
	console.log(`args: ${allargs}`);
	
	if (spm.config.autostart = true) {
		
		spm.config.autostart = false;
		
		let mainWindow = new Alert();
		mainWindow.title = "Scriptable Package Manager";
		mainWindow.message = "Select action to continue.";


		if (packageName != undefined) {
			mainWindow.addAction(`Init (${packageName})`);
			mainWindow.addAction(`Test (${packageName})`);
			mainWindow.addAction(`Publish (${packageName})`);
			
			mainWindow.addCancelAction("Cancel");
			
			let idx = await mainWindow.presentSheet();
		
			if (idx == 0) {
			
				let initPkg = new Alert();
				initPkg.title = "Init";
				initPkg.message = "Initialize a new package.";
				initPkg.addTextField("Package name", package);

				initPkg.addAction("OK");
				initPkg.addCancelAction("Cancel");
				
				await initPkg.presentAlert();
				let packageName = initPkg.textFieldValue(0); 
				dbc.required(packageName, "Expected a package name.");
				spm.initialize(packageName);
			} else if (idx == 1) {
				let initPkg = new Alert();
				initPkg.title = "Test";
				initPkg.message = "Run tests for ${package}.";
				initPkg.addTextField("Package name", packageName);

				initPkg.addAction("OK");
				initPkg.addCancelAction("Cancel");
				
				await initPkg.presentAlert();
				let packageName = initPkg.textFieldValue(0); 
				dbc.required(packageName, "Expected a package name.");
				spm.test(packageName);
			}
		} else {
			mainWindow.addAction("Doctor");
			mainWindow.addAction("Install package");
			
			mainWindow.addCancelAction("Cancel");

			let idx = await mainWindow.presentSheet();
			
			if (idx == 0) {
				let results = spm.doctor();
				
				let info = new Alert();
				info.title = "Doctor";
				info.message = "Check log for results.";
				info.addAction("OK");
				
				await info.presentAlert();
			} else if (idx == 1) {
				let initPkg = new Alert();
				initPkg.title = "Install";
				initPkg.message = "Install a new package.";
				initPkg.addTextField("Package name");

				initPkg.addAction("OK");
				initPkg.addCancelAction("Cancel");
				
				await initPkg.presentAlert();
				
				let package = initPkg.textFieldValue(0); 
				dbc.required(packageName, "Expected a package name.");
				spm.install(packageName);
			}					
		}
	}	
//}

//main(args);




//  promptToInstallModule();

