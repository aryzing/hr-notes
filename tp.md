# Setup and stuff to look into

* Atom configuration files
* Sagas + anything on ponyfoo
* Promises

## Promises

https://promisesaplus.com/

## Sagas

Seperate thread solely responsible for side effects.

`redux-saga` is redux middleware. Thread can be started, paused, and cancelled from app with redux actions, has access to state, and can itself dispatch actions.

Uses ES6 Generators.

## ES6 Iterators - ponyfoo

Two new protocols ES6: **Iterators** and **Iterables**. Iterable protocol allows you to define "under the hood" behavior of JS iteration on iterable objects. Modifies `@@iterator` method.

Protocols aka conventions.

[From MDN][mdn-iterables], new additions to the language include not only  built-ins and syntax, but protocols too. Protocols can be implemented by any object respecting conventions.

Example: **Iterable protocol** and **Iterator protocol**. These look like two different protocols, but they seem to be closely related.

To be iterable, but implement `@@iterator` method (or be in prototype). In other words, must have a key with the name `@@iterator`. This key name is accessible via the constant `Symbol.iterator`.

Why can't I just declare this property like

```js
var a = {};
a["@@iterator"] = () => {/*...*/};
```

It seems that everything involving Symbol is in a realm of its own. `Symbol.iterator` does indeed access the `@@iterator` method, but it is like a language construct method, "under the hood" namesapce, not directly intended to be used by programmers for "habitual" programming, if that makes sense.

So, comming back to the discussion, an object can be made to conform to the iterable protocol by defining the `@@iterator` "language"/"under the hood" property, which is not the same as the `a["@@iterator"]` property.

Going back to MDN article.

An iteration function must be defined at the `@@iterator` key of an object, which is referenced using the constant `Symbol.iterator`.

The function is a zero arguments function that returns an object conforming to the iterator protocol.

On loop, the `@@iterator` method is called and the returned iterator is used to obtain values to be iterated.

So, up to here, the explanation of how and under which key to create the iterator function **is** the iterable protcol, meaning that this is what is necessary to make an object iterable.

Now, we will explain the iterator protocol, which defines how the object returned by the iterator function is used to defin the iteration sequence.

"An object is an iterator when it implements a `next()` method with the following semantics"

`next()` must return an object with two properties: `done` and `value`.

Small recap: The `@@iterator` method must return an object with a `next()` method that must return an object with two properties: `done` and `value`.

If any part of this does not work as expected, an error will emerge: "TypeError: iterator.next() returned a non-object value".

Looking into a few examples.

Example1: "Some iterators are in turn iterables". All this means is that iterators, which are just objects with a `next()` methods that operates according to the iterator convention, also have their `@@iterator` function defined too.

In the MDN article, there is a value whose type is `[object Array Iterator]`. I don't know if I myself can create a value with this type, or a similar one. To test this, I created the following script with the expectationt that the typeof would be something like `[object Iterator]`, but unfortunately it did not work.

```js
var a = {};

a[Symbol.iterator] = function () {
  return {
    next: function () {
      return {
        done: true
      };
    },
  };
};

typeof a; // object
```

I believe this is because the array iterator is a builtin, and thus `typeof` yields a value to that reflects the builtin nature of those iterators.

MDN article gets more intense during the builtin section. Going back to ponyfoo.

ponyfoo

The `@@iterator` methtod is called once when an object is to be iterated over. The iterator key must be accessed using square brackets because it's a *computed property*.

Very good paragraph from ponyfoo:

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

Iterators are *lazy in nature*. Sequence is accessed one item at a time. Of course it is, the `next()` function is executed everytime the next value in the iteration is necessary. This also opens the door to infinite series of values being valid series too.

Small incursion into infinite loops.

Simple, just never say that `done` is true. This can work for loops if we inted a loop to be infinite, but will not be useful when using the spread operator for example. `[...foo]` will stall program.

Finished ponyfoo article.

## ES6 Generators - ponyfoo

Can declare a *generator function* which returns *generator objects* which are iterable: `Array.from(g)`, `[...g]`, `for value of g`.

These functions declare a special kind of iterator. These iterators can suspend execution while retaining context.

A generator object is both iterable and iterator. Code excerpt from ponyfoo, explanation below.

```js
function* generator () {
  yield 'f'
  yield 'o'
  yield 'o'
}

var g = generator()
// a generator object g is built using the generator function
typeof g[Symbol.iterator] === 'function'
// it's an iterable because it has an @@iterator
typeof g.next === 'function'
// it's also an iterator because it has a .next method
g[Symbol.iterator]() === g
// the iterator for a generator object is the generator object itself
console.log([...g])
// <- ['f', 'o', 'o']
console.log(Array.from(g))
// <- ['f', 'o', 'o']
```

