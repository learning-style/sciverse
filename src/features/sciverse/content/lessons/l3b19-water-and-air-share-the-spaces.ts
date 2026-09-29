import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 19, biology. Biology closes the Big Idea, and
 * this lesson is where the other two lessons' subject -- the pore space -- turns
 * out to be the thing the decomposers are fighting over.
 *
 * L2B19 treated the share that rots each year as a fixed property, which gave a
 * clean store formula and left an obvious question unasked. Decomposers need water
 * and they need air. In soil both come out of the same pores. They cannot both
 * have all of it, so there must be a best wetness rather than a wettest-is-best:
 *
 *   how fast it rots = water factor x air factor
 *
 * with the water factor rising as the pores fill and the air factor falling. The
 * product peaks near 60% of the pores holding water, and that peak is the whole
 * lesson: two limits sharing one resource. At 95% full the rate is an eighth of
 * the peak, so L2B19's store settles eight times larger -- which is peat, derived
 * rather than asserted.
 *
 * The same reasoning shape appeared in L3B18, where one curve rose and one fell
 * and the answer was their ratio. Here it is their product. Worth pointing out,
 * because recognising the shape is more valuable than either result.
 *
 * Still standing: the peak near 60% is fitted to measurements, not derived, and
 * the two factors are drawn as straight lines because that is honest about how
 * roughly they are known. Temperature is held fixed throughout.
 */
