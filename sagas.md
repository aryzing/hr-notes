# Sagas

# Basic Intro

source: https://yelouafi.github.io/redux-saga/docs/introduction/BeginnerTutorial.html

Sagas can yield

* Promise. will wait for resolution
* Object w/ instructions
* Array. executes sagas in parallel. Elements are `saga()` iterators.

# Saga Helpers

source: https://yelouafi.github.io/redux-saga/docs/basics/UsingSagaHelpers.html

> helper functions are built on top of the lower level API.

... the lower level **Saga API**.

Sagas can yield a Promise, or an object that instructs to run a function which returns a Promise. Both are equivalent in behavior, but the latter is easier to debug.

If Promise, value of yield expression will be the resolved value.

The argument to the Saga is the dispatched action.

# Calling Promises

Promise can resolve (yield value expression) or reject (error is thrown to generator).

Can wrap Promises in own promise to catch error and return value, which counts as resolved promise, and deal with returned value in generator.

# Other

Forks make error in calling saga

Yielding arrays same as forking one after the other

Cancelling fork, makes all children forks cancel too
