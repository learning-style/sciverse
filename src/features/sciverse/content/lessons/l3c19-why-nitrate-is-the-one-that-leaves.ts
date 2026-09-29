import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 19, chemistry. A Mechanism lesson that ends
 * in a number worth acting on.
 *
 * L2C19 worked out that a 50% catch forces a 120 kg/ha surplus, and treated the
 * catch as a property of the field. It is not. Potassium is spread on the same
 * fields at similar rates and mostly stays put; nitrogen leaves. Nothing about
 * the plants explains that, and the answer is electrical:
 *
 *   clay and humus surfaces carry negative charge, so they hold positive nutrient
 *   ions and cannot hold negative nitrate at all
 *
 * Potassium, calcium, magnesium and ammonium are positive and stick. Nitrate is
 * negative, is repelled, and travels with whatever water is moving. So the
 * surplus does not sit in the field waiting -- it leaves with L2P19's drainage:
 *
 *   nitrogen in the drainage = surplus / water that drains
 *
 * 120 kg/ha in 300 mm of drainage is 40 mg/L as nitrogen, about three and a half
 * times the drinking-water limit of 11.3 mg/L. That is the number that turns
 * L2C19's arithmetic into a decision.
 *
 * Still standing: this explains what soil can hold, not how much. It also assumes
 * the nitrogen is already in nitrate form, and says nothing about the organisms
 * that convert it -- which is why timing, not amount, turns out to be the lever.
 */
