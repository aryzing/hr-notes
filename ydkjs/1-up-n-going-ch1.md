# Up & Going
## Chapter 1: Into Programming
* Expressions: *literal value expression*, *variable expression*, *arithmetic expression*, *assignment expression*, *call expression*.
* `Shift`+`Enter` in debugger allows for multiple line code.
* Keword `var` used to *declare* (aka *create*) variables.
* Types, primitives: number, string, boolean, and others.
* Coercion: changing from one type to another: *implicit* or *explicit*.
* Comments should explain *why* and optionally *how*. Not *what*.
* JS has no *static typing* aka *type enforcement*.
* JS uses *weak typing* aka *dynamic typing*.
* New constant variable declaration in ES6 with `const`.
* Assigning new value to a `const` will be ignred, and in strict mode an error is thrown.
* Group of statements between `{..}` is a block. Note that blocks don't end with `;`.
* For implicit coercion, some values are considered "falsy" and others "truthy".
* Function: a named section of code that can be "called" by name.
* Each function has *new lexical* scope.

## Chapter 2: Into JavaScript
* JS has typed values, not variables.
* Values: `string`, `number`, `boolean`, `null`, `undefined`, `object`, `symbol`.
* The `typeof` operator returns string value of the type of a value.
* Note, `typeof null` is `"object"`.
* Arrays and functions are object subtypes.
* `typeof myArray` returns `"object"`, yet `typeof myFunc` returns `"function"`.
* It appears that methods and properties can be called on methods: a *native* aka *object wrapper* pairs with a primitive type.
* When calling methods on primitives, these are automatially boxed in their object wrapper counterpart.
* Common wrappers: `string -> String`, `number -> Number`, `boolean -> Boolean`.
* Value comparisons, mainly *equality* and *inequality* always yield boolean value regardless of the type of the values compared.
* A "falsy" value is one that becomes `false` when coerced to a boolean.
* Falsy values are: `""`, `0`, `-0`, `NaN`, `null`, `undefined`, `false`.
* Any value that is not "falsy" is "truthy".
* *non-equality* (`=` and `!`) vs *inequality* (`<` and `>`).
* `==` value equality with coercion.
* `===` value equality without coercion.
* Coercion rules http://www.ecma-international.org/ecma-262/5.1/.
* Use `var` keyword to declare variable that will belong to current function scope, or global scope if at top level outside any function.
* *Hoisting*: a `var` declaration is conceptually taken to the top of the enclosing scope.
* *Is it possible that a variable is only hoisted if no assignment is made?*
* Hoisting also works with functions.
* *Not sure how `var a = function() {};` works*.
* Strict mode is good, brings improvements and compiler optimizations. `"use strict;"`.
* A function is just like any other value.
* *IIFE*: Immediately Invoked Function Expression
* IIFEs are commonly used to create new scopes.
* In strict mode, a function containing `this` not called as a methods will assign undefined to `this`.
* A *module* is a code pattern that takes advantage of closures: define private implementation details and a public API.
* *Alternative do module an object with private/public properites?*
* Four ways of using `this`: global (not in strict mode), `.` operator, `call`, `new`.
* When you reference a property on an object, if that property doesn't exist, JavaScript will automatically use that object's internal prototype reference to find another object to look for the property on.
* The internal prototype reference linkage from one object to its fallback happens at the time the object is created. (Automatic/implicit linkage).
* Explicit linkage: `var b = Object.create(a)`. If a property does not exist on `b`, it will be searched for in `a`.
* ES6: Provides `Number.isNaN()` to reliably check for `NaN`.
* Host object: an object provided by the environment that is not actually a JS object, but behaves like one. Example: `document` in browsers.
* `NaN` is only value in whole language not equal to itself.
* ES6 brings default parameter values: `function f(a=2){};`.

## Chapter 3. Into YDKJS

* Scopes & Closures
* `this` & Object Prototypes
* Types & Grammar
* Async & Performance
* ES6 & Beyond
