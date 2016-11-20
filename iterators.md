# ES6 Iterators

Notes from [ponyfoo iterators](https://ponyfoo.com/articles/es6-iterators-in-depth).

Two new protocols in ES6: **Iterable protocol** and **Iterator protocol**.

These protocols allow you to make an object an iterable and specify the iteration behavior.

[stackoverflow post][SO-iterator-iterable] on iterables and iterators.

To make an object an iterable, we must define an iterator method on the object or on its prototype chain. The method must be defined at a specific key refered to as the `@@iterator` key. This key is what is called a
[well-known symbol](http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols).

The key name is the result of the expression `Symbol.iterator`, meaning it is a computed property name, and must be accessed with `[]`.


```js
var a = {};
a["@@iterator"]    = () => {/*...*/}; // wrong
a[Symbol.iterator] = () => {/*...*/}; // right
```

The iterator method is a zero arguments function that returns an object conforming to the iterator protocol.

The iterator protocol states that the returned object must have a `.next()` method that produces the next value in an iterable's sequence. Specifically, `next()` returns an object with two properties: `done` and `value`.

Whenver a "built-in iteration" takes place, the `@@iterator` method is called and the returned iterator object is used to obtain the iteration values.

To put it all together, an object is an iterable when it has an `@@iterator` method that returns an object that is an iterator. The iterator object's `next()` method returns an object with two properties, `done` and `value`.

Food for thought: "Some iterators are in turn iterables". All this means is that iterators, which are objects with a `next()` method that produces values of some iterable, also have an `@@iterator` function defined.

> You can use `for..of` to iterate over any object that adheres to the iterable protocol. In ES6, that includes arrays, any objects with an user-defined `[Symbol.iterator]` method, generators, DOM node collections from `.querySelectorAll` and friends, etc. If you just want to “cast” any iterable into an array, a couple of terse alternatives would be using the spread operator and `Array.from`.

Two examples of why iterators are very useful:

1. Libraries such as lo-dash can implement their utility functions using constructs native to the language.
2. Array-like objects, such as argument lists or jQuery wrapped DOM nodes can be easily iterated over.

From 2, if jQuery implemented iterator protocol, code could look something like

```js
for (let list of $('ul')) {
  // list is a matched `ul` DOM node wrapped in jQuery
  for (let item of list.find('li')) {
    // item is `li` node child of the outer for's `ul`.
    console.log(item);
  }
}
```

Iterators are *lazy in nature*, meaning the sequence values are accessed one at a time. This allows for infinite sequences by creating an iterator that never returns `{done: true}`.

This works for loops if we inted a loop to be infinite, but will not be useful when using the spread operator for example. `[...foo]` will stall program.
