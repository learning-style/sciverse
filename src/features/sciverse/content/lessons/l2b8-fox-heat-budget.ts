import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B8 "Animal Adaptations". The synthesis lesson.
 *
 * B8's arctic fox survives -40 C with thick fur. This lesson balances its heat
 * budget (as L2B5 did for sweat): heat made each second = heat leaking out
 * through the fur, using L2P8's k x A x dT / d. Solving for dT gives the lower
 * critical temperature -- about -38 C in winter fur, +12 C in summer fur.
 *
 * Model figures stated as a model: 15 W resting heat, 0.30 m2 of outer fur,
 * k = 0.04 W/m/C. Frame of reference stated: dT is body minus air. Held fixed
 * and named for Level 3: fur as the only way out for heat, which the fox's
 * bare feet contradict.
 */
export function getL2B8Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In B8, the **arctic fox** stayed active in winter at **−40 °C**, wrapped in thick fur.\n\nL2P8 gave you the rule for heat leaking through a layer: **k x A x ΔT / d**.\n\nNow put the fox's numbers together. At rest, its body turns food into heat at about **15 W**. Its winter fur is about **6 cm** thick. Its body is at **37 °C**.\n\nWithout shivering or running about -- just resting -- how cold can the air get before the fox has to make extra heat?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Very cold. Its fur lets heat out so slowly that 15 W can keep the body many tens of degrees above the air -- as long as the heat leaking out each second is no more than the heat made.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Not very cold. An animal that small must lose heat quickly, so it would need extra heat as soon as the air dropped below freezing.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Small animals do lose heat quickly -- when they have **thin** fur. But winter fur changes everything.\n\nL2P8 found that fur works by trapping still air, one of the worst heat conductors there is. A 6 cm layer of it is like a thick sleeping bag wrapped all around the fox.\n\nThe real answer comes from a **heat budget**, just like the one L2B5 kept for a runner: count the heat coming **in** and the heat going **out**, and see where they balance.",
            options: [
                { id: 'cont', label: "Set up the fox's heat budget.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Keep the books for the fox's body, in watts.\n\n- **Heat in:** the heat the fox makes from its food. At rest, about **15 W**\n- **Heat out:** the heat leaking out through its fur, from L2P8: **k x A x ΔT / d**\n\nThe frame of reference for ΔT: **ΔT = body temperature − air temperature**, the warm side minus the cold side.\n\nWhen **heat in = heat out**, the body temperature stays steady. So the coldest air a resting fox can manage is where its **resting heat exactly matches the heat leaking out**.\n\nThat temperature has a name: the **lower critical temperature**. Below it, heat leaks out faster than the resting body makes it, so the fox must make **extra** heat -- by shivering or moving about -- or it will cool down.\n\nNow the model's numbers. They are rounded, but in the right range for a real arctic fox:\n\n- resting heat: **15 W**\n- area of its outer fur, curled up at rest: **A = 0.30 m²**\n- fur's thermal conductivity, mostly trapped air: **k = 0.04 W/m/°C**\n- winter fur thickness: **d = 6 cm = 0.06 m**\n\nThe condition belongs here. **This model treats the fur as the only way out for heat.**",
            options: [
                { id: 'cont', label: "Balance the budget.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Step 1: how many watts leak out for each degree.** Work out the part of k x A x ΔT / d that does not change:\n\nk x A / d = 0.04 x 0.30 / 0.06 = **0.20 W for each °C**\n\n**Step 2: balance the budget.** Heat out = 0.20 x ΔT must equal the 15 W made:\n\n0.20 x ΔT = 15, so ΔT = 15 / 0.20 = **75 °C**\n\n**Step 3: the lower critical temperature.** The body can sit 75 °C above the air:\n\n37 − 75 = **−38 °C**\n\nResting in its winter fur, the fox needs no extra heat until the air drops below about **−38 °C** -- close to what scientists have measured for real arctic foxes.\n\n**Summer fur**, only 2 cm = 0.02 m thick:\n\nk x A / d = 0.04 x 0.30 / 0.02 = **0.60 W for each °C**\nΔT = 15 / 0.60 = **25 °C**, so the lower critical temperature is 37 − 25 = **+12 °C**\n\nA third of the fur thickness moves the lower critical temperature from −38 °C to +12 °C.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** An unusually cold spell arrives early, while the fox is still in its **summer** fur, leaking **0.60 W for each °C**. The air falls to **−20 °C**.\n\nHow much heat must the fox make each second to keep its body at 37 °C?",
            options: [
                { id: 'right', label: "About 34 W. ΔT = 37 − (−20) = 57 °C, and 0.60 x 57 = 34 W -- more than twice its resting 15 W.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'sign', label: "About 10 W, because ΔT = −20 + 37 = 17 °C, and 0.60 x 17 = 10 W.", nextNodeId: 'math_wrong' },
                { id: 'resting', label: "15 W, its resting heat, because its body stays at 37 °C either way.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**10 W** got the temperature difference wrong. ΔT is **body minus air**: 37 − (−20). Subtracting a negative number adds it, so ΔT = 37 + 20 = **57 °C**. Adding −20 to 37 gives 17 instead -- far too small a gap between a 37 °C body and −20 °C air.\n\n**15 W** assumes the body keeps its temperature on its own. It stays at 37 °C only if the heat made matches the heat leaking out. At −20 °C in summer fur, far more leaks out than 15 W, so the fox must shiver or move to make the difference.\n\nheat needed = 0.60 x (37 − (−20)) = 0.60 x 57 = **34 W**",
            options: [
                { id: 'retry', label: "Body minus air, then balance the budget.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for the model fox: 0.30 m² of fur, k = 0.04 W/m/°C, a body at 37 °C, and 15 W of resting heat.\n\n**Fur Thickness** is in centimetres. **Air Temperature** is in °C.\n\nThe lab works out the heat leaking out through the fur and compares it with the 15 W the fox makes at rest. It shows whether the fox is comfortable, has to make **extra heat**, or -- on a hot day -- has to **get rid of extra heat**. It also marks the lower critical temperature for that fur.\n\nTry this:\n\n- Set **Fur Thickness** to 6 cm and slide **Air Temperature** down to −38 °C, then below it\n- Switch to 2 cm and find the new lower critical temperature\n- Set the air to **30 °C**. With so little temperature difference, far less than 15 W leaks out -- the fox now has the opposite problem",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Thicker fur, colder limit. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** In a blizzard, an arctic fox curls into a tight ball and wraps its thick tail over its face and feet.\n\nUsing **k x A x ΔT / d**, why does curling up help?",
            options: [
                { id: 'right', label: "It shrinks A, the area of fur that faces the cold air. With less area, less heat leaks out each second, so its resting heat can hold out against colder air.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It makes the fox's body warmer, so ΔT gets smaller and less heat leaks out.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A warmer body would make ΔT **bigger**, not smaller: ΔT is body minus air. And curling up does not heat the body -- it saves heat.\n\nWhat curling up changes is **A**, the area of fur facing the cold. Parts of the body press against each other, and the tail covers the face and feet, which have thinner fur.\n\n| | A | k x A / d | Heat out at 37 − (−38) = 75 °C |\n| --- | --- | --- | --- |\n| Stretched out | 0.40 m² | 0.27 W per °C | 20 W -- more than it makes |\n| Curled up | 0.30 m² | 0.20 W per °C | **15 W -- just balanced** |\n\nShrinking A is as good as thickening the fur. It is the same equation, and the fox uses both.",
            options: [
                { id: 'retry', label: "Curling up shrinks the area.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A fox balances its heat budget with both its fur thickness and its area: heat made = k x A x ΔT / d.**\n\nThat completes Big Idea 8 at Level 2, and all three lessons measured a **rate**, or a **limit**:\n\n- **L2P8** -- heat leaks at **k x A x ΔT / d**: the material, area, temperature difference and thickness all count\n- **L2C8** -- only so much water can stay as vapour; below the **dew point**, it condenses\n- **L2B8** -- a fox stays warm when heat made **balances** k x A x ΔT / d, which sets its **lower critical temperature**\n\n**Why does weather change, and how does life cope? Heat and water move at rates set by temperature -- and a body survives by keeping its own heat flows in balance.**\n\nOne thing this lesson treated as fixed: the fur as the fox's only way to lose heat. But its paws stand on bare snow and ice. How it keeps its feet from draining away its body heat is a question for Level 3.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Heat made = heat lost!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You balanced a fox's heat budget.**\n\n- **Heat in:** the heat a fox makes at rest, about **15 W**\n- **Heat out:** L2P8's **k x A x ΔT / d** through its fur\n- **ΔT = body temperature − air temperature**\n- Steady body temperature when **heat in = heat out**\n- The **lower critical temperature** is the coldest air a resting animal can manage without making extra heat\n- Model fox: A = 0.30 m², k = 0.04 W/m/°C\n- Winter fur, 6 cm: 0.20 W per °C, ΔT = **75 °C**, lower critical temperature **−38 °C**\n- Summer fur, 2 cm: 0.60 W per °C, ΔT = **25 °C**, lower critical temperature **+12 °C**\n- Summer fur at −20 °C: 0.60 x 57 = **34 W** needed\n- Curling up shrinks **A**, just as thicker fur grows **d**\n- Held fixed at this level: fur as the only way out for heat",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Heat made = k x A x ΔT / d!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Cold Can a Fox Get?**\n\nB8's fox survived −40 °C in thick fur. Level 2 works out why that number, and not another.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Heat budget | heat in = heat out | Steady body temperature |\n| Heat out | **k x A x ΔT / d** | L2P8's rule, through fur |\n| Temperature difference | **body − air** | Subtract a negative, add it |\n| Winter fur | 0.04 x 0.30 / 0.06 = **0.20 W per °C** | 15 / 0.20 = 75 °C |\n| Lower critical temperature | 37 − 75 = **−38 °C** | Coldest air at rest |\n| Summer fur | 15 / 0.60 = 25 °C | **+12 °C** |\n| Early cold snap | 0.60 x 57 = **34 W** | Must make extra heat |\n| Curling up | smaller A | Same effect as thicker fur |\n| Big Idea 8 at Level 2 | rates and limits | Heat, water and a living body |\n\n**The one line to remember:** a fox stays warm at rest only down to the temperature where its resting heat matches what leaks out through its fur.\n\n**Big Idea 8 is complete at Level 2.**"
        }
    };
}
