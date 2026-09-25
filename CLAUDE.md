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

**Depth comes in three kinds, and only one of them is arithmetic.**

| | What it does | Example |
|---|---|---|
| **Mechanism** | why the level below's rule is *true* | L3P6 derives buoyancy from the pressure difference — no new machinery at all |
| **Limit** | where the rule *breaks* | L3P3: no engine beats 1 − Tc/Th |
| **Quantity** | puts a number on it | L3B16 |

Mechanism lessons are at once the **simplest and the deepest**, because explaining
why something is true needs no new apparatus. Prefer *"why is the Level 2 rule
true?"* over *"here is a more accurate formula"*.

**Three questions before writing a Level 2 or Level 3 lesson:**

1. Does the learner already **feel** the simplification? Is there a tension they
   would notice unprompted?
2. Can they **reason** to the removal with maths they already own — or must they
   accept a formula? Chain it to something they have: L3P8 adds thermal
   resistances *"just as L2P7's resistors added"*; L3C3 makes fuel energy *"the
   difference between the bonds broken and the bonds made"*.
3. Does the number **change a decision**?

A lesson that fails (2) is a recipe, however correct. L3B16 first handed over
`weight = 1/error²`, which cannot be derived at this level — so a learner did
arithmetic they could not justify. It now generalises L2B16's own rule (errors add
through their squares) to any split of the vote, has the learner **try splits**,
and lets them find the lowest point at 94% — which is 16 to 1, and (20/5)² = 16.
Same figures, same conclusion, reached rather than received. What is still
standing became honest too: *proving* 1/error² optimal needs statistics beyond
this level.

An asserted formula is acceptable where it is genuinely on the school syllabus —
Nernst in L3C7, Henderson-Hasselbalch in L3C11 — or where the law is empirical and
the lesson **says so**, as L3B10 does for S = cA^z. It is not acceptable when the
formula belongs to no syllabus at this age.

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

**Every acronym is expanded at its first use in each lesson** — in the prose a
learner reads, not in a file comment, and per lesson rather than once per
curriculum, because a lesson has to stand on its own. *ASCII* appeared in L2P14
with no expansion; *DNA* was unexpanded in all 14 lessons that used it. A
lesson that leans on an earlier lesson's expansion still restates it: L3C13
used *HDPE* because C13 had spelled it out.

**A dial's label must be explained by the time the learner reads it.** The
visual appears as soon as the node that sets it is reached -- usually `root` --
so a term first defined in `defining` has already been read off a slider. L2P16
described both of its ideas in `root` ("points steeply **into** the ground",
"**magnetic north** ... not the same place as the **North Pole**") and named
neither, while the two dials named them and described neither: the learner met
the idea and the label in different places. Name the term where the idea is
introduced, and say which dial it is. `scripts/check-clarity.py` finds these.

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

**`stageTop` is the constant 124, and a scene's own two text lines sit *above*
it** at y 94 and 118, in the band between the header and the stage. Artwork
belongs below `stageTop` — not alongside that text.

**Scale artwork to the height available, and centre it in the stage.** Pinning a
scene near `stageTop` at a fixed pixel size crowds the writing above it and
leaves the lower half of the stage empty: L3C14 drew a 58px molecule at
`stageTop + 52` with ~200px unused beneath it. Derive sizes from
`stageBottom - stageTop`, and where a size depends on a control, measure the
composition at its largest setting so it holds place instead of drifting as the
dial moves. Attach a label to the thing it describes rather than to a fixed
offset.

**A layout cannot be checked by reading it, and there is no browser here.**
Verify one by replicating the geometry in Python across several canvas widths
and heights with both controls at their extremes, asserting that nothing reaches
the text band above or the footer lines below. That is how the relayout above
was confirmed.

`LabCanvas` owns sizing, the animation loop, the control panel and the heading
and footer bands. Its three-zone layout exists to make overlap impossible — most
of the rules above came from a defect found on screen.

**Every number the canvas prints must be named by a word beside it.** A unit is
not a name: `0.9` and `3.0` on two atoms were electronegativities with nothing
on screen saying so, and `104.5°` was a bond angle. Either name the quantity in
the same string (`bond angle 104.5°`, `torque 12.5 N m`) or in a caption that
clearly governs it. Formula lines (`Q = 300 g x c x 20 °C`) already name
themselves through their symbols.

