import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 28, chemistry.
 *
 * C28 told the insulin story in words -- a gland notices, a signal goes out, the cells
 * open their doors, feedback shuts it off -- and never said how much sugar was involved.
 * That turns out to be the whole point, because the amounts are shocking:
 *
 *   sugar in the blood = concentration x blood volume
 *
 * A normal 0.9 g/L across 5 L is 4.5 g -- less than a teaspoon in the entire
 * bloodstream. The danger line near 2.0 g/L is 10 g. So the whole safe headroom is
 * (2.0 - 0.9) x 5 = 5.5 g, and one slice of bread delivers about 15 g: 2.7 times the
 * headroom, and 3.3 times everything the blood normally holds.
 *
 * So the signal is not tidying up afterwards. It has to run WHILE the sugar arrives,
 * and the checkpoint is the figure that makes that work -- a cross-reference to Big
 * Idea 27. L2C27 found a slice takes about 29 minutes to cut, so the glucose arrives at
 * 15/29 = about 0.5 g a minute, and the body clears about 0.5 g a minute. They match.
 * If the gut delivered the same 15 g in two minutes it would be 7.5 g/min, fifteen
 * times the clearance. The gut's slowness is not a defect; it is what makes a 5.5 g
 * headroom survivable.
 *
 * It stays off homeostasis, negative feedback and set points, which Big Idea 5 owns
 * (b5, l2b5's sweat heat budget, l3b5). Feedback is named as C28's word and used, not
 * taught.
 *
 * Frame of reference stated: every gram counted is glucose dissolved in the blood
 * itself, not in the gut and not inside cells.
 *
 * Still standing: the danger line is a rounded figure and a real one is a range; the
 * clearance rate rises sharply once insulin acts, which this lesson treats as a single
 * number; and where the sugar GOES is not counted here at all.
 */
export function getL2C28Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C28 told you the shape of a chemical message. A **gland** notices something, sends out a **hormone**, the hormone finds its **receptors** on the target cells, the cells respond, and **feedback** shuts the whole thing off again.\n\nWhat it never did was weigh anything. And the weights here are the surprise of the lesson.\n\nStart with the sugar already in you. Blood sugar is measured as a **concentration** -- how much is dissolved in each litre -- and for a healthy person before a meal it is about **0.9 grams per litre (g/L)**. An adult has about **5 litres** of blood. So:\n\n**sugar in the blood = concentration x blood volume**\n\n0.9 g/L x 5 L = **4.5 grams**\n\n**Four and a half grams.** That is slightly less than a level teaspoon of sugar, and it is *all of it* -- every bit of sugar dissolved in your entire bloodstream, right now, head to foot.\n\nThere is also a line you must not cross. Above about **2.0 g/L** the blood is dangerously sweet, and over years that concentration damages vessels, nerves and eyes. In grams:\n\n2.0 g/L x 5 L = **10 grams**\n\nSo the blood runs between about 4.5 g and 10 g, and **the whole safe gap is 5.5 grams.**\n\nYour two dials are **Glucose Concentration** in g/L and **Blood Volume** in litres.\n\nBefore any arithmetic. Big Idea 27 found that one slice of bread carries about **15 grams** of starch, and starch is cut into glucose. How does that compare with the 5.5 g gap?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'over', label: "It is far more — 15 g is nearly three times the whole gap.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'fits', label: "It fits — 15 g spread through 5 litres is not much.", nextNodeId: 'misconception' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Spread it through the 5 litres and see what it does to the concentration, because that is what matters.\n\nIf all 15 g went into the blood and stayed there, the blood would hold 4.5 + 15 = **19.5 g**, and the concentration would be\n\n19.5 g / 5 L = **3.9 g/L**\n\nagainst a danger line of 2.0. **Nearly double the level that does long-term damage, from one slice of bread.**\n\nPut the three numbers side by side, because the comparison is the lesson:\n\n| | grams |\n| --- | --- |\n| in the blood now | **4.5** |\n| the whole safe gap above that | **5.5** |\n| what one slice delivers | **15** |\n\n**The delivery is 2.7 times the entire gap.** Not a little over -- nearly three times, from a single slice, before anyone has had a second one or a glass of juice.\n\nSo there is no version of this where the blood simply absorbs a meal and copes. The arithmetic rules it out. **Something has to be taking the sugar out of the blood at the same time as it is going in**, and that something is the message C28 described.",
            options: [
                { id: 'cont', label: "So the hormone is not clearing up afterwards.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**No -- and that is the thing C28's story does not make obvious.**\n\nTold in words, *sugar arrives, a message goes out, the cells open their doors* sounds like a sequence: first the blood sugar rises, then the body notices, then it fixes it. The arithmetic says that cannot be how it works. If the body waited for the sugar to arrive and then dealt with it, the concentration would already be at 3.9 g/L -- the damage happens while you are waiting.\n\nSo the real job of the signal is to make the sugar **leave** the blood at the same time as it arrives. The gland does not respond to a problem; it responds to the **first sign** of one, and the response runs alongside the delivery for the whole half hour it lasts.\n\nAnd now the formula does something useful, because **both of its parts vary between people.**\n\n| | blood volume | sugar in the blood | the safe gap |\n| --- | --- | --- | --- |\n| an adult | **5 L** | 0.9 x 5 = **4.5 g** | **5.5 g** |\n| a small child | **2 L** | 0.9 x 2 = **1.8 g** | **2.2 g** |\n\nThe **concentration** that counts as healthy is the same for both -- it is the same chemistry in the same water. But the **grams** are not, because the volume is different. A child's entire safe gap is **2.2 grams**, which one slice of bread exceeds nearly **seven times over**.\n\n**That is why doses and portions are worked out by body size**, and the formula shows exactly why: the limit is a concentration, but the thing that arrives is a number of grams.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "So how does anyone survive a sandwich?", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**By the clock, and this is where Big Idea 27 pays off.**\n\nThe 15 grams do not arrive at once. **L2C27** worked out how long it takes amylase to cut a slice of bread apart: about **29 minutes**. So the glucose arrives spread over that half hour:\n\n15 g / 29 minutes = **about 0.5 grams a minute**\n\nNow compare that with how fast the body can take sugar out of the blood. A resting body, with its signal working, clears **roughly 0.5 grams a minute**.\n\n**Those two numbers are the same.** The gut delivers at about the rate the body can clear, so the blood sugar rises a little, holds, and comes back down -- and never goes near 3.9 g/L.\n\n| | grams a minute |\n| --- | --- |\n| arriving from one slice | **about 0.5** |\n| being cleared | **about 0.5** |\n\nSo turn it round and ask what would happen if the gut were **faster**. Suppose the same 15 g arrived in **2 minutes** instead of 29:\n\n15 g / 2 min = **7.5 grams a minute**, **fifteen times** the clearance\n\nThe blood would gain about 14 g in those two minutes, taking it to 18.5 g and nearly 3.7 g/L. **The slowness of digestion is not a defect. It is what makes a 5.5 gram gap survivable.**\n\nThat is the same comparison in both directions: Big Idea 27 asked how long the gut takes, and this lesson shows what the answer is **for**.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. Somebody drinks a sugary drink containing **40 grams** of sugar. A drink needs no cutting up, so it is absorbed in about **10 minutes**.\n\nAt what rate does the sugar arrive, and how does that compare with the 0.5 g a minute the body clears?",
            options: [
                { id: 'eight', label: "4 g a minute — eight times the clearance, so the blood sugar climbs steeply", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fine', label: "4 g a minute, which is fine because the total is only 40 g", nextNodeId: 'math_wrong' },
                { id: 'half', label: "0.5 g a minute, the same as bread, since the body sets the rate", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Divide the grams by the minutes:\n\n40 g / 10 min = **4 grams a minute**\n\nand the body clears about 0.5, so sugar is arriving **eight times** faster than it can be taken away. The excess piles up in the blood at about 3.5 g a minute, and the 5.5 g gap is used up in **under two minutes**.\n\nThe *that is fine, the total is only 40 g* answer is the one worth arguing with, because it is the mistake the whole lesson is built to prevent. **The total was never the problem.** 15 g already exceeded the gap nearly threefold, and people eat bread safely. What decides whether the blood copes is the **rate** -- grams a minute in against grams a minute out -- and 40 g over ten minutes is a far harder problem than 15 g over thirty.\n\nAnd *the body sets the rate* has it backwards. **The food sets the arrival rate**; the body only sets the clearance. A drink has no starch to cut and nothing to chew, so nothing slows it down -- which is exactly why a liquid with 40 g of sugar in it affects the blood so differently from a slice of bread with 15.\n\nIt is also why *how fast* food releases its sugar is worth knowing about separately from how much sugar it contains. Two foods with identical grams can present the body with completely different problems.",
            options: [
                { id: 'retry', label: "Eight times the clearance.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The blood is drawn as a vessel with the sugar in it counted out -- **one dot is half a gram** -- with the safe band marked, and the slice of bread waiting outside with its 15 grams.\n\nThings worth doing:\n\n- Start at **0.9 g/L** and **5 L**: **4.5 g**, which is **9 dots**. Count them. That is all the sugar in an adult bloodstream\n- Raise the concentration to the **2.0 g/L** danger line: **10 g**, 20 dots. **The whole safe range is 9 dots to 20** -- and the slice outside is 30 dots\n- Now hold the concentration at 0.9 and drag the **Blood Volume** down to **2 L**, a small child. The dots fall to 4, and the danger line for them is only 8. **The same slice is a far bigger problem for a smaller body**\n- Put the volume back to 5 L and raise the concentration slowly. Watch where the dots cross the band -- it is the **concentration** that is unsafe, never the grams on their own, which is why the band is drawn on the concentration and not on the count\n- And try a big adult at **7 L**: 0.9 x 7 = 6.3 g, with a danger line at 14 g. More blood means more grams of room for the same chemistry",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Somebody looks at the two figures and proposes a simplification.\n\n*The blood only ever holds a few grams of sugar, and a meal has fifteen or forty. So the blood is basically irrelevant -- it is just a pipe the sugar passes through on its way to the cells. Why measure it at all?*\n\nWhat is wrong with that?",
            options: [
                { id: 'concentration', label: "The blood is where the damage happens — it is the concentration there that must stay in range, and that is exactly why it is measured.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'agree', label: "Nothing — the amounts show the blood is only a short stop on the way.", nextNodeId: 'checkpoint_wrong' },
                { id: 'store', label: "The blood is wrong because it actually stores most of the sugar.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The first half of the claim is right, and the conclusion does not follow from it.\n\n**The blood really is a pipe, and it really does hold almost nothing.** 4.5 g against a 15 g delivery and a body that stores hundreds of grams in the liver and muscles -- so as a *container* the blood barely counts. That part is correct and worth keeping.\n\nBut being a small container is not the same as being unimportant. **The blood is the one place where the concentration has to stay in range**, because that is the fluid in contact with every vessel wall, every nerve and the back of both eyes. Those are the tissues that a high concentration damages, over years, and that is the whole reason the number is measured.\n\nSo the smallness is the **problem**, not a reason to ignore it:\n\n| | | |\n| --- | --- | --- |\n| a **big** store | would ride out a meal easily | the liver does this |\n| a **small** pipe at a fixed concentration | has no room at all | the blood does this |\n\nIt is because the blood holds so little that 15 g is a crisis and a signal is needed. A larger buffer would need no insulin and no gland and no feedback -- and would also mean the sugar was not going anywhere useful.\n\nAnd *the blood stores most of the sugar* is simply the arithmetic backwards: 4.5 g in the blood against a 15 g slice says the opposite.",
            options: [
                { id: 'retry', label: "Small, and therefore critical.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**And that is the pattern this Big Idea keeps finding.**\n\nL2P28 looked at the heart as a product of two factors and asked which one had room left. This lesson asks the same question of the blood and gets a blunter answer: **the blood has essentially no room.** 5.5 grams of headroom against a 15 gram delivery is not a tight margin, it is a deficit.\n\nWhich forces the design. A system with no buffer cannot work in **stages** -- it has to work **at the same time**:\n\n| | and so | |\n| --- | --- | --- |\n| the gap is **5.5 g** | the blood cannot absorb a meal | a signal must run during it |\n| the delivery is **0.5 g/min** | matched by 0.5 g/min of clearance | the rates are what matter |\n| the limit is a **concentration** | but the delivery is in **grams** | so body size changes everything |\n\nAnd the slowness of Big Idea 27 turns out to be part of the answer rather than a separate fact. **The gut takes half an hour to cut a slice apart, and that half hour is what keeps the blood inside its range.** Two systems, one working slowly and one working continuously, matched to about half a gram a minute.\n\n**B28 puts the last pair together**: the heart's litres from L2P28 and the oxygen a sprinting muscle needs -- and finds a factor that, unlike the heart rate, cannot be raised at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "No buffer means no waiting!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You weighed the thing C28 only described.**\n\n- **sugar in the blood = concentration x blood volume.** At 0.9 g/L across 5 L that is **4.5 grams** -- slightly less than a level teaspoon, and that is *all* of it, head to foot\n- Above about **2.0 g/L** the blood is dangerously sweet, which is 10 g. So **the whole safe gap is 5.5 grams**\n- One slice of bread delivers about **15 g** of glucose: **2.7 times the entire gap**, and 3.3 times everything the blood normally holds. If it all stayed there the concentration would hit **3.9 g/L**, nearly double the danger line\n- **So the arithmetic rules out waiting.** C28's story sounds like a sequence -- sugar arrives, body notices, body fixes -- and it cannot be, because the damage would happen during the pause. The gland responds to the **first sign**, and the response runs **alongside** the delivery\n- **Both parts of the formula vary between people.** The healthy *concentration* is the same for everyone, but the *grams* are not: a child with 2 L has a safe gap of only **2.2 g**, which one slice exceeds nearly **seven** times. **The limit is a concentration and the delivery is grams**, which is why portions and doses go by body size\n- **The rescue is the clock, and it comes from Big Idea 27.** L2C27 found a slice takes about **29 minutes** to cut, so glucose arrives at 15/29 = **about 0.5 g a minute** -- and a resting body clears **about 0.5 g a minute.** The two match\n- Which means **the slowness of digestion is not a defect.** The same 15 g arriving in 2 minutes would be **7.5 g/min**, fifteen times the clearance, and would use the whole 5.5 g gap in under two minutes\n- **The total was never the problem; the rate is.** A drink with 40 g absorbed in 10 minutes arrives at **4 g/min**, eight times the clearance -- a far harder problem than 15 g over thirty, because nothing has to be cut or chewed to slow it down\n- **And the blood is a pipe, not a store** -- 4.5 g against a liver holding hundreds. But being a small container is not being unimportant: **the blood is where the concentration has to stay in range**, because it touches every vessel wall, nerve and eye. The smallness is the problem, which is exactly why there is a signal\n- **Still standing:** the 2.0 g/L line is rounded and a real one is a range. The clearance rate is treated as one number when it actually climbs sharply once the hormone acts. And **where the sugar goes** -- into the liver, into muscle -- is not counted here at all.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2C28", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Chemistry Complete -- How Do Body Systems Work Together?**\n\nC28 described a message. This weighed what the message is for.\n\n**Summary Table:**\n| | C28 said | L2C28 says |\n| --- | --- | --- |\n| Blood sugar | something a gland notices | **concentration x volume**, 0.9 x 5 = **4.5 g** |\n| How much that is | -- | less than a **teaspoon**, in all your blood |\n| The danger line | -- | 2.0 g/L, which is **10 g** |\n| The safe gap | -- | **5.5 grams** |\n| One slice of bread | -- | **15 g**: 2.7 times the gap |\n| So the signal | shuts off by feedback | must run **during** the meal, not after |\n| A small child | -- | 2 L, so a gap of **2.2 g**: seven times over |\n| What saves you | -- | the **rate**: 0.5 g/min in, 0.5 g/min out |\n| A sugary drink | -- | 40 g in 10 min = **4 g/min**, eight times |\n\n**The one line to remember:** all the sugar in your blood is less than a teaspoon and one slice of bread brings three times the room you have, so nothing about digestion could work in stages -- and the half hour Big Idea 27 measured for cutting a slice apart turns out to be exactly the delay that keeps your blood inside its range.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
