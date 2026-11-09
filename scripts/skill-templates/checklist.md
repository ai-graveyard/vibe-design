# Project restyle acceptance

Use this with the selected study from the {{COUNT}}-style catalog. These are acceptance requirements for the project being changed, not claims that every reference demo implements every state.

## Before and after

- Record the actual routes, tasks, data fields and component behaviors in the authorized scope before editing. Recheck them after styling, including form validation, filtering, pagination and dialogs when present.
- Preserve existing brand assets, colors, copy and component contracts unless the brief explicitly changes them. Use actual project content; demo brands, numbers and claims are fictional examples.
- Use one study version and source hash across the reference, exported brief and `DESIGN.md`. Record deliberate changes from example tokens and resolve conflicting rules before extending them to other pages.
- Separate style principles from the demo's authored palette, dimensions and assets. Check the selected style's pitfalls against the result.

## Browser checks

- Open the actual changed routes in a browser after fonts and images load. Inspect the project's own breakpoints; when unspecified, use 390×844, 768×1024, 1280×800 and 1440×900 as comparison sizes and check 375px for narrow-screen overflow.
- Capture before/after evidence for the representative page, then inspect other changed pages for consistent rules. A passing build, CSS screenshot or token comparison alone is insufficient.
- Check that the document has no unintended horizontal scroll, text clipping, overlap or off-screen controls. Fixed-width tables may scroll inside a labeled container while page controls remain reachable.
- Replace a short heading with a long Chinese heading, a mixed Chinese/English label, an unbroken URL and enlarged text. Verify wrapping, font fallbacks, visible actions and logical reading order.
- Use real asset aspect ratios, loading behavior and error cases. Do not let a missing image collapse essential content.

## Component states

- For every existing interactive component, inspect default, hover where supported, keyboard focus, pressed, selected and disabled states as applicable. Focus must remain visible; color alone must not identify selection or errors.
- For forms and data views, inspect required validation, loading, empty, error and long-content states. Messages must describe the state and offer the existing recovery action where available.
- Test keyboard order, activation, dialog close/return focus and menu behavior. Touch controls must have usable target spacing; 44×44 CSS px is a useful touch target when the component permits it.
- Keep primary actions readable over changing images and translucent backgrounds. Verify text, icons and controls against the project's contrast requirements with actual colors.

## Motion and fallback

- Test `prefers-reduced-motion: reduce`: essential content remains visible and usable without entrance, scroll, glitch or continuous animations. Provide pause for persistent movement that affects reading.
- Test a solid-surface fallback when blur, blend modes or material effects are unsupported. Aesthetic effects must not carry essential information or hide controls.
- Inspect forced-color/high-contrast behavior when relevant to the project's support policy. Preserve visible boundaries, text and focus when shadows or backgrounds disappear.
- Measure rendering and loading on the project's target devices when the change adds large images, layered filters or motion. Use the project's agreed budget; visual style alone proves no loading speed or conversion result.

## Delivery evidence

- Report routes, browser, viewport sizes, states, behavior checks and any unresolved limitations actually observed. Mark unperformed checks as unverified.
- Update the existing `DESIGN.md` with the final component rules and intentional exceptions so later pages inherit the same decisions.
- For an explicitly requested standalone/offline HTML deliverable, embed assets with their license notices and verify there are no unintended network requests. Existing applications keep their authorized service calls and asset pipeline.
