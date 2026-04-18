import { DialogNode } from '../../types';

/**
 * P25 — Chaos in Motion
 * Big Idea 25: "How Can Tiny Changes Cause Big Effects?"
 */
export const getP25Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: `In **physics**, even **tiny changes** in starting conditions can lead to **big differences** over time.\n\n- **Chaotic systems** are **highly sensitive** to initial conditions.\n- **Trajectories** that start close can **diverge rapidly**.\n- **Nonlinearity** means small causes can have large effects.\n\n**Watch how two nearly identical starts create very different paths!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', initialOffset: 2 } },
        options: [
            { id: 'sensitive', label: 'Some systems are highly sensitive to initial conditions.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'always_same', label: 'Small differences always stay small.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: 'In **nonlinear systems**, even **tiny differences** can **amplify quickly**.\n\nThis is why **weather** and other complex systems are hard to predict!',
        options: [{ id: 'cont', label: 'So predictability can be limited.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: '**Exactly!**\n\n- **Deterministic rules** can still produce **practical unpredictability** over long times.\n- **Chaos** means we can know the rules but still not predict the outcome.\n\n**Try adjusting the sliders to see how chaos grows!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'divergence', divergence: 45 } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'In **chaotic regimes**, long-term forecast skill usually:',
        options: [
            { id: 'decrease', label: 'Decreases as uncertainty grows.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'perfect', label: 'Becomes perfect with enough equations.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: 'Even with **correct equations**, **measurement uncertainty** can grow rapidly.\n\n**Forecast skill drops as uncertainty amplifies!**',
        options: [{ id: 'retry', label: 'Forecast skill drops as uncertainty amplifies.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: '**Correct!** **Tiny perturbations** can reshape **trajectories**.\n\n- **Chaos** is everywhere: weather, planets, populations, and more.\n- **Nonlinearity** means small changes can have big effects.\n\n**Keep exploring!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', chaosOn: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: '**Discovery:**\n\n**Nonlinear dynamics** can turn **small differences** into **large outcomes**.\n\n- **Butterfly effect:** a tiny change can alter the future.\n- **Chaos** is not randomness—it’s sensitive dependence on initial conditions.\n\nReady to complete the lesson?',
        options: [{ id: 'done', label: 'Complete P25', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 25 Complete — How Can Tiny Changes Cause Big Effects?**\n\n- **Physics (P25):** Chaos in Motion — tiny changes in starting conditions can lead to big differences\n- **Chemistry (C25):** Reaction Sensitivity — small impurities or shifts can change outcomes\n- **Biology (B25):** Population Dynamics — small events can trigger large swings\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Initial Offset | Larger | Faster divergence |\n| Nonlinearity | Higher | More chaos, less predictability |\n| Forecast Time | Longer | Less accuracy |\n| Sensitivity | Higher | Small changes, big effects |\n\nIn all three: **small causes can have big consequences!** 🦋🌪️🌱\n\n✅ **Lesson P25 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
