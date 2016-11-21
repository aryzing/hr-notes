# Sagas

source: https://yelouafi.github.io/redux-saga/docs/introduction/BeginnerTutorial.html

# Basic Intro

Sagas can yield

* Promise. will wait for resolution
* Object w/ instructions
* Array. executes sagas in parallel. Elements are `saga()` iterators.

# Saga Helpers

source: https://yelouafi.github.io/redux-saga/docs/basics/UsingSagaHelpers.html

> helper functions are built on top of the lower level API.

... the lower level **Saga API**.

# Most common yield operations

When does yield return a value (.next(value))
Regular functions do not block
Types of values that may be yielded
When are actions supplied to sagas?

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

Returns action

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

## When are actions supplied to sagas or yielded?

Yielding `take` returns the matched action.

The helper Effects `takeEvery` and `takeLatest` append the matched action to the called function.
