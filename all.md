# SECTION1
## 1. Prerequisite Studies
### Start Coding in JavaScript
* A program deals with **data**, notion of **vale**: a tracked piece of data stored in memory, and kept seperate from other pieces of data.
* Values have a **type**: how the data they contain is to be interpreted.
* A **literal** is text that (literally) describes a value.
* Values can't be "seen", they are in memory! Literals are the closest representation of values.
* Value of type **string** literal: `'hello'`.
* Value of type **boolean** literal: `true`.
* Value representing nothingness: `null`.
* Value representing unknown or undetermined: `undefined`.
* Value of type **number** literal: `3`.
* **Operators** describe actions to be performed with values, like `+` addition operator.
* An **expression** is any part of the code that evaluates to a value.
* Operators can be used to create larger expressions by combining values.
* Values resulting from expressions must be stored or they will be thrown out when the line of code they are in has finished executing.
* Expression values may be passed to functions, for example.
* **Side effects** are changes that occur in the environment due to a function call.
* A **statement** is a means of separating unrelated expressions. JS does this with `;`.
* **Variables** are used to keep track of values.
* Once a variable has been **declared**, it can be referenced further down in the code.
* Variables that have been assigned values, can be used in code to represent those values.
*

## Shay Howe's "Learn to Code HTML & CSS"
# Building Your First Web Page
* **Elements**: parts of a website that combine to create it's structure. Examples: anchors, headings, paragraphs.
* **Tag**: text consisting of angle brackets which enclose an element's description. Examples: `<a>`, `<h1>` through `<h6>`, `<p>`.
* Elements which may have content use a matching closing tag which marks the end of the element: `</a>`, `</h1>`, `</p>`.
* The properties of elements are called **attributes**. They are defined in the opening tag: `<a href="https://googoe.com/">Big G Home Page</a>`.
* Style: use **double quotes** for attribute values.
* The required elements in all HTML pages are `<!DOCTYPE html>`, `<html>`, `<head>`, and `<body>`.
```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
  </body>
</html>
```
* Code validation for [HTML](http://validator.w3.org/) and [CSS](http://validator.w3.org/).
* `html` attribute to describe **page language**.
* Meta tag for **character set** of html document.
* Meta self closing tag.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body></body>
</html>
```
* CSS terms: **selectors**, **properties**, and **values**.

# Elements that are "inserted"
CSS, JS, anchors, images
* Elements that substitute content use `src`.
* Elemens contribute to understanding document use `href`.

For CSS:
```html
<link href="style.css" rel="stylesheet">
```

For JS:
```html
<script src="javascript.js"></script>
<script defer="true" src="javascript.js"></script>
```
[Defer vs Async](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

For anchors:
```html
<a href="https://google.com/">The Big G</a>
```

For images:
```html
<img 
