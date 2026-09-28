import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 18, chemistry. A Limit lesson: it takes the
 * rule L2C18 handed over and shows where it breaks.
 *
 * C18 and L2C18 both treated a river's concentration as a property of its rock --
 * limestone gives a high reading, granite a low one. That is the simplification
 * this lesson removes, because it predicts something false. If concentration
 * belongs to the rock, then adding ten times the water must dilute it to a tenth.
 * Rivers do not do that. Concentration barely moves.
 *
 *   C = a Q^b,  stated as an empirical law, because it is one
 *
 * Pure dilution would be b = -1. Weathering-derived solutes sit near b = -0.1, so
 * a tenfold rise in discharge cuts concentration only to 0.79 of what it was while
 * the load rises 7.9-fold. The lesson has the learner try values of b and find
 * which one the data matches, rather than being handed the answer.
 *
 * The reason is a competition: more water means more rock contacted, but also less
 * time in contact, and the water is already close to the most it can hold.
 *
 * Still standing: b is measured, not derived -- nothing here predicts -0.1 from
 * first principles. And the near-saturation argument assumes the water has had time
 * to approach equilibrium with its mineral, which a flash flood denies it.
 */
export function getL3C18Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C18 left you with a tidy picture. A river's **concentration** is set by the rock it drains: limestone dissolves easily, so 150 mg/L; granite resists, so 30 mg/L. Multiply by the **discharge** and you have the tonnes.\n\nThat picture makes a prediction, and it is worth taking seriously enough to test.\n\nIf 150 mg/L is what the rock gives, then the rock is supplying a fixed amount of dissolved material. Send **ten times as much water** down the same valley and that fixed amount is spread through ten times the volume. The concentration should fall to **15 mg/L**. Flood water should come out almost pure.\n\nEvery river gauge in the world disagrees. Measure a river through a flood -- discharge up tenfold -- and the concentration typically falls to something like **120 mg/L**. Not 15. It barely moves.\n\nSo the tidy picture is wrong somewhere. Where?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The rock cannot be supplying a fixed amount -- more water must be dissolving more rock, roughly keeping pace with itself.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The flood measurements must be picking up mud and silt, which is not dissolved material at all.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A fair suspicion, and worth ruling out properly rather than waving away -- because mud really does arrive in floods, in enormous quantities.\n\nBut it is ruled out by how the measurement is made. A **dissolved** concentration is measured on water that has been **filtered**: push it through a fine membrane and everything suspended -- clay, silt, fine sand -- stays on the filter. What passes through is what was genuinely in solution. The 120 mg/L is measured downstream of that filter.\n\nAnd there is a cleaner argument still. Suspended mud behaves in exactly the **opposite** way to what you are describing: its concentration rises steeply with discharge, often tenfold or more, because faster water lifts particles it could not lift before. If flood samples were contaminated with mud, the dissolved figure would **rise**, not sit almost still.\n\nSo the observation stands. Ten times the water, and the dissolved concentration falls by about a fifth.\n\nWhich means the rock is **not** handing over a fixed amount. More water is dissolving more rock, almost in proportion. The question is how it manages that.",
            options: [
                { id: 'cont', label: "So more water dissolves more rock. How closely does it keep up?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Close enough that it needs measuring rather than arguing about. The standard way to write it down is a **power law**:\n\n**C = a Q^b**\n\nwhere **C** is concentration, **Q** is discharge, **a** is a constant fixing the scale, and **b** says how sensitive one is to the other.\n\n**This is an empirical law and you should treat it as one.** Nobody derives b = -0.1 from chemistry. It is fitted to measurements, river by river, and it is used because it describes the data well over a wide range of flows -- not because theory demands that shape.\n\nWhat makes it worth writing down is that **b is interpretable**, and the two ends of its range are both things you can reason about:\n\n- **b = -1 is pure dilution.** The rock supplies a fixed mass, the water spreads it out. C falls as fast as Q rises.\n- **b = 0 is perfect keeping-up.** Concentration never changes at all, whatever the flow. This has a name: **chemostatic** behaviour, meaning the chemistry stands still.\n\nAnd there is a second quantity that follows for free, because L2C18 already built it. Load is **C x Q**, so:\n\n**load = a Q^(1+b)**\n\nThe two exponents are locked together. Whatever b turns out to be, the load exponent is 1 + b -- which is how the same measurement answers both questions at once.",
            options: [
                { id: 'cont', label: "So let me find which b the river actually shows.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Try the candidates against the observation.** Our river: 150 mg/L at 9.6 m³/s, and a tenfold flood to 96 m³/s. What does each b predict?\n\n| b | Concentration after | Load after | Verdict |\n| --- | --- | --- | --- |\n| **-1.0** | 15 mg/L | unchanged | pure dilution -- flood water nearly pure |\n| **-0.5** | 47 mg/L | x3.2 | still far too dilute |\n| **-0.2** | 95 mg/L | x6.3 | closer |\n| **-0.1** | **119 mg/L** | **x7.9** | this is what gauges report |\n| **0.0** | 150 mg/L | x10 | perfectly chemostatic |\n\n**b is about -0.1**, and that single number carries the whole finding:\n\n- **Concentration is nearly flat.** Ten times the flow, and 150 becomes 119 -- a fall of a fifth, where the tidy picture demanded a fall of nine tenths.\n- **Load is nearly proportional to flow.** 1 + b = 0.9, so a tenfold flood carries **7.9 times** the dissolved rock.\n\nThat second line is the one that matters for the landscape, and it is why L2C18's sum was worth doing. A few days of flood can move as much dissolved rock as months of ordinary flow -- not because the water is richer, but because there is so much more of it and the richness hardly drops.\n\n**Check it against L2C18's own numbers.** 119 mg/L at 96 m³/s is 11.4 kg/s, which is **987 tonnes a day**, against 124 in fair weather.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A river shows **b = -0.2**. Its discharge rises **a hundredfold** in an extreme flood.\n\nBy what factor does its **dissolved load** change?",
            options: [
                { id: 'right', label: "About 40 times. Load goes as Q^(1+b) = Q^0.8, and 100^0.8 = 10^1.6, which is about 40.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_b', label: "It falls to about 0.4 of what it was, because 100^-0.2 = 0.4.", nextNodeId: 'math_wrong' },
                { id: 'linear', label: "A hundred times, since load is concentration times discharge and the discharge went up a hundredfold.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both answers use one of the two exponents where the other was wanted.\n\n**100^-0.2 = 0.40** is the **concentration** factor, not the load. It says the water becomes about 40% as rich, which is true and is not what was asked.\n\n**A hundredfold** would need b = 0 -- perfectly chemostatic water, with concentration untouched. At b = -0.2 the water does thin out somewhat, so the load cannot keep full pace with the flow.\n\nPut the two together, which is what 1 + b does:\n\n**load factor = 100^0.8**, and 100^0.8 = (10²)^0.8 = 10^1.6 ≈ **40**\n\nSanity-check it by multiplying the halves: the flow is 100 times bigger and the water is 0.40 as rich, so 100 x 0.40 = 40. Same answer, and it shows what 1 + b is really doing -- it is bookkeeping the two effects at once.\n\nSo an extreme flood carries **40 times** the dissolved load. Which is why a single week can matter more to a valley than the rest of the year.",
            options: [
                { id: 'retry', label: "b is for concentration, 1 + b is for load.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Now the why, because -0.1 is a number and not yet an explanation.**\n\nThe two dials are **Flood Factor** -- how many times the ordinary discharge -- and **Exponent b**. Move b and you can watch each story fail or fit.\n\nWhy does nature land near -0.1 rather than -1? Two things fight, and they nearly cancel.\n\n**Pushing concentration down: contact time.** Water racing through a valley in a day has less time against rock than water seeping through over a month. Less time, less dissolved. On its own this would give something like pure dilution.\n\n**Pushing concentration up: contact area.** A flood does not send the same water faster down the same channel. It **wets ground that was dry**: it rises up the banks, floods the soil, moves through cracks and gravels that were above the waterline all summer. Every one of those surfaces is fresh rock the low-flow river never touched.\n\nAnd there is a ceiling helping the balance along. Water that has been in a limestone valley for weeks is close to **saturated** with respect to calcite -- holding nearly the most it can. Such water cannot get much richer no matter how long it sits, so extra contact time was never going to help much. That is why losing contact time costs less than you would expect.\n\nSo: more surface, less time, and a ceiling that caps the benefit of time anyway. The three between them leave concentration nearly flat -- which is the honest content of the word **chemostatic**. Not that nothing is happening, but that two large effects very nearly cancel.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "More surface against less time, with a ceiling. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two solutes are measured in the same river through the same flood, and they behave quite differently.\n\n- **Calcium**, dissolved from limestone: **b = -0.1**\n- **Nitrate**, washed off farmland after fertiliser has been spread: **b = +0.4**\n\nThe nitrate exponent is **positive** -- the flood water is *richer* in it than the ordinary flow. Does that break the chemostatic picture?",
            options: [
                { id: 'right', label: "No -- it shows what the picture depends on. Calcium comes from rock the water is always touching and nearly saturated with; nitrate is sitting on the surface waiting to be washed off, so a flood mobilises a store rather than diluting one.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- if concentration can rise with flow, then the whole idea of dilution against contact is not really a law at all.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "It is not a law, and that is the honest position -- **C = a Q^b** is a description fitted to data, which is what this lesson said when it introduced it. But that is not the same as the two solutes behaving arbitrarily. They differ for a reason you can state in advance.\n\nAsk where each one is kept.\n\n**Calcium is locked in the rock.** The only way out is to dissolve it, which takes contact and time, and the water is already near the most it can hold. So calcium's concentration is governed by a **process at a ceiling** -- and a process at its ceiling cannot be hurried, which is exactly why extra water changes so little.\n\n**Nitrate is lying about loose**, spread on fields, sitting in soil above the summer waterline. Nothing has to dissolve it out of a crystal; it needs only to be **reached**. Ordinary low flow runs beneath it in the channel and never touches it. A flood climbs up and washes it in.\n\nSo a flood **dilutes a saturated solution** and **mobilises a loose store**, and those are opposite things to do. The sign of b tells you which kind of supply you are looking at:\n\n- **b near 0:** dissolved from the rock itself, at or near its ceiling. Chemostatic.\n- **b clearly negative:** a genuinely fixed supply being spread thinner.\n- **b positive:** a store the ordinary river cannot reach, waiting for high water.\n\nThat is why hydrologists read the exponent rather than just the concentration. It says **where the substance is kept** -- and for nitrate it says something uncomfortable, because it means the worst pollution arrives exactly when the river is at its fullest and everything downstream is already under strain.",
            options: [
                { id: 'retry', label: "The sign of b tells me where the substance is stored.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- and that is the most useful thing the exponent does. It does not merely fit the data; it **classifies the source**.\n\n- **b ≈ 0**, chemostatic: dissolved out of rock, near its ceiling, so flow changes little. Calcium, silica, bicarbonate.\n- **b ≈ -1**, diluted: a genuinely fixed input being spread thinner. A steady discharge from a pipe behaves this way, which is one way to spot one.\n- **b > 0**, mobilised: a store the low-flow river never reaches, flushed in by high water. Nitrate, and much of what washes off roads.\n\nSo the same flood, measured for three substances, hands you three different stories about the valley -- and you never had to visit the fields to work out that the nitrate was on the surface.\n\nAnd notice how this settles Big Idea 18's chemistry. C18 asked what was dissolved. L2C18 weighed it: 124 tonnes a day. This lesson says that figure is not a property of the rock at all, but the outcome of a competition -- and that the days when it matters most are the floods, at **987 tonnes a day**, when the water is only slightly thinner and there is a great deal more of it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The exponent tells me where the substance lives.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the limit of \"the rock sets the concentration\".**\n\n- That idea predicts pure dilution: ten times the water, a tenth the concentration. **Rivers do not do this**\n- Real rivers: tenfold flow takes 150 mg/L to about **119**, a fall of a fifth rather than nine tenths\n- **C = a Q^b**, an **empirical** law -- fitted to measurements, not derived. b is measured river by river\n- **b = -1** is pure dilution, **b = 0** is **chemostatic**: concentration standing still whatever the flow\n- Weathering solutes sit near **b = -0.1**, and the dissolved measurement is taken on **filtered** water, so suspended mud is not the explanation\n- Load follows for free: **load = a Q^(1+b)**, so the two exponents are locked together\n- At b = -0.1 a tenfold flood carries **7.9 times** the load: **987 tonnes a day** against L2C18's 124\n- Why -0.1 and not -1: a flood **wets ground that was dry**, gaining surface, while losing **contact time** -- and the water is already near **saturated**, so the lost time was worth little\n- **Chemostatic** does not mean nothing is happening. It means two large effects nearly cancel\n- The **sign of b classifies the source**: near 0 dissolved from rock at its ceiling, negative a fixed supply diluted, positive a loose store the low river cannot reach -- which is why nitrate peaks in floods\n- Removed: C18's and L2C18's concentration as a property of the rock\n- Still standing: **b is measured, not derived** -- nothing here predicts -0.1 from first principles. And near-saturation assumes the water has had **time** to approach its ceiling, which a flash flood denies it",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Two big effects, nearly cancelling!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Rivers Shape the Land?**\n\nL2C18 gave you a concentration and a sum. Level 3 asks what that concentration actually depends on, and finds it is not the rock.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| The tidy picture | C fixed by rock type | Predicts a tenth at tenfold flow |\n| What rivers show | 150 mg/L to **119** | A fall of a fifth, not nine tenths |\n| The description | **C = a Q^b**, empirical | b is fitted, never derived |\n| Pure dilution | b = **-1** | A fixed supply spread thinner |\n| Chemostatic | b = **0** | Concentration standing still |\n| Real weathering | b ≈ **-0.1** | Nearly flat |\n| Load, for free | **a Q^(1+b)** | Exponents locked together |\n| The flood's load | x7.9 | **987 t/day** against 124 |\n| Why nearly flat | more surface, less time, a **ceiling** | Two big effects cancelling |\n| Sign of b | -1, 0, or positive | Tells you **where the substance is kept** |\n| Not derived | the value of **b** | Still standing |\n\n**The one line to remember:** flood water is barely more dilute than fair-weather water, because a rising river wets ground it never normally touches -- so what it loses in contact time it regains in contact area, and the load rises almost in step with the flow.\n\n**Up next:** B18 closes the Big Idea. L2B18 found a trout with 7.9 mg/L, comfortably above its line, dying anyway. Both ends of that gap move, and the end we did not count moves further."
        }
    };
}
