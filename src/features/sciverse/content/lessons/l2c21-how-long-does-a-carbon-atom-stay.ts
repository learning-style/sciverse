import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 21, chemistry.
 *
 * C21 drew four reservoirs with arrows between them and named the arrows fluxes in
 * GtC/year. It never divided one number by another, so it could not answer the
 * question a reservoir diagram exists to raise: how long does a carbon atom stay
 * put? That is one division:
 *
 *   residence time = reservoir / flux out
 *
 * The atmosphere holds about 875 GtC and loses about 210 GtC a year, so a carbon
 * atom stays in the air about 4 years. The deep ocean holds 37,000 GtC and
 * exchanges about 90 GtC a year: 411 years.
 *
 * The chemistry is the part C21 skipped. Carbon is not one substance moving about;
 * it changes species at every step. CO2 gas, then dissolved CO2, then bicarbonate
 * HCO3-, then carbonate CO3 2-, then sugar, then limestone. The ocean holds fifty
 * times the air's carbon because of one reaction -- CO2 + H2O + CO3 2- -> 2 HCO3- --
 * and that same reaction is why the ocean's appetite falls as it feeds, which
 * L3C21 takes up.
 *
 * Still standing: a 4-year residence time invites a wrong conclusion, that CO2
 * added today is gone in 4 years. It is not, and the reason is that the big fluxes
 * run both ways and nearly cancel.
 */
