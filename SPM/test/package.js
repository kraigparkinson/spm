QUnit.module("package.js tests");

QUnit.test("find js", assert => {
	let fm = FileManager.iCloud();
	let spmURL = fm.joinPath(fm.libraryDirectory(), Script.name());
	console.log(spmURL);

	assert.ok(spm.ScriptableFileURL.isScriptableFileURL(spmURL), "Expected the URL to exist.");
});