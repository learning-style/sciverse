import { DialogNode } from '../../types';

/**
 * P15 — The Pendulum
 * Big Idea 15: "How Do Systems Find Balance?"
 * Scenario: Grandfather clock pendulum — period and resonance
 * Target Misconception: "A heavier pendulum swings faster"
 */
export const getP15Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Oscillation Lab! ⏱️\n\nA grandfather clock pendulum is swinging in the simulation. Each back-and-forth swing takes exactly **1 second**.\n\nHere's your first question: if you attach a **heavier bob** to the same pendulum length, does the swing time (period) change?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', length: 0.25, mass: 1, angle: 15 } },
        options: [
            { id: 'faster_heavy', label: "Yes — heavier means more gravitational pull, so it swings faster.", nextNodeId: 'misconception_heavy', sentiment: 'negative' },
            { id: 'same', label: "No — the mass doesn't affect the period!", nextNodeId: 'correct_mass', sentiment: 'positive' },
            { id: 'slower_heavy', label: "Yes — heavier is harder to swing, so it slows down.", nextNodeId: 'misconception_slow', sentiment: 'negative' }
        ]
    },

    'misconception_heavy': {
        id: 'misconception_heavy',
        speaker: 'AI',
        content: "Great intuition, but remember what Galileo showed — heavy objects fall at the same rate as light ones! ⚖️\n\nMore mass means more gravitational force pulling it... but also more inertia resisting motion. These two effects cancel out exactly. The period stays the same!\n\nThis discovery helped Galileo understand acceleration in 1602 — the same year he was supposedly watching a cathedral pendulum swing.",
        options: [
            { id: 'gravity_inertia_cancel', label: "More gravity AND more inertia — they cancel! Period unchanged.", nextNodeId: 'correct_mass' }
        ]
    },

    'misconception_slow': {
        id: 'misconception_slow',
        speaker: 'AI',
        content: "Good instinct, but inertia (resisting motion) and gravity (pulling it) both scale with mass proportionally. They cancel each other out — the period is completely independent of mass! 🤯",
        options: [
            { id: 'got_it', label: "Mass doesn't matter for pendulum period!", nextNodeId: 'correct_mass' }
        ]
    },

    'correct_mass': {
        id: 'correct_mass',
        speaker: 'AI',
        content: "Yes! The period of a pendulum depends ONLY on **length** and **gravity** — not mass, not starting angle (for small swings).\n\nThe formula is: **T = 2π √(L/g)**\n\nWhere L = length in meters, g = 9.81 m/s² (Earth's gravity)\n\nFor a 25cm (0.25m) pendulum: T = 2π √(0.25/9.81) ≈ **1.0 second** — that's a grandfather clock!\n\nTry adjusting the **Length slider** — watch the period change!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'length_demo', showLengthSlider: true, showPeriodCounter: true } },
        options: [
            { id: 'longer_slower', label: "Longer pendulum = slower swing! Shorter = faster.", nextNodeId: 'resonance' }
        ]
    },

    'resonance': {
        id: 'resonance',
        speaker: 'AI',
        content: "Perfect! Now there's a phenomenon called **resonance** — what happens when you push a pendulum at exactly its natural frequency.\n\nThink of pushing someone on a swing: if you push at just the right moment each cycle, the swing gets higher and higher. Push at the wrong moment and you kill the motion.\n\nThis is why soldiers break step when marching across bridges! ⚠️",
        options: [
            { id: 'bridges', label: "Wait — marching soldiers used to collapse bridges?!", nextNodeId: 'resonance_demo' },
            { id: 'push_demo', label: "Let me try the resonance demo in the sim!", nextNodeId: 'resonance_demo' }
        ]
    },

    'resonance_demo': {
        id: 'resonance_demo',
        speaker: 'AI',
        content: "Yes! The Angers Bridge (1850) collapsed when soldiers marched in step across it. The Tacoma Narrows Bridge (1940) collapsed due to wind resonance with its natural frequency.\n\nTry the **Resonance Test** in the sim — push the pendulum at its natural period vs. at the wrong timing. See the amplitude difference! 🌊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'resonance', showResonanceTest: true } },
        options: [
            { id: 'tested', label: "In-phase pushing made it swing 10× higher — scary power!", nextNodeId: 'damping' }
        ]
    },

    'damping': {
        id: 'damping',
        speaker: 'AI',
        content: "Exactly! And notice: without any push, the pendulum gradually slows down. This is **damping** — air resistance and friction stealing energy each cycle.\n\nIn a grandfather clock, the escapement mechanism gives tiny pushes each cycle to compensate for damping, keeping it going.\n\nWhat do you think would happen with NO damping and no push — a perfect frictionless pendulum?",
        options: [
            { id: 'forever', label: "It would swing forever — no energy loss!", nextNodeId: 'summary' },
            { id: 'speed_up', label: "It would speed up over time somehow.", nextNodeId: 'damping_hint' }
        ]
    },

    'damping_hint': {
        id: 'damping_hint',
        speaker: 'AI',
        content: "Energy only comes in/out if something adds or removes it! A perfect frictionless pendulum conserves all its initial energy — swings forever at the same amplitude. 🔋",
        options: [
            { id: 'perfect_forever', label: "Perfect pendulum = perpetual motion (in theory)!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Oscillation Mastered:**\n\n✅ Period = 2π √(L/g) — length-dependent, mass-independent\n✅ Longer pendulum → slower period\n✅ Resonance = pushing at natural frequency → amplitude grows dangerously\n✅ Damping = friction/air resistance steals energy each cycle\n✅ Clocks use pendulums because period is extremely regular\n✅ Resonance explains bridge/building failures and musical tuning!\n\n**Real use:** Atomic clocks use electron oscillations — accurate to 1 second in 300 million years!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "Oscillation unlocked! Clocks will never look the same.", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Time master! ⏱️\n\nConnect to **C15 (Chemical Equilibrium)** to see how chemistry oscillates to find balance, or **B15 (Predator-Prey)** to see population oscillations in nature!",
        options: []
    }
});
