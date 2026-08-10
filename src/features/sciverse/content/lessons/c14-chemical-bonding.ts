import { DialogNode } from '../../types';

/**
 * C14 — Chemical Bonding
 * Big Idea 14: "How Is Information Coded and Transmitted?"
 * Scenario: Atoms forming covalent and ionic bonds
 * Target Misconception: "Atoms 'want' to bond — they have preferences/desires"
 */
export const getC14Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Bonding Lab! ⚛️\n\nTwo atoms are drifting toward each other in the simulation — a sodium (Na) and a chlorine (Cl). These will form table salt.\n\nWhy do you think these atoms bond together?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', atom1: 'Na', atom2: 'Cl', distance: 300 } },
        options: [
            { id: 'want_to', label: "They 'want' to bond — atoms have a natural desire to connect.", nextNodeId: 'misconception_want', sentiment: 'negative' },
            { id: 'energy', label: "They release energy by bonding — lower energy state is more stable.", nextNodeId: 'correct_energy', sentiment: 'positive' },
            { id: 'electrons', label: "They need electrons to complete their outer shells.", nextNodeId: 'partial_electrons', sentiment: 'neutral' }
        ]
    },

    'misconception_want': {
        id: 'misconception_want',
        speaker: 'AI',
        content: "Atoms don't have desires! 😄 They're just electrons and protons following physical laws.\n\nBonding happens because a bonded state has **lower total energy** than two separate atoms. Systems always tend toward lower energy states naturally — it's thermodynamics, not intention!\n\nThink of a ball rolling downhill — it doesn't 'want' to go down, it just goes where energy is lower.",
        options: [
            { id: 'got_it', label: "Energy minimization causes bonding — not chemistry 'wanting' to happen!", nextNodeId: 'correct_energy' }
        ]
    },

    'partial_electrons': {
        id: 'partial_electrons',
        speaker: 'AI',
        content: "You're onto something! The electron-sharing explanation is partly right — but the deeper reason is that sharing/transferring electrons creates a state of **lower total energy**. The Octet Rule describes *how* electrons get arranged (8 valence electrons), but *why* bonds form is energy minimization. 🔋",
        options: [
            { id: 'energy_is_why', label: "Electrons rearrange because it lowers the atom's energy!", nextNodeId: 'correct_energy' }
        ]
    },

    'correct_energy': {
        id: 'correct_energy',
        speaker: 'AI',
        content: "Exactly! Lower energy = more stable. Now let's look at the two main bond types:\n\n**Ionic bonds:** One atom *transfers* electrons completely to another (one becomes +, other becomes -). They attract like magnets. Example: Na → Cl⁻ in table salt.\n\n**Covalent bonds:** Atoms *share* electrons, creating a shared electron cloud. Both benefit without full transfer. Example: two oxygen atoms sharing = O₂.\n\nWatch the electron transfer animation in the sim — Na gives its 1 outer electron to Cl!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'ionic_transfer', showElectronTransfer: true } },
        options: [
            { id: 'saw_transfer', label: "Na lost an electron, became Na+. Cl gained one, became Cl-. Now they attract!", nextNodeId: 'covalent' }
        ]
    },

    'covalent': {
        id: 'covalent',
        speaker: 'AI',
        content: "Perfect! Na⁺ and Cl⁻ attract each other because opposite charges attract — that's the ionic bond.\n\nNow switch to the **Water molecule** builder. Oxygen (O) + 2 Hydrogens (H). Should these atoms transfer or share electrons?\n\nHint: oxygen wants 2 more, each hydrogen wants 1 more — they can share!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'covalent_builder', molecule: 'water', showBondType: 'covalent' } },
        options: [
            { id: 'share', label: "They share — each O-H pair shares 2 electrons.", nextNodeId: 'water_molecule' },
            { id: 'transfer2', label: "They transfer — oxygen takes electrons from hydrogen.", nextNodeId: 'water_hint' }
        ]
    },

    'water_hint': {
        id: 'water_hint',
        speaker: 'AI',
        content: "Oxygen is electronegative (loves electrons) but doesn't take them completely from hydrogen — it just pulls them closer. This is a *polar covalent* bond: the shared electrons spend more time near oxygen than hydrogen. 🌊\n\nCompare that with **nonpolar covalent** bonds (like H-H), where electrons are shared more equally.",
        options: [
            { id: 'polar', label: "Got it: covalent has two types — nonpolar (equal sharing) and polar (unequal sharing).", nextNodeId: 'water_molecule' }
        ]
    },

    'water_molecule': {
        id: 'water_molecule',
        speaker: 'AI',
        content: "Great insight! Water's **polar covalent bonds** give it amazing properties:\n- Slightly negative O end and slightly positive H ends\n- Water molecules stick to each other (hydrogen bonds) → surface tension, high boiling point\n- Water can dissolve ionic salts (charged ends attract ions)\n\nThis is why water is called the 'universal solvent,' and why life as we know it depends on it! 💧\n\nTry building NaCl and H₂O in the molecule builder — compare bond types!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'compare_bonds', showBothMolecules: true } },
        options: [
            { id: 'compared', label: "NaCl has separate ions; H₂O shares electrons with a pull toward O.", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Chemical Bonding Mastered:**\n\n✅ Bonds form because lower energy = more stable — no 'wanting' involved\n✅ Ionic bonds: full electron transfer → oppositely charged ions attract\n✅ Covalent bonds: shared electron cloud\n✅ **Nonpolar covalent**: roughly equal sharing (like H-H)\n✅ **Polar covalent**: unequal sharing (like water O-H)\n✅ Water's polarity = why it dissolves salts and supports life\n✅ Bond type determines material properties completely\n\n**Information angle:** DNA encodes genetic information using hydrogen bonds between base pairs — chemistry stores biological code! 🧬",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "Bonding unlocked!", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Chemistry maestro! ⚛️\n\nConnect to **B14 (DNA)** to see how hydrogen bonds store the genetic code, or **P14 (Waves & Signals)** to compare physical vs chemical information encoding!",
        options: []
    }
});
