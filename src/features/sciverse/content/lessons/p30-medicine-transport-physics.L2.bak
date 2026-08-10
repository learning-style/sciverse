import { DialogNode } from '../../types';

/**
 * P30 — Diffusion Timing & Transport Rates
 * Big Idea 30: "How Do Medicines Reach the Right Place?"
 */
export function getP30Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `When you swallow a pill, how does the medicine get from your stomach to a headache in your brain? The answer is **diffusion physics** — the science of how molecules move from high concentration to low concentration.\n\n**Visual legend:**\n- **Gradient bar**: Shows medicine concentration from injection/intake site (high) to target tissue (low).\n- **Particles**: Medicine molecules diffusing through tissue. Speed depends on concentration gradient and tissue density.\n- **Timer**: Shows how long it takes medicine to reach therapeutic levels at the target.\n\n**Key words:**\n- **Diffusion**: Movement of molecules from high to low concentration. No energy required — it's driven by random thermal motion.\n- **Concentration gradient**: The difference in concentration between two regions. Steeper gradient = faster diffusion.\n- **Transport rate**: How quickly medicine molecules travel through the body. Depends on molecule size, tissue type, and blood flow.\n- **Therapeutic window**: The concentration range where medicine is effective but not toxic.\n\nWhy does an injection work faster than a pill for the same medicine?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'physics_answer', label: 'An injection puts medicine directly into the bloodstream, creating a steeper concentration gradient to the target tissue.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Because injections are stronger medicine.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `It's often the same medicine at the same dose! The difference is **transport physics**. A pill must dissolve in your stomach, pass through the intestinal wall into the bloodstream, and then diffuse to the target — that's multiple barriers. An injection skips straight to the blood. The concentration gradient from blood to target tissue is identical, but the injection gets there **minutes** instead of **30-60 minutes** because it eliminates the absorption delay. Physics principle: **fewer barriers = faster transport**.`,
            options: [
                { id: 'cont', label: 'So it\'s about how quickly the medicine reaches the bloodstream, not how strong it is.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Medicine transport depends on **two key variables**:\n\n1. **Diffusion rate** — How fast molecules spread through tissue. Governed by Fick's Law: flux = -D × (concentration difference / distance). Higher concentration gradient → faster diffusion.\n2. **Tissue permeability** — How easily molecules pass through biological barriers (gut wall, blood-brain barrier, cell membranes). Dense tissues slow transport; blood moves it fast.\n\nThese combine to determine the **delivery time** — how long until medicine reaches therapeutic concentration at the target:\n- **Fast**: High diffusion rate + high permeability → minutes (IV injection)\n- **Medium**: Moderate barriers → 30-60 min (oral pill)\n- **Slow**: Low permeability barriers → hours (skin patch, blood-brain barrier)\n\nThe physics of diffusion is identical to how heat spreads through metal or dye spreads in water.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me how diffusion transport works step by step.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Medicine transport — step by step:**\n\n1. **Intake**: Medicine enters the body (swallowed, injected, or absorbed through skin).\n2. **Dissolution**: Solid pills dissolve into molecules — only dissolved molecules can diffuse.\n3. **Absorption**: Molecules cross the first barrier (gut wall, skin) into the bloodstream. Rate depends on surface area and molecule size.\n4. **Circulation**: Blood carries medicine throughout the body at ~5 liters/minute. This is **convection** — much faster than diffusion alone.\n5. **Distribution**: Medicine exits blood vessels and diffuses into surrounding tissue. Concentration gradient drives this: blood has high concentration, tissue has low.\n6. **Target arrival**: Molecules reach target cells and bind to receptors. Therapeutic effect begins when concentration exceeds the minimum effective level.\n7. **Elimination**: Liver and kidneys break down and excrete the medicine, lowering concentration over time.\n\n**Key insight:** The rate-limiting step is usually **barrier crossing** — the blood-brain barrier, for instance, blocks 98% of drug molecules.\n\n**Try it:** Adjust diffusion rate and tissue permeability to see how delivery time changes!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A pain reliever needs 30 minutes to reach therapeutic levels when taken orally. If you double the concentration gradient (take two pills instead of one), does it reach the target in 15 minutes?`,
            options: [
                { id: 'right', label: 'Not exactly. Doubling gradient doubles the flux, but barrier crossing time stays similar — it might be somewhat faster but won\'t halve the time.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Yes, double concentration means half the time — it\'s a linear relationship.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Not quite. While Fick's Law says diffusion flux is proportional to concentration gradient, **delivery time isn't just diffusion**. The rate-limiting steps are barrier crossing (dissolution, absorption through gut wall) which don't scale linearly with dose. Doubling the dose might reach therapeutic levels slightly faster because peak blood concentration is higher, but the absorption bottleneck means it's maybe 20-25 minutes instead of 15. Also, doubling the dose risks exceeding the **therapeutic window** — entering toxic territory. That's why "take two" doesn't mean "works twice as fast."`,
            options: [
                { id: 'retry', label: 'So barriers create bottlenecks that limit how fast delivery can be, regardless of dose.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! Transport time has multiple components — dissolution, absorption, circulation, and tissue diffusion. Increasing concentration accelerates diffusion but doesn't speed up barrier crossing proportionally. The system has **bottlenecks**.\n\nThis is why drug designers focus on:\n- **Molecule size**: Smaller molecules cross barriers faster\n- **Lipid solubility**: Fat-soluble drugs cross cell membranes more easily\n- **Delivery route**: Bypassing barriers entirely (injection vs. oral)\n- **Nanoparticles**: Engineered carriers that "trick" barriers into letting drugs through`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Medicine delivery is governed by diffusion physics.\n\n- **Diffusion rate** drives molecule movement from high to low concentration\n- **Tissue permeability** determines how easily molecules cross biological barriers\n- **Delivery time** depends on the slowest step in the transport chain\n- **Concentration gradient** is the engine — steeper gradient = faster flux\n- **Barrier bottlenecks** limit delivery regardless of dose\n- **Route of administration** determines which barriers must be crossed\n\nThe same diffusion physics governs oxygen reaching cells, nutrients reaching tissues, and pollutants spreading through groundwater.`,
            options: [
                { id: 'done', label: 'Complete P30', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 30 — How Do Medicines Reach the Right Place?**\n\n- **Physics (P30):** Diffusion Transport — concentration gradients, barrier physics, and delivery timing\n- **Chemistry (C30):** Drug Solubility — how molecular properties control dissolution and controlled release\n- **Biology (B30):** Target Cells — how cells recognize, absorb, and respond to medicine molecules\n\n**Summary Table:**\n| Variable | Low Value | High Value | Effect |\n| --- | --- | --- | --- |\n| Diffusion Rate | Slow spread | Fast spread | Speed of molecule movement |\n| Tissue Permeability | Many barriers | Few barriers | Ease of reaching target |\n| Delivery Time | Hours (patches) | Minutes (IV) | Net transport outcome |\n\n**Key takeaways:**\n- Fick's Law: flux ∝ concentration gradient\n- Barriers (gut wall, blood-brain barrier) are the rate-limiting steps\n- Route of administration bypasses or adds barriers\n- Therapeutic window = effective but not toxic concentration range\n\n✅ **Lesson P30 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
