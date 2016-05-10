# Event handlers
Event handlers are functions attached to objects that are run asynchronously when specific conditions are met.

When the function is run, it is passed one argument, the **event object** which contains information about the event.

```js
$('button').addEventListener('mousedown', function(event) {
  if (event.which === 1) {
    console.log('Left button');
  } else if (event.which === 2) {
    console.log('Middle button');
  } else if (event.which === 3) {
    console.log('Right button');
  }
});
```

Information stored in an event differs per event type.

**Event propagation**: from node they originated, traversing DOM, all the way to `window`.

To **stop** propagation: `event.stopPropagation()`.

Most event objects have `target` pointing to originating node.

**Default** event behaviors, like following links, scrolling, can be disabled with `event.preventDefault()`

The environment may decide not to inform of some events (alt-f4, ctrl-w).

Note on **keydown** event: fires with every poll.

Truly parallel functionality can be implemented with web workers. When they finish, they fire an event with the result of the calculation.
