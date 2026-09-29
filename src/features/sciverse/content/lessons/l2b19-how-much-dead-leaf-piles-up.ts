import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 19, biology. Biology closes the Big Idea, so
 * this lesson is where L2P19's water and L2C19's nitrogen meet: the decomposers
 * need the first and release the second.
 *
 * B19 said decomposers recycle dead material and that the soil food web is the
 * most important recycling system on Earth. It never asked the obvious question --
 * if leaves fall every year and rot every year, what decides how deep the layer
 * gets? That has an answer, and it is a balance:
 *
 *   the store settles at = leaf fall each year / the share that rots each year
 *
 * Worked on 4 t/ha a year of leaf fall with 40% rotting each year: the store
 * settles at 10 t/ha. Slow it to 10% a year and the same leaf fall settles at
 * 40 t/ha, which is how peat happens -- not more leaves, slower rotting.
 *
 * Still standing: this is the level the store settles at, and it assumes the share
 * rotting each year is a fixed property. Level 3 shows the share depends on water
 * and air competing for the same pore space.
 */
export function getL2B19Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B19 gave you a teaspoon of soil holding more living things than there are people on Earth, all of them busy taking dead leaves apart.\n\nHere is a question B19 never asked. Leaves fall every autumn, landing on whatever is already there. Decomposers rot them every year. So **how deep does the dead layer get** -- how much piles up?\n\nIt is a fair question with a surprising answer, because two things are happening at once and they pull in opposite directions. Material arrives each year, and a share of what is lying there leaves each year. That is a balance, and balances settle.\n\nYour two dials are the two sides of it.\n\n- **Leaf Fall** is how much dead material lands each year, in **tonnes per hectare per year** -- written **t/ha/yr**, where a hectare is 100 m by 100 m. A deciduous wood drops about 4 t/ha/yr.\n- **Share That Rots Each Year** is what percentage of the pile the decomposers get through in a year.\n\nSuppose 4 t/ha arrives each year and the decomposers get through **40%** of the pile annually. Does the pile grow forever, disappear, or settle somewhere?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It settles. As the pile grows, 40% of it is a bigger amount, so the losses catch up with the 4 tonnes arriving.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It grows forever, slowly -- 4 tonnes arrive and only 40% of that year's leaves rot, so a bit is added every year.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That would be true if the decomposers only worked on **this year's** leaves. They do not. They work on **everything lying there**, including last year's and the year before's.\n\nThat changes the arithmetic completely, so let us walk the first few years with 4 t/ha arriving and 40% of the pile rotting annually.\n\n- **Year 1:** nothing was lying there to rot, so the pile ends at **4 t/ha**.\n- **Year 2:** 40% of those 4 tonnes rots away, leaving 2.4, and another 4 arrives. Ends at **6.4**.\n- **Year 3:** **7.8**. **Year 5:** **9.2**. **Year 10:** **9.9**.\n\nIt is still climbing, but each year it climbs less -- because each year there is more lying there for the decomposers to work on, so the losses grow while the arrivals stay at 4. Year 1 added 4 tonnes; year 10 added barely a tenth of one.\n\nEventually the losses exactly match the arrivals, and the pile stops changing. That is not the decomposers getting faster. It is the pile getting big enough that 40% of it equals 4 tonnes.\n\n**A pile that grows forever is actually the unusual case**, and it needs the rotting to be nearly stopped. Hold that thought, because it is how coal and peat exist at all.",
            options: [
                { id: 'cont', label: "So where does it settle?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Where the two sides are equal. Losses are the share multiplied by the store, so:\n\nshare x store = leaf fall\n\nRearrange for the store and you have the formula:\n\n**the store settles at = leaf fall each year / the share that rots each year**\n\nWith 4 t/ha/yr and 40%: 4 / 0.4 = **10 t/ha**. Check it -- 40% of 10 t is 4 t, exactly matching what arrives. The pile holds still.\n\nA balance like that has a name: the store is at **steady state**, meaning it is not changing even though material is pouring in and out of it the whole time. Nothing is resting. A river pool is at steady state too, and its water is never the same water twice.\n\nTwo things to notice about the formula:\n\n- **The store does not depend on how long the wood has been there.** A hundred-year-old wood and a thousand-year-old wood with the same leaf fall and the same rotting rate hold the same amount of dead material.\n- **Dividing by a small share gives a big store.** That is where the interesting cases live.\n\n**The condition:** this is the level it settles *at*, and it takes years to get there -- about a decade in our example. It also treats the rotting share as a fixed number, which is the assumption Level 3 removes.",
            options: [
                { id: 'cont', label: "Put the wood through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A deciduous wood: 4 t/ha/yr of leaf fall, 40% rotting each year.**\n\n1. **Store:** 4 / 0.4 = **10 t/ha**\n2. **Check:** 40% of 10 t/ha = 4 t/ha leaving, which matches the 4 t/ha arriving\n\nTen tonnes of dead leaf and twig per hectare, sitting there permanently -- and it is permanent even though every individual leaf in it is gone within a few years.\n\n**Now move the wood somewhere cold and wet, where the decomposers manage only 10% a year.** The trees are the same, so the leaf fall is the same:\n\n1. **Store:** 4 / 0.1 = **40 t/ha**\n\n**Four times the store, from exactly the same leaf fall.** Nothing about the arriving material changed. The only difference is how fast it leaves.\n\nThis is the answer to something you have probably seen without explaining. Walk into a warm woodland and the ground under the leaves is thin, dark and crumbly, however much lands there each year. Walk onto a cold bog and you sink into metres of half-rotted plant material. The bog is not more productive -- often it grows far less each year. It is just **worse at rotting**, and in a balance, being bad at the losing side is what builds a store.\n\nCarry that further and you get **peat**, then over millions of years **coal**. Every lump of coal is dead plants that were never properly decomposed, and the reason was almost always waterlogging.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A grassland drops **3 t/ha/yr** of dead plant material, and the decomposers get through **25%** of the store each year.\n\nWhat does the store settle at?",
            options: [
                { id: 'right', label: "12 t/ha. 3 / 0.25 = 12, and 25% of 12 is 3, which matches what arrives.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'multiplied', label: "0.75 t/ha, from 3 x 0.25.", nextNodeId: 'math_wrong' },
                { id: 'subtracted', label: "2.25 t/ha, from 3 minus 25% of 3.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both of those work on **one year's leaves** rather than on the store, and that is the trap this lesson is built around.\n\n**3 x 0.25 = 0.75** is how much would rot if only this year's 3 tonnes were available. But the decomposers are working on everything that has accumulated, and the answer has to be bigger than one year's fall, not smaller. A store of 0.75 t/ha would be less than a single year's arrivals, which cannot be right when material has been piling up for decades.\n\n**3 - 0.75 = 2.25** is this year's leftovers, which is a real quantity for year one only. By year two there is last year's leftover as well, and the pile keeps climbing from there.\n\nThe store is where losses **match** arrivals: 3 / 0.25 = **12 t/ha**. Check it forwards -- a quarter of 12 is 3, exactly the 3 tonnes arriving. Held steady.\n\nAnd notice the shape of it: a quarter rotting each year means the store is **four times** the annual fall. Whatever the numbers, the store is the fall divided by the share.",
            options: [
                { id: 'retry', label: "Divide by the share -- the decomposers work on the whole pile.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Leaf Fall** in t/ha/yr, and **Share That Rots Each Year** as a percentage.\n\n| Leaf fall | Rots each year | Store settles at | Same as |\n| --- | --- | --- | --- |\n| 4 t/ha/yr | 80% | **5 t/ha** | warm, wet tropical forest |\n| 4 t/ha/yr | 40% | **10 t/ha** | temperate deciduous wood |\n| 4 t/ha/yr | 25% | **16 t/ha** | cool northern forest |\n| 4 t/ha/yr | 10% | **40 t/ha** | cold, waterlogged bog |\n| 3 t/ha/yr | 25% | **12 t/ha** | grassland |\n\nEvery row but the last has **identical leaf fall**, and the store ranges from 5 to 40 tonnes a hectare. The whole eightfold range comes from the rotting side alone.\n\nThat is worth sitting with, because it inverts the obvious guess. A tropical forest is the most productive place on Earth and has almost **no** store of dead material on the ground -- everything that lands is taken apart within months. A cold bog produces very little and hoards enormous amounts.\n\nAnd now the connection this Big Idea has been building towards. **The store is not a pile of rubbish; it is the field's savings account.** As it rots, it releases exactly the nitrogen that L2C19's crop needed from a bag. A soil with 40 t/ha of organic material and a slow steady rot rate is feeding its plants continuously, for free.\n\nWhich is why ploughing matters more than it looks. Ploughing lets air into the soil, the rotting share jumps, and the store falls to a new, much lower steady state -- releasing a burst of nitrogen as it goes. That burst is a gift for a season or two. Then the savings are spent, and the field needs a bag every year instead.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The losing side builds the store. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A bog holds **40 t/ha** of dead plant material, with 4 t/ha/yr falling and 10% rotting each year. Someone drains it, which lets air in, and the rotting share rises to **40%**.\n\nThe leaf fall does not change. What happens to the store, and where does the material go?",
            options: [
                { id: 'right', label: "The store falls to 10 t/ha -- three quarters of it, 30 t/ha, is rotted away. It leaves as carbon dioxide into the air, along with a large release of nitrogen.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The store stays at 40 t/ha but turns over faster, since the leaf fall is unchanged.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Put the new numbers through the formula. The leaf fall is the same 4 t/ha/yr, but the share is now 40%:\n\nstore settles at = 4 / 0.4 = **10 t/ha**\n\nIt was 40. It is heading for 10. The store cannot stay where it was, because at 40 t/ha a 40% share means **16 tonnes** leaving each year against only 4 arriving -- a loss of 12 t/ha in the first year alone. The pile shrinks until 40% of it is once again just 4 tonnes.\n\nSo **30 t/ha of dead plant material disappears**. And it is worth asking where, because it does not simply vanish. Decomposers break it down and breathe out the carbon as **carbon dioxide**. That store was carbon locked out of the air, sometimes for thousands of years, and draining the bog puts it back.\n\nThis is why drained peatlands are such a large source of carbon dioxide, and why rewetting them is treated as climate work rather than merely conservation. Nobody burned anything. The rotting share simply went up, and a balance moved to its new level.\n\nThe nitrogen goes somewhere too -- released as the material breaks down, in far more than a crop can use at once. Which, if you remember L2C19, means most of it becomes surplus.",
            options: [
                { id: 'retry', label: "The share changed, so the store has to move to a new level.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- **40 t/ha down to 10**, so 30 tonnes a hectare leaves as carbon dioxide, with a flood of nitrogen alongside it.\n\nAnd notice what did the damage: not cutting anything down, not removing anything. Somebody let **air** into the soil. That is all.\n\nWhich brings Big Idea 19 together, because all three lessons turn out to be about the same few spaces between soil particles:\n\n- **L2P19** was about water getting into those spaces, and how fast.\n- **L2C19** was about nutrients dissolved in that water, and how easily they leave again.\n- **This lesson** is about the decomposers living in those spaces, who need both the water and the air to work -- and whose speed sets how much dead material, carbon and nitrogen the soil holds.\n\nSo the soil's pores are not a detail of P19. They are the thing the whole Big Idea is about.\n\nAnd there is a tension in that last sentence which Level 3 has to resolve. Decomposers need water **and** they need air. Both come from the same pore space. They cannot both have it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Water and air, from the same spaces!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out how deep the dead layer gets.**\n\n- **the store settles at = leaf fall each year / the share that rots each year**\n- Decomposers work on **the whole pile**, not just this year's leaves -- which is why the store settles instead of growing forever\n- At the settling point, losses exactly match arrivals: 40% of 10 t/ha is the 4 t/ha arriving\n- That balance is called **steady state**: unchanging, while material pours in and out the whole time\n- The store does **not** depend on how old the wood is\n- 4 t/ha/yr with 80% rotting settles at **5 t/ha**; with 10% rotting, **40 t/ha**\n- **Eight times the store from identical leaf fall.** Being slow at rotting is what builds a store\n- Which is why tropical forest has almost no litter layer and a cold bog has metres of it -- and how **peat** and eventually **coal** exist\n- The store is the field's **savings account**: as it rots it releases the nitrogen L2C19's crop needed from a bag\n- Draining a bog raises the share from 10% to 40%, so 40 t/ha falls to 10 -- **30 t/ha leaves as carbon dioxide**, with a flood of nitrogen\n- All three Big Idea 19 lessons are about the same pore spaces: water in them, nutrients dissolved in that water, decomposers living in them\n- Removed: B19's recycling with no way to say how much is stored\n- Still standing: the rotting share is treated as fixed. It is not -- decomposers need **water and air from the same spaces**, and Level 3 shows what that does",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Being bad at rotting is how you build a bog!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Does Soil Support Life?**\n\nThree lessons, three sums, and all three are about the spaces between soil particles.\n\n**Summary Table:**\n| Lesson | The Maths | What It Measured |\n| --- | --- | --- |\n| **L2P19** physics | runoff = rain rate - soil rate | **24 mm** lost from a two-hour storm |\n| **L2C19** chemistry | apply = demand / share caught | **120 kg/ha** surplus at a 50% catch |\n| **L2B19** biology | store = leaf fall / share that rots | **10 t/ha**, or **40** if rotting is slow |\n| Steady state | losses match arrivals | Unchanging, while everything moves |\n| The surprise | store does not depend on age | It depends on the **losing** side |\n| Tropical vs bog | 80% vs 10% rotting | 5 t/ha against 40 |\n| Draining a bog | share 10% to 40% | **30 t/ha** leaves as carbon dioxide |\n| Not in the formula | that water and air **share** the pores | Which is Level 3 |\n\n**The one line to remember:** a store settles where its losses match its arrivals, so what builds a bog is not extra leaves but slower rotting -- and letting air into that soil moves the balance, releasing carbon that had been locked away for thousands of years.\n\n**Up next at Level 3:** why the ground stops drinking partway through a downpour, why nitrate is the one nutrient no soil can hold on to, and why rotting is fastest when the soil is neither dry nor soaked."
        }
    };
}
