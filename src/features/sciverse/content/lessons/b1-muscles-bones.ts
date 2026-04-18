import { DialogNode } from '../../types';

/**
 * B1 — Muscles, Bones, and Levers
 * Big Idea 1: "Why Do Things Move?"
 * Scenario: "How Does Your Arm Lift a Backpack?"
 * Target Misconception: "Muscles push bones"
 */
export const getB1Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Biology Lab! 🧬\n\nHere's a model of your arm. The **red band** is your bicep muscle. The **gray rods** are your bones. The circle in the middle? That's your **elbow** — the hinge.\n\nThere's a backpack hanging from the hand. How does the arm lift it?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', armFlexed: false, backpackWeight: 2 } },
        options: [
            { id: 'push', label: "The muscle pushes the bone up.", nextNodeId: 'misconception_push', sentiment: 'negative' },
            { id: 'pull', label: "The muscle pulls the forearm up.", nextNodeId: 'correct_pull', sentiment: 'positive' },
            { id: 'brain', label: "The brain sends a signal.", nextNodeId: 'partial_brain', sentiment: 'neutral' }
        ]
    },

    'misconception_push': {
        id: 'misconception_push',
        speaker: 'AI',
        content: "Try this right now — put your hand flat on a table and try to \"push\" your forearm up using only your bicep muscle. 💪\n\nFeel that? Your muscle got SHORTER. It's **pulling**, not pushing! Muscles can ONLY pull — they can shorten (contract) but they can never extend on their own to push.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'correction', showPullArrow: true } },
        options: [
            { id: 'oh_pull', label: "Oh! It pulls, not pushes!", nextNodeId: 'correct_pull' }
        ]
    },

    'partial_brain': {
        id: 'partial_brain',
        speaker: 'AI',
        content: "You're right — the brain DOES send an electrical signal to the muscle telling it to activate! 🧠⚡\n\nBut the mechanical action — the actual lifting — happens because the muscle **contracts** (gets shorter). The question is: does it push or pull the bone?",
        options: [
            { id: 'pull_now', label: "It pulls! Contracting means getting shorter.", nextNodeId: 'correct_pull' },
            { id: 'push_now', label: "It pushes?", nextNodeId: 'misconception_push' }
        ]
    },

    'correct_pull': {
        id: 'correct_pull',
        speaker: 'AI',
        content: "✅ Muscles can only **PULL**! They shorten when they contract and pull on the bones they're attached to.\n\nBut if muscles can only pull, how does your arm straighten back out? That's a puzzle for another day (hint: you have a SECOND muscle on the back of your arm — the tricep!).\n\nLet's see the pull in action! Hit the **Flex** button! 💪",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'ready_flex', flexUnlocked: true } },
        options: [
            { id: 'flex', label: "💪 FLEX!", nextNodeId: 'flexing', simAction: { type: 'SET_VISUAL', payload: { armFlexed: true } } }
        ]
    },

    'flexing': {
        id: 'flexing',
        speaker: 'AI',
        content: "LOOK! 👀\n\nThe bicep got **shorter** → it **pulled** the forearm bone → the forearm rotated UP at the elbow → the backpack rose!\n\nYour elbow acted as a **fulcrum** (the pivot point of a lever). Your arm IS a lever!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'flexed', armFlexed: true, showLeverLabel: true, showForceArrow: true } },
        options: [
            { id: 'lever', label: "My arm is a lever?!", nextNodeId: 'lever_explain' },
            { id: 'heavy', label: "What if the backpack is heavier?", nextNodeId: 'checkpoint_weight' }
        ]
    },

    'lever_explain': {
        id: 'lever_explain',
        speaker: 'AI',
        content: "Yes! A lever is just a rigid bar (your bone) that rotates around a fixed point (your elbow joint).\n\n- The **muscle** provides the pulling force\n- The **elbow** is the pivot (fulcrum)\n- The **backpack** is the load\n\nNow let's test: what happens with a heavier backpack?",
        onEnterAction: { type: 'SET_VISUAL', payload: { showLeverDiagram: true } },
        options: [
            { id: 'heavier', label: "Make the backpack heavier!", nextNodeId: 'checkpoint_weight' }
        ]
    },

    'checkpoint_weight': {
        id: 'checkpoint_weight',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nI'm going to DOUBLE the backpack weight from 2 kg to 4 kg. Will the muscle need to pull with:\n\n- The same force?\n- Double the force?\n- Half the force?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'predict_weight', weightSliderUnlocked: true, armFlexed: false } },
        options: [
            { id: 'same', label: "Same force.", nextNodeId: 'checkpoint_weight_wrong_same', simAction: { type: 'SET_VISUAL', payload: { prediction: 'same' } } },
            { id: 'double', label: "Double the force.", nextNodeId: 'checkpoint_weight_correct', simAction: { type: 'SET_VISUAL', payload: { prediction: 'double' } } },
            { id: 'half', label: "Half the force.", nextNodeId: 'checkpoint_weight_wrong_half', simAction: { type: 'SET_VISUAL', payload: { prediction: 'half' } } }
        ]
    },

    'checkpoint_weight_wrong_same': {
        id: 'checkpoint_weight_wrong_same',
        speaker: 'AI',
        content: "Not quite. If load increases but lever geometry stays the same, muscle force must increase too.\n\nSo 'same force' is too low.",
        options: [
            { id: 'retry_double', label: "Got it — double force is the best prediction.", nextNodeId: 'checkpoint_weight_correct' }
        ]
    },

    'checkpoint_weight_wrong_half': {
        id: 'checkpoint_weight_wrong_half',
        speaker: 'AI',
        content: "Good try, but half force would move in the opposite direction of what physics predicts.\n\nA heavier load needs more pull, not less.",
        options: [
            { id: 'retry_double2', label: "Understood — double force is more reasonable.", nextNodeId: 'checkpoint_weight_correct' }
        ]
    },

    'checkpoint_weight_correct': {
        id: 'checkpoint_weight_correct',
        speaker: 'AI',
        content: "✅ Correct prediction: with the same arm lever setup, doubling the backpack weight requires roughly double muscle force.",
        options: [
            { id: 'to_experiment', label: "Test it in the lab", nextNodeId: 'weight_experiment' }
        ]
    },

    'weight_experiment': {
        id: 'weight_experiment',
        speaker: 'AI',
        content: "Use the **Backpack Weight (kg)** slider below the visual:\n1. Set it to **4.0 kg**\n2. Press **Flex Arm**\n3. Read the graph axes and compare required muscle force\n\nThen choose what you observed.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'heavy_flex', armFlexed: false, showForceGraph: true, weightSliderUnlocked: true } },
        options: [
            { id: 'more_force', label: "The muscle had to pull way harder!", nextNodeId: 'force_discovery' }
        ]
    },

    'force_discovery': {
        id: 'force_discovery',
        speaker: 'AI',
        content: "🎉 **Discovery!** More weight = more pull needed!\n\nThe muscle force graph shows it: when you double the weight, the muscle needs roughly double the force.\n\nThis is the SAME rule as the Physics crate — **more mass needs more force to move.** Your body obeys the same laws of physics as everything else!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showForceComparison: true } },
        options: [
            { id: 'crosslink', label: "Same rules everywhere!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** \n- Force in Physics (P1) pushes the crate\n- Energy from heat in Chemistry (C1) makes particles zoom\n- Force from muscles here lifts the backpack\n\nIt's all the same idea: **something has to push or pull to make things move.**\n\n✅ **Lesson B1 Complete!** You've finished Big Idea 1! 🎊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

