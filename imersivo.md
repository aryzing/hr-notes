# Learnings from imersivo challenge

## CSS transitions and animations

Transitions and animations are similar. Transitions execute when the state of an element changes, such as `:active`, `:focus`, `:hover`, and `:visited`. Animations execute as soon as a selector containing an animation matches an element.

Transitions also execute as soon as a selector containing a transition matches the state, but they are more direct ways of producing animations due to user interaction.

Transitions: specifies the target values within the selector as well as the timings on how to get to those values once an element is matched. Also known as **incoming values**. General structure:

```
.selector {
  prop1: val1;
  prop2: val2;
  ...
  propN: valN;
  transition:
    prop-i [duration]s [delay]s,
    prop-j [duration]s [delay]s,
    prop-x 1.3s        5.0s;
}
```

* The `transition` property may be written in a single line.
* Durations and delays are specified in seconds, accept decimals, use `s` as units indicator.
* Property-duration-delay groups are separated by commas, but separation character other than space within group.
* After last group, closing semicolon closes `transition` property.

Note that transitions only specify the **timings** for the animation of a property on state change, not the values of the properties themselves. If the state "changes back" to what it was before (i.e. no longer active/focus/hover/visited), and there is no matching selector with a transition property, it will snap to the value of the newly matched rule.

### Examples

All examples:

```html
<div class=one>first</div>
<div class=two>second</div>
```

Example 1 CSS:
```css
.one {
  height: 150px;
  width: 150px;
  transition: width 2.0s 0.0s;
}
.one:hover {
  width: 300px;
  transition: width 1.0s 0.0s;
}
.two {
  height: 150px;
  width: 150px;
}
.one:hover {
  width: 300px;
  transition: width 1.0s 0.0s;
}
```

Hovering over first: height 150px from `.one`, width 300px from `.one:hover`. Since there is a change in the width property, and that property is specified within a transition on a matched css rule, the property will be animated to its new value with the specified timings (1 second duration, no delay animation).

Leaving first: height and width 150px from `.one`. Since there is a change in width from the previous state, and it's specified in the transition property of an active rule, it will animate to new value (2 second duration with no delay animation).

Hovering over second: same as first.

Leaving second: height and width 150px from `.one`. The change of width from 300 to 150px will not be animated because the width property for this element is not present in the transition property of any active rule. Instantaneous change, will snap.

Example 2:

```css
div {
  height: 150px;
  width: 150px;
}
div:hover {
  width: 300px;
  transition: width 1.0s 0.0s;
}
.one {
  transition: width 5.0s 0.0s;
}
```

Changes of width to the first div will always animate because it always has a matching rule with a transition: `.one`. As expected, when hovering over it, the rule `div:hover` overrides the transition timings.

## Animations

Note: using *Animations* (with uppercase A) for CSS rules describing changes and movement, and *animations* (with lower case a) for the general concept of changes and movement.

Animations are described by keyframes.

Animations start executing as soon as a rule containing an animation matches an element. Transitions too. Transitions use animations. But they are intended to be used/can be used/different approach to animation. Transitions just specify how the changes are to take place, the timings of a change on a particular property, but don't set the values of the properties, and can rely on these values being set by other CSS rules. In other words, when a change to a property occurs, the render engine asks whether there is a transition attached to that property of the element that is changing. If there is, it carries out an animation. Transitions are usually produced due to user activity, like hovering. However, it is possible to have scenarios such as a class being dynamically added to an elment causing a change in one of its properties, and if that property has a transition attached to it, an animation will occur.

An Animation, on the other hand, is used to not only control the timings, but also the values of the properties throughout the animation. It is easy to understand how transitions animate when changes to properties occur, but how do Animations play with currently set properties and what are the rules to change them?

Animations, like transitions, start an object's animation as soon as the selector containing an animation matches the element. This is no different from transitions. However, transitions lend themselves to user interaction because the user can easily change matched rules just by hovering over elements. So from the developer's point of view, it is easy to understand when a transition will occur.

Animations can too be linked to user-induced changes of state, like :hovers.

Transitions simply declare that an animation must take place with the given timings if a change to a named property is produced, regardless of how the property came to change.

Animations too declare that an animation must take place with specific timings, but also specify values that properties will take throughout the animation.

There is this idea of how Animations and transitions interact with properties' values named in their specifications. The rules for transitions is simple: the values are what define the changes taking place on screen.

In the case of animations, there are more factors to consider about the current state of the element that affects the animation taking place. For example, if an element is defined to have 0 opacity, but the same element has an animation describing a change in opacity from 0 to 1, what happens when the animation ends? Will the element appear on screen?

Note that permanent state does not apply with transitions because it transitions to the final state. Animations are the initial state, and then animate, and then return to initial state.


Animation definition:

```
.selector {
  animation [name] [...other props];
}

@keyframes [name] {
  [percent] {
    prop1: val1;
    ...
    propN: valN;
  }
  [percent] {
    prop4: val4;
    ...
    propN: valN;
  }
}
```

Interesting animation related properties:
* Can introduce multiple delays to "chain" animations.
* Can maintain final animation state upon.

```css
.selector {
  animation-delay: 2s;
  animation-fill-mode: forwards;
}

```

Interesting effects. It is possible to change CSS properties of seemingly unrelated elements. For example, you can set properties for `.item2` when hovering over `.item1`. If this introduces a transition/animation, you can make other parts of the page animate by hovering or clicking others. In this example, hovering over `.item1` will cause `.item2` to change.

```css
.item1:hover .item2 {
  prop: val;
}
```

# Links and resources

[Testing transitions on Codepen](http://codepen.io/aryzing/pen/VKBWEA).

[Maintaining final animation state](http://stackoverflow.com/questions/12991164/maintaining-the-final-state-at-end-of-a-css3-animation).

[Animations on page load](https://fabriceleven.com/design/creating-fancy-css3-fade-in-animations-on-page-load/).

[Animations on page load codepen](http://codepen.io/fabriceleven/pen/gaWMqm).

[CSS-Tricks Animation](https://css-tricks.com/almanac/properties/a/animation/).

[CSS-Tricks Multi-Step Animations](https://css-tricks.com/using-multi-step-animations-transitions/).

[Chaining Animations, with delay](https://codepen.io/trezy/pen/fxIle?editors=1100).

[Another chaining example](http://codepen.io/chriscoyier/pen/zrGvaq).
