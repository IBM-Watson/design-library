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
  example:
    gridTypes:
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
      title: "Example: Responsive Grid"
      description: "Begin by designing the smallest size, using as close to real content as possible. As the size expands, the content will determine where the breakpoints should occur, not the device sizes."
---
Grids enforce proportion and constraint in layouts and design, and they provide order and structure to information. The best grid is specific to the displayed content and the design, as it is an extension of both. When used correctly, a grid will [enhance, balance, and structure content](http://www.ibm.com/design/language/framework/visual/layout.shtml), so users can read and view the information with ease.

{{ _quote.quote(blockquote.quoteOne) }}

When working with grids on the web, these additional items must be considered: the many and varied display sizes with variable content lengths, sizes, and types; numerous reading modes; and a wide potential range of additional user distractions. As such, one grid for all contexts is not a realistic expectation. Instead, grids need to be fluid and flexible, beginning with the content and extending out from there.

{{ _quote.quote(blockquote.quoteTwo) }}

Ratios can be used to help set the tone for compositions. Choose one that makes sense for the type of content being displayed. Orderly, highly structured content or designs, like image galleries, may benefit from symmetric grids where each column is the same size. More organic content or designs, such as a mixture of text and images, may benefit from asymmetric grids where column sizes are based on a harmonic ratio scale like the golden ratio. This can be especially powerful when the ratio is shared with the chosen [typographic scale](/guidelines/style/typography). Content or designs that are meant to be slightly chaotic may benefit from asymmetric grids where column sizes vary and are not directly tied to each other.

### Asymmetric Grid Examples

{{ _example.compare(example.gridTypes) }}

## Responsive Grids

When designing for the ever-evolving, unstable medium of the web, take care to ensure that the layouts work no matter the context. In order to do so, grids need to be flexible and fluid, stretching and condensing to fill the given space. At some points, though, the design or the content will no longer be displayed as intended. At this point the grid should change to allow the content and design to be rearranged into a more optimal display.

{{ _quote.quote(blockquote.quoteThree) }}

To create responsive grids, the smallest size should be designed first, using as close to real content as possible. The content and design determine the breaking point of that grid, not the device sizes, so it's necessary to work in the medium of the final product. In the web, this means low-fidelity wireframing in code and browser. Different combinations and types of content and content displays will likely require different breakpoints and different grids, sometimes requiring only one grid for the whole range of displays, sometimes requiring many grids. The responsive layouts created for these content and design pairs can and should be reused even if the individual grids and breakpoints that make them up are not.

{{ _example.large(example.responsiveGridVideo) }}