export function getL3C19Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C19 left you with a catch of 50% and a forced surplus of 120 kg/ha, and it treated that catch as a fact about the field -- something you measure and live with.\n\nHere is the observation that shows it is not. **Potassium** is spread on the same fields, at broadly similar rates, for the same crops. It does not behave like nitrogen at all. Most of it is still there the following season. Farmers test for it every few years rather than every year, and potassium does not turn up in rivers causing algal blooms.\n\nSo one nutrient leaves and another stays, in the same soil, in the same water, under the same rain.\n\nThat cannot be about the plants -- roots take up both. It cannot be about how much is spread. It has to be about what **the soil** does with each one, and the difference turns out to be electrical.\n\nYour two dials are the two numbers that decide how bad the loss gets.\n\n- **Surplus Nitrogen** is what L2C19 calculated: the nitrogen left over after the crop has taken what it needs, in kg/ha.\n- **Water That Drains** is how much water passes down through the soil in a year, in mm -- L2P19's water that soaked in, now continuing its journey downwards.\n\nWhy would soil treat two dissolved nutrients so differently?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Something about the soil must grip one and not the other -- perhaps an electrical attraction, since dissolved nutrients carry charge.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nitrogen must simply dissolve more easily, so more of it can be carried away in the water.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Check that against the fertilisers themselves, because it is testable and it fails.\n\nBoth are spread as salts that dissolve completely. Potassium chloride dissolves to about 340 g per litre of water; the potassium nitrate used in some fertilisers, around 380. Neither is anywhere near a limit in soil, where concentrations are thousands of times lower. **Both are fully dissolved, and neither is close to running out of solubility.**\n\nSo dissolving is not where they differ. Both nutrients are in the soil water, both are free to move, and the water is moving.\n\nWhat differs is whether the soil **holds on** to them once they are dissolved -- and that is a question about attraction, not about solubility.\n\nHere is the clue you need. A dissolved nutrient is not a neutral particle. It is an **ion**: an atom or group of atoms carrying an electrical charge, because it has lost or gained electrons. Potassium in soil water is K+, carrying one positive charge. Nitrate is NO3-, carrying one negative charge.\n\nOne positive, one negative. And soil is not electrically neutral either.",
            options: [
                { id: 'cont', label: "So what charge does soil carry?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Negative.** The two materials that make soil fertile -- clay and **humus**, the dark well-rotted remains of B19's litter -- both carry negative charge on their surfaces, and they carry an enormous amount of surface. A single gram of clay can have hundreds of square metres of it.\n\nThat single fact does all the work:\n\n- **Positive ions are attracted and held.** The soil grips potassium (K+), calcium (Ca2+), magnesium (Mg2+) and ammonium (NH4+), which stick to those negative surfaces. Water flows past and they stay. Roots can still get them, because a root can trade a hydrogen ion for a held nutrient -- so being held is not the same as being locked away.\n- **Negative ions are repelled.** Nitrate (NO3-) is pushed away from every surface that might have held it. It stays in the water, travelling with it, and **whatever the water does, nitrate does**.\n\nSo the difference between the two nutrients is not chemistry inside the plant. It is a matter of sign.\n\nAnd that leads straight to the quantity. If nitrate simply travels with the drainage water, then its concentration is the surplus divided by the water it is dissolved in:\n\n**nitrogen in the drainage = surplus / water that drains**\n\nTwo conversions make this workable:\n\n- **1 mm of water over 1 hectare is 10 m³**, since a hectare is 10,000 m² and a millimetre is 0.001 m.\n- **1 kg in 1 m³ is 1,000 mg/L**, which is how kg/ha and mm turn into a concentration a water company would recognise.\n\n**The condition:** this assumes the nitrogen is in nitrate form and that all of the surplus ends up meeting all of the drainage. Both are close enough to be useful and neither is exact.",
            options: [
                { id: 'cont', label: "Put L2C19's surplus through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**L2C19's field: 120 kg/ha of surplus nitrogen. A typical year drains 300 mm through the soil.**\n\n1. **Water that drains:** 300 mm x 10 m³ per mm per hectare = **3,000 m³/ha**\n2. **Concentration:** 120 kg / 3,000 m³ = **0.04 kg/m³**\n3. **In the units water is measured in:** 0.04 kg/m³ = **40 mg/L as nitrogen**\n\nNow put that against the limit. Drinking water is held to **50 mg/L of nitrate**, which -- because nitrate is mostly oxygen by mass -- works out at about **11.3 mg/L of nitrogen**.\n\n**40 against 11.3. About three and a half times the limit.**\n\nThat is the number that changes L2C19 from arithmetic into a decision. The surplus was not a bookkeeping leftover; it is water leaving the field at several times the concentration allowed in a tap.\n\nAnd notice what the mechanism predicts that the old picture could not. **A wet year does not make it worse.** Double the drainage to 600 mm and the concentration halves to 20 mg/L -- the same nitrogen, spread through twice the water. The **amount** leaving is unchanged, so the river downstream receives just as much; it simply arrives more dilute.\n\nWhich should sound familiar. It is L3C18's argument from the other end: there, more flow meant more rock dissolved and nearly constant concentration. Here the supply is fixed at 120 kg and the concentration really does dilute. **The sign of that difference is exactly what L3C18 said the exponent measures** -- a fixed supply spread thinner.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** L2C19 showed that improving the catch from 50% to 70% cuts the surplus to **51 kg/ha**. The field still drains **300 mm** a year.\n\nWhat concentration does the drainage water carry, and does it clear the 11.3 mg/L limit?",
            options: [
                { id: 'right', label: "17 mg/L, so no -- still about half again over the limit. 51 kg in 3,000 m³ is 0.017 kg/m³.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'thousand', label: "0.017 mg/L, comfortably under the limit.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "153,000 mg/L, from 51 x 3,000.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both answers are the same slip in opposite directions: losing track of the conversion between kg/m³ and mg/L.\n\n**0.017** is the concentration in **kg per m³**, which is correct as far as it goes. But 1 kg/m³ is 1,000 mg/L -- a kilogram is a million milligrams and a cubic metre is a thousand litres -- so 0.017 kg/m³ is **17 mg/L**. Sanity-check it against the worked example: 120 kg gave 40 mg/L, so 51 kg in the same water must give somewhat under half of that. 0.017 mg/L would be cleaner than most bottled water, which cannot be right for a fertilised field.\n\n**Multiplying** gives a number with no meaning. Concentration is an amount **per** volume, so the volume divides. Multiplying would say that draining more water makes the water dirtier.\n\n**51 / 3,000 = 0.017 kg/m³ = 17 mg/L.** Against a limit of 11.3, that is still about half again over -- and this was the *good* practice case. Which is the uncomfortable finding: improving the catch from 50% to 70% cut the surplus by more than half and still did not get the water clean.",
            options: [
                { id: 'retry', label: "1 kg/m³ is 1,000 mg/L -- and even the good case fails.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Surplus Nitrogen** in kg/ha and **Water That Drains** in mm, against the 11.3 mg/L limit.\n\n| Surplus | Drainage | Concentration | Against the limit |\n| --- | --- | --- | --- |\n| 120 kg/ha | 300 mm | **40 mg/L** | 3.5 times over |\n| 120 kg/ha | 600 mm | **20 mg/L** | still nearly double |\n| 51 kg/ha | 300 mm | **17 mg/L** | half again over |\n| 51 kg/ha | 600 mm | **8.5 mg/L** | under, at last |\n| 20 kg/ha | 300 mm | **6.7 mg/L** | comfortably under |\n\nRun your eye down it and the awkward conclusion is hard to avoid: **only the bottom two rows pass**, and one of them passes by being rained on heavily rather than by anything the farmer did.\n\nSo what actually works? The mechanism says the useful lever is not the amount at all -- it is **when the nitrogen is nitrate and when the water is moving**, because nitrate cannot be held and so it can only be protected by not being there when the water goes through.\n\n- **Spread in spring, not autumn.** Autumn-spread nitrogen sits through the wettest months with no growing crop to take it up. The drainage arrives before the roots do.\n- **Keep something growing over winter.** A cover crop takes nitrate up and holds it inside plant tissue, where it is not an ion in water at all. Plough it in and the nitrogen is released the following spring, when it is wanted.\n- **Spread in several smaller doses**, each close to when the crop is growing fastest.\n\nEvery one of those changes the **timing** rather than the amount, and every one of them works because of the sign on the nitrate ion.\n\nAnd there is a warning in the mechanism too. Nitrogen spread as **ammonium** is positive, so the soil does hold it -- for a while. Soil organisms convert ammonium to nitrate within days to weeks, and at that moment it stops being held. The protection is real and temporary.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Timing beats amount, because of a sign. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two farmers each have 51 kg/ha of surplus nitrogen and 300 mm of annual drainage -- 17 mg/L if it all leaves, against the 11.3 limit.\n\n- **Farmer A** spreads a potassium fertiliser as well, and worries that it will add to the pollution.\n- **Farmer B** sows a winter cover crop, takes up much of the nitrate into plant tissue, and ploughs it in come spring.\n\nWhat happens in each case?",
            options: [
                { id: 'right', label: "Farmer A's potassium mostly stays, held on the negative surfaces, so it adds little to the water. Farmer B's nitrate is taken into tissue where it is not an ion in water, so it survives the drainage and is released in spring when the crop can use it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both help about equally, since both keep nutrients out of the drainage water for a while.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "They are not equivalent, and the difference is the whole point of the mechanism.\n\n**Farmer A's worry is misplaced.** Potassium arrives as K+, positive, and the negative clay and humus surfaces hold it. The drainage water flows past and most of the potassium does not go with it. This is why potassium is not a water-pollution problem in the way nitrogen is -- not because less is spread, but because **the soil can grip it**. Farmer A can spread potassium without adding much to that 17 mg/L.\n\n**Farmer B has done the only thing that works on nitrate.** Nitrate cannot be held by soil at all; the surfaces repel it. So the sole way to keep it through a wet winter is to put it somewhere that is not soil water -- and inside a plant is exactly such a place. Nitrogen built into the tissue of a cover crop is not an ion in solution, so drainage cannot take it. Ploughing that crop in returns the nitrogen to the soil in spring, and B19's decomposers release it slowly, near when the next crop wants it.\n\nSo the two cases are not two versions of the same action. One is a nutrient that never needed protecting. The other is the only kind of protection available for a nutrient that cannot be held.\n\nAnd this explains something about fertiliser advice that otherwise looks like fussiness. Nobody insists on precise timing for potassium. For nitrogen, timing is nearly the whole argument -- and the reason is a single minus sign.",
            options: [
                { id: 'retry', label: "Potassium never needed holding; nitrate cannot be held at all.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. One nutrient the soil can grip, one it cannot -- and the only defence for the one it cannot is to keep it out of the water in the first place.\n\nSo Big Idea 19's chemistry now joins up with the other two levels:\n\n- **C19** said soil chemistry decides what plants can get.\n- **L2C19** showed the surplus is forced by the catch: 120 kg/ha at a 50% catch.\n- **This lesson** says where that surplus goes and how fast, because nitrate travels with the water L2P19 measured going in -- **40 mg/L, about three and a half times the drinking-water limit**.\n\nAnd it reaches back to Big Idea 18 as well. L3C18 found nitrate in a river with a positive exponent -- getting **more** concentrated when the flow rose, because flood water reaches stores of it that low flow never touches. This is that store: nitrate sitting in soil water, held by nothing, waiting for the next drainage.\n\nThe two lessons were describing the same ion from opposite ends of the same journey.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The whole story is one minus sign!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found out why one nutrient leaves and another stays.**\n\n- Dissolved nutrients are **ions** -- atoms or groups carrying electrical charge. Potassium is K+, nitrate is NO3-\n- **Clay and humus surfaces carry negative charge**, and an enormous amount of surface: hundreds of square metres in a gram of clay\n- So **positive ions are held** (potassium, calcium, magnesium, ammonium) and **negative nitrate is repelled**\n- Held is not locked away: a root can trade a hydrogen ion for a held nutrient\n- Nitrate stays in the water, so **whatever the water does, nitrate does**\n- **nitrogen in the drainage = surplus / water that drains**, with **1 mm over 1 ha = 10 m³** and **1 kg/m³ = 1,000 mg/L**\n- L2C19's 120 kg/ha in 300 mm of drainage gives **40 mg/L**, against a drinking-water limit of **11.3 mg/L as nitrogen** -- about three and a half times over\n- Even the good case fails: a 70% catch leaves 51 kg/ha, which is **17 mg/L**, still half again over\n- A wet year **dilutes but does not reduce**: 600 mm gives 20 mg/L of the same total nitrogen\n- So the lever is **timing, not amount** -- spring rather than autumn, several small doses, and a winter cover crop that holds nitrate inside tissue where water cannot reach it\n- **Ammonium is positive and is held** -- until soil organisms turn it into nitrate within weeks, and the protection ends\n- Which is why nobody frets about the timing of potassium, and everybody argues about the timing of nitrogen\n- Removed: L2C19's catch treated as a property of the field\n- Still standing: this explains **what** soil can hold, not **how much**. It assumes the nitrogen is already nitrate, and says nothing about the organisms doing the converting -- which is the next lesson's territory",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Three and a half times the limit, from a sensible decision!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Does Soil Support Life?**\n\nL2C19 said the surplus was forced. Level 3 says where it goes, and the answer is one minus sign.\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| Nutrients in water are | **ions**, carrying charge | K+ positive, NO3- negative |\n| Clay and humus surfaces are | **negatively charged**, with huge area | hundreds of m² per gram |\n| So positive ions are | **held**, and still available to roots | potassium stays put |\n| And nitrate is | **repelled**, so it goes where water goes | nothing can hold it |\n| The concentration | **surplus / water that drains** | 1 mm over 1 ha = 10 m³ |\n| L2C19's 120 kg/ha | in 300 mm of drainage | **40 mg/L**, 3.5x the limit |\n| The good case, 51 kg/ha | in 300 mm | **17 mg/L**, still over |\n| A wet year | dilutes, does not reduce | 20 mg/L, same total |\n| The lever | **timing**, not amount | cover crops, spring spreading |\n| Ammonium | positive, so held -- for weeks | then converted, then lost |\n| Not explained | **how much** soil can hold | Still standing |\n\n**The one line to remember:** soil surfaces are negatively charged, so they grip potassium and cannot grip nitrate at all -- which is why a sensible fertiliser decision sends water off the field at three and a half times the drinking-water limit, and why the fix is when you spread rather than how much.\n\n**Up next:** B19 closes the Big Idea. Decomposers need water and they need air, and in soil both come from the same spaces -- so they cannot both have it."
        }
    };
}
