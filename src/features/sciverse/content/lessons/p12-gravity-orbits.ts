import { DialogNode } from '../../types';

/**
 * P12 — Gravity & Orbits
 * Big Idea 12: "How Do Hidden Rules Shape Big Patterns?"
 * Scenario: A planet orbiting a star — why doesn't it fall in?
 * Target Misconception: "There is no gravity in space / astronauts float because there's no gravity"
 */
export const getP12Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Orbital Mechanics Lab! 🌍\n\nWatch Earth orbiting the Sun in the simulation. Astronauts on the ISS also appear to float weightlessly in space.\n\nDo you think there is gravity in space where the ISS orbits?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', showOrbit: true, orbitSpeed: 1 } },
        options: [
            { id: 'no_gravity', label: "No — astronauts float because there's no gravity up there.", nextNodeId: 'misconception_no_gravity', sentiment: 'negative' },
            { id: 'yes_gravity', label: "Yes — there IS gravity, and it keeps the ISS in orbit.", nextNodeId: 'correct_gravity', sentiment: 'positive' },
            { id: 'less_gravity', label: "Some gravity, but much weaker than on Earth.", nextNodeId: 'partial_less', sentiment: 'neutral' }
        ]
    },

    'misconception_no_gravity': {
        id: 'misconception_no_gravity',
        speaker: 'AI',
        content: "This is one of the biggest misconceptions in science! 🚀\n\nAt the ISS's altitude (~400 km up), gravity is actually **90%** as strong as on Earth's surface. Astronauts float because they're in **free fall** — constantly falling toward Earth but moving sideways so fast they miss it!\n\nIt's like this: if you throw a ball really, really hard horizontally, gravity still pulls it down — but it travels so far forward that it goes past Earth's curve before it hits.",
        options: [
            { id: 'mindblown', label: "Wait... the ISS is always falling?!", nextNodeId: 'correct_gravity' }
        ]
    },

    'partial_less': {
        id: 'partial_less',
        speaker: 'AI',
        content: "Pretty close! Gravity does get weaker with distance — but at ISS altitude, it's still 90% of surface gravity.\n\nThe key insight is that astronauts aren't floating because gravity is weak — they're floating because they and the station are all free-falling together. 🛸",
        options: [
            { id: 'understood', label: "Ah, free fall makes everything feel weightless!", nextNodeId: 'correct_gravity' }
        ]
    },

    'correct_gravity': {
        id: 'correct_gravity',
        speaker: 'AI',
        content: "Exactly! An orbit is just **falling sideways so fast you keep missing the ground**. 💫\n\nNewton imagined firing a cannonball from a mountain. Faster → lands further away → eventually so fast it curves around Earth → it's orbiting!\n\nTry adjusting the **orbital speed** slider — what happens if the planet moves too slowly?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'interactive', showGravityArrow: true, showSpeedControl: true } },
        options: [
            { id: 'too_slow', label: "Too slow — it spirals inward toward the star!", nextNodeId: 'speed_effects' },
            { id: 'too_fast', label: "Too fast — it flies off into space!", nextNodeId: 'speed_effects' }
        ]
    },

    'speed_effects': {
        id: 'speed_effects',
        speaker: 'AI',
        content: "Perfect observations! There's a **Goldilocks orbital speed** — just right for a stable circular orbit:\n\n🐌 Too slow → gravity wins → falls inward\n🚀 Too fast → escapes gravity → flies away\n✅ Just right → perfect circular orbit\n\nFor Earth, that speed is about **7.9 km/s** (28,000 km/h)! Now predict: does a more massive planet orbit faster or slower?",
        options: [
            { id: 'faster', label: "Faster — more mass needs more speed to resist gravity.", nextNodeId: 'mass_orbit' },
            { id: 'slower', label: "Slower — it's harder for gravity to pull it in.", nextNodeId: 'mass_orbit' },
            { id: 'same', label: "Same — orbit speed depends on the star, not the planet.", nextNodeId: 'mass_orbit' }
        ]
    },

    'mass_orbit': {
        id: 'mass_orbit',
        speaker: 'AI',
        content: "Counterintuitive answer: **the planet's mass doesn't matter!** 🤯\n\nOrbital speed depends ONLY on the mass of the object being orbited (the star) and the orbital radius. This is exactly why Galileo found that a heavy ball and a light ball fall at the same rate — gravity accelerates everything equally.\n\nThis means a 1kg satellite and a 1000kg satellite at the same altitude orbit at identical speeds!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mass_demo', showTwoMasses: true } },
        options: [
            { id: 'saw_it', label: "Both masses orbit at the same speed — incredible!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Orbital Mechanics Mastered:**\n\n✅ Gravity in space is nearly as strong as on Earth's surface\n✅ Orbiting = falling sideways fast enough to miss the ground\n✅ Weightlessness = free fall (not zero gravity!)\n✅ Orbital speed depends on the star's mass and distance — not the satellite's mass\n✅ Too slow → falls in; too fast → escapes\n\n**Scale check:** The Sun's gravity reaches 100 billion km away — beyond all known planets! 🌌",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [
            { id: 'done', label: "I get orbits now! The Universe makes sense.", nextNodeId: 'done' }
        ]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Stellar work — literally! 🌟\n\nConnect to **C12 (Periodic Table)** to see how stars forge elements, or **B12 (Natural Selection)** to understand how life adapts across cosmic timescales!",
        options: []
    }
});
