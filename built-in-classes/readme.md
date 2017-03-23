# Using built-in classes as constructors

Built-in browser classes are there to expose their prototypes, but they can't be used to spawn new instances directly:

```js
var a = new HTMLElement()  // TypeError: Illegal constructor
```

Instead, factory functions are provided that construct objects from these constructors, which simultaneously validate their arguments ([source][1]). For creating html elements, you would instead use

```js
document.createElement('element-name')
```

It is expected that these built-ins that are closely related to browser internals (possibly written in other languages) will be brought "closer" to or even fully implemented in JavaScript ([source][2]).

Until then, it is possible to do something like ([1][1], [2][2])

```js
Object.create(HTMLElement.prototype)
```

In the case of custom elements, you will need to create a class for your custom element that extends `HTMLElement` and `customElements.define()` it to be able to create it with `document.createElement()`.


[1]: http://stackoverflow.com/questions/23150942/how-to-create-an-instance-of-doms-constructor-functions
[2]: https://lists.w3.org/Archives/Public/public-webapps/2013JanMar/0929.html
