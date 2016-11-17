# Babel

Input:

```js
import mod from 'myPack'

var two = mod.meth();
export {two}

export const bleh = function bleh (arrrg) {
  return arrrg
}

export var three = 3;

export function anon() {
  return 1
}

var whatever = '?';
export default whatever;
```

Output:

```js
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.three = exports.bleh = exports.two = undefined;
exports.anon = anon;

var _myPack = require('myPack');

var _myPack2 = _interopRequireDefault(_myPack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var two = _myPack2.default.meth();
exports.two = two;
var bleh = exports.bleh = function bleh(arrrg) {
  return arrrg;
};

var three = exports.three = 3;

function anon() {
  return 1;
}

var whatever = '?';
exports.default = whatever;
```

# What we can learn

* To export a value, it must be preceded by the value definition type (`const`, `let`, `var`, `function`, `class`), keyword `default`, or be an an object where key is the export name, and the value is export value.

```
export <type_keyword> <name> # `name` will be export name
export {myEx} # export name will be `myEx`
export default <name> # default export, name is irrelevant
```

Note that curly braces after (right after) export keyword **do not represent objects**, they use their own export syntax.

# > https://developer.mozilla.org/en/docs/web/javascript/reference/statements/export
