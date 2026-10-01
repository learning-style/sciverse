import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 22, physics. Mechanism + Limit.
 *
 * L2P22 assumed both waves travel in straight lines at one steady speed. Both
 * halves are false, and the falseness is the discovery.
 *
 * Seismic speed rises with depth, so a ray is refracted continuously and curves
 * back towards the surface -- it never travels straight. Testing the straight-line
 * assumption honestly: the S-wave shadow begins at 103 degrees of arc, and simple
 * straight-line geometry turns that into a core radius of 3,966 km. The real core
 * is 3,480 km. The 14% error is not noise; it is the curvature.
 *
 * And the shadow itself is the mechanism. S-waves are shear waves, and a liquid
 * has no shear strength -- it flows instead of springing back -- so an S-wave
 * cannot cross liquid at all. Beyond 103 degrees no S-wave arrives anywhere on
 * Earth. The outer core was discovered not by a wave but by the absence of one.
 *
 * Still standing: this treats the core boundary as one sharp surface and the
 * mantle as smoothly graded. Real Earth has several sharp jumps inside the mantle.
 */
export function getL3P22Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P22 ended with an admission: its formula assumes both waves travel in **straight lines** at **one steady speed**, and both halves are false.\n\nNormally that would be a reason to apologise and move on. Here it is the opposite. **The error in that assumption is how we know what the Earth is made of**, and it is worth seeing exactly how.\n\nStart with the honest test. Measure something with the straight-line method, then compare with the truth.\n\nThere is a famous observation to use. After a large earthquake, **S-waves are recorded everywhere up to about 103 degrees of arc away** -- and then they stop. Beyond 103 degrees, no station on Earth records an S-wave at all. Not a weak one. **None.**\n\nIf you assume straight lines, you can turn that 103 degrees into the size of whatever is blocking them. The geometry is simple: the last ray that gets through is the one that just grazes the obstacle.\n\nDo that, and you get a blocking sphere of radius **3,966 km**.\n\nThe Earth's core really has a radius of **3,480 km**.\n\nSo the straight-line method is out by about **14%** -- 486 km. That is far too big to be measurement error, and far too small to mean the method is useless.\n\nYour two dials:\n\n- **Angle From the Quake**, in degrees of arc around the Earth.\n- **How Fast Speed Rises With Depth**, as a percentage per 1,000 km, which is what bends the rays.\n\nSo: what is a 14% error in one direction telling you?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "That the rays are not straight. If they curve, the ray reaching 103 degrees did not take the straight path, so the obstacle I calculated is the wrong size in a consistent direction.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "That the 103 degree figure must be imprecise, and a better measurement would close the gap.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The 103 degrees is one of the best-determined numbers in geophysics. Thousands of earthquakes, thousands of stations, a century of records. It is not the problem.\n\nAnd there is a test that settles it, which is the useful part. **An imprecise measurement scatters. A wrong model leans.**\n\n- If the 103 degrees were sloppy, repeating the calculation on many earthquakes would give core radii scattered **around** 3,480 km -- some high, some low.\n- What actually happens is that every earthquake gives an answer **too big**, by about the same amount, every time.\n\nA consistent error in one direction is never noise. **It is the shape of a missing piece of physics.**\n\nSo something is making rays arrive further round the Earth than a straight line would allow. And once you look for it, it is not mysterious at all: rock gets **stiffer and denser** with depth, because of the pressure of everything above it. Seismic waves travel **faster** in stiffer rock. Speed rises from about 8 km/s near the top of the mantle to about 13 km/s near its base.\n\nA wave in a medium whose speed changes **bends**. And bending downward-going rays back up means they come out further round than straight lines would ever take them -- which makes the obstacle look bigger than it is.",
            options: [
                { id: 'cont', label: "So why does a speed gradient bend a ray?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Because of something you can see in a swimming pool, and the mechanism needs no new machinery.\n\nTake a wavefront travelling diagonally downward. It is a line, and **its two ends are at different depths**. The deeper end sits in faster rock, so in one second it moves further than the shallower end does.\n\nOne end of a line moving faster than the other **turns the line.** The wavefront swings, and the ray -- always at right angles to the wavefront -- swings with it. There is nothing more to it than that: a difference in speed across the width of a wavefront rotates it.\n\nAnd notice which way. The deep end is faster, so the deep end gets ahead, so the front rotates **upward**. **A downward ray is continuously turned back towards the surface.** It does not go deep and keep going; it bottoms out and climbs.\n\nSo every seismic ray is an arc. The further round the Earth a wave is recorded, the deeper its arc reached:\n\n| Recorded at | The ray bottomed out at about |\n| --- | --- |\n| 20 degrees | 600 km down |\n| 60 degrees | 1,700 km down |\n| 100 degrees | 2,800 km down -- just above the core |\n| beyond 103 degrees | it would have to enter the core |\n\n**The condition:** this assumes the speed rises **smoothly**. Where it jumps suddenly, a ray bends sharply instead of curving, and some of it reflects. The Earth has several such jumps, which is what Level 3 still leaves out.\n\nSo now the real question. At 103 degrees the ray reaches the core. Why does the S-wave not simply carry on through it?",
            options: [
                { id: 'cont', label: "Why does it stop?", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Because an S-wave is a shear wave, and a liquid cannot be sheared.**\n\nThis is the mechanism, and it rests on one distinction.\n\n- A **P-wave** squeezes and stretches: it pushes material closer together, then lets it spring apart. **Anything resists being squeezed** -- solid, liquid, gas. So a P-wave travels through all three.\n- An **S-wave** shoves material **sideways**, across the direction of travel. For that shove to be passed on, the material must **spring back** when pushed sideways. That property is called **shear strength**.\n\n**A liquid has no shear strength.** Push sideways on water and it does not resist and return -- it simply **flows**, and keeps flowing. There is nothing to hand the shake onward with. So an S-wave entering a liquid dies there: nothing **crosses**.\n\nNow put the two facts together:\n\n1. Rays recorded beyond 103 degrees must pass through the core\n2. No S-wave is ever recorded beyond 103 degrees\n3. Therefore **the outer core is liquid**, which is what the missing wave **proved**\n\nThat is how we know, and it is worth pausing on what kind of evidence it is. Nobody detected a signal from the core. **The discovery is an absence** -- a region of the Earth's surface where a wave that should be there never is.\n\n**And the P-waves confirm it from the other side.** They have their own shadow, from 103 to 142 degrees, and then they **reappear** beyond 142. A liquid core explains both at once: P-waves enter the core, slow down sharply -- liquid iron carries them at about 8 km/s against 13.7 km/s in the rock just above -- and that sudden slowing bends them hard, throwing them past 142 degrees and leaving a ring with nothing in it.\n\nSo the same boundary makes S-waves vanish permanently and P-waves vanish and come back. Two different shadows, one liquid core.",
            options: [
                { id: 'try', label: "Let me test that.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Inside the liquid outer core there is a **solid inner core**. Suppose you wanted to prove it is solid.\n\nWhat would you look for?",
            options: [
                { id: 'right', label: "S-waves that have crossed the inner core — or any sign that a shear wave travelled through it, since only a solid can carry one.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'wrong', label: "P-waves arriving from the centre of the Earth, since P-waves prove a solid.", nextNodeId: 'math_wrong' },
                { id: 'wrong2', label: "A second S-wave shadow further round than 103 degrees.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**P-waves prove nothing about solidity**, and that is the crux of this lesson. A P-wave travels through solid, liquid **and** gas, because everything resists being squeezed. Finding a P-wave tells you something is there, not what state it is in. **Only the S-wave can tell solid from liquid**, because only a solid has shear strength.\n\n**A second shadow** has it backwards. A shadow is where waves are **missing**, and missing is what liquid does. A solid inner core should let shear waves **through** -- so the evidence for it is an arrival, not an absence.\n\nSo: look for a **shear wave that crossed the inner core.**\n\nAnd this is genuinely how it was settled, though it took until the 1970s and it is delicate. A P-wave entering the inner core can convert into an S-wave at the boundary, cross as a shear wave, and convert back on the way out. Those arrivals -- called **PKJKP** -- are faint and hard to extract from noise, and finding them is strong evidence the inner core is solid.\n\nWhich is a pleasing symmetry worth naming. **The outer core was found by a shear wave that could not get through. The inner core was found by a shear wave that could.** Same instrument, same property, opposite sign.",
            options: [
                { id: 'retry', label: "Only a shear wave distinguishes solid from liquid.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Angle From the Quake** moves the receiving station round the Earth; **How Fast Speed Rises With Depth** controls how hard the rays curve.\n\n| Angle | P-wave | S-wave | What the ray did |\n| --- | --- | --- | --- |\n| 40 degrees | arrives | arrives | **stayed** in the mantle, curving |\n| 100 degrees | arrives | arrives | grazed the core, barely |\n| **110 degrees** | **shadow** | **shadow** | entered the core |\n| 130 degrees | **shadow** | **shadow** | entered the core |\n| 150 degrees | arrives | **shadow** | refracted through liquid iron |\n| 180 degrees | arrives | **shadow** | straight through the middle |\n\nRead the two shadow columns against each other. **The P-wave shadow closes and the S-wave shadow never does.** One boundary, two different behaviours, and together they pin down both the size of the core and the fact that it is liquid.\n\nNow turn the second dial, because it shows how much the straight-line answer was costing.\n\n| Speed rise with depth | Rays | Straight-line estimate of the core |\n| --- | --- | --- |\n| none | straight | 3,480 km -- correct, but then no shadow pattern fits |\n| gentle | slightly curved | about 3,700 km |\n| **real Earth** | strongly curved | **3,966 km -- 14% too big** |\n\nSo the 14% error is not a flaw to be apologised for. **It is a measurement of the speed gradient.** Run the comparison backwards -- how much curvature is needed to make 103 degrees correspond to a 3,480 km core? -- and you have measured how the stiffness of rock rises with depth, thousands of kilometres beneath anything anyone will ever drill.\n\n**That is the shape worth taking from this lesson.** L2P22 made an assumption to get a number. Level 3 does not throw the assumption away; it measures **how wrong it is**, and the error turns out to carry information the original method could not reach.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The error carries the information. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A student says: *the S-wave shadow proves there is a hole in the middle of the Earth, because nothing gets through.*\n\nWhat is wrong, and what does the shadow actually prove?",
            options: [
                { id: 'right', label: "P-waves do get through — they reappear beyond 142 degrees, so the core is full of something. Only shear waves are stopped, and that means liquid, not empty.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing is wrong: no S-waves arrive beyond 103 degrees, so nothing is transmitting them, which means there is nothing there.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The observation is right and the conclusion uses only half the evidence -- which is the commonest way a sound argument goes wrong.\n\n**The other half: P-waves do get through.** They have a shadow from 103 to 142 degrees and then they **come back**, recorded all the way round to 180 degrees, on the far side of the planet. Something is carrying them.\n\nA hole would stop **both**. What we see stops **only the shear wave**, and that is a much more specific finding:\n\n| | Through a vacuum | Through a liquid | What we observe |\n| --- | --- | --- | --- |\n| **P-wave** | blocked | passes, slowed | passes, slowed ✓ |\n| **S-wave** | blocked | blocked | blocked ✓ |\n\nOnly the middle column matches both rows. **The core is liquid**, not empty -- and the P-wave arrival times say it is dense, which is how we know it is mostly iron.\n\nThe habit worth taking is to ask what else your explanation would predict. *A hole* predicts no P-waves either. One look at a far-side seismogram kills it. **An explanation that accounts for your evidence is not enough; it also has to fail to predict things that do not happen.**",
            options: [
                { id: 'retry', label: "A hole would stop both. Only liquid stops just the shear wave.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. P-waves reappear beyond 142 degrees and are recorded all the way to 180, so the core is **full of something**. A hole would stop both waves; a liquid stops only the shear wave -- which is precisely what we see.\n\nAnd the P-wave travel times say that something is **dense**, which is how we know it is mostly iron.\n\nThe habit: **an explanation must also fail to predict things that do not happen.** *A hole* predicts no far-side P-waves, and one seismogram kills it.\n\nSo this is what Level 3 has done to L2P22:\n\n| | L2P22 assumed | L3P22 says |\n| --- | --- | --- |\n| The path | a straight line | an **arc**, because deep rock is faster |\n| Why it bends | -- | one end of the wavefront outruns the other |\n| The cost of assuming | unknown | **3,966 km against 3,480 -- 14% too big** |\n| And that error | an embarrassment | a **measurement of the speed gradient** |\n| Beyond 103 degrees | not mentioned | **no S-wave anywhere**: the outer core is **liquid** |\n| Why | -- | a liquid has **no shear strength** -- it flows instead of springing back |\n| The P-wave shadow | -- | 103 to 142 degrees, then it **returns** |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The absence was the evidence!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned a broken assumption into a measurement.**\n\n- L2P22 assumed **straight lines at one steady speed**. Rock gets stiffer and denser with depth, so speed rises from about **8 to 13 km/s** through the mantle\n- A wavefront travelling diagonally has its **deep end in faster rock**, so that end outruns the other and **rotates the front upward**. Every ray is an **arc** that bottoms out and climbs\n- Which means the further round a wave is recorded, the **deeper** its arc reached -- 100 degrees bottoms out just above the core\n- **Testing the assumption honestly:** straight-line geometry turns the 103 degree S-wave shadow into a core of **3,966 km**. The real core is **3,480 km**, so the method is **14% out**\n- And a **consistent** error in one direction is never noise -- **an imprecise measurement scatters, a wrong model leans**\n- So the error is not a flaw but a **measurement of the speed gradient**, thousands of kilometres below anything drillable\n- **Beyond 103 degrees no S-wave is recorded anywhere on Earth**, because an S-wave shears the material sideways and **a liquid has no shear strength** -- it flows instead of springing back\n- A P-wave squeezes instead, and **everything resists being squeezed**, so P-waves cross liquid and only tell you something is there\n- Therefore **the outer core is liquid**, discovered by the **absence** of a wave rather than the arrival of one\n- The P-wave shadow runs **103 to 142 degrees** and then **reappears**, because liquid iron carries P-waves at about 8 km/s against 13.7 just above, and that sudden slowing bends them hard\n- A **hole** would stop both, so the two shadows together prove liquid rather than empty -- **an explanation must fail to predict what does not happen**\n- And the solid **inner** core was found the opposite way: by a shear wave that **did** get through\n- Removed: L2P22's straight line, and the pretence that its speeds were constant\n- Still standing: this treats the core boundary as one sharp surface and the mantle as **smoothly graded**. The real mantle has several abrupt jumps, each with its own reflections, which is what seismic tomography is built on",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "An imprecise measurement scatters; a wrong model leans!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Waves Help Us See the Invisible?**\n\n**Summary Table:**\n| Idea | The Physics | The Number |\n| --- | --- | --- |\n| Speed rises with depth | stiffer, denser rock under pressure | about **8 to 13 km/s** |\n| So rays **curve** | the deep end of a wavefront outruns the shallow end | every ray is an arc |\n| Deeper arc, further round | 100 degrees bottoms out just above the core | about **2,800 km** down |\n| Straight lines from the 103 degree shadow | give the wrong core | **3,966 km** against **3,480** |\n| That error | **leans**, so it is a model fault | **14%**, and it measures the gradient |\n| No S-wave beyond 103 degrees | a liquid has **no shear strength** | the outer core is **liquid** |\n| P-waves cross it | everything resists **squeezing** | shadow **103 to 142**, then back |\n| A hole would stop both | so liquid, not empty | and dense, so iron |\n| The inner core | a shear wave that **did** cross | solid |\n| Still standing | one sharp boundary, a smooth mantle | the real mantle jumps |\n\n**The one line to remember:** L2P22's straight line was wrong by 14%, and because the error leaned the same way every time it was not noise but physics -- the curvature of rays in rock that stiffens with depth, which is also why a wave recorded further round the Earth has looked deeper inside it.\n\n**Up next:** C22 does the same thing to a different borrowed number. L2C22 looked hydrogen's wavelengths up in a table. Level 3 calculates them."
        }
    };
}
