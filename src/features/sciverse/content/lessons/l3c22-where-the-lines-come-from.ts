import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 22, chemistry. Mechanism.
 *
 * L2C22 computed a line's energy from its wavelength and then looked the element
 * up in a table. The wavelengths themselves were given. This calculates them.
 *
 * A hydrogen electron's allowed energies are
 *
 *   E(n) = -13.6 / n^2  eV
 *
 * so a drop from n2 to n1 releases the difference, and E = 1240/lambda turns that
 * into a wavelength. n = 3 -> 2 gives 1.8889 eV and 656.47 nm, against a measured
 * 656.3 -- 0.03% out. All four visible hydrogen lines come out to within 0.04%.
 *
 * Two things fall out that L2C22 could not reach. The Balmer series (n1 = 2) is
 * the ONLY hydrogen series in visible light -- Lyman (n1 = 1) is ultraviolet and
 * Paschen (n1 = 3) infrared -- so we see hydrogen's fingerprint at all because of
 * where n1 = 2 happens to land. And the series crowds towards a limit at 364.7 nm
 * rather than spreading out, because 1/n^2 converges.
 *
 * Still standing: this works for hydrogen, which has one electron. Sodium's
 * 2.105 eV fits no integer pair -- the closest is 1.889 eV, out by 0.216 -- because
 * eleven electrons screen one another. The minus sign and the 13.6 are also taken
 * as given here; where they come from is beyond this level.
 */
