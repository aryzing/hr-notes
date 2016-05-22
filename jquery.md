# jQuery
The jQuery object:

```javascript
$();
jQuery();
```

All of our code that uses jQuery must be inside the `ready()` method to prevent execution before the document has finished loading. Two equivalent approaches:

```javascript
$(document).ready(function(event) {
  // code using jQuery
});

$(function) {
  //code using jQuery
};
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

# Traversing the DOM

Using `find` to filter and traverse is faster than having a longer selector.

```js
$('.class').find('.class2'); // faster
// ^Selection     ^Traversal

$('.class .class2'); //slower
```

With pseudoselectors:

```js
$('.class').first(); // faster
//^Selection ^Traversal

$('.class:first'); // slower
```

Some traversing methods: `first`, `last`, `next`, `prev`, `parent`, `children`, `closest`

Closest starts at the element itself and searches upwards through ancestors. Example with `closest`:

```js
$(this).closest('.class').next().whatever()
```

# Create new node without adding it to DOM:

```js
var node = $('<p>This is the way</p>');
```

# Insertion methods

```js
// inserted node as child
$('.nodeAlreadyInDom').append(node); // make last child
$('.nodeAlreadyInDom').prepend(node); // make first child

// inserted node as sibling
$('.nodeAlreadyInDom').before(node); // put 'node' before 'already'
$('.nodeAlreadyInDom').after(node); // put 'node' after 'already'
```

Alternative syntax:
```js
// inserted node as child
node.appendTo($('.nodeAlreadyInDom')); // make last child
node.prependTo($('.nodeAlreadyInDom')); // make first child

// inserted node as sibling
node.insertBefore($('.nodeAlreadyInDom')); // put 'node' before 'already'
node.insertAfter($('.nodeAlreadyInDom')); // put 'node' after 'already'
```

# Deletion
```js
$('.bye').remove();
```

# Event handlers

Event handlers can easily be attached to elements with `on` method

```js
$('.class').on('click', function thisRuns() {
  alert(1);
});
```

# A note on `this`

In any callback, `this` always points to the DOM element object that originated the callback. That element can be referenced with jQuery by simply wrapping it:

```js
$(function() {
  $('button').click(function() {
    var clickedButton = $(this); // DOM element object converted to jQuery object
    clickedButton.remove() // jQuery methods can now be used
  });
});
```

# Extracting key/value from current URL:

[StackOverflow](http://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js), [jquerybyexample](http://www.jquerybyexample.net/2012/06/get-url-parameters-using-jquery.html)
```js
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

/* url:
http://dummy.com/?technology=jquery&blog=jquerybyexample
*/

var tech = getUrlParameter('technology');
var blog = getUrlParameter('blog');
```
