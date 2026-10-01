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

**Where the curriculum actually stands** (audited September 2026, by reading each
lesson's header *and* body — a header alone will mislead you):

| | Mechanism | Mechanism + Limit | Limit | Quantity only |
|---|---|---|---|---|
| Level 2 (67) | 16 | — | 3 | 48 |
| Level 3 (63) | 13 | 25 | 17 | 8 |

Big Ideas 17 and 18 were built after that audit and are counted above. Big Idea
18's Level 3 is the pattern to copy: **L3P18 is pure Mechanism** and adds no new
machinery at all — it derives the tilt across a bend from circular motion and a
force balance, `Δh = v²w/(gR)`, and then explains *both* banks from the one fact
that a single tilt is set by the average speed while the surface runs faster than
the bed. **L3C18 is a Limit** — concentration is not a property of the rock, and
`C = aQ^b` with b ≈ −0.1 rather than −1 is stated as empirical because it is.
**L3B18 is Mechanism closing the Big Idea**, and it earns its place by making
L2B18's checkpoint unwinnable on purpose: the supply arithmetic there is right,
the trout still dies, and the missing term is the fish's own demand.

Big Idea 19 is the strongest Level 3 trio so far: **all three are Mechanism**, and
all three are about the same pore space P19 names in its first paragraph. L3P19
derives the falling soaking rate from two forces and a growing distance; L3C19
explains why one nutrient leaves and another stays from a single minus sign;
L3B19 derives L2B19's rotting share from water and air competing for the same
pores, with a peak near 60% full. A dial that reads *How Full of Water the Pores
Are* is doing three lessons' work at once.

Big Idea 20 does something the earlier trios did not: **each Level 3 lesson is
answerable only because an earlier one stated its assumption.** L3P20 derives the
`(n - 1)` that L2C20 openly borrowed, and closes by noting that it assumed one
speed of light in the glass. L3C20 relaxes exactly that assumption and the whole
Abbe-number trade falls out -- *the limit was visible in the assumption before the
consequence was measured*. That is what a **Still standing** line is for, and it
is worth writing them precisely enough to be picked up later.

Big Idea 21 is the first trio where **all three lessons are about the same
structural fact**: a cycle is what you use when you cannot store. L3P21 is
Mechanism + Limit and the cleanest **Mechanism** argument in the curriculum — the
Earth is in free fall, so an *even* pull raises no tide, and taking the difference
of a 1/r² pull costs one power of r. That single exponent derives L2P21's borrowed
spring/neap 2.70 from mass and distance alone, and dismisses planetary alignments
by a factor of ten million. L3C21 is Mechanism + Limit too, and its limit is
unusual: **the sink is consumed by its own work**, because absorbing one CO₂
spends one carbonate ion, so the Revelle factor rises as the ocean absorbs and the
two dials are not independent. L3B21 is **Mechanism**, and it is the one to study
for how a Level 3 lesson should treat a Level 2 finding it inherits.

**L2B21's alarming number became L3B21's mechanism.** Level 2 measured a reserve of
5.5 minutes and left it looking like a design flaw. Level 3 shows the thinness *is*
the sensor: spending ATP removes from the large pool and adds to the small one, so
the fractional changes differ by exactly `[ATP]/[ADP]` and a 1% fall in ATP is a
10% rise in ADP. A level does not only remove a simplification — at its best it
**reverses the sign of the level below's conclusion** while keeping every figure.

**Four closing biology lessons now turn on a shape rather than a fact**, and each
says so: L3B18's two curves gave a **ratio** that collapses, L3B19's two factors a
**product** that peaks, L3B20's a **reciprocal** that turns a steady decline into a
sudden event, and L3B21 **amplification by scarcity** — read the small pool, and
the signal is magnified by exactly the ratio of the two. A learner who recognises
the fourth shape from the first three has gained more than any of the four
results, which is why each lesson names its shape and lists the earlier ones.

Level 2 stays Quantity-dominant, which is correct — its verb *is* Calculate — but
its three Big Idea 18 lessons chain rather than sit side by side: L2P18's
discharge is an input to L2C18's load, and L2B18's percent saturation is L2P18's
flow wearing a different hat.

Level 2 being Quantity-dominant is correct: its verb *is* Calculate. Level 3 is
the one to watch, and **55 of its 63 lessons already carry Mechanism or Limit
reasoning**. The 8 that are Quantity alone each pass the third test — L3C15's ICE
tables, L3P14's sampling rate, L3B14's 138 silent swaps all change a decision.

L3P15 was wrongly flagged as failing the test on the strength of its header,
which reads as a bare correction formula. Its body is a Limit lesson: it states
that θ²/16 is only the first term of an endless series, tabulates where that
correction *itself* fails (2.6 points out by 90°), and costs a clock 123 s a day
for a swing that widened five degrees. Judge a lesson by its body.

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

**The footer `note` holds about 150 characters, and the rest was being thrown
away.** `fitText` shrinks to a 10px floor and then splits into exactly **two**
lines, so everything past roughly 120 characters was drawn off the sides of the
canvas and clipped -- silently, mid-word. **110 of 123 notes exceeded that**
(median 193 characters, and two over 690). `wrapNote` now wraps to three lines
and ends in an ellipsis if it still will not fit, so a long note is visibly cut
rather than invisibly lost; it fits in the 46px between the meter's end labels
and the bottom of the canvas, with 12px of clearance. **Three lines is about 150
characters at the common 400px panel width** -- the note is a caption, not a
paragraph. Explanation belongs in the lesson, which has room for it.

**A length cannot show a small percentage -- count instead.** L3B21's point is
that a **1%** fall in ATP is a **10%** rise in ADP. Drawn as two bars on one
shared scale -- which is honest -- that 1% is 1.3px on a 150px bar: a hairline,
so the drawing could not show the one thing the lesson is about, and captions,
travelling dots and a hatched block were piled on to compensate. Nine strings on
screen and the mechanism still had to be taken on trust. **Counting fixed it
exactly.** One dot is 0.05 mM, so ATP is 100 dots, a 1% fall is precisely one
dot, and the learner reads *lost 1 of 100, gained 1 of 10* off the screen. No
scale, no metaphor, and the arithmetic is exact rather than approximated. Where
the interesting quantity is a small share of a big pool, make the dial values
divide the pool into whole countable units and let the learner count.

**A metaphor on the canvas is a technical term with no definition.** *Slice* in
L3B21 and *ceiling* in L2B18 were both invented by the lab, and both were read
off the screen by a learner who had been given no way to know what they meant.
The word-presence check passes them, because the lesson echoes them once. If a
word on the canvas is not the plain name of the thing, it is jargon -- say
*share*, or name the quantity.

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
python3 scripts/check-syntax.py              # will it parse: open strings, stray braces
python3 scripts/check-legacy-visuals.py      # the 96 pairs check-lessons cannot see
python3 scripts/check-plainness.py           # hard words a lesson never defines
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

`check-legacy-visuals.py` covers the pairs `check-lessons.py` structurally
cannot. check-lessons finds a lesson's lab through `extendedLabs.ts`, which lists
only the LabCanvas labs; the 96 Level 1 labs that predate LabCanvas are paired in
a chain of ternaries in `LessonShell.tsx`, so for a long time nobody asked
whether their printed words appeared in their lessons. 178 did not. It parses
`check-lessons.py`'s own `STOP` list rather than keeping a second copy, because
two hand-kept lists drift until the checkers disagree about the same word.

`check-plainness.py` asks whether a long or latinate word is ever **defined**.
Word length alone is the wrong test -- *mutation* and *corrosion* are the subject
-- so it matches an everyday-word list through inflections, possessives and
hyphenated compounds, which is why *germ-killing* passes and *enteric-coated*
does not. **Both of these carry a `--selftest`, and it guards both directions**:
a list wide enough to quiet *grandmother* must not also quiet *homeostasis*. Run
it after touching either word list.

**`check-plainness.py` takes lesson ids, not paths.** `check-plainness.py b21 c21`,
never `.../lessons/b21-respiration-cycle.ts` -- a path matches no lesson, the scan
reports `0 lesson(s)`, and an empty scan reads as a pass. That is the same trap the
other scripts have when their no-argument default diffs an already-pushed commit,
and it cost a pass that had checked nothing. Its inflection matching also has no
`able`/`ible` suffix and no `re`/`un` prefix, so *rechargeable* reports even though
*charge* is ordinary. That one was worth rewording rather than exempting -- a
grades 3-5 lesson is better off with *a cell charges it up* -- but a real false
positive belongs in the word list with a `--selftest` line, not in the prose.

**Level 1 was not written for Level 1.** Big Ideas 27-30 were pitched years above
their readers: P30 handed a nine-year-old Fick's Law as `flux = -D x (concentration
difference / distance)`, P28 gave `blood pressure = cardiac output x total
peripheral resistance`, B29 gave the herd-immunity threshold as `1 - 1/R0`, and
P15 carried `Period = 2 pi root(L/g)` -- four formulas in the level whose rule is
*no formulas*. C27 ran on activation energy, denaturation and the Arrhenius
principle; B30 on Brownian motion, van der Waals forces and monoclonal
antibodies. All are rewritten, and the good results were kept by making them
reachable instead: halve a vessel's width and a sixteenth gets through because
2x2x2x2 = 16; the herd-immunity threshold is *how many of R0 people may still be
catchable, and it must be under 1*, which gives 67%, 80% and measles' 93% by
counting. **Check a Level 1 lesson for formulas before trusting its level.**
Roughly 43 Level 1 lessons still carry a hard word they never define.

C29 explained contact time with a steak in a hot pan, against the standing rule
about examples involving eating animals. A corpus scan found no others: b18's
salmon are wildlife in a river, l3c17's *ribs* are the ridges rolled onto a
reinforcing bar, and b7's *sausage-shaped* describes a shape.

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

**Quoting prose inside a lesson string is the third way to break the build, and
the best hidden.** L3C18 reached CI with `content: "... chooses between "nearly
pure" and "barely thinner"."` The bare quotes close the literal early and then
**re-pair**, so the line is still quote-balanced at the newline and the braces are
untouched: `check-syntax.py` read it as clean, and tsc answered with ten
"',' expected" on one line. `check-strings.py` now checks double-quoted properties
the same way it checks single-quoted ones, and the fix in the prose is simply not
to quote — say *a river whose flood water is nearly pure* instead.

All three failures in this family share one cause: prose was rewritten from a
Python heredoc, where `\n` becomes a real newline and `\"` becomes a bare quote.

