import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 13, biology. The synthesis lesson.
 *
 * L2B13 treated stomata as open or shut. This removes that simplification.
 * Water loss follows the opening in a straight line, W = 6 x g litres, while
 * the sugar made saturates, A = 17.5 x g / (g + 0.25) grams -- so the sugar
 * gained by the last sliver of opening costs far more water than the first.
 * Half open all day beats fully open for half a day when water is short.
 *
 * Frame of reference stated: g is the share of fully open, per square metre
 * per day. Condition stated: a model curve for one plant on one warm day.
 * Still standing: light and temperature change the curve, a root hormone moves
 * the guard cells, and CAM plants rewrite the rules.
 */
export function getL3B13Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B13 costed a leaf's breathing and named what it held fixed: **stomata were either open or shut**.\n\nWatch a real leaf and neither is true for most of the day. Guard cells hold their pores **part way**, adjusting hour by hour.\n\nWrite the opening as **g**, the share of fully open: g = 1 is wide open, g = 0.5 half open. Per square metre per day, a leaf loses **6 litres** of water at g = 1, and makes **14 g** of sugar.\n\nIf the plant halves its opening to g = 0.5, water loss halves to 3 litres. What happens to the sugar?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It falls, but by less than half -- the CO₂ supply is not the only thing limiting photosynthesis, so closing part way costs less food than it saves water.", nextNodeId: 'curves', sentiment: 'positive' },
                { id: 'bad', label: "It halves too, to 7 g. Half the opening lets in half the CO₂, so the plant makes half the sugar.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Half the opening really does let in CO₂ at half the rate **through the hole**. But the hole is not the only step.\n\nInside the leaf, the CO₂ has to be used: caught by an enzyme, driven by light, built into sugar. B13 called the slowest of these the **limiting factor**.\n\nSo picture what happens as the pores open. At first, CO₂ is desperately short, and every extra bit of opening is used immediately: the sugar climbs steeply. Keep opening, and the leaf reaches the point where its enzymes and its light are the bottleneck, not the supply. Now extra CO₂ arrives and queues.\n\n**The sugar curve flattens out. The water curve does not.** Water has no bottleneck at all -- it simply escapes, at a rate that follows the opening in a straight line all the way.\n\nTwo different shapes, and the gap between them is the whole lesson.",
            options: [
                { id: 'cont', label: "Write both shapes down.", nextNodeId: 'curves' }
            ]
        },
        curves: {
            id: 'curves',
            speaker: 'AI',
            content: "Take a model leaf on a warm day, per square metre per day, with **g** as the share of fully open. That is the frame of reference throughout.\n\n**Water lost, in litres** -- straight line, no bottleneck:\n\n**W = 6 x g**\n\n**Sugar made, in grams** -- a saturating curve:\n\n**A = 17.5 x g / (g + 0.25)**\n\nThat second shape is worth reading carefully. When **g** is much smaller than 0.25, the bottom is nearly 0.25 and A climbs almost in step with g. When **g** is much bigger than 0.25, the g on the top and the g on the bottom nearly cancel, and A creeps towards a ceiling of **17.5 g** that it never reaches. At g = 1 it gives 17.5 / 1.25 = **14 g**, matching L2B13.\n\nThe number that decides whether the bargain is good is the **water use efficiency**:\n\n**water use efficiency = sugar made / water lost**, in grams for each litre\n\nThe condition belongs here. **These two curves are a model for one plant on one warm day**, with the light and the temperature fixed. Change the weather and both curves move.",
            options: [
                { id: 'cont', label: "Work out some openings.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**Half open, g = 0.5:**\n\n**Step 1.** W = 6 x 0.5 = **3 litres**\n\n**Step 2.** A = 17.5 x 0.5 / (0.5 + 0.25) = 8.75 / 0.75 = **11.7 g**\n\n**Step 3.** efficiency = 11.7 / 3 = **3.9 g for each litre**\n\n**Fully open, g = 1:**\n\nW = **6 litres**, A = 17.5 / 1.25 = **14 g**, efficiency = 14 / 6 = **2.3 g for each litre**\n\n| Opening g | Water, litres | Sugar, g | Sugar for each litre |\n| --- | --- | --- | --- |\n| 0.25 | 1.5 | 8.8 | **5.8** |\n| 0.50 | 3.0 | 11.7 | **3.9** |\n| 0.75 | 4.5 | 13.1 | **2.9** |\n| 1.00 | 6.0 | 14.0 | **2.3** |\n\nNow look at the **last** step, from half open to fully open:\n\n- extra sugar: 14.0 − 11.7 = **2.3 g**\n- extra water: 6.0 − 3.0 = **3 litres**\n- that last sugar cost **2.3 / 3 = 0.8 g for each litre**\n\nThe first half of the opening bought sugar at 3.9 g per litre. The second half bought it at 0.8 -- nearly five times worse. **Wide open is the most expensive sugar a leaf ever buys.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The leaf holds its stomata at **g = 0.75**.\n\nHow much water does it lose, how much sugar does it make, and what is its water use efficiency?",
            options: [
                { id: 'right', label: "4.5 litres, 13.1 g of sugar, and 2.9 g for each litre. W = 6 x 0.75, and A = 17.5 x 0.75 / 1.0 = 13.1.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'linear', label: "4.5 litres, 10.5 g of sugar, and 2.3 g for each litre -- three quarters of the opening gives three quarters of everything.", nextNodeId: 'math_wrong' },
                { id: 'ceiling', label: "4.5 litres, 17.5 g of sugar, and 3.9 g for each litre.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**10.5 g** treated the sugar as a straight line, three quarters of 14. But the sugar curve bends: by g = 0.75 the leaf is already close to its ceiling, so it makes **more** than three quarters -- 13.1 g, or 94% of its full-open output, on 75% of the water.\n\n**17.5 g** used the ceiling itself. A never reaches 17.5; that is the value it approaches as g grows without limit. Put g = 0.75 into the formula and the bottom is 1.0, not 0.75.\n\n**Step 1.** W = 6 x 0.75 = **4.5 litres**\n\n**Step 2.** A = 17.5 x 0.75 / (0.75 + 0.25) = 13.125 / 1.0 = **13.1 g**\n\n**Step 3.** efficiency = 13.1 / 4.5 = **2.9 g for each litre**",
            options: [
                { id: 'retry', label: "The sugar curve bends; the water line does not.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a square metre of leaf on a warm day.\n\n**Stomatal Opening** is **g**, the share of fully open. **Water Available** is how much water the roots can supply that day, in litres.\n\nThe lab draws both curves -- the straight water line and the bending sugar curve -- marks your opening on each, and works out how long the water lasts and how much sugar the leaf ends the day with.\n\nTry this:\n\n- Set **g = 1** with **6 litres**: the full 14 g, and the water exactly runs out\n- Keep **g = 1** but drop the water to **3 litres**: the leaf must shut at midday, and ends with about 7 g\n- Now set **g = 0.5** with the same 3 litres: it runs all day and ends with **11.7 g**\n- Slide **g** slowly from 0 to 1 and watch the sugar for each litre fall the whole way",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Straight line against a bending curve. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A plant's roots can supply only **3 litres** per square metre that day -- half what a fully open leaf would use.\n\nIt has two choices: open **fully** and run until the water is gone, or hold the stomata **half open** all day.\n\nWhich leaves the plant with more sugar?",
            options: [
                { id: 'right', label: "Half open, easily: 11.7 g. Fully open uses the 3 litres in half a day and makes only about 7 g in that time -- the same water, spent at a far worse rate.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Fully open. It makes sugar at the fastest possible rate while the water lasts, so it cannot do better than that.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The fastest rate is not the best rate when the fuel is limited. Spend the same 3 litres two ways:\n\n| | Opening | Water used | Time it lasts | Sugar |\n| --- | --- | --- | --- | --- |\n| Sprint | g = 1 | 6 litres a day | half a day | 14 / 2 = **7 g** |\n| Steady | g = 0.5 | 3 litres a day | the whole day | **11.7 g** |\n\nHalf open makes **two thirds more sugar from the same water**, because the sugar it buys costs 3.9 g per litre instead of 2.3.\n\nThis is the shape of every saturating curve: **when a resource is scarce, run where the returns are steep, not where the rate is highest.**\n\nIt is also what guard cells actually do. They open wide on a damp morning when water is cheap, close down through a hot afternoon, and in a drought a hormone from the drying roots tells them to stay nearly shut.",
            options: [
                { id: 'retry', label: "Steady beats sprinting when water is short.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Water loss follows the opening in a straight line, but sugar saturates -- so the best opening is part way, and where exactly depends on how much water there is.**\n\nHere is the simplification this lesson removed. **L2B13 had stomata open or shut.** Part way is not a compromise between two states; it is usually better than either.\n\nThat completes Big Idea 13 at Level 3, and each lesson took a structure and pushed it until the exchange rate changed:\n\n- **L3P13** -- **ratios multiply and so do losses**: three stages of 4 at 97% give 64 and 91%, ten stages of 95% give only 60%\n- **L3C13** -- **f = (density − 0.85) / 0.15**: weighing a plastic measures how tightly its chains pack, 73% against 47%\n- **L3B13** -- **W = 6g** against **A = 17.5g / (g + 0.25)**: the last sliver of opening buys sugar at a fifth of the rate the first did\n\n**How does structure shape function? By fixing an exchange rate -- and the rate itself gets worse the harder you push the structure.**\n\nAnd the simplifications still standing. **Both curves were drawn for one warm day at one light level.** In dim light the sugar curve saturates even sooner, so wide-open stomata waste even more water; in cool damp air the water line is much shallower and opening wide costs little. The guard cells are also driven by a hormone from the roots, not by the leaf's own arithmetic. And **CAM plants**, from L2B13, dodge the whole trade by opening at night.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The last sliver is the dearest!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why stomata sit half open.**\n\n- **g** is the share of fully open, per square metre per day\n- Water has no bottleneck: **W = 6 x g** litres, a straight line\n- Sugar saturates, because light and enzymes also limit it: **A = 17.5 x g / (g + 0.25)** grams\n- At g = 1: 6 litres and **14 g**, matching L2B13\n- **water use efficiency = sugar / water**, in grams for each litre\n- g = 0.25: **5.8 g per litre**; g = 0.5: **3.9**; g = 0.75: **2.9**; g = 1: **2.3**\n- The step from half open to fully open buys 2.3 g for 3 litres: **0.8 g per litre**\n- Wide open is the most expensive sugar a leaf buys\n- With only 3 litres: fully open gives **7 g**, half open gives **11.7 g**\n- When a resource is scarce, run where the returns are steep, not where the rate is highest\n- Condition: one plant, one warm day, fixed light and temperature\n- Still standing: dim light saturates sooner, a root hormone moves the guard cells, and CAM plants open at night",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Straight line against a bending curve!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Stomata Sit Half Open!**\n\nL2B13 opened and shut the holes. Level 3 holds them part way and finds the best setting.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Opening | **g**, the share of fully open | Guard cells adjust it hourly |\n| Water | **W = 6 x g** litres | A straight line, no bottleneck |\n| Sugar | **A = 17.5g / (g + 0.25)** | Saturating: light and enzymes cap it |\n| At g = 1 | 6 litres, 14 g | L2B13's numbers |\n| Efficiency | **sugar / water** | 5.8, 3.9, 2.9, 2.3 g per litre |\n| The last half of the opening | 2.3 g for 3 litres | **0.8 g per litre** |\n| Only 3 litres available | 7 g against **11.7 g** | Steady beats sprinting |\n| Still standing | light, a root hormone, CAM | The curves move with the weather |\n\n**The one line to remember:** water loss rises in step with the opening while sugar levels off, so the widest opening always buys the dearest sugar.\n\n**Big Idea 13 is complete at Level 3.**"
        }
    };
}
