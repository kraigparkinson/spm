//(async function( globalContext ) {
const debug = true;
const verbose = false;

var exports = this; 

if (debug) console.log("Loading spm.require.js to supply external packages.");

function loadScriptFromPath(fm, path) {
	if (debug) console.log("loadScriptFromPath: Attempting to load script from path, "+ path);
	
	if (!fm.fileExists(path)) {
		throw new Error("Path does not exist: " + path);
	} else {
	    let code = fm.readString(path);
		if (verbose) { 
			console.log(`============ BEGIN ${path} ============`);
			console.log(code);
			console.log(`============ END ${path} ============`);
		}
		
		if (code.startsWith("Cannot find package")) { 
			throw new Error("No valid package at path: " + path);
		} else {
			if (debug) console.log("loadScriptFromPath: Loading script from path, "+ path);
			return eval(code);
		}
	}	
}

if (typeof need == 'undefined') {
	if (verbose) console.log("Defining 'need' function");
	
	var need = async package => {
		if (debug) console.log("need: Attempting to load package, " + package);
		
		let fm = FileManager.iCloud();
		let depPath = fm.joinPath(fm.documentsDirectory(), "need");
	
		//Check dependency path.
		if (! fm.fileExists(depPath)) {
			try {
			    fm.createDirectory(depPath, false);
			} catch (exists) { 
				if (debug) console.log("directory exists: " + depPath);
			}
		}
		
		let path = fm.joinPath(depPath, `${package}.hidejs`);
		
		//Download library.
		if (!fm.fileExists(path)) {
			if (debug) console.log("need: Preparing to download package, " + package);

		    let unpkg = new Request(`https://unpkg.com/${package}`);
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
		    
			if (debug) console.log(`need: Wrote package (${package}) to disk at ${path}.`);
				

			// Using promises. 
// 			let promise = unpkg.load()
// 				.then(function (unpkgCode) {
// 					if (debug) console.log("need: response: " + unpkg.response);
// 					if (debug) console.log("need: status code: " + unpkg.response.statusCode);
// 					
// 					if (unpkg.response.statusCode == 404) {
// 						throw new Error("Cannot find valid remote package.");
// 					} 
// 					
// 					if (debug) console.log("need: Unpackage reply: " + unpkgCode.toRawString());
// 				    fm.write(path, unpkgCode);
// 				    if (debug) console.log(`need: Wrote package (${package}) to disk at ${path}.`);
// 				})
// 				.catch(function(error){ 
// 					console.logError(error); 
// 					throw error;
// 				});
			
		} else {
			if (debug) console.log(`need: Downloaded package (${package}) exists at ${path}.`);
		}
		
		return loadScriptFromPath(fm, path);		
	}
	
	if (verbose) console.log("Defined 'need' function.");
}

//try {
//	if (require) { exists = true; }
//} catch(e) { exists = false; }
//if (exists) {
if (typeof requireScript == 'undefined') {

	if (verbose) console.log("requireScript: Defining 'requireScript' function");

	var requireScript = package => {
		if (debug) console.log("requireScript: Looking for package under scriptable directory: " + package);
		
		let fm = FileManager.iCloud();
		let path = fm.joinPath(fm.documentsDirectory(), `${package}.js`);
		
		return loadScriptFromPath(fm, path);	
	}
	
	if (verbose) console.log("requireScript: Defined 'requireScript' function.");
}

//async function defineRequire() {

//	await need("underscore");	
	
	var require = package => {
		let module_paths = [
			fm.joinPath(fm.documentsDirectory(), `spm/scriptable_modules/${package}/${package}.js`), 
			fm.joinPath(fm.documentsDirectory(), `${package}.js`
		];
		
		let modulePath;
		
		for (var i = 0; i < module_paths.length(); i++) {
			if (fm.fileExists(module_paths[i])) {
				modulePath = module_paths[i];
				break;
			}
		}
		
		let result = loadScriptFromPath(fm, modulePath);
		if (result == undefined) throw new Error("Ensures contract failed. Module not defined.");
		return result;
/*
				
		try {
			if (debug) console.log(`require: Attempting to load ${package} from Scriptable.`);
			return requireScript(package);
		} catch(needError) {
			console.log(`Couldn't load ${package} from Scriptable documents.`);
			console.log(needError);
			
//			if (debug) console.log(`require: Attempting to load ${package} externally.`);
//			return need(package);
		}
		*/

	};
//	return require;
//}

//	if (typeof require == 'undefined') {
//		return defineRequire();
//	}
	
if (debug) console.log("need.js ready to load external packages.");
//})(this);

