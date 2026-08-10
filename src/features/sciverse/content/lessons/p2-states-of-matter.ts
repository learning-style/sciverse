import { DialogNode } from '../../types';

/**
 * P2 — Solid, Liquid, Gas: Same Stuff, Different Rules
 * Big Idea 2: "What Is Everything Made Of?"
 * Scenario: "The Three States Challenge"
 * Target Misconception: "Gas is lighter because atoms weigh less"
 */
export const getP2Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome back to Physics! 🔬\n\nToday we're zooming WAY in. Imagine you had a super-powered microscope and could see the tiniest particles that make up everything.\n\nI've got a container here showing particles in a **solid** — look how they're locked in a tight pattern, just vibrating in place.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'solid', state: 'solid', showPiston: false } },
        options: [
            { id: 'ice', label: "Like ice!", nextNodeId: 'ice_yes' },
            { id: 'rock', label: "Like a rock.", nextNodeId: 'rock_yes' }
        ]
    },

    'ice_yes': {
        id: 'ice_yes',
        speaker: 'AI',
        content: "Yes! Ice is water particles locked in a crystal pattern. They vibrate but can't wander around. That's why ice holds its shape — the particles are stuck in formation! ❄️\n\nNow let's add some energy. Hit the **Liquid** toggle!",
        options: [
            { id: 'to_liquid', label: "Switch to Liquid!", nextNodeId: 'liquid_state', simAction: { type: 'SET_VISUAL', payload: { state: 'liquid' } } }
        ]
    },

    'rock_yes': {
        id: 'rock_yes',
        speaker: 'AI',
        content: "Exactly! Rocks, metals, ice — ALL solids have particles locked in a fixed pattern. They vibrate in place but can't roam free. That's why solids hold their shape! 🪨\n\nLet's see what happens when we add energy and switch to **Liquid**.",
        options: [
            { id: 'to_liquid', label: "Switch to Liquid!", nextNodeId: 'liquid_state', simAction: { type: 'SET_VISUAL', payload: { state: 'liquid' } } }
        ]
    },

    'liquid_state': {
        id: 'liquid_state',
        speaker: 'AI',
        content: "Look! 💧 Same particles, same size, same number. But now they're **sliding past each other** and filling the bottom of the container.\n\nThey have enough energy to break free from the rigid pattern, but not enough to fly apart completely.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'liquid', state: 'liquid' } },
        options: [
            { id: 'same_size', label: "Wait — they didn't change size?", nextNodeId: 'checkpoint_size' },
            { id: 'next', label: "What about gas?", nextNodeId: 'gas_preview' }
        ]
    },

    'gas_preview': {
        id: 'gas_preview',
        speaker: 'AI',
        content: "Great question — gas is coming up next! 💨\n\nBut first, I want to make sure you noticed something important about the liquid. The particles are sliding around more freely now, but did you notice their **size**?\n\nLet me check your observation skills...",
        options: [
            { id: 'check', label: "Let me think about the size...", nextNodeId: 'checkpoint_size' }
        ]
    },

    'checkpoint_size': {
        id: 'checkpoint_size',
        speaker: 'AI',
        content: "⏸️ **Quick Check:**\n\nDid the particles shrink, grow, or stay the same size when they went from solid to liquid?",
        options: [
            { id: 'shrink', label: "They shrank.", nextNodeId: 'size_correction' },
            { id: 'grew', label: "They grew.", nextNodeId: 'size_correction' },
            { id: 'same', label: "Same size!", nextNodeId: 'size_correct', sentiment: 'positive' }
        ]
    },

    'size_correction': {
        id: 'size_correction',
        speaker: 'AI',
        content: "Look again — count the dots! Same number, same size. 🔎 The particles themselves didn't change at all. They just have more **room to move** because they have more energy.\n\nThe **particles** stay the same. The **energy** changed, which changed how they behave!",
        options: [
            { id: 'got_it', label: "Same particles, different energy!", nextNodeId: 'size_correct' }
        ]
    },

    'size_correct': {
        id: 'size_correct',
        speaker: 'AI',
        content: "✅ **Key Insight:** The particles didn't change. The **energy** changed!\n\n- More energy → more movement → different state\n- Solid → Liquid → Gas is all about how much energy the particles have\n\nNow let's go to **Gas**! Toggle it!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'gas_ready' } },
        options: [
            { id: 'to_gas', label: "Switch to Gas!", nextNodeId: 'gas_state', simAction: { type: 'SET_VISUAL', payload: { state: 'gas' } } }
        ]
    },

    'gas_state': {
        id: 'gas_state',
        speaker: 'AI',
        content: "WHOOSH! 💨 The particles are zooming EVERYWHERE! Bouncing off the walls, filling every corner of the container.\n\nSame particles. Same size. Same weight. Just WAY more energy.\n\nNow I'm giving you a **Squeeze Piston**. Try pushing the gas into a smaller space!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'gas', state: 'gas', showPiston: true, pistonPosition: 'up' } },
        options: [
            { id: 'squeeze', label: "Squeeze the piston down!", nextNodeId: 'piston_squeeze', simAction: { type: 'SET_VISUAL', payload: { pistonPosition: 'down' } } }
        ]
    },

    'piston_squeeze': {
        id: 'piston_squeeze',
        speaker: 'AI',
        content: "The particles are now crammed into a smaller space! They're hitting the walls MORE often and HARDER. That's **pressure**! 💥\n\nThis is exactly how a **bike pump** works — you squeeze air into a smaller space, which increases pressure to fill the tire.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'compressed', state: 'gas', pistonPosition: 'down', showPressureArrows: true } },
        options: [
            { id: 'cool', label: "So pressure is just particles hitting walls!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **You got it!**\n\n- **Solid:** Particles locked in place, vibrating. Holds shape.\n- **Liquid:** Particles slide around. Takes shape of container.\n- **Gas:** Particles fly everywhere. Fills ALL space. Compressible.\n\nAll three are the SAME particles — just different amounts of energy!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showSummary: true } },
        options: [
            { id: 'crosslink', label: "Same stuff, different energy!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** In Chemistry (C2), you'll discover that not all particles are the same — there are different TYPES of atoms. And in Biology (B2), you'll see containers WAY smaller than this one: the **cells** in your body!\n\n✅ **Lesson P2 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

