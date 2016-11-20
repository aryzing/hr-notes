Objectives for today:
* Understand Webpack in a bit more detail.
* Understand how package importation works through the different methods available.
  * CommonJS (require), AMD?, ES6 import
  * Sync and async implications of importing
* Redux together with React in a bit more detail

webpack can only process ES5 JavaScript natively, but loaders are used to transform other ES6 or non-javascript resources into JavaScript.
* babel loader for ES6
* css loader for css

```js
require('./style.css');

//static analysis
require("./template/" + templateName + ".jade");
```

Good idea to have webpack installed as a local dependency in your project to not rely on machine's version of webpack
```sh
npm i webpack webpack-dev-server -D
```

Installing webpack globally give access to the CLI version. To access the locally installed version, add it to a script in package.json and run that script.
```sh
npm run <script_containing_webpack> # will pull from nearest node_modules/.bin
```

Currently supported module styles: AMD and CommonJS.

webpack uses the concept of an **entry point**. An entry point is the file used to start the search for module dependencies. Modules reachable from the entry point in the dependency graph constitute the application.

webpack in 5 seconds:
```sh
webpack app.js bundle.js
```

Configuration file:
* Specify `entry` point as path, absolute or relative, for own modules.
 * Otherwise, searches for module with that name in node_modules.
 * Will pick up index.js automatically.
* Not necessary for output `path`, but might as well.
* Output `filename` is required

Using loaders to feed webpack with JS it understands
```sh
npm i -S babel-core babel-preset-es2015
npm i -S babel-loader # module specifically for webpack
```

Configuring babel:
```js
{ "presets": [ "es2015" ] }
```

In webpack exports object, *module > loaders > array_of_loader_config_objects*.
```js
{
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
```

Multiple loaders can be specified for a matched test condition by providing an array of strings. They are **evaluated from right to left** and we must make sure that the last one (at index 0), returns JS.

```js
{
  test: /\.css$/,
  loader: ["style", "css"] // style-loader and css-loader
}
```

Within the loader field, strings may omit the trailing `*-loader`.

# Module importation process

The above loader works because when webpack finds an importation statement such as `require`, it will look at the specified file, and try to match it against all tests in the loaders section of the configuration file.

When a match is found, it executes the loader (from right to left) and then examines the generated JS.

**Note1** Here, "loaders" is used to refer to `module.loaders`. However, the key "loader", `module.loaders[0].loader` may be used in its plural form. In this article, it will only be used it its singular form to avoid confusion.
```js
{
  test: /\.css$/,
  loaders: ["style", "css"] // plural. works too. won't be used here.
}
```

**Note2** The key for loader specification

In the case of css files, the above loader will produce JS (css to json, json to js). The resulting js is appended to the bundle file and instructs the browser to create the necessary style tags.

Alternatively, it is also possible to have webpack create a single .css file that gathers all css from an entire project.

The valid file types that can be required depend on how those files will be treated. Coming from Node, it may seem weird to import css files.

So webpack does not hijack anything, it is simply another way for treating related code files. Those files are really

Useful arguments for running webpack:
```sh
webpack -d --display-modules --display-exclude="core"
```




A few things I don't yet understand:
* How can webpack use node_modules without applying `babel-loader`?
 * **A** Those modules are already in ES5.
* How can webpack use custom ES6 modules if it can't read them?
 * **A** It first passes the files through the loaders, then follows dependency graph.
* `import babel-polyfill` used just for side effects. How does it work?
