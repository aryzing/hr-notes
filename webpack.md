# Webpack

# Why don't we want the modules to run on code that is not ours?

```
file1 (we wrote, imports lib1) uses `import` syntax
file2 (we wrote, imports lib1 lib2) uses `require()` syntax
lib1
lib2
```

According to tutorial, we only want to convert `file1` and `file2`. But how must `lib1` and `lib2` be written such that `babel` knows what to look for joining the files.

Perhaps it is not babel that performs the "connecting" between files, that is done by webpack. Babel only translates.

Exactly, babel translates files to commonJS. commonJS is the base upon syntactic sugar `import`, `export`, `export default` is built atop. To then join all the logic together, we need a commonJS environment to perform the linking.

On server, node.js can perform linking of files already written in commonJS (does not yet support `import` keyword). On browser, there is no commonJS  interpreter, but Webpack does understand commonJS, so *it* does the linking. It does so by essentially coppy pasting all files into one large file while maintaining module namespace.

Again, commonJS is just a **convention** on how to name functions and how to write files to be linkable, but we still need someone to understand and perform the linking. Built into nodeJS. Built into webpack,  but not browser, so webpack spits out a file that writes "long version" of the convention.

So, for webpack to work, all imported modules must be transpiled to commonJS, or if they are not ours, they should already be in commonJS format. Perhaps in the future, Webpack  will understand `import` statements.

# two loaders: css-loader and style-loader

What do each of these do an their own?

> css-loader takes a CSS file and reads off all its dependencies whilst the style-loader will embed those styles directly into the markup.

Then, how does `import styles from './app.css'` this work? This line is present in a `.js` file, so babel processes it, and transpiles this line to a `require()`. So far so good. But require requires an actual JS file on the other side. So that is where the css loaders come into play. They create a JS file based on the .css file that does three things: (and it is up to the commonJS interpreter to link the  files as it sees fit).

* analyze the class name rules and map them to unique names
* creates the necessary JS to embed those unique class names into the page
* creates the necessary JS to include those unique class names in a commonJS exportable object that can be used in the requiring module.

NOTE: css-loader creates the JS for the .css file and style-loader creats the JS to add the css inline within a <style> html tag.

I think the style loader goes one step further and makes the class names available as non-modified unique string names, or maybe its the other way around. who knows, let me inspect.

Note that so far we have not used the imported variable. We could as well just immported the css without creating the variable.

```sh
npm i -D extract-text-webpack-plugin
```

Can use this plugin to create separate, linkable (from html) css file.

```js
{
  test: /\.css/,
  loader: ExtractTextPlugin.extract('css'),
}

// and

plugins: [
  new ExtractTextPlugin('styles.css')
]
```

Does not inject a style tag with actual css, instead compiles all css into a single file. We will then need to link to it in the html.

```html
<link href="style.css" rel="stylesheet">
```

Up to this point, the css styles are still global. The only benefit using this approach is we make sure that the `.css` file is present and that the project won't build unless it exists.

And now, we start making the changes to make it modular.

CSS modules is only the system by which css can be processed within JS and attached to the browser, either by exporting into a separate .css file, injecting inline <style> tag, or even (not seen here) attach inline css to the elements themselves.

The thing is that we can play with the classes and insert elements in the .html file, but if we do this, and establish dependencies using JS import, but there is no connection b/w the tags in the html file and the classes we are playing with in JS. That  is, we are still uisng GLOBAL css (normal css). And the objective is to use modular css by essentially using global css with auto-generated crazy hashed random class names to give the illusion of local scoped css modules. But to do that, we must tie the generated class names to the html tags. So we must manage our html from within JS as well, which is when document.write() comes into play.

Which is why React is great, because it has ReactDOM.render() instead of using document.write(). But essentially both inject html into the DOM. So having the mechanism for html injection secured, we can then use the whole react framework. The whole framework is based on injecting HTML. great!

# loader is not same as loaders

`loader` prop only takes a single loader names as a string.

`loaders` (plural) prop takes any number of loaders as an array of strings.

# Static generator plugin

Requires a function

```js
function (locals, callback) {
  // locals represents the route we want rendered
  callback(err /*null*/, HTMLString)
}
```

Then inside here we use a few React functions to understand the routes being passed to us, and we channel, using react functions, the result of the route location interpretation into our router, and ask another react function to turn that into html.



# CSS Modules and React

# Images

http://www.davidmeents.com/how-to-set-up-webpack-image-loader/

# Multiple entry points and backend webpack

https://leanpub.com/setting-up-es6/read#sec_nodejs-babel-static
https://webpack.github.io/docs/multiple-entry-points.html
