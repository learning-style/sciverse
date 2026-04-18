import { DialogNode } from '../../types';

/**
 * C27 — Enzymes & Chemical Breakdown
 * Big Idea 27: "How Does Food Become Usable Energy?"
 */
export function getC27Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `After your teeth grind food into tiny pieces, how does your body actually break those molecules apart?\n\n**Visual legend:**\n- **Lock-and-key shape**: An **enzyme** binding to its **substrate** (the molecule it breaks down).\n- **Temperature gauge**: Enzyme activity changes with temperature — too hot or too cold and they stop working.\n- **pH scale bar**: Enzymes need the right acidity level. Stomach enzymes love acid; intestinal enzymes prefer neutral.\n\n**Key words:**\n- **Enzyme**: A biological **catalyst** — a protein that speeds up a specific chemical reaction without being consumed.\n- **Substrate**: The molecule an enzyme acts on. Each enzyme fits its substrate like a key fits a lock.\n- **Activation energy**: The energy barrier a reaction must overcome. Enzymes **lower** this barrier dramatically.\n- **Denaturation**: When heat or extreme pH unfolds an enzyme's 3D shape, destroying its function.\n- **Hydrolysis**: Breaking a bond by adding **water** — the main reaction type in digestion.\n\nWhy can't food molecules just break apart on their own inside your body?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'chem_answer', label: 'The bonds are too stable — enzymes lower the activation energy to break them.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'acid_answer', label: 'Stomach acid does all the work by dissolving everything.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Stomach acid (HCl, pH ~2) is important — it **denatures proteins** (unfolds them) and kills bacteria. But acid alone can't efficiently break the specific bonds in carbohydrates, proteins, and fats. That requires **enzymes** — specialized protein catalysts that target specific bonds. Without enzymes, the chemical reactions of digestion would take **weeks** instead of hours. Acid creates the right environment; enzymes do the precision cutting.`,
            options: [
                { id: 'cont', label: 'So enzymes are the real molecular scissors.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `Exactly! Chemical digestion relies on **three classes of enzymes**:\n\n1. **Amylase** (carbohydrates) — Starts in the mouth! Salivary amylase breaks **starch** into **maltose** (a sugar). Pancreatic amylase continues in the small intestine.\n2. **Protease** (proteins) — **Pepsin** works in the acidic stomach (pH 2). **Trypsin** and **chymotrypsin** work in the alkaline intestine (pH 8). Each cuts proteins at different amino acid positions.\n3. **Lipase** (fats) — **Pancreatic lipase** breaks triglycerides into fatty acids and glycerol. Bile salts **emulsify** fat first (like dish soap on grease), creating tiny droplets for lipase to attack.\n\nThese three enzyme families create a **chemical disassembly line** — each specialized for one macronutrient type, each requiring specific **temperature** and **pH** conditions.\n\nLet's see how they work step by step.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me the chemical stages of digestion.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**Chemical digestion — step by step:**\n\n1. **Mouth (pH 7)**: Salivary **amylase** begins breaking starch → maltose. Lingual **lipase** starts on fats.\n2. **Stomach (pH 1.5-3.5)**: HCl denatures proteins. **Pepsin** (activated from pepsinogen by acid) cleaves proteins into shorter **peptides**.\n3. **Duodenum (pH 7-8)**: The pancreas releases a cocktail: **trypsin** (proteins), **pancreatic amylase** (starch), **pancreatic lipase** (fats). **Bile** from the liver emulsifies fats.\n4. **Small intestine wall**: **Brush border enzymes** (maltase, lactase, peptidases) perform the final cuts — disaccharides → monosaccharides, dipeptides → amino acids.\n5. **Absorption**: The end products — **glucose**, **amino acids**, **fatty acids** — are small enough to cross the intestinal wall into the blood.\n\n**Try it:** Adjust the temperature and pH sliders. Watch how enzyme activity peaks at the optimal point and drops off sharply outside it!\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Yes, test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** What happens to an enzyme if the temperature rises well above 40°C?`,
            options: [
                { id: 'right', label: 'It denatures — its 3D shape unfolds and it can no longer bind its substrate.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'It works even faster because heat always speeds up reactions.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `Heat does speed up most chemical reactions — that's the **Arrhenius principle**. But enzymes are proteins with a precise 3D shape. Above ~40-50°C, thermal energy **breaks the weak bonds** (hydrogen bonds, hydrophobic interactions) that hold the enzyme's shape. The active site deforms, the substrate can't bind, and the reaction **stops**. This is **denaturation** — and for most enzymes, it's irreversible. That's why fever above 41°C is dangerous: critical enzymes start to fail.`,
            options: [
                { id: 'retry', label: 'So there\'s an optimal temperature — not too hot, not too cold.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct! Every enzyme has an **optimal temperature** (usually 37°C for human enzymes) and an **optimal pH**. The activity curve looks like a bell shape — rising as temperature increases molecular collisions, then dropping sharply as denaturation destroys the enzyme's structure.\n\nThis is why your body maintains temperature so precisely (**homeostasis**). Even a few degrees of change can significantly alter enzyme efficiency across thousands of reactions happening simultaneously.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Let\'s connect it all together.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** Chemical digestion is a precisely orchestrated sequence of **enzyme-catalyzed hydrolysis reactions**.\n\n- Each enzyme is **specific** to one type of bond and one set of conditions\n- **Temperature** and **pH** control enzyme shape and therefore function\n- The digestive tract creates **different chemical environments** (acidic stomach, alkaline intestine) to activate different enzyme sets in sequence\n- The end products — glucose, amino acids, fatty acids — are the universal fuel molecules that cells can actually use\n\nChemistry turns mechanical crumbs into molecular building blocks. Without enzymes, life's chemistry would be impossibly slow.`,
            options: [
                { id: 'done', label: 'Complete C27', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 27 Complete — How Does Food Become Usable Energy?**\n\n- **Physics (P27):** Mechanical Digestion — forces grind, churn, and transport food to maximize surface area\n- **Chemistry (C27):** Enzyme Chemistry — amylase, protease, and lipase catalyze hydrolysis at optimal temperature and pH\n- **Biology (B27):** Digestive System — organs integrate mechanical and chemical stages into a coordinated nutrient pipeline\n\n**Summary Table:**\n| Enzyme Class | Target | Location | Optimal pH | End Product |\n| --- | --- | --- | --- | --- |\n| Amylase | Starch | Mouth, intestine | 7 | Glucose |\n| Protease | Protein | Stomach, intestine | 2-8 | Amino acids |\n| Lipase | Fat | Intestine | 7-8 | Fatty acids |\n\n**Key takeaways:**\n- Enzymes are biological **catalysts** that lower activation energy\n- Each enzyme has an optimal **temperature** (~37°C) and **pH**\n- **Denaturation** destroys enzyme function irreversibly\n- The digestive tract creates sequential chemical environments\n- End products (glucose, amino acids, fatty acids) are the universal fuel\n\n✅ **Lesson C27 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