export function getL2C21Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C21 gave you the carbon cycle as four boxes with arrows between them: air, plants, soil and ocean, with carbon flowing along every arrow. It called the amount in a box a **reservoir** and the flow along an arrow a **flux**, measured in **gigatonnes of carbon a year** -- **GtC/yr**, where a gigatonne is a thousand million tonnes.\n\nWhat it never did was put two of those numbers together. And a reservoir diagram exists precisely to let you do that, because it answers a question you cannot otherwise ask: **how long does a carbon atom actually stay in one place?**\n\nThat matters in a way the diagram hides. If a carbon atom sits in the air for a week, the atmosphere is a busy thoroughfare. If it sits for ten thousand years, the atmosphere is a vault. The arrows look the same either way.\n\nFirst, though, the chemistry -- because \"carbon moves from the air to the ocean\" hides a change of substance at every step. Carbon is never just carbon:\n\n- In the air it is **carbon dioxide gas**, CO₂.\n- Dissolved in seawater, most of it is not CO₂ at all. It has reacted to become **bicarbonate**, HCO₃⁻, and a little **carbonate**, CO₃²⁻.\n- In a plant it is **sugar**, built by photosynthesis.\n- In a shell or a limestone cliff it is **calcium carbonate**, CaCO₃.\n\nYour two dials are the two numbers a reservoir needs.\n\n- **Reservoir Size** in GtC -- how much carbon is in this store.\n- **Flux Out** in GtC/yr -- how fast it leaves.\n\nThe atmosphere holds about **875 GtC** and loses about **210 GtC a year**. How long does an atom stay?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Divide the store by the rate -- 875 / 210, which is about 4 years.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "You cannot tell, because some atoms will leave immediately and others will stay for centuries.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Both of those things are true, and they do not stop the calculation -- they just tell you what kind of answer it is.\n\nIndividual atoms really do differ. One CO₂ molecule might be absorbed by a leaf within minutes; another might drift for decades. What the division gives you is the **average**, and an average is exactly what you want when you are comparing the air with the ocean.\n\nHere is the reasoning, and it is worth seeing why it works. Suppose the store is holding steady -- as much arriving as leaving. Then every year, 210 GtC out of the 875 GtC present is replaced. So the whole store turns over in 875 / 210 years. It is the same logic as a shop with 875 loaves that sells 210 a year: the average loaf sits there four years, even though some sell at once and some go stale.\n\nAnd that is the formula:\n\n**residence time = reservoir / flux out**\n\nYou have met its shape before. L2B19 worked out the store a woodland's dead leaves settle at, from the leaf fall and the share that rots. **This is the same relation asked backwards** -- there you knew the rates and wanted the store; here you know the store and want the time.",
            options: [
                { id: 'cont', label: "So it is an average. Let me use it.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**residence time = reservoir / flux out**\n\nIn GtC divided by GtC/yr, which leaves **years** -- check the units and the gigatonnes cancel, exactly as they should.\n\nThree things to be careful about:\n\n- **Use the flux out, not the flux in.** They are nearly equal in a steady cycle, so either will do for an estimate, but the atoms leaving are the ones whose stay you are timing.\n- **Add up all the ways out.** The atmosphere loses carbon to plants by photosynthesis **and** to the ocean by dissolving. The 210 GtC/yr is both together; using only one would double the answer.\n- **The condition:** this assumes the reservoir is roughly steady. For a store that is growing or shrinking fast, the answer still means something but is harder to interpret -- which turns out to matter a great deal for the atmosphere today.\n\nNow the chemistry that makes the numbers come out as they do. **Why does the ocean hold about fifty times as much carbon as the air?** Not because CO₂ is very soluble -- on its own it is not especially. Because of a reaction:\n\n**CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻**\n\nDissolved CO₂ reacts with water and with carbonate already in the sea, and the product is bicarbonate. That reaction keeps taking the dissolved CO₂ out of the way, so more can dissolve behind it. The ocean is not a bucket of CO₂; it is a bucket of **bicarbonate**, and that is the chemical reason its reservoir is so large.",
            options: [
                { id: 'cont', label: "Work out some real reservoirs.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The atmosphere: 875 GtC, losing 210 GtC a year.**\n\n1. **Residence time:** 875 / 210 = **4.2 years**\n2. **Check the units:** GtC / (GtC/yr) = years\n3. **What it means:** on average a CO₂ molecule spends about four years in the air before a leaf or the sea takes it\n\nFour years is short. The air is a thoroughfare, not a vault: an atom passes through it rather than settles in it, and roughly a quarter of all the carbon in the atmosphere is swapped out every year. Because these times run from a few years to several centuries, the lab draws them on a stretched scale so that the short ones are still visible.\n\n**Now the deep ocean: 37,000 GtC, exchanging about 90 GtC a year.**\n\n1. **Residence time:** 37,000 / 90 = **411 years**\n\nA hundred times longer, and for two reasons that are both worth naming. The reservoir is **42 times larger**, and the flux is **less than half** -- because the deep ocean only exchanges with the surface slowly, where water sinks at the poles and rises elsewhere.\n\n**And land plants: 550 GtC, losing about 120 GtC a year** -- 4.6 years, much like the air, which makes sense because leaves and needles are replaced on a scale of years.\n\nSo the four boxes of C21 are nothing like each other:\n\n| Reservoir | Size | Flux out | Residence time |\n| --- | --- | --- | --- |\n| Atmosphere | 875 GtC | 210 | **4.2 years** |\n| Land plants | 550 GtC | 120 | **4.6 years** |\n| Soil | 1,600 GtC | 60 | **27 years** |\n| Deep ocean | 37,000 GtC | 90 | **411 years** |\n\nThe arrows in C21's diagram all looked alike. The times behind them differ by a factor of a hundred.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The **surface ocean** -- the sunlit top hundred metres or so -- holds about **900 GtC** and exchanges about **90 GtC a year** with the air.\n\nWhat is its residence time?",
            options: [
                { id: 'right', label: "About 10 years. 900 / 90 = 10.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'multiplied', label: "81,000 years, from 900 x 90.", nextNodeId: 'math_wrong' },
                { id: 'flipped', label: "0.1 years, from 90 / 900.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "The units settle both of these without any thinking about oceans.\n\n**Multiplying** gives GtC x GtC/yr, which is gigatonnes squared per year -- a quantity that measures nothing. And 81,000 years for a layer of water that a storm can mix in a day fails the plausibility test badly.\n\n**Flipping** gives (GtC/yr) / GtC = 1/yr, which is a **rate**, not a time. It is a perfectly real quantity -- it says a tenth of this reservoir turns over each year -- and it is the reciprocal of what was asked. If your answer comes out as \"per year\", you have the turnover rate and need to invert it.\n\n**900 / 90 = 10 years.**\n\nAnd notice where that sits: longer than the atmosphere's 4 years, far shorter than the deep ocean's 411. The surface ocean is the middleman, and its 10-year time is why the sea's response to a change in the air is quick at the top and slow underneath.",
            options: [
                { id: 'retry', label: "Reservoir over flux -- and check the units give years.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Reservoir Size** in GtC and **Flux Out** in GtC/yr.\n\nA useful habit: before dividing, guess whether the answer is years, decades or centuries. Getting that right matters more than the decimal.\n\nNow the thing this formula is genuinely for. Look at the atmosphere's **4.2 years** and see what it does **not** say.\n\nIt is tempting to read it as: put extra CO₂ into the air, and in about four years it is gone. **That is wrong**, and the reservoir diagram is what misleads you.\n\nHere is why, in the numbers you already have. The atmosphere loses 210 GtC a year -- but it also **gains** about 210 GtC a year, because plants die and respire and the ocean gives carbon back. Those two enormous flows nearly cancel. So a molecule leaves quickly, and **another arrives to replace it almost immediately**.\n\nWhat decides how long an *excess* lasts is not the big two-way traffic. It is the small **imbalance** between them -- and that is a completely different number, several times smaller than either flux.\n\nA shop analogy makes it plain. A busy baker's sells 210 loaves a year out of 875 on the shelves, so the average loaf stays four years. Now put 300 extra loaves on the shelf. Do they clear in four years? Only if the shop can sell **faster** than it restocks. If deliveries keep pace with sales, the extra 300 just sit there while the individual loaves come and go.\n\nSo **two different questions have two different answers**: how long does one atom stay, and how long does an excess last. The first is this lesson. The second is Level 3, and it is the chemistry of the ocean that decides it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "One atom's stay is not an excess's lifetime. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A student works out that the atmosphere's residence time is 4.2 years and concludes: *\"So if we stopped all emissions today, the extra CO₂ would be out of the air within about five years.\"*\n\nThe arithmetic is right. Is the conclusion?",
            options: [
                { id: 'right', label: "No. 4.2 years is how long one molecule stays before being swapped for another. The excess only falls as fast as the small imbalance between the 210 GtC leaving and the 210 arriving, which is a much smaller number.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- the whole atmosphere's carbon turns over in about four years, so anything added must be gone in about that time.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The whole atmosphere's carbon **does** turn over in about four years. That is exactly why the conclusion does not follow, and it is worth being slow about, because this is one of the most widely repeated mistakes in the subject.\n\nTurning over means **swapping**, not **removing**. Each year about 210 GtC leaves the air and about 210 GtC comes back. A molecule you put in today is very likely gone within a few years -- and it has been replaced by one returning from a leaf or the sea. The **amount** in the air has not changed at all.\n\nSo picture what has to happen for an excess to drain away. Not fast traffic -- the traffic is already fast. What is needed is for the outgoing flow to **exceed** the incoming one, and keep exceeding it. Today it does, by roughly **5 GtC a year** out of 210: the ocean and the land together take up a little more than they give back.\n\nWork with that number instead and the picture changes completely. An excess of around 300 GtC against a net uptake of about 5 GtC a year is a matter of **many decades** for the readily absorbed part -- and the last portion takes far longer still, because the ocean's chemistry runs out of the carbonate it needs.\n\nThe general lesson is worth more than the carbon. **A residence time tells you how fast a store is stirred, not how fast a change to it fades.** A crowded railway station replaces everybody in it every twenty minutes; that tells you nothing about how long it takes to clear an extra thousand people if trains keep arriving as fast as they leave.",
            options: [
                { id: 'retry', label: "Turnover is swapping. An excess needs a net imbalance.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- and it is worth stating the general form, because it goes far beyond carbon. **A residence time tells you how fast a store is stirred, not how fast a change to it fades.**\n\nA railway station might replace everybody inside it every twenty minutes. That says nothing about how long an extra thousand people take to clear, if trains keep arriving as fast as they leave.\n\nSo the two numbers to keep apart:\n\n- **Residence time = reservoir / flux out.** How long an average atom stays. For the air, **4.2 years**.\n- **How long an excess lasts = excess / net imbalance.** With about 300 GtC of excess and roughly 5 GtC a year of net uptake, that is **many decades** for the easily absorbed part, and much longer for the rest.\n\nAnd the chemistry is what sets that second number, which is why this is a chemistry lesson and not just bookkeeping. The ocean takes up extra CO₂ by the reaction you met earlier:\n\n**CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻**\n\nRead the left-hand side. Every CO₂ the ocean absorbs **uses up a carbonate ion**. So the more the ocean takes, the less carbonate it has left, and the less willing it becomes to take the next lot. **The appetite falls as it feeds.**\n\nThat is a genuine chemical limit rather than a matter of stirring, and it is where Level 3 goes.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The appetite falls as it feeds!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You timed the carbon cycle.**\n\n- **residence time = reservoir / flux out**, in GtC divided by GtC/yr, which leaves **years**\n- It is an **average**: some atoms leave at once, some linger, and the average is what lets you compare stores\n- Same relation as L2B19's litter store, **asked backwards** -- there the rates gave the store, here the store gives the time\n- **Atmosphere: 875 / 210 = 4.2 years.** About a quarter of the air's carbon is swapped every year\n- **Deep ocean: 37,000 / 90 = 411 years**, a hundred times longer -- a bigger store **and** a slower exchange\n- Land plants 4.6 years, soil 27 years, surface ocean 10 years. **C21's identical-looking arrows hide a hundredfold spread**\n- Carbon changes **substance** at every step: CO₂ gas, dissolved CO₂, **bicarbonate HCO₃⁻**, a little **carbonate CO₃²⁻**, sugar in a plant, **calcium carbonate CaCO₃** in a shell\n- The ocean holds about **fifty times** the air's carbon not because CO₂ is very soluble but because of **CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻**, which clears the dissolved CO₂ out of the way so more can follow\n- **A residence time tells you how fast a store is stirred, not how fast a change to it fades**\n- The air loses 210 GtC a year and gains about 210, so an added molecule is swapped, not removed. An **excess** falls only as fast as the **imbalance**, about 5 GtC a year\n- So 300 GtC of excess is a matter of **decades and longer**, not of four years\n- Removed: C21's reservoirs and fluxes with no division between them\n- Still standing: every CO₂ the ocean absorbs **uses up a carbonate ion**, so its appetite falls as it feeds -- which means the net uptake is not a constant, and Level 3 takes that apart",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Stirring is not the same as draining!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Cycles Keep Systems Alive?**\n\nC21 drew the boxes and arrows. Level 2 divides one by the other, and finds the diagram was hiding a hundredfold range.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Residence time | **reservoir / flux out** | GtC / (GtC/yr) = years |\n| Atmosphere | 875 / 210 | **4.2 years** |\n| Surface ocean | 900 / 90 | **10 years** |\n| Soil | 1,600 / 60 | **27 years** |\n| Deep ocean | 37,000 / 90 | **411 years** |\n| Carbon's forms | CO₂, **HCO₃⁻**, CO₃²⁻, sugar, CaCO₃ | it changes substance each step |\n| Why the ocean holds so much | CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻ | a bucket of bicarbonate |\n| What 4.2 years is **not** | how long an excess lasts | that needs the **imbalance** |\n| The excess | 300 GtC / about 5 GtC a year | decades, and longer |\n| Still standing | each CO₂ absorbed **uses a carbonate** | so the appetite falls as it feeds |\n\n**The one line to remember:** a residence time tells you how fast a store is stirred, not how fast a change to it fades -- the air swaps a quarter of its carbon every year and can still hold an excess for a century.\n\n**Up next:** B21 had your cells making energy in a cycle that never stops. The same division you just did tells you how much of a head start your body actually has if that cycle pauses."
        }
    };
}
