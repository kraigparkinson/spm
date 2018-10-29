QUnit.module("Test");
//, () => {
QUnit.test("Runs tests on named module", assert => {
		//Install a sample module.
		let fm = FileManager.iCloud();
		let module = "spmsample";
		
		spm.test(module);
		assert.step("test", "Expected to have completed step to execute test package.");
		assert.verifySteps(["test"], "Expected test package step to be complete.");
	});

QUnit.test("Runs tests on named script package", assert => {
		//Install a sample module.
		let fm = FileManager.iCloud();
		let scriptPackage = "Sample SPM Package";
		
		spm.test(scriptPackage);
		assert.step("test", "Expected to have completed step to execute test package.");
		assert.verifySteps(["test"], "Expected test package step to be complete.");
	});

//});