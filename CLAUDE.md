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

**A finished lesson that sits above its level goes to `docs/level4/`, not the bin.**
L2P23 was stress concentration -- `K = 1 + 2a/b` -- which is engineering-level for
grades 6-8. It is kept whole there with a `.parked` suffix, outside `include: ["src"]`
so neither tsc nor the checkers can reach it, and with a README saying why it moved
and what reinstating it would cost. The science was checked and the layout simulated;
that work should not be thrown away because the level was wrong.

**Check a Level 2 lesson against the question Level 1 actually asked.** The giveaway
here was not the difficulty but a word count: P23 opens with *"why do bridges fail
after many small loads?"* and names **fatigue** five times, and L2P23 named it
**zero** times. It had answered the *concentration* half of Level 1 and skipped the
*repeated-loads* half -- which is the half a learner has actually seen happen, every
time they have snapped a paperclip. The replacement is that paperclip.

**Replacing a lesson means hunting its cross-references.** L3P23 was built to
demolish L2P23's formula, so it now has to **introduce** `K` itself before taking it
apart. L2B23 referred to the crack six times, and the whole Level 2 spine had been
"boundaries, not bulk", which only held because the physics was a crack. With fatigue
in place the truer spine is that **all three Level 2 lessons are something spent at a
rate** -- a life of bends, a thickness of zinc, a distance between edges -- so all
three are a division, and in every case the rate is what can be changed. Boundaries
still close Level 3, where they genuinely hold.

