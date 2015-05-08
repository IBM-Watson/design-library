---
type: documentation
title: Animation
resources:
  links:
    name: "Debugging Chrome Animations"
    source: http://valhead.com/2015/01/06/quick-tip-chrome-animation-controls/
---


## Animation Guidelines

The overarching metaphor for our animation comes from the IBM Design Language metaphor *elegant machine motion*. Elegant machine motion consists of very quick movements with strong easing at the beginning and/or end of the animation, plus subtle offsets.


## Properties

Properties are the elements of an object that will change over time. The properties that can animate within CSS are listed below. We recommend using the most performant properties first. If the desired effect cannot be achieved, use the general list of properties as a fallback.

**Most Performant Properties**

* Position: `transform: translate(npx,npx);`
* Scale: `transform: scale(n);`
* Rotation: `transform: rotate(ndeg);`
* Opacity: `opacity: 0...1;`

For more information about why these properties are performant see [this blog post.](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)

To see a full list of animatable properties and examples of them animating visit [Animatable.](http://leaverou.github.io/animatable/)


### Single Property Animations

When animating only a single property, follow the guidelines below. 

![Scaling of a box from 0% to 100%](images/motion/examples/Single_Attribute-1.gif)

```scss
//box class
.single-attribute {
  animation: single-attribute 1s map-get($timing-function, bounce-in);
}

//keyframes for animation
@keyframes single-attribute {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
``` 

**Timing Function**

Use bounce eases to add the snap-in factor that is typically achieved with multiple properties. Bounce eases are snappy bounces, not physics-based bounces.

  * Use of Timing Functions:
    * **Entrances** - `map-get($timing-function, bounce-in)` (Fast to Slow) 
    * **Exits** - `map-get($timing-function, bounce-out)` (Slow to Fast)
    * **Interactive Elements** - `map-get($timing-function, bounce-in-out)`

### Multiple Property Animations

Multiple property animations are animations where multiple properties are being animated together. With multiple property animations there are two different options. The first option is to start one property alone, then animate any additional properties. The second option is for both properties to start at the same time, then have one property end before the other. We recommend not starting and stopping multiple properties at the same time; choose one option or the other.

**Option One**

Start one property alone, then animate any additional properties.

![Scaling box animation starting with X axis scale then the Y axis scale follows.](images/motion/examples/Option-A.gif)

```scss
//box class
.animation-a {
  animation: animation-a 1s map-get($timing-function, snap-in);
  transform-origin: 0% 100%;
}

//keyframes for animation
@keyframes animation-a {
  0% {
    transform: scale(0 , 0);
  }
  50% {
    transform: scale(.5 , 0);
  }
  100% {
    transform: scale(1 , 1);
  }
}
```

**Option Two**

Both properties start at the same time, then one property ends before the other.


![Scaling box animation starting with both X and Y axis scale then X axis ends before Y finishes.](images/motion/examples/Option-B.gif)

```scss
//box class
.animation-b {
  animation: animation-b 1s map-get($timing-function, snap-in);
  transform-origin: 0% 100%;
}

//keyframes for animation
@keyframes animation-b {
  0% {
    transform: scale(0 , 0);
  }
  30% {
    transform: scale(.2 , 0);
  }
  80% {
    transform: scaleY(.5);
  }
  100% {
    transform: scale(1 , 1);
  }
}
```

**Timing Function**

Use snap-in eases to add very strong eases to quick movements. This enhances the metaphor of elegant machine motion.

* Use of Timing Functions: 
  * **Entrances** - `map-get($timing-function, snap-in)` (Fast to Slow) 
  * **Exits** - `map-get($timing-function, snap-out)` (Slow to Fast)
  * **Interactive Elements** - `map-get($timing-function, snap-in-out)`


## Singular vs. Sequence of Actions

Within user interfaces, there are instances where only one element moves, as well as instances when multiple elements create a sequence of actions.


### Singular Action

A singular action animation occurs when only one element on the screen is animated and there are no other complementary elements.

![Singular action shows a box animating scaling horizontally then vertically](images/motion/examples/Option-B.gif)

### Sequence of Actions

A sequence of actions animation occurs when there are multiple animated elements. This is typically a primary action followed by a secondary action that complements the primary.

![Secondary action shows a box animating scaling horizontally then vertically with text animating up following the vertical scale](images/motion/examples/secondary-action.gif)

In the example above, the text animations and delay enhance the animation by following the lead of the primary action, which in this case is the scaling of the box.

#### Things to Consider with Sequence of Actions

  * Choreography: elements should coordinate within the determined hierarchy.
  * Delays: delays need to be consistent and should have the same rate across similar content.

## Animation Library Implementation

All of the animations live within an animation map. It looks a bit like this:

```scss 
$animations: (
  'fade-in': (
    0%: (
      opacity: 0
    ),
    100%: (
      opacity: 1
    )
  ),
  'slide-in--left' : (
    0%: (
      transform: translateY(-100%)
    ),
    100%: (
      transform: translateY(0)
    )
  ),
  'slide-in--right' : (
    0%: (
      transform: translateY(100%)
    ),
    100%: (
      transform: translateY(0)
    )
  )
);
```

This is the format of the map, and everything between <> is a string:

```scss
$animations: (
  '<animation name>': (
    <keyframe%>: (
      <property>: <value>;
    ),
    <keyframe%>: (
      <property>: <value>;
    )
  )
);
```

In order to use any of these animations in a product, we have implemented an animate Sass mixin. To include animation with an element, use the following syntax: `@include animate(<animation name>, <duration>, <timing function>)`. We have included defaults for duration (2s) and timing function (ease-in), in case you do not specify your own.

For example, you can implement `@include animate('fade-in');` or `@include animate(fade-in, 3s, snap-in);`.

We currently provide these animations:

Entrance Animations
- `fade-in`
- `fade-in--up`
- `fade-in--down`
- `fade-in--left`
- `fade-in--right`
- `slide-in--up`
- `slide-in--down`
- `slide-in--left`
- `slide-in--right`

Exit Animations
- `fade-out`
- `fade-out--up`
- `fade-out--down`
- `fade-out--left`
- `fade-out--right`
- `slide-out--up`
- `slide-out--down`
- `slide-out--left`
- `slide-out--right`

### Timing Functions

A timing function is a mathematical equation that creates a bezier curve, which is a line that defines the acceleration pattern on a graph. Bezier curves are often translated to keywords like ease-in, ease-out, and ease-in-out. They are also referred to as “Motion Curves” or “Curves."

We currently provide these timing functions:

- `ease-in`
- `ease-out`
- `bounce-out`
- `bounce-in`
- `bounce-in-out`
- `snap-in`
- `snap-out`
- `snap-in-out`
