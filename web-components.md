# Web Components

http://webcomponents.org/

Web components is the combination of four technologies:

* Custom elements
* HTML imports
* Templates
* Shadow DOM

# Custom Elements tutorial

https://developers.google.com/web/fundamentals/getting-started/primers/customelements

Remember "every tag is an HTML element, is has an object instance representing it in memory", and all those object come from the class `HTMLElement`.

So, to create a custom element, we too must start there:

```js
// Step 1: Create a new class that will be used to create the new objects
class ClassForMyNewHTMLElement extends HTMLElement {
  /* ... do stuff ... */
}

// Think of this as just another class, the browser comes preloaded with
// a few default of these classes, such as `div`, or `span` or `footer`, or `form`.
// You are teaching the browser about a new tag. Not quite, here you are defining the class, but you are not actually creating instances or teaching the browser anything.

// The browser is made aware of new elements with
window.customElements.define('my-element', ClassForMyNewHTMLElement)

// In the previous statement, you both define the existance of a new tag, and tell the browser which class to associate to it, i.e., where what class it should use to create instances for when it encounters those tags in markup.
```

It is necessary to extend `HTMLElement` so our new element inherits the DOM API.
