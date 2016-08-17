# Background

More efficient way to lay out, align, and distribute space among items in a container.

Flexbox layout is direction-agnostic.

Most appropriate for components and small scale layouts. Use [Grid][1] for large scale layouts.

[W3C Flex Spec][2].

# Basics and terminology

Flexbox is a module that provides many new properties. Some are meant for the *flex container* and others for *flex items*.

Flexbox is based on *flex-flow directions*.

## Items:

Order on main axis:
```css
.item {
  order: <integer>;
}
```

Flex behavior on main axis:
```css
.item {
  flex-grow: <integer>; /* proportion to grow. default 0 */
  flex-shrink: <integer>; /* proportion to shrink. default 1 */
  flex-basis: <length> | auto; /* where to start growing or shrinking from. main size */

  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

Alignment of individual items on cross axis:
```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

### Final note on margins

An item's margin set to auto will absorb any remaining space, both in main and cross axis. Multiple items with a margin property will share the available space equally.

Using margins will cause alignment properties to have no effect because margins will have used all the free space left after flexing.

[Codepen post on flex][3].

## Container

Must have:
```css
.container {
  display: flex; /* or inline-flex */
}
```

Flex direction and flex wrap of main axis:
```css
.container {
  flex-direction: row | row-reverse | column | column-reverse;
  flex-wrap: nowrap | wrap | wrap-reverse;

  flex-flow: <flex-direction> <flex-wrap>;
}
```

Justify content (content main axis alignment):
```css
.container {
  justify-content: *flex-start | flex-end | center | space-between | space-around;
}
```

Align content (content cross axis alignment):
```css
.container {
  align-content: *flex-start | flex-end | center | space-between | space-around | stretch;
}
```

Align items (item cross axis alignment);
```css
.container {
  align-items: flex-start | flex-end | center | baseline | *stretch;
}
```








[1]: https://css-tricks.com/snippets/css/complete-guide-grid/
[2]: http://www.w3.org/TR/css3-flexbox/#align-content
[3]: https://codepen.io/goerk/pen/uFkny
