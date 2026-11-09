---
name: vibe-design
description: Choose and apply a web visual style to an existing project while preserving business behavior, brand and components. 30 bilingual studies include source-derived example tokens, HTML references and reusable DESIGN.md baselines. Use for website restyling, style selection, or a new page with a requested visual direction; supports 网页改造、风格选型、品牌适配. Does not replace project behavior design or an unrelated accessibility audit.
license: MIT
---

# Vibe Design

30 web style studies with bilingual briefs, source-derived example tokens and independent HTML references. Use them to adapt an existing project while retaining its behavior, brand and useful components. Reference material does not guarantee an AI model's output or certify an implementation.

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

| id | Style | Traits | Candidate use | Difficulty |
| :-- | :-- | :-- | :-- | :-- |
| `apple` | Apple Minimalism · Apple 风 | Minimal, Modern | Premium consumer electronics sites | 3 Hard |
| `braun` | Braun / Dieter Rams · 迪特·拉姆斯风 | Minimal, Classic | Industrial design company sites | 2 Medium |
| `flat` | Flat Design · 扁平化 | Minimal, Modern, Classic | Mobile app UI design | 1 Easy |
| `material` | Material Design · Material Design | Modern, Classic | Android native app development | 2 Medium |
| `swiss` | Swiss Style / International Typographic · 瑞士风格 | Minimal, Classic | International art biennial sites | 2 Medium |
| `bento` | Bento Grid · Bento 网格 | Minimal, Modern | Product feature showcases | 2 Medium |
| `aurora` | Aurora Gradients · 极光渐变 | Modern | SaaS product sites | 3 Hard |
| `bauhaus` | Bauhaus · 包豪斯 | Art, Vintage, Classic | Contemporary art gallery sites | 2 Medium |
| `scandinavian` | Scandinavian · 斯堪的纳维亚 | Minimal, Warm | Home furniture brand sites | 1 Easy |
| `neo-brutalism` | Neo-Brutalism · 新粗野主义 | Avant-garde | Developer tools and CLI products | 1 Easy |
| `duotone` | Duotone · 双色调 | Art, Vintage | Music streaming platforms | 1 Easy |
| `japanese` | Japanese Minimalism · 日式极简 | Minimal, Classic, Warm | Japanese restaurant websites | 2 Medium |
| `organic` | Organic Design · 有机形态 | Modern, Playful | Tech company rebranding | 4 Expert |
| `liquid-glass` | Liquid Glass · 液态玻璃 | Modern, Avant-garde | Operating systems and system-level apps | 3 Hard |
| `editorial` | Editorial · 报刊编辑风 | Classic, Distinctive, Art | Digital magazines and newsletters | 2 Medium |
| `brutalism` | Brutalism · 粗野主义 | Avant-garde, Distinctive | Avant-garde artist personal sites | 1 Easy |
| `terminal` | Terminal · 终端黑客风 | Vintage, Distinctive | CLI tools and dev products | 1 Easy |
| `memphis` | Memphis · 孟菲斯 | Art, Playful, Vintage | Kids brands and educational products | 2 Medium |
| `art-deco` | Art Deco · 装饰艺术 | Classic, Vintage | Luxury jewelry brands | 3 Hard |
| `glassmorphism` | Glassmorphism · 玻璃拟态 | Modern | SaaS dashboards and consoles | 3 Hard |
| `dark-academia` | Dark Academia · 暗黑学院 | Classic, Vintage | Independent publishers and bookstores | 2 Medium |
| `pixel` | Pixel Art · 像素风 | Vintage, Playful, Distinctive | Indie game studios | 2 Medium |
| `cyberpunk` | Cyberpunk · 赛博朋克 | Avant-garde, Distinctive | Game websites and esports brands | 3 Hard |
| `frutiger-aero` | Frutiger Aero · Frutiger Aero | Vintage, Playful | Weather and eco apps | 4 Expert |
| `claymorphism` | Claymorphism · 粘土拟态 | Modern, Playful | Kids education apps | 4 Expert |
| `vaporwave` | Vaporwave · 蒸汽波 | Art, Vintage | Retro electronic music projects | 3 Hard |
| `maximalism` | Maximalism · 极繁主义 | Art, Distinctive | Luxury brand flagships | 4 Expert |
| `kinetic` | Kinetic Typography · 动态字体 | Art, Avant-garde | Creative agency websites | 3 Hard |
| `anti-design` | Anti-Design · 反设计 | Avant-garde, Distinctive | Gen Z streetwear brands | 2 Medium |
| `neumorphism` | Neumorphism / Soft UI · 新拟态 | Modern, Minimal | Concept design and Dribbble showcases | 2 Medium |

## Files

```text
references/styles/<id>.md   Principles, bilingual brief, example tokens and source identity
references/designs/<id>.md Ongoing DESIGN.md starting point for a selected project
references/picker.md       Candidates by project type and implementation difficulty
references/checklist.md    Browser and behavior acceptance guidance
assets/demos/<id>.html     Independent reference implementation
```

Source and live previews: https://v2ai.org/vibe-design
Online agent index: https://v2ai.org/vibe-design/llms.txt
