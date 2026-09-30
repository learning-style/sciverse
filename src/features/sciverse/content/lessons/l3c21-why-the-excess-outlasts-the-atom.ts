import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 21, chemistry. A Limit lesson, and the
 * chemistry is the limit itself.
 *
 * L2C21 computed a residence time of 4.2 years for carbon in the air and warned
 * that this is not how long an excess lasts, because the big fluxes run both ways
 * and nearly cancel. It could say the excess drains at the rate of the imbalance
 * and could not say why the imbalance is so small, nor why it shrinks.
 *
 * The answer is one reaction and one number. Seawater absorbs CO2 by
 *
 *   CO2 + H2O + CO3 2- -> 2 HCO3-
 *
 * which consumes a carbonate ion every time. Carbonate is the scarce species -- about
 * 1 part in 200 of the ocean's dissolved carbon -- so the ocean's ability to take
 * more CO2 depends on a small reserve that absorbing CO2 destroys. The consequence
 * is measured as the Revelle factor, about 10 today: a 1% rise in the ocean's total
 * dissolved carbon needs a 10% rise in the CO2 pressure above it.
 *
 * So the ocean holds 50 times the air's carbon and still takes up only about a
 * tenth of what its size suggests, and gets worse at it as it absorbs. 300 GtC of
 * excess against about 5 GtC a year of net uptake is roughly 60 years for the easy
 * part, and the rest waits on rock weathering over millennia.
 *
 * Still standing: the Revelle factor is measured rather than derived here, and this
 * treats the ocean as one well-mixed body when in truth the surface saturates in
 * about a decade and the deep ocean takes centuries to turn over.
 */
