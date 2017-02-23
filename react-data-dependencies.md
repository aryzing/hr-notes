# Async data dependencies with React and server side rendering

Before running the server-side render, you must have data required to properly render the application.

Upon receiving a request, the server must gather the necessary data before rendering. The data gathering may be async.

Next level: What if you are using redux for your data store, and using some kind of *Async Actions* to modify the store? You may want to run the Async Actions (the thunks, the sagas) that populate your store. So is there a way to conveniently store these actions to easily dispatch them for a successful SSR?

Furthermore, if you have client-side routing, you may not need "all" the data to succesfully render a particular route.

So, how and where do you express these async data dependencies? How do you act on them during SSR?

# Expressing components' data dependencies

# Cont

I think I'm forgetting how the data flow, async actions, thunks, and sagas work. Because I'm having a hard time thinking about how I would dispatch actions on the server, and only render after all of them have returned.

How do I know that the sagas have "finished"?

* Sagas are just like a thread right?

How do I know that the thunks have "finished"?

* Thunks are dispatched functions

What signals their end?

I should probably review them.

For now lets forget where these async action processors exist.

They are simply run from somewhere.

Ok, so where to go from here?

Why do I care about this?

Because I need to make my own component work, I need it to preload all the info necessary, and then I also need the sagas to work with the user's interaction.

Understand what it is I need to put in the prefetch.

Understand how the prefetching works (more for me than for the project)

Yesterday I found an interesting piece of code that I belive is key: knowing when the sagas have finished.

The code was

```js
store.runSaga(waitAll(preloaders)).done.then(() => {/*...*/})
```

I believe I might also have to understand how the route matching works, and what is in the `renderProps` object.

# Getting familiar with redux saga again

Somewhere in the code, an action is dispatched...

```js
dispatch({
  type: 'ACTION_TYPE',
  payload: {
    username: 'pablopicaso',
    password: '3lit3_4rtist'
  }
})
```

This action is intercepted by the Saga middleware before getting to the reducer.

Setting up the saga

```js
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga);
```

So the middlware is connected to the store, and the middleware is given the saga it must run.

The `rootSaga` is a generator, so the `run` function begins extracting values from it and setting things up. When it finishes, thats it, code execution resumes.

And just a look at a generator function, a typical root saga:

```js
function* rootSaga() {
  return [
    generator1,
    generator2,
    generator3,
    generatorN
  ]
}
```

Even before the concept of forking and returning an array with the root saga, you can just run a "regular" saga.

```js
sagaMiddlware.run(regularSaga)

function* regularSaga() {
  var a = yield take('ACTIONS_OF_THIS_TYPE')
  if (a.payload.someValue === true) {
    /*...*/
  }

  /* The saga terminates! */
}

function* regularInfiniteSaga() {
  while (true) {
    var a = yield take('ACTIONS_OF_THIS_TYPE')
    yield fork(/*...*/)
  }
  /* Infinite Saga */
}
```

There are two types of sagas: **finite** and **infinite** sagas. If the root saga is infinite, it means it will never end. The generator object will continue producing values.

If the saga is finite, it means that it terminates. What happens when the root saga terminates? What happens to the middleware? Does it stop? Good question.

Perhaps this can be linked to the different ways of calling the root saga,

```js
sagaMiddleware.run(rootSaga)
/* vs */
store.runSaga(rootSaga)
```

From the docs section:

* There is a section on the External API with the `runSaga` function.
* There is a section on `sagaMiddleware` with a `store.runSaga` call.

**Section on External API**: To run Sagas in an environment other than `redux`, use `runSaga`. This function is probably imported? Don't know how to access this function. Also read up on the Task API. Task is the object returned by `runSaga`. It returns an object with `.done` value which is a promise that specifies when the saga has finished. However, in the code, it appears to be called directly as a method, `store.runTask().done.then(/*...*/)`. Probably a minor detail.

**Section on sagaMiddleware**: The `runSaga` method from `store` is named the same as the `runSaga` available from the library, so it is a coincidence that I discovered `Task` class and the `.done` method that this method returns. This method is actually `sagaMiddleware.run` after running the store through a `configureStore` function. Regardless, the running of a saga produces/evaluates to a Task (or apparently has a `.done` method). Final investiagtion: `sagaMiddleware` function. There is nothing to investigate b/c it is not specified in the API.

Perhaps the store is modified in a way through one of the other misc functions in server.jsx that allows to call `.done`.

```js
const store = createStore(memoryHistory); // this store is not from `redux`
const history = syncHistoryWithStore(memoryHistory, store);

const routes = getRoutes(store);
```

I believe that now I have all I need to move forward with my component.

There are just two pending issues:

* How the channels work, and why `store.close()` is called and what are its effects
* How can `store.runSaga(/*...*/).done.then(() => {/*...*/})` work? The docs don't say that `.done` can be called as a method of `sagaMiddleware.run()`.

# Additional resources and links

[Redux recepies: SSR](http://redux.js.org/docs/recipes/ServerRendering.html)

Attach dependency info to routes or components

[Scotch.io tutorial: SSR](https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app)



[Medium post on SSR](https://medium.com/@dbow1234/expressing-data-dependencies-in-react-43a2004e04bc)
