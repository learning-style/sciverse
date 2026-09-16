import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B13 "Photosynthesis Engine". The synthesis
 * lesson.
 *
 * B13 named stomata as the holes that let carbon dioxide in. This lesson costs
 * them: the same holes let water out, at roughly 300 g of water for every 1 g
 * of CO2 taken in. Chained to L2B3's 14 g of glucose per square metre per day
 * and L2C10's mass ratios, that is about 6 litres of water for a square metre
 * of leaf in a good day.
 *
 * Frame of reference stated: both masses counted through the same stomata over
 * the same day. Condition stated: a warm, dry, breezy day -- the ratio rises
 * in dry air and falls in damp. Held fixed and named for Level 3: stomata
 * treated as simply open or shut.
 */
export function getL2B13Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B13 showed carbon dioxide entering a leaf through **stomata** -- tiny adjustable holes, mostly on the underside, each one a gap between two guard cells.\n\nA leaf cannot take in CO₂ without opening them. But the inside of a leaf is wet, and the air outside usually is not.\n\nSo when a leaf opens its stomata to feed, what else happens?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Water vapour escapes through the same holes. The leaf is trading water for carbon dioxide every time it opens up.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nothing else -- the holes are shaped to let CO₂ in and keep everything else inside.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "No hole can be that fussy. A stoma is a **gap**, and gases move through a gap in both directions, each one drifting from where it is crowded to where it is not.\n\nInside the leaf, the air sits against wet cell walls and is almost saturated with water vapour. Outside, on a warm day, the air is far drier. So water vapour pours **out** through every open stoma while CO₂ trickles **in**.\n\nAnd the two flows are wildly unequal. Air is only about **0.04%** carbon dioxide, so CO₂ arrives thinly, while the water vapour inside is thick.\n\nThat is the bargain at the heart of every land plant: **it cannot eat without drinking.** The question worth answering is how expensive the bargain is.",
            options: [
                { id: 'cont', label: "How expensive is it?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Measure it as a ratio of masses, both counted through the same stomata over the same day -- that is the frame of reference:\n\n**water cost = mass of water lost / mass of CO₂ taken in**\n\nFor many plants on a warm day, that is about **300 g of water for every 1 g of CO₂**.\n\nTo turn that into food, you need one more link, and it is L2C10's: masses in a reaction go in fixed ratios. Photosynthesis builds glucose from carbon dioxide:\n\n**6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂**\n\nUsing L2C2's formula masses, six CO₂ have a mass of 6 x 44 = **264**, and one glucose is **180**. So:\n\n**mass of CO₂ needed = mass of glucose x 264 / 180 = glucose x 1.47**\n\nThe condition belongs here. **The 300 g figure is for a warm, fairly dry, breezy day.** In damp, still air the leaf loses far less water for the same food, and in hot dry wind it loses much more.",
            options: [
                { id: 'cont', label: "Put it together for a real leaf.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "L2B3 costed a square metre of leaf in six hours of good sun: about **14 g of glucose**.\n\n**Step 1. CO₂ needed:**\n\n14 g x 1.47 = **20.6 g of CO₂**\n\n**Step 2. Water lost, at 300 g for each gram of CO₂:**\n\n20.6 x 300 = **6,180 g**, which is about **6 litres**\n\nSix litres of water, through one square metre of leaf, in one day -- to make three teaspoons of sugar.\n\n| Through one square metre of leaf, in a day | Mass |\n| --- | --- |\n| Glucose made | **14 g** |\n| CO₂ taken in | **20.6 g** |\n| Water lost | **6,180 g**, about 6 litres |\n\nThat is why a large tree can lift hundreds of litres of water out of the ground on a hot day, and why the first thing a wilting plant loses is its ability to grow.\n\nIt also explains the **shape** of a leaf. Wide and flat catches light, which L2B3 measured -- but every square metre of that catching surface is also a square metre of evaporating surface. A leaf is a compromise between two jobs that pull in opposite directions.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A small tree carries **5 m²** of leaf. On a good day each square metre makes **10 g of glucose**.\n\nTaking 1.47 g of CO₂ for each gram of glucose, and **300 g** of water for each gram of CO₂, how much water does the tree lose that day?",
            options: [
                { id: 'right', label: "About 22 litres. Glucose 5 x 10 = 50 g, CO₂ 50 x 1.47 = 73.5 g, water 73.5 x 300 = 22,050 g.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_ratio', label: "About 15 litres, because 50 g of glucose x 300 = 15,000 g.", nextNodeId: 'math_wrong' },
                { id: 'per_metre', label: "About 4.4 litres, because one square metre loses 4,410 g.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**15 litres** multiplied the **glucose** by 300. The water cost is counted against the **CO₂** that came in through the stomata, and there is more CO₂ than glucose: 1.47 g of it for every gram of sugar built.\n\n**4.4 litres** is one square metre's share. The tree has **five** of them, all losing water at once.\n\n**Step 1.** glucose = 5 m² x 10 g = **50 g**\n\n**Step 2.** CO₂ = 50 x 1.47 = **73.5 g**\n\n**Step 3.** water = 73.5 x 300 = **22,050 g**, about **22 litres**\n\nThat is two full buckets, from a tree you could put your arms around.",
            options: [
                { id: 'retry', label: "Glucose, then CO₂, then water.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a leaf making **14 g of glucose** for each square metre in a day.\n\n**Leaf Area** is the area of leaf, in m². **Water Cost** is the grams of water lost for each gram of CO₂ taken in -- low in damp, still air, high in hot dry wind.\n\nThe lab works out the CO₂ taken in and the water lost, and draws the two masses side by side.\n\nTry this:\n\n- Set **1 m²** and **300**: about 6 litres for 14 g of sugar\n- Slide **Water Cost** down to **100**, a damp still morning: the same food for a third of the water\n- Slide it up to **600**, a hot dry wind: the cost doubles again\n- Raise **Leaf Area** to **20 m²**, a small tree: watch the litres climb",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Water out, carbon dioxide in. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** On a blazing afternoon, a plant is losing water far faster than its roots can replace it.\n\nA student says: *simple -- it should shut its stomata and save itself.*\n\nThe plant does close them. Why is that not a free solution?",
            options: [
                { id: 'right', label: "Because the same holes carry its food supply. Closed stomata stop the water loss, but they also stop CO₂ getting in, so photosynthesis nearly halts and the plant stops growing until it can open up again.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It is free. The leaf already holds plenty of CO₂ inside, so it can keep making food with the holes shut all afternoon.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There is very little CO₂ stored inside a leaf. Air is only **0.04%** carbon dioxide, and the small volume of air inside the leaf is used up within minutes of the stomata closing.\n\n| Stomata | Water lost | CO₂ coming in | Food made |\n| --- | --- | --- | --- |\n| Open | high | steady supply | full rate |\n| Shut | almost none | almost none | almost none |\n\nSo closing is not a clever escape; it is an emergency brake with a real cost. Plants in hot places often close their stomata around midday, wait out the worst heat, and reopen in the afternoon -- losing hours of growth to save water.\n\nSome have gone further. Cacti and other desert plants open their stomata at **night**, when the air is cool and damp, store the carbon dioxide in an acid, and run photosynthesis the next day with their stomata firmly shut.\n\nThat is structure shaping function again: the same hole cannot be tuned for both jobs, so plants tune it for the weather, hour by hour.",
            options: [
                { id: 'retry', label: "Shut holes save water and stop food.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Stomata are one hole doing two jobs, and a plant cannot have the good half without the bad.**\n\nThat completes Big Idea 13 at Level 2. In each lesson, a **count** of parts decided what the thing could do:\n\n- **L2P13** -- **gear ratio = driven teeth / driver teeth**: counting teeth gives the force and the speed, and torque x turns never moves\n- **L2C13** -- **n = chain mass / monomer mass**: counting units tells you wax from bag from rope\n- **L2B13** -- **water cost = water lost / CO₂ taken in**: about 300 to 1, so a square metre of leaf spends 6 litres a day on 14 g of sugar\n\n**How does structure shape function? By setting the exchange rate -- how much of one thing you must give to get another.**\n\nOne thing this lesson held fixed: **stomata were either open or shut.** Real guard cells hold them part-way, all day long, hunting for the best setting. Level 3 finds out why part-way beats wide open -- and why the water cost of the last little bit of food is the worst bargain of the lot.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One hole, two jobs!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You costed a leaf's breathing.**\n\n- **Stomata** are adjustable holes between guard cells, mostly on a leaf's underside\n- Gases drift both ways through a gap: CO₂ in, water vapour out\n- Air is only about **0.04%** CO₂, while the air inside a leaf is nearly saturated with water\n- **water cost = water lost / CO₂ taken in**, about **300 g per gram** on a warm day\n- Condition: warm, fairly dry, breezy -- damp still air costs far less\n- From L2C10's mass ratios: **CO₂ = glucose x 264 / 180 = glucose x 1.47**\n- L2B3's square metre: 14 g glucose needs **20.6 g of CO₂** and loses about **6 litres** of water\n- A 5 m² tree making 10 g for each square metre loses about **22 litres** in a day\n- A leaf's flat shape catches light and loses water for the same reason\n- Closing the stomata stops the water **and** the food; growth stops with it\n- Desert plants open at night and store the carbon dioxide as an acid\n- Held fixed: stomata treated as open or shut, never part-way",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "It cannot eat without drinking!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- The Leaf's Bargain!**\n\nB13 found the holes. Level 2 works out what they cost.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Stomata | holes between guard cells | CO₂ in, water out |\n| The air outside | **0.04%** CO₂ | Carbon dioxide arrives thinly |\n| Water cost | **water lost / CO₂ in** | About **300 g per gram** |\n| CO₂ for food | **glucose x 264 / 180** | 1.47 g for each gram of sugar |\n| One square metre | 14 g sugar, 20.6 g CO₂ | About **6 litres** of water |\n| A 5 m² tree | 73.5 g CO₂ | About **22 litres** a day |\n| Closing up | water saved, food stopped | An emergency brake |\n| Desert plants | open at night | Store CO₂ as an acid |\n| Big Idea 13 at Level 2 | teeth, units, holes | Structure sets the exchange rate |\n\n**The one line to remember:** a leaf cannot take in carbon dioxide without letting water out of the same holes -- about three hundred grams of water for every gram of CO₂.\n\n**Big Idea 13 is complete at Level 2.**"
        }
    };
}