**Where the curriculum actually stands** (audited September 2026, by reading each
lesson's header *and* body — a header alone will mislead you):

| | Mechanism | Mechanism + Limit | Limit | Quantity only |
|---|---|---|---|---|
| Level 2 (79) | 21 | — | 9 | 49 |
| Level 3 (75) | 14 | 36 | 17 | 8 |

Big Ideas 17 and 18 were built after that audit and are counted above, as are 19 to
24. **Everything after Big Idea 18 was classified by whoever wrote it**, which is not
the same as being audited -- the September count came from reading bodies with fresh
eyes, and L3P15 shows how far a header can mislead. The rows for 19-24 are worth
re-reading rather than trusted, and the figure to be most sceptical of is Level 2's
19 Mechanism lessons: a lesson whose verb is *Calculate* can look like it explains
why its rule holds when it has only stated the rule carefully. Big Idea
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

Big Idea 22 is the first trio where **all three Level 3 lessons are Mechanism +
Limit**, and the first where the three disciplines converge on a single word. L3P22
does something no other lesson does: it takes L2P22's admitted assumption, **measures
how wrong it is** (straight lines turn the 103° shadow into a 3,966 km core against
the real 3,480), and shows that the error is the discovery — because *an imprecise
measurement scatters and a wrong model leans*, a consistent 14% is a measurement of
the speed gradient. The liquid outer core is then proved by an **absence**: no S-wave
anywhere beyond 103°, because a liquid has no shear strength. L3C22 calculates what
L2C22 looked up — `E(n) = -13.6/n²` gives all four visible hydrogen lines inside
**0.04%** — and its limit is sharp: sodium's 2.105 eV fits **no** integer pair, because
eleven electrons screen one another. L3B22 explains why there is an echo at all from a
mismatch in `Z = density x speed`.

Big Idea 23 is the second trio where **all three Level 3 lessons are Mechanism +
Limit**, and the one whose handover was redesigned after it was built. L2P23 is
fatigue -- a paperclip's `life = 4 x (90/angle)³` bends -- and it closes by saying
plainly that it never told you *what* the invisible damage is. L3P23 answers that in
its first line: a **crack**, a little longer after every bend, which turns *when
does this break?* into *how long a crack is too long?* It then raises
`K = 1 + 2a/b` as the natural guess and pushes it until the formula claims that
**any scratch breaks anything** -- which it must, because K runs to infinity at a
real crack tip. The resolution changes what fracture is *about*: a crack must pay
for the new surface it makes, release goes as stress² x length while cost per
millimetre is constant, so **length replaces sharpness** and the critical crack is
12.7 mm in steel against 62 µm in glass. L3C23 does the same for
a different impossibility -- a coating that protects steel it is not covering -- and
the resolution is that the steel is **the wrong electrode**, not a covered one.
L3B23 is the cleanest **unification** in the curriculum: L2B23's "half the short
side" and "the radius" were one quantity all along, the **inradius**, and naming it
explains stitching, the surgeon's ellipse and the graft at once.

**A lesson may introduce a formula in order to demolish it, and both halves can
live at one level.** That contradiction was first built as a handover across two:
L2P23 gave K, L3P23 broke it, and the learner arrived at Level 3 already wanting the
answer rather than being told one was owed. It is a good shape and worth reaching
for -- but it only works if the setup half genuinely belongs at the lower level, and
`K = 1 + 2a/b` did not. Moving it left L3P23 owning both halves, which cost one
paragraph and lost nothing. **Where the setup cannot sit a level down on its own
merits, put setup and payoff in the same lesson rather than mis-levelling the
setup.** The replacement handover is better anyway, because L2P23 now ends on a
question it states but cannot answer.

**Cross-references outlive the lesson they point at.** Replacing L2P23 left three
behind: L3B23's closing table gave `K = 1 + 2a/b` as the **Level 2** physics rule
and credited Level 3 with removing *the sharpness*, and the Level 3 assessment
opened by calling the formula *L2P23's*. **Not one of the checkers can see this** --
the text is well-formed, every word still appears in some lesson, and nothing in the
repo records which lesson a claim was borrowed from. So after replacing a lesson,
grep the corpus for **its ID and for its formula**, and read the **other two
disciplines' closing tables**, which are where the level-by-level rows live. The
replaced lesson's own siblings were already correct; the stale rows were all in the
level above.

**The three disciplines read the same word.** A difference in wave speed, a difference
in electron energy, a difference in impedance — and each instrument is **blind to
sameness**: uniform rock, evenly spaced levels and uniform tissue are all invisible.
That is the actual answer to the Big Idea, and no single lesson states it.

**L3B22 also repeats L3B21's reversal, which makes it a pattern rather than a
curiosity.** Soft tissue against liver reflects **0.0037%**, so eight boundaries still
pass 99.97% of the pulse and it reaches the bottom intact; a 50% reflector would show
the first boundary brilliantly and nothing behind it. **Ultrasound works because its
echoes are faint**, exactly as a cell's tiny ATP store is what makes its sensor sharp.
Twice now the apparent weakness has turned out to be the mechanism — worth looking for
a third time.

Big Idea 24 is the first trio where **each Level 3 lesson removes something its
Level 2 lesson had already confessed to**, which turned out to be easier to write
than guessing at a simplification. Its Level 1 lessons are among the vaguest in the
curriculum -- dials called Pressure and Resistance and not a number anywhere -- so
Level 2 had to invent the question as well as answer it: **which part of a network
is actually deciding?** The answer needs only two rules, and they are opposites.
L2P24 has capacities **add** across pipes that sit side by side, so the narrowest
pipe is often the wrong one to replace. L2C24 has two reaction routes **divide** one
stream of carbon, because they compete for the same material -- so doubling both
routes changes the share by exactly nothing, while doubling both pipes doubled the
delivery. **Same picture, opposite arithmetic, and the difference is who owns the
material.** L2B24 closes it with a queue of three steps whose limit **moves three
times in three days** while the tree does not change.

The lesson for the next Big Idea is about where Level 3 comes from. **A Level 2
lesson that names its own weak point precisely has written the Level 3 lesson's
first paragraph.** L2P24 said *take the smaller of the two lines* and could only
prove *no more than*; L3P24 proves the rest, and **being stuck is itself a cut** --
mark everything still reachable and the edge of what you marked is the bottleneck,
with everything forwards full and everything backwards empty. L2C24 stated in
passing that the gases rush away and never come back; L3C24 removes exactly that
sentence and **the speeds vanish from the answer entirely**. L2B24 admitted its
capacities were handed over; L3B24 derives the xylem's from a cost that falls
against one that rises.

**L3B24 is the fourth closing biology lesson to turn on a shape, and the first whose
shape is forgiving.** At the best radius the friction cost is *exactly* half the
upkeep -- at every flow, whatever the constants -- which lets a learner find the
optimum by inspection instead of by differentiating, and makes the arbitrary units
cancel out of a ratio. That puts r³ proportional to Q, so conservation at a junction
gives **r₀³ = r₁³ + r₂³** with no new biology at all. And the bottom of the curve is
**flat**: 10% off the best radius costs under 5%. That one fact answers two things at
once -- why one xylem can serve every kind of weather, which L2B24 raised and could
not resolve, and why real measurements scatter around Murray's law while the rule
still holds. **Near the bottom, almost right is almost free.**

Big Idea 25 is the trio where **all three Level 3 lessons land on the same number**,
and it is the strongest close so far. Its Level 1 lessons are the jargon high-water
mark of the curriculum -- *chaotic*, *nonlinear*, *trajectory*, *deterministic*,
*propagation*, *amplification*, *cascade*, and not one number anywhere -- so Level 2
had to find the question too. It is this: **a tiny cause becomes a big effect only by
being multiplied, so the size of the effect is set by how many repeats and never by
how big the cause was.** L2P25 doubles a forecast error, L2C25 sends a carrier round
a cycle, L2B25 multiplies a switch gene's reach layer by layer, and each one's
punchline is that the obvious proportional answer is wrong: a **thousand**-fold
better thermometer buys a fixed **fifteen days**.

Then Level 3 supplies the half that was missing, and it is the same half three times.
**L3P25** finds L2P25's doubling inside the rule -- a step multiplies a difference by
the **slope** of whatever it is pushed through, and at r = 4 the measured multiplier is
**2.0000**, so the assumed 2 was a slope all along. **L3C25** takes the lid off
L2C25's formula by letting a cycle hand back **b** carriers instead of one, and
1/(1-b) **generalises** the old chain length rather than replacing it, since b = 1-p
returns 1/p exactly. **L3B25** gives real genes a **spare switch**, so g = breadth x
share and the threshold share is 1/breadth.

**Three unrelated multipliers -- a steepness, a count of atoms, a count of genes --
and one dividing line at exactly 1**, with **1/(1 - multiplier)** accelerating into it
in all three. So Level 2's answer was the first half and Level 3's is the second:
**a repeated multiplication has only ever had one question, and it is which side of 1
the multiplier is on.** Below it everything fades however long you wait; above it
nothing stops. Chaos, explosion and developmental catastrophe are three subjects on
the wrong side of the same number, and L3B25 earns the close by pointing out that
living networks are **below** it as a condition of existing -- a lineage with g above
1 has a schedule rather than a risk, so the ones above the line are not here to be
studied.

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
the one to watch, and **67 of its 75 lessons already carry Mechanism or Limit
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

**A round constant is still an unfamiliar constant.** L2C22 first gave a spectral
line's energy as `E = 1240 / wavelength` in **electronvolts**, and justified the
1240 as "two constants multiplied together -- the speed of light and the Planck
constant". A grades 6-8 learner has met neither, so the lesson was leaning on
something it could not explain, dressed up as a round number. **Switching the unit
does not help**: joules needs the Planck constant *explicitly* and turns a readable
2.105 into 3.37 x 10-19. The fix was to drop the energy number from Level 2
altogether. The chemistry survives intact -- a line is one electron dropping
between fixed rungs, so position names the element -- and every calculation became
**nanometres divided by nanometres**, so the units cancel and the answer is a plain
number with no constant anywhere: *how many times bigger* is the longer wavelength
over the shorter, and *resolving power* is the wavelength over the smallest gap.
Electronvolts and the 1240 now arrive in **L3C22**, which is grades 9-12, where they
are on the syllabus and where they earn their keep by calculating the wavelengths
Level 2 had to borrow.

**Ask what Level 2 can reach with what it owns**, and let the level below say
honestly what it could not do: L2C22's *still standing* now reads that the jumps
have only been **compared**, never sized. Carrying the units through a division is
worth teaching in its own right -- it disqualified two of three wrong answers in
that lesson's check without any appeal to the answer key.

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

**A visual has to stand on its own.** A reader who skims the lesson and looks only
at the canvas should still get the point -- that is the standard, and it is what
`check-visual.py` is for. It already asked five questions (a plain-language
takeaway, a named quantity, a complete meter, dialled units, word labels on the
artwork) and answered them for 184 labs; it now also checks the three things that
were silently failing anyway:

| | Budget | Why |
|---|---|---|
| footer `note` | **220 chars** | four 11px lines at the 400px panel; past it, an ellipsis |
| meter `caption` | **33 chars** | 14px bold on a 330px panel |
| strings on the stage | **10** | the corpus median is 5; 14 is a wall of text |

Its `est_len` measures the **longest rendering path**, collapsing each
`(cond ? A : B)` to the longer branch -- counting both overstated every note with a
verdict in it and would have had me trim good ones.

**The footer `note` holds about 150 characters at 12px, and the rest was being thrown
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

**A gauge must say what is good, not just how big.** "Reflects 99.90%" tells a
visual-only learner nothing about whether that is success or failure -- and in
L3B22 it is failure, because nothing gets past and there is no scan, while the
0.0037% that looks like nothing is what makes imaging work at all. The meter's
`low` and `high` are the place for this, because they cost no extra strings:

| | `low` | `high` |
|---|---|---|
| L3B22, echo | `faint: you see deeper` | `total: no scan` |
| L2C22, resolving power | `too blunt to trust` | `sharp enough to trust` |
| L2B22, depth | `at the skin` | `25 cm deep` |

**Only two of those carry a verdict, and that is deliberate.** Echo strength and
resolving power have a direction that matters; a depth, a tide height and a
wavelength do not. **Never invent a good end for a neutral quantity** -- say what
the extremes *are* instead. `check-visual.py` checks the mechanical half of this:
a gauge whose `low` and `high` are both bare numbers says neither, and it reported
**74 of 143** when first written. All 74 are now worded.

Two things that made the backlog tractable. **Validate the wording against the
lesson before writing it**, because every word on the canvas must appear in the
lesson -- a small helper that lists the missing words turned 74 edits into three
batches with five retries instead of 74 word-check failures. And some lessons have
only a 300-word vocabulary, so *all*, *most* and *help* are genuinely absent from
L2P5: pull the lesson's own word list and choose from it rather than guessing.
Keep each pair under about 340px, since `low` and `high` share one 13px line.

**Name what a derived number IS, not just its value.** The notch lab now parked in
`docs/level4/` printed `K = 1 + 2 x 1.0 = 3.0` with nothing saying what K was, and drew a notch without
marking which direction was *across* the pull and which was *along* it -- so the
division had two unexplained inputs and an unexplained output. The caption now
carries the definition (`K = how many times the notch beats the average`), both
lengths are **measured on the notch with ticks** and named with their own arrow
glyph (`↕ a 3.0 across, ↔ b 1.0 along`), and the footers run the chain:
`K = 1 + 2 x 3.0/1.0 = 7.0` then `7.0 x 100 N/mm² = 700 N/mm²`.

**A ratio dial should have a real denominator.** The dial used to read "3.0 across
for 1 along", which is a bare ratio with nothing to point at. Holding **b at 1.0 mm**
makes the dial's reading *be* a in millimetres, so a/b in the footer divides two
numbers the drawing labels. **Where a control sets a ratio, fix the other side at a
real value and let the dial read a real quantity.**

**Simulate how far labels are from EACH OTHER, not just whether each is in the
stage.** A reader sent a screenshot of L2B23 with two captions printed on top of
one another, and every one of them was inside `artBottom` -- the bounds check that
has caught so much else is blind to this. The cause is placing one label from the
**artwork** (it moves as the drawing grows) and the next from the **band** (it does
not), so they converge: 150 of 588 combinations put them within 11px, two of them
2px apart. **Give labels below the artwork fixed, separated slots** rather than
following the thing they describe.

A scan for the pattern across the corpus flagged 31 labs by structure and only
**4 genuinely collided** -- the structure is common and harmless unless the second
label's unclamped value can rise **above** the first. L2B23, L3B23, L2C23 and
L2B22 are fixed; the rest were checked and are clear. When a heuristic flags
dozens, simulate each one before touching any of them.

**Two labels will not share a 240px line.** `safeRight` is 240 at the common 400px
desktop panel *and* on a phone, so a pair of side-by-side labels at 11px overlapped
by 29px. Merging them into one centred string -- 198px of the 216px available -- fixed
it. Check a label pair against `safeRight - 24` before splitting it in two.

**So 216px is the design width, and that is about thirty characters at 12px.** The
240px case is not an edge case -- it is the common one, and `outlineText` shrinks
only to **8px**, which is unreadable. So an over-long string does not fail loudly,
it quietly becomes illegible: Big Idea 24's first draft had five strings needing up
to 310px of 216, and the simulation reported 1092 failures where reading the file
had shown nothing. **Budget 30 characters at 12px and 26 at 13px**, simulate the
shrink rather than the nominal size, and treat anything that renders below 11px as a
failure. Shortening is usually free -- `street A 25 + street B 20 = 45 L/min` became
`streets 25 + 20 = 45 L/min`, which is also the lesson's own phrase for them.

**Derive the number of label rows from the height available; never assume it.** A
phone-height canvas leaves a 128px stage, and at 340px tall only 88px, which cannot
hold a drawing and three label rows however carefully they are placed. Computing
`fit = floor((usable - 24) / 15)` and dropping rows **from the bottom up** -- least
useful first, since a verdict row is already carried by colour and by the meter
note -- turned four separate overlap failures into zero across six labs. The
specific bug to watch for is a **floor on the drawing's height**: `Math.max(20,
usable - rows)` silently exceeds the space it is being fitted into, and
`Math.max(24, usable)` is worse. Floor the drawing low and cap it by what is left.
The same mistake appeared three times in one sitting, in three different labs.

**Check the model at the exact value the lesson emphasises.** L3P25's lab works out
whether a population settles, 2-cycles, 4-cycles or goes chaotic by iterating the map
and looking for a repeat. It was right everywhere except **r = 3.00**, where it
reported *no pattern at all* -- and r = 3 is the threshold the whole lesson is built
on, the one dial position a learner is told to stop at. The cause is ordinary: at the
threshold the slope is exactly -1, so the approach is far too slow to detect in any
number of iterations a canvas can afford. **A numerical method is weakest exactly
where the mathematics is marginal, which is exactly where a lesson plants its flag.**
It is named there now rather than computed. Sweep every value the dial can actually
reach and check the ones the prose singles out.

**A dimension floored to a minimum will exceed the space it is being fitted into.**
`Math.max(20, usable - rows)` and `Math.max(24, usable)` both overran a phone-height
stage, in five different labs across two Big Ideas, every time by the same mechanism:
the floor wins when the space is smaller than the floor. Floor low and **cap by what
is left**. The subtler version is two dimensions defined through each other -- L3B25
capped a dot's radius by the inset and derived the inset from the radius, so a small
inset let the dots overflow the band and a large one let two rows touch. **Settle one
of them from the band alone, then derive the other from it.**

**Encode the arithmetic in the geometry and the picture needs no caption to be
believed.** Three of Big Idea 24's labs make their rule true by construction rather
than asserting it: pipe **width** is capacity, so the eye compares the trunk against
the two streets *stacked*; the burner's two outgoing streams are drawn at one scale
from one total, so they **sum to the inlet by construction** -- which is the whole
contrast with the pipes, and the simulation asserts it in all 896 settings; and the
two cost curves are plotted so that *friction is half the upkeep* is visibly one
curve at half the height of the other. A learner who only looks has still been told.

**Verify a theorem before teaching it.** L3P24 claims the smallest cut equals the
most that can flow. That was checked against an actual max-flow computation over all
**2116 dial settings** before a word of the lesson was written -- and the same sweep
confirmed that all four cuts are the binding one somewhere on the grid, which is
what makes the lab worth moving. Picking the network so that every case is reachable
is a design decision, and it needs a search rather than a guess.

**A formula on the canvas must only use numbers the picture has already shown.**
L3C22 drew a ladder of rungs labelled `n=1` to `n=8` -- numbers, with no energies --
and then printed `13.6 x (1/2² - 1/6²) = 3.022 eV, so 1240/3.022 = 410.3 nm`. Two
constants appeared from nowhere and the difference being taken was invisible,
because the picture never showed either rung's energy. A learner working from the
visual alone had no way in.

The repair was not more words but **putting the subtracted numbers beside the rungs
they belong to**, and then writing the arithmetic as what it actually is:

```
caption        rung n: 13.6 / n2 eV below free
beside rung 6  0.378 eV          beside rung 2  3.400 eV
footer 1       gap = 3.400 - 0.378 = 3.022 eV
footer 2       1240 eV nm / 3.022 eV = 410.3 nm
```

Every number in footer 1 is written beside its own rung; footer 2 divides eV nm by
eV, which **cancels to nm**; and 13.6 is named by the caption and anchored by the
n=1 rung, which reads 13.600 eV. **Prefer the long form that can be followed over
the compact form that cannot** -- a Rydberg-style expression is elegant and it hides
exactly the step the picture was meant to supply.

Removing a label can be the fix: the old gap label beside the arrow duplicated
footer 1's answer, and dropping it brought the stage back under the ten-string
budget, which `check-visual.py` had started flagging.

**A formula line on the canvas must be dimensionally correct, and the naming
exemption is exactly where that goes wrong.** Formula lines are exempt from the
rule below because their symbols name themselves -- which is how L2B22 came to
print `depth = 0.77 mm x 245 us = 189 mm`. The answer was right and the arithmetic
shown was nonsense: millimetres times microseconds cannot be millimetres. The 0.77
was a **rate**, mm per us, with the factor of 2 already folded into it, so printing
it as a plain multiplier was wrong twice over -- the units did not work, and it
**hid the halving the lesson is about**. It now prints two honest steps whose units
cancel:

```
1.54 mm per us x 245 us = 377 mm there and back
half of 377 mm = 189 mm, so 18.9 cm down
```

**A constant with a factor folded into it is a shortcut, not a quantity to put on
screen.** Keep the shortcut in the lesson, where it can be explained, and show the
working on the canvas. `check-visual.py` now checks this: a printed
`A unitX x B unitY = C unitX` with unitY different is flagged unless the first term
is a rate, it is regression-tested against this exact line, and it reports 0 across
the corpus.

**And the halving had to be drawn, not asserted.** The old picture said "the probe
sends and listens, so halve the journey" in a caption and showed one arrow. The new
one draws **two arrows of equal length** side by side, down and back, so the factor
of 2 is visible before any text is read -- the same lesson as L3B21, where the
encoding had to carry the point instead of the captions compensating for it.

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
python3 scripts/check-visual.py              # can the visual be read on its own?
```

