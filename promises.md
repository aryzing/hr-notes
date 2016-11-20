# Promises

Conceptually, "a `Promise` represents a value which may be available now, or in the future, or never" - [MDN Promise][1]. Promises are implemented by making async functions return an instance of a Promise which conform to a specific API.

The Promise object returned provides a means of accesing the potentially async value, treat it, and possibly run another Promise, allowing these to be chained together.

# Interacting with Promises

Usually we will use a library which says that a particular function returns a Promise

Usually we will be using Promises when using a library that performs async operations. For exxample, fetch, mongoDB queries, etc. These libraries provide functions which perfrom an async operation and return a promise object that represents the value of the operation.

When using these libraries, the Promise conforming object their functions return has been created by them, and we need not have a native Promise support to use them. If we wish to create our own promises, then we must ensure execution env has Promises or import a Promise library.

# Creating Promises

If the current JS environment does not support Promises natively, we may use a [Promise library](https://promisesaplus.com/implementations). A good Promise library for Node is [`bluebird`](https://github.com/petkaantonov/bluebird).

```js
var Promise = require('bluebird');
```

Functions returning a Promise can be manually created, or we can use the built-in promise generator:

```js
var taskFuncAsync = Promise.promisify(taskFunc);
```

Using the promise generator is shorthand for taking contents `taskFunc` and declaring `taskFuncAsync` which returns a `new Promise`. The argument to the promise constructor would be a function with the contents of the original `taskFunc`, with a slight modification: valid results are passed to `resolve`, and errors to `reject`. Both are arguments passed to the function used by the constructor. The long-hand version, which is necessary when the function does not conform to the error-first callback syle is

```js
function taskFuncAsync() {
  return new Promise(function(resolve, reject) {
    // async operations
    // ...
    if (cond) {
      resolve(validResultsFromOperations);
    } else if (!cond) {
      reject(new Error('I blew up!'));
    }
  });
}
```

For `promisify` to succeed, `taskFunc` must be declared such that its last argument is an **error-first callback**: a function that takes two arguments, the first of which is any resulting error from async operations, and the second any valid results produced.

```js
var callback = (err, result) {
  if (err) {
    // handle the error (fail safe)
  } else {
    // use results
  }
}
```

To put it all together, `taskFunc` should have the following general structure:

```js
function taskFunc(...args, callback) {
  // async operations
  // ...
  if (cond) {
    callback(null, result);
  } else if (!cond) {
    callback(new Error('I blew up!'));
  }
}
```

# Using Promises

So, how does the promisified function work? It can be called as expected, but there is no need to supply a callback. Instead, subsequent operations can be queued using the `then` method. This method takes two functions as arguments, the first of which is executed if the Promise was succesful and the second if it was not.

```js
taskFuncAsync(...args)
  .then(function resolved(result){}, function rejected(err){});
```

Note that when talking about a succesful or unsuccesful promise, we are actually referring to the success of the function which returns the Promise instance and usually.

Looking back at the long-typed version of promises, it is perhaps easier to understand what is going on. `taskFuncAsync` is a function that returns a **Promise instance**. This promise object has acces to a `then` method, and can execute subsequent operations *depending* on the task's success.

Since `then` is itself a function that is invoked, it must return... *something*. It turns out that it returns a promise, and is therefore **chainable**:

```js
taskFuncAsync(...args)
  .then(function resolved(result){}, function rejected(err){})
  .then(function resolved(result){}, function rejected(err){})
  .then(function resolved(result){}, function rejected(err){});
  // ... and so on
```

However, there is not much point in chaining `then`s if the their respective `resolved` and `rejected` are synchronous. That would mean that all statements in consecutive calls could be grouped into a single `then`.

Before taking things to the next level, it is worth mentioning that the value returned by whichever of the `resolved`/`rejected` pair is executed, is used as the argument of the subsequent pair.

Moreover, if the value returned is an instance of a promise, it will be evaluated and the appropriate subsequent `resolved` or `rejected` callback will be executed with the value the promise produced.

As a final note, both `resolved` and `rejected` are optional, although at least one has to be present. Any promises that get run along the way, will "remember" the success or failure of their operations, and will execute, respectively, the closest `resolved` or `rejected` block.

Example 1:
```js
taskFuncAsync(...args)             // success
  .then(null       , (err) => {})  // skip
  .then(null       , (err) => {})  // skip
  .then((res) => {}, (err) => {}); // execute resolve
```

Example 2:
```js
taskFuncAsync(...args)             // success
  .then((res) => {}, (err) => {})  // error
  .then((res) => {}, null       )  // skip
  .then((res) => {}, null       )  // skip
  .then(null       , (err) => {})  // execute rejected, success
  .then((res) => {}, (err) => {}); // execute resolve
```

## Useful links and resources

[Promise Standard by Promise/A+](https://promisesaplus.com/).

[MDN Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).


[MDN Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
