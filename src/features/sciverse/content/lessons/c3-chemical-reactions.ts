import { DialogNode } from '../../types';

/**
 * C3 — Chemical Reactions: Energy In, Energy Out
 * Big Idea 3: "Where Does Energy Come From?"
 * Scenario: "The Kitchen Scientist"
 * Target Misconception: "All chemical reactions produce heat / are explosions"
 */
export const getC3Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Kitchen Lab! 🧪\n\nI've set up two reaction chambers side by side. Chamber A has **baking soda** and **vinegar** (separated for now). Chamber B has **iron filings** and **oxygen**.\n\nLet's see what happens when we mix things!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', chamberA: 'ready', chamberB: 'ready', tempA: 20, tempB: 20 } },
        options: [
            { id: 'fizz', label: "I've done baking soda + vinegar before! It fizzes!", nextNodeId: 'prior_knowledge' },
            { id: 'what', label: "What happens when they mix?", nextNodeId: 'mix_a' }
        ]
    },

    'prior_knowledge': {
        id: 'prior_knowledge',
        speaker: 'AI',
        content: "Classic experiment! 🌋 But today we're not just watching the fizz — we're measuring something most people miss. Watch the **thermometer** as they react!",
        options: [
            { id: 'mix', label: "Mix them!", nextNodeId: 'mix_a' }
        ]
    },

    'mix_a': {
        id: 'mix_a',
        speaker: 'AI',
        content: "Hit **MIX** on Chamber A and watch closely — especially the thermometer! 🌡️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mixing_a', chamberA: 'reacting', showBubbles: true } },
        options: [
            { id: 'mixed', label: "It's fizzing! Bubbles everywhere!", nextNodeId: 'observe_a', simAction: { type: 'SET_VISUAL', payload: { chamberA: 'reacted', tempA: 17 } } }
        ]
    },

    'observe_a': {
        id: 'observe_a',
        speaker: 'AI',
        content: "The fizzing is CO₂ gas escaping — the baking soda and vinegar rearranged their atoms to make water, a salt, and carbon dioxide bubbles! 🫧\n\nBut did you catch the thermometer? It went **DOWN** from 20°C to 17°C!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'observed_a', showTempDrop: true } },
        options: [
            { id: 'checkpoint', label: "The temperature dropped?!", nextNodeId: 'checkpoint_endo' }
        ]
    },

    'checkpoint_endo': {
        id: 'checkpoint_endo',
        speaker: 'AI',
        content: "⏸️ **Think About It:**\n\nThe temperature went DOWN. That means the reaction...",
        options: [
            { id: 'released', label: "Released energy (got hotter).", nextNodeId: 'endo_correction' },
            { id: 'absorbed', label: "Absorbed energy (sucked heat in).", nextNodeId: 'endo_correct', sentiment: 'positive' },
            { id: 'no_energy', label: "Didn't involve energy.", nextNodeId: 'endo_always' }
        ]
    },

    'endo_correction': {
        id: 'endo_correction',
        speaker: 'AI',
        content: "If it released energy, the temperature would go UP (it would feel warm). But the temperature went DOWN — the surroundings got COLDER.\n\nThat means the reaction sucked energy IN from the surroundings!",
        options: [
            { id: 'got_it', label: "Oh! It absorbed heat from around it!", nextNodeId: 'endo_correct' }
        ]
    },

    'endo_always': {
        id: 'endo_always',
        speaker: 'AI',
        content: "Every chemical reaction involves energy — always! When atoms break apart and rearrange, energy is either absorbed or released.\n\nThe temperature change is the proof. Down = energy absorbed. Up = energy released.",
        options: [
            { id: 'absorbed', label: "So this one absorbed energy!", nextNodeId: 'endo_correct' }
        ]
    },

    'endo_correct': {
        id: 'endo_correct',
        speaker: 'AI',
        content: "✅ This is called an **ENDOTHERMIC** reaction! ❄️\n\n\"Endo\" = in, \"thermic\" = heat.\n\nThe reaction sucked heat IN from the surroundings to break and remake chemical bonds. That's why it felt cold!\n\nNow let's try Chamber B...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'chamber_b_ready' } },
        options: [
            { id: 'mix_b', label: "Mix Chamber B!", nextNodeId: 'mix_b' }
        ]
    },

    'mix_b': {
        id: 'mix_b',
        speaker: 'AI',
        content: "Chamber B: iron + oxygen. This is basically RUSTING, but sped up! Hit MIX! 🔥",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mixing_b', chamberB: 'reacting' } },
        options: [
            { id: 'hot', label: "Whoa — it's getting HOT!", nextNodeId: 'observe_b', simAction: { type: 'SET_VISUAL', payload: { chamberB: 'reacted', tempB: 45, showGlow: true } } }
        ]
    },

    'observe_b': {
        id: 'observe_b',
        speaker: 'AI',
        content: "The temperature SHOT UP to 45°C! 🔥 And look at the glow!\n\nThis reaction RELEASED energy as heat. This is an **EXOTHERMIC** reaction!\n\n\"Exo\" = out, \"thermic\" = heat. Energy goes OUT.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'observed_b', showTempRise: true } },
        options: [
            { id: 'compare', label: "One absorbed heat, the other released it!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Key Discovery!**\n\nIn Physics (P3), energy was stored as **height**. Here, energy is stored in **chemical bonds** — the connections between atoms.\n\n- **Breaking bonds** requires energy (endothermic)\n- **Making new bonds** can release energy (exothermic)\n\nEvery campfire 🔥 is exothermic. Every cold pack 🧊 is endothermic. Chemistry is energy in disguise!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showComparison: true } },
        options: [
            { id: 'crosslink', label: "Bonds store energy, just like height!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** Your body runs exothermic reactions CONSTANTLY — that's why you're warm! (Your body is basically a slow, controlled campfire.)\n\nBiology (B3) will show you exactly how: tracing energy from the SUN all the way to your cells.\n\n✅ **Lesson C3 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

