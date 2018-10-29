Scriptable Package Manager (SPM) is a tool for managing Scriptable packages build in the spirit of [node/nodejs](nodejs.org).

SPM has two modes of running: 
- Direct (run SPM from Scriptable)
- Share sheet (Run Script from another Scriptable script)

Direct mode commands: 
- *Doctor*: Check configuration and execute unit tests of SPM.
- *Install*: Install new packages by name, starting from <https://unpkg.com>.

Share sheet commands: 
- *Init*: Initialize a new Scriptable package from the Script. Creates directories for libraries and tests.
- *Test*: Runs tests found at {package}/test/index.js
- (Coming) *Publish*: Adds current package to SPM as a module.
