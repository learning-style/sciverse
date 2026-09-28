import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 18, biology. Biology closes the Big Idea, so
 * this lesson answers the checkpoint L2B18 deliberately could not.
 *
 * L2B18 worked out that a fast stream warmed to 25 C still holds 7.9 mg/L, above
 * the 6 mg/L a trout is said to need -- and the trout died anyway. The supply
 * arithmetic was right. What was assumed is that 6 mg/L never moves.
 *
 * It moves, and it moves further than the supply does. A warmed animal's chemistry
 * runs faster, so its oxygen demand climbs, and the rule of thumb for how fast is
 * empirical and the lesson says so:
 *
 *   demand factor = Q10 ^ (dT / 10),  with Q10 about 2
 *
 * From 10 C to 25 C the supply falls to 0.735 of what it was while the demand rises
 * 2.83-fold, so the margin -- supply divided by demand -- falls to 0.26, about a
 * quarter. And of that squeeze, only 23% comes from the water holding less. The
 * story everyone tells is the smaller half.
 *
 * This is a Mechanism lesson that needs all three disciplines: solubility is C18's
 * chemistry, aeration is P18's flow, and metabolic rate is the biology.
 *
 * Still standing: Q10 is an empirical rule of thumb, not a derivation, and it says
 * nothing about a fish acclimatising over weeks or about the gills' own limit.
 */
