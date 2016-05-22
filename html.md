# Basic html
Terms: **elements**, **tags**, and **attributes**.

Essential HTML elements:

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
```

Additional items:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Best site ever!</title>
</head>
<body></body>
</html>
```

HTML **semantics**: giving content on the page meaning and structure by using the proper element.

Elements `<div>` and `<span>` hold no semantic meaning. Purely for styling.

**Block level** elements begin on new line and stack on top of each other.
* Occupy entire width available to them.
* Height defined by conent.

**Inline level** elements do not begin new line. Fall into **normal flow**.
* Only maintain width of their content.
* Height defined by content.
* Attention! Inline level elements can **not** wrap block level elements.
* Only (reasonable) exception is `<a>`.

Note `<strong>` (important text) vs. `<b>` (stylistic offset).

Note `<em>` (emphasis, diferent voice) vs. `<i>` (stylistic offset).

Structuraly based elements introduced in HTML5 (all block level):
* `<header>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<footer>`.

Semantic element for small text: `<small>`.

Escaped character sequences: `&<sequence>;`. [Copy Paste Character](http://www.copypastecharacter.com/).

Element IDs are only useful for:
* `<a href="#top">Back to top</a>`


# Elements that are "inserted"
CSS, JS, anchors, images
* Elements that substitute content use `src`.
* Elements contributing to understanding document use `href`.

For CSS:
```html
<link href="style.css" rel="stylesheet">
```

For JS:
```html
<script src="javascript.js"></script>
<script defer src="javascript.js"></script>
```
[Defer vs Async](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

For anchors:
```html
<a href="https://google.com/">The Big G</a>
```

For images:
```html
<img src="picture.png" alt="Alternative text">
```

# Boolean attributes

Attributes that take no value. Their declaration within a tag sets them to true:

```html
<script defer src="script.js"></script> <!-- defer = true -->
```

# Positioning inline elments after block elements

Can't mix inline and block elements on the same line. If inline elements are siblings to block elements, all consecutive inlines will get bundles into their own block. Example in `playground/inline-after-block`.

# Margin madness

Top and bot margins only accepted on block/inline-block, not inline.

# Stopping favicon requests

```html
<link rel="shortcut icon" href="#" />
```
