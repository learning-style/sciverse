import { DialogNode } from '../../types';

/**
 * C12 — The Periodic Table
 * Big Idea 12: "How Do Hidden Rules Shape Big Patterns?"
 * Scenario: Exploring element patterns and electron shells
 * Target Misconception: "The periodic table is just a random list of elements"
 */
export const getC12Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Element Explorer! ⚛️\n\nLook at the periodic table displayed in the simulation. It has 118 known elements arranged in rows and columns.\n\nHere's the question: do you think this arrangement is random, or is there a pattern?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', highlightedGroup: null } },
        options: [
            { id: 'random', label: "Probably historical — discovered in that order.", nextNodeId: 'misconception_random', sentiment: 'negative' },
            { id: 'pattern', label: "There's a pattern — elements with similar properties are grouped.", nextNodeId: 'correct_pattern', sentiment: 'positive' },
            { id: 'atomic_number', label: "Ordered by atomic number (number of protons).", nextNodeId: 'partial_number', sentiment: 'neutral' }
        ]
    },

    'misconception_random': {
        id: 'misconception_random',
        speaker: 'AI',
        content: "Interestingly, Mendeleev (1869) DID arrange them partly by discovery order first — but then he noticed something amazing: when sorted by **atomic mass**, elements with similar properties kept appearing at regular intervals!\n\nHe was so confident in the pattern that he *left gaps* for elements he predicted would be discovered. And they were — years later! 🔮",
        options: [
            { id: 'predicted', label: "He predicted undiscovered elements?! That's wild!", nextNodeId: 'correct_pattern' }
        ]
    },

    'partial_number': {
        id: 'partial_number',
        speaker: 'AI',
        content: "You're right — the modern table is primarily ordered by **atomic number** (number of protons). But the deeper pattern is WHY elements in the same column have similar properties. That comes down to **electron shells**! ⚡\n\nElements in the same column have the same number of electrons in their outer shell, which determines how they react.",
        options: [
            { id: 'electron_shells', label: "Outer electrons determine chemical behavior?", nextNodeId: 'correct_pattern' }
        ]
    },

    'correct_pattern': {
        id: 'correct_pattern',
        speaker: 'AI',
        content: "Exactly! The **columns (groups) = similar outer electron counts = similar chemistry**.\n\nLook at the simulation: **Group 1 (left column)** = alkali metals — all react violently with water!\n**Group 18 (far right)** = noble gases — all completely unreactive.\n\nTry clicking different groups — notice how elements in the same column share properties!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore_groups', showGroups: true, highlightedGroup: 1 } },
        options: [
            { id: 'explored', label: "Group 1 elements all have 1 outer electron!", nextNodeId: 'electron_shells' }
        ]
    },

    'electron_shells': {
        id: 'electron_shells',
        speaker: 'AI',
        content: "Perfect! Electrons fill **shells** (energy levels) around the nucleus, like layers of an onion:\n\n🔵 Shell 1: up to 2 electrons\n🟢 Shell 2: up to 8 electrons\n🟡 Shell 3: up to 8 electrons (first)\n\nAtoms WANT to have **8 valence electrons** (full outer shell) — this is the **Octet Rule**! They bond, gain, or lose electrons to achieve this.\n\nOxygen needs 2 more electrons → that's why it bonds with 2 hydrogens to make water (H₂O)! 💧",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'electron_config', showElectronShells: true } },
        options: [
            { id: 'oxygen', label: "So water exists because oxygen needs 2 electrons!", nextNodeId: 'periods' }
        ]
    },

    'periods': {
        id: 'periods',
        speaker: 'AI',
        content: "Beautiful connection! And the **rows (periods)** tell you the number of electron shells:\n\nPeriod 1 = 1 shell (only H and He)\nPeriod 2 = 2 shells (Li through Ne)\nPeriod 3 = 3 shells (Na through Ar)\n\nThat's why sodium (Na, Period 3) behaves like a bigger version of lithium (Li, Period 2) — same group, one more shell!\n\nNow, can you find which element has 6 protons and needs 2 more electrons to fill its outer shell?",
        options: [
            { id: 'carbon', label: "Carbon! 6 protons, 4 outer electrons, needs 4 more (or shares).", nextNodeId: 'carbon_special' },
            { id: 'oxygen2', label: "Oxygen? 8 protons…", nextNodeId: 'periods_hint' }
        ]
    },

    'periods_hint': {
        id: 'periods_hint',
        speaker: 'AI',
        content: "Oxygen has 8 protons — count the protons to find atomic number! The element with 6 protons is even more special — it's the basis of all life on Earth! 🌿",
        options: [
            { id: 'carbon_now', label: "CARBON! 6 protons, forms the backbone of all organic molecules!", nextNodeId: 'carbon_special' }
        ]
    },

    'carbon_special': {
        id: 'carbon_special',
        speaker: 'AI',
        content: "YES! Carbon is the **miracle element**: it has 4 valence electrons and can form 4 bonds, including long chains and rings with itself. This creates the incredible complexity of organic chemistry — proteins, DNA, carbohydrates, fuels... all carbon chains! 🧬\n\nIn the sim, try building a small molecule using the element selector!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'molecule_builder', showMoleculeMode: true } },
        options: [
            { id: 'built_one', label: "I built a molecule! The bonds snap together by octet rule.", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Periodic Table Unlocked:**\n\n✅ Columns = same outer electron count = same chemical behavior\n✅ Rows = same number of electron shells\n✅ Atoms want 8 valence electrons (Octet Rule)\n✅ Carbon's 4-bond flexibility creates all organic chemistry\n✅ Mendeleev predicted elements before they were discovered using these patterns!\n\n**Universe connection:** Elements heavier than iron are forged only in supernova explosions! You literally contain stardust. ✨",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [
            { id: 'done', label: "The periodic table finally makes sense!", nextNodeId: 'done' }
        ]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Excellent element mastery! 🏆\n\nExplore **P12 (Gravity & Orbits)** to see how gravity kept these elements in star furnaces, or **B12 (Natural Selection)** to see how carbon-based life diversifies over time!",
        options: []
    }
});
