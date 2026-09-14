import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 8, chemistry.
 *
 * L2C8 cooled air by contact with a cold surface, at a fixed dew point. This
 * removes that simplification: rising air cools by expanding, paying for its
 * gain in height (g per metre, L3B1's mgh for one kilogram) out of its own
 * warmth, cp x dT with cp = 1,005 J/kg/C -- the dry lapse rate, 9.8 C per km.
 * The dew point also falls, about 1.8 C per km, so cloud base = 125 m for each
 * degree of gap. Worked by hand in 500 m steps.
 *
 * Conditions stated where used: no condensation yet, no heat exchanged, no
 * mixing. The checkpoint brings in L3C1's latent heat above the base. Still
 * standing: real rising air mixes with its surroundings.
 */
export function getL3C8Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In L2C8, air cooled below its dew point by **touching** something cold: grass on a clear night, or a can from the fridge.\n\nBut C8's water molecule, Droplet, cooled high in the sky, where there is nothing cold to touch.\n\nAnd look at the clouds on a summer afternoon. Dozens of fluffy clouds, each with a **flat bottom** -- and every flat bottom at **the same height**.\n\nWhy does rising air cool, and why do all the clouds start at one height?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Rising air moves into lower pressure and expands, and expanding uses up some of its own energy, so it cools. Air rising from the same ground starts out alike, so it all reaches its dew point at the same height.", nextNodeId: 'energy', sentiment: 'positive' },
                { id: 'bad', label: "The air high up is colder because it is further from the warm ground, and rising air cools by touching that colder air.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The air high up usually is colder. But a rising bubble of air is not cooled by touching it. Air is one of the worst conductors there is (L2P8) -- a bubble of air hundreds of metres across would take far longer to be cooled from its edges than it takes to rise.\n\nThe bubble cools **itself**. You have felt the same thing:\n\n- Let air rush out of a bike tyre valve, and the valve gets cold\n- Spray a can of deodorant, and the can gets cold\n\nIn both, gas **expands** as its pressure drops, and it cools as it expands. L3P4 found the reverse: air **squeezed** by a sound wave warms up.\n\nA rising bubble of air does the same. The higher it goes, the lower the pressure around it -- there is less weight of air above, as in L3P6 -- so it expands, and cools.",
            options: [
                { id: 'cont', label: "How much does it cool?", nextNodeId: 'energy' }
            ]
        },
        energy: {
            id: 'energy',
            speaker: 'AI',
            content: "Keep the energy books for **one kilogram** of rising air.\n\n**Step 1: the energy it gains.** Lifting mass m through height h takes **m x g x h**, from L3B1. For 1 kg rising 1 metre: 1 x 9.8 x 1 = **9.8 J**.\n\n**Step 2: where that energy comes from.** Nothing is pushing the bubble up from outside it. As it expands, it pays for its gain in height out of its **own warmth**.\n\n**Step 3: how much warmth that is.** From L2C1, the heat needed to change a temperature is **mass x c x ΔT**. For air that is free to expand as it goes, **c = 1,005 J/kg/°C** -- a value known as its specific heat capacity at constant pressure.\n\n**Step 4: balance the books.** For 1 metre of rise:\n\n1,005 x ΔT = 9.8, so ΔT = 9.8 / 1,005 = **0.0098 °C** for each metre\n\nFor 1,000 m, that is **9.8 °C**. Rising air cools by about **9.8 °C for every kilometre** it rises. This is called the **dry lapse rate**.\n\nThe conditions belong here. **This holds while no water is condensing, the bubble neither gains nor loses heat to its surroundings, and it does not mix with the air around it.**",
            options: [
                { id: 'cont', label: "Does the dew point stay the same as it rises?", nextNodeId: 'dewpoint' }
            ]
        },
        dewpoint: {
            id: 'dewpoint',
            speaker: 'AI',
            content: "Not quite. As the bubble expands, its water vapour spreads out into a bigger volume -- so there are fewer grams in each cubic metre. From L2C8, less vapour in each cubic metre means a **lower dew point**.\n\nMeasured, the dew point of rising air falls by about **1.8 °C for every kilometre**.\n\nSo as a bubble rises:\n\n- its temperature falls **9.8 °C** per km\n- its dew point falls **1.8 °C** per km\n\nThe gap between them closes by 9.8 − 1.8 = **8.0 °C for every kilometre**.\n\nWhen the gap reaches zero, the air is at its dew point, water condenses, and a cloud begins. So the height of the cloud's base is:\n\n**cloud base = (temperature − dew point at the ground) / 8.0**, in km\n\nor, for each degree of gap, 1,000 / 8.0 = **125 m**.\n\nThe condition belongs here. **The 1.8 °C per km is an average**, for the moist air near the ground.",
            options: [
                { id: 'cont', label: "Follow a bubble up by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "A summer afternoon: the ground air is **30 °C**, with a dew point of **14 °C**. The gap is 16 °C.\n\nFollow a bubble up, 500 m at a time. Each 500 m, its temperature falls 4.9 °C and its dew point falls 0.9 °C:\n\n| Height | Temperature | Dew point | Gap |\n| --- | --- | --- | --- |\n| 0 m | 30.0 °C | 14.0 °C | 16.0 °C |\n| 500 m | 25.1 °C | 13.1 °C | 12.0 °C |\n| 1,000 m | 20.2 °C | 12.2 °C | 8.0 °C |\n| 1,500 m | 15.3 °C | 11.3 °C | 4.0 °C |\n| 2,000 m | **10.4 °C** | **10.4 °C** | **0** |\n\nAt **2,000 m**, the temperature meets the dew point, and a cloud begins.\n\nCheck with the rule: 125 m x 16 = **2,000 m**.\n\nNow the flat bottoms. Every bubble rising from that same ground air starts at 30 °C with a 14 °C dew point -- so **every bubble reaches its dew point at 2,000 m**. Below that height, all is clear air. At it, every cloud begins. That is the flat bottom.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** On a humid morning, the ground air is **20 °C** with a dew point of **16 °C**.\n\nAt about what height would clouds begin?",
            options: [
                { id: 'right', label: "About 500 m. The gap is 20 − 16 = 4 °C, and 125 m x 4 = 500 m.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_dew', label: "About 410 m, because it takes 4 / 9.8 = 0.41 km to cool 4 °C.", nextNodeId: 'math_wrong' },
                { id: 'temp', label: "About 2,500 m, because 125 m x 20 = 2,500 m.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**410 m** left the dew point where it started. But the dew point falls too, 1.8 °C for every km, so the gap closes at 9.8 − 1.8 = **8.0 °C** per km, not 9.8. Closing a 4 °C gap takes 4 / 8.0 = 0.5 km.\n\n**2,500 m** used the temperature, not the **gap**. Clouds begin when the temperature meets the dew point, so what matters is how far apart they start: 20 − 16 = 4 °C.\n\ncloud base = 125 m x (20 − 16) = **500 m**\n\nHumid mornings, with a small gap, bring low clouds. Hot, dry afternoons, with a big gap, lift them high.",
            options: [
                { id: 'retry', label: "125 m for each degree of gap.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for the air at the ground.\n\n**Ground Temperature** is in °C. **Ground Dew Point** is in °C, and cannot be higher than the temperature.\n\nThe lab draws the rising air's temperature falling at 9.8 °C per km and its dew point at 1.8 °C per km, from the ground up to 4 km. Where the two lines meet, it draws the flat base of a cloud.\n\nAbove the base, it draws the cloud air's temperature as a dashed line, falling more slowly. The checkpoint is about why.\n\nTry this:\n\n- Start at **30 °C** and a **14 °C** dew point: the base is at 2,000 m\n- Raise the dew point to make the air more humid, and watch the base come down\n- Set the dew point equal to the temperature: fog, a cloud touching the ground",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The gap sets the base. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Above its flat base, the air inside a growing cloud keeps rising -- but now it cools by only about **6 °C per km**, not 9.8 °C.\n\nIt is still rising and expanding. Why does it cool more slowly?",
            options: [
                { id: 'right', label: "Water vapour is now condensing into droplets, and condensing releases latent heat, from L3C1. That heat goes into the air and makes up part of the cooling.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The air inside a cloud is closer to the Sun, so it is warmed from above.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A kilometre higher is no meaningful distance closer to a Sun 150 million km away -- and, as C8 and this lesson found, the air generally gets **colder** with height, not warmer.\n\nThe heat comes from **inside** the cloud. Above the base, water vapour is condensing into droplets. L3C1 found that turning vapour into liquid **releases** its latent heat, about 2,500 J for every gram at cloud temperatures.\n\nThat released heat goes straight into the surrounding air. So the rising air still pays for its height out of its warmth, but condensation keeps paying some back. The result is slower cooling: about **6 °C per km** instead of 9.8.",
            options: [
                { id: 'retry', label: "Condensing releases heat inside the cloud.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Above the base, condensation releases latent heat, so cloud air cools more slowly than clear air.**\n\nThat has big consequences. Slower-cooling cloud air can stay warmer than the air around it -- and less dense, as in P6 -- so it keeps rising. The more water condenses, the more heat is released, and on a humid summer day a cloud can tower up into a **thunderstorm**.\n\nHere is the simplification this lesson removed. **L2C8 cooled air by touching something cold, at a fixed dew point.** Rising air needs nothing cold to touch. It cools itself by expanding, at 9.8 °C per km, while its dew point falls 1.8 °C per km, and clouds begin 125 m up for every degree of gap.\n\nAnd the simplification still standing. **The bubble was assumed not to mix with the air around it.** Real rising air mixes in drier air at its edges as it goes, so real cloud bases wander a little from the rule -- which is why forecasters send up weather balloons to measure the air, rather than only trusting the ground.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "125 m for each degree of gap!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why clouds have flat bottoms.**\n\n- Rising air is not cooled by touch: air conducts too badly\n- It moves into lower pressure, **expands**, and cools itself -- like air rushing out of a tyre valve\n- Energy for 1 kg rising 1 m: **9.8 J**, from mgh\n- Paid from its own warmth: 1,005 x ΔT = 9.8, so **0.0098 °C** per metre\n- **Dry lapse rate: 9.8 °C per km**, while nothing condenses and the air does not mix\n- The dew point falls about **1.8 °C per km** as the vapour spreads out\n- The gap closes at **8.0 °C per km**\n- **Cloud base = 125 m for each °C** of gap between temperature and dew point\n- 30 °C with a 14 °C dew point: base at **2,000 m**\n- 20 °C with a 16 °C dew point: base at **500 m**\n- All bubbles from the same ground air reach their dew point together: a **flat bottom**\n- Above the base, latent heat slows the cooling to about **6 °C per km**\n- Still standing: real rising air mixes with the air around it",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Rising air cools itself!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Clouds Have Flat Bottoms!**\n\nL2C8 cooled air against cold surfaces. Level 3 finds the air cooling itself as it rises.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Rising air | expands as the pressure falls | It cools itself |\n| Energy per kg per m | g x 1 = **9.8 J** | From mgh |\n| Dry lapse rate | 9.8 / 1,005 x 1,000 = **9.8 °C per km** | No condensing, no mixing |\n| Dew point with height | falls about **1.8 °C per km** | The vapour spreads out |\n| Closing the gap | 9.8 − 1.8 = **8.0 °C per km** | Temperature meets dew point |\n| Cloud base | **125 m x gap** | 16 °C gap: 2,000 m |\n| Humid morning | 125 x 4 = **500 m** | Low clouds |\n| Flat bottoms | same ground air, same height | Every cloud starts together |\n| Inside the cloud | about **6 °C per km** | Latent heat released |\n\n**The one line to remember:** rising air cools itself by expanding, and clouds begin 125 m up for every degree between the ground's temperature and its dew point.\n\n**Up next:** B8 -- how a fox keeps its feet cold without losing its body's heat."
        }
    };
}
