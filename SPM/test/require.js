QUnit.module("spm.require");

QUnit.test( "require handles local packages", assert => {
	let code = "var noop = function () { return true; }"
	let truthyPath = fm.joinPath(spm.config.lib, "truthy.js");			
	fm.write(truthyPath, code);
	
	try {
		spm.require("truthy");
		assert.ok(noop != null, "Expected truthy to have loaded 'noop'.");
	} finally {
		fm.remove(truthyPath);
	}
});

QUnit.test("require loads local script libraries in favor of globals", assert => {
	
//	setupLocalScriptWithDeps();
//	setupGlobalDep();
	
});

//QUnit.test( "require handles github packages", assert => { });
