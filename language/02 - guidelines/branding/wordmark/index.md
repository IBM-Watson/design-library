---
type: guideline
title: Wordmark and Logotype
resources:
  files:
    name: "Wordmark and Logotype SVG"
    source: /images/wordmark/watson_wordmark_logotype.zip
variables:
  example:
    wordmark:
      title: Wordmark
      visualDisplay: /images/wordmark/wordmark.svg
    logotype:
      title: Logotype
      visualDisplay: /images/wordmark/logotype.svg
    wordmarkSpacing:
      title: Wordmark
      visualDisplay: /images/wordmark/wordmark-spacing.svg
    logotypeSpacing:
      title: Logotype
      visualDisplay: /images/wordmark/logotype-spacing.svg
    wordmarkColor:
      light:
        title: Wordmark
        visualDisplay: /images/wordmark/wordmark-color-combination.svg
      dark:
        visualDisplay: /images/wordmark/dark-background-wordmark.svg
    logotypeColor:
      light:
        title: Logotype
        visualDisplay: /images/wordmark/logotype-color-combination.svg
      dark:
        visualDisplay: /images/wordmark/dark-background-logotype.svg
    incorrectUsage:
      reconfigure:
        title: "Do not reconfigure"
        visualDisplay: /images/wordmark/wrong-logotype-configuration.svg
        sentiment: negative
      distort:
        title: "Do not distort"
        visualDisplay: /images/wordmark/wrong-logotype-distortion.svg
        sentiment: negative
      color:
        title: "Do not combine colors"
        visualDisplay: /images/wordmark/wrong-color-combination.svg
        sentiment: negative
      font:
        title: "Do not change the font"
        visualDisplay: /images/wordmark/wrong-logotype-font.svg
        sentiment: negative
---

The IBM Watson wordmark and logotype represents our brand and should be managed carefully. It is typeset in Helvetica Neue to align with IBM standards. When possible, it should be used in all internal and external communications that focus on the IBM Watson brand.

{{> SomeFunctionHere example.wordmark}}

{{> SomeFunctionHere example.logotype}}

{{> SomeFunctionHere resources}}

## Specifications

### Spacing considerations

Use only the supplied artwork when using the wordmark or logotype. It is important to include adequate spacing around these elements to avoid visual clutter.

{{> SomeFunctionHere example.wordmarkSpacing}}

{{> SomeFunctionHere example.logotypeSpacing}}

### Color Usage

The wordmark and logotype for IBM Watson should only appear in the approved color combinations. Any one of the [three primary colors](color.html) for IBM Watson may be used in combination with black or white for use on light or dark backgrounds, respectively. For dark color palettes, use lighter values of the IBM Watson primary colors.

{{> SomeFunctionHere example.wordmarkColor.light}}

{{> SomeFunctionHere example.logotypeColor.light}}

{{> SomeFunctionHere example.wordmarkColor.dark}}

{{> SomeFunctionHere example.logotypeColor.dark}}

### Incorrect Usage

Never distort or reconfigure the logotype. Do not attempt to create the logotype yourself, change the font, or alter the size or proportions.

{{> SomeFunctionHere example.incorrectUsage.reconfigure}}

{{> SomeFunctionHere example.incorrectUsage.distort}}

{{> SomeFunctionHere example.incorrectUsage.color}}

{{> SomeFunctionHere example.incorrectUsage.font}}

## Logo versus Avatar

The logo for IBM Watson serves as the visual representation of the brand. The logo may be used outside of the logotype configuration as a static element as it pertains to products. The IBM Watson avatar is recommended in situations when Watson is interacting with, aiding, or responding to a user.
