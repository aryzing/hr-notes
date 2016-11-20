// how to make the login flow

function* rootSaga () {
  yield fork(authSaga)
}

function* authSaga () {
  while (true) {
    yield take('LOGIN')
    var login = yield fork(attemptLogin)
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    yield cancel(login)
// ?> do normal functions block as well? i.e. miss dispatched actions?
    yield call(removeToken)
  }
}

function* attemptLogin () {
  var token = null
  while (true) {
    for (var i = 0; i < 3; i++) {
      try {
        var token = yield call(Api.fetch, args)
        yield put({type: 'LOGIN_SUCCESS', token})
        yield call(Api.storeToken, token)
        return token
      } catch (error) {
        console.log(`Login attempt ${i + 1} failed, retrying...`)
        yield put({type: 'LOGIN_RETRY'})
        yield call(delay, 1000)
      }
    }
    console.log(`Login attempts failed. Will continue in background`)
    yield fork(continueTrying)
  }
}

/*
# Return values of yielding

`take` returns the action object
`fork` returns an id to the forked task (so it can be cancelled)
?> How does the returning of promises work?
`fn() -> Promise` returns

# The argument to fork is the function we want executed
When yielding to another Saga, we yield the generator iterator
Same with arrays
?> But I believe we can also call a saga, but I don't know if we call the saga function, or the iterator object

# Cancellation and errors
Cancelling a task (only possible if forked) will cancel the
*/
