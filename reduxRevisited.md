# Redux

My learnigns from today

# Provider

The `<Provider store={store} />` component declares "global" namespace for descendants, and what items that namespace will have. This is done with two things:

* only returns its children
* in special function declares object with names and values we want made available to descendants
* declaring a propTypes with the type of each value in the object

Anecdotal: context of simple functional components is passed in as second argument.

# Containers may have different names than their connected components

We had a `TodoList` component and a `VisibleTodoList` container. The `TodoList` only renders a list of the items it receives as props. The `VisibleTodoList` decides what todos are actually passed as props.

# Connecting components to containers

The `connect` function, available as named-export of `react-redux`,

* Extracts store from context in `componentDidMount`.
* Declares appropriate propTypes to be able to extract store from context.
* Subscribes a function to run it's render method on store state change in `componentDidMount`.
* Unsubscribes the subscribed function in `componentDidUnmount`.

The container component it creates then renders the component passed in as argument and passes is the props supplied by the `mapStateToProps` and `mapDispatchToProps` functions.

If rendering subscription is not necessary => component doesn't use state, doesn't care about state, then does not need to render when it updates. Can pass in `null` instead of `mapStateToProps`.

If `connect` is only using `mapDispatchToProps` to only pass the `dispatch` method, `mapDispatchToProps` may be omitted.

If both no rendering is required and we only want to pass dispatch, we may call connect with no arguments: `connect()(ComponentName)`
