import { DialogNode } from '../../types';

/**
 * B21 — Respiration Cycle
 * Big Idea 21: "How Do Cycles Keep Systems Alive?"
 */
export const getB21Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: 'Your body keeps making energy all day long. This isn\'t just one big reaction—it\'s a cycle that keeps going, making sure your cells always have power.\n\nIn this lesson, here\'s what the picture shows:\n- **Brighter web** = The cell is making energy easily and everything is working well.\n- **Red glow** = The cell is working too hard and can\'t keep up (not enough oxygen for the job).\n- **Purple pulse** = The cell has extra energy saved up, like a backup battery.\n\nWhy do you think cells use a cycle instead of just one step?',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', oxygenLevel: 70 } },
        options: [
            { id: 'regenerated', label: 'Cells reuse their parts each turn.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'one_step', label: 'Cells do one reaction and stop.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: 'Metabolism is continuous, not one-and-done. Glycolysis, the citric acid cycle, and oxidative phosphorylation are coupled pathways that run repeatedly.\n\nCycle intermediates are regenerated so throughput can continue while input conditions (oxygen supply, demand, substrate availability) fluctuate.',
        options: [{ id: 'cont', label: 'So cycling supports steady energy output.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: 'Exactly. Biological cycles maintain **throughput** while conditions change, preserving cellular energy supply.\n\nKey idea: ATP balance depends on two opposing forces:\n- **Oxygen support** increases efficient aerobic ATP yield\n- **Energy demand** consumes ATP faster and can push the system toward strain\n\nWhen demand rises faster than oxygen-supported production, reserve shrinks and stress markers increase.',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cycle', atpRate: 62 } },
        options: [
            { id: 'terms', label: 'Teach me key words first.', nextNodeId: 'key_terms' },
            { id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }
        ]
    },
    key_terms: {
        id: 'key_terms',
        speaker: 'AI',
        content: 'Key words for B21:\n\n**ATP throughput**: effective ATP output under current constraints.\n\n**Metabolic reserve**: headroom between oxygen support and demand.\n\n**Strain**: stress state where demand is pushing harder than production can sustainably match.\n\n**Feedback regulation**: adjustments in pathway activity that stabilize ATP over time.',
        options: [{ id: 'cp2', label: 'Now quiz me.', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'If oxygen drops sharply while demand stays high, what usually happens first?',
        options: [
            { id: 'atp_drop', label: 'ATP production efficiency drops.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'faster', label: 'ATP efficiency increases.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: 'Low oxygen limits aerobic respiration and usually reduces efficient ATP output.',
        options: [{ id: 'retry', label: 'Lower oxygen lowers efficient ATP production.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: 'Right. Cycle performance depends on inputs and regulation.\n\nUse the lab controls to confirm:\n- Lower **Oxygen** with demand fixed: throughput falls, reserve drops\n- Raise **Demand** with oxygen fixed: strain rises, reserve compresses\n- Balance both: throughput stabilizes and stress visuals soften',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', hypoxia: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: 'Discovery: biological survival depends on stable repeating cycles with **feedback control** and oxygen-sensitive regulation.\n\nSummary Table:\n\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Oxygen | Better aerobic support | ATP throughput tends to rise; reserve improves |\n| Energy Demand | Faster ATP consumption | Reserve shrinks; strain tends to rise |\n| Metabolic Reserve | More system headroom | Better tolerance to disturbances |\n| Strain | Demand-pressure signal | Indicates risk of unstable ATP supply |\n\nThe goal is not maxing one slider; it is preserving dynamic balance so ATP output remains reliable.',
        options: [{ id: 'done', label: 'Complete B21', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 21 Complete — How Do Cycles Keep Systems Alive?**\n\n- Physics (P21): Tidal Cycles — orbital forcing creates repeating sea-level rhythms\n- Chemistry (C21): Carbon Cycle Chemistry — reservoir exchange and chemical flux maintain atmospheric balance\n- Biology (B21): Respiration Cycles — regulated ATP production and metabolic turnover keep cells alive\n\nIn all three: **repeating cycles with feedback control sustain stability in every system!** 🌙♻️🫁\n\n✅ **Lesson B21 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
