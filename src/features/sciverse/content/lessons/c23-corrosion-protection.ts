import { DialogNode } from '../../types';

/**
 * C23 — Corrosion and Protection
 * Big Idea 23: "How Do Materials Break and Recover?"
 */
export const getC23Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content:
            `Welcome to the Corrosion Lab! 🧲\n\nWhy does **steel rust** so much faster near the **ocean** than in dry air?\n\nIn this visual, you see a **metal surface** exposed to the environment.\n- **Blue droplets** above the metal represent **humidity** (water in the air).\n- **Red crystals** below show **salt** (salinity) on the surface.\n- **Brown patches** spreading across the metal are **rust** (iron oxide) — the result of **corrosion**.\n\nUse the **control box** (bottom left) to adjust **Humidity** and **Salinity**. Watch how the **Oxidation Rate** and the amount of rust change!\n\n**Key idea:** Corrosion is a **chemical reaction** that needs both **water** and **ions** (like salt) to speed up.\n\nWhy do you think ships and bridges near the sea need extra protection?`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', humidity: 60, salinity: 45 } },
        options: [
            { id: 'electrochem', label: 'Moist salty environments accelerate electrochemical corrosion.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'age_only', label: 'Rust speed depends only on metal age.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: '**Environment** matters: **water** and **ions** support **oxidation-reduction** pathways that speed up corrosion.\n\nIf you increase **humidity** or **salinity** in the visual, you’ll see more rust form — that’s chemistry in action!',
        options: [{ id: 'cont', label: 'So chemistry controls failure rate.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Exactly! **Corrosion** is a **chemical process** that can be slowed with **coatings** (like paint) or **sacrificial protection** (like zinc plating).\n\nTry turning up the controls — notice how the **Oxidation Rate** and rust patches respond.\n\n**Visual tip:** The control box sliders let you simulate different environments. High humidity and salt = rapid corrosion!',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'corrosion', oxidationRate: 62 } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'A **protective paint layer** helps mainly because it:',
        options: [
            { id: 'barrier', label: 'Blocks oxygen/water contact with metal.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'adds_mass', label: 'Makes the metal heavier.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: '**Protection** is about **chemical isolation**, not weight.\n\n**Paint** and **coatings** keep water and ions away from the metal, slowing corrosion.',
        options: [{ id: 'retry', label: 'Barrier layers slow oxidation reactions.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Correct! **Corrosion control** is **chemistry-guided engineering**.\n\nEngineers use **barrier layers**, **galvanization**, and **environmental control** to protect structures.\n\nIn the visual, when the coating is ON, rust stops spreading.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', coatingOn: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: '**Discovery:** A material’s **lifetime** depends on its **chemical reaction pathways** and the **environment**.\n\n**Summary:**\n- High **humidity** and **salinity** = fast corrosion\n- **Coatings** and **sacrificial metals** = slower corrosion\n- **Visual:** Rust patches and oxidation rate show real-time chemical change',
        options: [{ id: 'done', label: 'Complete C23', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 23 Complete — How Do Materials Break and Recover?**\n\n- **Physics (P23):** Stress & Fracture — cracks and fatigue weaken materials\n- **Chemistry (C23):** Corrosion & Protection — electrochemical degradation eats away metals\n- **Biology (B23):** Wound Healing — tissue repair rebuilds damaged structures\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Humidity | Higher | Faster corrosion |\n| Salinity | Higher | Faster corrosion |\n| Oxidation Rate | Higher | More rust, faster failure |\n| Coating/Protection | Better | Slower corrosion |\n\nIn all three: **things break under stress, but understanding how leads to better protection and repair!** 🪓🧲🩹\n\n✅ **Lesson C23 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
