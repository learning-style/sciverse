import { DialogNode } from '../../types';

/**
 * P3 — Energy Transformations: The Ramp Experiment
 * Big Idea 3: "Where Does Energy Come From?"
 * Scenario: "The Roller Coaster Ball"
 * Target Misconception: "Energy gets used up"
 */
export const getP3Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome back to Physics! 🎢\n\nSee that ball sitting at the top of a ramp? It's not moving at all. But I'm telling you — it HAS energy right now.\n\nWeird, right?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', ballPosition: 'top', pe: 100, ke: 0, friction: false } },
        options: [
            { id: 'how', label: "How can it have energy if it's not moving?", nextNodeId: 'potential_explain' },
            { id: 'roll', label: "Let it roll!", nextNodeId: 'eager_roll' }
        ]
    },

    'eager_roll': {
        id: 'eager_roll',
        speaker: 'AI',
        content: "I love the enthusiasm! 🚀 But hold on — before we let it roll, notice something:\n\nThe ball is sitting at the **top** of the ramp. Even though it's perfectly still, it has **stored energy** called **Potential Energy** (PE). The higher up it is, the more it has.\n\nWhen it rolls down, that stored energy transforms into **movement energy** — called **Kinetic Energy** (KE).\n\nNow let's watch it happen with the energy bars!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'ready', showEnergyBars: true } },
        options: [
            { id: 'release', label: "Release the ball!", nextNodeId: 'rolling', simAction: { type: 'SET_VISUAL', payload: { ballPosition: 'rolling' } } }
        ]
    },

    'potential_explain': {
        id: 'potential_explain',
        speaker: 'AI',
        content: "Think of it as **stored** energy — like a stretched rubber band or a wound-up toy. 🔋\n\nThe ball's energy comes from its **height**. We call this **Potential Energy** (PE). The higher up it is, the more energy it stores.\n\nWhen it rolls down, that stored energy will convert into **movement energy** — called **Kinetic Energy** (KE).\n\nWatch the energy bars as it rolls!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'ready', showEnergyBars: true } },
        options: [
            { id: 'release', label: "Release the ball!", nextNodeId: 'rolling', simAction: { type: 'SET_VISUAL', payload: { ballPosition: 'rolling' } } }
        ]
    },

    'rolling': {
        id: 'rolling',
        speaker: 'AI',
        content: "Watch the energy bars! 📊\n\n🔵 **Potential Energy** (blue) is SHRINKING as the ball drops.\n🐟  **Kinetic Energy** (orange) is GROWING as the ball speeds up.\n\nAt the bottom, KE is maximum and PE is almost zero!\n\nBut look — the TOTAL stays the same! Energy isn't appearing or disappearing — it's **transforming**!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'rolling', ballPosition: 'bottom', pe: 5, ke: 95 } },
        options: [
            { id: 'checkpoint', label: "The total stayed the same!", nextNodeId: 'checkpoint_height' }
        ]
    },

    'checkpoint_height': {
        id: 'checkpoint_height',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nIf I make the ramp TALLER, will the ball be moving faster or slower at the bottom?",
        options: [
            { id: 'faster', label: "Faster — more height means more stored energy.", nextNodeId: 'height_correct', sentiment: 'positive' },
            { id: 'same', label: "Same speed.", nextNodeId: 'height_hint' },
            { id: 'slower', label: "Slower — it has farther to go.", nextNodeId: 'height_hint' }
        ]
    },

    'height_hint': {
        id: 'height_hint',
        speaker: 'AI',
        content: "Think about it — more height means MORE Potential Energy stored at the top. When ALL that energy converts to Kinetic Energy at the bottom... would there be more or less speed?",
        options: [
            { id: 'more', label: "More energy = more speed. Faster!", nextNodeId: 'height_correct' }
        ]
    },

    'height_correct': {
        id: 'height_correct',
        speaker: 'AI',
        content: "✅ Exactly! Taller ramp → more PE → more KE at the bottom → faster ball!\n\nNow here's the big question. I'm turning on **friction**. Watch what happens when the ball tries to roll up the other side...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'friction_ready', friction: true } },
        options: [
            { id: 'friction_test', label: "Turn on friction and let it roll!", nextNodeId: 'friction_result', simAction: { type: 'SET_VISUAL', payload: { ballPosition: 'top', friction: true } } }
        ]
    },

    'friction_result': {
        id: 'friction_result',
        speaker: 'AI',
        content: "UH OH! 😮 The ball rolled down... and back up the other side... but it DIDN'T reach the same height! It came up short!\n\nBut we said energy can't disappear. So where did it go??",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'friction_result', ballPosition: 'other_side_lower', pe: 70, ke: 0, energyLost: 30 } },
        options: [
            { id: 'used_up', label: "It got used up.", nextNodeId: 'misconception_used_up', sentiment: 'negative' },
            { id: 'heat', label: "Friction turned it into heat!", nextNodeId: 'correct_heat', sentiment: 'positive' }
        ]
    },

    'misconception_used_up': {
        id: 'misconception_used_up',
        speaker: 'AI',
        content: "This is one of the BIGGEST misconceptions in science! 🚨\n\n**Energy NEVER gets \"used up.\"** It can only change form!\n\nTouch the ramp — feel that? It's slightly WARM. The missing energy became **HEAT** from friction. The energy is still there... just in a form the ball can't use to climb higher.",
        onEnterAction: { type: 'SET_VISUAL', payload: { showHeatGlow: true } },
        options: [
            { id: 'oh', label: "So the energy turned into heat, not used up!", nextNodeId: 'correct_heat' }
        ]
    },

    'correct_heat': {
        id: 'correct_heat',
        speaker: 'AI',
        content: "🎉 **Conservation of Energy!**\n\nEnergy transforms:\n- **Height** → **Speed** → **Heat**\n\nThe total never changes. Energy is NEVER created or destroyed — just changed from one form to another.\n\nThis is one of the most fundamental laws in all of physics!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showConservation: true } },
        options: [
            { id: 'crosslink', label: "Energy transforms, never disappears!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** In this lesson, energy was stored as HEIGHT. In Chemistry (C3), you'll see energy stored in **chemical bonds** — and witness reactions that release or absorb that energy!\n\nIn Biology (B3), you'll trace energy all the way from the SUN to your muscles.\n\n✅ **Lesson P3 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

