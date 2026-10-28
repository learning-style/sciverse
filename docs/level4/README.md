# Parked for Level 4

Lessons written and finished, then judged to sit above the level they were built
for. They are kept whole rather than deleted: the science is checked, the figures
are verified and the layouts are simulated, so reinstating one is a matter of
wiring rather than writing.

They carry a `.parked` suffix so `tsconfig.json` (`include: ["src"]`) cannot reach
them and the checkers do not pair them with a lesson that no longer exists.

## p23-stress-concentration — stress concentration at a flaw

Written as **L2P23** and moved out on 5 October 2026.

**Why it moved.** It is engineering-level for grades 6-8. It asks a twelve-year-old
to work with a stress concentration factor, and a second problem came with it: P23
(Level 1) opens with *"why do bridges fail after many small loads?"* and mentions
fatigue five times, and this lesson mentioned fatigue **zero** times. It answered
the concentration half of Level 1's question and skipped the repeated-loads half,
which is the half a learner has actually seen happen. L2P23 is now a fatigue
lesson, which is what Level 1 asked for.

**What it contains.** A flaw does not weaken a plate by removing metal; it
multiplies the stress, and the multiplier depends only on the flaw's shape:

```
stress at the notch = K x (force / area),    K = 1 + 2a/b
```

with `a` across the pull and `b` along it, so a round hole has `a = b` and `K = 3`
whatever its size. A 50 kN pull on 500 mm2 is a safe 100 N/mm2 on average and 300
at a round hole, against steel's 250 -- so it fails at 40% of the steel's strength,
and reshaping the hole to an oval twice as long as wide gives `K = 2` and it holds.
It ends by pushing its own formula until it predicts that any scratch breaks
anything, which is the handover L3P23 was built on.

**If it is reinstated.** L3P23 now introduces `K` itself, in its `defining` node,
because it needs the formula in order to demolish it. Reinstating this lesson means
taking that introduction back out of L3P23 so the two do not say it twice, and
restoring the four physics questions in `bigIdea23Level2.ts` from the history of
that file.

The lab is `P23NotchLab.tsx.parked`: a plate under tension with the notch drawn at
its real a/b, load lines bunching beside it, and both lengths measured on the notch
with ticks and named with their own arrow glyph.

## l3b27-the-job-the-length-cannot-do — two currencies, time and contact

Written as **L3B27** and moved out on 26 October 2026.

A free enzyme is paid in **time** and a fixed one in **contact**, so L2B27's margin
of 8.6 was a complete answer to 97% of the question -- every term in it was about
time or about the fluid, and none of it mentioned the wall. Contact is bought by
squeezes: `contacts = (length / speed) x rate` is about **2,500 presses** per
mouthful. The two dials then separate cleanly, because length buys both while the
contraction rate buys contacts and leaves the margin exactly where it was -- so
weak contractions halve the presses while every number a stopwatch can reach stays
normal. It closes on a reversal: L3P27's seventy-four non-travelling contractions
in every seventy-five look like a gut at 1.3% efficiency, and they *are* the
presses.

**Why it moved.** A reader reviewing the Level 3 biology lessons said they were
too mathematical and that biology students would be lost. Measuring it showed the
complaint was righter than it sounded: L3B is not more arithmetic-dense than L3P
(194 digits per 1,000 words against 211), but it is nearly **empty of biology** --
nineteen of twenty-seven L3B lessons carried fewer than five structural or
functional biology words per thousand, and four carried none at all. This lesson's
own structural content was adequate at 11.4 per thousand; its problem was that it
printed **eleven formulas** and said "2,500" sixteen times. The argument is a good
one and it is an argument about quantities, which makes it Level 4 material rather
than the closing biology lesson of a Level 3 Big Idea.

**What reinstating it would cost.** Complete and deployed: 12 nodes, all reachable,
0 undefined hard words, and its lab simulated over 163,020 dial combinations with 0
layout failures. Its replacement keeps the same closing insight -- that the
squeezing which transports nothing is what presses food against the wall -- and
reaches it through structure instead of arithmetic, so the Level 3 assessment's
biology questions needed only light rewording rather than replacement.

## l3b11-memory-race.ts, L3B11RaceLab.tsx

Parked October 2026, replaced by `l3b11-the-shape-you-already-had.ts` and
`L3B11ReceptorLab.tsx`. Big Idea 11's closing biology lesson was built on
`doublings = log (target / start) / log 2` -- memory cells at 1,250 against a germ at
100, 120 hours against 52 -- and its lab plotted two exponential curves against hours.
It measured **zero** structural biology words in `check-biology.py`, and nothing in the
picture was a cell.

