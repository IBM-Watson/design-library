---
type: guideline
title: Typography
variables:
  aside:
    description: "We are currently in the process of inquiring about full usage rights and licensing for Helvetica Neue for IBM. During this time, we're unable to provide downloadable font assets. Please defer to the Cross-Platform Fontstack Options below for comparable fontstacks."
  example:
    typefaceCombinationOne:
      title: "Helvetica Neue Roman"
      visualAlternative: "The quick brown fox jumped over the fence."
    typefaceCombinationTwo:
      title: "Helvetica Neue Roman Italic"
      visualAlternative: "The quick brown fox jumped over the fence."
    typefaceCombinationThree:
      title: "Helvetica Neue Bold"
      visualAlternative: "The quick brown fox jumped over the fence."
    typefaceCombinationFour:
      title: "Helvetica Neue Bold Italic"
      visualAlternative: "The quick brown fox jumped over the fence."
    responsiveTypography:
      title: "Major Third with a breakpoint at 500px"
      visualDisplay: /videos/typography/responsive-typography.webm
      description: "When the browser gets wider than 500px, headings adopt the Golden Ratio type scale to increase legibility for the user at larger screen sizes."
---

Typography is the atomic element of good interface design. It colors the words in our language and shapes their meaning. It helps to set the visual tone for the entire Watson experience. Text is largely differentiated by size and weight. Keep other properties the same or similar, differentiating only when necessary for the sake of clarity.

## Helvetica Neue for IBM

As a rule and wherever possible, use Helvetica Neue. It is the font of science and the information age, with a precision and objectivity that commands respect. We lean on Helvetica Neue to do the hard work of conveying information, specifications, and the basics. Its clean confidence makes it ideal for our product design.

{{> SOME-FUNCTION-HERE aside}}

## Performance Considerations

When presenting large amounts of content, it is important to consider how multiple font downloads can affect the browser’s performance for the user. To ensure optimized performance for all users, IBM Watson recommends choosing a combination of no more than 4 different weights and styles (light and light oblique being 2 different styles, for instance). 

{{> SOME-FUNCTION-HERE example.typefaceCombinationOne}}
{{> SOME-FUNCTION-HERE example.typefaceCombinationTwo}}
{{> SOME-FUNCTION-HERE example.typefaceCombinationThree}}
{{> SOME-FUNCTION-HERE example.typefaceCombinationFour}}

## Typographic Scale

The IBM Design Language recommends using [modular type scales](http://www.ibm.com/design/language/framework/visual/typography.shtml) to create harmonious proportions and structure, as scale creates consistency in sizing across elements. A visual type scale turns a typographic balancing act into a set ratio. 

### Major Third Type Scale

IBM Watson recommends the Major Third ratio for screen sizes under 500px and the establishment of breakpoints for higher contrast on larger screens. This ratio is ideal for creating visual hierarchy on small screens without being too jarring.

{{> SOME-FUNCTION-HERE example.responsiveTypography}}

## Cross-Platform Fontstack Options

### Desktop or Browser

`font-family: "Helvetica Neue for IBM", Helvetica, Arial, Roboto, sans-serif;`  
######Monospace 

`font-family: 'Source Code Pro', Lucida Console, Andale Mono, monospace;`

###Apple Watch 

`font-family: “San Francisco”;`

###iOS

`font-family: "Helvetica Neue";` 

###Android

`font-family: "Roboto";`
