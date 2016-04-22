
# CSS
Terms: **selectors**, **properties**, and **values**.

Selectors may be **type**, **class**, or **ID**, but don't use ID selectors.

CSS reset: [Eric Meyer's reset](http://meyerweb.com/eric/tools/css/reset/).

Comments: `/* ... */`

Cascading: highest specificity wins, equal specificities cascade.
* Type: `0-0-1`
* Class: `0-1-0`
* ID: `1-0-0`

**Key selector**: selector farthest to the right in a rule.

# Child selectors

To describe descendant relationshipt, use space:

```css
.selector1 .selector2 {
  color: blue;
}
```

To describe child relationship, use `>`:

```css
.parent > .child {
  color: yellow;
}
```
