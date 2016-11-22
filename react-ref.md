# Using `ref`

May pass a property named `ref`, that accepts a callback.

This callback accepts a single argument. The argument will be the DOM node if the component on which it is defined is a standard HTML element. If it is defined on a React Component, the Component object.

Because functional components don't have instances, the callback function must reference locally defined funcs or vars.
