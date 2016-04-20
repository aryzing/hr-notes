# Types & Grammar
## Types
* ECMAScript defines the built-in types: `boolean`, `null`, `undefined`, `string`, `number`, `object`, + `symbol` in ES6.
* All evaluate to their names with `typeof`, except:
```js
typeof null; // "object"
typeof myFunc; // "function"
```
* Functions though are a subtype of object with internal `[[Call]]` property.
* Values have types, not variables. Variables can hold any value at any time.
* `typeof` undeclared returns `'undefined'`.

## Values
* Arrays are object with auto `length` property that only counts numerical properties, even if sparse.
* Attention! In ES6 `arguments` deprecated, use **rest parameter syntax**.
* Until then, `var arr = Array.prototype.slice.call(arguments);`
* Strings and arrays are similar.
* Strings are immutable, arrays are mutable
* Therefore, none of the string methods can alter its contents, they always return new strings.
* Some `Array.prototype` methods can be applied on strings, those that return a new object.
* Convenient to convert string to array to perform desired operation: `a.split('')`;
* JS just has one numeric type: `number`.
* Uses IEEE 754
* Numbers autoboxed to `Number`, beware of decimal `.`. To access properties, use double decimal `..`.
* Small decimal values: problems due to machine epsilon. Whole numbers up to trillions are ok
* Maximum integer that can be safely represented: `2^53 - 1` = `9007199254740991`.
* `Number.MAX_SAFE_INTEGER`.
* `Number.isInteger(42.0) // true`.
* `Number.isSafeInteger();`.
* Non-value values: `undefined` and `null`.
* Warning, ES5 `undefined` is an identifier!
* Operator `void` voids out and expression, no matter the expression, it will always evaluate to undefined.
* `NaN` is produced when there is an operand that is expected to be a number and is not, or can't be coerced to one.
* `typeof NaN // number`.
* Any operation numerical operation with `NaN` evaluates to `NaN`.
* `NaN` is not equal to itself: `NaN !== NaN // true`.
* To test for `NaN`: `Number.isNaN(NaN) // true`. ES6+
* In JS the *type* of a value solely controls whether that value will be assigned by value-copy or by reference-copy.
* Primitives are pass by value, objects are pass by reference.
