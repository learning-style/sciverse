import { DialogNode } from '../../types';

/**
 * C15 — Chemical Equilibrium
 * Big Idea 15: "How Do Systems Find Balance?"
 * Scenario: Forward/reverse reactions in a closed system
 * Target Misconception: "A reaction at equilibrium has stopped / equilibrium means equal amounts"
 */
export const getC15Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Equilibrium Lab! ⚗️\n\nIn the simulation, two chambers are connected. You can see molecules reacting: blue balls (reactants) → red balls (products). But the red balls can also convert back to blue.\n\nHere's my question: when the reaction reaches **equilibrium** and the counts stop changing, does that mean the reaction has stopped?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', reactants: 20, products: 0, reactionActive: false } },
        options: [
            { id: 'stopped', label: "Yes — equilibrium means the reaction is done.", nextNodeId: 'misconception_stopped', sentiment: 'negative' },
            { id: 'balanced', label: "No — forward and reverse reactions are happening at equal rates.", nextNodeId: 'correct_dynamic', sentiment: 'positive' },
            { id: 'mostly_stopped', label: "Mostly stopped — just a tiny bit still happening.", nextNodeId: 'hint_dynamic', sentiment: 'neutral' }
        ]
    },

    'misconception_stopped': {
        id: 'misconception_stopped',
        speaker: 'AI',
        content: "This is the #1 equilibrium misconception! 🔄\n\nAt equilibrium, the reaction is STILL happening — just the **forward rate equals the reverse rate**. Individual molecules are constantly converting back and forth, but the *counts* stay the same because gains = losses.\n\nIt's like a busy airport where the same number of people arrive and depart every hour — 'balanced' but not empty!",
        options: [
            { id: 'got_it', label: "Equilibrium = dynamic balance, not stasis!", nextNodeId: 'correct_dynamic' }
        ]
    },

    'hint_dynamic': {
        id: 'hint_dynamic',
        speaker: 'AI',
        content: "It's actually happening at full speed both ways! The reaction is never 'mostly stopped' — it's just that forward and reverse speeds match. 🔄\n\nChemists call this **dynamic equilibrium** to emphasize it's not static.",
        options: [
            { id: 'dynamic', label: "Dynamic equilibrium — constant activity, stable ratios!", nextNodeId: 'correct_dynamic' }
        ]
    },

    'correct_dynamic': {
        id: 'correct_dynamic',
        speaker: 'AI',
        content: "Exactly! Watch the sim — start the reaction and notice molecules converting both directions at once!\n\nThe system settles at a **constant ratio** of reactants to products. This ratio is the **equilibrium constant (K)**:\n- K > 1 means mostly products at equilibrium\n- K < 1 means mostly reactants at equilibrium\n\nPress **Start Reaction** and wait for equilibrium!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'react', reactionActive: true, showBothArrows: true } },
        options: [
            { id: 'reached', label: "The counts stopped changing — equilibrium reached!", nextNodeId: 'le_chatelier' }
        ]
    },

    'le_chatelier': {
        id: 'le_chatelier',
        speaker: 'AI',
        content: "Now for the most useful concept: **Le Chatelier's Principle**.\n\n*'If you stress a system at equilibrium, it shifts to relieve that stress.'*\n\nFor example: if you add MORE reactants, the forward reaction speeds up until a new equilibrium is reached. The system 'absorbs' the extra reactants by making more products.\n\nTry pressing **Add Reactants** in the sim!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'le_chatelier', showAddButton: true } },
        options: [
            { id: 'added', label: "After adding reactants, products increased until balance returned!", nextNodeId: 'pressure_temp' }
        ]
    },

    'pressure_temp': {
        id: 'pressure_temp',
        speaker: 'AI',
        content: "Le Chatelier's Principle applies to temperature and pressure too!\n\n🌡️ **Increase temperature** → system shifts to absorb heat (endothermic direction)\n🗜️ **Increase pressure** (for gases) → system shifts to side with fewer moles of gas\n\nThis is how the **Haber Process** makes ammonia for fertilizers (nitrogen + hydrogen → ammonia), and how your body buffers blood gas levels!\n\nTry changing the temperature slider in the sim!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'temp_effect', showTempSlider: true } },
        options: [
            { id: 'shifted', label: "Higher temperature shifted the equilibrium as predicted!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Chemical Equilibrium Mastered:**\n\n✅ Equilibrium = dynamic balance (reactions still happening both ways!)\n✅ Equilibrium constant K = ratio of products to reactants\n✅ Le Chatelier's Principle: stress → system shifts to relieve stress\n✅ Adding reactants → shifts toward products\n✅ Raising temperature → shifts toward endothermic direction\n✅ Used in: industrial chemistry, blood pH buffering, atmospheric chemistry!\n\n**Real-world:** Your kidneys maintain blood equilibria 24/7 using these exact principles.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "Equilibrium equilibrated in my brain!", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Excellent equilibrium expertise! ⚗️\n\nConnect to **P15 (Pendulum)** to see physical oscillation balance, or **B15 (Predator-Prey)** to watch ecological equilibrium — balance in the natural world!",
        options: []
    }
});
