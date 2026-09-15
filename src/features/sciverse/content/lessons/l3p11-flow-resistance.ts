import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 11, physics.
 *
 * L2P11 treated blood as standing still. This removes that simplification:
 * flowing blood loses pressure, pressure drop = flow x resistance (L2P7's
 * Ohm's law in another form), and for smooth, steady flow in a straight tube
 * resistance grows as 1 / radius^4. Whole body: 85 mmHg drop over 5 L/min is
 * 17 mmHg for each L/min. Worked by hand as two squarings: 80% radius carries
 * 41% of the flow; a 10% squeeze everywhere needs 130 mmHg to keep 5 L/min.
 *
 * Frame of reference stated: pressure drop from the start of a vessel to its
 * end, in the direction of flow. Condition stated where the radius rule is
 * given. Still standing: pulsing flow, stretchy arteries, blood not a simple
 * liquid, and swirling flow at a sharp narrowing.
 */
export function getL3P11Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P11 worked out the pressure in a column of blood, and named what it held fixed: **the blood was standing still**. Real blood flows -- about 5 litres every minute.\n\nNow picture an artery that has narrowed with fatty plaque, as in P11. Its inside **radius** is now **80%** of what it was: a 20% narrowing.\n\nWith the same pressure pushing blood through it, does the flow fall by 20%?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It falls by much more than 20%. A narrow tube resists flow far more than its width suggests -- the flow drops to well under half.", nextNodeId: 'flow', sentiment: 'positive' },
                { id: 'bad', label: "Yes. 20% narrower means 20% less room, so 20% less blood gets through.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Try drinking a thick milkshake through a wide straw, then through a thin one. The thin straw is not a little harder -- it is **much** harder.\n\nHere is why. A liquid sticks to the wall of a tube. The layer touching the wall hardly moves; the liquid flows fastest down the middle, and each layer drags on the layers next to it.\n\nMake the tube narrower and two things happen at once:\n\n- there is **less room** for the liquid to pass through\n- the walls are **closer to the middle**, so more of the liquid is held back by them, and even the middle flows more slowly\n\nThose two effects multiply together. So the flow falls much faster than the width.",
            options: [
                { id: 'cont', label: "How much faster?", nextNodeId: 'flow' }
            ]
        },
        flow: {
            id: 'flow',
            speaker: 'AI',
            content: "**Flowing blood uses up pressure along the way**, the way L2P7's current uses up voltage across a resistor. The same rule, with new names:\n\n**pressure drop = flow x resistance**\n\n- **flow** is the volume of blood passing each minute, in L/min\n- **pressure drop** is how much the pressure falls from the start of a vessel to its end, in mmHg. That is the frame of reference: measured **in the direction the blood flows**\n- **resistance** is how hard the vessels make it to push blood through, in **mmHg for each L/min**\n\nFor the whole body: a blood pressure of 115/75 mmHg has an **average** of about 88 mmHg (the heart spends longer relaxed than squeezing, so the average sits nearer the lower number). Blood arrives back at the heart at about 3 mmHg. The heart pumps about **5 L/min**:\n\nresistance = pressure drop / flow = (88 − 3) / 5 = **17 mmHg for each L/min**\n\nNow the width. For smooth, steady flow through a straight tube:\n\n**resistance is in proportion to length / radius⁴**\n\nThe radius counts **four** times: twice for the room to pass, and twice for the walls closing in on the middle. So, for the same vessel at the same pressure drop:\n\n**flow after / flow before = (radius after / radius before)⁴**\n\nThe condition belongs here. **This radius rule holds for smooth, steady flow of a simple liquid through a straight tube with stiff walls.** Blood in arteries meets it only roughly.",
            options: [
                { id: 'cont', label: "Work out the narrowed artery by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "A power of 4 is a square, squared. So work it out in two squarings.\n\n**Radius 80% of normal:**\n\n**Step 1.** 0.8 x 0.8 = 0.64\n\n**Step 2.** 0.64 x 0.64 = **0.41**\n\nThe flow falls to **41%** of what it was -- not 80%. The resistance rose by 1 / 0.41 = **2.44 times**.\n\n| Radius, compared with normal | Squared | Squared again: flow compared with normal |\n| --- | --- | --- |\n| 90% | 0.81 | **66%** |\n| 80% | 0.64 | **41%** |\n| 50% | 0.25 | **6%**, one sixteenth |\n\nA 10% squeeze cuts the flow by a third. That is how the body steers blood: tiny muscles in the walls of the smallest arteries tighten a little, and the flow to that part of the body falls a lot.\n\n**And blood pressure?** Suppose the small arteries all over the body squeezed to 90% of their radius. The whole body's resistance rises by 1 / 0.66 = **1.52 times**, to 17 x 1.52 = 26 mmHg for each L/min. To keep pumping 5 L/min, the heart must make a pressure drop of 26 x 5 = **130 mmHg** instead of 85.\n\nThat is P11's rule, now with a number: **narrower vessels, higher blood pressure.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Plaque narrows an artery to **70%** of its normal radius. The pressure drop along it stays the same.\n\nWhat share of its normal flow gets through?",
            options: [
                { id: 'right', label: "About 24%. 0.7 x 0.7 = 0.49, and 0.49 x 0.49 = 0.24.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'in_step', label: "70%, because the radius is 70% of normal.", nextNodeId: 'math_wrong' },
                { id: 'squared', label: "49%, because 0.7 x 0.7 = 0.49.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**70%** made the flow fall **in step** with the radius. The milkshake straws show why it does not: the radius counts four times.\n\n**49%** squared only **once**. That accounts for the room to pass, but not for the walls closing in on the middle. The power is 4, so square **twice**.\n\n**Step 1.** 0.7 x 0.7 = **0.49**\n\n**Step 2.** 0.49 x 0.49 = **0.24**\n\nOnly about **24%** of the flow gets through -- less than a quarter -- and the resistance is 1 / 0.24 = about **4.2 times** normal.",
            options: [
                { id: 'retry', label: "Square, then square again.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a model artery that carries **0.5 L/min** with a **10 mmHg** pressure drop when fully open. Its resistance is then 10 / 0.5 = 20 mmHg for each L/min.\n\n**Radius** is the artery's inside radius, as a percentage of normal. **Pressure Drop** is how much the pressure falls along it, in mmHg.\n\nThe lab draws the artery narrowing, works out its resistance, and the flow that gets through.\n\nTry this:\n\n- Keep **10 mmHg** and lower **Radius** to **80%**: 41% of the flow\n- At **50%**, the flow is one sixteenth\n- At **80%** radius, raise **Pressure Drop** until the flow is back to 0.5 L/min",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Flow goes with radius to the fourth. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** The model artery carried **0.5 L/min** with a **10 mmHg** drop. Plaque narrows it to **80%** of its radius.\n\nTo push the same 0.5 L/min through it, what pressure drop is needed now?",
            options: [
                { id: 'right', label: "About 24 mmHg. At 80% radius the resistance is 1 / 0.41 = 2.44 times as big, so the drop must be 10 x 2.44 = 24 mmHg.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "About 12.5 mmHg. The radius is 0.8 times as big, so the pressure needs to be 1 / 0.8 = 1.25 times as big.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "1.25 times would be right if resistance followed the radius **in step**. It follows the radius to the **fourth power**.\n\n| | Radius | Resistance | Drop needed for 0.5 L/min |\n| --- | --- | --- | --- |\n| Open | 100% | 20 mmHg for each L/min | 20 x 0.5 = **10 mmHg** |\n| Narrowed | 80% | 20 / 0.41 = 49 mmHg for each L/min | 49 x 0.5 = **24 mmHg** |\n\nWith only 12.5 mmHg, the flow would be 12.5 / 49 = 0.26 L/min -- about half of what the tissue beyond needs.\n\nThat is why a narrowed artery is dangerous twice over: less blood reaches the tissue beyond it, and the heart has to push harder to make up the difference.",
            options: [
                { id: 'retry', label: "Resistance goes as 1 / radius to the fourth.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Resistance grows as 1 / radius⁴, so a small narrowing needs a big rise in pressure to keep the same flow.**\n\nHere is the simplification this lesson removed. **L2P11 treated the blood as standing still.** Flowing blood uses up pressure through the resistance of the vessels: **pressure drop = flow x resistance** -- and the radius of those vessels counts four times over.\n\nAnd the simplifications still standing. **The radius rule assumes smooth, steady flow of a simple liquid through a stiff, straight tube.** Real blood **pulses** with every beat. Arteries **stretch** and spring back, smoothing the pulses. Blood is **not a simple liquid**: it is full of red cells, and in the tiniest vessels it behaves as if it were thinner. And at a sharp narrowing, the flow can turn **swirly**, which a doctor can hear through a stethoscope as a whooshing sound.\n\nL3C11 asks how blood keeps its pH steady while cells add acid to it all day.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Radius to the fourth!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why narrow arteries matter so much.**\n\n- **pressure drop = flow x resistance**, like L2P7's Ohm's law\n- Frame of reference: the drop from the start of a vessel to its end, in the direction of flow\n- Whole body: (88 − 3) / 5 = **17 mmHg for each L/min**\n- **Resistance is in proportion to length / radius⁴**\n- Condition: smooth, steady flow of a simple liquid in a stiff, straight tube\n- Same vessel, same drop: **flow after / flow before = (radius ratio)⁴** -- square twice\n- 90% radius: **66%** of the flow; 80%: **41%**; 70%: **24%**; 50%: **6%**\n- Squeezing to 90% everywhere: resistance x 1.52, so **130 mmHg** to keep 5 L/min\n- 80% radius needs **24 mmHg** instead of 10 for the same flow\n- Still standing: pulsing flow, stretchy arteries, blood not a simple liquid, swirling flow",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Square, then square again!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Narrow Arteries Matter So Much!**\n\nL2P11 held the blood still. Level 3 sets it flowing.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Flow and pressure | **drop = flow x resistance** | Flowing blood uses up pressure |\n| Whole body | 85 / 5 | **17 mmHg for each L/min** |\n| The radius rule | **resistance ∝ length / radius⁴** | Radius counts four times |\n| 80% radius | 0.8² = 0.64, 0.64² = 0.41 | **41%** of the flow |\n| 70% radius | 0.49² | **24%** |\n| A 10% squeeze everywhere | 17 x 1.52 x 5 | **130 mmHg** needed |\n| Same flow, 80% radius | 10 x 2.44 | **24 mmHg** instead of 10 |\n| Still standing | smooth, steady, stiff tube | Pulses, stretch, swirls |\n\n**The one line to remember:** flow through a vessel goes with its radius to the fourth power -- so a little narrowing costs a lot of flow, or a lot of pressure.\n\n**Up next:** L3C11 -- how blood holds its pH."
        }
    };
}
