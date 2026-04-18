import { DialogNode } from '../../types';

/**
 * P16 — Magnets and Navigation
 * Big Idea 16: "How Do Magnets Help Us Navigate and Build Machines?"
 */
export const getP16Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Magnet Navigation Lab! 🧭\n\nImagine you're hiking at dusk. The Sun is hidden, landmarks are confusing, and your phone battery is dead. You pull out a simple compass and the needle still settles into a direction.\n\nWhy does that happen so reliably?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', magnetVisible: false, compassAngle: 0, showFieldLines: false } },
        options: [
            { id: 'guess_magic', label: 'The needle remembers where north is.', nextNodeId: 'misconception_memory' },
            { id: 'guess_field', label: 'Earth behaves like a giant magnet, so the needle aligns to the field.', nextNodeId: 'field_correct', sentiment: 'positive' },
            { id: 'guess_gravity', label: 'Gravity points the needle north.', nextNodeId: 'partial_gravity' }
        ]
    },

    'misconception_memory': {
        id: 'misconception_memory',
        speaker: 'AI',
        content: "That's a common idea, but compass needles are not storing a map in memory.\n\nThe needle is a tiny magnet. It experiences a **torque** in a magnetic field, and that torque rotates it toward field direction.",
        options: [{ id: 'continue', label: 'Show me the torque-and-alignment idea.', nextNodeId: 'field_correct' }]
    },

    'partial_gravity': {
        id: 'partial_gravity',
        speaker: 'AI',
        content: "Good thought. Gravity acts downward, but gravity alone does not choose north versus south.\n\nA compass changes heading because of horizontal magnetic interactions, not because of vertical weight.",
        options: [{ id: 'cont', label: 'So field direction is the key signal.', nextNodeId: 'field_correct' }]
    },

    'field_correct': {
        id: 'field_correct',
        speaker: 'AI',
        content: "Exactly. Earth has a large-scale **magnetic field**, and a compass aligns to the local field direction.\n\nIn this lab, use the controls to compare strong-field and disturbed-field situations. Watch the red needle and the cyan north reference line as you change conditions.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'field', magnetVisible: true, showFieldLines: true, showLocalMagnetEffect: false } },
        options: [
            { id: 'checkpoint', label: 'Give me a checkpoint question.', nextNodeId: 'checkpoint' },
            { id: 'experiment_first', label: 'Let me experiment first, then ask me questions.', nextNodeId: 'experiment_prompt' }
        ]
    },

    'experiment_prompt': {
        id: 'experiment_prompt',
        speaker: 'AI',
        content: "Great. Try this sequence:\n1. Set **Field Strength** high and disturbance low.\n2. Observe alignment percentage and needle drift.\n3. Then raise disturbance and compare how quickly heading confidence drops.\n\nWhen you're ready, answer a reasoning checkpoint.",
        options: [{ id: 'to_checkpoint', label: 'I tested the controls. Ask the checkpoint.', nextNodeId: 'checkpoint' }]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nIf you bring a bar magnet close to the compass, what is the most likely first effect?",
        options: [
            { id: 'c1', label: 'The needle rotates toward the new local field direction.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'c2', label: 'The compass permanently breaks and cannot recover.', nextNodeId: 'checkpoint_wrong' },
            { id: 'c3', label: 'Nothing changes because north is fixed forever.', nextNodeId: 'checkpoint_wrong2' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "A nearby magnet usually does not permanently break the compass. It changes the field around it, so the needle rotates to a different heading.",
        options: [{ id: 'retry', label: 'So nearby fields can temporarily redirect heading.', nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "North is a global reference, but compasses respond to **local field conditions**. Nearby magnetic objects can bias what the needle reads.",
        options: [{ id: 'retry2', label: 'Then the first effect is needle rotation.', nextNodeId: 'checkpoint_correct' }]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "Exactly. A compass is a **field sensor**, not a frozen map arrow.\n\nThat idea is crucial for real navigation: you must account for local disturbances (metal structures, electronics, strong magnets) when interpreting readings.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showLocalMagnetEffect: true } },
        options: [
            { id: 'discovery', label: 'Give me the big takeaway.', nextNodeId: 'discovery' },
            { id: 'summary_now', label: 'Show me a quick summary table first.', nextNodeId: 'summary_table' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery:** Magnetic navigation works because field interactions create predictable torque on magnetic needles.\n\nIn short: stronger clean fields improve alignment confidence, while disturbances increase drift and uncertainty.",
        options: [
            { id: 'summary', label: 'Show summary table.', nextNodeId: 'summary_table' },
            { id: 'reflect', label: 'Ask me reflection questions.', nextNodeId: 'reflection_questions' }
        ]
    },

    'summary_table': {
        id: 'summary_table',
        speaker: 'AI',
        content: "| **Concept** | **What It Means In P16** | **What You Saw In The Lab** |\n|---|---|---|\n| **Magnetic field** | Directional influence on magnetic objects | Needle rotated as conditions changed |\n| **Alignment** | Needle pointing with local field direction | Higher field strength improved alignment % |\n| **Disturbance** | Competing local magnetic influence | Drift increased as disturbance rose |\n| **Navigation reliability** | Confidence in heading estimate | Best when disturbance was low |",
        options: [
            { id: 'reflect_after_table', label: 'Now ask me reflection questions.', nextNodeId: 'reflection_questions' },
            { id: 'to_complete_direct', label: 'I am ready to wrap up.', nextNodeId: 'complete' }
        ]
    },

    'reflection_questions': {
        id: 'reflection_questions',
        speaker: 'AI',
        content: "🧠 **Think Like A Navigator**\n\n1. If two compasses disagree in a city street, what nearby source might cause that conflict?\n2. Why is it risky to trust one magnetic reading without context?\n3. How could you combine map, landmarks, and compass data to reduce navigation error?",
        options: [
            { id: 'reflect_choice1', label: 'Disturbance sources (metal/electronics) can bias one compass.', nextNodeId: 'reflection_feedback', sentiment: 'positive' },
            { id: 'reflect_choice2', label: 'A single reading is always enough in every environment.', nextNodeId: 'reflection_retry' }
        ]
    },

    'reflection_retry': {
        id: 'reflection_retry',
        speaker: 'AI',
        content: "Good scientists cross-check signals. In noisy environments, one sensor can mislead. Combining cues improves robustness.",
        options: [{ id: 'retry_to_feedback', label: 'Got it. Combine multiple cues.', nextNodeId: 'reflection_feedback' }]
    },

    'reflection_feedback': {
        id: 'reflection_feedback',
        speaker: 'AI',
        content: "Excellent reasoning. You are thinking in systems: signal source, noise source, and confidence estimate.",
        options: [{ id: 'finish', label: 'Finish P16', nextNodeId: 'complete' }]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Links**\n- In **C16**, you will learn why only some materials align strongly: **domain alignment** and composition decide magnetic response.\n- In **B16**, you will see how migration systems combine magnetic signals with sunlight, landmarks, and other cues.\n\n✅ **Lesson P16 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
