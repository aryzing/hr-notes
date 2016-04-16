# Child selectors

To select children, put two selectors separated by space:

```css
.selector1 .selector2 {
  color: blue;
}
```

This not only selects all elements "selector2" children of "selector1", but any descendant of "selector". To select direct children, use ">" notation.

```css
.parent > .child {
  color: yellow;
}
```

Latex stuff:

```latex
x = 2
```

# Responsive web design

+ flexible layouts
+ media queries
+ flexible media

**Flexible layouts** are built using flexible grids and relative lengths, % and em.

New variables: `vw`, `vh`, `vmin`, `vmax`.

Note the difference between `width` and `device-width` features in media queries. The former refers to the size of the browser's viewport, while the latter refers to the size of the screen of the device. Better to just use `width` because it covers all cases.

Understand difference between **Physical resolution** and **Logical resolution**. Keep in mind that the `px` unit always operates in logical pixels.

**Mobile first**: use styles targeted at smaller viewports as the default styles and use media queries to add styles as the viewport grows.

Viewport info: Render "normal" web pages using viewport width of 980px and then squeezing result inside the actal viewport of the phone.

The default viewport size can be overriden in html with

```html
<meta name="viewport" content="width=320, initial-scale=0.5">
```

or in css with

```css
@viewport {
  width: 320;
  zoom: 0.5;
}
```

The recommended practice is to set the viewport width to be equal to the width of the device's screen. In HTML,

```html
<meta name="viewport" content="width=device-width">
```

and in css

```css
@viewport {
  width: device-width;
}
```

Note that once viewport is "declared", all properties are assigned default values.

The amount of zoom allowed can be limited, and even disabled! (don't ever disable!!). In css:

```css
@viewport {
  width: device-width;
  max-zoom: 2;
  min-zoom: 0.5;
}

/* dont't ever fix unless in very specific circumstances */
@viewport {
  width: 372px;
  user-zoom: fixed;
}
```

It seems that desktop browsers don't respect the `viewport` rule. The viewport size is simply the area the browser window takes up. It seems that only mobile devices respect viewport rules.

Embedded media `iframes` may cause responsiveness issues. Solution http://alistapart.com/article/creating-intrinsic-ratios-for-video.

*Revelation!* The order of inclusion of JS files in HTML source matters because it is as if they are all written in one large file, one after another. So if a file contains references to objects (functions, variables) that are defined in a previous file, all is OK. However, if a file uses a reference that is defined in a subsequent file, an error will occur.

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
