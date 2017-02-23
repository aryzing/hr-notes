# HTML Elements

## Custom Elements Class

* `connectedCallback()`
* `disconnectedCallback()`
* `attributeChangedCallback(attrName, oldVal, newVal)`

Defining new element

* `window.customElements.define('markup-name', ClassName);`

## HTMLElement

Methods that can be used on HTML elements.

Elements are

* `this` inside a custom element class definition,
* result of `document.<create/search/whatever>`
* `document.createElement('div')`

The methods are

* `hasAttribute('attr-name')`
* `removeAttribute('attr-name')`
* `setAttribute('attr-name', 'value')`. Both arguments are mandatory. For true/false attributes, second argument `''`.

More useful methods

* `appendChild(node)`
* `style`
  * `top`
  * `left`
  * `backgroundColor`
* `classList`
  * `add`
* `addEventListener('event-name', (e) => {})`