export function getL3B19Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B19 gave you a store that settles at the leaf fall divided by the share that rots each year, and treated that share as a number you look up: 40% in a temperate wood, 10% in a bog.\n\nBut look at what those two numbers are standing in for. A bog rots slowly. Why?\n\nThe obvious answer is that it is cold, and cold is part of it. Yet plenty of cold places rot faster than bogs, and plenty of warm swamps accumulate peat perfectly well. The reliable thing about a bog is not its temperature. **It is waterlogged.**\n\nSo water slows rotting down. Which is strange, because decomposers **need** water. Bacteria live in films of it; fungi cannot work in dust. Dry soil rots slowly too -- that is why the same leaf survives years in a desert and weeks in a wet wood.\n\nSo rotting is slow when there is too little water and slow when there is too much. That means there is a **best** amount somewhere in between, and finding out why is this lesson.\n\nYour two dials are the amount of water and the resource it is competing for.\n\n- **How Full of Water the Pores Are**, as a percentage. P19's pores are the empty spaces between soil particles, and at any moment each one holds either water or air.\n- **Total Pore Space** is what fraction of the soil is those spaces at all, from about 35% in packed sand to 60% in a loose crumbly loam.\n\nRead that first dial again. Each pore holds water **or** air. What does that mean for a decomposer that needs both?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "They are competing for the same space, so more water automatically means less air -- and the decomposer needs both.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Not much -- air can diffuse into wet soil quickly enough, so water filling the pores is not really a problem.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It cannot, and the figure is worth knowing because it is far more extreme than people expect.\n\n**Oxygen moves through water about ten thousand times more slowly than through air.** Not ten times. Ten thousand.\n\nSo a pore full of air is a motorway for oxygen and a pore full of water is very nearly a wall. Once water fills the connected route through the soil, oxygen has to cross it by diffusion -- and over even a few centimetres that takes so long that the organisms below have used up whatever was there long before more arrives.\n\nYou have met this number's consequences already, from the other side. L2B18 found that water holds about one twentieth of the oxygen air does, which is why a trout has such a thin margin. This is the same physical fact making trouble in soil: **water is a poor place to keep oxygen and a slow place to move it.**\n\nWhich is why waterlogging is not a mild inconvenience for soil life. Within a day or two of the pores filling, the oxygen is gone, and everything that needs oxygen to break material down stops. Other organisms carry on without it, far more slowly and leaving material half-finished.\n\nThat is what a bog is. Not a cold place -- an **airless** one.",
            options: [
                { id: 'cont', label: "So how do I put water and air together into one rate?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "By treating each as a limit, and letting whichever is scarcer do the limiting.\n\nDefine two factors, each running from 0 -- stopped, nothing happening at all -- to 1, meaning no obstacle:\n\n- **The water factor** rises as the pores fill. At almost no water it is near 0, because microbes cannot work in dust. It reaches 1 once there is enough water for them to live and move in.\n- **The air factor** falls as the pores fill. It is 1 while there is plenty of air, and heads for 0 as water squeezes the last of it out.\n\nThen:\n\n**how fast it rots = water factor x air factor**\n\nA **product** rather than a sum, and that choice carries the meaning. If either factor is near zero, the product is near zero -- no amount of water rescues soil with no air, and no amount of air rescues soil with no water. Adding them would let one make up for the other, which is exactly what does not happen.\n\nTaking the measured shapes as straight lines, with the changeover near **60%** of the pores holding water:\n\n- **Water factor** = how full it is, divided by 0.6, and never more than 1\n- **Air factor** = how empty it is, divided by 0.4, and never more than 1\n\n**The condition, and it is a real one:** that 60% is **fitted to measurements**, not derived from anything, and it shifts with soil type. The straight lines are a deliberate simplification -- real curves are smoother. What is not in doubt is the **shape**: one factor rising, one falling, and a peak in between.\n\nTemperature is held fixed here. It matters, and it multiplies in as a third factor, but the water-air competition is the part that explains bogs.",
            options: [
                { id: 'cont', label: "Find the peak.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Work the two factors across the range.**\n\n| Pores full of water | Water factor | Air factor | How fast it rots |\n| --- | --- | --- | --- |\n| 10% | 0.17 | 1.00 | **0.17** |\n| 30% | 0.50 | 1.00 | **0.50** |\n| 45% | 0.75 | 1.00 | **0.75** |\n| 60% | 1.00 | 1.00 | **1.00** |\n| 75% | 1.00 | 0.62 | **0.62** |\n| 90% | 1.00 | 0.25 | **0.25** |\n| 95% | 1.00 | 0.13 | **0.13** |\n\n**The peak is at 60%**, and it is the only row where neither factor is holding anything back. Left of it, water is short. Right of it, air is short. There is exactly one setting where a decomposer has everything it needs, and it is neither dry nor soaked.\n\nNow feed that into L2B19's store formula, which is where it stops being a curve and starts being a landscape.\n\nA wood at the peak rots at, say, 40% a year, so 4 t/ha/yr of leaf fall settles at **10 t/ha**. Waterlog the same soil to 95% and the rate falls to 0.13 of the peak -- about **5% a year**:\n\nstore = 4 / 0.05 = **80 t/ha**\n\n**Eight times the store, from water alone.** L2B19 asserted that a bog holds forty tonnes a hectare because its rotting share happens to be 10%. This lesson says *why* the share is 10%: the air factor has collapsed to an eighth, because water has taken the pores.\n\nAnd the same product explains the desert. At 10% full the rate is 0.17 of the peak, so a store there would settle six times larger than at the peak too -- which is why dead wood lies around in dry places for decades. Slow rotting at both ends, for opposite reasons.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A soil has **80%** of its pores full of water.\n\nWhat is the rotting rate as a share of the peak?",
            options: [
                { id: 'right', label: "0.50. The water factor is 1 (there is plenty), and the air factor is 0.20/0.40 = 0.50, so 1 x 0.50 = 0.50.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'water_only', label: "1.33, from 0.80 divided by 0.60 -- there is more than enough water.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "1.50, from adding the water factor of 1 and the air factor of 0.50.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1.33** breaks the rule that a factor never exceeds 1. Once there is enough water, more water does not help -- a microbe with a film of water around it does not work faster for being flooded. That is what the cap is for, and without it the formula would claim soil rots fastest when it is a pond.\n\n**Adding** the factors is the mistake this lesson was built to prevent. Add them and a soil with no air at all scores 1.0 from the water alone, so it would rot as fast as a soil at the peak. Bogs would not exist. **A product is what makes each factor able to veto**, which is the physical truth: no air means no aerobic rotting, whatever the water is doing.\n\nDo it properly. At 80% full:\n\n- **Water factor:** plenty, so **1**\n- **Air factor:** 20% of the pores hold air, and 0.20/0.40 = **0.50**\n- **Rate:** 1 x 0.50 = **0.50**, half the peak\n\nSo a soil that looks pleasantly moist is already rotting at half speed, purely from lack of air.",
            options: [
                { id: 'retry', label: "Multiply, cap each factor at 1, and let either one veto.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **How Full of Water the Pores Are** as a percentage, and **Total Pore Space** -- how much of the soil is pore at all.\n\nThe second dial is the one that repays exploring, because it is the one a farmer can change.\n\nAll the percentages above are shares of the **pore space**, not of the soil. So a crumbly loam with 60% pore space and a compacted soil with 35% behave quite differently for the same amount of rain. Rain fills pores; if there are fewer pores, the same rain fills a larger share of them. **Compacted soil reaches the airless end sooner**, and stays there longer, because it also drains slowly -- which is L2P19's dial, arriving here as a biological problem.\n\nSo the chain runs: machinery compacts the soil, pore space falls, the same rainfall now leaves the pores 90% full instead of 60%, the air factor collapses to 0.25, rotting falls to a quarter, and the nitrogen that B19's decomposers were supposed to release for free is not released. The field then needs a bag of the fertiliser L2C19 costed -- and L3C19 has just explained where most of that bag ends up.\n\nWhich is why B19's warning about the pesticide that killed the earthworms was not sentimental. **Worms are the machine that keeps the pore space open.** Their burrows are the large connected pores that drain quickly and refill with air. Remove them and the soil settles towards the airless end of this curve and stays there.\n\nAnd notice the shape of the argument, because you have met it before. In L3B18 one curve fell and one rose, and the answer was their **ratio**, which collapsed. Here one factor rises and one falls, and the answer is their **product**, which peaks. Different arithmetic, same lesson: when two things move in opposite directions, the interesting value is almost never at either extreme.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Two opposing limits, one peak. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A drained peat field is being restored. It currently sits at **60%** of its pores full of water -- the peak -- and is losing its carbon store steadily. The plan is to rewet it to **95%**.\n\nA critic objects: rewetting adds water, and decomposers need water, so surely this speeds the rotting up and releases the carbon faster?",
            options: [
                { id: 'right', label: "No. At 60% the water factor is already 1, so extra water cannot help -- it can only take air away. At 95% the air factor falls to 0.13, rotting drops to an eighth, and the store stops being lost.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The critic has a point -- more water does mean more active decomposers, so the carbon would leave faster.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The critic's reasoning would be right if the soil were on the **dry** side of the peak. It is not, and that is what the whole curve is for.\n\nAt 60% full, the water factor is **already 1**. The decomposers have all the water they can use. Adding more cannot raise a factor that is capped -- it can only push the other one down.\n\nRun it:\n\n- **At 60%:** water 1.00, air 1.00, rate **1.00**\n- **At 95%:** water 1.00, air 0.13, rate **0.13**\n\nRewetting cuts the rotting to about **an eighth**, which is precisely the point of doing it. The carbon that would have left as carbon dioxide stays in the ground, and the store starts building again instead of draining away.\n\nThis is also the honest answer to L2B19's drained bog. That lesson watched 40 t/ha fall to 10 as air got in, and said 30 tonnes a hectare left as carbon dioxide. Rewetting runs the same mechanism backwards -- and now you can say by how much, and why, rather than simply asserting that wet bogs hold carbon.\n\nThe general form is worth keeping: **once a factor is capped, more of that input is not merely useless, it is actively harmful if the input competes for something else.** Water past the peak does not feed the decomposers. It evicts their air.",
            options: [
                { id: 'retry', label: "Past the peak, more water only removes air.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- **rotting to an eighth, and the store stops draining**. Rewetting works because the soil was already on the wet side of the peak, where water can no longer help and can still take air away.\n\nSo Big Idea 19 closes on the thing P19 said at the very start and never came back to: everything about soil is decided by the spaces between its particles.\n\n- **L3P19** put water into those spaces and found the rate falling as they filled, because the pull of dry soil has further to reach.\n- **L3C19** followed what was dissolved in that water, and found that soil grips positive ions and cannot grip nitrate at all.\n- **This lesson** put the decomposers in those same spaces and found them needing both the water and the air, so they work fastest when the pores are about **60%** full and slow at both extremes.\n\nThree lessons, one pore space, three different things competing for it.\n\nAnd the practical chain runs right through all three. Compaction closes the pores; L3P19's soaking rate falls so more water runs off; the pores that remain sit airless so rotting slows; the nitrogen the decomposers would have released has to be bought instead; and L3C19 says most of that purchased nitrogen leaves in the drainage at several times the drinking-water limit. **Every one of those is the same few spaces.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One pore space, three things fighting over it!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You derived the rotting rate L2B19 had to look up.**\n\n- Rotting is slow when soil is **too dry** and slow when it is **too wet**, so there is a best wetness in between\n- Decomposers need water **and** air, and in soil both come from the same pores. Each pore holds one or the other\n- **Oxygen moves about ten thousand times more slowly through water than through air**, so a water-filled pore is very nearly a wall\n- That is the same physical fact as L2B18's trout: water is a poor place to keep oxygen and a slow place to move it\n- **how fast it rots = water factor x air factor**, each capped at 1\n- A **product**, not a sum, so **either factor can veto**: no air means no rotting whatever the water does. Adding them would abolish bogs\n- Water factor = how full / 0.6; air factor = how empty / 0.4; the peak is at **60% full**, the one setting where nothing is short\n- At 80% full the rate is already **half** the peak, purely from lack of air\n- At 95% it is **0.13** of the peak, so L2B19's store settles **eight times** larger -- which is peat, now derived rather than asserted\n- At 10% full it is **0.17**, which is why dead wood lasts decades in a desert. Slow at both ends, for opposite reasons\n- **Compaction** lowers the total pore space, so the same rain fills a larger share of what is left and the soil sits airless\n- Which is why B19's dead earthworms mattered: **worms are the machine that keeps the pores open**\n- Rewetting a drained peatland cuts rotting to an eighth, because past the peak more water only **evicts air**\n- The shape repeats: L3B18 had a ratio that collapsed, this has a product that peaks. When two things move oppositely, the interesting value is not at either extreme\n- Removed: L2B19's fixed share that rots each year\n- Still standing: the **60% peak is fitted to measurements**, not derived, and shifts with soil type. The straight-line factors are a deliberate simplification, and **temperature is held fixed** throughout",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "A product, so either one can veto!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Does Soil Support Life?**\n\nThree levels, and the same few spaces between soil particles each time.\n\n**Summary Table:**\n| | Physics | Chemistry | Biology |\n| --- | --- | --- | --- |\n| **Level 1** | Sand drains, clay does not | pH decides what is available | Decomposers recycle |\n| **Level 2** | **runoff = rain - soil rate** | **apply = demand / catch** | **store = fall / share rotting** |\n| **Level 3** | **rate = own speed x (1 + pull / soaked in)** | nitrate is **repelled**, so it leaves | **rate = water factor x air factor** |\n| **What Level 3 removed** | the fixed soaking rate | the catch as a field property | the fixed rotting share |\n| **The mechanism** | the pull reaches further as water goes in | soil surfaces are **negative** | water and air share the pores |\n| **The number that decides** | 88 mm/h falling to **10** | **40 mg/L**, 3.5x the limit | peak at **60%**, an eighth at 95% |\n| **Still standing** | surface sealing | how much soil can hold | the 60% peak is fitted |\n\n**The one line to remember:** soil life needs water and air out of the same spaces, so rotting is fastest when the pores are about 60% full -- and that single fact explains peat, deserts, why compaction starves a field of its own nitrogen, and why rewetting a bog locks its carbon back up.\n\n**Where this leaves Big Idea 19:** P19 said the pores control everything about how soil works, and it was right in a bigger way than it knew. Water entering them, nutrients dissolved in that water, and the organisms living in them are three different competitions for one resource -- and a farmer who closes the pores loses all three at once."
        }
    };
}