export function getL3C21Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C21 ended on a puzzle it could state and not solve.\n\nA carbon atom stays in the air about **4.2 years** -- 875 **GtC** -- gigatonnes of carbon -- divided by 210 GtC a year. And an **excess** of carbon dioxide lasts for centuries. Both are true, and the reconciliation was that the big flows run both ways: 210 GtC leaves the air each year and about 210 comes back, so a molecule is swapped rather than removed, and only the small **imbalance** actually drains an excess.\n\nThat left two questions unanswered, and they are chemistry rather than bookkeeping.\n\nSo the question behind this lesson is why the **excess outlasts** the atom -- why a molecule leaves in four years and the surplus stays for centuries. Two halves to it, and both are chemistry rather than bookkeeping.\n\n**Why is the imbalance so small?** The ocean holds about **50 times** as much carbon as the air. If it is that vast and that willing, why does it take up only about 2 GtC of our emissions a year rather than swallowing the lot?\n\n**And why does it get worse?** Measurements show the ocean absorbing a **smaller fraction** of what we emit as time goes on, even though it is nowhere near full.\n\nBoth answers are in one reaction, which L2C21 introduced and did not push:\n\n**CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻**\n\nRead the left-hand side carefully. To absorb one molecule of CO₂, the sea must spend one **carbonate ion**, CO₃²⁻.\n\nYour two dials are the two numbers that decide how fast an excess drains.\n\n- **Excess Carbon** in the air, in GtC above the pre-industrial amount.\n- **How Reluctant the Sea Is**, a measured quantity called the **Revelle factor** -- the number this lesson is about.\n\nSo: if absorbing CO₂ spends carbonate, what happens as the ocean keeps absorbing?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It runs short of carbonate, so it gets less able to take the next lot -- the appetite falls as it feeds.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nothing much -- the ocean is enormous, so it cannot run short of anything.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The ocean is enormous, and the reactant it needs is **scarce**. Those are both true, and the second is what matters.\n\nHere is the composition of the ocean's dissolved carbon, and it is not what most people expect:\n\n| Species | Share of dissolved carbon |\n| --- | --- |\n| **Bicarbonate**, HCO₃⁻ | about **89%** |\n| **Carbonate**, CO₃²⁻ | about **10%** |\n| **Dissolved CO₂** | about **0.5%** |\n\nSo the sea is overwhelmingly a solution of **bicarbonate**, which is the product of the reaction and no use for absorbing more. The reactant it actually needs, carbonate, is a tenth of the pool -- and the free CO₂ is a rounding error.\n\nNow the trap. That 10% sounds like plenty, and the ocean's total carbon is around 38,000 GtC, so the carbonate amounts to thousands of gigatonnes. But the sea does not absorb CO₂ with all of its carbonate at once: only the **surface layer** is in contact with the air, and that layer holds about 900 GtC. Its carbonate is what is available on any human timescale, and the deep ocean's vast reserve takes **centuries** to come up and take its turn.\n\nSo the question is not whether the ocean is big. It is **how much carbonate is within reach**, and how quickly using it up makes the next absorption harder. That second part has a measured name.",
            options: [
                { id: 'cont', label: "So how much harder does it get?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "It is measured by a single number, and it has an awkward name for a simple idea: the **Revelle factor**.\n\n**The Revelle factor says how much harder you have to push to get a little more carbon into the sea.** Precisely: a rise of 1% in the ocean's total dissolved carbon requires the CO₂ pressure above it to rise by the Revelle factor per cent.\n\nToday it is about **10**. So squeezing 1% more carbon into the surface ocean takes a **10%** rise in atmospheric CO₂.\n\nIf the chemistry were simple -- if CO₂ just dissolved like sugar in tea -- the factor would be about 1, and the ocean would absorb roughly in proportion to how much you offered it. At 10, **the ocean takes up about a tenth of what its size alone would suggest.**\n\nAnd here is why the factor is not 1. When CO₂ enters the sea it does not stay as CO₂: the reaction converts it, along with a carbonate ion, into two bicarbonates. So each absorption:\n\n- **adds** to the total dissolved carbon, and\n- **removes** a carbonate ion, which was the thing that made absorption possible.\n\nThe ocean is consuming its own capacity as it works. Which means the Revelle factor **rises** over time -- it was nearer 8 before industrialisation and is heading past 12 in some regions.\n\nAnd the draining of an excess follows:\n\n**time for an excess to drain ≈ excess / net uptake each year**\n\nwhere the net uptake is small **because** the Revelle factor is large.\n\n**The condition:** this treats the ocean as one body. In truth the surface saturates within about a decade and then must wait for slow mixing to bring fresh carbonate up from below.",
            options: [
                { id: 'cont', label: "Put real numbers on the draining.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The excess today is roughly 300 GtC above the pre-industrial atmosphere**, and land and ocean between them take up a net **5 GtC a year** more than they give back.\n\n1. **Time to drain the readily absorbed part:** 300 / 5 = **60 years**\n\nSo if emissions stopped, the easily absorbed portion of the excess would be gone in something like six decades -- not the 4.2 years L2C21's residence time seemed to promise, and not for ever either.\n\nBut \"the readily absorbed part\" is doing a great deal of work in that sentence, and the chemistry says what is left.\n\n**What happens after the surface ocean has had its turn.** Within a decade or two the surface layer has used the carbonate within reach and comes into balance with the air. Further uptake then waits on the ocean **turning over** -- deep water rising, surface water sinking -- which L2C21 measured at about **411 years**. So the next slice of the excess drains on a timescale of centuries.\n\n**And the last slice waits on rock.** Carbon dioxide dissolved in rainwater slowly attacks silicate rock, and the products wash to the sea and eventually become limestone. That is the only process that removes carbon permanently, and it works on a timescale of **tens to hundreds of thousands of years**.\n\nSo the honest answer to \"how long does an excess last?\" is three answers at once:\n\n| Part of the excess | Removed by | Timescale |\n| --- | --- | --- |\n| Roughly half | land plants and the surface ocean | **decades** |\n| Much of the rest | the deep ocean turning over | **centuries** |\n| The final part | rock weathering into limestone | **many millennia** |\n\nAnd all three are consistent with a carbon atom staying in the air 4.2 years. **The atoms are swapped constantly; the amount comes down slowly.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Suppose the Revelle factor rose from **10** to **15** as the ocean kept absorbing, and that the net uptake falls in proportion -- from 5 GtC a year to about **3.3**.\n\nWith an excess of **300 GtC**, how long would the readily absorbed part now take to drain?",
            options: [
                { id: 'right', label: "About 90 years, up from 60. 300 / 3.3 = 91.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'scaled_wrong', label: "About 40 years -- a higher Revelle factor means faster uptake.", nextNodeId: 'math_wrong' },
                { id: 'unchanged', label: "Still 60 years, because the excess has not changed.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**A higher Revelle factor meaning faster uptake** has the number backwards, and it is worth fixing firmly because the name gives no hint of direction. The Revelle factor measures **reluctance**: how much harder you must push for a little more carbon. A bigger number means the sea is **less** willing, so uptake is **slower** and draining takes **longer**.\n\n**Still 60 years** keeps the excess and forgets that the answer depends on both numbers. The excess is on the top and the uptake on the bottom; halving the uptake doubles the time whatever the excess is.\n\n**300 / 3.3 = 91 years**, up from 60.\n\nAnd this is the part of the chemistry that makes the problem unlike most others. The rate of removal is **not a constant**. The ocean absorbs, its carbonate falls, the Revelle factor rises, and the next tonne is harder to place than the last. So an excess does not decay at a steady rate the way a hot cup of tea cools -- **it decays more and more slowly**, because the thing doing the absorbing is being used up.\n\nA hot drink cooling in a cold room gets rid of heat at a rate that falls as it approaches the room's temperature, and reaches it. This is worse: the room is warming up as the drink cools.",
            options: [
                { id: 'retry', label: "A bigger Revelle factor means slower uptake, so longer.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Excess Carbon** in GtC and **How Reluctant the Sea Is**, which is the Revelle factor.\n\n| Excess | Revelle factor | Net uptake | Time to drain the easy part |\n| --- | --- | --- | --- |\n| 150 GtC | 8 | 6.3 GtC/yr | **24 years** |\n| 300 GtC | 8 | 6.3 GtC/yr | **48 years** |\n| 300 GtC | 10 | 5.0 GtC/yr | **60 years** |\n| 300 GtC | 15 | 3.3 GtC/yr | **90 years** |\n| 600 GtC | 15 | 3.3 GtC/yr | **180 years** |\n\nThe two dials do not act alike, and the difference is the chemistry.\n\n**Doubling the excess doubles the time.** That is simple proportion, and it is the part anyone would guess.\n\n**Raising the Revelle factor also lengthens the time** -- but this dial is not independent of the other one, and that is the trap. **Absorbing carbon is what raises the Revelle factor.** So the two dials are linked: a larger excess, once absorbed, leaves a sea less able to absorb the next lot. Move the top dial and the bottom one follows you.\n\nWhich is a genuinely awkward kind of problem, and worth naming. Most sinks we deal with are passive: a drain empties a bath at a rate set by the plughole, whatever has already gone down it. **This sink is consumed by its own work.** A closer analogy is a sponge that hardens as it soaks: the first litre goes in easily, and the tenth barely at all.\n\nAnd one consequence is worth stating plainly, because the arithmetic gives it and intuition does not. **Emitting slowly is not merely gentler than emitting quickly -- it is chemically different.** Carbon released over centuries meets a sea that keeps being resupplied with carbonate from below. The same carbon released in decades meets a surface layer whose carbonate is already spent.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "A sink consumed by its own work. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A proposal: since the ocean holds about **50 times** the carbon of the atmosphere and is nowhere near saturated, we could solve the problem by helping CO₂ dissolve faster -- spraying seawater into the air, or bubbling air through the surface to speed up the transfer.\n\nWhat does the chemistry say about this?",
            options: [
                { id: 'right', label: "It attacks the wrong step. Transfer across the surface is not what limits uptake -- the shortage of carbonate is, measured by the Revelle factor of 10. Speeding up the contact does not give the sea more carbonate.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It should work -- more contact between air and water means more CO₂ dissolving, and the ocean has plenty of room.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the most useful mistake in the lesson, because it is the one that separates a **rate** problem from a **capacity** problem, and the two need completely different fixes.\n\nAsk what is actually slowing things down. If CO₂ were queuing at the sea surface unable to get in, then stirring, spraying and bubbling would all help -- that is a transfer problem, and transfer problems yield to agitation.\n\nBut the surface ocean is already **close to balance** with the air. Gas exchange across the sea surface takes about a year to equilibrate the surface layer, which is fast compared with everything else here. The CO₂ is getting in perfectly well. What it cannot find, once inside, is a **carbonate ion to react with** -- and the Revelle factor of 10 is the measurement of exactly that shortage.\n\nSo spraying seawater about would be like widening the doorway of a shop that has run out of stock. The queue was never the problem.\n\nAnd the chemistry points at what **would** work, which is why this is worth getting right. To increase uptake you must **supply the missing reactant**, which means adding something alkaline that generates carbonate. Grinding up silicate rock or limestone and adding it to the sea does exactly that, and it is a serious proposal for that reason -- it attacks the carbonate shortage rather than the contact.\n\nThe scale is daunting: you would need rock in quantities comparable to global mining. But it is at least aimed at the step that is limiting, which is the first test any proposal has to pass.",
            options: [
                { id: 'retry', label: "It is a capacity problem, not a transfer problem.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- and telling a **capacity** problem from a **transfer** problem is the most transferable thing in this lesson. Widening the doorway of a shop that has run out of stock does nothing for the queue.\n\nThe surface ocean equilibrates with the air in about a year, so getting CO₂ in is not the slow step. Finding a carbonate ion to react with is, and the Revelle factor of **10** is the measurement of that shortage. Which also tells you what would help: **supply the missing reactant**, by adding alkaline rock to the sea. The quantities needed are comparable to global mining, but at least it is aimed at the limiting step.\n\nSo L2C21's puzzle is fully resolved:\n\n- **An atom stays 4.2 years**, because 210 GtC leaves the air each year and 210 returns. Atoms are swapped.\n- **An excess lasts far longer**, because it drains only at the **imbalance**, about 5 GtC a year.\n- **The imbalance is small because carbonate is scarce.** Absorbing one CO₂ spends one CO₃²⁻, and carbonate is a tenth of the ocean's dissolved carbon -- of which only the surface layer's share is within reach.\n- **And it shrinks**, because absorbing is what destroys the capacity. The Revelle factor was near 8 and is now about 10.\n- **So the excess drains in three stages**: decades for the easy part, centuries as the deep ocean turns over, and many millennia for the last of it to become limestone.\n\nAnd notice how this compares with L3P21. There, a cycle's period was fixed by orbits and nothing on Earth could alter it. Here the cycle's rate is set by a **chemical reaction whose reactant is being consumed**, so the cycle itself is slowing down. Two cycles, and only one of them is reliable.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A sink consumed by its own work!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the chemistry behind L2C21's puzzle.**\n\n- To absorb one CO₂, seawater must spend one **carbonate ion**: **CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻**\n- The ocean's dissolved carbon is about **89% bicarbonate**, **10% carbonate** and only **0.5% dissolved CO₂** -- it is a bicarbonate solution, and the reactant it needs is the scarce part\n- Worse, only the **surface layer's** carbonate is within reach; the deep ocean's vast reserve takes centuries to come up\n- The **Revelle factor** measures the reluctance: a 1% rise in the ocean's dissolved carbon needs the CO₂ pressure to rise by that many per cent. Today about **10**\n- If CO₂ merely dissolved like sugar the factor would be about 1, so **the ocean takes up roughly a tenth of what its size suggests**\n- And it **rises as the sea absorbs** -- near 8 before industrialisation, about 10 now, past 12 in places -- because absorbing destroys the carbonate that made absorbing possible\n- **time to drain an excess ≈ excess / net uptake**, and the net uptake is small **because** the Revelle factor is large\n- 300 GtC of excess at 5 GtC a year is about **60 years** for the readily absorbed part\n- Then **centuries** as the deep ocean turns over -- L2C21's 411 years -- and **many millennia** for the last of it to weather rock into limestone\n- All of which is consistent with an atom staying 4.2 years: **the atoms are swapped constantly and the amount comes down slowly**\n- **This sink is consumed by its own work**, like a sponge that hardens as it soaks, so an excess decays more and more slowly\n- Which means **emitting slowly is chemically different from emitting quickly**, not merely gentler\n- A **capacity** problem is not a **transfer** problem: spraying seawater about widens the doorway of a shop with no stock. Supplying alkaline rock attacks the limiting step\n- Removed: L2C21's imbalance, named but unexplained\n- Still standing: the **Revelle factor is measured, not derived** here, and this treats the ocean as one body when the surface saturates in about a decade and the deep takes centuries",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The room warms up as the drink cools!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Cycles Keep Systems Alive?**\n\nL2C21 could say that an excess drains at the imbalance. Level 3 says why the imbalance is small, and why it is shrinking.\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| Absorbing CO₂ costs | one **carbonate ion** | CO₂ + H₂O + CO₃²⁻ → 2 HCO₃⁻ |\n| The ocean's carbon is | mostly **bicarbonate** | 89% HCO₃⁻, 10% CO₃²⁻, 0.5% CO₂ |\n| And only the surface's is | within reach | the deep takes centuries |\n| The reluctance | the **Revelle factor** | about **10** today |\n| So the ocean takes | about a **tenth** of what its size suggests | it would be 1 if CO₂ just dissolved |\n| And it **rises** as it absorbs | near 8 before industry, 10 now | the sink consumes itself |\n| Draining an excess | **excess / net uptake** | 300 / 5 = **60 years** |\n| Then | the deep ocean turning over | **centuries** |\n| And finally | weathering rock into limestone | **many millennia** |\n| The distinction that matters | **capacity**, not **transfer** | spraying seawater does nothing |\n| Still standing | Revelle is **measured, not derived** | and the ocean is not one body |\n\n**The one line to remember:** seawater absorbs carbon dioxide by spending a carbonate ion, and carbonate is the scarce tenth of its dissolved carbon -- so the ocean takes up a tenth of what its size promises, gets worse at it as it works, and an excess drains in decades, then centuries, then millennia.\n\n**Up next:** B21 closes the Big Idea. L2B21 found a five-minute reserve of ATP and asked what signal could possibly keep it from running out. The answer turns the smallness of that reserve from a weakness into the reason the system works."
        }
    };
}
