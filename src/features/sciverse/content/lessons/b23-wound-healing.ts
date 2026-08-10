import { DialogNode } from '../../types';

/**
 * B23 — Wound Healing
 * Big Idea 23: "How Do Materials Break and Recover?"
 */
export const getB23Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content:
            `Welcome to the Wound Healing Lab! 🩹\n\nHow do **tissues repair** after damage? Why is **healing** a **staged process** instead of instant?\n\nIn this visual, you see a **tissue gap** (the wound) between two layers.\n- The **red glow** at the edges shows **inflammation** (immune response).\n- **Green dots** are **cells** migrating to rebuild tissue.\n- **Blue dots** represent **oxygen** flowing to the wound — essential for healing.\n- The **pink fill** shows new tissue forming.\n\nUse the **control box** (bottom left) to adjust **Inflammation** and **Oxygenation**. Watch how **Healing Progress** changes!\n\n**Key idea:** Healing is a **coordinated sequence**:\n1. **Clotting** (stop bleeding)\n2. **Inflammation** (clean up)\n3. **Tissue rebuilding** (regeneration)\n\nWhy do you think wounds heal faster with good oxygen and controlled inflammation?`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', inflammation: 50 } },
        options: [
            { id: 'phases', label: 'Different cell processes run in sequence: clotting, inflammation, rebuilding.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'single_step', label: 'One cell type does everything at once.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: '**Healing** is **coordinated**: **immune cells** clean damage, then **tissue rebuild** pathways restore structure.\n\nIf you set **inflammation** too high in the visual, healing slows down — the wound stays open longer!',
        options: [{ id: 'cont', label: 'So repair is a regulated timeline.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Exactly! **Biological materials** recover through **controlled cellular stages**.\n\nTry adjusting the controls — see how **Healing Progress** responds.\n\n**Visual tip:** The control box sliders let you simulate different healing environments. High oxygen = faster repair!',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'healing', collagenLevel: 40 } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'If **infection** persists, healing usually:',
        options: [
            { id: 'slows', label: 'Slows or stalls due to ongoing inflammation.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'speeds', label: 'Always speeds up.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: '**Persistent infection** disrupts **repair signaling** and **tissue rebuilding**.\n\n**Unresolved inflammation** can delay or block healing.',
        options: [{ id: 'retry', label: 'Unresolved inflammation can delay repair.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Correct! **Recovery** depends on both **mechanics** and **biological control**.\n\nIn the visual, when infection is present, healing progress stalls.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', infection: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: '**Discovery:** **Living materials** can **self-repair**, but only under **supportive conditions**.\n\n**Summary:**\n- High **oxygenation** = faster healing\n- High **inflammation** = slower healing\n- **Visual:** Healing progress bar and tissue fill show real-time repair',
        options: [{ id: 'done', label: 'Complete B23', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 23 Complete — How Do Materials Break and Recover?**\n\n- **Physics (P23):** Stress & Fracture — cracks and fatigue weaken materials\n- **Chemistry (C23):** Corrosion & Protection — electrochemical degradation eats away metals\n- **Biology (B23):** Wound Healing — tissue repair rebuilds damaged structures\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Inflammation | Higher | Slower healing |\n| Oxygenation | Higher | Faster healing |\n| Infection | Present | Healing stalls |\n| Healing Progress | Higher | More tissue repair |\n\nIn all three: **things break under stress, but understanding how leads to better protection and repair!** 🪓🧲🩹\n\n✅ **Lesson B23 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
