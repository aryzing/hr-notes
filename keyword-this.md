# Keyword `this`
It is an *auto-bound identifier* intended to refer to some likely-focal object during method or constructor invocation.

Can be thought of similarly to arguments (formal parameters). You don't know what they evaluate to until runtime.

The difference between `this` and a named argument is the syntax for how values get bound to it at call time.

## Determining what `this` refers to
There are five ways `this` can appear in code. Each has a rule for determining what gets bound to `this` at run time.

To determine how `this` is being used, first find the function in which it appears, and then look for which function called that function, that is, is in the previous context scope.

**Global reference** Not enclosed by any function. Binding target: the global object. In a browser, it would get bound to `window`. Example:
```javascript
console.log(this);
```

**Free function invocation** Enclosed in a freely invoked function. Binding target: the global object. Example:
```javascript
var fn = function() {console.log(this);};

fn();
```

**Call or Apply** Enclosed in any function invoked with `call`/`apply`. Binding target: first argument of `call`/`apply`. Note that the `call`/`apply` functions are methods of all function objects. Therefore, it is indifferent whether the function `call`ed is a free function or a method of an object: `fn.call(target)` and `obj.fn.call(target)` are both the same case. `this` within `fn` will be bound to `target`. Example:
```javascript
var func = function() {console.log(this);};
var obj = {};

func.call(obj) // prints obj
```

**Method invocation** Enclosed in a function called as a method. Binding target: object the method was called on, or, in other words, the object the expression to the left of the call time dot evaluates to. Example:
```javascript
var func = function() {console.log(this);};
var obj = {mtd: fn};
var ob2 = {mt2: obj.mtd};

ob2.mt2() // logs ob2
```

**Constructor** Enclosed in function called with `new`. The function is treated as a constructor, and `this` binds to a new object the interpreter provides. Enables constructors to operate on the instance they are creating. Example:
```javascript
var func = function() {console.log(this);};
var inst = new func(); // will print the new object provided by interpreter
```
