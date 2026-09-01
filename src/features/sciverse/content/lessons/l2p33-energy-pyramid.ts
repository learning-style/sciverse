import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to P33 "The Energy Ladder".
 *
 * Level 1 established the 10% rule qualitatively. This lesson makes it
 * arithmetic: percentages as multipliers, repeated multiplication as a power,
 * and the consequence that a change to the efficiency is compounded n times
 * while a change to the base is not. Two sliders exist so that comparison can
 * be run by hand rather than asserted.
 */
export function getL2P33Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In Level 1 you met the **10% rule**: roughly a tenth of the energy at one **trophic level** reaches the level above it.\n\nNow let us put real numbers on it, because the numbers say something the rule on its own does not.\n\nOne square metre of grassland captures about **20,000 kilojoules** of sunlight in a year. A kilojoule (**kJ**) is a unit of energy -- about what you would get from a single peanut.\n\nFollow those 20,000 kJ up four steps, from grass to eagles. **How much arrives at the top?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "About 2 kJ. Each step keeps a tenth, and a tenth of a tenth of a tenth of a tenth is one ten-thousandth of the start.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "About 5,000 kJ. Each step takes its share, so a decent fraction of the original should still be there at the top.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That answer assumes the losses **add up**. They do not -- they **multiply**, and that changes everything.\n\nIf each step simply subtracted a fixed amount, four steps might well leave you a quarter of what you started with. But each step keeps a **fraction** of whatever it is handed, and fractions multiply together.\n\nWatch what that actually does:\n\n| Level | Who | Energy |\n| --- | --- | --- |\n| 0 | grass (**producers**) | 20,000 kJ |\n| 1 | grasshoppers | 2,000 kJ |\n| 2 | small birds | 200 kJ |\n| 3 | hawks | 20 kJ |\n| 4 | eagles (**top predators**) | 2 kJ |\n\nFrom 20,000 down to 2. The eagle level receives **one ten-thousandth** of what the grass captured.",
            options: [
                { id: 'cont', label: "So the losses multiply instead of adding?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly. And once you see it as multiplication, you can calculate it instead of guessing.\n\n**Step 1: a percentage is a multiplier.** \"Keeps 10%\" is another way of writing \"multiply by 0.1\". Likewise 5% means multiply by 0.05, and 20% means multiply by 0.2.\n\n**Step 2: one step is one multiplication.**\n\nEnergy at level 1 = 20,000 x 0.1 = **2,000 kJ**\n\n**Step 3: each further step multiplies again.**\n\nLevel 2 = 2,000 x 0.1 = **200 kJ**\nLevel 3 = 200 x 0.1 = **20 kJ**\nLevel 4 = 20 x 0.1 = **2 kJ**\n\nMultiplying by 0.1 four times is the same as multiplying by 0.1 to the power of 4, so the whole chain collapses into one line:\n\n**Energy at level n = starting energy x (efficiency) to the power of n**\n\nThat little **n** is simply the number of steps up from the producers. The fraction each level passes on has a name: the **ecological efficiency**.",
            options: [
                { id: 'try', label: "Let me try one myself.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A pond's algae capture **8,000 kJ** per square metre per year. The ecological efficiency here is **10%**.\n\nHow much energy reaches the **secondary consumers** -- the animals two steps above the algae?",
            options: [
                { id: 'right', label: "80 kJ, because 8,000 x 0.1 x 0.1 = 80.", nextNodeId: 'efficiency', sentiment: 'positive' },
                { id: 'one_step', label: "800 kJ, because 8,000 x 0.1 = 800.", nextNodeId: 'math_wrong' },
                { id: 'subtract', label: "6,400 kJ, because two steps take 10% away each time.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two very common slips, and both are worth naming.\n\n**Slip 1: stopping one step early.** 800 kJ is the **primary consumer** level -- one step up. Secondary consumers are **two** steps up, so the 0.1 has to be applied twice. Count the arrows, not the animals.\n\n**Slip 2: taking 10% away instead of keeping 10%.** If you subtract a tenth twice you get 8,000 x 0.9 x 0.9 = 6,480, which is barely any loss at all. But the level does not lose a tenth -- it **keeps** a tenth and loses the other nine.\n\nSo: 8,000 x 0.1 = 800, then 800 x 0.1 = **80 kJ**.\n\nOr in one line, 8,000 x 0.1 to the power of 2 = 8,000 x 0.01 = **80 kJ**.",
            options: [
                { id: 'retry', label: "Got it -- keep a tenth, and do it once per step.", nextNodeId: 'efficiency' }
            ]
        },
        efficiency: {
            id: 'efficiency',
            speaker: 'AI',
            content: "Now the part Level 1 left out. **10% is an average, not a law.** Real ecological efficiency runs from about **2% to 20%**, and what decides it is where the energy goes when it is not being passed on.\n\nMost of it is spent on **respiration** -- the chemical process every living thing uses to release energy from food. That energy does the work of staying alive, and leaves as heat.\n\nAnd here is what makes the difference:\n\n- An **endotherm** (a warm-blooded animal, like a bird or a mammal) burns most of its food just holding its body temperature steady. Very little is left to become new body. Efficiency: often only **2-3%**.\n- An **ectotherm** (a cold-blooded animal, like an insect or a fish) takes its warmth from its surroundings and spends almost nothing on it. Efficiency: up to **20%**.\n\nSo a food chain made of insects and fish carries energy upward far better than one made of birds and mammals -- from exactly the same grass.",
            options: [
                { id: 'explore', label: "Show me both dials.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "The lab now gives you **two** dials, because there are two different things you could change.\n\n**Producer Energy** sets how much sunlight the grass captures -- the size of the base.\n**Transfer Efficiency** sets what fraction each level passes upward.\n\nIn the picture the bars are **drawn to fit** the screen, so their **widths** do not show the real sizes. The **numbers** printed on them are the real ones.\n\nUnderneath you will see how much **meadow** one **hawk** needs for a year, worked out like this:\n\n**area = energy one hawk needs / energy reaching the hawk level per square metre**\n\nA hawk needs roughly **150,000 kJ** a year. The answer comes out in **square metres**, and to make that picturable it is also given in **tennis courts** -- one court is 261 square metres.\n\nMove both dials. **Which one changes the top of the pyramid more?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "I have had a go. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** You manage a nature reserve. Its grass captures **10,000 kJ** per square metre per year, and its ecological efficiency is **5%**.\n\nYou have the budget for exactly **one** of these:\n\n**Option A** -- double the grass energy, from 10,000 to **20,000 kJ**, by improving the soil.\n**Option B** -- double the efficiency, from 5% to **10%**, by protecting the insect-eating chain instead of the bird-eating one.\n\nWhich puts more energy into the **eagles**, four steps up?",
            options: [
                { id: 'right', label: "Option B. The efficiency is multiplied in four times over, so doubling it multiplies the top by 2 x 2 x 2 x 2 = 16, while doubling the base only doubles it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Option A. Twice as much energy at the bottom must mean twice as much at every level, including the top.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Option A does double the top -- you are right about that. The trouble is that Option B does far more than double it. Let us do all three sums.\n\n**Starting point:** 10,000 x 0.05 to the power of 4\n0.05 to the power of 4 = 0.00000625, so the eagles get **0.0625 kJ**.\n\n**Option A** (double the base): 20,000 x 0.00000625 = **0.125 kJ**. Twice as much, exactly as you said.\n\n**Option B** (double the efficiency): 10,000 x 0.1 to the power of 4 = 10,000 x 0.0001 = **1.0 kJ**. That is **sixteen** times the starting point -- and **eight times more than Option A**.\n\nHere is why the two are not comparable. The starting energy is used **once**, at the bottom. The efficiency is used **once per step** -- four times over. Anything you multiply four times has four times the leverage.\n\nSo doubling the base gives you 2. Doubling the efficiency gives you 2 to the power of 4.",
            options: [
                { id: 'retry', label: "The efficiency gets multiplied in four times -- the base only once.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Efficiency compounds. Abundance does not.**\n\nWrite the two changes side by side and the reason is impossible to miss:\n\n**Energy at level n = base x efficiency to the power of n**\n\nMultiply the **base** by 2 and the answer doubles -- once.\nMultiply the **efficiency** by 2 and the answer grows by 2 to the power of n. At four steps up, that is sixteenfold.\n\nThis is why the same rule keeps turning up in ecology:\n\n- **Short chains beat long ones.** Every step you remove is one fewer multiplication by a small number.\n- **Efficient links beat abundant bases.** Protecting the transfer matters more than growing more grass.\n- **The top of a pyramid is fragile.** A small drop in efficiency at any level is felt four times over at the top.\n\nAnd it is why the area a top predator needs is so enormous. At 5% efficiency a single hawk needs a stretch of meadow you could not walk across in a minute. At 20%, a fraction of it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Efficiency compounds, abundance does not!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned the 10% rule into arithmetic.**\n\n- A percentage is a **multiplier**: 10% means multiply by 0.1\n- One step up a **trophic level** is one multiplication\n- **Energy at level n = base x efficiency to the power of n**\n- Losses **multiply**, they do not add -- which is why the fall is so steep\n- **Ecological efficiency** is really **2% to 20%**, not a fixed 10%\n- **Endotherms** spend most of their food on staying warm, so they pass on least\n- **Ectotherms** spend almost nothing on warmth, so they pass on most\n- Most of what is not passed on leaves through **respiration**, as heat\n- **Efficiency compounds n times; the base counts once**\n\nThat last line is the whole lesson. It is also why a small, efficient food chain can support a predator that a large, wasteful one cannot.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Energy at level n = base x efficiency to the power of n!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- The Energy Pyramid, In Numbers!**\n\nThe 10% rule told you energy shrinks. The arithmetic tells you **how fast, and what to do about it**.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| A percentage is a multiplier | 10% -> x 0.1 | One step, one multiplication |\n| Steps compound | E = base x efficiency^n | Four steps, four multiplications |\n| Losses multiply, not add | 0.1^4 = 0.0001 | 20,000 kJ becomes 2 kJ |\n| Efficiency varies | 2% to 20%, not a fixed 10% | **Endotherms** low, **ectotherms** high |\n| Efficiency compounds | Double it -> 2^n at level n | Sixteenfold at four steps |\n| Base counts once | Double it -> 2, always | **Abundance** cannot compound |\n\n**The one line to remember:** doubling the **efficiency** beats doubling the **base**, and the more steps there are, the more it beats it by.\n\n**Next in Level 2:** the same treatment for C33 and B33 -- putting numbers on the recycling loop and on the pyramid of living matter."
        }
    };
}
