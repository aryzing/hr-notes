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
