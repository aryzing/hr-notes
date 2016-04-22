The jQuery object:

```javascript
$();
jQuery();
```

All of our code that uses jQuery must be inside the `ready()` method to prevent execution before the document has finished loading.

```javascript
$(document).ready(function(event) {
  // code using jQuery
});
```

The `$()` function is then used to select nodes for their manipulation:

```javascript
$(document).ready(function(event) {
  $('.feature');           // Class selector
  $('li strong');          // Descendant selector
  $('em, i');              // Multiple selector
  $('a[target="_blank"]'); // Attribute selector
  $('p:nth-child(2)');     // Pseudo-class selector});
});
```

To reference the object matched in a selection within a jQuery function, use `this` keyword:

```javascript
$('div').click(function(event){
  $(this);
});
```