The replacement keeps the head start, which is the old lesson's real insight, and
reaches it through **clonal selection** instead: a lymphocyte carries thousands of
copies of one **receptor** shape, the body builds millions of those shapes at random in
the bone marrow *before* meeting any germ, and the germ's role is to **pick** rather
than to teach. So a vaccine teaches nothing -- it runs the selection early and grows a
clone of a shape that was always yours. The two failure modes then fall out
structurally: lose the race, or **antigenic drift**, where the memory cells are
perfectly healthy and the stored shape is out of date.

Reinstating the parked version would cost the structural account of what a receptor
is, and would put the arithmetic back in a slot whose verb is Model rather than
Calculate. The logs are genuinely Level 4 material: the lesson they belong in is one
about measuring exponential growth, not one about immunity.

## l3b16-trusting-the-sharper-cue.ts, L3B16WeightLab.tsx

Parked October 2026, replaced by `l3b16-the-compass-that-cannot-say-north.ts` and
`L3B16HeadLab.tsx`. Big Idea 16's closing biology lesson was a weighted average --
`combined error = sqrt((share1 x error1)² + (share2 x error2)²)`, searched across splits
to find a lowest point at 94/6, which is (20/5)² = 16 to 1. The reasoning was sound and
the search was a good device, but the lesson measured **zero** structural biology words,
and its lab plotted an error curve against a share of a vote.

The replacement removes a better simplification, one L2B16 named without noticing: it
treated **the magnetic sense** as a single black box returning a bearing. There is no
needle in a bird. There are two candidate structures -- **magnetite** crystals feeling a
**torque**, and **cryptochrome** in the **retina** forming a **radical pair** whose yield
the field alters -- and *neither can report north*, because a torque and an angle both
fail to distinguish a thing from its opposite. So what a bird has is an **inclination**
compass that names poleward and equatorward, which is what the cage experiment shows and
what fails at the magnetic equator. L2B16's bias problem is then solved by
**calibration** against the still point the night sky turns about, not by averaging --
which reverses L2B16's conclusion while keeping every number in it.

Reinstating the parked version would cost all of that, and would put a search over a
formula back into the slot that closes the Big Idea. The weighting argument is genuinely
Level 4 material: it belongs in a lesson about combining measurements, not in one about
how an animal senses a field.

## l3b15-cycle-length.ts, L3B15CycleLab.tsx

Parked October 2026, replaced by `l3b15-the-ceiling-a-body-sets.ts` and
`L3B15TimeLab.tsx`. A reader reviewing it said the formulas were beyond Level 3 and
that the gloss on `c` -- *how much of a new lynx a caught hare pays for* -- meant
nothing. Both were right.

It was Lotka-Volterra: `change in hares = rN - aNP`, `change in lynx = caNP - mP`, four
fitted rates, equilibria at `P* = r/a` and `N* = m/(ca)`, and a cycle period of
`2 pi / sqrt(r m)` giving 10.5 years against the real record's ten. The period is the
part that cannot stay. Deriving the frequency of small oscillations about a
Lotka-Volterra fixed point needs the eigenvalues of a Jacobian, which is undergraduate
dynamical systems -- so a grades 9-12 learner could only **accept** it, which is the
recipe CLAUDE.md's second test exists to catch. And `c` is a conversion efficiency,
a quantity with no everyday handle at all: 0.02 of a lynx per hare, or 50 hares per
lynx, is a ratio of two things that are not the same kind of thing. It measured **1**
structural word and **23** printed formulas, the worst pair in the L3B slot.

The replacement removes exactly what L2B15 named -- *each lynx catches 30, whatever
else changes* -- with a **time budget** rather than a differential equation. A lynx's
year goes into **searching**, which the wood controls and which halves whenever the
hares double, or **handling**, which is anatomy: the jaw, the claws, the meal, the
**gut**. So the catch saturates at `365 / handling days`, and L2B15's 30 turns out to be
10 days plus 2, worked out in a wood of exactly 1,000 hares.

The payoff is the Big Idea's own question. A pendulum pushed further gets a **bigger**
push back and a reaction pushed from balance does too; a wood pushed up gets a
**smaller** one, because the predators are running out of hours. So the balance point is
a **ridge**, not a valley -- 840 born against 798 taken at 1,400 hares, 480 against 503
at 800 -- and *systems find balance* turns out to carry a condition nobody had stated.

Reinstating the parked version would put an un-derivable period back into the slot that
closes the Big Idea. The Lotka-Volterra model is genuinely Level 4: it belongs in a
lesson that can afford linearisation, where the period is derived rather than handed
over.
