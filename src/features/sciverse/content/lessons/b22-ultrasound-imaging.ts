import { DialogNode } from '../../types';

/**
 * B22 — Ultrasound Imaging
 * Big Idea 22: "How Do Waves Help Us See the Invisible?"
 */
export const getB22Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: 'Doctors use **ultrasound** to see inside the body without surgery.\n\n**Ultrasound imaging** sends high-frequency **sound waves** into the body and listens for **echoes** that bounce back from different tissues.\n\n**Echo timing** gives **depth** (how far inside), and **echo strength** shows **boundaries** between tissues.\n\n**Visual guide:**\n- The **probe** at the top sends sound waves down.\n- The **yellow beam** is the ultrasound pulse.\n- **Horizontal green lines** are tissue boundaries.\n- **Pink arcs** are echoes returning from each boundary.\n- The **right panel** shows the echo trace—stronger echoes make bigger spikes.\n- Adjust **Echo** and **Attenuation** sliders to see how image quality changes.\n\nA clear image means echoes are strong and not lost with depth.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', pulseStrength: 55 } },
        options: [
            { id: 'echo', label: 'Echo timing and intensity map internal boundaries.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'xray_like', label: 'It works exactly like X-rays.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: '**Ultrasound** uses **sound waves**, not X-rays.\n\nThe **image quality** depends on how strong the **echoes** are and how much signal is **lost with depth** (**attenuation**).',
        options: [{ id: 'cont', label: 'So reflection reveals tissue structure.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Exactly. **Echoes** carry **location information**.\n\nIn this level, focus on two controls:\n- **Echo** (**stronger** is usually **clearer**)\n- **Attenuation** (**higher** means more **depth loss**)\n\nThe goal is to get a **clear image** by maximizing echo strength and minimizing attenuation.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'echo', showEchoes: true } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'A strong **echo** usually indicates:',
        options: [
            { id: 'boundary', label: 'A significant boundary between tissue types.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'no_change', label: 'No boundary at all.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: 'Strong **reflection** usually means **impedance changes** at a **boundary** between tissues.',
        options: [{ id: 'retry', label: 'Echo strength tracks tissue boundaries.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Correct. **Echoes** convert hidden **anatomy** into an **image**.\n\nThis is how doctors see organs, babies, and even blood flow—using only **sound**.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', highlightBoundary: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: 'Discovery:\n- **Ultrasound** uses **echoes** to see inside the body.\n- **Strong echoes** improve **clarity**.\n- **High attenuation** makes deep structures harder to see.\n- In the visual, the **probe** sends pulses, **echoes** bounce back from boundaries, and the **trace** shows echo strength.\n- Adjusting the controls helps you understand how sound reveals hidden structure!',
        options: [{ id: 'done', label: 'Complete B22', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 22 Complete — How Do Waves Help Us See the Invisible?**\n\n- **Physics (P22):** Seismic Wave Mapping — wave paths reveal hidden underground layers\n- **Chemistry (C22):** Spectroscopy Fingerprints — wavelength signatures identify elements invisibly\n- **Biology (B22):** Ultrasound Imaging — echo timing reconstructs internal body structures\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Echo Strength | Stronger | Clearer image |\n| Attenuation | Higher | More depth loss |\n| Boundary Contrast | Sharper | Easier tissue separation |\n| Probe Frequency | Higher | Finer detail, less depth |\n\nIn all three: **waves bounce, bend, and reflect to reveal what our eyes can't see!** 📳🌈🦺\n\n✅ **Lesson B22 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
