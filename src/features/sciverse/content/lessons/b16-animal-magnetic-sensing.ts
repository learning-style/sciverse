import { DialogNode } from '../../types';

/**
 * B16 — Animal Magnetic Sensing
 * Big Idea 16: "How Do Magnets Help Us Navigate and Build Machines?"
 */
export const getB16Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Migration Systems Lab! 🕊️\n\nA bird can cross huge distances and still return to familiar breeding regions. At night or under cloud cover, visual landmarks are limited. Yet navigation can still work.\n\nWhat explains that reliability?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', species: 'bird' } },
        options: [
            { id: 'memory_only', label: 'Only visual memory explains migration success.', nextNodeId: 'misconception' },
            { id: 'multi_cues', label: 'Animals use multiple cues, including magnetic sensing.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'instinct_only', label: 'It is pure instinct with no environmental input.', nextNodeId: 'misconception_instinct' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "Memory helps, but biology data suggests more than memory. Many species use layered cues: magnetic information, sky cues, landmarks, and sometimes smell.",
        options: [{ id: 'next', label: 'Show cue system.', nextNodeId: 'correct' }]
    },

    'misconception_instinct': {
        id: 'misconception_instinct',
        speaker: 'AI',
        content: "Instinct sets behavioral programs, but those programs still rely on environmental signals for correction and calibration during travel.",
        options: [{ id: 'next2', label: 'So navigation is a sensing system.', nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly. Migration is a **multi-cue system**: sun position, stars, landmarks, odor maps, and magnetic field input can all contribute.\n\nIn this lab, vary magnetic signal and solar-storm noise. Watch how navigation accuracy changes when one cue degrades.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cues', showMagneticCue: true } },
        options: [
            { id: 'checkpoint', label: 'Give me a checkpoint.', nextNodeId: 'checkpoint' },
            { id: 'experiment_first', label: 'Let me test controls first.', nextNodeId: 'experiment_prompt' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "Try this biological systems test:\n1. Keep magnetic signal high and storm noise low.\n2. Increase storm noise and track accuracy drop.\n3. Then raise signal and see if the system partially recovers.\n\nAfter that, answer a checkpoint question.",
        options: [{ id: 'to_checkpoint', label: 'I tested it. Ask checkpoint.', nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint**\n\nIf one navigation cue becomes noisy, why can migration still succeed in many species?",
        options: [
            { id: 'redundancy', label: 'Redundant cue systems can compensate and reweight decisions.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'impossible', label: 'Navigation must fail immediately.', nextNodeId: 'checkpoint_wrong' },
            { id: 'random', label: 'Animals then navigate randomly with no pattern.', nextNodeId: 'checkpoint_wrong2' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Many biological systems are robust because they combine partially independent signals rather than relying on one fragile channel.",
        options: [{ id: 'retry', label: 'Multiple cues increase robustness.', nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "Behavior may become less precise, but not instantly random. Organisms often compensate by weighting alternative cues.",
        options: [{ id: 'retry2', label: 'Compensation keeps some directional performance.', nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "Exactly. Biology often uses layered sensing and feedback, which improves reliability under uncertainty.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', robustNavigation: true } },
        options: [
            { id: 'discovery', label: 'Give me the key systems takeaway.', nextNodeId: 'discovery' },
            { id: 'summary_now', label: 'Show summary table first.', nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery:** Migration is a systems-level behavior. Success comes from integrating physical signals (like magnetic fields) with biological processing and cue fusion.",
        options: [
            { id: 'summary', label: 'Show summary table.', nextNodeId: 'summary_table' },
            { id: 'reflect', label: 'Ask me reflection questions.', nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "| **System Element** | **Biology Meaning** | **Lab Evidence** |\n|---|---|---|\n| **Magnetic cue** | Environmental directional input | Higher signal improved navigation accuracy |\n| **Noise / disturbance** | Signal corruption (e.g., geomagnetic turbulence) | Higher storm noise reduced accuracy |\n| **Cue integration** | Combining multiple signals for decisions | Performance can persist when one cue weakens |\n| **Robustness** | Reliability under changing conditions | Layered sensing outperforms single-cue dependence |",
        options: [
            { id: 'reflect_after_table', label: 'Now ask reflection questions.', nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: 'Wrap up B16.', nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "🧠 **Think Like A Systems Biologist**\n\n1. Why might evolution favor multi-cue navigation over one perfect cue?\n2. What tradeoff appears when magnetic signal is strong but environmental noise spikes?\n3. How could changing climate or light pollution affect cue reliability?",
        options: [
            { id: 'reflect_good', label: 'Multiple cues improve resilience when one cue fails.', nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: 'One cue is always enough, so redundancy is wasteful.', nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "In uncertain environments, redundancy is often a survival advantage. Biological systems trade efficiency for reliability when needed.",
        options: [{ id: 'retry_to_feedback', label: 'Got it. Redundancy supports survival.', nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent. You are connecting physiology, behavior, and environmental physics in one model.",
        options: [{ id: 'finish', label: 'Finish B16', nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 16 Complete — How Do Magnets Help Us Navigate?**\n\n- Physics (P16): Magnets & Navigation — magnetic fields create directional alignment for compasses\n- Chemistry (C16): Magnetic Materials — atomic structure controls why only some materials respond to magnets\n- Biology (B16): Migration Sensing — animals combine magnetic, solar, and star cues to navigate thousands of miles\n\nIn all three: **invisible magnetic forces guide compasses, define materials, and steer animal migrations!** 🧭🧲🕊️\n\n✅ **Lesson B16 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
