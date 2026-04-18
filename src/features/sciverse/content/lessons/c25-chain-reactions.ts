import { DialogNode } from '../../types';

/**
 * C25 — Chain Reactions
 * Big Idea 25: "How Can Tiny Changes Cause Big Effects?"
 */
export const getC25Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: `In **chemistry**, a **tiny trigger** can cause a **rapid surge** in some systems.\n\n- **Chain reactions** multiply effects through **propagation steps**.\n- **Amplification** means small inputs can lead to big outputs.\n- **Thresholds** and **inhibitors** control when cascades start or stop.\n\n**Watch how a single spark can ignite a chain reaction!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', initiatorLevel: 15 } },
        options: [
            { id: 'propagation', label: 'Propagation steps multiply reactive intermediates.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'single_event', label: 'Reactions stay one-step and isolated.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: '**Chain mechanisms** can **amplify effects** dramatically before **termination steps** dominate.\n\nThis is why some reactions are explosive or runaway!',
        options: [{ id: 'cont', label: 'So chemistry can amplify tiny starts.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: '**Exactly!**\n\n- **Reaction networks** can show **threshold-like behavior** from small inputs.\n- **Propagation** and **inhibition** balance determines the outcome.\n\n**Try adjusting the sliders to see how the chain grows or stops!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'chain', propagationRate: 65 } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'A **strong inhibitor** usually:',
        options: [
            { id: 'quench', label: 'Quenches reactive intermediates and slows amplification.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'boost', label: 'Always boosts chain growth.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: '**Inhibitors** often **reduce chain propagation** by removing reactive species.\n\n**Suppression** can stop a runaway reaction!',
        options: [{ id: 'retry', label: 'Inhibitors can suppress amplification.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: '**Correct!** **Amplification** depends on **propagation vs termination** balance.\n\n- **Chain reactions** are everywhere: combustion, polymerization, DNA copying.\n- **Tiny triggers** can have **huge effects**.\n\n**Keep exploring!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', inhibitorOn: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: '**Discovery:**\n\n**Tiny chemical changes** can **cascade** into **large system shifts**.\n\n- **Chain reactions** are not always dangerous—they’re also essential for life!\n\nReady to complete the lesson?',
        options: [{ id: 'done', label: 'Complete C25', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 25 Complete — How Can Tiny Changes Cause Big Effects?**\n\n- **Physics (P25):** Chaos in Motion — tiny changes in starting conditions can lead to big differences\n- **Chemistry (C25):** Chain Reactions — small triggers can amplify into large effects\n- **Biology (B25):** Mutation Cascades — single DNA changes can reshape populations\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Initiator | Higher | Faster chain start |\n| Inhibitor | Higher | More suppression, less amplification |\n| Propagation Rate | Higher | More rapid cascade |\n| Threshold | Lower | Easier to trigger chain |\n\nIn all three: **small causes can have big consequences!** 🦋⚗️🌱\n\n✅ **Lesson C25 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
