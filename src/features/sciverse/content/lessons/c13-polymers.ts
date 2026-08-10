import { DialogNode } from '../../types';

/**
 * C13 — Polymers & Plastics
 * Big Idea 13: "How Does Structure Shape Function?"
 * Scenario: Building a polymer chain from monomers
 * Target Misconception: "Plastic is completely different from natural materials — there's no natural equivalent"
 */
export const getC13Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Polymer Lab! 🧵\n\nIn the simulation you can see small circle units (monomers) waiting to link together. The word 'polymer' means 'many parts.'\n\nBefore linking anything — can you think of a natural polymer you encounter every day?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', monomerCount: 5, chainLength: 0 } },
        options: [
            { id: 'no_natural', label: "I don't think natural polymers exist — plastic is man-made.", nextNodeId: 'misconception_synthetic', sentiment: 'negative' },
            { id: 'wood', label: "Wood maybe? Or cotton?", nextNodeId: 'correct_natural', sentiment: 'positive' },
            { id: 'food', label: "Food? Like starch or proteins?", nextNodeId: 'correct_natural', sentiment: 'positive' }
        ]
    },

    'misconception_synthetic': {
        id: 'misconception_synthetic',
        speaker: 'AI',
        content: "Surprise! Natural polymers are everywhere! 🌿\n\n- **Cellulose** (wood, cotton, paper) = glucose monomers linked together\n- **Starch** (potatoes, bread) = glucose chains\n- **Proteins** = amino acid chains\n- **DNA** = nucleotide chains\n- **Rubber** = isoprene chains (from rubber trees!)\n\nSynthetic plastics are just humans *copying* what nature does with different monomers!",
        options: [
            { id: 'mindblown', label: "Even my hair (keratin) is a polymer!", nextNodeId: 'correct_natural' }
        ]
    },

    'correct_natural': {
        id: 'correct_natural',
        speaker: 'AI',
        content: "Exactly! Wood (cellulose), cotton, wool, DNA, proteins — all natural polymers made of repeating monomer units. 🌿\n\nNow let's **build your own polymer chain** in the sim. Press the **+ Monomer** button to link ethylene (CH₂=CH₂) units together — this forms polyethylene, the most common plastic!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'building', showAddButton: true, monomerType: 'ethylene' } },
        options: [
            { id: 'built_short', label: "I linked 5 monomers — it's a short chain.", nextNodeId: 'chain_properties' },
            { id: 'built_long', label: "I kept adding — it becomes a long flexible chain!", nextNodeId: 'chain_properties' }
        ]
    },

    'chain_properties': {
        id: 'chain_properties',
        speaker: 'AI',
        content: "Great! Notice how the polymer's properties depend on chain **length** and **structure**:\n\n📏 **Short chains** → runny liquid (like oil or wax)\n🧴 **Medium chains** → thick gel\n🧱 **Very long chains** → solid plastic\n\nAlso, the chains can be **straight** (strong, rigid) or **branched** (flexible, softer).\n\nWhich do you think is stronger — a straight chain or a branched one?",
        options: [
            { id: 'straight', label: "Straight chains — they pack tightly together.", nextNodeId: 'chain_correct' },
            { id: 'branched', label: "Branched — more connections = more strength.", nextNodeId: 'chain_hint' }
        ]
    },

    'chain_hint': {
        id: 'chain_hint',
        speaker: 'AI',
        content: "Branches actually *prevent* the chains from packing tightly — like trying to stack a pile of tree branches vs. pencils. Pencils (straight) stack perfectly in dense bundles, making a stronger material.",
        options: [
            { id: 'pencils', label: "Straight chains pack tighter → denser and stronger!", nextNodeId: 'chain_correct' }
        ]
    },

    'chain_correct': {
        id: 'chain_correct',
        speaker: 'AI',
        content: "Yes! **High-Density Polyethylene (HDPE)** = straight chains, tightly packed → rigid, strong. Used for milk jugs, cutting boards.\n\n**Low-Density Polyethylene (LDPE)** = branched chains, loosely packed → flexible, soft. Used for plastic bags, wrap.\n\nSame monomer (ethylene), different structure → completely different materials! Now try branching your chain in the sim!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'branching', showBranchButton: true } },
        options: [
            { id: 'branched', label: "I branched it — the chain looks like a tree now.", nextNodeId: 'cross_linking' }
        ]
    },

    'cross_linking': {
        id: 'cross_linking',
        speaker: 'AI',
        content: "There's one more trick: **cross-linking** — connecting chains to EACH OTHER sideways. This creates a 3D network.\n\n**Rubber vulcanization** (adding sulfur to rubber) creates cross-links that make rubber stronger and less sticky. Without cross-links, natural rubber melts in summer and cracks in winter! 🌡️\n\nThis is how engineers design materials for specific uses — same atoms, different architecture!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cross_linking', showCrossLinks: true } },
        options: [
            { id: 'seen_it', label: "The cross-linked chain is much more rigid!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Polymer Science Mastered:**\n\n✅ Polymers = long chains of repeating monomer units\n✅ Natural polymers: cellulose, starch, proteins, DNA, rubber\n✅ Synthetic polymers copy nature using different monomers\n✅ Chain length: short = liquid; medium = gel; long = solid\n✅ Straight chains pack tightly → strong (HDPE)\n✅ Branched chains are more flexible (LDPE)\n✅ Cross-linking creates 3D networks → tougher materials\n\n**Industry:** Polymers form the basis of textiles, food packaging, electronics — everything soft!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "Polymers make sense now!", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Material master! 🏆\n\nExplore **P13 (Gears & Pulleys)** to see machines made from these materials, or **B13 (Photosynthesis)** to learn how plants create organic polymer (cellulose) from sunlight!",
        options: []
    }
});
