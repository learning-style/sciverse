import { DialogNode } from '../../types';

/**
 * P22 — Seismic Waves
 * Big Idea 22: "How Do Waves Help Us See the Invisible?"
 */
export const getP22Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: 'We cannot see deep Earth directly.\n\nBut we can use **seismic waves** to "see" inside!\n\n**P-waves** (Primary waves) are the fastest seismic waves. They are **compression waves** that travel through rock and are the first to arrive at distant **receivers** after an earthquake.\n\nLet\'s see how **P-waves** help us map what\'s underground.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', waveSpeed: 50 } },
        options: [
            { id: 'wave_data', label: 'By measuring P-wave travel, reflection, and refraction.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'guess', label: 'Mostly by guessing shape from mountains.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: 'Surface shapes help, but **P-wave arrival times** are the main evidence.\n\nDifferent underground **layers** change wave speed. By measuring how long it takes **P-waves** to reach each **receiver**, we can infer what\'s below.',
        options: [{ id: 'cont', label: 'So P-waves are probes.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Exactly. **P-waves** carry information about the underground **layers** they pass through.\n\n- **Return path**: The route a **P-wave** takes from the **source**, bouncing (**reflecting**) and bending (**refracting**) through layers, to a **receiver**.\n- **Match**: How well the simulated return paths align with the measured **arrival times**.\n- **Map clarity**: If the paths line up clearly, the hidden layers are easier to map.\n\nTry adjusting the **Match** slider and watch how the **P-wave** paths and map clarity change.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'propagation', showRefraction: true } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'Why do **P-wave arrival times** vary by path?',
        options: [
            { id: 'speed_layers', label: 'Different layers have different wave speeds.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'same_speed', label: 'All rocks transmit equally.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: 'Wave speed depends on **density** and **elasticity** of each layer, so the path matters.',
        options: [{ id: 'retry', label: 'Layer properties change wave speed.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Correct. **Timing differences** help map invisible layers.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showArrivalTimes: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: 'Discovery:\n- **P-waves** (compression waves) are the fastest seismic waves.\n- They reflect and refract at underground **layers**.\n- By measuring **arrival times** at **receivers**, we infer hidden structure.\n- Better alignment (**match**) means a clearer map.',
        options: [{ id: 'done', label: 'Complete P22', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 22 Complete — How Do Waves Help Us See the Invisible?**\n\n- **Physics (P22):** Seismic Wave Mapping — wave paths reveal hidden underground layers\n- **Chemistry (C22):** Spectroscopy Fingerprints — wavelength signatures identify elements invisibly\n- **Biology (B22):** Ultrasound Imaging — echo timing reconstructs internal body structures\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Wave Speed | Faster travel | Shorter arrival times |\n| Layer Contrast | More reflection/refraction | Clearer boundaries |\n| Match | Better path alignment | More accurate mapping |\n| Arrival Time Difference | Larger | More hidden structure |\n\nIn all three: **waves bounce, bend, and reflect to reveal what our eyes can't see!** 📳🌈🦺\n\n✅ **Lesson P22 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
