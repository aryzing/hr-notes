/*

notes from: https://yelouafi.github.io/redux-saga/docs/basics/UsingSagaHelpers.html

# 2.1 Using Saga Helpers

The conecpt of the Saga API: lower level functions. Users should not go below this level.

That is, in fact, the concept of API in general: what the outside world has to play with.

Sagas comes with helper functions for common API usage patterns

`takeEvery`

Common AJAX example:

*/

import { call, put } from 'redux-saga/effects'

export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.url)
    yield put({type: 'FETCH_SUCCEEDED', data})
  } catch (err) {
    yield put({type: 'FETCH_FAILED', err})
  }
}

import { takeEvery } from 'redux-saga'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}

/*

`takeEvery` second argument is the function, which can be a saga.
Of course b/c built atop API call which we know takes a function

Allows multiple instances of `fetchData` to run.

#?> What does this mean? We know JS is not parallel. So it is probably implmented something like using the function to create a new generator object, and add it to an array of objects that on each pass get asked for their respective .next() values if the middleware wants to. And one by one, all of them get asked for .next()
#?> Generators (own scope, understanding what it is) + Saga middleware = simulation of parallel events.

Also have `takeLatest` available.

#?>>>>>>>>>>>>>>>>>>> Important
#?> The blocking concept. What parts of the function are executed before the next "requestAnimationFrame", in the same run cycle/stack
#?> What sagas get passed actions? All sagas get passed dispatched actions?
#?> Do put actions go back through the entire saga middleware? I think they do
