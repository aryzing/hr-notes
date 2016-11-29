# Node Version Manager
[Github nvm repo](https://github.com/creationix/nvm).

# Up and running

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

```
nvm install node
```

Packages used in Hack Reactor:
```
npm install -g node-inspector
npm install -g live-server
npm install -g nodemon
npm install -g bower
npm install -g babel-cli
npm install -g webpack

npm i -g node-inspector live-server nodemon bower babel-cli webpack
```

# Installation of modules

Local install:
```sh
$ npm install <package_name>
$ npm install -S <package_name> # save
$ npm install -D <package_name> # save as dev dependency
```

All packages installed will be stored in `node_modules`


**Can be globally installed too**
Modules can either be installed globally (system-wide) or locally (within the directory of the application)

Global install:
```sh
$ npm install -g <package_name>
```

# Requiring and Exporting modules

Each file has its own scope in Node. Using `require` allows code written in other files to be accessible in the current scope.

Scripts have access to object `module`, `module.exports`.

Values to export are attached to `exports`, or may overwrite the `exports` property:

```js
// in file1.js. Attaching
var fruit = 'apple';
var color = 'red';

module.exports.fruit = fruit;
module.exports.color = color;

// in file2.js. Overwriting
module.exports = {
  car: 'Ford',
  length: '23km'
}

// in file3.js. Overwritten value may be of any type
module.exports = function() {console.log('hello');};
```

<!-- The keyword `export` (note without final 's'), is a shorthand way of attaching properties to `module.exports`:

```js
var color = 'green';

module.exports.color = color; // this line ...
export color;                 // ... and this one are equivalent
``` -->

# Package.json
You can [specify the version of node](https://docs.npmjs.com/files/package.json#engines) to run:

```js
{ "engines" : { "node" : ">=0.10.3 <0.12" } }
```

# Running scripts
File `package.json` allows for named scripts. Some names have special meaning and tie directly into npm.

To run a custom script, give it a non-special name and execute it with
```sh
npm run <script>
```

# npm locally installed executables vs global installs
http://www.2ality.com/2016/01/locally-installed-npm-executables.html
Packages can be installed globally or locally.

Globally means that a command is made available (globally) to execute that package. Therefore, a binary is put somewhere and the directory containing the binary is somewhere in you $PATH.

Locally means that a package is installed in a node_modules folder. Packages installed locally may have binaries (in fact, they are the same exact packages installed globally). However, the binary is not in $PATH so can't be directly invoked from command line.

Same package installed globally and locally. If has binary:
* Global install will make binary available as command in CLI, will not make package available for import in source code.
* Local install will only make package available for importation in source code, but will not make any binary it has directly available in CLI

Note that npm packages may or may not contain Node.js modules.

Some packages come with executables. Executables are just plain .js files that are intended to be run in terminal and provide no exports. What makes them executables is this, no exports and written to be run in terminal, and not that they are a binary file or some compiled file (because they are not). They have a shell header:

`#!/usr/bin/env node`

Also, it seems that within scripts, references to node_module packages that provide binaries are searched for in `node_modules`.

## Running executables from nearby node_modules
The

# Scripts

There are some reserved names for scripts. These scripts will run at specific moments:

https://docs.npmjs.com/misc/scripts