**`check-visual.py` was missing from this list** and had fallen out of the routine,
which is how 110 clipped notes and seven overflowing captions survived. A checker
that is not in the list is not run.

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

**The fourth way, and the first that was not about quoting: a conditional whose
else branch was deleted.** Trimming L3P14SampleLab's note cut a bare
`captured ? \`...\`` after its first branch. Braces balanced, every string closed,
and `check-syntax.py` had nothing that knew a `?` needs a `:` -- so tsc answered
"':' expected" and CI went red. It now checks exactly that, on property values
only (`note`, `caption`, `low`, `high`, `display`, `readout`, `label`), skipping
`?.`, `??` and nested conditionals, and reports **0 across 672 files**. The real
failure and four legal shapes are in its `--selftest`.

**`return 'rgb('` was a false positive in two checkers at once.** An apostrophe
opens a string only where a value is expected, and both `check-syntax.py` and
`check-strings.py` tested that with a set of **punctuation** -- `:=(,[{?&|+;<>`.
A value is also expected after a **keyword**, so `return 'rgb('` was read as prose,
and the `(` inside the string then counted as an unclosed bracket. Both now share
the same short keyword list (`return`, `from`, `case`, `typeof`, `new`, ...).

**Widening that list is where it got interesting.** Including `in` and `of` broke
it the other way: the regex matches the tail of a hyphenated name, so
`from './l2p19-will-the-rain-soak-in'` had its **closing** quote read as an opener
and the scanner ran to the newline. So `in`, `of` and `as` are deliberately out,
and a candidate keyword must be preceded by whitespace rather than a hyphen. Both
shapes are pinned in `check-syntax.py --selftest`, and both scanners report **0
across 686 files** -- which is the only calibration that counts, because CI is
green. **A false positive is as damaging as a miss**: it teaches you to commit past
the output, which is how the string family reached CI three times.

