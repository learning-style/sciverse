import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P11 "The Pumping Heart".
 *
 * P11 gave blood pressure in mmHg. This lesson says what those numbers mean
 * and why height changes them: pressure from a column of liquid = density x
 * g x height, worked from weight / area. 1 mmHg = 133 Pa. 115 mmHg could hold
 * blood up 1.47 m; standing, the feet are about 100 mmHg higher than the heart
 * and the head about 31 mmHg lower. The checkpoint lifts blood to a giraffe's
 * brain.
 *
 * Frame of reference stated: height measured up from the heart, and pressure
 * above that of the surrounding air. Condition stated: the blood is treated as
 * standing still -- named as held fixed for Level 3.
 */
export function getL2P11Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In P11, a healthy blood pressure was about **115/75 mmHg**, measured with a cuff on the upper arm.\n\nNow picture the same person standing up. Blood reaches their brain at the top of the body, and their feet at the bottom.\n\nIs the blood pressure in the arteries of their **feet** the same 115 mmHg as at their heart?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No -- it is much higher. The feet are far below the heart, so the weight of all the blood above them adds to the pressure, like the pressure getting bigger as you dive deeper in a pool.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes. The heart makes one pressure, so every artery in the body has the same pressure.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The heart does make one pressure -- but gravity adds to it or takes from it, depending on height.\n\nDive to the bottom of a swimming pool and your ears hurt. The water above you is pushing down. The deeper you go, the more water is above you, and the bigger the pressure.\n\nBlood in your body is a column of liquid too. Standing up, your feet sit at the bottom of a tall column of blood, and your head sits above your heart.\n\nThat is why a doctor puts the cuff on your upper arm, level with your heart -- and why they ask you to sit still with your arm resting, not raised above your head.",
            options: [
                { id: 'cont', label: "How much does height change the pressure?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Pressure** is how hard something pushes on each bit of surface: the force on each square metre. In L2C5 it was measured in atmospheres. Here it is measured in **pascals (Pa)**: **1 Pa is a force of 1 newton on each m²**.\n\nWork out the pressure under a column of liquid, step by step. Picture a column **h** metres tall, standing on an area **A**:\n\n**Step 1.** Its volume is A x h, and its mass is **density x A x h**. Density, **ρ** (the Greek letter rho), is the mass of each m³, in kg/m³.\n\n**Step 2.** Its weight, the force of gravity on it, is mass x **g**, where g = 9.8 N for each kg.\n\n**Step 3.** Pressure is force / area: ρ x A x h x g / A. The area cancels:\n\n**pressure from a column of liquid = ρ x g x h**\n\nThe frame of reference: **h** is measured **down** from where the pressure is known. Going down adds pressure; going up takes it away.\n\nNow the unit. **mmHg**, millimetres of mercury, is the pressure under a column of mercury 1 mm tall. Mercury's density is **13,600 kg/m³**:\n\n1 mmHg = 13,600 x 9.8 x 0.001 m = **133 Pa**\n\nBlood pressure is always the pressure **above** that of the air around you -- 115 mmHg means 115 mmHg more than the air's push.\n\nThe condition belongs here. **This treats the blood as a liquid standing still.** Real blood is flowing, and that has its own effect.",
            options: [
                { id: 'cont', label: "Work out the feet and the head.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Blood's density is about **1,060 kg/m³**. The heart-level pressure is **115 mmHg**.\n\n**How high could 115 mmHg hold up a column of blood?**\n\n**Step 1.** In pascals: 115 x 133 = **15,300 Pa**\n\n**Step 2.** Rearrange pressure = ρ x g x h to h = pressure / (ρ x g):\n\nh = 15,300 / (1,060 x 9.8) = 15,300 / 10,388 = **1.47 m**\n\n**The feet, 1.3 m below the heart:**\n\nextra pressure = 1,060 x 9.8 x 1.3 = 13,500 Pa, and 13,500 / 133 = **about 100 mmHg**\n\nfeet: 115 + 100 = **about 215 mmHg**\n\n**The head, 0.4 m above the heart:**\n\nless pressure = 1,060 x 9.8 x 0.4 = 4,160 Pa, and 4,160 / 133 = **about 31 mmHg**\n\nhead: 115 − 31 = **about 84 mmHg**\n\n| Place | Height from the heart | Change | Pressure |\n| --- | --- | --- | --- |\n| Head | 0.4 m above | − 31 mmHg | **84 mmHg** |\n| Heart | 0 | 0 | **115 mmHg** |\n| Feet | 1.3 m below | + 100 mmHg | **215 mmHg** |\n\nThat is why feet and ankles swell after a long day standing: the high pressure pushes fluid out of the blood vessels.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A patient holds their arm up, so the cuff is **0.3 m above the heart**. Their heart-level pressure is **115 mmHg**.\n\nWhat does the cuff read?",
            options: [
                { id: 'right', label: "About 92 mmHg. The change is 1,060 x 9.8 x 0.3 = 3,120 Pa, which is 3,120 / 133 = 23 mmHg less: 115 − 23 = 92 mmHg.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_convert', label: "It reads 3,120 mmHg less, because 1,060 x 9.8 x 0.3 = 3,120.", nextNodeId: 'math_wrong' },
                { id: 'sign', label: "About 138 mmHg, because the height adds 23 mmHg: 115 + 23 = 138.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**3,120** is in **pascals**, not mmHg. ρ x g x h always gives pascals when the density is in kg/m³ and the height in metres. Divide by 133 to get mmHg.\n\n**138 mmHg** added the change. The cuff is **above** the heart, so there is less blood above it pushing down: the pressure is **lower**. Going up takes pressure away.\n\n**Step 1.** change = 1,060 x 9.8 x 0.3 = **3,120 Pa**\n\n**Step 2.** in mmHg: 3,120 / 133 = **23 mmHg**\n\n**Step 3.** the cuff is above the heart, so: 115 − 23 = **92 mmHg**\n\nA reading of 92 would make this person's pressure look lower than it really is -- which is why the arm must rest level with the heart.",
            options: [
                { id: 'retry', label: "Convert to mmHg, and up means less.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for blood of density **1,060 kg/m³**.\n\n**Height Above Heart** is how far a point in the body is above the heart, in m. A negative height means **below** the heart. **Heart-Level Pressure** is the pressure at the heart, in mmHg.\n\nThe lab works out ρ x g x h, turns it into mmHg, and shows the pressure at that height.\n\nTry this:\n\n- Set **115 mmHg** and **−1.3 m**: the feet, about 215 mmHg\n- Set **0.4 m**: the head, about 84 mmHg\n- Find the height where the pressure falls to **0 mmHg**: the tallest column of blood this heart could hold up",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Down adds pressure, up takes it away. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A giraffe's brain sits about **2 m above its heart**. Like ours, its brain needs about **80 mmHg** of blood pressure.\n\nAbout what pressure must a giraffe's heart make?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'right', label: "About 240 mmHg. Lifting blood 2 m takes 1,060 x 9.8 x 2 = 20,800 Pa, which is 156 mmHg, and 156 + 80 = 236 mmHg -- about twice ours.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "About 80 mmHg, the same as ours. The heart only has to make the pressure the brain needs.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "80 mmHg would be enough if the brain sat **level** with the heart. But the giraffe's brain is 2 m **above** it, and pressure falls as the blood rises.\n\n| Step | Working | Result |\n| --- | --- | --- |\n| Pressure lost rising 2 m | 1,060 x 9.8 x 2 | 20,800 Pa |\n| In mmHg | 20,800 / 133 | **156 mmHg** |\n| Still needed at the brain | | 80 mmHg |\n| Needed at the heart | 156 + 80 | **236 mmHg** |\n\nA heart making only 80 mmHg could lift blood just 80 x 133 / (1,060 x 9.8) = **1.0 m**. The blood would never reach the giraffe's brain.\n\nGiraffes really do have blood pressures about twice ours -- and thick-walled arteries, and tight skin on their legs, to stop their feet swelling.",
            options: [
                { id: 'retry', label: "Lifting the blood costs pressure.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A column of liquid adds pressure going down and loses it going up: ρ x g x h.**\n\nThat is what the numbers on a blood pressure reading mean. **115 mmHg** is a push that could hold up a column of mercury 115 mm tall -- or a column of blood about 1.5 m tall -- and it is only true **at heart level**.\n\nOne thing this lesson held fixed: **the blood was treated as standing still.** Real blood flows, and pushing it through narrow blood vessels uses up pressure along the way. Level 3 finds out how much.\n\nC11 said pH measures how acidic something is. C11 at Level 2 finds out what each step on the pH scale is really worth.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Down adds, up takes away!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found what blood pressure numbers mean.**\n\n- **Pressure** is force on each square metre; **1 Pa = 1 N on each m²**\n- Under a column of liquid: weight / area = ρ x A x h x g / A\n- **pressure from a column of liquid = ρ x g x h**\n- Frame of reference: height from the heart; going down adds pressure, going up takes it away\n- **1 mmHg = 13,600 x 9.8 x 0.001 = 133 Pa**\n- Blood pressure is measured above the pressure of the surrounding air\n- 115 mmHg = 15,300 Pa: enough to hold blood up **1.47 m**\n- Standing: feet about **215 mmHg**, head about **84 mmHg**\n- Cuff 0.3 m above the heart reads **92 mmHg**, not 115\n- A giraffe needs about **236 mmHg** at its heart\n- Condition: blood treated as standing still",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "ρ x g x h!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- What the Blood Pressure Numbers Mean!**\n\nP11 gave blood pressure in mmHg. Level 2 finds what that unit means, and why height changes it.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Pressure | force / area, in Pa | 1 N on each m² |\n| A column of liquid | **ρ x g x h** | The area cancels |\n| mmHg | 13,600 x 9.8 x 0.001 | **133 Pa** |\n| 115 mmHg | 15,300 Pa | Holds blood up **1.47 m** |\n| Feet, 1.3 m below | + 100 mmHg | **215 mmHg** |\n| Head, 0.4 m above | − 31 mmHg | **84 mmHg** |\n| Arm raised 0.3 m | − 23 mmHg | Reads **92 mmHg** |\n| A giraffe | 156 + 80 mmHg | About **236 mmHg** |\n\n**The one line to remember:** pressure in a column of liquid grows by ρ x g x h going down -- so blood pressure only means something at heart level.\n\n**Up next:** C11 -- why each step on the pH scale is worth ten times."
        }
    };
}
