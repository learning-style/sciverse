import { DialogNode } from '../../types';

/**
 * P23 — Stress and Fracture
 * Big Idea 23: "How Do Materials Break and Recover?"
 */
export const getP23Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: 'Why do **bridges** and **materials** sometimes fail after many small loads?\n\n**Stress and fracture** are about how repeated or concentrated **forces** can cause cracks to grow and structures to break—even if no single load is huge.\n\n**Visual guide:**\n- The **blue bar** is the material under test.\n- **Red arrows** show the applied **load** (force).\n- The **notch** in the bar is a weak spot—watch how it affects risk.\n- **Red lines** around the notch show **stress concentration**.\n- If risk is high, a **crack** grows from the notch.\n- Adjust **Load** and **Notch Severity** sliders to see how failure risk changes.\n\nA high risk means the material is close to breaking.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', stress: 45 } },
        options: [
            { id: 'fatigue', label: 'Microcracks accumulate and reduce strength over time.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'instant_only', label: 'Only one huge load matters.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: '**Fatigue** means repeated, even small, loads can still cause eventual **failure**.\n\nIt\'s not just one big force—**history** and **weak spots** matter.',
        options: [{ id: 'cont', label: 'So load history matters.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Right. **Stress concentration** and **crack growth** determine **fracture risk**.\n\nDesigners try to avoid sharp notches and spread out forces to prevent failure.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'fatigue', crackLength: 30 } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'A sharp **notch** usually causes:',
        options: [
            { id: 'concentration', label: 'Higher local stress concentration.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'uniform', label: 'More uniform stress distribution.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: '**Notches** focus **stress** and accelerate **crack initiation**.',
        options: [{ id: 'retry', label: 'Notches increase local stress.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Correct. **Geometry** is as important as average **load**.\n\nAvoiding sharp corners and notches makes materials safer.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', notchRisk: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: 'Discovery:\n- **Material failure** is often **cumulative**, **local**, and preventable by **design**.\n- The visual shows how **load**, **notch**, and **stress concentration** interact.\n- Watch for **crack growth** when risk is high—this is how real failures start!',
        options: [{ id: 'done', label: 'Complete P23', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 23 Complete — How Do Materials Break and Recover?**\n\n- **Physics (P23):** Stress & Fracture — cracks and fatigue weaken materials\n- **Chemistry (C23):** Corrosion & Protection — electrochemical degradation eats away metals\n- **Biology (B23):** Wound Healing — tissue repair rebuilds damaged structures\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Load | Higher force | More risk of fracture |\n| Notch Severity | Sharper notch | Higher stress concentration |\n| Fatigue Cycles | More cycles | Crack growth, failure |\n| Stress Concentration | Higher | Localized failure |\n\nIn all three: **things break under stress, but understanding how leads to better protection and repair!** 🪓🧲🩹\n\n✅ **Lesson P23 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