**The deeper lesson is about the trim, not the checker.** An automated edit that
deletes trailing text will cut a conditional in half and will orphan the variables
the deleted text used -- `ending`, `maxSize`, `bracket` all became unused, which is
the `noUnusedLocals` class. It also cost three notes their conclusion, because
several put the payload last. **Run `check-unused.py` and `check-syntax.py` after
any scripted edit to a lot of files**, and prefer rewriting by hand where the text
carries a result.

All three quoting failures in this family share one cause: prose was rewritten from
a Python heredoc, where `\n` becomes a real newline and `\"` becomes a bare quote.

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
   your SHA (it reads `deploy: <full sha>`). **A commit that changes nothing under
   `src/` will not move it**, and that is correct: `peaceiris/actions-gh-pages`
   compares the built `dist/` and skips the commit when it is identical, while the
   job still reports success. So a docs-only commit leaves gh-pages naming the last
   commit that changed the site. Expect step 2 to fail for those, and check the
   diff before reading it as a broken deploy.
3. Fetch the site's hashed JS bundle and grep for the strings you added **and
   the ones you removed**. New text being present does not prove old text is
   gone.

**Step 1 is first for a reason: a cancelled publish job is indistinguishable
from a slow one if you only watch gh-pages.** `a584ac1` type-checked, built and
passed its tests, and then the publish job was **cancelled** by GitHub itself --
*the job was not acquired by Runner of type hosted even after multiple
attempts*. From the gh-pages side that looks exactly like a deploy still in
flight, so a watcher polling `git ls-remote` waits forever and reports *pending*.
Nothing was wrong with the code; an empty commit re-triggered it and it went
green. **If gh-pages has not moved, read the job conclusion rather than waiting
longer** -- and note that the API watcher can hit GitHub's rate limit, which also
reads as *pending* and is worth distinguishing before reporting a state.

Every deep link returns HTTP 404 from GitHub Pages — Pages has no SPA rewrite,
so the deploy copies `index.html` to `404.html` and React Router takes over. The
status code is expected; check the body.

## History

The project began from a friend's portfolio codebase and was cut free in
September 2026. Nothing of it remains: the portfolio shell, the Matter.js
kinematics demo and its two permanently-failing test suites all went together,
which is what allowed the test gate to be turned back on.
