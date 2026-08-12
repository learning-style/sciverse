import { DialogNode } from '../../types';

export function getC40Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A chemist wants to know whether a new additive makes a reaction faster. So she adds it -- and also switches to a fresh batch of chemicals, warms the room a little, and stirs more vigorously.\n\nThe reaction goes faster! She announces that the additive works.\n\nDo you believe her?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'no', label: "No -- she changed four things at once, so there is no way to know which one caused the speed-up.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'yes', label: "Yes -- the reaction really did go faster, and that is the result she was looking for.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The reaction really did speed up -- that part is true. But **why** it sped up is completely unknown!\n\nShe changed four things at once. Warmth alone speeds up nearly every reaction. Better stirring alone speeds up many. A fresher batch could be more concentrated. The additive might have done nothing at all -- or it might even have *slowed* things down while the other three changes overwhelmed it.\n\nThis is called a **confounded** experiment. The evidence is real but it cannot answer the question that was asked.",
            options: [
                { id: 'cont', label: "So changing several things at once ruins the answer?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A **fair test** follows one strict rule: **change one thing, keep everything else the same.**\n\nHere is the vocabulary scientists use:\n\n1. **Independent variable** -- the one thing you deliberately change (the additive)\n2. **Dependent variable** -- what you measure to see the effect (the reaction time)\n3. **Controlled variables** -- everything you deliberately hold fixed (temperature, stirring, concentration, container)\n4. **Control group** -- an identical run **without** the additive, for comparison\n\nThat control group is the piece people forget most often. Without something to compare against, a result means almost nothing -- \"the reaction took 4 minutes\" is only useful if you know what it takes **without** the additive.\n\nSlide **Variables Changed** and see how quickly the answer becomes unusable!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change variables and see what happens!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A company tests a new plant fertiliser. They give it to plants in a **sunny greenhouse**, while the untreated control plants sit in a **shady corner**. The treated plants grow much taller.\n\nWhat is wrong with this test?",
            options: [
                { id: 'right', label: "Sunlight changed along with the fertiliser, so the extra growth could be entirely due to the light.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing is wrong -- there was a control group, which is what a fair test requires.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "There *is* a control group -- but a control group only works if it is **identical in every way except the one thing being tested**.\n\nHere, two things differ between the groups: the fertiliser **and** the sunlight. Plants grow taller in sunlight regardless of what you feed them, so the sunny plants would probably have won even with no fertiliser at all.\n\nThe extra variable is called a **confounding variable** -- it travels alongside the thing you are testing and steals the credit. You genuinely cannot tell the two apart from this data.\n\nThe fix is simple: put **both** groups in the same light, same soil, same water, same pots. Then the only difference left is the fertiliser, and any difference in growth must be down to it.",
            options: [
                { id: 'retry', label: "Oh -- a control group has to match in every other way!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! A **control group** is only useful when it is identical apart from the one thing being tested.\n\nThe rules for a fair test:\n- Change **one** thing -- the **independent variable**\n- Measure the effect -- the **dependent variable**\n- Hold everything else fixed -- the **controlled variables**\n- Compare against a matched **control group**\n- Watch out for **confounding variables** sneaking in\n\nThis connects to **P40 Measure It Again**. That lesson made your *measurements* trustworthy; this one makes your *comparison* trustworthy. You need both -- a perfectly measured confounded experiment still proves nothing.\n\nOne more question remains: how many plants do you need before you believe the result? That is B40!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Change one thing, keep everything else the same!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how to design a fair test!**\n\n- Change only the **independent variable**\n- Measure the **dependent variable**\n- Hold all **controlled variables** fixed\n- Compare against a matched **control group**\n- A **confounding variable** changes alongside your test and steals the credit\n- Changing several things at once gives a **confounded** result that proves nothing\n\nNext in B40: how much evidence is enough to actually believe a result?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "One change at a time, with a matched control!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C40 Complete -- The Fair Test!**\n\nA result only means something if the experiment could have proved you wrong.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Change one thing only | The **independent variable** | Otherwise you cannot assign the cause |\n| Keep the rest fixed | **Controlled variables** | Removes competing explanations |\n| Compare to a matched group | The **control group** | A result needs something to beat |\n| Watch for sneaky extras | **Confounding variables** | They steal the credit |\n\n**Up next:** B40 (Follow the Evidence) -- how much evidence is enough?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
