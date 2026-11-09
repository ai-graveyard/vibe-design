---
name: vibe-design
description: {{DESCRIPTION}}
license: MIT
---

# Vibe Design

{{COUNT}} web style studies with bilingual briefs, source-derived example tokens and independent HTML references. Use them to adapt an existing project while retaining its behavior, brand and useful components. Reference material does not guarantee an AI model's output or certify an implementation.

## Start with the project

Read the user's project brief, repository instructions, existing `DESIGN.md`, brand rules and representative pages before choosing a treatment. Reuse confirmed goals and constraints already in the conversation. If information is missing, inspect the project and state a reasonable assumption; ask only when a missing decision changes the result materially.

Default to restyling the existing project. Preserve routes, API contracts, data fields, authentication, forms, user copy, analytics and working interactions. Preserve brand colors, logos, licensed assets and existing component APIs unless the user authorizes a change. A request for a new page can use a demo as a starting point; say when it does.

## Choose and read the reference

If a style is named, use its ID below. Otherwise consult `references/picker.md` and offer up to three candidates with a project-specific reason and a concrete tradeoff. Proceed with the user's chosen direction or their authorization to choose.

Read `references/styles/<id>.md` for principles, pitfalls, version, source hash and the current example's tokens. Read `assets/demos/<id>.html` for the actual composition and interactions when needed. Read `references/designs/<id>.md` when establishing ongoing project rules.

The tokens describe this authored example. Use them exactly for an explicitly requested demo reproduction. For a project adaptation, map them to the project's brand and existing tokens, preserve the defining principles, and record each deliberate change. Treat a layout pattern, material and motion choice as composable roles; resolve conflicting rules before implementation.

## Adapt in a controlled scope

Use the project's existing framework and components. Agree on the authorized routes or sections from the brief, then complete one representative page and check it before extending the rules to the other authorized pages. Do not replace the project with the demo's fictional product, numbers, imagery or copy.

Use the selected study version and demo source hash consistently in the brief, implementation notes and `DESIGN.md`. Copy `references/designs/<id>.md` only when a project design document is absent; otherwise merge the relevant rules into the existing document. Record the project's actual token mappings, component states, protected behavior, page scope and intentional exceptions. Keep these rules useful for the next page.

## Verify the rendered result

Run the project's relevant checks, then inspect the actual page in an available browser after images and fonts load. Follow `references/checklist.md`: compare before and after at the project breakpoints, check narrow screens, keyboard navigation, component states, long Chinese and mixed-script copy, reduced motion and fallbacks. Check route and task behavior against the original page.

Fix observed problems and repeat the affected checks. Report the routes, viewport sizes and states actually inspected, remaining limitations, and any deliberate deviations. If no browser is available, say that visual and interaction acceptance remains unverified; a build or static token match cannot stand in for it.

## Style index

Difficulty estimates the implementation work of the example in CSS; it does not predict project delivery time.

{{STYLE_INDEX}}

## Files

```text
references/styles/<id>.md   Principles, bilingual brief, example tokens and source identity
references/designs/<id>.md Ongoing DESIGN.md starting point for a selected project
references/picker.md       Candidates by project type and implementation difficulty
references/checklist.md    Browser and behavior acceptance guidance
assets/demos/<id>.html     Independent reference implementation
```

Source and live previews: {{HOMEPAGE}}
Online agent index: {{HOMEPAGE}}/llms.txt
