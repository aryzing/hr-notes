# Typescript

Typescript compiler follows *one of two* module resolution strategies: **node** or **classic**.

Relative vs non-relative imports:

* non-relative imports are all those that start with a name: `foo/bar/baz`
* relative imports alll all those that start with a system directory such as `./`, `../`, or `/`.

Concept of **ambient module declaration** used but not defined.

Note that even imports starting at the root of the file system such as `/path/to/module` are considered relative, because the path is relative to the system the compilation occurs on.

Relative imports resolved based on importing file. Non-relative imports resolved based on `baseUrl`, path **mapping**, or **ambient module declaration**.

Intended use of

* relative imports: own packages
* non-relative imports: external dependnecies

**Classic module resulution**

Some custom typescript way of resolving modules...

**"Node" module resulution**

Similar to Node's module resulution, with a Typescript twist. It appears that this is the one being used by default.

With this strategy, we can use index files and "main" files using the `types` key instead in package.json

```json
{
  "types": "MyTypescriptModule.ts"
}
```

When using webpack with `ts-loader`, it seems that the default transpilation of `import` produces `require`s which include the name of the file, but not the extension. Therefore, must add `['ts', 'tsx']` to webpack's `resolve.extensions` when using the loader. I concluded this b/c when I was running `tsc` from CLI, the output files had `require`s, and webpack (uisng `ts-loader` and no `resolve.extensions`) would fail because it could not find the modules being referenced.

Webpack was failing because it could not find the modules being referenced.

Some very interesting scenarios:

1. `types` is indeed Typescript's `main`.
2. Using webpack, leaving `resolve.extensions` blank, and specifying `main` in package.json of a module, and using index.ts in another: `tsc` will say that the "main" module was not found, but successfully find `index.ts`. The `ts-loader` will transpile the code into requires with the name of the directory, but no filenames, so it will then execute those requires. Because the "main" modules has a `main` field with the filename, webpack will pick it up without problem and transpile it too. However, it will **fail**/protest about the index file because it's not prepared to handle index files with a .ts extension. Because the linter acts like the compiler, the linter will too protest that it can not find the "main" file.
3. `resolve.extensions` blank, specifying types for "main" module, and index.ts file: the tsc compiler will run successfully (and linter will not protest). Webpack will **fail**/protest that it can not find either file. Why? no `main` field in package.json for the transpiled require of the "main" module, and the other, index.ts, has un unknown extension.
4. Same as above, but specifying `resolve.extensions` with `['ts', 'tsx']`: The index file will get successfully picked up by webpack. The "main" package will still **fail**, because there is still no "main" field.
5. Same as above, but with a `main` field instead of a `types`: the compiler (and linter) will **fail**. However, webpack will work. Why? The transpiled JS of the entry file will have two requires. The index require will be able to be resolved because of the `['ts', 'tsx']`, and the "main" module will be able to be resoved because we're specifying the `main` field. Although when webpack realizes that the `main` field points to a `.ts` file, it will then go ahead and pass it through the loader. So, linter will fail, compiler will fail, but webpack will work and produce a good bundle.

Q|> Could the solution be to specify both `types` and `main` field in package.json?

A|> No need, just add `types` to webpack's `resolve.mainFields`

# Exploring tsconfig: Two key properties

Attention! `tsconfig.json` is only used by tsc if run in CLI with **no arguments**.

* `module`
  * Default: `target === "ES6" ? "ES6" : "CommonJS"`
  * Values: `"None"`, `"CommonJS"`, `"AMD"`, `"System"`, `"UMD"`, `"ES6"`, `"ES2015"` or `"ESNext"`.
* `target`
  * Default: `"ES3"`
  * Values: `"ES3"`, `"ES5"`, `"ES6"`/`"ES2015"`, `"ES2016"`, `"ES2017"` or `"ESNext"`

Dependent on these is

* `moduleResulution`
  * Default: `module === "AMD" | "System" | "ES6" ? "Classic" : "Node"`
  * Values: `Node`, `Classic`

Theory: outdir will be ignored by the loader, but will be respected by `tsc`.

> Proved true!

Theory2: can I change webpack to look for another "main" field in package.json? or maybe an array of them?

> Proved true!

**Test1**: Force module resolution to classic with a package.json with a `types` field. Expected result: compiler will fail b/c in classic mode it does not look at package.json files.

Note,  I don't care about this result, because this only matters when using the CLI. When using `ts-loader`, all we care about is that webpack can find the files. But for completeness sake, will try out.

**Result1**: Indeed, it did not find the modules, and complained about it (error in console). However, it still transpiled the modules, so I guess that it's both following the import tree as well as scanning the project for matching paths to transpile. Enough investigation at this point.

**Test2**: Set different out dirs for `tsc` and webpack. Resulting files should be put in different places depending on which command is run. Or even, running webpack, the `ts-loader` could put new js files in a different file, but webpack still puts the bundle in the dist directory.

**Result2**: tsc and webpack each create their own out dirs, but `ts-loader` does not.

**Test3**: Testing compilation. Objective: Have TS do bare minimum transpilation (just get rid of typings), and have webpack do the module linking. To accomplish this, will set `compilerOptions` to

```json
{
  "compilerOptions": {
    "module": "None",
    "target": "ESNext",
  }
}
```

**Result3**: Was expecting `"None"` to leave imports alone, but it's doing the same transpilation as `"CommonJS"`. Might need to research this further. Best results with both fields set to `"ESNest"`.

# So far good progress has been made

Still to come:

* [done] Adding babel
* Adding react and hmr
  * babel-react
  * webpack dev server

# TODAY

Remove some of the notes related to not using tsc without arguments in CLI, only keep results.

Setting module resolution to Node picks up `main` file in package.json?

# webpack's mainFields

Not sure if I did not read it correctly last time, or if I'm not remembering it correctly, but the default value for `resolve.mainFields` when targeting the web is

```js
mainFields: ["browser", "module", "main"]
```

Relevant b/c above I modified mainFields to include `types`. When doing so, removed `'browser'` and `'module'` inadvertedly, causing the build to fail.

Relevant links:

[My GitHub issue](https://github.com/visionmedia/debug/issues/468#issuecomment-323926818)

[Inspiration for solution](https://github.com/webpack/webpack-dev-server/issues/727#issuecomment-273321453)

[webpack `mainFields` docs](https://webpack.js.org/configuration/resolve/#resolve-mainfields)

# While adding React

Could not get the index.html file produced by `html-webpack-plugin` to be in root of webpack Dev Server, while having assets served from different dir, like `/assets`.

Had to change the webpack config slightly to be able to serve the html index file and the bundle correctly.

Have not downloaded any type definitions, and seems to work ok

Chose to have babel do all the transpiling, so I set `jsx: Preserve` in `tsconfig.json`.

I changed the index file extension to `.tsx` and it got picked up correctly by TypeScript. Need this extension for files using tsx or TypeScript will not understand the tsx syntax.
