import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 27, biology -- the lesson that closes it.
 *
 * It is a RATIO of two times that the other two lessons each measured:
 *
 *   margin = time available / time needed
 *          = (length / speed)  /  (bonds / (cutters x cuts per second))
 *
 * L2P27 measured the top: 600 cm at 0.04 cm/s is 15,000 s, about 4.2 hours.
 * L2C27 measured the bottom: 5.6 x 10^22 bonds at 3.2 x 10^19 cuts a second is
 * 1,736 s, about 29 minutes. The ratio is 8.6, and the length that would just
 * finish is 69.5 cm -- so the small intestine is nearly nine times longer than the
 * job strictly requires, and that surplus is the point.
 *
 * Why it matters is visible in the grid: at full length, HALF the enzyme is still
 * safe (margin 4.3), but at 100 cm half the enzyme gives 0.72 and the food leaves
 * 28% uncut. The length is what makes an enzyme shortfall survivable.
 *
 * This is kept clear of Big Idea 2, which owns surface area to volume and the villi.
 * That is a different problem -- getting glucose ACROSS the wall -- and the lesson
 * says so rather than pretending length has only one job.
 *
 * The three-way tie is exact rather than gestured at. L2C27's formula assumed every
 * enzyme is busy every second, which needs food and enzyme mixed the whole way; and
 * mixing is exactly what L2P27 found the muscle was doing, because the wave runs 75
 * times faster than the food advances. So P27's odd speed gap is the condition C27's
 * arithmetic depended on, and B27 is where that becomes visible.
 *
 * Frames stated: both times are for the same reservoir -- the food in the small
 * intestine -- and both are measured from the moment it arrives there.
 *
 * Still standing: the 8.6 is for starch alone and for one slice of bread; protein and
 * fat have their own enzymes and their own counts.
 */
