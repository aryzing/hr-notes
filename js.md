# Underbar functions

```js
identity(val);
first(array, n);
last(array, n);
each(collection, iterator);         iterator(value, key, collection);
indexOf(array, target);
filter(collection, test);           test(value, key, collection);
reject(collection, test);
uniq(array);
map(collection, iterator);          iterator(value, key, collection);
pluck(collection, key);
reduce(collection, iterator, memo); iterator(memo, value, key);
contains(collection, target);
every(collection, iterator);        iterator(value, key, collection);
some(collection, iterator);         iterator(value, key, collection);
extend(obj, ...objs);
defaults(obj, ...objs);
once(func);
memoize(func);
delay(func, wait, ...args);
```

# Getters and Setters

JS provides a technique to make getter and setter methods on an object appear as properties:

```js
var user = {
  get name() {
    return theUsername;
  },

  set name(val) {
    if (authenticated) {
      theUsername = val;
    } else {
      console.log('Must authenticate first.');
    }
  }
}
```

# Inner working of requiring

Points to note:
* The `code` function plans to be used as a module and therefore attaches properties to `exports` or assignes `module.exports` a new value.
* The require function will return the value of `module.exports`.

```js
function require(name) {
  if (name in require.cache)
    return require.cache[name];

  var code = new Function("exports, module", readFile(name));
  var exports = {}, module = {exports: exports};
  code(exports, module);

  require.cache[name] = module.exports;
  return module.exports;
}
require.cache = Object.create(null);
```
