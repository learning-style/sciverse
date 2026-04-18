import { DialogNode } from '../../types';

/**
 * P21 — Tidal Cycles
 * Big Idea 21: "How Do Cycles Keep Systems Alive?"
 */
export const getP21Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: `Why do sea levels rise and fall in a regular pattern?\n\n**Visual legend:**\n- **Red dot**: Shows how the Earth spins (rotation).\n- **Blue circle with green inside**: The Earth (blue = ocean, green = land).\n- **Two blue bulges on the sides**: High tide—extra water pulled by gravity.\n- **Gray circle labeled "Moon"**: The Moon, which pulls on the ocean.\n\n**Key words:**\n- **Tide**: The regular rise and fall of the ocean.\n- **Tidal bulge**: The extra water that makes high tide.\n- **Gravity**: The force that pulls water toward the Moon and Sun.\n- **Rotation**: The Earth spinning, which moves the bulges around.\n- **Cycle**: A pattern that repeats over and over.\n\nWhy do you think tides follow a cycle instead of being random?`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', tideHeight: 50 } },
        options: [
            { id: 'moon_pull', label: 'The Moon and Sun create repeating gravitational patterns.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'wind_only', label: 'Only local wind drives tides.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: 'Wind changes waves, but tides are dominated by orbital gravity cycles and Earth rotation.',
        options: [{ id: 'cont', label: 'So timing follows celestial motion.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Right. A repeating force pattern creates predictable high and low tides, shaping **tidal range** that ecosystems and people rely on.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cycle', moonAligned: true } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'Spring tides happen when: ',
        options: [
            { id: 'align', label: 'Sun, Earth, and Moon align.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'right_angle', label: 'Sun and Moon are at right angles.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: 'Right angle gives neap tides. That means the Sun and Moon are at right angles to Earth (not to each other). Alignment gives larger spring tides.',
        options: [{ id: 'retry', label: 'Alignment increases tidal range.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Exactly. Cyclical forcing leads to predictable physical behavior.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', springTide: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: 'Discovery: repeated forcing, orbital timing, and Earth rotation create reliable **cyclical patterns** in natural systems.',
        options: [{ id: 'done', label: 'Complete P21', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 21 Complete — How Do Cycles Keep Systems Alive?**\n\n- **Physics (P21):** Tidal Cycles — orbital forcing creates repeating sea-level rhythms\n- **Chemistry (C21):** Carbon Cycle Chemistry — reservoir exchange and chemical flux maintain atmospheric balance\n- **Biology (B21):** Respiration Cycles — regulated ATP production and metabolic turnover keep cells alive\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Moon Alignment | Stronger tidal force | Higher tidal range |\n| Rotation Effect | Faster cycle | More frequent tides |\n| Tidal Range | Larger difference | More pronounced high/low tides |\n| Cyclical Forcing | More regular pattern | Predictable tides |\n\nIn all three: **repeating cycles with feedback control sustain stability in every system!** 🌙♻️🫁\n\n✅ **Lesson P21 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
