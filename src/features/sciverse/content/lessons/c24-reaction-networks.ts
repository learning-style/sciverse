import { DialogNode } from '../../types';

/**
 * C24 — Reaction Networks
 * Big Idea 24: "How Do Networks Deliver What Matters?"
 */
export const getC24Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: `In **chemistry**, reactions rarely happen in isolation. **Products** from one step often become **reactants** for the next. Why model this as a **network**?\n\n- **Multiple connected pathways** control yields, timing, and what gets produced.\n- **Bottlenecks** and **catalysts** shift the flow through the network.\n- **Return paths** can recycle intermediates or amplify output.\n\n**Explore how changing the network structure, bottleneck, or catalyst strength affects the final product!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', reactantFlux: 50 } },
        options: [
            { id: 'pathways', label: 'Multiple connected pathways control yields and timing.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'single_step', label: 'Most systems are one-step only.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: 'Real chemical systems often **branch** and **recombine**. The **network structure** determines what gets made, how fast, and in what amount.',
        options: [{ id: 'cont', label: 'So chemistry can be pathway-limited.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: '**Exactly!**\n\n- **Bottlenecks** slow down the whole network.\n- **Catalysts** can remove bottlenecks and boost yield.\n- **Return paths** can recycle or amplify output.\n\n**Try adjusting the sliders to see how the network responds!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network', catalystOn: false } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'Adding a **catalyst** to one step usually:',
        options: [
            { id: 'redistribute', label: 'Redistributes flux and can raise downstream yield.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'no_effect', label: 'Never changes network output.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: '**Catalysts** can remove **bottlenecks** and shift pathway throughput.\n\nTry again!',
        options: [{ id: 'retry', label: 'Catalysts can change network flow.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: '**Correct!**\n\n**Network chemistry** is about **rates**, **links**, and **constraints**.\n\n- **Catalysts** speed up steps.\n- **Bottlenecks** slow things down.\n- **Return paths** can recycle intermediates.\n\n**Keep exploring!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', catalystOn: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: '**Discovery:**\n\n**Connected reaction pathways** decide what gets produced and how fast.\n\n- **Network structure** matters!\n- **Bottlenecks** and **catalysts** change the outcome.\n- **Return paths** can boost or limit yield.\n\nReady to complete the lesson?',
        options: [{ id: 'done', label: 'Complete C24', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 24 Complete — How Do Networks Deliver What Matters?**\n\n- **Physics (P24):** Flow Networks — pressure and resistance control throughput\n- **Chemistry (C24):** Reaction Networks — pathways, bottlenecks, and catalysts control yield\n- **Biology (B24):** Vascular Transport — branching vessels deliver nutrients\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Catalyst Strength | Higher | Faster reactions, higher yield |\n| Bottleneck Severity | Higher | Slower overall output |\n| Pathway Branching | More | More possible products |\n| Return Paths | Present | Recycling, higher efficiency |\n\nIn all three: **networks determine what gets delivered, how fast, and how much!** 🌐⚗️🫀\n\n✅ **Lesson C24 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
