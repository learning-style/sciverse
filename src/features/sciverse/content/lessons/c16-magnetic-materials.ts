import { DialogNode } from '../../types';

/**
 * C16 — Magnetic Materials
 * Big Idea 16: "How Do Magnets Help Us Navigate and Build Machines?"
 */
export const getC16Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Magnetic Materials Bench! ⚗️\n\nYou place three items near a magnet: an iron nail, aluminum foil, and copper wire. One jumps strongly, one barely responds, and one seems almost unaffected.\n\nWhy are these materials so different if they are all metallic substances?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', sample: 'steel' } },
        options: [
            { id: 'all_metals', label: 'All metals should be magnetic in the same way.', nextNodeId: 'misconception' },
            { id: 'domain', label: 'Magnetic behavior depends on electron structure and domain alignment.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'weight_guess', label: 'Heavier materials must be more magnetic.', nextNodeId: 'misconception_weight' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "Common misconception. Being a metal does not guarantee strong ferromagnetism.\n\nIron, cobalt, and nickel often show strong magnetic response, while copper and aluminum usually do not show the same domain behavior.",
        options: [{ id: 'next', label: 'Explain domain behavior.', nextNodeId: 'correct' }]
    },

    'misconception_weight': {
        id: 'misconception_weight',
        speaker: 'AI',
        content: "Mass is not the key variable here. Magnetic response depends primarily on electronic structure and whether domains can align cooperatively.",
        options: [{ id: 'next2', label: 'So composition matters more than weight.', nextNodeId: 'correct' }]
    },

    'correct': {
        id: 'correct',
        speaker: 'AI',
        content: "Exactly. In ferromagnetic materials, microscopic magnetic **domains** can line up, creating a stronger net magnetic effect.\n\nIn this lab, vary **iron fraction** and **temperature**. You will see composition increase response, while higher temperature can reduce domain order.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'domains', showDomains: true } },
        options: [
            { id: 'checkpoint', label: 'Give me a checkpoint.', nextNodeId: 'checkpoint' },
            { id: 'test_first', label: 'Let me test controls before checkpoint.', nextNodeId: 'experiment_prompt' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "Try this mini-investigation:\n1. Increase iron fraction and observe magnetization trend.\n2. Keep iron high, then raise temperature and watch response fall.\n3. Use the probe to sample local metric changes.\n\nThen answer the checkpoint using evidence.",
        options: [{ id: 'to_checkpoint', label: 'I tested it. Ask checkpoint.', nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint**\n\nWhich sample is most likely to show strong ferromagnetic behavior under normal conditions?",
        options: [
            { id: 'iron', label: 'Iron nail.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'copper', label: 'Copper wire.', nextNodeId: 'checkpoint_wrong' },
            { id: 'aluminum', label: 'Aluminum foil.', nextNodeId: 'checkpoint_wrong2' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Copper is an excellent electrical conductor, but it is not typically strongly ferromagnetic in the way iron is.",
        options: [{ id: 'retry', label: 'Iron is the strong magnetic choice.', nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "Aluminum can show weak magnetic effects in special conditions, but not the strong domain alignment behavior you see in iron.",
        options: [{ id: 'retry2', label: 'Then iron is strongest here.', nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "Exactly. Material chemistry and electron structure control magnetic behavior, which is why engineers choose materials carefully for motors, sensors, and magnetic shielding.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', selected: 'iron' } },
        options: [
            { id: 'discovery', label: 'Give me the key chemistry takeaway.', nextNodeId: 'discovery' },
            { id: 'summary_now', label: 'Show summary table first.', nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery:** Magnetic response depends on atomic and electronic structure, not just broad material category labels.\n\nYou observed a chemistry pattern: composition can strengthen domain alignment, while thermal agitation can disrupt it.",
        options: [
            { id: 'summary', label: 'Show summary table.', nextNodeId: 'summary_table' },
            { id: 'reflect', label: 'Ask me reflection questions.', nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "| **Factor** | **Chemistry Meaning** | **Lab Evidence** |\n|---|---|---|\n| **Iron fraction** | More ferromagnetic-capable domains available | Magnetization score increased as iron rose |\n| **Temperature** | Thermal motion disrupts ordered alignment | Response dropped at higher temperature |\n| **Domain alignment** | Collective orientation of microscopic magnetic regions | Stronger alignment produced stronger net effect |\n| **Material choice** | Engineering tradeoff between properties | Different materials produced different magnetic behavior |",
        options: [
            { id: 'reflect_after_table', label: 'Now ask reflection questions.', nextNodeId: 'reflection_questions' },
            { id: 'to_complete', label: 'Wrap up C16.', nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "🧠 **Think Like A Materials Chemist**\n\n1. Why might a motor component need both magnetic performance and thermal stability?\n2. If two alloys have similar iron content, what else might explain different magnetic response?\n3. How would you design a fair test to compare materials?",
        options: [
            { id: 'reflect_good', label: 'Composition, microstructure, and temperature history can all matter.', nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_bad', label: 'Only mass matters, so testing details are unnecessary.', nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Good experiments control variables carefully. Material behavior often depends on multiple linked factors, not one number.",
        options: [{ id: 'retry_to_feedback', label: 'Understood. Multiple factors matter.', nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent. You are reasoning like a scientist: mechanism, evidence, and controlled comparison.",
        options: [{ id: 'finish', label: 'Finish C16', nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Links**\n- In **P16**, magnetic fields determine compass direction and navigation confidence.\n- In **B16**, organisms combine magnetic input with other sensory systems for robust migration.\n\n✅ **Lesson C16 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
