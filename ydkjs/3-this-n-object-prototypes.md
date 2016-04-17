# `this` & Object Prototypes
## `this` or That?
* The `this` mechanism provides a cleaner way of "passing along" an object.
Function declarations add function name to the current scope, so no issue calling the function from within itself because even if itself was not part of own lexical scope, it would fall back to the enclosing scope which contains a reference to it. However, since named function expressions are able to reference themselves within thier scope, I am assuming that the name of the function gets added to both the scope where it is defined *and* the scope it creates.

## `this` All Makes Sense Now
* `this` is a binding dependant on its function's **call-site**.
* Four cases for binding: **Default**, **Implicit**, **Explicit**, **`new`**.
* If a primitive type is passed in explicit binding, it will be boxed: `new String()`, `new Boolean()`, `new Number`.
* **Hard Binding** is a pattern where the desired binding is explicitly set within the scope of another function which, which can then be used elsewhere. If a framework changes the `this` of the outer function, the explicit binding within it will remain.
```js
// simple `bind` helper
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments);
  }
}
```
* Hard binding so common that ES5 introduced `Function.prototype.bind` which does what the snippet above does:
```js
var b = myFunc.bind(objToBindTo);
console.log(b.name) // "bound myFunc". Will show up in stack trace
```
* In JS, constructors are just functins that happen to be called with `new`.
* `new` steps: brand new object created, its prototype linked to the function, bound to this of the function, new experession evaluated to the object unless function returns a different object.
* Creation of totally empty object to assign to `this` during explicit binding call: `Object.create(null)`.
* Useful for calling functions with `apply` with array of arguments (esp. functions you don't control) b/c with null/undefined could get bound to global if non strict mode.
* ES6 `func(...[a,b,c]);`
* ES6 fat arrow notation `=>`. `this` of fat arrow function is same as that of enclosing scope: **lexical `this`**.

## Objects
* Better to create them in literal syntax.
* Six primary types: `string`, `number`, `boolean`, `null`, `undefined`, `object`.
* Five primitive types (all but object).
* Built-in objects: `String`, `Number`, `Boolean`, `Object`, `Function`, `Array`, `Date`, `RegExp`, `Error`.
* "Built-in objects" are all functions. Remember, a function is a sub-type of object.
* A function is just a callable object.
* When primitives are used, they are coerced into one of these objects if necessary.
* `null` and `undefined` have no wrapper/box.
* `Object`s, `Array`s, `Function`s and `RegExp`s are always objects
* Don't use built-in objects as constructors unless the extra functionality they offer is needed.
* Even properties have properties:
```js
Object.defineProperty(myObject, 'a', {
  value: 2,
  writable: true,
  configurable: true,
  enumberable: true
});
```
* `Object.preventExtensions(myObj);`
* `Object.seal(myObj);`
* `Object.freeze(myObj);`
* `[[Get]]` and `[[Set]]` operations can be modified on a per property basis.
* Keyword `in` checks object and prototype chain, for-in loops too!
* Alternatively, `myObj.hasOwnProperty('a');` does not follow prototype.
* For object without prototype, `Object.prototype.hasOwnProperty.call(myObj, 'a');`.

# Mixing (Up) "Class" Objects
# Prototypes
* `for..in` will check entire prototype chain for `enumerable` properties.
* The `in` operator checks entire prototype chain.
Important to understand how assignment is made, scenario: `myObject.foo = 'bar';` and foo is **not** in `myObject` but **is** in `[[Prototype]]` chain.
1. Normal data accessor in `[[Prototype]]` with `writable:true`, then `foo` is added to `myObject`.
2. Normal data accessor with `writable:false`, error thrown in strict mode.
3. `foo` is found in `[[Prototype]]` as a setter, runs the setter.
For cases 2 and 3 must use `Object.defineProperty`.
* No class "blueprints", *there's just the object*.
* All functions (function object) get `prototype`, "Foo's prototype" --> "the object formerly known as Foo's prototype" === "object arbitrarily labeled 'Foo dot prototype'".
* The object `prototype` is only linked automatically to functions.
* The prototype chain is just based on a "link" between objects, and some strange behavior comes from the fact that all functions have a `prototype` object to which all objects created with `new Func` get linked to.
* More interestingly still, `protoype` has `prototype.constructor` which is a reference to the function itself.
* Functions aren't constructors, but function calls are "constructor calls" if and only if `new` is used.
* At the topmost level of a typical `[[Prototype]]` chain is one of the built-in function's `prototype` object.
* JS is just a language that provides objects and primitive types, callable objects are functions, and the language provides 7 default functions that by default have a prototype and that by default end up creating all objects and functions used. Provides autoboxing for primitives, and a way to have no prototype linked free floating objects.
* Prototype and constructor properties are just filled in and linked by default, but they are no more special than any other object, and therefore may be just as well overwritten.
* The concept of prototype is that of a delegation/backup object for properties.
* Prior to ES6, can't change prototype of an object.
* `instanceOf` needs object and function. Automatically assumes function has a `.prototype` and checks to see whether that object that belongs to the function object is in the prototype chain of the object.
```js
a instanceof Foo;
```
* `.isPrototypeOf` works with two objects.
```js
ob1.isPrototypeOf(ob2);
```
* Basically `instanceof` of is a particular case of `isPrototypeOf` that assumes that one of the objects is the `prototype` property of the supplied function.
* To access an object's prototype: `Object.getPrototypeOf(ob);`.
* If you dont want to jump through function prototype hoops, just use `Object.create(..);`.
