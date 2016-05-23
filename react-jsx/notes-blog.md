# Transpile command
`babel . --out-dir compiled --presets=es2015,react --ignore=node_modules,compiled --source-maps inline`

# An array of React elements can be inserted into JSX tags
Just make sure to give each of them a unique key:
```js
class Inner extends React.Component {
  render() {
    return (
      <p>test</p>
    );
  }
}

class Outer extends React.Component {
  render() {
    var paragraphs = [];
    for (var i = 0; i < 10; i++) {
      paragraphs.push(<Second key={i}/>);
    }
    var result = (
      <div>{paragraphs}</div>
    );
    return result;
  }
}
ReactDOM.render(<Outer />, document.getElementById('app'));
```

# "Attribute" syntax
JSX attributes must either be strings or an expression enclosed in braces:

```js
<Chat user="Bernard" max-history={settings.user.histLength} />
```

# Components as functions
Technically classes are functions, but you are not allowed to run them. In react, when using JSX, to use a regular function as a component, it must return `createElement`s.

```js
// function that returns a component
var A = () => (
  <div>
    <p>Test</p>
    <p>Moar</p>
  <div/>
);

// can be rendered as is
ReactDOM.render(<A />, document.getElementById('app'));

// <El /> are function objects
```

# Inner workings of `React.createElement`
As you can see, a component may be either defined as a function or a class. When writing JSX, it may not be obvious how a component was defined, and in reality it does not really matter. Method `createElement` can deal with different situations.

`React.createElement` returns an object that is not a function. The method is called as `React.createElement(arg1, arg2, ...argN)`. To create the object, it interprets the arguments in the following way:
* `arg1`
    * `'string'` it must be a lowercase and match a valid HTML tag
    * `'function'`
        * If it has no prototype linkage to React, it is run and passed a single argument `arg2`. It must return React components.
        * If it has prototype linkage to React, can be interpreted as a class, a `new` instance is created and `arg2` is supplied as the only argument to the constructor. Must have a `render` method in `prototype` that returns a component.
* `arg2` is an object that lists the properties of the HTML tag, or is passed into an `arg1` function.
* `...argN` Additional arguments must be React components, and are considered children.

When using the angle bracket notation in JSX, the name of the tag represents the first argument of `createElement`, any attributes are bundled into `arg2`, and nested tags represent `...argN`.

What if we have a class that does not extend React component? Hypothesis: as long as it has a render method that returns React components, no problem!

Indeed, it *works*, but React issues a **warning** asking you to please `extend` `Reactor.Component`.

# State
React components may have a `state` property that can be updated with a conveniently provided `setState` method.

# Not the same object

The object represented by
```js
<Comp attr="whatever">
```
is the result (`return`) of `React.createElement`. Therefore, the structure of this object can be totally independant from the structure of the object that results from
```js
class Box extends React.Component {
  constructor() {
    super()
    this.stuck = 'to me';
  }
  render() {
    return 'I am in Box.prototype';
  }
}
var box = new Box();
```

As a matter of fact, this object is never even seen by the developer, nor is `new` ever used on subclasses of `Component`. Note that the first argument to React's `createElement` is the Box function itself.

How then are you supposed to have any control on these components? They must be controlled through the class definition exclusively, since no inference can be made on how what is done with `new Classname()`.

# Re-rendering

Components are automatically re-rendered when their state changes. You can try to manually change the state, and it will not work. You need to use the `setState` function.

So yes, `setState` does work, but it is only available on the object returned by `ReactDOM.render`. So you may ask yoursef:
* How does re-rendering work if it is only defined as a method of a component class?
* Is there access to individual components' `setState`?

Is it possible that elements don't have a `setState` until they are turned into a component? In other words,
```js
(<Tag />).setState({prop1: val1}) // fail
(var box = new Box()).setState({prop1: val1}) // works
```

YES! That is exactly it. Since in a class definition `this.setState` can only trigger a state on the instance of that class, he output of `ReactDOM.render` is that very instance.

# Binding of functions passed to children

You may be tempted to think that functions only need binding when they are defined in the prototype. If they are passed in as props, there is no need to bind them because props is attached to the object. Actually, the reason why they need binding is not because of their location in memory, but because the functions may use `this`. It can be problematic when they are called in a different context.

In this example, there is no issue because functions don't use context. They simply call the render function at the same entry point in the document:

```js
var onSomething = function() {
  // do stuff, no `this`
  onChange();
}

// Does not use context
var onChange = function() {
  React.render(
    <App att="value" />,
    document.body
  );
}
```
When the model data, the "source of truth", is outside any component, then you can just pass in handler functions and attributes with the information when necessary, and just render the whole thing.

# Special class methods

* `getInitialState`
* `onChange`
* `componentDidMount`
* `componentWillUnmount`

Note: `state` and `props` are bound to the component instance.

Note2: When using ES6 classes, the initial state is set explicitly using `this`. See [docs](https://facebook.github.io/react/docs/reusable-components.html#es6-classes).
