---
type: guideline
title: "Introduce Cognitive"
variables:
  detail:
    introduceOne:
      visualDisplay: images/principles/introduce-one.svg
      description: "Provide intelligent defaults and positive feedback to reinforce cognitive behaviors and gradually adjust the user’s habits."
      callout:
        - title: "Based on the input data, this is a graph comparing REVENUE and TIME."
          description: "This describes the variables plotted on the graph."
        - title: "\"Choose a different variable to plot\""
          description: "This is copy that displays below a graph."
    introduceTwo:
      visualDisplay: images/principles/introduce-two.svg
      description: "Clarify Watson's capabilities with hierarchy, copy, and interactions to help set appropriate user expectations."
      callout:
        - title: "\"Remember that Chef Watson eats data, not real food. Use your own judgment when preparing these dishes.\""
          description: "This is copy that displays below the primary content."
    introduceThree:
      visualDisplay: images/principles/introduce-three.svg
      description: "Educate the user throughout the experience without interrupting their workflow."
      callout:
        - title: "\"You still need to complete an action to see results.\""
          description: "This is an empty module with copy that explains the user's next action."
    introduceFour:
      visualDisplay: images/principles/introduce-four.svg
      description: "Integrate additional explanation into the vhierarchy as a secondary focus so that it doesn’t get in thof more experienced users."
      callout:
        - title: "\"Did you know?...\""
          description: "This is copy that displays beside the primary content."
---
**Give first-time users a set of "cognitive training wheels" and continue to provide unobtrusive support as needed.**

{{> SOME-FUNCTION-HERE display detail.introduceOne}}
{{> SOME-FUNCTION-HERE display detail.introduceTwo}}
{{> SOME-FUNCTION-HERE display detail.introduceThree}}
{{> SOME-FUNCTION-HERE display detail.introduceFour}}
