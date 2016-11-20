/*

# Sagas

Source: https://yelouafi.github.io/redux-saga/docs/introduction/BeginnerTutorial.html

# 1.1 Beginner Tutorial

Put all sagas in one file

Create the saga middleware and indicate sagas to run

Connect middleware to Redux

Bootstrap Sagas

*/

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { mySaga } from './sagas'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga)

/*

Sagas use plain object actions

The dispatching functions can be passed as props to components

Two import locations: `redux-saga` and `redux-saga/effects`

*/

import { delay, takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

// ?> build comprehensive list of these two import locations

/*

We can yield Promises, will block Saga until completed

> Sagas are implemented as Generator functions that yield objects to the redux-saga middleware

# ?> what types of objects can we yield
* Promises
* POJOS
* Arrays

The behavior of the Saga depends on the type of object

# ?> behavior by object type
* Promises: will wait until Promise complete
* POJOS: if crafted in a way that middleware understands (Effects) will do what effect instructs. Otherwise, don't know.
# ?> what happens when non-Effect POJO yielded?
* Array: starts sagas in parallel

`put` is an example of an effect: a function that returns an object that instructs the middleware what to do

Effect functions in `redux-saga/effects`, helper functions in `redux-saga`

Could have been other way arround:

*/

// do not use. only to exemplify alternative module organization
import { effect_1, effect_2, effect_N } from 'redux-saga'
import { helper_1, helper_2, helper_N } from 'redux-saga/utils'

/*

So can take objects w/ instructions, but understands other objects too

> When a middleware retrieves an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled.
# ?> Does this mean block? too early to think about blocking?

# ?> `takeEvery` not considered an effect? Still returns an object with instructions right?

All our sagas can be combined into a `rootSaga`

*/

export default function* rootSaga() {
  yield [saga_1(), saga_2(), saga_N()]
}

/*

Yielding an array, starts sagas in parallel

Array elements are generator objects
#?> array elements can probably take anything you can yield that middleware understands
#?> so you can `yield saga()`, but its best to `yield call(saga)`. same with array.

*/

import rootSaga from './sagas'
// create mid, create store, apply mid, and finally bootstrap:
sagaMiddleware.run(rootSaga)

/*

Testing done by

1. importing Saga
2. creating generator object
3. calling its `.next()` method
4. compare with {done: <bool>, value: <yield_arg_expression>}

Some yielded values hard to test against, like Promises

redux-sagas provides `call` helper

#?> this could be a world of its own. what does it take?
well, anything that can be yielded that the middleware is prepared to understand
not quite. you can yield a promise, but I don't know if you can `cal(promise)`

*/

import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'

export function* incrementAfterOneSecond() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}

/*

`call` takes the function name, not value returned by it.

#?> I wonder if `call(delay(1000))` works? will still get the promise in the end?

#?> Perhaps getting mixed up with yielding generator objects? but it's nothing
special yielding them, its the middleware that defines behavior upon receiving
one type of yielded object or another.

#?> one of two: call only understands functions,
or it understands everything that can be normally yielded (can you yield a generator function?)

Effects return object which are easy to test against:

*/

put({type: 'INCREMENT'}) // => { PUT: {type: 'INCREMENT'} }
call(delay, 1000)        // => { CALL: {fn: delay, args: [1000]}}

/*

Can use the effects themselves to create the test values:

*/

import test from 'tape';

import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { incrementAsync } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
});

/*
