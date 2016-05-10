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

To describe descendant relationship, use space:

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

# Transforms

Scale elements:

```css
div {
  -webkit-transform: scale(1.5);
     -moz-transform: scale(1.5);
       -o-transform: scale(1.5);
          transform: scale(1.5);
}
```

# Animations
1. Define animation properties: **name**, **duration**, **interpolation function**, and **repetition**.
2. Define animation movement with `@keyframes`

The movement may use any of `perspective`, `rotate`, `scale`, `skew`, `transform`, `translate`, and more.

```css
.spin {
    animation: spin 1s linear infinite;
    animation-play-state: running;
}

@keyframes spin {
  0% {transform: rotateY(0deg);}
  100% {transform: rotateY(360deg);}
}

.cheering {
  animation: vibrate 0.2s linear infinite;
  animation-play-state: running;
}


@keyframes vibrate {
50% { transform: rotate(4deg) translateX(1px); }
100% { transform: rotate(-4deg) translateX(-1px); }
}
```
