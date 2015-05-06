---
type: guideline
title: Grids
variables:
  blockquote:
    quoteOne:
      quote: "Grids do not exist in a vacuum. They exist in relation to the content. We never start with a grid. We start with an idea which is then translated into a form, a structure."
      citation: "Linda van Deursen"
    quoteTwo:
      quote: "A ratio-based, modular approach to grids allows us to navigate a medium where we cannot know the container size, nor what type of content will flow into that container."
      citation: "Nathan Ford"
      linkToSource: "http://alistapart.com/article/content-out-layout"
    quoteThree:
      quote: "Start with the small screen first, then expand until it looks like sh*t. TIME FOR A BREAKPOINT!"
      citation: "Stephen Hay"
      linkToSource: "http://bradfrost.com/blog/mobile/bdconf-stephen-hay-presents-responsive-design-workflow/"
  detail:
    gridsOne:
      title: "Custom"
      visualDisplay: /images/grids/grids1.svg
    gridsTwo:
      title: "Compound"
      visualDisplay: /images/grids/grids2.svg
    gridsThree:
      title: "Ratio-Based"
      visualDisplay: /images/grids/grids3.svg
    gridsFour:
      title: "Ratio Spiral-Based"
      visualDisplay: /images/grids/grids4.svg
    responsiveGridVideo:
      visualDisplay: /videos/grids/grids-responsive.webm
      callout:
        title: "Example: Responsive Grid"
        description: "Begin by designing the smallest size, using as close to real content as possible. As the size expands, the content will determine where the breakpoints should occur, not the device sizes."
---

# Grids

Grids enforce proportion and constraint upon our designs, providing order and structure to information. The best grid is specific to the displayed content and the design, as it is an extension of both. When used correctly, a grid will [enhance, balance, and structure content](http://www.ibm.com/design/language/framework/visual/layout.shtml), so users can read and view the information with ease.

{{> SOME-FUNCTION-HERE display blockquote.quoteOne}}

When working with grids on the web, there are additional items that must be considered: the many and varied display sizes with variable content lengths, sizes, and types; numerous reading modes; and a wide potential range of additional user distractions. As such, one grid for all contexts is not a realistic expectation. Instead, grids need to be fluid and flexible, beginning with the content and extending out from there.

{{> SOME-FUNCTION-HERE display blockquote.quoteTwo}}

Ratios can be used to help set the tone for compositions. Choose one that makes sense for the type of content being displayed. Orderly, highly structured content or designs, like image galleries, may benefit from symmetric grids where each column is the same size. More organic content or designs, like a mixture of text and images, may benefit from asymmetric grids where column sizes are based on a harmonic ratio scale like the golden ratio. This can be especially powerful when the ratio is shared with the chosen [typographic scale](/typography). Content or designs that are meant to be slightly chaotic may benefit from asymmetric grids where column sizes vary and are not directly tied to each other.

### Asymmetric Grid Examples

{{> SOME-FUNCTION-HERE display detail.gridsOne}}
{{> SOME-FUNCTION-HERE display detail.gridsTwo}}
{{> SOME-FUNCTION-HERE display detail.gridsThree}}
{{> SOME-FUNCTION-HERE display detail.gridsFour}}

## Responsive Grids

When designing for the ever evolving, unstable medium of the web, we must take care to ensure that the layouts work no matter the context. In order to do so, the grids need to be flexible and fluid, stretching and condensing to fill their space. At some points, though, the design or the content will no longer be displayed the way we would like. At this point we should change the grid to allow the content and design to be rearranged into a more optimal display.

{{> SOME-FUNCTION-HERE display blockquote.quoteThree}}

When designing responsive grids, the smallest size should be designed first, using as close to real content as possible. The content and design determine the breaking point of that grid, not the device sizes, so it's necessary to work in the medium of the final product. In the web, this means low-fidelity wireframing in code and browser. Different combinations and types of content and content displays will likely require different breakpoints and different grids, sometimes requiring only one grid for the whole range of displays, sometimes requiring many grids. The responsive layouts created for these content and design pairs can and should be reused even if the individual grids and breakpoints that make them up are not.

{{> SOME-FUNCTION-HERE display detail.responsiveGridVideo}}
