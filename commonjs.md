# Relation between CommonJS, AMD and RequireJS?

source: http://stackoverflow.com/questions/16521471/relation-between-commonjs-amd-and-requirejs

CommonJS and AMD are standards (APIs) on how to write JS across multiple source files. To create and execute the application, they must be linked. ECMA does not define any linking mechanism, so these are "private" initiatives. So the environment that runs the JS project must either have built-in capabilities to process apps that use these or other standards, or be given something that has already taken care of the linking process (transpilation).

Browsers don't have anything, so projects must be transpiled to make them browser friendly.

Node has CommonJS built-in.

Babel transpiles advanced language features. `import`/`export` statements are syntactic sugar over "regular" commonJS API. `babel` does not perform the linking, but it does revert these advanced features to the classic `require`. It is then webpack that performs the linking (by essentially reading and analyzing all files and putting them all into a single file).

# > http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/
