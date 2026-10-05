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
