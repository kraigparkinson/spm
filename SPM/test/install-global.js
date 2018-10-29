
/*
if (typeof need == 'undefined') eval(FileManager.iCloud().readString(FileManager.iCloud().joinPath(FileManager.iCloud().documentsDirectory(), "need.js")));

(async function ( globalContext ) {

await need("qunit");


spm.config.autostart = false;
console.log("configured autostart of SPM to false");

QUnit.config.autostart = false;
*/

QUnit.test( "global install of a package goes into its own directory", function( assert ) {
	spm.installGlobal("dbc");
	
	let fm = FileManager.iCloud();
	let appPath = fm.joinPath(fm.documentsDirectory(), "SPM");
	let modulePath = fm.joinPath(appPath, "scriptable_modules");
	assert.ok(fm.fileExists(modulePath), "Path should exist for module.");
	
});	

QUnit.test( "global install fails when unregistered package is specified.", async function( assert ) {
	assert.timeout(250);
	var needDone = assert.async();
		
	try {
		await need("spmglobalfail"); 
	} catch (error) {
		console.log(error.toString());
		assert.equal("Error: Cannot find valid remote package.", error.toString());
	}
	
	needDone();
	
});	


/*
QUnit.done( ( { total, failed, passed, runtime } ) => {
  console.log( `Total: ${total}, Failed: ${failed}, Passed: ${passed}, Runtime: ${runtime}` );
});
QUnit.log( ( { result, message } ) => {
  console.log( `Log: ${result}, ${message}` );
});
QUnit.testStart( ( { module, name } ) => {
  console.log( `=======Now running: ${module}: ${name}` );
});
QUnit.testDone( ( { module, name, total, passed, failed, skipped, todo, runtime } ) => {
  var result = {
    "Module name": module,
    "Test name": name,
    "Assertions": {
      "Total": total,
      "Passed": passed,
      "Failed": failed
    },
    "Skipped": skipped,
    "Todo": todo,
    "Runtime": runtime
  };

  console.log( "======" + JSON.stringify( result, null, 2 ) );
} );

QUnit.start();
})(this);
*/