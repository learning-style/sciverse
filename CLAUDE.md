# Sciverse

Interactive science lessons across physics, chemistry and biology, built as a
React + TypeScript + Vite single-page app. Live at
https://learning-style.github.io/sciverse/

This file is the project's working memory. It replaced a Copilot instructions
file; Claude Code in VS Code is the only assistant used on this project.

## The curriculum

Every topic is a **Big Idea** — a question like *Why Do Things Move?* — answered
three times, once per discipline, in a fixed order:

| | | |
|---|---|---|
| **P** | physics | the mechanism |
| **C** | chemistry | the materials |
| **B** | biology | ties the other two together |

Biology comes last deliberately: it closes the Big Idea and its summary table
covers all three lessons.

Each Big Idea is then taught at up to three depths. **A level does not add facts
on top of the one below — it removes a simplification that one depended on.**
Every Level 3 lesson says so, and names the simplification still standing in
itself.

| Level | Grades | Verb | What changes |
|---|---|---|---|
| **1** | 3–5 | Explore | Plain language, one control, a checkpoint. No formulas. |
| **2** | 6–8 | Calculate | Real units, two controls, one formula, a worked example. |
| **3** | 9–12 | Model | Derive and rearrange, question the assumptions, real data. |

Level 1 is complete: 50 Big Ideas, 150 lessons, 50 assessments. Levels 2 and 3
are being built in Big Idea order.

`docs/big-ideas.md` holds the Big Idea table. `docs/curriculum-roadmap.md` and
`docs/cross-discipline-sprint.md` hold the planning behind it.

## Writing a lesson

**Content**
- Grade-appropriate language; bold key terms; define every term before using it.
- No jargon the lesson does not define. *Doping* and *n/p-type* were rejected as
  too advanced for Level 1; *lux* was rejected as an unexplained unit.
- **No examples involving eating animals**, cattle especially.
- A summary table in the `complete` node.
- The biology lesson ties all three disciplines together.

**Every directional quantity must state its frame of reference.** This is the
single most common defect found in review — a flux with no reservoir named, a
"sink" defined against a different reservoir than its own fluxes, "in" and "out"
with no referent. The science was right every time; the frame was unstated.

**Every formula must state its condition.** `Q = mcΔT` holds within one state of
matter. `pV/T` describes an ideal gas. `1 − (1−p)ⁿ` assumes independence. Say so
where the formula is introduced, not only at the end.

**Controls** — one per lab at Level 1, two at Levels 2 and 3. Always a real unit
where a real quantity exists. A percentage is only correct when the quantity
genuinely is a proportion, and even then prefer something picturable: Big Idea 49
uses "30 spoonfuls in every bucket" rather than a percentage.

**Node graph** — `root` branches to `misconception` or straight on. Anything a
learner must see belongs on the **main path**, reachable from both branches.
L2C1 once hid both its definitions on the misconception branch, so answering
correctly gave you the worse lesson.

## Writing a lab

Canvas scenes anchor to `stageTop`/`stageBottom`, never canvas height. Nothing
above y=70; text may sit at y 74–122; scenes `return { meter, note }` rather than
drawing their own footer; label type 13–16px.

`LabCanvas` owns sizing, the animation loop, the control panel and the heading
and footer bands. Its three-zone layout exists to make overlap impossible — most
of the rules above came from a defect found on screen.

**`Accent` is a closed union: `indigo | emerald | rose`** (physics/chemistry/
biology). Anything else is a type error, not a fallback.

**Never name a local after a `LabScene` field** (`t`, `v`, `W`, `H`, `raw`).
Legal, but it has produced real bugs and the checker treats it as a fault.

**Colour must agree with the sign.** If a readout can go negative, the colour
that marks it must follow the arithmetic, not a value judgement — and if green
would read as approval where it should not, say so in the lesson.

## Before every commit

```
python3 scripts/check-lessons.py            # every lesson
python3 scripts/check-lessons.py l2p1 l3c2  # named ones
```

It pairs lessons to labs through `extendedLabs.ts`, so it needs no argument
list. It checks bracket balance, scene params referenced-but-not-destructured
and destructured-but-unused, helpers called-but-not-imported, implicit `any`,
declaration order, the `Accent` union, required dialog nodes, the summary table,
that each `controlLabel` is named in its lesson, and that **every word the canvas
prints appears in the lesson first**.

It verifies **mechanics, not meaning**. Every genuine content problem found in
review — a boot where a bat belonged, an undefined term, "in" with no
referent — passed every check cleanly.

Also worth running by hand: walk the node graph from `root` and confirm nothing
is unreachable.

## Environment

**There is no Node runtime on this machine.** `node`, `npm` and `npx` are all
absent, so `tsc`, `vitest` and `vite build` cannot run locally. CI is the only
type-check available, and five separate type errors have reached CI this way —
`noUnusedLocals`, use-before-declaration, a closed union, tuple widening, and a
narrow level union. Installing Node would remove that entire failure class.

## Deploying

`.github/workflows/deploy.yml` publishes to the `gh-pages` branch on merge to
`main`. The unit-test gate is **on** (`needs: [test]`).

To confirm a deploy actually landed, three steps rather than one:

1. Job-level conclusion of **Publish GitHub Pages** for that SHA — not the run
   conclusion.
2. `git ls-remote origin gh-pages` moved, **and** the new head's message names
   your SHA (it reads `deploy: <full sha>`).
3. Fetch the site's hashed JS bundle and grep for the strings you added **and
   the ones you removed**. New text being present does not prove old text is
   gone.

Every deep link returns HTTP 404 from GitHub Pages — Pages has no SPA rewrite,
so the deploy copies `index.html` to `404.html` and React Router takes over. The
status code is expected; check the body.

## History

The project began from a friend's portfolio codebase and was cut free in
September 2026. Nothing of it remains: the portfolio shell, the Matter.js
kinematics demo and its two permanently-failing test suites all went together,
which is what allowed the test gate to be turned back on.