`check-syntax.py` answers the one question that has broken this build three
times: will the file parse? It walks a file string- and comment-aware and reports
a quoted string left open at a newline, or an unbalanced brace. It is not a
parser. It exists because `check-strings.py` looks at strings and not at
structure, and Big Idea 18 failed CI twice in a row through the gap: first a real
newline inside a `content:` string, then -- in the script that repaired it -- the
file's closing braces swallowed into the last `content:` string, which has no
trailing comma because it ends the object. That second state was quote-balanced,
and every other checker passed it. Both failures are in its `--selftest`, along
with the JSX apostrophe (`You've mastered`) that must stay quiet. Repo-wide it
reports **0 across 625 files**, which is the calibration that matters: CI is
green here, so any finding on untouched code is a bug in the scan.

**Run the checks as the last thing before committing, not merely at some point
before it.** Big Idea 18's Level 2 broke CI this way: `check-strings.py` ran clean,
then two more edits went in, and one of them inserted a real newline into a
double-quoted `content:` string. tsc answered with an unterminated string literal
and ten "',' expected" on one line -- exactly the failure class the checker exists
for, and the checker catches it on a two-line repro. It was never run again after
the edit. An edit after the last check is an unchecked edit.

Rewriting a lesson string from a Python heredoc is the specific trap: inside a
normal Python string, `\n` is a real newline, so it lands in the file as a line
break rather than as the two characters TypeScript needs. Escape it as `\\n`, or
write the replacement with a raw string.

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
