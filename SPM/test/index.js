if (typeof need == 'undefined') eval(FileManager.iCloud().readString(FileManager.iCloud().joinPath(FileManager.iCloud().documentsDirectory(), "need.js")));

(async function ( globalContext ) {

await need("qunit");

requireScript("SPM/test/install-global");
requireScript("SPM/test/require");
requireScript("SPM/test/init");
requireScript("SPM/test/test");
requireScript("SPM/test/package");

spm.config.autostart = false;
console.log("configured autostart of SPM to false");

QUnit.config.autostart = false;

QUnit.done( ( { total, failed, passed, runtime } ) => {
  console.log( `Total: ${total}, Failed: ${failed}, Passed: ${passed}, Runtime: ${runtime}` );
});

QUnit.log( ( { result, message } ) => {
  if (result) {
  	console.log( `Log: ${result}, ${message}` );
  } else {
  	console.logError( `Log: ${result}, ${message}` );
  }
  
});
QUnit.testStart( ( { module, name } ) => {
  console.log( `======= BEGIN ${module}: ${name}` );
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

  console.log( "------");
  console.log( JSON.stringify( result, null, 2 ) );
  console.log( `====== END ${module}` );
} );

QUnit.start();
})(this);