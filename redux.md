# Redux

Before diving into Redux, it is very important to understand three basic concepts.

## State representation

The *state* is the minimal representation of the data of your app. The whole state of your app is going to be represented by a **single** javascript object.

The object may be as simple or complex as you need it to be, but there is only going to be one for the entire app.

For example, if you are logging all keys pressed by a user, the state of your app can be represented by a string. Everytime a user presses a key, the state object is updated by appending a character to the  end of the string.
```
state 1: ''
state 2: 'h'
state 3: 'he'
...
state 6: 'hello'
```

A more complex example would be an app that tracks what a user types in several fields. In that case, you can have an array, one for each field the user can type in, and update each string accordingly. For two fields, this could look something like:

```
state 1: ['','']
state 2: ['h','']
...
state n: ['hello', 'world']
```

The object used to represent the state of the app may be **chosen freely**: from a simple integer to a multi-nested multi-property object.

## Dispatching actions

Redux works on the premise that the **state is read-only**. When a change of state occurs, instead of direclty modifying the state object, we make use of an object describing the change that is taking place. Using this object to actually change the state is called **dispatching an action**.

An action is just an arbitrary object that describes a change in state. The only property required by Redux in an action object is `type`. The value of type, however, is also chosen freely. Usually, a succint yet descriptive string is used.

In short, an action is the minimal representation of a change in the data

In the case of our simple key logger, an action could look something like
```
Action dispatch:
{
  key: 'h',
  type: 'KEYPRESS'
}

Action dispatch:
{
  key: 'e',
  type: 'KEYPRESS'
}
```

In the case of the two-input field example, the dispatched actions may look something like:
```
Action dispatch:
{
  field: 0,
  key: 'h',
  type: 'KEYPRESS'
}

Action dispatch:
{
  field: 1,
  key: 'w',
  type: 'KEYPRESS'
}
```

To recap, the whole state of the app is represented by a single object, and changes to the state object are described by actions, themselves arbitrary objects too.

Therefore, all that is missing is a reliable way of using an action to update the state. This is called dispatching an action and, as seen in the next section, is done with the use of pure functions.

## Reducer Function

The reducer function is how the state gets updated. Its a partiular type of function: a **pure function**. The reducer function will take two arguments: the current state and an action, and it will return the next state.
```js
function reducer(state, action) {
  // operations
  return nextState;
}
```

A pure function is one that has no side effects, and always produces the same output for the same given inputs. Side effects are anything that can modify already existing values or perform any type of request. Why is this important? Because we expect the same next state to be computed every time the reducer is run with the same arguments. Otherwise, the change of state would not be consitent, in turn making the app lose consistnecy.

In the case of our complex keylogger, the reducer function may look something like
```js
function reducer(state, action) {
  nextState = {};
  return nextState
}
```

Note that **the reducer does not modify the current state**.


The philosophy behind using a pure function for the reducer is that changes of state become predictable and therefore manageable, since the new state is a direct (pure) function of the previous.

Two philosophies at play:
* Make the UI a direct function of the state
* Make state changes direct function of actions
By adopting this philosophy, the app UI becomes predictable and manageable.

# Testing a reducer

When writing tests for a reducer,
* Basic state-change tests
* State should not be modified for unknown actions
* Convention for state initialization: reducer will return initial state for an `undefined` action.

# Setting up Redux

Use `createStore` to create a container for state data
```js
const {createStore} = Redux;
const store = createStore(reducer);
```

Three important methods of the `store` object:
```js
store.getState(); // returns current state
store.dispatch({type: 'KEYPRESS'}); // dispatches action, changing state
store.subscribe(() => {
  // this function will be called whenever dispatch is run
  // very useful for updating UI with the new state
});
