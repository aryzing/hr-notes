# Login flow

Token assumptions:

* Requesting a new token does not invalidate previously requested tokens
  * Does this even matter?
* Tokens emitted with 30 minute life

Flow assumptions:

* Will temporarily leave out tweaks and optimizations such as debouncing or throttling of requests

Server response assumptions:

* Server returns with 401 when credentials invalid
  * I don't think this will be too much of a problem, can still make client hanlde correctly on any 4XX error.

Flow when logging in:

* Client attempts log in
* If log in invalid, show invalid credentials
* Else, log in

Flow when saving:

* Client attempts to save
* If token valid, save occurs and server returns 200
* If token invalid (returned 4xx), user must log in.
* Possibiliites:
  * User taken back to login page.
    * Login procedure repeats
    * Must not overwrite unsaved changes once logged in
  * User signs in with modal.
    * After logging in, must make sure that the flow stops and that no redirection to main page occurs
      * No navigating away, b/c it is distracting
      * No navigating away b/c if components are reloaded due to navigation they could overwrite store data

# JWT

CSRF: sending request to another site while viewing a malicious site.

Works because cookies are global: cookies are always sent by browser with **all** requests to a domain if cookies for that domain exist.

No cookies to store data => no CSRF possible :)

Still vulnerable to XSS (the injection of custom JS into another site).

Regardless, if a malicious user obtains the cookie or the token, its game over. Unless users prompted for password too.

# Saga implementation

Final consideration:

After user logs in, there is no auto save. The user must click the save button again.

```js
function* watchLogin() {
  yield fork(session)
}

function* session() {
  while (true) {
    var { payload: { username, password } } = yield take('LOGIN')
    var auth = yield fork(authenticate)
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    yield cancel(auth)
    yield call(clearToken())
  }
}

// logic for retrying based on server errors goes here
function* authenticate(...args) {
  try {
    var token = yield call(Api.fetch, ...args)
    var call(saveToken(token))
    yield put({type: 'LOGIN_SUCCESS'})
  } catch (err) {
    put({type: 'LOGIN_ERROR'})
  }
}

function* watchSave() {
  yield fork(save)
}

function* save() {
  while (true) {
    yield take('SAVE')
    yield put({type: 'ATTEMPT_SAVE'})
    try {
      var dataToSave = yield select(settingsReducer)
      var response = yield call(Api.fetch, '/save', dataToSave)
      yield put({type: 'SAVE_SUCCESS', payload: response})
    } catch (err) {
      if (err.code === '401') {
        yield put({type: 'SHOW_LOGIN_MODAL'})
        yield take('LOGIN_SUCCESS')
        yield put({type: 'HIDE_LOGIN_MODAL'})
        yield put({type: 'SAVE'})
      }
    }
  }
}

function* request() {
  for(let i = 0; i < 5; i++) {
    try {
      const apiResponse = yield call(apiRequest, { data });
      return apiResponse;
    } catch(err) {
      if(i < 5) {
        yield call(delay, 2000);
      }
    }
  }
  // attempts failed after 5x2secs
  throw new Error('API request failed');
}
