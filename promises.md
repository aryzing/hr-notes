# Understanding promises

In node, promises can be used with `bluebird`:
```js
var Promise = require('bluebird');
```

Promises are objects. They can be manually created, or we can use the built-in promise generator:
```js
var taskFuncAsync = Promise.promisify(taskFunc);
```

Using the promise generator is shorthand for taking contents `taskFunc` and declaring `taskFuncAsync` which returns a `new Promise`. The argument to the promise constructor would be a function with the contents of the original `taskFunc`, with a slight modification: valid results are passed to `resolve`, and errors to `reject`. Both are arguments passed to the function used by the constructor.
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
  })
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

So, how does the promisified function work? It can be called as expected, but there is no need to supply a callback. Instead, subsequent operations can be queued using the `then` method. It takes two functions, which is executed depends on whether the function was succesful or an error was produced:
```js
taskFuncAsync(...args)
  .then(function resolved(result){}, function rejected(err){});
```

Looking back at the long-typed version of promises, it is perhaps easier to understand what is going on. `taskFuncAsync` is a function that returns a **promise instance**. This promise object has `then` somewhere in its prototype, and can delegate subsequent operations depending on the task's success.

Since `then` is itself a function that is invoked, it must return... *something*. It turns out that it returns a promise, and is therefore **chainable**:
```js
taskFuncAsync(...args)
  .then(function resolved(result){}, function rejected(err){})
  .then(function resolved(result){}, function rejected(err){})
  .then(function resolved(result){}, function rejected(err){});
  // ... and so on
```

However, there is not much point in chaining `then`s if the their respective `resolved` and `rejected` are synchronous. That would mean that all statements in consecutive calls could be grouped into a single `then`.

Before taking things to the next level, it is worth mentioning that the value returned by whichever of the `resolved`/`rejected` pair is executed, is used as the argument to whichever of the subsequent `resolved`/`rejected` pair is executed.

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
