import { DialogNode } from '../../types';

/**
 * B27 — Digestive System Integration
 * Big Idea 27: "How Does Food Become Usable Energy?"
 */
export function getB27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `Your digestive system is a **9-meter pipeline** with specialized organs working in sequence. How do all these parts coordinate to turn a meal into energy your cells can use?\n\n**Visual legend:**\n- **Organ diagram**: The digestive tract from mouth to large intestine, with each organ highlighted.\n- **Three sliders**: Control **mechanical efficiency** (grinding/churning quality), **enzyme level** (chemical digestion strength), and **absorption rate** (intestinal surface function).\n- **Nutrient bar**: Shows how much usable energy is extracted at the current settings.\n\n**Key words:**\n- **Digestive tract**: The continuous tube from mouth → esophagus → stomach → small intestine → large intestine.\n- **Mechanical efficiency**: How well food is physically broken down (chewing, churning).\n- **Enzyme level**: The concentration and activity of digestive enzymes.\n- **Absorption**: The transfer of nutrients from the intestine into the bloodstream via **villi**.\n- **Integration**: How organs coordinate timing, pH, and signals to optimize the whole process.\n\nWhat do you think would happen to nutrient extraction if one part of this system underperformed?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'system_answer', label: 'The whole system would be less efficient — each stage depends on the one before it.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'backup_answer', label: 'Other organs would compensate automatically.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `There is some compensation — for example, the small intestine can partially make up for poor chewing by longer processing time. But the system is **sequential**: each organ depends on the output of the previous one. If you don't chew well, the stomach must work harder and longer. If the stomach doesn't acidify properly, protein digestion suffers downstream. The system is **integrated**, not independent. Poor performance at any stage reduces the efficiency of every stage that follows.`,
            options: [
                { id: 'cont', label: 'So it\'s a chain where each link matters.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! The digestive system integrates **three functional layers**:\n\n1. **Mechanical processing** (mouth, stomach) — Grinding and churning prepare food physically. Output: small particles with high surface area.\n2. **Chemical processing** (stomach, pancreas, small intestine) — Enzymes catalyze hydrolysis. Output: simple molecules (glucose, amino acids, fatty acids).\n3. **Absorption** (small intestine, large intestine) — Villi and microvilli provide **~250 m²** of absorptive surface. Nutrients cross into blood and lymph.\n\nThese three layers form a **pipeline** — mechanical feeds chemical, chemical feeds absorption. The efficiency of the whole system is limited by its **weakest link**.\n\nUse the sliders to test: what happens when you change one layer while keeping the others constant?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'organs', label: 'Walk me through each organ\'s role.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**The organ pipeline — integrated roles:**\n\n1. **Mouth**: Mechanical (teeth) + chemical (salivary amylase). Produces a **bolus**.\n2. **Esophagus**: Transport only — peristalsis carries the bolus to the stomach in ~8 seconds.\n3. **Stomach**: Mechanical (churning, 3 muscle layers) + chemical (HCl + pepsin). Produces **chyme**. Holds food 2-5 hours.\n4. **Liver & Gallbladder**: Produce and store **bile** for fat emulsification. No direct food contact.\n5. **Pancreas**: Secretes enzyme cocktail (amylase, trypsin, lipase) + bicarbonate to neutralize stomach acid.\n6. **Small intestine** (6 m): Maximum absorption zone. **Villi** increase surface area 600×. Brush border enzymes complete final breakdown.\n7. **Large intestine** (1.5 m): Water and electrolyte recovery. Gut bacteria ferment remaining fiber, producing vitamins (K, B12).\n\n**Coordination signals**: **Hormones** (gastrin, secretin, CCK) tell each organ when to activate based on what's arriving. It's a **feedback-controlled assembly line**.\n\n**Try it:** Set all three sliders high to see maximum nutrient extraction. Then drop one at a time to find the bottleneck.\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Let\'s test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** If you set mechanical efficiency high but enzyme level very low, what would you expect?`,
            options: [
                { id: 'right', label: 'Food would be well-ground but poorly broken down chemically — nutrient extraction drops.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'High mechanical efficiency would compensate for low enzymes — nutrient output stays the same.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Not quite. Mechanical digestion creates **surface area**, but it can't break chemical bonds. Without sufficient enzymes, starch stays as starch, proteins stay as proteins — they can't cross the intestinal wall. It's like crushing a rock into sand but having no solvent to dissolve the minerals. Both stages are **necessary** — you need physical preparation AND chemical breakdown to extract nutrients. The system's output is limited by whichever stage is weakest.`,
            options: [
                { id: 'retry', label: 'So both mechanical and chemical stages are essential — one can\'t replace the other.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! The digestive system is a **serial pipeline** — the output of each stage is the input of the next. High mechanical efficiency gives enzymes more surface to work on, but without the enzymes themselves, that surface advantage is wasted. Similarly, even the best enzymes can't work efficiently on large, unground food chunks.\n\nThis is why conditions like **enzyme deficiency** (e.g., lactose intolerance — missing **lactase**) cause problems even when everything else works perfectly. One missing link affects the whole chain.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Let\'s see the full picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** The digestive system is a masterpiece of **biological integration**.\n\n- **Sequential processing**: Each organ builds on the output of the previous one\n- **Three functional layers**: Mechanical → Chemical → Absorption operate as a coordinated pipeline\n- **Hormonal coordination**: Gastrin, secretin, and CCK synchronize organ activation\n- **Bottleneck principle**: Overall efficiency is limited by the weakest stage\n- **Massive surface area**: 250 m² of intestinal surface ensures nothing is wasted\n\nFrom a single bite to cellular fuel, the journey takes **24-72 hours** and involves dozens of organs, enzymes, and control signals working in concert. This is biological engineering at its finest.`,
            options: [
                { id: 'done', label: 'Complete B27', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 27 Complete — How Does Food Become Usable Energy?**\n\n- **Physics (P27):** Mechanical Digestion — forces grind, churn, and transport food to maximize surface area\n- **Chemistry (C27):** Enzyme Chemistry — amylase, protease, and lipase catalyze hydrolysis at optimal temperature and pH\n- **Biology (B27):** Digestive Integration — organs coordinate mechanical, chemical, and absorptive stages into one pipeline\n\n**Summary Table:**\n| Layer | Key Organs | Function | Output |\n| --- | --- | --- | --- |\n| Mechanical | Mouth, stomach | Grind, churn, transport | Small particles |\n| Chemical | Stomach, pancreas, intestine | Enzyme-catalyzed hydrolysis | Glucose, amino acids, fatty acids |\n| Absorption | Small intestine, large intestine | Nutrient transfer to blood | Cellular fuel |\n\n**Key takeaways:**\n- Digestion is a **serial pipeline** — each stage feeds the next\n- **Hormones** coordinate organ timing and activation\n- System efficiency = weakest link\n- **250 m²** of absorptive surface maximizes nutrient capture\n- Physics, chemistry, and biology are inseparable in this system\n\n✅ **Lesson B27 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
