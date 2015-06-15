---
type: guideline
title: Accessibility
resources:
  links:
    - name: "IBM Design Language"
      source: http://www.ibm.com/design/language/framework/visual/color.shtml#contrast
    - name: "Color Contrast Analyzer"
      source: http://www.paciellogroup.com/resources/contrastanalyser/
    - name: "Color Ratio Analyzer"
      source: http://leaverou.github.io/contrast-ratio/
    - name: "WCAG 2.0 AA requirements"
      source: http://www.w3.org/TR/WCAG20/
variables:
  detail:
    accessibilityInteraction:
      description: "When distinguishing an interactive element, do not rely on color as the only visual indicator."
      visualDisplay: /images/accessibility/visual-accessibility-example.svg
      callouts: 
        - title: "Help users to easily identify form elements by using iconography."
          description: "A log in page using iconography to help users identify input fields."
        - title: "Help users to distinguish links by using combinations of colors and underlines."
          description: "A log in page using colored text and an underline to indicate a link."
    accessibilityAnimation:
      description: "When there is an animation that last longer than 5 seconds, provide the user a way to pause, stop, or hide the animation."
      visualDisplay: /videos/accessibility/motion-accessibility.webm
  examples:
    neutralAccessibility:
      neutralYes:
        title: "Accessible"
        visualDisplay: /images/accessibility/neutral-yes.svg
        sentiment: positive
        description: "Primary: Blue 60, Accent: Teal 40, Neutrals: Neutral-White 2, Neutral-White 4, Gray 80"
      neutralNo:
        title: "Not Accessible"
        visualDisplay: /images/accessibility/neutral-no.svg
        sentiment: negative
        description: "Primary: Orange 50, Neutrals: Neutral-White 2, Neutral-White 4, Gray 30"
---

When choosing colors and contrast ratios for typography it is important to adhere to the [IBM Design Language recommendations for accessibility](http://www.ibm.com/design/language/framework/visual/color.shtml#contrast), as we must meet [WCAG 2.0 AA requirements](http://www.w3.org/TR/WCAG20/). High color contrast helps users who are partially or completely color blind see differences between certain colors. It creates a strong visual hierarchy and improved usability for everyone. Never rely on color as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.  

{{ _detail.view(detail.accessibilityInteraction) }}

Colors at a 50 value or lower are not accessible when applied to text on neutral backgrounds, unless the text is 24 px or larger. There are no formal color contrast requirements for icons or glyphs that are paired with supporting text. If an icon is used separately from supporting text on a neutral background, use a color value of 50 or higher.

{{ _example.compare(examples.neutralAccessibility) }}

## Animation

In addition to the fundamental visual accessibility guides, animation has its own set of considerations. For animations that are longer than five seconds, we must provide the ability to pause, stop, or hide animations for users who can be severely distracted, particularly those with attention deficit disorders.

{{ _detail.view(detail.accessibilityAnimation) }}

The five-second limit is long enough to get a user’s attention, but short enough for a user to wait out the distraction before reading the page. Do not include anything that flashes, or can be considered a flash, more than twice per second; it can potentially cause seizures. If the animation has audio longer than three seconds, provide audio control for users that have screen reading software, as it will make it easier for them to understand their screen reader.
