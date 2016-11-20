/*

# Sagas

source: index2.js

# 1.1 Beginner Tutorial

1. Put all sagas in one file
2. Import desired sagas into file where connecting to redux middleware
3. Connect Sagas middleware to Redux
4. Bootstrap sagas

I'm sure that instead of having one root, we could have a `sagaMiddleware.run()` for each saga

*/

function* rootSaga() {
  yield [s_1(), s_2(), s_3()]
}
sagaMiddleware.run(rootSaga)

// or

sagaMiddleware.run(s_1)
sagaMiddleware.run(s_2)
sagaMiddleware.run(s_3)

/*

The Saga middleware responds to "plain" actions.

#?> `call` used to run functions, and their returned value treated as if it had been yielded
(yielding a promise vs a func that returns a promise)
so what happens if we call a fn that returns a Number, or what happnes if we yield a number?
does that value get used as the yield expression value, .next(val)?
