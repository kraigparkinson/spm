Scriptable Package Manager (SPM) is a tool for managing Scriptable packages build in the spirit of [node/nodejs](nodejs.org).

# Why SPM?
Scriptable is great for building and running simple scripts, but at the point you want to build something more complex, you'll have other script library requirements, a need to test effectively, and a willingness to share with others. 

# How to use SPM

SPM has two modes of running: 
- Direct (run SPM from Scriptable)
- Share sheet (Run Script from another Scriptable script)

Direct mode commands: 
- *Doctor*: Check configuration and execute unit tests of SPM.
- *Install*: Install new packages by name, starting from <https://unpkg.com>.

Share sheet commands: 
- *Init*: Initialize a new Scriptable package from the Script. Creates directories for libraries and tests.
- *Test*: Runs tests found at {package}/test/index.js
- (Coming) *Publish*: Adds package to local SPM instance as a module.
