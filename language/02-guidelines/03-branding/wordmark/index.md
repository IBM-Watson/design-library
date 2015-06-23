---
type: guideline
title: Wordmark and Logo
resources:
  files:
    - name: "Wordmark and Logo SVG"
      source: /images/wordmark/watson_wordmark_logotype.zip
variables:
  example:
    firstCompare:
      exampleOne:
        title: Wordmark
        visualDisplay: /images/wordmark/wordmark.svg
      exampleTwo:
        title: Logo
        visualDisplay: /images/wordmark/logo.svg
    smallExample:
      wordmark:
        title: Wordmark
        visualDisplay: /images/wordmark/wordmark-spacing.svg
    secondCompare:
        lightOne:
          title: Light Wordmark
          visualDisplay: /images/wordmark/wordmark-color-pos.svg
        darkOne:
          title: Dark Wordmark
          visualDisplay: /images/wordmark/wordmark-color-neg.svg
        lightTwo:
          title: Light Logo
          visualDisplay: /images/wordmark/logo-color-pos.svg
        darkTwo:
          title: Dark Logo
          visualDisplay: /images/wordmark/logo-color-neg.svg
    thirdCompare:
        exampleOne:
          title: "Do not reconfigure."
          visualDisplay: /images/wordmark/wrong-configuration.svg
          sentiment: negative
        exampleTwo:
          title: "Do not distort."
          visualDisplay: /images/wordmark/wrong-distortion.svg
          sentiment: negative
        exampleThree:
          title: "Do not combine colors."
          visualDisplay: /images/wordmark/wrong-color-combination.svg
          sentiment: negative
        exampleFour:
          title: "Do not change the font."
          visualDisplay: /images/wordmark/wrong-font.svg
          sentiment: negative
---

The IBM Watson wordmark and logo represent our brand and should be managed carefully. The wordmark is typeset in a combination of Helvetica Neue Light and Helvetica Neue Bold to align with [IBM standards](http://www.ibm.com/design/language/framework/visual/typography.shtml). When possible, it should be used in all internal and external communications that focus on the IBM Watson brand.

{{ _example.compare(example.firstCompare) }}

## Specifications

### Spacing Considerations

It is important to include adequate spacing around these elements to avoid visual clutter. Keep the area around the IBM Watson wordmark separated from other visual elements by a distance approximately equal to the height of the IBM Watson wordmark. This distance is considered the minimum uninterrupted space surrounding the mark.

{{ _example.compare(example.smallExample) }}

### Color Usage

The wordmark and logo for IBM Watson should only appear in the approved color combinations. Any one of the [three primary colors](/guidelines/style/color) for IBM Watson may be used in combination with black or white for use on light or dark backgrounds, respectively. For dark color palettes, use lighter values of the IBM Watson primary colors.

{{ _example.compare(example.secondCompare) }}

### Incorrect Usage

Never distort or reconfigure the wordmark or logo. Do not attempt to create the wordmark yourself, change the font, or alter the size or proportions.

{{ _example.compare(example.thirdCompare) }}

## Logo versus Avatar

The logo for IBM Watson serves as the visual representation of the brand. The logo may be used as a static element as it pertains to products. The IBM Watson avatar is recommended in situations when Watson is interacting with, aiding, or responding to a user.
