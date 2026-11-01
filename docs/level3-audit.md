# Level 3: what is actually on a high school syllabus

Written November 2026, after a reader said: *"L3B is outright med school stuff. Do
high schoolers need to know or care about competing muscle vs heart blood flow? The
question is no longer relevant."*

They were right, and this is the audit behind that judgement.

## The test used

Not "does this feel hard?" but **can you name the high school course and unit where it
is taught?** The named anchors are the published specifications textbooks are written
to: NGSS high school performance expectations, the AP Biology / Chemistry / Physics 1
and 2 course frameworks, and A-level (AQA/OCR) specifications. A lesson that maps to
none of them is out of scope however good it is.

Three verdicts:

| | |
|---|---|
| **CORE** | squarely inside a named general-science course |
| **EDGE** | in an option, an extension, or a specialist course (PE, Earth Science, Engineering, Geography) |
| **BEYOND** | undergraduate |

## The count

**80 Level 3 lessons: roughly 38 CORE, 25 EDGE, 17 BEYOND.** The BEYOND list is not
evenly spread, and that is the finding that matters.

### BEYOND -- undergraduate material

| | | why it is beyond |
|---|---|---|
| l3b4 | Weber steps into a logarithm | Weber-Fechner is psychophysics, taught in no HS science |
| l3b7 | Nernst equilibrium potential | A-level Bio has resting potential qualitatively; the equation is undergraduate |
| l3b15 | searching vs handling time | Holling's functional response is undergraduate ecology |
| l3b16 | magnetite, cryptochrome, radical pairs | current research biology |
| l3b21 | ATP/ADP pool amplification | undergraduate biochemistry |
| l3b23 | the inradius of a wound | the geometry is HS; the application is surgical |
| l3b24 | Murray's law, r³ | undergraduate biomechanics |
| l3b25 | gene network branching ratio | undergraduate systems biology |
| l3b28 | regional blood flow redistribution | undergraduate physiology |
| l3p17 | Euler buckling | engineering, not HS physics |
| l3p23 | Griffith fracture | materials engineering |
| l3p24 | max-flow min-cut | discrete mathematics / CS |
| l3p25 | the logistic map and chaos | undergraduate dynamics |
| l3p28 | cardiac filling time and the output optimum | undergraduate physiology |
| l3c18 | C = aQ^b dilution exponent | specialist hydrology |
| l3c20 | Abbe number, electron on a spring | undergraduate optics |
| l3c21 | the Revelle factor | undergraduate oceanography |

**Nine of the seventeen are biology.** That is not an accident.

## Why the biology slot drifted furthest

Level 3's verb is **Model**. For physics and chemistry a high school course supplies
plenty to model with -- kinematics, equilibrium constants, stoichiometry, circuits,
optics. **High school biology is largely qualitative.** Its genuinely quantitative
corners are a short list:

- Hardy-Weinberg and allele frequencies
- chi-squared on genetic crosses
- mitotic index
- water potential and osmosis
- rate of reaction / enzyme kinetics at the level of initial rates
- logistic population growth
- surface area to volume

That is about seven topics against twenty-eight Big Ideas. So **every attempt to give
the B slot a Level 3 "model" walked off the end of the syllabus** -- into physiology,
biophysics, or research ecology. The recent work to make L3B *more biological* treated
the symptom: those lessons are now full of real structures, and still beyond a high
school course.

## What Level 3 biology should be instead

Depth that is not arithmetic, which CLAUDE.md already names as the better kind:

| | |
|---|---|
| **Mechanism** | how the Level 2 rule is actually brought about, at a scale the syllabus teaches -- l3b11's clonal selection, l3b27's brush border, l3b14's genetic code all qualify and all are CORE |
| **Evidence** | what experiment settled it, what the controls were, what the data actually show. This is on every HS biology syllabus as a skill and is almost absent from the corpus |
| **Quantity** | only where the syllabus genuinely is: the seven topics above |

The three CORE biology lessons that already work -- **l3b11, l3b14, l3b27** -- are all
Mechanism, and none of them needed new mathematics.

## The second problem: the Big Idea question stops being asked

A reader also said the question itself becomes irrelevant by Level 3. Big Idea 28 asks
*How Do Body Systems Work Together?* Level 1 answers it with a relay team. Level 3
answers it with an optimal heart rate, an osmotic pressure calculation, and a perfusion
table. Those are answers to questions a learner never asked.

**The rule this suggests:** a Level 3 lesson has to be recognisable as a deeper answer
to the Big Idea's own question, not as a new question that happens to live in the same
organ. Worth checking by reading the Big Idea title and the Level 3 `complete` node
together and asking whether the second obviously answers the first.

## Not yet decided

Whether each BEYOND lesson is **rewritten** at syllabus level, **parked** in
`docs/level4/`, or whether the Big Idea needs a different Level 3 question entirely.
Several Big Ideas may simply not support a Level 3 in all three disciplines.
