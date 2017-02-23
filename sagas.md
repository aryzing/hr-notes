# Sagas

[Repo][repo] and [Book][book]

# Basic Intro

Sagas are generator functions run by the Sagas middleware for redux. Sagas can yield:

* Promise. will wait for resolution
* Object w/ instructions (called Effect)
* Array. executes sagas in parallel. Elements are must be one of these types.
* Generator (another saga).
* Bonus: using `yield*`

# Saga Helpers

source: https://yelouafi.github.io/redux-saga/docs/basics/UsingSagaHelpers.html

> helper functions are built on top of the lower level API.

... the lower level **Saga API**.

# Most common yield operations

* When does yield return a value (.next(value))?
* Regular functions do not block
* Types of values that may be yielded?
* How/when do redux actions come into play?

## `yield` return values

A `yield` expression will evaluate to a value when:

### A Promise is yielded and it resolves

Will return the resolved value of a Promise

```js
function middleware(p) {
  p.then(onResolve, onReject)

  function onResolve(pojo) {
    g.next(pojo)
  }

  function onReject(pojo) {
    g.throw(pojo)
  }
}
```

### A function is yielded

Return value of the function

### A `call()` Effect is yielded

The return value of the function will be assigned to the yield expression.

```js
function middleware(f, ...args) {
  try {
    g.next(f(...args))
  } catch (err) {
    g.throw(err)
  }
}
```

The return value of a generator will be assigned to the yield expression

The resolved value of a Promise will be assigned to the yield expression

### A `cps()` Effect is yielded

For node style (error first) callback

### A `select()` Effect is yielded

Returns state

### A `take()` Effect is yielded

Returns matched action

### A `fork()` Effect is yielded

The id of the forked task

### A `cancelled()` Effect is yielded

Boolean on whether the task was cancelled or not

### An array of elements is yielded

Elements must be either generator, Effect, Promise or function. Will return array of equal length with return values of each operation

### A generator is yielded

The return value of the generator

### A `race()` Effect is yielded

An object with one value per operation. Only the operation that wins the race will have a value in the returned object.

Interesting pattern:

```js
yield race({
  task: call(backgroundTask),
  cancel: take('CANCEL_TASK')
})
```

### A `takeEvery` Effect is yielded

The id of the forked task

## Blocking

### Yielding a function

> If the result is not an Iterator object nor a Promise, the middleware will immediately return that value back to the saga, so that it can resume its execution synchronously.

### Yielding an array

> When we yield an array of effects, the generator is blocked until all the effects are resolved or as soon as one is rejected (just like how `Promise.all` behaves).


## Types of values that may be yielded

* Promises - Will block Saga. Promise resolve value will be value of yield expression
* Effects (POJOs) - Instructions to Saga middleware
* Arrays - Start parallel tasks. Like forking them all. Will block and return array with returned values from all operations.
* Generators - Will run generator, and its return value will be value of yield expression

## How/when do redux actions come into play??

Yielding `take` returns the matched action.

The helper Effects `takeEvery` and `takeLatest` append the matched action to the called function.

# Bonus: using `yield*`

https://github.com/yelouafi/redux-saga/issues/318#issuecomment-228790459

# Quirk

`takeEvery` only works with named functions. Deep down in the code it eventually calls `fn.name` and uses that value, so eventually this will produce an error.

# Yielding "forEach"

From: https://github.com/yelouafi/redux-saga/issues/306#issuecomment-217141546

Use map,

```js
function* mySaga() {
  yield [1,2,3].map(x => call(foo, bar));
}
```

[repo]: https://github.com/redux-saga/redux-saga

[book]: https://redux-saga.github.io/redux-saga/
