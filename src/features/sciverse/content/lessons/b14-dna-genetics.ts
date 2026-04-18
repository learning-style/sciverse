import { DialogNode } from '../../types';

/**
 * B14 — DNA & Genetics
 * Big Idea 14: "How Is Information Coded and Transmitted?"
 * Scenario: DNA double helix, base pairing, and protein synthesis
 * Target Misconception: "Your genes are your destiny — DNA fully determines who you are"
 */
export const getB14Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Genetics Lab! 🧬\n\nThe double helix spinning in the simulation is DNA — your body's instruction manual. It's stored in every single cell.\n\nHere's a big question: if identical twins have the same DNA, does that mean they'll be identical in every way?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', showHelix: true, rotationSpeed: 1 } },
        options: [
            { id: 'yes_identical', label: "Yes — same DNA means same person, same health, same traits.", nextNodeId: 'misconception_determinism', sentiment: 'negative' },
            { id: 'no_different', label: "No — environment and experiences shape who they become too.", nextNodeId: 'correct_epigenetics', sentiment: 'positive' },
            { id: 'mostly', label: "Mostly the same, but not fully — environment matters some.", nextNodeId: 'correct_epigenetics', sentiment: 'neutral' }
        ]
    },

    'misconception_determinism': {
        id: 'misconception_determinism',
        speaker: 'AI',
        content: "This is the nature vs. nurture debate — and science says **both matter**! 🔬\n\nIdentical twins start with the same DNA but:\n- Can develop different diseases\n- Have different fingerprints (shaped by position in the womb)\n- Can have dramatically different personalities\n\nDNA provides the *possibilities* — environment and experience determine which possibilities become reality. This is studied in **epigenetics**!",
        options: [
            { id: 'epigenetics', label: "So gene expression can be changed by environment?", nextNodeId: 'correct_epigenetics' }
        ]
    },

    'correct_epigenetics': {
        id: 'correct_epigenetics',
        speaker: 'AI',
        content: "Exactly! DNA = blueprint, but gene *expression* = which parts of the blueprint actually get used. Now let's understand the code itself.\n\nDNA uses 4 'letters' called **bases**:\n- **A** (Adenine) — always pairs with T\n- **T** (Thymine) — always pairs with A\n- **G** (Guanine) — always pairs with C\n- **C** (Cytosine) — always pairs with G\n\nThis is called **complementary base pairing**. Try unzipping the helix in the sim!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'base_pairs', showBasePairs: true, showUnzipButton: true } },
        options: [
            { id: 'unzipped', label: "I unzipped it — each strand revealed its complement!", nextNodeId: 'replication' }
        ]
    },

    'replication': {
        id: 'replication',
        speaker: 'AI',
        content: "That's exactly how DNA copies itself! 🔄\n\nWhen a cell divides, the double helix unzips down the middle. Each half becomes a template — new complementary bases attach to each strand.\n\nResult: 2 perfect copies from 1 original. If **A-T** was on one strand, the new strand gets **T** where the original had **A** — because A-T is the only pairing!\n\nCan you predict: if one DNA strand reads A-G-C-T, what does the complementary strand read?",
        options: [
            { id: 'correct_complement', label: "T-C-G-A — A pairs with T, G pairs with C!", nextNodeId: 'protein_intro' },
            { id: 'wrong_complement', label: "A-G-C-T — same as the original.", nextNodeId: 'complement_hint' }
        ]
    },

    'complement_hint': {
        id: 'complement_hint',
        speaker: 'AI',
        content: "Remember the pairing rules: A↔T and G↔C.\n\nSo A-G-C-T becomes:\nA→T, G→C, C→G, T→A\n\nAnswer: **T-C-G-A** 🎯",
        options: [
            { id: 'got_it', label: "Got it! Each base switches to its complement partner.", nextNodeId: 'protein_intro' }
        ]
    },

    'protein_intro': {
        id: 'protein_intro',
        speaker: 'AI',
        content: "Great! Now, DNA doesn't directly *build* things — it stores the instructions for making **proteins**.\n\nProteins are made of amino acid chains. DNA encodes amino acids in **codons** = groups of 3 bases.\n\nFor example: **ATG** = start building; **GCT** = 'Alanine' amino acid; **TAA** = stop.\n\nThere are 64 possible codons but only 20 amino acids — it's a robust code with backups! 🛡️\n\nDecode the sequence **ATG-GCT-TAA** in the sim!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'decode', showDecoder: true, sequence: 'ATG-GCT-TAA' } },
        options: [
            { id: 'decoded', label: "Start → Alanine → Stop — I built a tiny protein!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **DNA & Genetics Mastered:**\n\n✅ DNA = A, T, G, C bases; A-T pairs, G-C pairs\n✅ Complementary pairing enables perfect replication\n✅ Codons (3 bases) encode amino acids → proteins\n✅ DNA ≠ destiny: gene expression depends on environment (epigenetics)\n✅ Every cell has 3 billion base pairs of DNA — if uncoiled, it's ~2 meters long!\n\n**Information scale:** Human genome = ~3 billion base pairs = ~750 MB of data. 💾",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "DNA decoded! What an incredible code system.", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "🔗 **Big Idea 14 Complete — How Is Information Coded and Transmitted?**\n\n- Physics (P14): Waves & Signals — analog and digital signals carry information across distances\n- Chemistry (C14): Chemical Bonding Code — electron rules determine how atoms connect into molecules\n- Biology (B14): DNA & Genetics — life's 4-letter code (A, T, G, C) stores and transmits hereditary information\n\nIn all three: **information flows through codes — whether it's radio waves, electron bonds, or DNA base pairs!** 📡🔗🧬\n\n✅ **Lesson B14 Complete!**",
        options: []
    }
});
