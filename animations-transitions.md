# Animations and Transitions

https://cssanimation.rocks
https://cssanimation.rocks/list-items/

# Transition vs Animation

When a property changes value, a transition on that property will fire an animation.

Animations are custom, detailed animations which may involve more than one property.

https://cssanimation.rocks/transition-vs-animation/

# Animating to `auto`

Not possible.

If need to animate `height`, for example, and would like to animate from `0` to `auto`, won't work. However, will work with `max-height`.

**Strategy** with `max-height`: Set a height considerably larger than what you expect the element to ever be.

**Problem** with `max-height`: There will be lag in one animation direction as the value approaches the actual height of the element.

## Example with height

Alternatively, can achieve similar results with some JS:

* Create outer div to div that we want to simulate growing
* Set `overflow: hidden` to container div or other ancestor
* With JS, get size of container with loaded content inside
* Programatically modify height of container or other ancestor

Recommended to do so asynchronosly after the element has been painted. Immediately changing properties on "recently" created elements might not trigger the transition animation (for example, if the element has not been yet painted to screen).

Can achieve async property change with reasonably long `setTimeout`

Can also use `requestAnimationFrame`.

# Using requestAnimationFrame

Very detailed control over appearance.

Called once per repaint.

In height example above, can use to actually set the exact height on each repaint. If the height property already has a transition, can simply set the target height to trigger the animation.

https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
https://css-tricks.com/using-requestanimationframe/
