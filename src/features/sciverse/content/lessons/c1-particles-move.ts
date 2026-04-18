import { DialogNode } from '../../types';

/**
 * C1 — Particles on the Move
 * Big Idea 1: "Why Do Things Move?"
 * Scenario: "Why Does Hot Chocolate Steam?"
 * Target Misconception: "Heat makes things grow"
 */
export const getC1Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Chemistry Lab! ⚗️\n\nSee this container? Those tiny colored dots bouncing around inside represent **water molecules** — WAY too small to see in real life.\n\nThe temperature right now is **10°C** (pretty cold). Notice how the dots barely jiggle?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', temperature: 10, particleSpeed: 'slow' } },
        options: [
            { id: 'why_move', label: "Why are they moving at all?", nextNodeId: 'always_moving' },
            { id: 'chill', label: "They seem pretty chill.", nextNodeId: 'chill_response' }
        ]
    },

    'always_moving': {
        id: 'always_moving',
        speaker: 'AI',
        content: "Great question! 🤔\n\nParticles are **always** moving — even in cold water, even in ice! They never fully stop. They just move really slowly when it's cold.\n\nThis is called **thermal energy** — the energy of tiny vibrating particles.",
        options: [
            { id: 'heat_up', label: "What if we heat them up?", nextNodeId: 'checkpoint_heat' }
        ]
    },

    'chill_response': {
        id: 'chill_response',
        speaker: 'AI',
        content: "Exactly — cool temperature, slow movement. That's particle behavior at low energy. ❄️\n\nBut what if we crank up the heat?",
        options: [
            { id: 'lets_heat', label: "Let's find out!", nextNodeId: 'checkpoint_heat' }
        ]
    },

    'checkpoint_heat': {
        id: 'checkpoint_heat',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nI'm about to raise the temperature to **80°C**. What do you think will happen to the particles?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'predict', tempSliderUnlocked: true } },
        options: [
            { id: 'bigger', label: "They'll get bigger.", nextNodeId: 'heat_up', simAction: { type: 'SET_VISUAL', payload: { prediction: 'bigger' } } },
            { id: 'faster', label: "They'll move faster.", nextNodeId: 'heat_up', simAction: { type: 'SET_VISUAL', payload: { prediction: 'faster' } } },
            { id: 'color', label: "They'll change color.", nextNodeId: 'heat_up', simAction: { type: 'SET_VISUAL', payload: { prediction: 'color' } } }
        ]
    },

    'heat_up': {
        id: 'heat_up',
        speaker: 'AI',
        content: "Drag the **Temperature Slider** to 80°C and watch closely! 🔥",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'heating', temperature: 80, particleSpeed: 'fast' } },
        options: [
            { id: 'observe', label: "They're bouncing way faster!", nextNodeId: 'check_prediction' }
        ]
    },

    'check_prediction': {
        id: 'check_prediction',
        speaker: 'AI',
        content: "Look carefully at the dots — are they any BIGGER? 🔍\n\nNope! **Same size**, but they're *zooming* around like crazy!\n\nWhen something \"expands\" with heat, it's NOT because particles grow. The particles push each other **farther apart** by bouncing harder. The particles themselves stay the same size.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'observed', showSpacingArrows: true } },
        options: [
            { id: 'spacing', label: "So they spread out, not grow!", nextNodeId: 'correct_concept' },
            { id: 'why', label: "Why do they move faster?", nextNodeId: 'energy_explain' }
        ]
    },

    'energy_explain': {
        id: 'energy_explain',
        speaker: 'AI',
        content: "Heat IS energy! When you heat something, you're literally adding energy to the particles. More energy → faster bouncing → more collisions → particles spread apart.\n\nThat's why hot air rises — the particles are bouncing farther apart, making the air less dense!",
        options: [
            { id: 'got_it', label: "Energy makes them zoom!", nextNodeId: 'correct_concept' }
        ]
    },

    'correct_concept': {
        id: 'correct_concept',
        speaker: 'AI',
        content: "✅ **Key Insight:** Temperature measures how fast particles are moving!\n\n- Cold = slow jiggling\n- Hot = fast zooming\n- The particles DON'T get bigger\n\nNow let's go ALL the way up. Push the temperature to **100°C**! 🌡️💨",
        options: [
            { id: 'boil', label: "Crank it to 100!", nextNodeId: 'boiling' }
        ]
    },

    'boiling': {
        id: 'boiling',
        speaker: 'AI',
        content: "LOOK AT THE TOP! 👀 Some particles are ESCAPING the container!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'boiling', temperature: 100, particleSpeed: 'extreme', particlesEscaping: true } },
        options: [
            { id: 'steam', label: "They're flying out! Is that steam?", nextNodeId: 'steam_explain' }
        ]
    },

    'steam_explain': {
        id: 'steam_explain',
        speaker: 'AI',
        content: "🎉 YES! When particles move fast enough, they **break free** from the liquid entirely. Those escaped particles are **water vapor** — steam!\n\nThat's why your hot chocolate sends up little wisps of white. The fastest water molecules at the surface have enough energy to escape into the air.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'steam', showSteamLabel: true } },
        options: [
            { id: 'crosslink', label: "So heat = particle speed = steam!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** In Physics (P1), friction slowed the crate down. Here, the \"friction\" between particles is what keeps them stuck together as a liquid. Add enough energy and they break free — just like the crate sliding on ice!\n\nNext up: **Biology Lesson B1** — Your muscles are like tiny engines that convert energy into PULLING force!\n\n✅ **Lesson C1 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