export function getL3B18Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B18 left an argument unfinished, and it is worth stating exactly.\n\nA factory warms a **fast** trout stream from 10 °C to 25 °C. Fast water keeps mixing air in, so it stays at 95% of saturation. The arithmetic is not in doubt:\n\n- At 10 °C: 11.3 x 0.95 = **10.7 mg/L**\n- At 25 °C: 8.3 x 0.95 = **7.9 mg/L**\n\nThe trout is said to need **6 mg/L**. 7.9 is comfortably above 6. **And the trout die.**\n\nSo either oxygen is not the problem, or the 6 mg/L is not a constant. And notice how the whole chain so far has quietly assumed it is a constant: B18 said warm water holds less oxygen, L2B18 put numbers on how much less, and both treated the fish as a fixed requirement sitting there waiting to be starved.\n\nBut a fish is not a number. What happens inside a trout when its water warms by fifteen degrees?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Everything inside it runs faster, so it needs more oxygen than before -- the requirement rises as the supply falls.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nothing much -- a trout is cold-blooded, so it takes the temperature of the water and carries on as before.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It does take the temperature of the water -- that part is right, and it is precisely why it cannot carry on as before.\n\nA trout has no thermostat. Every chemical reaction in its body happens at whatever temperature the river is, and **reactions go faster when they are warmer**. You met this in C27: warmth makes molecules collide more often, so enzymes get through more work per second. That lesson was about digesting a meal. This is the same fact arriving as a problem.\n\nSo a trout at 25 °C is not a trout at 10 °C in warmer surroundings. It is a trout whose entire chemistry has been turned up. Its heart beats faster, it digests faster, its gills work harder, it burns fuel faster -- and every bit of that burning needs **oxygen**.\n\nThe fish did not choose any of this and cannot switch it off. A mammal that gets too warm sweats and slows down. A trout simply runs hot.\n\nWhich means the gap we are watching has **two** moving sides, and L2B18 only measured one of them.",
            options: [
                { id: 'cont', label: "So how much more oxygen does a warmed fish need?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "There is a rule of thumb for it, and its status matters.\n\n**Q10** is the factor by which a biological rate changes for a **10 °C** rise. For most animal metabolism it is between 2 and 3; take **Q10 = 2**, meaning the rate roughly doubles every ten degrees:\n\n**demand factor = Q10 ^ (ΔT / 10)**\n\n**This is empirical.** Nobody derives Q10 = 2 from chemistry -- it is what measurement gives across a great many organisms, and it holds only over the range an animal can actually tolerate. Treat it as a well-supported summary of data, not a law.\n\nNow put the two sides in the same units so they can be compared. Define the **margin** as what is available divided by what is needed:\n\n**margin = dissolved oxygen / demand factor**\n\nAt the starting temperature the demand factor is 1 by definition, so the margin starts as simply the oxygen present. Above that, every degree does two things at once:\n\n- **Supply falls**, because saturation falls, so what the water offers drops -- that is C18's chemistry, and how close you get to saturation is P18's flow.\n- **Demand rises**, by Q10 -- that is the biology.\n\nTwo curves closing on each other, and the margin is the distance between them.",
            options: [
                { id: 'cont', label: "Work the factory's stream out properly.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The same stream, 10 °C to 25 °C, still at 95% saturation.**\n\n**Supply:**\n- 10 °C: 11.3 x 0.95 = 10.7 mg/L\n- 25 °C: 8.3 x 0.95 = 7.9 mg/L\n- **Supply factor: 7.9 / 10.7 = 0.735** -- down by about a quarter\n\n**Demand:** ΔT = 15 °C, so 2^(15/10) = 2^1.5 = **2.83**\n- **Demand factor: 2.83** -- nearly three times as much oxygen wanted\n\n**Margin:**\n- At 10 °C: 11.3 / 1 = **11.3**\n- At 25 °C: 8.3 / 2.83 = **2.93**\n- **2.93 / 11.3 = 0.26**\n\n**The margin falls to about a quarter.** That is what killed the trout, and nothing in L2B18's sum could see it, because L2B18 only watched the numerator.\n\nNow split the blame, because this is the finding worth carrying away. The margin fell by a factor of 0.26. Supply contributed 0.735 of that; demand contributed 1/2.83 = 0.354. Multiply them: 0.735 x 0.354 = 0.26, which checks.\n\nCompare the two as proportions of the total squeeze and **about 23% of it is the water holding less oxygen, and about 77% is the fish needing more**.\n\nSo \"warm water holds less oxygen\" -- the explanation B18 gave, and the one almost everybody gives -- is true, and it is the **smaller quarter** of the real story.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A pool warms from **15 °C to 25 °C**, and stays at 80% saturation throughout. Saturation is 10.1 mg/L at 15 °C and 8.3 at 25 °C. Take Q10 = 2.\n\nBy what factor does the **margin** change?",
            options: [
                { id: 'right', label: "About 0.41. Supply goes 8.08 to 6.64, a factor of 0.82; demand doubles; and 0.82 / 2 = 0.41.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'supply_only', label: "About 0.82, since the oxygen falls from 8.08 to 6.64 mg/L.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "About 0.32, from the supply factor 0.82 minus the demand doubling of 0.5.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**0.82** is the supply factor alone -- the same mistake L2B18 made, and the whole point of this lesson is that it is the smaller half. A ten-degree rise doubles the demand, and leaving that out makes a lethal change look survivable.\n\n**Subtracting** is the more understandable slip, and it is worth being clear why it is wrong. These are **factors**, not amounts. Supply became 0.82 **times** what it was; demand became 2 times. A ratio of two things that have each been scaled is the ratio of their scalings, so the factors **divide**:\n\nmargin factor = 0.82 / 2 = **0.41**\n\nCheck it the long way if you like. Margin at 15 °C: 8.08 / 1 = 8.08. Margin at 25 °C: 6.64 / 2 = 3.32. And 3.32 / 8.08 = **0.41**. Same answer.\n\nSo ten degrees costs this pool nearly **60%** of its margin -- and only about a fifth of that loss is the water holding less.",
            options: [
                { id: 'retry', label: "Factors divide -- supply over demand.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Water Temperature** moves both curves at once; **Q10** says how steeply the demand curve climbs, and 2 to 3 is the honest range.\n\nAt 95% saturation, with Q10 = 2 and 10 °C as the reference:\n\n| Temp | Supply | Demand | Margin | Share of 10 °C |\n| --- | --- | --- | --- | --- |\n| 10 °C | 10.7 | x1.00 | 11.3 | **100%** |\n| 15 °C | 9.6 | x1.41 | 7.14 | **63%** |\n| 20 °C | 8.6 | x2.00 | 4.55 | **40%** |\n| 25 °C | 7.9 | x2.83 | 2.93 | **26%** |\n| 30 °C | 7.2 | x4.00 | 1.90 | **17%** |\n\nLook down the supply column and then the margin column. Supply falls gently, by about a third across the whole range. The margin falls off a cliff, to a sixth.\n\nAnd now Q10 earns its place in the lesson, because it is the one number here you cannot look up for a particular fish with any confidence. At **Q10 = 3** the 25 °C demand factor is 3^1.5 = 5.2 rather than 2.83, and the margin falls to **15%** instead of 26%. So the difference between a trout that just survives a hot August and one that does not can sit inside the uncertainty of a rule of thumb -- which is exactly why this is presented as a rule of thumb.\n\nAnd there is a practical consequence, the same one L2B18 pointed at from the other side. You cannot cool a river. You can **aerate** it -- weirs, riffles, stones to tumble over -- and that raises the percent saturation, which is P18's flow doing the work. But aeration can only ever push the supply towards its ceiling, and the ceiling itself is falling. Against a demand that has nearly tripled, the very most aeration can offer is the gap between 95% and 100%.\n\nWhich is to say: **aeration cannot save a river that has been warmed enough.** The arithmetic closes that door before you start.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Supply falls gently, the margin collapses. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two proposals for the warmed stream, each costing the same.\n\n- **A:** build a series of weirs and riffles through the warmed stretch, raising it from 95% to a genuine **100%** of saturation.\n- **B:** cool the discharge before it enters, so the stretch sits at **20 °C** instead of 25 °C, still at 95%.\n\nTake Q10 = 2. Which buys the trout more margin?",
            options: [
                { id: 'right', label: "B, and by a long way. A lifts the margin from 2.93 to 3.08, about 5%. B lifts it to 4.55, more than half again -- because it moves the demand as well as the supply.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "A, because aerating attacks the problem directly: the trout is short of oxygen, so put oxygen in.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It is the intuitive answer, and it is why aeration gets built. Run both numbers.\n\n**A, aerate to 100% at 25 °C:** supply 8.3 x 1.00 = 8.3 mg/L; demand still 2.83. Margin = 8.3 / 2.83 = **2.93**... which is barely different from 2.93 -- let us be exact: 8.3/2.83 = 2.93 against 7.9/2.83 = 2.79. A gain of about **5%**.\n\n**B, cool to 20 °C at 95%:** supply 9.1 x 0.95 = 8.6 mg/L; demand 2^(10/10) = 2.00. Margin = 8.6 / 2.00 = **4.31**. A gain of over **50%**.\n\nWhy so lopsided? Because aeration can only work on the **percentage**, and the percentage was already 95 -- there are five points of headroom in the whole world, and nothing aeration does can lift water above its saturation ceiling.\n\nCooling works on **both** terms. It raises the ceiling *and* it lowers the demand, and because the demand term is the steeper of the two, that second effect is where most of the benefit comes from.\n\nThis is the practical shape of the whole lesson. If you only know that warm water holds less oxygen, aeration looks like the answer, and rivers get weirs built in them that do not save the fish. Once you can see both ends of the squeeze, the ranking is obvious and it is not close: **deal with the temperature**.",
            options: [
                { id: 'retry', label: "Aeration only moves the percentage. Cooling moves both terms.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- and the reason is worth saying plainly. Aeration has a **ceiling it cannot pass**, and the stream was already at 95% of it. Cooling moves the ceiling *and* the demand, and demand is the steeper term.\n\nSo Big Idea 18 closes with its three disciplines doing three different jobs on one question:\n\n- **Physics (P18, L2P18, L3P18):** how much water there is, how fast it moves, and how it mixes air in. That sets the **percent saturation** -- and the tilt-driven corkscrew of L3P18 is part of the same story, because it is what makes a bend deep, slow and poorly mixed on the inside.\n- **Chemistry (C18, L2C18, L3C18):** what water can hold. **Saturation** falls with temperature, which sets the **ceiling** -- the same solubility thinking that made flood water barely more dilute.\n- **Biology (B18, L2B18, this lesson):** what the animal needs, which is not a constant. It rises with temperature by roughly **Q10**, and it rises faster than the supply falls.\n\nAnd the finding that ties them: of the squeeze that kills a trout in a warmed stream, about **23% is the water holding less oxygen and 77% is the fish needing more**. The explanation everyone reaches for is the smaller quarter.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Twenty-three percent chemistry, seventy-seven percent fish.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured the end of the gap nobody counts.**\n\n- L2B18's sum was right and its conclusion was wrong: 7.9 mg/L is above 6, and the trout still died\n- The error was treating **6 mg/L as a constant**. A trout has no thermostat, so its whole chemistry runs at river temperature\n- **demand factor = Q10^(ΔT/10)**, with Q10 about 2 -- **empirical**, measured across many organisms, valid only over a tolerable range\n- **margin = dissolved oxygen / demand factor**, which puts both sides in one number\n- 10 °C to 25 °C: supply x**0.735**, demand x**2.83**, so margin x**0.26** -- down to about a quarter\n- Factors **divide**, they do not subtract: 0.735 / 2.83, or equivalently 0.735 x 0.354\n- Splitting the squeeze: about **23%** is the water holding less, about **77%** is the fish needing more\n- Supply falls gently across 10-30 °C, by a third. The margin falls to a **sixth**\n- **Q10 = 3** instead of 2 takes the 25 °C margin from 26% to **15%**, so survival can sit inside the uncertainty of a rule of thumb\n- **Aeration cannot rescue a warmed river**: it only moves the percentage, and 95% leaves five points of headroom. Cooling moves the ceiling **and** the demand\n- Removed: B18's and L2B18's fixed requirement, and \"warm water holds less oxygen\" as the whole explanation\n- Still standing: **Q10 is a rule of thumb, not a derivation**. It says nothing about a fish **acclimatising** over weeks, and nothing about whether the gills themselves become the limit first",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The smaller quarter is the story everyone tells!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Rivers Shape the Land?**\n\nThree levels, and the same river each time. Level 1 gave the rules, Level 2 measured them, Level 3 asked why they were true and where they break.\n\n**Summary Table:**\n| | Physics | Chemistry | Biology |\n| --- | --- | --- | --- |\n| **Level 1** | Fast erodes, slow deposits | Water dissolves rock | Fish live in zones |\n| **Level 2** | **Q = w x d x v** = 9.6 m³/s | **load = C x Q** = 124 t/day | **O₂ = sat x %** = 5.8 mg/L |\n| **Level 3** | **Δh = v²w/(gR)** = 4.4 cm | **C = aQ^b**, b ≈ -0.1 | **margin = O₂ / Q10^(ΔT/10)** |\n| **What Level 3 removed** | \"like a car on a turn\" | concentration set by the rock | the fixed 6 mg/L |\n| **The mechanism** | a tilt, and a corkscrew | more surface, less time, a ceiling | demand climbs faster than supply falls |\n| **The number that decides** | tilt goes as **v²** | load goes as **Q^0.9** | margin falls to **26%** |\n| **Still standing** | how the first bend starts | **b** is measured, not derived | **Q10** is a rule of thumb |\n\n**The one line to remember:** a warmed trout is not starved because its water holds less oxygen -- that is under a quarter of it -- but because a warmed fish burns nearly three times as much, and no amount of aeration can outrun a demand curve that is steeper than the supply curve.\n\n**Where this leaves Big Idea 18:** a river shapes the land by leaning into its own bends and by carrying hills away in solution, and it decides what can live in it by the one dissolved thing its animals cannot do without. Physics moves the water, chemistry decides what the water holds, and biology is where both of those become a question of life or death."
        }
    };
}
