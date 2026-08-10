import { DialogNode } from '../../types';

/**
 * B15 — Predator-Prey Dynamics
 * Big Idea 15: "How Do Systems Find Balance?"
 * Scenario: Wolf and deer population oscillations (Lotka-Volterra)
 * Target Misconception: "Removing predators makes prey animals safer and more abundant permanently"
 */
export const getB15Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Ecology Lab! 🐺\n\nWatch the graph update in real time — deer (green line) and wolves (red line) both have populations that change over time. This is a classic predator-prey simulation.\n\nHere's a real scenario: in 1907, the US government eliminated all wolves from the Kaibab Plateau to 'protect' the deer. What do you predict happened to the deer population?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', deerPop: 4000, wolfPop: 200, running: false } },
        options: [
            { id: 'more_deer', label: "Deer population increased permanently — they thrived without predators!", nextNodeId: 'misconception_thrive', sentiment: 'negative' },
            { id: 'spiked_crashed', label: "Deer exploded in numbers then crashed from overeating.", nextNodeId: 'correct_kaibab', sentiment: 'positive' },
            { id: 'same', label: "Deer population stayed roughly the same without wolves.", nextNodeId: 'kaibab_hint', sentiment: 'neutral' }
        ]
    },

    'misconception_thrive': {
        id: 'misconception_thrive',
        speaker: 'AI',
        content: "That's the exact reasoning the government used — and it was catastrophically wrong! 🦌💥\n\nHere's what actually happened on the Kaibab Plateau:\n- Deer went from ~4,000 to ~100,000 in 15 years (no predators!)\n- They stripped all vegetation bare\n- 60,000 deer died of starvation in two years\n- Population crashed below what it was BEFORE wolves were removed\n\nThe wolves were keeping the deer population *healthy*.",
        options: [
            { id: 'wolves_helped', label: "The wolves were protecting the ecosystem stability all along!", nextNodeId: 'correct_kaibab' }
        ]
    },

    'kaibab_hint': {
        id: 'kaibab_hint',
        speaker: 'AI',
        content: "Without population control, prey will overshoot the food supply — then crash hard. Predators create a natural ceiling that prevents boom-bust cycles. 🌿",
        options: [
            { id: 'understood', label: "Predators stabilize ecosystems, not destabilize them!", nextNodeId: 'correct_kaibab' }
        ]
    },

    'correct_kaibab': {
        id: 'correct_kaibab',
        speaker: 'AI',
        content: "Exactly! This boom-bust cycle is described mathematically by the **Lotka-Volterra equations** (1925).\n\nThe core cycle:\n1. 🦌 Deer increase (lots of plants, few wolves)\n2. 🐺 Wolves increase (lots of deer to eat)\n3. 🌿 Plants decrease (deer eat too much)\n4. 🦌 Deer decrease (less food + more wolves)\n5. 🐺 Wolves decrease (less deer to eat)\n6. → Back to step 1!\n\nPress **Start** in the sim and watch this cycle!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'running', running: true, showCycle: true } },
        options: [
            { id: 'saw_cycle', label: "I see the sine-wave oscillation — wolves and deer trade positions!", nextNodeId: 'time_lag' }
        ]
    },

    'time_lag': {
        id: 'time_lag',
        speaker: 'AI',
        content: "Notice the **time lag** — wolf population peaks AFTER deer population peaks. Makes sense: wolves need time to breed after finding abundant food!\n\nThis lag is what creates oscillation instead of a single crash. Without it, predators would always track prey perfectly and there'd be no cycles.\n\nNow try **removing all wolves** (set wolves to 0) in the sim — does the deer population stabilize?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'remove_wolves', showWolfControl: true } },
        options: [
            { id: 'crashed', label: "Deer exploded then crashed — just like Kaibab!", nextNodeId: 'reintroduce' }
        ]
    },

    'reintroduce': {
        id: 'reintroduce',
        speaker: 'AI',
        content: "History recreated! Now try **reintroducing wolves** while deer are very high.\n\nThis is exactly what happened in Yellowstone in 1995 — the first wolf reintroduction in 70 years. Scientists expected it to only help deer—but wolves also changed where deer grazed, which:\n- Allowed riverside trees to regrow\n- Stabilized riverbanks (tree roots)\n- Changed river paths (**trophic cascade**)!\n\nThis is a **trophic cascade** — predators changing the whole landscape, not just prey numbers. 🏞️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'reintroduce', showReintroduceButton: true } },
        options: [
            { id: 'reintroduced', label: "After reintroduction, both populations settled into stable cycles!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Predator-Prey Dynamics Mastered:**\n\n✅ Predators stabilize prey populations — preventing boom-bust\n✅ Lotka-Volterra: oscillating populations with time lag\n✅ Removing predators → prey overshoots → crashes below original level\n✅ Trophic cascades: predator effects ripple through entire ecosystems\n✅ Yellowstone wolves: changed rivers by changing deer behavior!\n\n**Big picture:** Balance in nature is dynamic (like chemical equilibrium!) — not static. Disruption causes oscillation, recovery takes time. 🌍",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "Ecology makes sense! I'll never look at wolves the same way.", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "🔗 **Big Idea 15 Complete — How Do Systems Find Balance?**\n\n- Physics (P15): Pendulum & Resonance — oscillation, damping, and natural timing\n- Chemistry (C15): Chemical Equilibrium — forward and reverse reactions reach dynamic balance\n- Biology (B15): Predator-Prey Cycles — populations oscillate and stabilize through ecological feedback\n\nIn all three: **balance isn't static — it's a dynamic dance of opposing forces!** ⚖️🐺⚗️\n\n✅ **Lesson B15 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