`g` is an interator, and the values of the iteration it provides are those yielded by the generator function. `g` is akin to an object with `.next()` method, and the values `.next()` would return are the yielded ones.

`g` is also iterable. This means that object `g` not only has something similar to a `.next()` method, but it also has a `@@iterator` method. This method must return an iterator, and it turns out the iterator it returns is `g` itself.

Going back to the generator function, between `yield` statements it can perform other operations. These are known as side effects.

The yield operator can be used with an asterisk, `yield*`, meaning that instead of returning the value it is given, it should instead treat the value as an iterable and have that object's `@@iterator` method provide the next values in the sequence.

To understand how values are provided by generator functions, each time a `next()` method is run, the generator function resumes execution where it left off. This means that a subsequent yield may be hit, or the end of the function may be reached, meaning that the result of `next().done` would be true.

Context is preserved across suspensions of a generator function. The four scenarios that will suspend execution are

* `yield` expression returning the next value.
* `return` statement returning the last value.
* `throw` statement halts execution.
* Reaching the end of the generator function, making `{done: true}`.

One note:
* They are "yield expressions", not "yield statements".

Lets dive a little deeper into generators

To consider: other methods (`.return()` and `.throw()`) as well as possibility of sending values into the generator (`.next(value)`).

Minor revelation: the keyword `yield` has been specifically created to be used with generators. I previously was mixing it up with `await`, so I though there were more purposes for it, and was not concentrating fully on its use.

Most generators are used using an inversion of control pattern, meaning that the values to iterate over, and thus the generator function as a whole, is what is passed into a function that handles the iteration.

> Letting the library deal with the flow control means you can just worry about whata you want to iterate over, and delegate how to iterate over it.

And now, let get into async.

Wow, it is pretty awesome. Basically, with the yield operator, we can create the following async pattern:

1. Pass generator function to consumer library with values we want processed.
2. The consumer library will iterate pop out the first value, take some action, and when done, can then call `.next()` method of the iterable generator object to process the next value. The "processing" of the value can be async, the generator function does not care, it simply produces the next desirable value in the sequence when requested and leaves the library to its processing.

In short, the most important aspect of generators is the control flow code that decides when to call `g.next()`.

What about error handling?

In async flow, if the ajax request fails,

```js
if (err) {
  g.throw(err)
}
```

But what exactly does this do? What happens if we omitted this statement, or just returned the function? I believe this will be a tricky one to find out!

Well, I think it wasn't that hard. All it means is that this error is as if after the last `yield` expression it stopped on, a line was magically inserted that trows an error.

The following is code that illustrates code that would have the same behavior as a `g.throw(err)` after having called `g.next()` twice.

```js
function* seq () {
  yield 1
  yield 2
  throw "Big fat error" // this line gets "inserted"
  yield 3
  yield 4
}
```

So now, if we want to handle the error, we have to wrap every yield expression in a `try / catch` block.

Finally, `g.return()` finalizes the sequence without any errors. I'm assuming it can take an argument that indicates the final value of the generator.

Attention! The convention with generators is that the iterator returns {done: true} when we are **passed** the final value. The behavior of having a `return` statement in the generator (as well as using `g.return()`) is that the iterator object's `next().done` will be true, so even if a value is returned, in most cases it will be ignored. It should be ignored. That is the behavior of the builtin functions that deal with iterators.

## Sagas

Official recommended articles  by Sagas creator:

* [ES6 Generators - Gajus Kuizinas][1]
* [ES6 Generators - Kyle Simpson][2]
* [ES6 Generators - Axel Rauschmayer][3]

Comparison of thunk and saga middleware: Thunk uses the `typeof` (presumably, or similar)  of the object to determine if it must deal with it, whereas Saga uses the type field of the action to determine if it must deal with it.

### First tutorial

[Beginner Tutorial][beginnertut].

The `delay` from `redux-saga` returns a Promise that resolves in the given amount of milliseconds. The Sagas middleware is designed to wait for Promises to resolve, and will halt the generator function for the specified amount of time.

Saga middleware uses `put` from `redux-saga/effects` to dispatch actions.

`put` is an example of an *Effect*. Effects are provided functions that tell the middleware what to do, halting the generator until the Effect is fulfilled.

Summary. Not necessarily in this order, but this is so far what I have done:

* Import tools from the Saga library to bootstrap the generators/sagas
* Run the bootstrapping code
* Import the sagas root
* Group all sagas in a root saga as an array
* Use redux tools to connect the saga middleware
* Create saga that actually performs what I waant
* Create listener saga


[mdn-iterables]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Iteration_protocols
[1]: http://gajus.com/blog/2/the-definitive-guide-to-the-javascript-generators
[2]: https://davidwalsh.name/es6-generators
[3]: http://www.2ality.com/2015/03/es6-generators.html
[beginnertut]: https://yelouafi.github.io/redux-saga/docs/introduction/BeginnerTutorial.html
