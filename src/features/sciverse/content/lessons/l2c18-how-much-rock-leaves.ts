import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 18, chemistry.
 *
 * C18 showed that clear river water carries dissolved rock, and that a probe
 * reading conductivity can tell you there is more or less of it. More or less
 * than what, it never said -- the reading was a comparison with no mass behind
 * it. This lesson turns the reading into tonnes:
 *
 *   dissolved load = concentration x discharge
 *
 * It chains straight onto L2P18's discharge, which is the point: 150 mg/L of
 * dissolved rock in 9.6 m3/s is 1.44 kg every second, which is 124 tonnes a day
 * leaving one small valley in water you would call clear.
 *
 * Still standing: conductivity measures the total of everything dissolved. It
 * cannot say which minerals, and two rivers with the same reading can be carrying
 * quite different chemistry.
 */
export function getL2C18Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C18 gave you a glass of clear river water with invisible dissolved rock in it, and a probe that reads higher when there is more of it.\n\nHere is the trouble with that probe. It gives you a **comparison** and never an amount. This river reads higher than that one. Today reads higher than yesterday. Higher by how much rock? The probe has no idea.\n\nAnd there is a real question waiting behind it. Hills do not last forever. Rock dissolves, the water carries it off, and valleys get deeper -- so **how much rock actually leaves?** Not \"more than the granite river\". How many tonnes, and how fast.\n\nYou already have half of what you need. L2P18 measured our stream at **9.6 m³/s** -- that is its **Discharge**, the first of your two dials, and it counts the cubic metres going past each second. A lab measures its water at **150 milligrams of dissolved solids per litre**, which is its **Concentration**, the second dial: how much dissolved rock each litre is carrying.\n\nIs that enough to get tonnes?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Yes -- one says how much rock is in each litre, the other says how many litres go past. Multiply them.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "No -- 150 mg/L is tiny, so it cannot add up to anything you would weigh in tonnes.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "150 mg really is tiny. It is about the weight of two grains of rice, and it is spread through a whole litre. You would never see it, and you can barely taste it.\n\nBut hold that thought next to the other number. **9.6 m³/s is 9,600 litres every second.**\n\nSo the question is not whether 150 mg is small. It is what 150 mg becomes when it happens 9,600 times a second, and then keeps happening for 86,400 seconds a day.\n\nThis is the whole trick of a **concentration**. A concentration is an amount *per litre*, so it is only half a measurement. On its own it can never tell you a total -- it is waiting to be multiplied by how many litres there are.\n\nSmall, times enormous, is not small.",
            options: [
                { id: 'cont', label: "So a tiny amount per litre plus a huge number of litres could still be tonnes?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly. And the quantity you get is called the **dissolved load** -- the mass of dissolved rock a river carries past a point in a given time:\n\n**dissolved load = concentration x discharge**\n\nThis is the same shape of sum as L2P18's discharge, and for the same reason: something *per unit* multiplied by *how many units*. There, volume per second. Here, mass per volume, times volume per second, leaving **mass per second**.\n\nOne piece of unit tidying makes the arithmetic painless:\n\n- **1 mg/L is exactly 1 g/m³.** A litre is a thousandth of a cubic metre, and a milligram is a thousandth of a gram, so the two thousandths cancel.\n- So **150 mg/L = 150 g/m³**, and multiplying by m³/s gives **grams per second** straight away.\n\n**The condition:** this is the *dissolved* load only -- rock that has gone into solution. Mud and sand being dragged along are carried separately and are not in this number.",
            options: [
                { id: 'cont', label: "Put our stream through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Our stream: 150 mg/L of dissolved rock, 9.6 m³/s.**\n\n1. **Swap the units:** 150 mg/L = **150 g/m³**\n2. **Each second:** 150 g/m³ x 9.6 m³/s = **1,440 g/s**, which is **1.44 kg/s**\n3. **Each day:** 1.44 kg/s x 86,400 s = **124,416 kg**, near enough **124 tonnes**\n\n**124 tonnes of rock a day**, out of a stream 8 m wide, in water a lab would call clear.\n\nIt is worth putting that somewhere you can picture it. 124 tonnes is about six full lorry loads, leaving every day, from one small valley -- and nobody watching the stream would see a thing. No mud, no colour. The rock leaves **in solution**, one molecule at a time.\n\nOver a year that is around **45,000 tonnes**. This is how valleys are made: not mainly by the dramatic floods, but by clear water quietly carrying the hills away in the dark.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A river runs at **20 m³/s**, and its water holds **80 mg/L** of dissolved solids.\n\nWhat is its dissolved load, in kilograms per second?",
            options: [
                { id: 'right', label: "1.6 kg/s. 80 mg/L is 80 g/m³, and 80 x 20 = 1,600 g/s.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'thousand_off', label: "1,600 kg/s. 80 x 20 = 1,600, and that is in kilograms.", nextNodeId: 'math_wrong' },
                { id: 'divided', label: "4 kg/s, from 80 divided by 20.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two different slips, and the units catch both.\n\n**1,600 kg/s** has the arithmetic right and the unit wrong. 80 g/m³ x 20 m³/s = 1,600 **grams** per second, because the 80 was in grams. Grams to kilograms is a divide by a thousand: **1.6 kg/s**. Sanity-check it against our stream -- that one was 1.44 kg/s. A river twice as big with half the concentration landing near the same figure is believable; 1,600 kg/s, well over a tonne a second, is not.\n\n**Dividing** cannot be right at all. Concentration is mass *per* volume; dividing by the volume would leave mass per volume squared, which measures nothing. When a unit has a \"per\" in it, you are nearly always multiplying by what comes after the per, to cancel it.\n\n**1.6 kg/s** -- which is 138 tonnes a day.",
            options: [
                { id: 'retry', label: "Grams, not kilograms -- and multiply, to cancel the per-litre.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Concentration** is how much dissolved rock each litre is holding, in mg/L, and **Discharge** is how many cubic metres go past each second -- L2P18's number, arriving here as a dial.\n\n| Concentration | Discharge | Load each second | Each day |\n| --- | --- | --- | --- |\n| 30 mg/L | 9.6 m³/s | 0.29 kg/s | **25 tonnes** |\n| 150 mg/L | 9.6 m³/s | 1.44 kg/s | **124 tonnes** |\n| 150 mg/L | 19.2 m³/s | 2.88 kg/s | **249 tonnes** |\n| 250 mg/L | 50 m³/s | 12.5 kg/s | **1,080 tonnes** |\n\nNow bring C18's two rivers back. The **limestone** river dissolves easily and might read 150 mg/L; the **granite** river resists, and might read 30. C18 could only say which was higher. You can now say what the difference costs the landscape: **124 tonnes a day against 25**. The limestone valley is being taken apart about five times faster, which is why limestone country ends up full of caves and gorges and granite country keeps its shape.\n\nAnd look at the bottom row. A big river with hard water shifts **over a thousand tonnes a day** -- and still looks like clear water.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Concentration says how dissolved, discharge says how much. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two rivers are monitored on the same day.\n\n- **River A:** 200 mg/L, discharge **5 m³/s**\n- **River B:** 50 mg/L, discharge **20 m³/s**\n\nRiver A's water is four times as mineral-rich. Which river is taking more rock out of its valley?",
            options: [
                { id: 'right', label: "Neither -- they are equal, at 1 kg/s each. A has four times the concentration and B has four times the flow.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "River A, because its water is four times as mineral-rich.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "River A's water *is* four times as mineral-rich. But there is four times less of it going past.\n\n- **A:** 200 g/m³ x 5 m³/s = **1,000 g/s** = 1 kg/s\n- **B:** 50 g/m³ x 20 m³/s = **1,000 g/s** = 1 kg/s\n\n**Exactly equal.** 86 tonnes a day, each.\n\nThis is the answer to the question C18 could not reach. A probe reading tells you about the **water**; it does not tell you about the **valley**. A high reading in a trickle and a low reading in a torrent can be dismantling their hills at precisely the same rate.\n\nSo if you want to know what is happening to a landscape, one number is never enough. You need the concentration *and* the discharge -- and if you only get to measure one of them, the discharge is usually the one that varies more, because a river's flow can change tenfold in a week while its chemistry moves much less.\n\nWhich is a hint about Level 3, and about why that turns out to be true.",
            options: [
                { id: 'retry', label: "Rich but small can equal weak but large.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- **1 kg/s each**, 86 tonnes a day each, from two rivers that look nothing alike.\n\nThat is worth keeping, because it is the general shape of every \"how much is really happening?\" question. A **rate** is nearly always something-per-something multiplied by how many somethings, and quoting either half alone is a good way to be confidently wrong.\n\nAnd this is where the Big Idea starts joining up:\n\n- **P18** said fast water cuts and slow water drops. That is rock moved as **lumps**.\n- **L2P18** counted the water: **9.6 m³/s**.\n- **C18** said the water also carries rock **in solution**, invisibly.\n- **This lesson** priced it: **124 tonnes a day**, from clear water.\n\nSo a river takes a hill away twice over -- visibly, as sand and gravel, and invisibly, in solution. The invisible half is often the larger one.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Clear water, six lorry loads a day.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You weighed what a clear stream carries.**\n\n- **dissolved load = concentration x discharge**\n- A **concentration** is half a measurement: an amount **per litre**, waiting for how many litres\n- **1 mg/L = 1 g/m³** exactly, because both thousandths cancel -- which makes the sum easy\n- Our stream: 150 g/m³ x 9.6 m³/s = **1.44 kg/s** = **124 tonnes a day** = about 45,000 tonnes a year\n- That is roughly **six lorry loads a day** out of one small valley, in water a lab calls clear\n- C18's limestone river against its granite river: **124 tonnes a day against 25**, which is why limestone country has the caves\n- 200 mg/L at 5 m³/s and 50 mg/L at 20 m³/s are **identical loads** -- a probe reading alone cannot tell you about a valley\n- A river removes its hills **twice**: visibly as sand and gravel, invisibly in solution\n- Removed: C18's probe reading that could only compare, never weigh\n- Still standing: conductivity measures the **total** dissolved. It cannot say **which** minerals, so two rivers reading the same can be carrying different chemistry",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The invisible half is the bigger half!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Rivers Shape the Land?**\n\nC18 told you the rock was in there. Level 2 weighs how much of it leaves.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Dissolved load | **concentration x discharge** | Mass leaving each second |\n| Unit trick | 1 mg/L = **1 g/m³** | Both thousandths cancel |\n| Our stream | 150 x 9.6 | **1.44 kg/s** |\n| Per day | x 86,400 s | **124 tonnes**, six lorry loads |\n| Limestone vs granite | 150 vs 30 mg/L | 124 t/day against 25 |\n| Equal loads | 200 x 5 = 50 x 20 | The probe cannot tell you about the valley |\n| Two kinds of removal | lumps, and solution | The invisible half is often larger |\n| Not in the formula | **which** minerals | Conductivity gives only the total |\n\n**The one line to remember:** a concentration is only half a measurement, so a tiny amount per litre times an enormous number of litres is how a clear stream carries a hill away.\n\n**Up next:** B18 -- the fish. Flow decides how much oxygen gets into the water, temperature decides how much it can hold, and a trout needs a number."
        }
    };
}
