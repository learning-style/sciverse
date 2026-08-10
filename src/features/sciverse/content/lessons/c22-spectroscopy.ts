import { DialogNode } from '../../types';

/**
 * C22 — Spectroscopy
 * Big Idea 22: "How Do Waves Help Us See the Invisible?"
 */
export const getC22Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: 'How can chemists identify an **unknown element** without touching it?\n\nThe answer is **spectroscopy**. Every element emits or absorbs light at specific **wavelengths**, creating a unique **spectral fingerprint**—a pattern of bright or dark **lines**.\n\nThese **spectral lines** are like a barcode for each element. By comparing the **pattern** of an unknown sample to a reference, we can reveal its **identity** without ever touching it.\n\n**Visual guide:**\n- The **top spectrum** shows the reference (known element).\n- The **bottom spectrum** shows the unknown sample.\n- **Vertical lines** are the key: their **positions** (not brightness) must match for a true identification.\n- The **flying dots** in the visual represent the process of matching each line—when they line up, the match is strong.\n\nTry adjusting the **Match** slider to see how the alignment changes. The more lines that match, the higher the **ID Confidence**.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', wavelength: 540 } },
        options: [
            { id: 'spectrum', label: 'Each element has a spectral fingerprint.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'color_only', label: 'Only brightness matters.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: '**Brightness** helps, but it does not tell **identity** by itself.\n\nFor **identity**, we compare **line positions**—the exact places where the **spectral lines** appear. If the **line positions** match, the samples are likely the same **element** or **molecule**.\n\n**Spectroscopy** is about patterns, not just color or brightness.',
        options: [{ id: 'cont', label: 'So spectral lines carry identity.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Exactly. We compare two **spectral patterns**:\n- **Top** = reference spectrum (**known element**)\n- **Bottom** = unknown spectrum (**sample to identify**)\n\nIf the **line positions** line up, it is likely a **match**. The more lines that match, the higher our **confidence** in the identification.\n\nThis is how scientists identify **elements in stars**, analyze **forensic samples**, and even check for **pollutants**—all by reading the light.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'spectra', showLines: true } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'If two samples share the same key **line positions** (vertical lines in the spectrum), then:',
        options: [
            { id: 'same_species', label: 'They likely contain the same chemical species.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'unrelated', label: 'They are definitely unrelated.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: 'Matching **line positions** strongly suggests shared **elemental** or **molecular identity**.\n\nThis is the main tool for remote chemical analysis.',
        options: [{ id: 'retry', label: 'Line positions indicate chemical identity.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Correct. Matching **line positions** is the main clue for **identity**.\n\nThis is how **astronomers** identify elements in distant **stars**, how **chemists** analyze unknown samples, and how **environmental scientists** detect trace chemicals.\n\n**Spectroscopy** is a universal tool for seeing the invisible.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', identified: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: 'Discovery:\n- **Spectroscopy** compares **light-line patterns** (spectra) to reveal hidden **identity**.\n- Matching **line positions** suggests the same **element** or **molecule**.\n- The clearer the **alignment**, the stronger the **match**.\n- This method lets us analyze **stars**, **planets**, and **unknown chemicals** from afar—using only **light**.\n- In the visual, the **vertical lines** are the spectral fingerprints, and the **flying dots** show how well the patterns align.\n- When the lines and dots line up, you have a strong identification!',
        options: [{ id: 'done', label: 'Complete C22', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 22 Complete — How Do Waves Help Us See the Invisible?**\n\n- **Physics (P22):** Seismic Wave Mapping — wave paths reveal hidden underground layers\n- **Chemistry (C22):** Spectroscopy Fingerprints — wavelength signatures identify elements invisibly\n- **Biology (B22):** Ultrasound Imaging — echo timing reconstructs internal body structures\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Line Match | More lines align | Higher ID confidence |\n| Wavelength Resolution | Finer detail | More precise ID |\n| Pattern Clarity | Less noise | Easier identification |\n| Spectral Range | Broader scan | More elements detected |\n\nIn all three: **waves bounce, bend, and reflect to reveal what our eyes can't see!** 📳🌈🦺\n\n✅ **Lesson C22 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
