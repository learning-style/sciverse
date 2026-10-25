# Parked for the wrong slot

Lessons written and finished, then judged to be in the wrong place -- not above
their level, which is what `docs/level4/` is for, but answering the wrong
question or sitting in the wrong discipline's slot.

They are kept whole rather than deleted, for the same reason as the Level 4
parking: the science is checked, the figures are verified and the layouts are
simulated, so reinstating or re-siting one is a matter of wiring rather than
writing.

They carry a `.parked` suffix so `tsconfig.json` (`include: ["src"]`) cannot
reach them and the checkers do not pair them with a lesson that no longer
exists. That last part matters: while both the old and new `l3b26` files were
present, `check-plainness` reported "1 of 2 lesson(s) scanned" for one id --
two files claiming the same lesson.

## l3b26-why-a-straight-line-ever-worked — a chord through a doubling curve

Written as **L3B26** and moved out on 24 October 2026.

It asked why Dolbear's fitted straight line works for cricket chirp rates at
all, given that chirping is muscle chemistry and chemical rates double every
10 °C rather than adding. The answer is that his line is a **chord** through two
points of a doubling curve, so it is exact at those two points, reads high
between them and low outside, and its midpoint is just the average of its two
ends: 24 and 96 average to 60 where the truth is 48, which is 25% high. The
error depends only on the span between the fitting points and not on where that
span sits -- verified identical at every centre -- so a straight line is worth
about ten degrees. The chord's slope over a 10 °C span is 3.4 chirps per °C
against Dolbear's measured 3, so the doubling rule very nearly produces the
constant Level 2 had to accept on trust.

**Why it moved.** A reader read it and said there was not much biology in it,
and that is right. Strip the lesson down and it is approximation theory: the
convexity of an exponential, with one line of biology as a premise and no
biological consequence anywhere. The P/C/B slots exist so each Big Idea is
answered three times by three disciplines, and a biology slot has to earn its
discipline. It was replaced by `l3b26-the-forecast-a-plant-can-make`, which is
about development on accumulated warmth -- degree-days -- and why a biological
date can be predicted months ahead when the weather cannot.

**What reinstating it would cost.** It is complete and was deployed: 12 nodes,
all reachable, 0 undefined hard words, and its lab simulated over 61,992 dial
combinations with 0 layout failures. The natural home is a mathematics or
measurement Big Idea about approximation and fitted constants rather than a
biology slot. Three questions in `bigIdea26Level3.ts` were written for it and
have since been rewritten, so they would need reverting too -- the git history
for that file is the record.

## l3p27-does-it-all-take-the-same-time — the spread of transit times

Written as **L3P27** and parked on 25 October 2026, before it was ever wired.

It removed a simplification L2P27 had contradicted in its own second half:
`time = length / speed` is the time for a parcel travelling in a block, and L2P27
had just proved the muscle mixes rather than carries, which swaps the front of a
parcel with the back. So 4.2 hours is a **mean**. Modelling the tube as *n*
well-mixed segments -- which is what segmentation is -- a memoryless segment has a
spread equal to its own mean, spreads add through their squares, and the relative
spread is `1/sqrt(n)`. A measured 30% spread gives n about 11. The result that
mattered was the one the set-up did not suggest: at n = 11 the earliest 1% of the
meal still leaves with 3.75 times the cutting time it needs, so the margin
swallows the spread whole -- and it bites only when segmentation **fails**, where
n = 1 loses 10.9% of every meal while the mean transit time is unchanged, so no
measurement of the average would show anything wrong.

**Why it moved.** Nothing is wrong with it. L3B26 was rewritten in the meantime and
now has `sigma x sqrt(n)` as its own centrepiece, so running the same square-root
law as the core of an adjacent Big Idea's Level 3 physics lesson would teach one
idea twice and leave Big Idea 27 without a mechanism of its own. It was replaced by
`l3p27-why-you-can-drink-upside-down`, which explains L2P27's 75-fold speed gap
instead of adding machinery to it.

**What reinstating it would cost.** Complete: 12 nodes, all reachable, and its lab
simulated over 18,200 combinations with 0 layout failures. It was never wired, so
no registry row, assessment question or cross-reference points at it. Its natural
home is a Big Idea about measurement and variation, where the square root would be
the point rather than a borrowed tool.
