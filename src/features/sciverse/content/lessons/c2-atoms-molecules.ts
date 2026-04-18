import { DialogNode } from '../../types';

/**
 * C2 — Atoms & Molecules: Nature's LEGO
 * Big Idea 2: "What Is Everything Made Of?"
 * Scenario: "Build-a-Molecule Workshop"
 * Target Misconception: "Atoms and molecules are the same thing"
 */
export const getC2Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Molecule Workshop! 🧱\n\nSee these colored circles? They are **atoms** — the smallest building blocks of matter.\n\n- ⚪ **Hydrogen** (H) — tiny and light\n- 🔴 **Oxygen** (O) — medium\n- ⚫ **Carbon** (C) — medium\n- 🔵 **Nitrogen** (N) — medium\n\nThink of them as LEGO bricks!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', atoms: ['H', 'O', 'C', 'N'], builtMolecule: null } },
        options: [
            { id: 'lego', label: "So molecules are like LEGO builds?", nextNodeId: 'lego_yes' },
            { id: 'four', label: "Is everything made of just these four?", nextNodeId: 'many_atoms' }
        ]
    },

    'lego_yes': {
        id: 'lego_yes',
        speaker: 'AI',
        content: "Exactly! 🎯 A single LEGO brick isn't very useful. But connect them and you can build ANYTHING.\n\nA single atom is just a building block. Connect atoms together and you get a **molecule** — a totally new substance with new properties!\n\nReady to build your first molecule?",
        options: [
            { id: 'build', label: "Let's build!", nextNodeId: 'build_water' }
        ]
    },

    'many_atoms': {
        id: 'many_atoms',
        speaker: 'AI',
        content: "Not just these! There are over **118 types of atoms** (we call them elements). But here's the amazing part: SO much of your world — water, air, food, your own body — is made from just these four: **Hydrogen, Oxygen, Carbon, and Nitrogen**.\n\nLet's see what we can build with them!",
        options: [
            { id: 'build', label: "Let's build!", nextNodeId: 'build_water' }
        ]
    },

    'build_water': {
        id: 'build_water',
        speaker: 'AI',
        content: "🔨 **Challenge: Build a water molecule!**\n\nWater's chemical formula is **H₂O**.\n\nThat means: 2 Hydrogen atoms + 1 Oxygen atom.\n\nPick the right atoms!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'build_water', buildMode: true, targetMolecule: 'H2O' } },
        options: [
            { id: 'wrong_oo', label: "Two Oxygens?", nextNodeId: 'water_hint' },
            { id: 'correct_h2o', label: "Two Hydrogens + One Oxygen!", nextNodeId: 'water_success', simAction: { type: 'SET_VISUAL', payload: { builtMolecule: 'H2O' } } }
        ]
    },

    'water_hint': {
        id: 'water_hint',
        speaker: 'AI',
        content: "Not quite! H₂O means:\n- **H₂** = two Hydrogen atoms\n- **O** = one Oxygen atom\n\nThe subscript number tells you how many of that atom. No number means just one!\n\nTry again!",
        options: [
            { id: 'retry', label: "Two Hydrogens + One Oxygen!", nextNodeId: 'water_success', simAction: { type: 'SET_VISUAL', payload: { builtMolecule: 'H2O' } } }
        ]
    },

    'water_success': {
        id: 'water_success',
        speaker: 'AI',
        content: "🎉 **You built WATER!**\n\n**Water | H₂O**\n- Liquid at room temperature\n- Essential for ALL life\n- Made of just 3 tiny atoms!\n\nTwo hydrogens bonded to one oxygen. The SAME atoms in a different arrangement would make something completely different!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'water_built', builtMolecule: 'H2O', showMoleculeCard: true } },
        options: [
            { id: 'more', label: "What else can we build?", nextNodeId: 'build_o2' }
        ]
    },

    'build_o2': {
        id: 'build_o2',
        speaker: 'AI',
        content: "Now build what you **breathe IN** — Oxygen gas!\n\nIts formula is **O₂**. What atoms do you need?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'build_o2', buildMode: true, targetMolecule: 'O2' } },
        options: [
            { id: 'two_o', label: "Two Oxygen atoms!", nextNodeId: 'o2_success', simAction: { type: 'SET_VISUAL', payload: { builtMolecule: 'O2' } } },
            { id: 'one_o', label: "Just one Oxygen?", nextNodeId: 'o2_hint' }
        ]
    },

    'o2_hint': {
        id: 'o2_hint',
        speaker: 'AI',
        content: "A single oxygen atom (O) is actually unstable — it desperately wants a partner! O₂ means two oxygen atoms bonded together. That's the molecule your lungs need!",
        options: [
            { id: 'retry', label: "Two Oxygens bonded together!", nextNodeId: 'o2_success', simAction: { type: 'SET_VISUAL', payload: { builtMolecule: 'O2' } } }
        ]
    },

    'o2_success': {
        id: 'o2_success',
        speaker: 'AI',
        content: "✅ **Oxygen gas | O₂** — this is what your lungs pull from the air!\n\nNow build what you **breathe OUT** — **Carbon Dioxide**, formula **CO₂**.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'build_co2', builtMolecule: 'O2', showMoleculeCard: true } },
        options: [
            { id: 'co2', label: "One Carbon + Two Oxygens!", nextNodeId: 'co2_success', simAction: { type: 'SET_VISUAL', payload: { builtMolecule: 'CO2' } } }
        ]
    },

    'co2_success': {
        id: 'co2_success',
        speaker: 'AI',
        content: "🎉 **Carbon Dioxide | CO₂**\n\nOne carbon + two oxygens. This is what your body discards when it burns fuel.\n\nNotice: O₂ and CO₂ both contain oxygen atoms, but they're **completely different molecules** with completely different jobs!\n\n- O₂: Your cells need it to make energy\n- CO₂: Your cells' waste product",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'co2_built', builtMolecule: 'CO2', showMoleculeCard: true, showComparison: true } },
        options: [
            { id: 'wow', label: "Same atoms, different arrangement = different stuff!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎯 **That's the secret of Chemistry!**\n\nAtoms are the alphabet. Molecules are the words. Different combinations of the same \"letters\" spell completely different \"words\" with different meanings!\n\nThe arrangement isn't random — atoms prefer certain partners. Chemistry is the study of **who bonds with whom and why**.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'crosslink', label: "Atoms are the alphabet of matter!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** In Physics (P2), you saw particles acting differently based on energy. Now you see they're not all the same KIND of particle — there are different atoms!\n\nIn Biology (B2), you'll see how living things build HUGE molecules from these tiny bricks, and organize them into **cells** — the smallest unit of life.\n\n✅ **Lesson C2 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

