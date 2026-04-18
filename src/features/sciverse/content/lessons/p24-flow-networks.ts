import { DialogNode } from '../../types';

/**
 * P24 — Flow Networks
 * Big Idea 24: "How Do Networks Deliver What Matters?"
 */
export const getP24Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content:
            `Welcome to the Flow Networks Lab! 🚰\n\nHow do **cities** move water efficiently to every building? Why do **networks** matter for delivery?\n\nIn this visual, you see a **pipe network** connecting a **Source** (blue) to a **Sink** (green).\n- **Gray lines** are **pipes** (edges) carrying water.\n- The **dashed green line** highlights a main **return path** from source to sink.\n- **Blue dots** show water flow along the pipes.\n- **Nodes** (A, B, C, D) are junctions.\n\nUse the **control box** (bottom left) to adjust **Pressure** and **Resistance**. Watch how **Throughput** and the return path change!\n\n**Key idea:** Flow networks use **pressure gradients** and **branch resistance** to control delivery.\n\nWhy do you think engineers care about **matching** the network to the delivery needs?`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', pressure: 55 } },
        options: [
            { id: 'gradient', label: 'Pressure differences drive flow across the network.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'random', label: 'Flow is mostly random in pipes.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: '**Network flow** follows **gradients** and **resistance**, not random motion at system scale.\n\nTry lowering resistance and raising pressure to see how flow patterns change in the visual!',
        options: [{ id: 'cont', label: 'So pressure and resistance set distribution.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Right! **Branch geometry** and **resistance** determine how resources split.\n\n- **Return paths**: Water flows from source to sink along different possible routes (see the dashed green line).\n- **Match**: How well the network paths allow efficient flow from source to sink. **High throughput** means the network is well-matched for delivery.\n\nTry adjusting **Pressure** and **Resistance** in the control box — see how the **return path** and **Throughput** respond!\n\n**Visual tip:** The legend at top right explains the colors and lines.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network', branchResistance: 45 } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'If **one branch narrows**, flow through it usually:',
        options: [
            { id: 'decrease', label: 'Decreases due to higher resistance.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'increase', label: 'Increases automatically.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: '**Narrowing** raises **resistance**, often reducing branch flow.\n\nTry increasing resistance in the control box and watch the pipes get thinner and flow slow down.',
        options: [{ id: 'retry', label: 'Higher resistance lowers branch flow.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Correct! **Network performance** depends on **connected pathway properties**.\n\nA well-designed network balances **pressure** and **resistance** for efficient delivery.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', narrowedBranch: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: `**Discovery:**\n- **Return paths** show how water can reach the sink through the network.\n- A good **match** (high throughput) means the network delivers efficiently.\n- If **resistance** is too high or **pressure** too low, return paths are blocked and throughput drops.\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Pressure | More driving force | Throughput rises; more flow |\n| Resistance | Harder to push flow | Throughput drops; pipes thin |\n| Return Paths | More options | Network is robust to blockages |\n| Match | High throughput | Efficient delivery |`,
        options: [{ id: 'done', label: 'Complete P24', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: '🔗 **P24 Complete — Flow Networks**\n\n- **Physics (P24):** Flow Networks — pressure, resistance, and branch throughput govern delivery\n- **Chemistry (C24):** Reaction Networks — pathway bottlenecks and catalytic rerouting optimize output\n- **Biology (B24):** Vascular Transport — xylem/phloem pathways deliver water, sugar, and nutrients throughout plants\n\nIn all three: **networks branch, balance pressure, and adapt to deliver resources where they\'re needed!** 🚰🧬🌿\n\n✅ **Lesson P24 Complete!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