export function getL3C22Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C22 gave you a real method and one borrowed ingredient.\n\nThe method was sound: **E = 1240 / wavelength** turns a line's position into the energy of an electron jump. Hydrogen's red line at 656.3 nm is a jump of **1.889 eV**. That part you can do.\n\nThe borrowed ingredient was the table. **Where did 656.3 nm come from?** You looked it up. So the identification worked, and it rested on somebody else having measured hydrogen first -- which means you could recognise hydrogen and could not have predicted it.\n\nAnd there is something odd in that table nobody mentioned. Hydrogen's four visible lines sit at **656.3, 486.1, 434.0 and 410.2 nm**. Look at the spacing:\n\n- 656.3 to 486.1 is **170 nm**\n- 486.1 to 434.0 is **52 nm**\n- 434.0 to 410.2 is **24 nm**\n\nThe gaps are **shrinking fast**. The lines are crowding together towards the blue end, not spreading evenly. Something is converging.\n\nA random set of numbers does not do that. A simple rule does.\n\nYour two dials are the two numbers that rule turns out to need.\n\n- **Upper Level**, the level the electron falls **from**.\n- **Lower Level**, the level it falls **to**.\n\nSo: if the gaps between the lines shrink towards a limit, what should the energy levels inside the atom be doing?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Crowding together too. If the levels bunch up as they go higher, the jumps between them get more and more similar, so the lines pile towards a limit.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Spreading out evenly, with the lines crowding for some separate reason.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Evenly spaced levels are worth testing, because they predict something you can check in one line.\n\nIf the levels were a ladder with equal rungs, then every jump of one rung would release the **same** energy, and every jump of two rungs the same as every other two-rung jump. You would see a few lines, each repeated, **evenly spaced in energy**.\n\nHydrogen's lines are not evenly spaced and they do not repeat. They **crowd**. So the rungs are not equal.\n\nNow run it the other way. The lines crowd towards the blue -- towards **higher** energy. Blue lines come from the **biggest** jumps, which are drops from the **highest** levels. So the jumps from n = 6, 7, 8 and upward are all nearly the same size.\n\nTwo jumps can only be nearly the same size if the levels they start from are nearly the same height. **So the high levels must be bunched tightly together.**\n\nAnd they must be bunching towards something, because the crowding does not stop -- there are hydrogen lines at 397, 389, 384 nm, packing ever closer, and then they simply **end** at about 364.7 nm. The series has a **limit**.\n\nA ladder whose rungs crowd towards a ceiling. That is the shape, and now you need the rule that gives it.",
            options: [
                { id: 'cont', label: "What is the rule?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**E(n) = -13.6 / n² electronvolts**\n\nwhere **n** is a whole number -- 1, 2, 3 and upward -- labelling the allowed levels. That is the whole rule.\n\nThree things to read off it before using it.\n\n**The minus sign** means the electron is **bound** -- to leave, it must **climb** to zero. Zero energy is an electron that has escaped the atom entirely, so every bound level is below zero, and the deepest level is the most negative.\n\n**The 1/n²** is what makes the levels crowd. Look at them:\n\n| n | E(n) |\n| --- | --- |\n| 1 | **-13.600 eV** |\n| 2 | **-3.400 eV** |\n| 3 | -1.511 eV |\n| 4 | -0.850 eV |\n| 5 | -0.544 eV |\n| 6 | -0.378 eV |\n\nThe first step is 10.2 eV. The step from 5 to 6 is 0.17 eV -- sixty times smaller. The rungs crowd towards **zero**, exactly as the lines demanded.\n\n**The 13.6 eV** is the energy needed to tear the electron off hydrogen altogether, from n = 1 to free. **The condition:** this is for hydrogen -- **one** electron around **one** proton. Both the minus sign and the 13.6 are taken as given here; deriving them needs quantum mechanics.\n\nNow the method. An electron dropping from an upper level **n₂** to a lower one **n₁** releases the difference:\n\n**gap = E(n₂) - E(n₁) = 13.6 x (1/n₁² - 1/n₂²) eV**\n\nand L2C22's formula turns that into a wavelength: **λ = 1240 / gap**.\n\nTwo steps, both arithmetic. No table.",
            options: [
                { id: 'cont', label: "Try it on the red line.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Predict hydrogen's red line: an electron falling from n = 3 to n = 2.**\n\n1. **The two levels:** E(3) = -13.6/9 = **-1.511 eV**, E(2) = -13.6/4 = **-3.400 eV**\n2. **The gap:** -1.511 - (-3.400) = **1.8889 eV**\n3. **Or straight from the formula:** 13.6 x (1/4 - 1/9) = 13.6 x 0.138889 = **1.8889 eV**\n4. **The wavelength:** 1240 / 1.8889 = **656.5 nm**\n\nThe measured line is at **656.3 nm**. We are **0.03%** out -- which is the rounding in 1240 and 13.6, not a disagreement.\n\n**Look at what just happened.** L2C22 took 656.3 nm from a table and *read off* 1.889 eV. Level 3 started from the structure of the atom and **produced** 1.8889 eV, and the wavelength with it. The same number, derived instead of received.\n\nAnd it is not one lucky fit. Run the whole series down from n = 2:\n\n| Jump | Gap | Predicted | Measured | Out by |\n| --- | --- | --- | --- | --- |\n| 3 → 2 | 1.8889 eV | **656.5 nm** | 656.3 | 0.03% |\n| 4 → 2 | 2.5500 eV | **486.3 nm** | 486.1 | 0.04% |\n| 5 → 2 | 2.8560 eV | **434.2 nm** | 434.0 | 0.04% |\n| 6 → 2 | 3.0222 eV | **410.3 nm** | 410.2 | 0.02% |\n\nFour lines, four predictions, all inside **0.04%**. The whole table L2C22 handed you comes out of one formula with one whole number changing.\n\nThese four are called the **Balmer series** -- every jump that **ends** at n = 2. And now you can see where the crowding comes from. As n₂ climbs, 1/n₂² shrinks towards nothing, so the gap creeps towards 13.6 x 1/4 = **3.40 eV** and no further. That ceiling is the **series limit**, at 1240 / 3.40 = **364.7 nm** -- exactly where the lines stop.",
            options: [
                { id: 'try', label: "Let me predict one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** An electron falls from **n = 2 to n = 1** in hydrogen.\n\nWhat is the gap, and where is the line?",
            options: [
                { id: 'right', label: "10.2 eV, from 13.6 × (1/1 − 1/4), which puts the line at about 122 nm — far into the ultraviolet, invisible.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'wrong', label: "About 1.9 eV and 656 nm, the same as 3 → 2, since it is also a one-level drop.", nextNodeId: 'math_wrong' },
                { id: 'wrong2', label: "13.6 eV and 91 nm, because dropping to n = 1 releases the full binding energy.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**\"Also a one-level drop\"** is the trap the 1/n² is built to break. The rungs are **not** equally spaced, so a one-rung drop near the bottom is nothing like a one-rung drop higher up. 3 → 2 releases 1.89 eV; 2 → 1 releases **10.2 eV**, more than five times as much, because the gap between the two lowest levels is by far the biggest in the atom.\n\n**13.6 eV** is the drop from **free** to n = 1, not from n = 2. An electron at n = 2 has already got most of the way out: it sits at -3.4 eV, so only 3.4 eV is left to free it, and falling to n = 1 releases 13.6 - 3.4 = **10.2 eV**.\n\n**13.6 x (1/1 - 1/4) = 13.6 x 0.75 = 10.2 eV**, and 1240 / 10.2 = **121.6 nm.**\n\nThat is deep **ultraviolet** -- about five times the energy of a visible photon, and completely invisible. These jumps, all ending at n = 1, are the **Lyman series**.\n\nAnd here is the thing worth carrying away, because it reframes everything L2C22 did. Hydrogen's series land in three different places:\n\n| Series | Ends at | Longest line | Where it lives |\n| --- | --- | --- | --- |\n| **Lyman** | n = 1 | 121.6 nm | **ultraviolet** -- invisible |\n| **Balmer** | n = 2 | 656.5 nm | **visible** |\n| **Paschen** | n = 3 | 1,875 nm | **infrared** -- invisible |\n\n**Only the Balmer series is visible.** The fingerprint L2C22 matched by eye is one series out of infinitely many, and we can see it because n₁ = 2 happens to put its jumps between 1.8 and 3.4 eV. Shift the 13.6 slightly and hydrogen would have no visible lines at all.\n\nSo \"every element has a visible fingerprint\" was never a law. **It is a coincidence about where the numbers fall** -- and the instruments that read the invisible parts of the spectrum are reading the rest of the same ladder.",
            options: [
                { id: 'retry', label: "The rungs are not equal, and only Balmer is visible.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Upper Level** and **Lower Level** -- pick any two and the line follows.\n\n| From | To | Gap | Wavelength | Series |\n| --- | --- | --- | --- | --- |\n| 2 | 1 | 10.200 eV | **121.6 nm** | Lyman, ultraviolet |\n| 3 | 1 | 12.089 eV | **102.6 nm** | Lyman |\n| 3 | 2 | 1.8889 eV | **656.5 nm** | Balmer, visible |\n| 4 | 2 | 2.5500 eV | **486.3 nm** | Balmer |\n| 6 | 2 | 3.0222 eV | **410.3 nm** | Balmer |\n| 4 | 3 | 0.6611 eV | **1,876 nm** | Paschen, infrared |\n\n**Choose** the lower level and you have chosen a **series** -- a whole family of lines sharing a destination. Set the upper level and you have chosen **which line** in it.\n\n**And now the honest part, which matters as much as the formula.** Try to fit sodium.\n\nL2C22 measured sodium's yellow at **2.105 eV**. Hunt through every pair of whole numbers and the closest hydrogen gap is 3 → 2 at **1.889 eV** -- out by **0.216 eV**, which is a hundred times worse than the 0.03% this formula manages on hydrogen. **No pair of integers fits sodium at all.**\n\nThat is not a rounding problem. **The formula is for hydrogen only**, and the reason is structural: it assumes **one** electron feeling the bare pull of the nucleus. Sodium has **eleven**. Each one partly shields the others from the nucleus, so the pull an outer electron feels is neither 1 proton's nor 11 but something in between, and it differs for every level. The clean 1/n² is gone.\n\nSo L2C22's table was two different things pretending to be one. **Hydrogen's lines are calculable. Sodium's are measured.** The method of identification works the same either way -- which is lucky, because most of the periodic table is in the second category.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Calculable for hydrogen, measured for the rest. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A distant galaxy's spectrum shows hydrogen lines, but they sit at **666.1, 493.4 and 440.5 nm** instead of 656.3, 486.1 and 434.0.\n\nIs this hydrogen? And what has happened?",
            options: [
                { id: 'right', label: "It is hydrogen. Every line is stretched by the same factor — about 1.0150 — so the pattern is intact and only the scale has changed. That is a redshift from the galaxy moving away.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It cannot be hydrogen, because hydrogen's lines are fixed by its energy levels and these are in the wrong places.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The energy levels **are** fixed -- that part is right, and it is exactly what lets you solve this. Check the ratios instead of the positions.\n\n- 666.1 / 656.3 = **1.0149**\n- 493.4 / 486.1 = **1.0150**\n- 440.5 / 434.0 = **1.0150**\n\n**Every line is stretched by the same factor.** That cannot be chemistry. A different element would give a different **pattern** -- different gaps, different spacings -- not the same pattern uniformly rescaled. Three independent lines agreeing to four figures on one stretch factor is not coincidence.\n\nSo the atom is hydrogen and something happened to the light on the way: the galaxy is receding, and the waves arrive stretched. The factor gives the speed -- 1.5% of the speed of light, about **4,500 km/s**.\n\nAnd notice the division of labour, because it is the whole method of astronomy. **The pattern identifies the element; the stretch measures the motion.** One spectrum, two completely different facts, separated by asking what is *shared* across the lines and what *differs* between them.\n\nThis is the same discipline as L2C22's rule that position is the atom and brightness is the conditions -- and the same as L3P22's lean, where an error repeating identically across many measurements was physics rather than noise. **When several measurements go wrong by the same factor, the factor is the discovery.**",
            options: [
                { id: 'retry', label: "The pattern identifies the element; the stretch measures the motion.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- 666.1/656.3, 493.4/486.1 and 440.5/434.0 all give **1.0150**. Three independent lines agreeing to four figures on one stretch factor is not coincidence, and a different element would change the **pattern**, not rescale it.\n\nSo the atom is hydrogen and the galaxy is receding at about **4,500 km/s**, 1.5% of the speed of light.\n\n**The pattern identifies the element; the stretch measures the motion.** One spectrum, two unrelated facts, separated by asking what is shared across the lines and what differs between them -- the same discipline as L3P22's leaning error.\n\nSo Level 3 has repaid L2C22's loan:\n\n| | L2C22 did | L3C22 does |\n| --- | --- | --- |\n| Hydrogen's 656.3 nm | looked it up | **calculates 656.5 nm** from the levels |\n| The 1.889 eV gap | read off the wavelength | **13.6 x (1/4 - 1/9) = 1.8889 eV** |\n| The other three lines | in the table | all four inside **0.04%** |\n| Why the lines crowd | not asked | **1/n²** converges; limit at **364.7 nm** |\n| Why we can see them at all | assumed | only **Balmer** is visible -- luck |\n| Sodium | same table | **fits no integers**: eleven electrons screen |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "I can calculate a spectrum!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You calculated a fingerprint instead of looking it up.**\n\n- L2C22's table was the borrowed ingredient: it could **recognise** hydrogen and could not have **predicted** it\n- The clue was in the table itself -- the gaps between the lines shrink 170, 52, 24 nm, so something **converges**\n- **E(n) = -13.6 / n² eV.** The minus sign means **bound**; zero is a free electron; the **1/n²** makes the rungs crowd towards zero\n- The first step is **10.2 eV** and the step from 5 to 6 is **0.17 eV** -- sixty times smaller\n- **gap = 13.6 x (1/n₁² - 1/n₂²)**, then **λ = 1240 / gap** from L2C22\n- **n = 3 → 2 gives 1.8889 eV and 656.5 nm**, against a measured 656.3: **0.03%**\n- All four Balmer lines land inside **0.04%** -- 656.5, 486.3, 434.2, 410.3 nm\n- The crowding is explained: as n₂ climbs the gap creeps to **13.6/4 = 3.40 eV** and stops, so the **series limit** is at **364.7 nm**, exactly where the lines end\n- Picking the **lower** level picks a **series**; picking the upper picks the line within it\n- **Lyman** (to n=1) is **ultraviolet** at 121.6 nm, **Paschen** (to n=3) is **infrared** at 1,875 nm\n- **Only Balmer is visible** -- so \"every element has a visible fingerprint\" is not a law but a coincidence about where 13.6 eV falls\n- A galaxy's hydrogen at 666.1, 493.4, 440.5 nm is still hydrogen: every line stretched by the **same 1.0150**. **The pattern identifies the element; the stretch measures the motion** -- about 4,500 km/s\n- Removed: L2C22's table, for hydrogen at least\n- Still standing: **this is hydrogen only.** Sodium's 2.105 eV fits **no** integer pair -- the nearest is 1.889, out by 0.216 eV -- because eleven electrons **screen** one another, so the pull on an outer one is neither 1 proton's nor 11. And the minus sign and the 13.6 are taken as given: deriving them needs quantum mechanics",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Thirteen point six over n squared!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Waves Help Us See the Invisible?**\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| Allowed energies | **E(n) = -13.6 / n²** eV | bound, so negative |\n| The rungs crowd | because of **1/n²** | 10.2 eV, then 0.17 eV |\n| A jump releases | **13.6 x (1/n₁² - 1/n₂²)** | 3 → 2 is **1.8889 eV** |\n| Turned into a line | **λ = 1240 / gap** | **656.5 nm** vs 656.3 measured |\n| The whole visible set | 3,4,5,6 → 2 | all inside **0.04%** |\n| Why they crowd and stop | the gap creeps to 13.6/4 | **limit 364.7 nm** |\n| Lower level picks | the **series** | Lyman UV, Balmer visible, Paschen IR |\n| Why we see hydrogen at all | only **Balmer** lands in 1.8-3.4 eV | luck, not law |\n| A galaxy's hydrogen | pattern kept, scale stretched | **x 1.0150**, about 4,500 km/s |\n| Still standing | **hydrogen only** | sodium fits no integers |\n\n**The one line to remember:** a spectral line is the difference between two rungs of a ladder whose heights go as 1/n², so hydrogen's entire visible fingerprint comes out of one formula and one changing whole number -- and the only reason we can see any of it is that the n = 2 series happens to land in visible light.\n\n**Up next:** B22 closes the Big Idea. It sends a wave in on purpose, and finds that the echo it reads is also a difference -- the third time in three lessons."
        }
    };
}
