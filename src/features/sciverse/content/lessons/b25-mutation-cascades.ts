import { DialogNode } from '../../types';

/**
 * B25 — Mutation Cascades
 * Big Idea 25: "How Can Tiny Changes Cause Big Effects?"
 */
export const getB25Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: `In **biology**, a **tiny DNA change** can ripple out to affect **whole organisms** and even **populations**.

- **Mutation cascades** multiply effects through **gene networks** and **selection**.
- **Amplification** means small genetic changes can lead to big trait shifts.
- **Selection pressure** and **genetic diversity** control how mutations spread or fade.

**Watch how a single mutation can reshape a population!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', mutationRate: 10 } },
        options: [
            { id: 'pathway', label: 'Small genetic changes can propagate through protein and regulatory networks.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'no_effect', label: 'Single mutations can never matter.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: '**Many mutations are small**, but some alter **key pathways** and can scale to **visible traits**. Context and selection matter! 🧬',
        options: [{ id: 'cont', label: 'So effects depend on context and selection.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: '**Exactly!**\n\n- **Biological systems** can **amplify tiny molecular changes** across many levels.\n- **Mutation cascades** are why evolution can be both gradual and sudden.\n\n**Try adjusting the sliders to see how mutations and selection shape the population!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cascade', traitShift: 40 } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'A **mutation** that increases **survival** in one environment will likely:',
        options: [
            { id: 'increase_freq', label: 'Increase in frequency over generations.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'vanish', label: 'Always disappear quickly.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: '**If advantageous**, selection can **increase its frequency** in the population.',
        options: [{ id: 'retry', label: 'Selection can amplify useful variants.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: '**Correct!**\n\n- **Tiny genetic variation** can scale into **population-level change**.\n- **Selection** and **mutation** together drive evolution.\n\n**Keep exploring!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', selectionOn: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: '**Discovery:**\n\n**Small molecular differences** can **cascade** into **large biological outcomes**.\n\n- **Mutation cascades** are why evolution is both creative and unpredictable! 🧬\n\nReady to complete the lesson?',
        options: [{ id: 'done', label: 'Complete B25', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 25 Complete — How Can Tiny Changes Cause Big Effects?**

- **Physics (P25):** Chaos in Motion — tiny changes in starting conditions can lead to big differences
- **Chemistry (C25):** Chain Reactions — small triggers can amplify into large effects
- **Biology (B25):** Mutation Cascades — single DNA changes can reshape populations

**Summary Table:**
| Variable | If Increased | Typical Effect |
| --- | --- | --- |
| **Mutation Impact** | Higher | **More trait change** |
| **Selection Pressure** | Higher | **Faster population shift** |
| **Cascade Steps** | More | **Greater amplification** |
| **Genetic Diversity** | Higher | **More possible outcomes** |

In all three: **small causes can have big consequences!** 🦋🧬🌱

**Explore more:**
- [P25 Chaos in Motion](#)
- [C25 Chain Reactions](#)
- [B25 Mutation Cascades](#)
- [B26 Weather & Life Lab](#)

**Forward Link:**
- In **B26**, test how environmental pressure turns small genetic differences into survival advantages.

✅ **Lesson B25 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
