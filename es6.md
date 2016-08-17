# ES6 Tips

Many of the new additions to the language are just syntactical sugar. The underlying mechanisms are the same.

The `class` keyword still creates a function, who's `prototype` object is the prototype of the instances it creates, and it too has a `constructor` property pointing to itself.

One of the main differences is that functions with `class` cannot be invoked without `new`.

Anything declared within the constructor gets attached to the instance, whereas everything outside the constructor gets added to the prototype and is shared by all instances.

```js
class Recepticle {
  constructor(liters, material, handFriendly) {
    this.volume = liters;
    this.material = material;
    this.canIHoldIt = handFriendly;
    this.fill = function () {
      console.log('Filling up!');
    }
  }
  empty() {
    console.log('Throwing out contents')
  }
}
```
Notice:
* No trailing commas after function names.
* Each instance will have a unique copy of a `fill` function. Altering this property will only change the behavior for the instance it is attached to.
* Function `empty` is shared by all instances and lives in `Recepticle.prototype`.

Additional comments:
```js
var glass = new Recepticle(0.25, 'glass', true);
var mug   = new Recepticle(0.30, 'ceramic', true);
glass.hasOwnProperty('fill')  // true
glass.hasOwnProperty('empty') // false
mug.__proto__.empty === glass.__proto__.empty // true
mug.fill === glass.fill       // false
```

Interesting [blog post](https://www.reinteractive.net/posts/235-es6-classes-and-javascript-prototypes).

Also, note that class definitions can only contain functions. Values are not allowed. All functions go to the prototype, except for `constructor`, which is used to actually build the object.

When extending a class, the extending class first needs to run the `super`. The followig snippet will produce an error:

```js
class Car extends Vehicle {
  constructor() {
    // super()
    this.interior = 'leather' // Error, no reference to `this`
  }
}
```

[Very good source](http://exploringjs.com/es6/ch_classes.html).

Classes are **not** hoisted because they can have an `extends` clause whose value is an **arbitrary expression**, which is evaluated at its "location" in the source.

Just like functions, there are two ways to define classes: **class declarations** and **class expression**. A class expression may be anonymous, and if named, it's name is only visible within its definition.

ES6 classes are **maximally minimal**: only accept static methods, getters, and setters. No static data.

A static method is a method within a class definition preceded by keyword `static`. These methods are attached to the function (runnable object) acting as a class, not to its `prototype` object.

To recap:
* No static data on class definitions
* Methods, getters, and setters are attached to `prototype`.
* `static` methods are attached to the function object.

# Object syntax
The code
```js
var a = {
  print() {console.log("hello");}
};
```

is equivalent to
```js
var a = {
  print: function print() {
    console.log("hello");
  }
};
```
