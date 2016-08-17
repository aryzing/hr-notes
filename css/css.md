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

# Box model
Choosing the sizing box:
```css
.selector {
  box-sizing: content-box;
  /* OR */
  box-sizing: padding-box;
  /* OR */
  box-sizing: border-box;
}
```

Everything at once
```css
*,
*:before,
*:after {
  box-sizing: border-box;
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

# CSS Position

Four different `position` values: \*`static`, `relative`, `fixed`, `absolute`.

**Static**: default value, not positioned in any special way.

**Relative**: setting `top`, `right`, `bottom`, and `left` properties will cause it to be adjusted away from its normal position. Creates new coord system.

**Fixed**: positioned relative to the viewport, same `top`, `right`, `bottom`, and `left`properties apply. Creates new coord system.

**Absolute**: positioned according to it's nearest relatively positioned ancestor. Same `top`, `right`, `bottom`, and `left`properties apply. They are removed from the normal flow. Creates new coord system.

# Media queries

Boilerplate code for html for media queries:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Media queries based on media width:

```css
@media (max-width: 750px) {
  html {
    font-size: 14px;
  }
  .navbar {
    text-align: left;
  }
}
```

## A note on the syntax
Media query definitions surround the rules that become active when the conditions are satisfied.

```
@media <conditions> {
  <selector> {
    <property>: <value>
  }
}
```

## Cascading `max-width` and `min-width`

![min and max width cascading][graph]

[graph]: max-and-min-cascading.jpg
