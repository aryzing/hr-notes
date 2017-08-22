# Slides

http://slides.com/kentcdodds/webpack-deep-dive#/

# Simple server to serve files

Using `http-server` to serve files

# Webpack

* **Auto babel transpile webpack config** Can change `webpack.config.js` to `webpack.config.babel.js` for auto babel transpilation.

* **Binaries in node_modules** Binaries that can be used from CLI in `.bin` directory inside `node_modules`. These binaries are, as far as I can tell, just plain .js files.

* **Webpack config export** Should export an object or a function returning an object.

* **Output required** Object muts have `output.filename` prop.

* **Context** Needs to be absolute path. Other paths are resolved relative to it.

* **Path Resolve** Expression `path('src')` is equivalent to `path(__dirname, 'src')`. From the docs: "If after processing all given `path` segments an absolute path has not yet been generated, the current working directory is used."

* **Webpack runtime** Webpack ships with a runtime, which turns all import and require statements into a *Webpack Require*. The code that does this at the very top of the bundle file.

* **Module closures** Webpack bundles each module into its own closure.

* **Forwarding arguments** With npm we can forward additional arguments the invoked script with `--`.

* Example: with `"start:dev": "webpack"`, running `npm run start:dev -- -w` is equivalent to `webpack -w`.

* **Interpreting Webpack's CLI output** The numbers in square brackets are the modules part of the bundle.

* **Webpack Dev Server serving** Bundles and serves bundled assets from memory. If requested resource does not exist in memory, looks for it in file system and serves that.

* **Source Maps** Can add source maps under the `devtool` key. In chrome dev tools, can be found under the `webpack://` protocol.

* **eval** `eval`, very fast to build, inline with code. Cons: inline with source code not great for production. Blue folders in chrome dev tools.

* **source-map** `source-map`, creates separate source map file. Not as fast. Adds comment to bundle indicating location (url) or source map. Browser does not download it unless dev tools are opened. Great for production! Orange folders in chrome dev tools, (and more of them!).

* **Webpack yargs** Webpack uses `yargs` package to process CLI arguments.

* **NPM script hooks** The `pre` hook: npm will automatically run scripts beginning with "pre" first when asked to run scripts with same name without the "pre".

* **rimarf** Cross platform `rm -rf`. Good to use on webpack `dist` folder before new build. Good to use with `pre` hook: `"prebuild": "rimraf dist"`.

* **Debugging webpack** Can include a debugger statement in the webpack config file to inspect it. Must call webpack using `node --inspect node_modules/.bin/webpack [bundle.js] [other_args]`.

* **Pathinfo** The `pathInfo` boolean controlls whether webpack inlines comments in its cutsom `__webpack_require` statements to signal which module was required.

* **Code coverage** Can use `babel-plugin-__coverage__`. Performs all the inlining of the coverage specific code in a semi-standard way that can be interpreted by other test tools, such as karma. Prevents testing frameworks from inserting their code-coverage inlining into transpiled code.

* **Babel environments** Allows for applying transforms conditionally, i.e., when in a given environment. Can be triggered using `NODE_ENV` or `BABEL_ENV`.

```js
// apply `__coverage__` when in test environment
{
  "env": {
    "test": {
      "plugins": [
        "__coverage__"
      ]
    }
  }
}
```

* **Tree shaking** Webpack's ability to create dead code. Only works when using ES2015 modules. The dead code can then easily be removed by uglifyjs (which webpack runs by default in production mode) or similar.

* **Code Splitting** aka importing modules dynamically, i.e., only when they are necessary in the code. In browsers there is still no spec on how this should be handled. How does Webpack handle this?

* **Commons chunking** 1) Multiple entries, 2) `new webpack.optimize.CommonsChunkPlugin({name: vendor})` 3) `new InlineManifestWebpackPlugin()` 4) `new HtmlWebpackPlugin({
  template: './index.html',
  inject: 'head',
})`, 5) very long term caching.
