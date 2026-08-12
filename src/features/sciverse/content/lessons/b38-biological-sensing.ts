import { DialogNode } from '../../types';

export function getB38Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A bat flies through a pitch-black cave at full speed, dodging rocks and catching a moth in mid-air. No lights, no map.\n\nEngineers spent decades building robots that can do a fraction of that. The bat has been doing it for **50 million years**.\n\nWhat do you think the bat and a robot have in common?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'loop', label: "Both run the same loop -- sense the world, decide what to do, act, then sense again.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'nothing', label: "Nothing really -- living things and machines work in completely different ways.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The parts are different, but the **pattern is identical** -- and that is one of the most useful discoveries in engineering.\n\nA bat sends out a sound, hears the echo, works out how far away the moth is, adjusts its wings, and immediately sends another sound. Sense, compare, correct, repeat.\n\nThat is exactly the **feedback loop** from **P38**. Robot engineers did not invent it. They copied it. Studying nature's designs to build better machines even has a name: **biomimicry**.",
            options: [
                { id: 'cont', label: "So animals and robots use the same loop?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Compare them side by side:\n\n| Job | Robot | Animal |\n| --- | --- | --- |\n| Sense | **sensor** | eye, ear, nose, skin |\n| Carry signal | wire | **nerve** |\n| Decide | computer chip | **brain** |\n| Act | motor | **muscle** |\n| Timing | processor clock | **reaction time** |\n\nBut living sensors are still better in ways engineers envy:\n- A dog's nose detects smells at **10,000 times** lower levels than most machines\n- Your eyes adjust from starlight to midday sun -- solving the **saturation** problem from C38\n- A gecko's foot senses and grips a surface with no glue, no motors, and no power at all\n\nSlide **Reaction Time** and watch how quickly the creature can respond!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me test different reaction times!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** When you touch something painfully hot, your hand pulls back **before** you consciously feel the pain. The signal never reaches your thinking brain first -- it turns around at your spinal cord.\n\nWhy would a body be built that way?",
            options: [
                { id: 'right', label: "A shorter signal path means a much faster response, and with burns every fraction of a second of contact matters.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The brain is too busy with other thoughts, so the spinal cord handles it as a backup.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Your brain is never too busy for pain -- it is simply **too far away**.\n\nA signal from your hand to your brain and back takes roughly **0.25 seconds**. Turning it around at the spinal cord instead takes about **0.05 seconds** -- five times faster. On a hot stove, that difference is the difference between a red mark and a serious burn.\n\nThis is a **reflex arc**: the sense-and-act loop runs at the nearest point that can handle it, skipping the long trip to headquarters.\n\nEngineers copy this exactly. A robot's emergency stop is wired directly into the motor controller, not routed through the main computer -- for precisely the same reason. Short loop, fast response.",
            options: [
                { id: 'retry', label: "Oh -- a shorter loop is a faster loop!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Short loops are fast; long loops are smart.** Good designs use both -- reflexes for emergencies, thinking for planning.\n\nHere is how all of Big Idea 38 fits together:\n- **P38** -- the **feedback loop**: sense, compare, correct, repeat, with the **gain** tuned just right\n- **C38** -- **sensors** are materials that turn light, heat, or pressure into electricity, within a limited **range**\n- **B38** -- animals invented all of it first, and engineers copy them through **biomimicry**\n\nThe next time you catch a falling cup without thinking, you have just run the same loop a robot needs a full computer to manage.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Nature invented the feedback loop first!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered that animals are robots' teachers!**\n\n- Animals and robots run the identical loop: **sense, decide, act, repeat**\n- **Nerves** are wires, **brains** are chips, **muscles** are motors\n- Living sensors often beat built ones -- a dog's nose is 10,000 times more sensitive\n- Your eyes solve the **saturation** problem by adjusting their range\n- A **reflex arc** skips the brain to react about 5 times faster\n- Copying nature's designs is called **biomimicry**\n\nP38 built the loop, C38 built the senses, and B38 showed nature did it all first!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Animals were the first robots!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 38 -- B38 Complete!**\n\nNature's Robots -- How Do Robots Sense and Act?\n\nEvery robot is a copy of something a living creature already does better.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Same loop in both | Sense, decide, act, repeat | Engineers copied nature |\n| Nerves, brains, muscles | Wires, chips, motors | Different parts, same jobs |\n| Reflexes skip the brain | The **reflex arc** | About 5 times faster |\n| Copying nature has a name | **Biomimicry** | Millions of years of testing |\n\n**Big Idea 38 connections:**\n- P38 (The Feedback Loop) showed how sense-compare-correct keeps a machine on target, and how wrong **gain** makes it wobble\n- C38 (Sensors Made of Chemistry) showed how materials turn light and heat into electrical signals, and how they **saturate**\n- B38 (Nature's Robots) showed that animals run the very same loop with nerves, brains, and muscles -- and still do it better!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
