const fileURLRegExp = new RegExp('(?:.*)\/(.*?).scriptable');

class ScriptableFileURL {
	
	static extractPackageNameFromFileURL(url) {
		dbc.required(url, "Requires a possible URL to be defined.");
		dbc.assert(fileURLRegExp.test(url), "Should be a file url.");
		
		var matches = fileURLRegExp.exec(url);
		dbc.assert(matches.length == 2, `Should have one match and one group; found ${matches.length} in url. ${url}`);
		let packageName = matches[1];
		return packageName;
	}
	
	static isScriptableFileURL(url) {
		return fileURLRegExp.test(url);
	}
}

//var installed = package => {
//	return ScriptableFileURL.
//} 

exports.spm.package = new Object();
//exports.spm.package.installed = installed;
exports.spm.ScriptableFileURL = ScriptableFileURL;