**`Accent` is a closed union: `indigo | emerald | rose`** (physics/chemistry/
biology). Anything else is a type error, not a fallback.

**`readout` receives only `v` and `raw`** — its parameter is
`Pick<LabScene, 'v' | 'raw'>`, so a second slider's `raw2` is not available
there. Put anything that depends on both controls in `drawScene` or the meter
note instead. Destructuring `raw2` in a readout compiles nowhere and reached CI
twice in Big Idea 14.

**Never name a local after a `LabScene` field** (`t`, `v`, `W`, `H`, `raw`).
Legal, but it has produced real bugs and the checker treats it as a fault.

**Colour must agree with the sign.** If a readout can go negative, the colour
that marks it must follow the arithmetic, not a value judgement — and if green
would read as approval where it should not, say so in the lesson.

## Before every commit

```
python3 scripts/check-lessons.py            # every lesson
python3 scripts/check-lessons.py l2p1 l3c2  # named ones
python3 scripts/check-clarity.py            # is every visual term explained?
python3 scripts/check-unused.py             # unused symbols in changed TypeScript
python3 scripts/check-strings.py             # string literals that will not parse
```

It pairs lessons to labs through `extendedLabs.ts`, so it needs no argument
list. It checks bracket balance, scene params referenced-but-not-destructured
and destructured-but-unused, helpers called-but-not-imported, implicit `any`,
declaration order, the `Accent` union, required dialog nodes, the summary table,
that each `controlLabel` is named in its lesson, and that **every word the canvas
prints appears in the lesson first**.

`check-clarity.py` asks the harder question `check-lessons.py` cannot: not
whether a printed word *appears* in the lesson, but whether it is **defined**,
and whether it is defined **before the learner sees it**. A control label passes
the word-presence test just by being echoed once. Gauge end labels
("Almost none", "Full") are qualitative by design and are exempt; a term counts
as technical only where the lesson itself bolds it.

`completeSubtitle` is deliberately **not** word-checked: it carries the Big Idea's
own title, shared by all three of its lessons, so requiring its words in each one
flagged *ecosystems*, *human* and *life* against a physics lesson. `note`,
`caption`, `low`, `high`, `completeNote`, `completeTitle`, `title` and `display`
are all still checked, and a real defect still fails -- C35's canvas prints
*melted*, *ruined* and *solid* where its lesson uses none of them.

It verifies **mechanics, not meaning**. Every genuine content problem found in
review — a boot where a bat belonged, an undefined term, "in" with no
referent — passed every check cleanly.

Also worth running by hand: walk the node graph from `root` and confirm nothing
is unreachable.

## Environment

**There is no Node runtime on this machine.** `node`, `npm` and `npx` are all
absent, so `tsc`, `vitest` and `vite build` cannot run locally. CI is the only
type-check available, and six separate type errors have reached CI this way —
`noUnusedLocals` twice, use-before-declaration, a closed union, tuple widening,
and a narrow level union. Installing Node would remove that entire failure class.

**Rewriting the contents of a single-quoted string is how a build breaks.**
`lens: 'A magnet's pull ...'` closes the string at the apostrophe, leaves the
rest of the line as bare text, and tsc answers with twenty "',' expected" on one
line. No lesson checker parses TypeScript, so all three passed a file that could
not compile. `check-strings.py` looks for exactly this: a property whose
single-quoted value holds an unescaped apostrophe, plus strings left open at a
newline. It knows to ignore JSX text (`You've mastered`) and union types
(`target: 'plant' | 'puppy'`), and both exclusions are regression-tested against
the real failure so they cannot silently disarm it.

Pass these scripts explicit paths when the work is already committed -- their
no-argument default diffs against `origin/main`, which is empty once pushed, and
an empty scan reads as a pass.

`check-unused.py` stands in for the type-check that cannot run here. It scans
everything changed against `origin/main` for unused consts at any depth, unused
function parameters, destructured scene fields that are never read, and unused
imports -- export-aware, so `export const Component` is not reported. It is
regression-tested against the two real failures: the `HARDEST` const and the
`lesson` parameter left behind when the string using it was rewritten.

**`noUnusedLocals` applies at every depth, including module level.** The second
failure was a module-level `const HARDEST = 900000` in a lab, declared for the
top of a range and never read. A hand-written scan that only walks `drawScene`
looks straight past it, so check declarations at every nesting depth — and make
the scan **export-aware**, or every `export const Component` reports as unused.

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
