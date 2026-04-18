import { DialogNode } from '../../types';

/**
 * B3 — Food Chains: You Are Solar Powered
 * Big Idea 3: "Where Does Energy Come From?"
 * Scenario: "Tracing Energy Through a Meadow Food Chain"
 * Target Misconception: "Plants get food from soil"
 */
export const getB3Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome back to Biology! 🌿\n\nImagine a meadow. A fox is running across the field — strong, fast, full of energy.\n\nBut where did the fox get all that energy?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', chainStep: 'fox', traceActive: false } },
        options: [
            { id: 'rabbit', label: "From eating rabbits.", nextNodeId: 'trace_rabbit' },
            { id: 'food', label: "From food.", nextNodeId: 'trace_rabbit' },
            { id: 'sun', label: "From the sun!", nextNodeId: 'jumping_ahead' }
        ]
    },

    'trace_rabbit': {
        id: 'trace_rabbit',
        speaker: 'AI',
        content: "Right — the fox hunts rabbits. 🦊 The rabbit's body gives the fox energy.\n\nBut where did the RABBIT get its energy? Rabbits spend their days eating... what?",
        options: [
            { id: 'grass', label: "Grass and plants!", nextNodeId: 'trace_grass' },
            { id: 'carrots', label: "Carrots and leaves.", nextNodeId: 'trace_carrots' }
        ]
    },

    'trace_carrots': {
        id: 'trace_carrots',
        speaker: 'AI',
        content: "Carrots and leaves — yes! 🥕🌿 Those are both plants. Wild rabbits actually eat mostly grass, clover, and dandelions rather than carrots (that's a cartoon myth!), but they're ALL plants.\n\nSo the rabbit's energy came from plants. But where did the PLANT get its energy? Let's trace the chain!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'tracing', chainStep: 'rabbit' } },
        options: [
            { id: 'trace', label: "Hit Trace Energy!", nextNodeId: 'trace_reveal', simAction: { type: 'SET_VISUAL', payload: { traceActive: true } } }
        ]
    },

    'trace_grass': {
        id: 'trace_grass',
        speaker: 'AI',
        content: "Exactly! The rabbit eats grass, clover, and other plants. 🐰🌱 So the rabbit's energy came from plants.\n\nBut where did the PLANT get its energy? Let's trace the chain!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'tracing', chainStep: 'rabbit' } },
        options: [
            { id: 'trace', label: "Hit Trace Energy!", nextNodeId: 'trace_reveal', simAction: { type: 'SET_VISUAL', payload: { traceActive: true } } }
        ]
    },

    'jumping_ahead': {
        id: 'jumping_ahead',
        speaker: 'AI',
        content: "Jumping ahead! 🌟 You're right, but let's trace the chain step by step to see HOW the sun's energy gets into the fox.\n\nHit the **Trace Energy** button!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'tracing' } },
        options: [
            { id: 'trace', label: "Trace the chain!", nextNodeId: 'trace_reveal', simAction: { type: 'SET_VISUAL', payload: { traceActive: true } } }
        ]
    },

    'trace_reveal': {
        id: 'trace_reveal',
        speaker: 'AI',
        content: "Watch the energy chain light up! ✨\n\n☀️ **Sun** → 🌱 **Grass** → 🐰 **Rabbit** → 🦊 **Fox**\n\nSunlight hits the grass. The grass uses a chemical reaction called **photosynthesis** to turn sunlight + CO₂ + water into **glucose** (sugar). That glucose IS the plant's food!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'chain_revealed', chainStep: 'all', traceActive: true } },
        options: [
            { id: 'checkpoint', label: "So grass makes its own food from sunlight?", nextNodeId: 'checkpoint_soil' }
        ]
    },

    'checkpoint_soil': {
        id: 'checkpoint_soil',
        speaker: 'AI',
        content: "⏸️ **Quick Check:**\n\nWhere does grass get its FOOD (energy)?",
        options: [
            { id: 'soil', label: "From the soil.", nextNodeId: 'misconception_soil', sentiment: 'negative' },
            { id: 'sunlight', label: "From sunlight (photosynthesis).", nextNodeId: 'correct_photosynthesis', sentiment: 'positive' },
            { id: 'water', label: "From water.", nextNodeId: 'partial_water' }
        ]
    },

    'misconception_soil': {
        id: 'misconception_soil',
        speaker: 'AI',
        content: "🚨 This is one of the most common misconceptions!\n\nSoil gives plants **minerals** and **water** — like vitamins. But the actual ENERGY (food) comes from **SUNLIGHT**.\n\nThe grass literally EATS LIGHT using chemistry! Photosynthesis converts light energy into chemical energy (glucose).",
        options: [
            { id: 'got_it', label: "Plants eat light, not dirt!", nextNodeId: 'correct_photosynthesis' }
        ]
    },

    'partial_water': {
        id: 'partial_water',
        speaker: 'AI',
        content: "Water is an ingredient in photosynthesis, but it's not the energy source. Think of water as a tool that helps the reaction happen.\n\nThe actual ENERGY comes from **sunlight** — the plant captures light and converts it into sugar!",
        options: [
            { id: 'got_it', label: "Sunlight is the energy source!", nextNodeId: 'correct_photosynthesis' }
        ]
    },

    'correct_photosynthesis': {
        id: 'correct_photosynthesis',
        speaker: 'AI',
        content: "✅ **Photosynthesis** is the reaction:\n\n☀️ Light Energy + CO₂ + Water → Glucose (sugar) + Oxygen\n\nThe plant captures light from the sun and stores it as chemical energy in glucose molecules. This is an **endothermic** reaction — just like the cold pack from Chemistry (C3)!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'photosynthesis', showReaction: true } },
        options: [
            { id: 'energy_loss', label: "Does all the energy pass through?", nextNodeId: 'energy_loss' }
        ]
    },

    'energy_loss': {
        id: 'energy_loss',
        speaker: 'AI',
        content: "Great question! Look at the Energy Amount at each step:\n\n☀️ Sun: **100 units**\n🌱 Grass stores: **10 units** (90% lost as heat)\n🐰 Rabbit stores: **1 unit** (90% lost as body heat, hopping around)\n🦊 Fox gets: **0.1 units**\n\nOnly about 10% transfers at each step! 📉",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'energy_bars', showEnergyLoss: true } },
        options: [
            { id: 'disappear', label: "Where does the other 90% go?", nextNodeId: 'energy_question' }
        ]
    },

    'energy_question': {
        id: 'energy_question',
        speaker: 'AI',
        content: "Remember from Physics (P3)? Energy NEVER disappears!",
        options: [
            { id: 'vanish', label: "It disappears?", nextNodeId: 'heat_reminder' },
            { id: 'heat', label: "It becomes heat!", nextNodeId: 'discovery', sentiment: 'positive' }
        ]
    },

    'heat_reminder': {
        id: 'heat_reminder',
        speaker: 'AI',
        content: "Remember the ramp experiment! Energy never disappears — it transforms. The rabbit's body warmth, its hopping, its digestion — all of that is energy being converted to heat. Same rule as the friction on the ramp!",
        options: [
            { id: 'heat', label: "Energy transforms, never vanishes!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\nThe sun is the ultimate energy source for almost all life on Earth!\n\n- **Photosynthesis** (Chemistry C3) captures it\n- **Cells** (Biology B2) burn it (mitochondria!)\n- **Physics** (P3) told us the rule: energy transforms, never disappears\n\nEvery living thing is **solar powered** — even the fox! Its energy just took a detour through grass and a rabbit. 🌞🌱🐰🦊\n\nAnd when we humans eat fruits and vegetables, we're getting that solar energy too! 🍎🥦",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'crosslink', label: "Everything is solar powered!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 3 Complete!**\n- Physics (P3): Energy transforms between forms (height → speed → heat)\n- Chemistry (C3): Energy stored in chemical bonds (endo vs exo)\n- Biology (B3): Food chains trace energy from sun through all living things!\n\n✅ **Lesson B3 Complete!** On to Big Idea 4: Sensing the World! 🎊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

