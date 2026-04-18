import { DialogNode } from '../../types';

/**
 * B24 — Vascular Transport
 * Big Idea 24: "How Do Networks Deliver What Matters?"
 */
export const getB24Script = (): Record<string, DialogNode> => ({
    root: {
        id: 'root',
        speaker: 'AI',
        content: `In **biology**, plants must move **water** and **sugars** across long distances—from **roots** to **leaves** and back. Why do they need **transport networks**?\n\n- **Diffusion** alone is too slow for large organisms.\n- **Xylem** and **phloem** act as specialized highways for water and nutrients.\n- **Branching networks** ensure every cell gets what it needs.\n\n**What does the visual show?**\n- The **green vertical structure** is the plant stem (main transport channel).\n- The **light green disks at the top** are leaves, where resources are delivered and transpiration occurs.\n- The **blue lines inside the stem** are xylem tubes, carrying water upward from the roots.\n- The **blue dots moving up** represent water flow through the xylem.\n- The **brown structures at the bottom** are roots, absorbing water and nutrients.\n- The **orange/yellow lines** on the right are stomata exchange arrows (gas and water exchange).\n- The **blue arrows** from the leaves are transpiration arrows (water vapor leaving the plant).\n\nEach color and shape matches its biological role: **green** for living tissue, **blue** for water flow, **brown** for roots, **orange/yellow** for gas exchange.\n\n**Explore how structure, pressure, and environment affect delivery!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', xylemFlow: 55 } },
        options: [
            { id: 'network_need', label: 'Diffusion alone is too slow at whole-organism scale.', nextNodeId: 'correct', sentiment: 'positive' },
            { id: 'diffusion_only', label: 'Diffusion is enough for all plant transport.', nextNodeId: 'misconception' }
        ]
    },
    misconception: {
        id: 'misconception',
        speaker: 'AI',
        content: 'Large organisms require **specialized pathways** (**xylem** for water, **phloem** for sugars) for efficient delivery.\n\n**Simple diffusion** is not enough for tall trees or big plants!',
        options: [{ id: 'cont', label: 'So biology uses engineered networks too.', nextNodeId: 'correct' }]
    },
    correct: {
        id: 'correct',
        speaker: 'AI',
        content: '**Exactly!**\n\n- **Structure** (branching tubes) and **pressure gradients** support **directional transport**.\n- **Xylem** pulls water up from roots.\n- **Phloem** moves sugars from leaves to where they are needed.\n\n**Try adjusting the sliders to see how the network responds!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network', phloemFlux: 50 } },
        options: [{ id: 'cp', label: 'Checkpoint', nextNodeId: 'checkpoint' }]
    },
    checkpoint: {
        id: 'checkpoint',
        speaker: 'AI',
        content: 'If **stomata** close during **drought**, what happens to **xylem flow**?\n\n- **Stomata** are pores that let water vapor out and CO₂ in.\n- **Transpiration pull** drives water up the xylem.\n- Closing stomata reduces water loss, but also slows water delivery.\n',
        options: [
            { id: 'drop', label: 'Drops because transpiration pull decreases.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'rise', label: 'Rises sharply.', nextNodeId: 'checkpoint_wrong' }
        ]
    },
    checkpoint_wrong: {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: '**Lower transpiration** usually reduces water pull through **xylem**.\n\nTry again!',
        options: [{ id: 'retry', label: 'Reduced transpiration lowers xylem flow.', nextNodeId: 'checkpoint_correct' }]
    },
    checkpoint_correct: {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: '**Correct!** Biological networks are **dynamic** and **environmentally coupled**.\n\n- **Plants** adjust their networks in response to drought, flooding, or damage.\n- **Stomata** and **xylem** work together to balance water delivery and loss.\n\n**Keep exploring!**',
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', drought: true } },
        options: [{ id: 'disc', label: 'Discovery', nextNodeId: 'discovery' }]
    },
    discovery: {
        id: 'discovery',
        speaker: 'AI',
        content: '**Discovery:**\n\nLife depends on **adaptive transport networks** to deliver resources reliably.\n\n- **Xylem** and **phloem** are living pipelines.\n- **Roots, stems, leaves** all play a role.\n- **Networks** allow plants to survive in changing environments.\n\nReady to complete the lesson?',
        options: [{ id: 'done', label: 'Complete B24', nextNodeId: 'complete' }]
    },
    complete: {
        id: 'complete',
        speaker: 'AI',
        content: `🔗 **Big Idea 24 Complete — How Do Networks Deliver What Matters?**\n\n- **Physics (P24):** Flow Networks — pressure, resistance, and branch throughput govern delivery\n- **Chemistry (C24):** Reaction Networks — pathway bottlenecks and catalytic rerouting optimize output\n- **Biology (B24):** Vascular Transport — xylem/phloem pathways deliver water, sugar, and nutrients throughout plants\n\n**Summary Table:**\n| Variable | If Increased | Typical Effect |\n| --- | --- | --- |\n| Transpiration | Higher | More water pulled up |\n| Stomata Opening | Wider | More gas exchange, more water loss |\n| Xylem Flow | Faster | Quicker delivery to leaves |\n| Root Uptake | Higher | More water/nutrients absorbed |\n\nIn all three: **networks branch, balance pressure, and adapt to deliver resources where they're needed!** 🛰🧬🌿\n\n✅ **Lesson B24 Complete!**`,
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
