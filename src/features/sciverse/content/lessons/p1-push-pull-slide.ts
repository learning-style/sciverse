import { DialogNode } from '../../types';

/**
 * P1 — Push, Pull, and Slide
 * Big Idea 1: "Why Do Things Move?"
 * Scenario: "The Stubborn Crate"
 * Target Misconception: "Heavy things can't move because they're heavy"
 */
export const getP1Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Hey there! Welcome to the Physics Lab! 🔬\n\nSee that big wooden crate sitting on the warehouse floor? It weighs **10 kilograms**. It's just sitting there, perfectly still.\n\nWhy do you think it's not moving?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', crateMoving: false, friction: 'high', forceApplied: false } },
        options: [
            { id: 'heavy', label: "Because it's too heavy to move.", nextNodeId: 'misconception_heavy', sentiment: 'negative' },
            { id: 'no_push', label: "Nothing is pushing it.", nextNodeId: 'correct_still', sentiment: 'positive' },
            { id: 'gravity', label: "Gravity holds it down.", nextNodeId: 'partial_gravity', sentiment: 'neutral' }
        ]
    },

    'misconception_heavy': {
        id: 'misconception_heavy',
        speaker: 'AI',
        content: "Hmm, good thought — but I've seen people push REALLY heavy things and they still move! 🏋️\n\nImagine if you pushed one side and your friend pushed the other side equally hard. Would it move?",
        options: [
            { id: 'no_cancel', label: "No, the pushes would cancel out.", nextNodeId: 'correct_still' },
            { id: 'yes_maybe', label: "Maybe?", nextNodeId: 'hint_balanced' }
        ]
    },

    'hint_balanced': {
        id: 'hint_balanced',
        speaker: 'AI',
        content: "Let's think about it more carefully! 🤔\n\nIf you push a door from one side with 10 Newtons, and someone pushes from the other side with exactly 10 Newtons — does the door move?\n\nThe two forces are **equal and opposite**, so they cancel out. We call those **balanced forces**.",
        options: [
            { id: 'got_it', label: "So balanced forces = no movement!", nextNodeId: 'correct_still' }
        ]
    },

    'partial_gravity': {
        id: 'partial_gravity',
        speaker: 'AI',
        content: "You're right that gravity pulls it DOWN ⬇️ — but the floor pushes it back UP ⬆️ just as hard! Those two forces cancel out perfectly.\n\nSo if up-and-down forces are balanced, what's missing to make it slide SIDEWAYS?",
        options: [
            { id: 'sideways_push', label: "A sideways push!", nextNodeId: 'correct_still' }
        ]
    },

    'correct_still': {
        id: 'correct_still',
        speaker: 'AI',
        content: "Exactly! The crate is still because all the forces on it are **balanced** — they cancel each other out. No extra push means no movement.\n\nLet's change that. I'm unlocking the **Force Slider** for you!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'phase2_ready', forceUnlocked: true } },
        options: [
            { id: 'try_push', label: "Let me push it!", nextNodeId: 'checkpoint_predict' }
        ]
    },

    'checkpoint_predict': {
        id: 'checkpoint_predict',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nBefore you push — when you LET GO of the push, what will happen to the crate?\n\nLock in your prediction:",
        options: [
            { id: 'predict_forever', label: "It'll keep sliding forever.", nextNodeId: 'push_it', simAction: { type: 'SET_VISUAL', payload: { prediction: 'forever' } } },
            { id: 'predict_stop', label: "It'll slow down and stop.", nextNodeId: 'push_it', simAction: { type: 'SET_VISUAL', payload: { prediction: 'stop' } } },
            { id: 'predict_fast', label: "It'll speed up on its own.", nextNodeId: 'push_it', simAction: { type: 'SET_VISUAL', payload: { prediction: 'speedup' } } }
        ]
    },

    'push_it': {
        id: 'push_it',
        speaker: 'AI',
        content: "OK! Drag the Force Slider up to **50 Newtons** and watch what happens! 🚀",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'pushing', crateMoving: true, forceApplied: true } },
        options: [
            { id: 'pushed', label: "I pushed it! It moved... then stopped.", nextNodeId: 'observe_stop' }
        ]
    },

    'observe_stop': {
        id: 'observe_stop',
        speaker: 'AI',
        content: "It stopped! 🛑 But wait — you let go of the push. Newton's First Law says objects in motion should STAY in motion... unless some OTHER force slowed it down.\n\nWhat sneaky force stopped the crate?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'stopped', crateMoving: false, forceApplied: false, showFriction: true } },
        options: [
            { id: 'energy', label: "It ran out of energy.", nextNodeId: 'misconception_energy' },
            { id: 'friction', label: "Friction!", nextNodeId: 'correct_friction', sentiment: 'positive' },
            { id: 'air', label: "Air resistance?", nextNodeId: 'partial_air' }
        ]
    },

    'misconception_energy': {
        id: 'misconception_energy',
        speaker: 'AI',
        content: "I can see why you'd think that! But energy doesn't just \"run out\" — it transforms into other forms. Look at the floor near the crate. It's a tiny bit warmer now!\n\nThe crate's movement energy turned into **heat** because of a force called **friction** — the floor was fighting the slide the whole time.",
        options: [
            { id: 'got_friction', label: "Oh! So friction slowed it down?", nextNodeId: 'correct_friction' }
        ]
    },

    'partial_air': {
        id: 'partial_air',
        speaker: 'AI',
        content: "Air resistance IS a real force, but it's tiny for a big heavy crate. The main force here is **friction** — the rough contact between the crate and the floor.\n\nThink of it like rubbing your hands together. The roughness resists sliding!",
        options: [
            { id: 'got_it', label: "Makes sense! Friction from the floor.", nextNodeId: 'correct_friction' }
        ]
    },

    'correct_friction': {
        id: 'correct_friction',
        speaker: 'AI',
        content: "✅ **Friction** is a force that opposes motion. The rough floor grabs at the crate's bottom and slows it down.\n\nNow here's the fun part — I'm unlocking the **Friction Toggle**. What if we could make the floor slippery like ice? 🧊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'phase3_ready', frictionUnlocked: true } },
        options: [
            { id: 'try_ice', label: "Switch to the ice floor!", nextNodeId: 'ice_experiment' }
        ]
    },

    'ice_experiment': {
        id: 'ice_experiment',
        speaker: 'AI',
        content: "Floor changed to ICE! 🧊 Now push the crate again and watch the Speed graph...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'ice', friction: 'none', crateMoving: true, forceApplied: true } },
        options: [
            { id: 'ice_result', label: "Whoa! It never stops!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **You just discovered Newton's First Law!**\n\nNo friction = nothing to slow it down = the crate keeps sliding at the same speed FOREVER.\n\n**Objects keep moving until something stops them.**\n\nThat \"something\" is usually friction. On Earth, friction is everywhere. But in space? Things drift forever!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showNewtonLaw: true } },
        options: [
            { id: 'crosslink', label: "That's so cool! What's next?", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** You know what else moves faster when there's less friction? Tiny particles! When you heat up water, the molecules zoom around faster.\n\nHead over to **Chemistry Lesson C1: Particles on the Move** to see how the same idea of \"push and slide\" works at the MOLECULAR level!\n\n✅ **Lesson P1 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