export function getL2B27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Two lessons, two stopwatches, and they were timing the same meal.\n\n**L2P27** timed how long the food is **in** the small intestine -- the tube food enters from the **stomach**, and which is **coiled** up to fit six metres of itself into your abdomen. It advances at about 0.04 cm per second, and the tube is about 600 cm long, so:\n\n600 / 0.04 = 15,000 seconds = **about 4.2 hours**\n\n**L2C27** timed how long the **cutting** takes. A slice of bread's starch holds about 5.6 x 10²² bonds, and 3 mg of amylase makes about 3.2 x 10¹⁹ cuts a second, so:\n\n**about 1,736 seconds = 29 minutes**\n\nSo the food has **4.2 hours** available and the job needs **29 minutes**. It finishes with hours to spare -- which should immediately make you suspicious, because bodies are not usually built with that much slack.\n\nAnd you can ask the sharper question. **How long would the tube have to be to only just finish?** The food needs 1,736 seconds, and it covers 0.04 cm every second:\n\n1,736 x 0.04 = **69.5 cm**\n\n**Seventy centimetres would do it.** Yours is 600. B27 said the small intestine is long; it never said it was nearly **nine times** longer than the job requires.\n\nYour dials are **Tube Length** in **centimetres (cm)** and **Amylase** in **milligrams (mg)**.\n\nBefore the arithmetic -- why would a body build 600 cm of tube to do a 69.5 cm job?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'spare', label: "Spare capacity — so it still works on a bad day.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'absorb', label: "For the extra surface to absorb through.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is true, and it is a **different** job -- so it is worth separating the two carefully, because one organ is solving two problems at once and they are easy to run together.\n\n**Big Idea 2** dealt with the surface. The lining is folded into millions of tiny **villi** -- finger-shaped bumps -- because glucose has to get **across the wall** and into the blood, and crossing a wall needs **area**. That problem is about area, and the villi are the answer.\n\nThis lesson is about a problem that happens **before** that one. The glucose does not exist yet. It is still locked up in starch chains, and every bond has to be cut before there is anything to absorb. **Cutting takes time**, and having time means the food has to still be **in** the tube.\n\n| the problem | what solves it | the quantity |\n| --- | --- | --- |\n| getting glucose **across the wall** | the **villi** | **area** |\n| having glucose **to absorb at all** | the **length** | **time** |\n\nSo a longer tube gives you more of both, and this lesson is counting only the second one. **The length buys time.** And the question stands: it has bought nearly nine times more time than the job needs.",
            options: [
                { id: 'cont', label: "So why so much more time?", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Put the two times into one number. Call it the **margin**:\n\n**margin = time available / time needed**\n\nIt says *how many times over* the food finishes. A margin of 1 means it only just finishes, as the last of it leaves. Below 1 and some of the meal leaves **uncut**.\n\nBoth of those times came from somewhere, so write them out in full:\n\n- **time available = tube length / speed** -- L2P27's formula, which holds while the food keeps advancing steadily\n- **time needed = bonds / (cutters x cuts per second)** -- L2C27's formula, which holds while **every enzyme is busy every second**\n\nFor the healthy case:\n\nmargin = 15,000 s / 1,736 s = **about 8.6**\n\n**Now the answer to the question.** A margin of 1 is not safety, it is the exact edge of failure, and it would be reached by any of these perfectly ordinary things:\n\n- a **bigger meal** -- twice the starch is twice the bonds and twice the time needed\n- **less enzyme** than usual, which happens when the pancreas is working badly\n- food moving **faster** than 0.04 cm/s, which is what happens when you are ill\n\nA 69.5 cm tube would digest a slice of bread on a perfect day and fail on every other one. **The 600 cm is not for the slice of bread. It is for the bad days.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me a bad day.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Here is the one that matters, because it is a real condition. Suppose the pancreas supplies only **half** the usual amylase -- 1.5 mg instead of 3 mg.\n\nFrom L2C27, halving the cutters **doubles** the time needed:\n\ntime needed = 1,736 x 2 = **3,472 s**, about 58 minutes\n\nThe time available has not changed, because the tube is the same length:\n\nmargin = 15,000 / 3,472 = **about 4.3**\n\n**Still finishes, with hours to spare.** Half the enzyme is gone and the person digests their food perfectly well, because the margin had room to lose.\n\nNow do the same thing to someone whose small intestine has been shortened to **100 cm** by surgery, with their **full** 3 mg of enzyme:\n\ntime available = 100 / 0.04 = **2,500 s**\n\nmargin = 2,500 / 1,736 = **about 1.4** -- just finishes\n\nAnd now put the two troubles **together**: 100 cm of tube **and** half the enzyme.\n\nmargin = 2,500 / 3,472 = **about 0.72**\n\n**Below 1.** Only 72% of the starch gets cut, and 28% of the meal leaves as starch the body cannot use.\n\n| | margin | |\n| --- | --- | --- |\n| 600 cm, 3 mg | **8.6** | comfortable |\n| 600 cm, 1.5 mg | **4.3** | fine |\n| 100 cm, 3 mg | **1.4** | only just |\n| 100 cm, 1.5 mg | **0.72** | **fails** |\n\n**Look at what the length is actually doing.** Half the enzyme is harmless at 600 cm and catastrophic at 100 cm. The length is not digesting anything itself -- it is what makes an enzyme shortage **survivable**.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "A person has **300 cm** of small intestine and their full **3 mg** of amylase.\n\ntime available = 300 / 0.04 = 7,500 s, and time needed is still 1,736 s.\n\nWhat is their margin, and does a slice of bread get digested?",
            options: [
                { id: 'four', label: "About 4.3 — yes, comfortably", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'half', label: "About 0.5 — no, half the tube means half digested", nextNodeId: 'math_wrong' },
                { id: 'twice', label: "About 17 — half the length doubles the margin", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Divide the two times:\n\n7,500 / 1,736 = **about 4.3**\n\nSo yes, comfortably -- it finishes more than four times over.\n\nThe *0.5* answer is the interesting mistake, because it is comparing the tube with **the wrong thing**. Half of 600 cm is 300 cm, and that is half the **healthy** length -- but the question is not how it compares with a healthy person. It is how it compares with **69.5 cm**, which is what the job needs. 300 cm is still four times that.\n\n**A margin is only ever a comparison with what is needed, never with what is normal.** That is the whole reason the number is worth having -- it tells you how close to the edge you are, and 300 cm is not close.\n\nAnd *17* has the division upside down. Shortening the tube gives the food **less** time, so the margin must get **smaller**. Length is on the **top** of the fraction: halve it and you halve the margin, from 8.6 to 4.3.",
            options: [
                { id: 'retry', label: "7,500 / 1,736 = 4.3, and it finishes.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The tube is drawn and divided into **the length one slice needs** -- 69.5 cm each at full enzyme -- so the margin is something you can **count** rather than take from a formula.\n\nThings worth doing:\n\n- Start at **600 cm** and **3 mg**: the tube divides into **8.6** lengths. Count them. That is the margin, and it is why you have never thought about your own digestion\n- Drag the length down to **70 cm**: exactly **one** length fits. The food finishes **as it leaves**, with nothing to spare. This is the shortest tube that works on a perfect day\n- Now, still at 70 cm, halve the enzyme to **1.5 mg**. Each length needed **doubles** to 139 cm, so only **half** of one fits and half the meal leaves uncut. **The tube that was exactly enough is now not enough**, and nothing about it changed\n- Put the length back to **600 cm** and halve the enzyme again, and again. At 1.5 mg: **4.3** lengths. At 0.75: **2.2**. Even at the lowest enzyme setting it still finishes. **A long tube absorbs an enzyme failure that a short one cannot**\n- Find where it breaks. At **0.5 mg** one length needs 417 cm, so anything under 417 cm fails -- and the failure is not sudden. At 200 cm you get **48%** cut, and the rest leaves as starch\n- And try the two troubles together: **100 cm** and **1.5 mg** gives **0.72**, which is the 28% that leaves uncut",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Somebody reads all three of these lessons and objects:\n\n*You said in L2P27 that the muscle squeezing food along is 75 times faster than the food actually moves, which you called mixing rather than carrying. But mixing does not cut any bonds and it does not make the tube longer. It is just stirring. So it cannot matter to any of this arithmetic.*\n\nUsing L2C27's formula, is that right?",
            options: [
                { id: 'condition', label: "No — C27's formula assumed every enzyme is busy every second, and mixing is what makes that true.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'agree', label: "Yes — the formula has length, speed, bonds and cutters in it, and mixing is none of those.", nextNodeId: 'checkpoint_wrong' },
                { id: 'speed', label: "No — mixing makes the food move faster, which gives more time.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Go back to the **condition** L2C27 attached to its formula, because this is exactly what conditions are for.\n\n*time needed = bonds / (cutters x cuts per second)* -- **while every enzyme is busy every second.**\n\nThat is an assumption, and it is a demanding one. An amylase molecule sitting in fluid with no starch anywhere near it makes **zero** cuts a second, not 1,000. The 3.2 x 10¹⁹ cuts a second only happens if essentially all of the enzyme is in contact with food essentially all of the time.\n\nIn a tube 600 cm long and a couple of centimetres wide, that does not happen by itself. The food would travel as a slug down the middle, the enzyme near the walls would never meet it, and the **effective** number of cutters would be a fraction of the real one -- which multiplies the time needed and eats the margin.\n\n**So the stirring is not decoration.** It is what keeps L2C27's condition true, and it is why the muscle's wave is 75 times faster than the food's advance. A wave that merely carried food along would move it at 3 cm/s and the whole tube would empty in **three minutes**, which is a margin of 0.1 and a disaster.\n\nThe third answer has the sign backwards, too: more time available needs the food to move **slower**, not faster. The mixing is fast; the **food** is slow. That was L2P27's whole discovery.",
            options: [
                { id: 'retry', label: "Mixing is what keeps the condition true.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**That is the Big Idea closing on itself, and it is worth seeing how tightly the three lessons fit.**\n\nL2P27 found something that looked like a curiosity: the squeezing wave travels at 3 cm/s while the food advances at 0.04 cm/s, 75 times slower. It concluded that the muscle is mostly **mixing**, not carrying -- and at the time that was just an interesting reading of a speed gap.\n\nL2C27 then wrote a formula and attached a condition to it: **every enzyme busy every second.**\n\nAnd those are the same fact. **P27's speed gap is the mechanism that makes C27's condition true.** Neither lesson could see that on its own:\n\n| lesson | measured | and it turns out to be |\n| --- | --- | --- |\n| **L2P27** | 4.2 hours in the tube | the **time available** |\n| **L2C27** | 29 minutes of cutting | the **time needed** |\n| **L2B27** | 15,000 / 1,736 = **8.6** | the **margin**, and why there is one |\n\nSo the three answers to *how does food become usable energy* are a **length**, a **number** and a **ratio** -- and the ratio is the only one that says whether the body works.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The speed gap was the condition all along!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You closed Big Idea 27 by dividing one lesson's answer by another's.**\n\n- **margin = time available / time needed**, and it says *how many times over* the food finishes. Below **1**, part of the meal leaves **uncut**\n- **time available = length / speed** (L2P27): 600 / 0.04 = 15,000 s, about **4.2 hours**\n- **time needed = bonds / (cutters x cuts per second)** (L2C27): about **1,736 s**, 29 minutes\n- margin = 15,000 / 1,736 = **about 8.6**\n- The tube that would **just** finish is 1,736 x 0.04 = **69.5 cm**. Yours is **600** -- nearly **nine times** longer than the job requires\n- That surplus is not waste. A margin of 1 is the **edge of failure**, and a bigger meal, less enzyme or faster-moving food would all reach it. **The 600 cm is for the bad days**\n- **Half the enzyme at 600 cm: margin 4.3, perfectly fine.** Half the enzyme at 100 cm: margin **0.72**, and 28% of the meal leaves as starch. The length is what makes an enzyme shortage **survivable**\n- Length is on the **top** of the fraction, so halving the tube **halves** the margin -- and a margin is always a comparison with what is **needed**, never with what is normal\n- Failure is **gradual**, not sudden: at 0.5 mg and 200 cm, **48%** is cut and the rest leaves\n- **Length solves a different problem from area.** The **villi** of Big Idea 2 get glucose **across the wall**, which needs **area**. The **length** gives time to **make** the glucose in the first place. One organ, two problems, and this lesson counted only the second\n- And the Big Idea closes on itself: **L2P27's speed gap is the mechanism behind L2C27's condition.** The wave runs 75 times faster than the food so the two stay **mixed**, which is the only way *every enzyme busy every second* can be true. A wave that merely carried food would empty the tube in **three minutes** -- a margin of 0.1\n- **Still standing:** the 8.6 is for **starch alone**, and for one slice of bread. Protein and fat have their own enzymes, their own bond counts and their own margins, and nothing here has counted them. The speed of 0.04 cm/s was also treated as fixed, and it is not -- it is set by the same muscle doing the mixing.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete Big Idea 27, Level 2", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Does Food Become Usable Energy?**\n\nThree lessons measured three things, and only the third one could tell you whether the body works.\n\n**Summary Table:**\n| | Lesson | The quantity | The result |\n| --- | --- | --- | --- |\n| **P** | L2P27 | **length / speed** | food is in the small intestine **4.2 hours** |\n| | | | the wave is **75x** faster than the food: **mixing**, not carrying |\n| **C** | L2C27 | **bonds / (cutters x cuts per second)** | **5.6 x 10²²** bonds, cut in **29 minutes** by **3 mg** |\n| | | | one molecule alone: **130 ages of the universe** |\n| **B** | L2B27 | **available / needed** | margin **8.6**; the job needs only **69.5 cm** of the 600 |\n| | | | half the enzyme is fine at 600 cm, **fails** at 100 |\n\n**What ties them together:** the physics gave the time the food **has**, the chemistry gave the time the job **takes**, and the biology divided one by the other. The answer is not that the body is fast -- the cutting takes half an hour and the food takes four hours, so neither is fast. The answer is that the body is built with **nine times more time than it needs**, and that surplus is what you are living on whenever a meal is large or a pancreas is tired.\n\nAnd the three lessons turned out to need each other: **L2C27's formula only works if every enzyme is busy every second, and L2P27's 75-fold speed gap is what makes that true.** The curiosity in the first lesson was the hidden condition of the second.\n\n**Still standing for Level 3:** every bond count here was looked up, because counting molecules needs a unit for counting them. Why one slice of bread holds 5.6 x 10²² bonds, and how anybody knows, is waiting at Level 3.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
