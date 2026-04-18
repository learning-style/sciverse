import { DialogNode } from '../../types';

/**
 * B12 — Natural Selection
 * Big Idea 12: "How Do Hidden Rules Shape Big Patterns?"
 * Scenario: Peppered moths changing across generations
 * Target Misconception: "Evolution means animals choose to change / evolution is directional progress"
 */
export const getB12Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Evolution Lab! 🦋\n\nIn the simulation you see a population of moths on tree bark. Some are light-colored, some are dark. Birds are hunting them.\n\nWhy do you think there are BOTH light and dark moths in this population?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', environment: 'light', lightMoths: 80, darkMoths: 20, generation: 0 } },
        options: [
            { id: 'accident', label: "Random genetic accidents (mutations).", nextNodeId: 'correct_variation', sentiment: 'positive' },
            { id: 'choice', label: "Dark moths chose to become dark to hide better.", nextNodeId: 'misconception_choice', sentiment: 'negative' },
            { id: 'mix', label: "Some are male, some female — different colors.", nextNodeId: 'hint_variation', sentiment: 'neutral' }
        ]
    },

    'misconception_choice': {
        id: 'misconception_choice',
        speaker: 'AI',
        content: "This is the #1 evolution misconception! 🐛\n\nOrganisms **do not choose** to evolve. Mutations happen randomly during DNA copying — no moth decided to turn dark.\n\nEvolution is the *filter*, not the *inventor*. Variation exists randomly → the environment selects which variants survive → survivors pass genes to offspring.",
        options: [
            { id: 'got_it', label: "So random mutation + selection pressure = evolution!", nextNodeId: 'correct_variation' }
        ]
    },

    'hint_variation': {
        id: 'hint_variation',
        speaker: 'AI',
        content: "Good thinking, but color variation isn't about sex differences here! It's because every individual is genetically unique — random mutations during reproduction create slightly different versions of genes, including pigmentation genes. 🧬",
        options: [
            { id: 'understood', label: "Genetic mutations cause the color variation!", nextNodeId: 'correct_variation' }
        ]
    },

    'correct_variation': {
        id: 'correct_variation',
        speaker: 'AI',
        content: "Exactly right! Natural selection has three requirements:\n\n1️⃣ **Variation** — individuals differ (light vs dark moths)\n2️⃣ **Heritability** — offspring resemble parents\n3️⃣ **Selection pressure** — environment favors some variants\n\nRight now the trees are light-colored. Watch what happens when birds hunt — which moths survive to reproduce?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'selection', showBirds: true, activePredation: true } },
        options: [
            { id: 'light_survive', label: "Light moths survive — they blend into light bark.", nextNodeId: 'first_selection' }
        ]
    },

    'first_selection': {
        id: 'first_selection',
        speaker: 'AI',
        content: "Perfect! After a few generations, notice the ratio changed — more light moths, fewer dark ones. Now press **Next Generation** several times and watch the trend. 🔄",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'generations', showGenerationControl: true } },
        options: [
            { id: 'saw_change', label: "Light moths dominate after 5+ generations!", nextNodeId: 'environment_change' }
        ]
    },

    'environment_change': {
        id: 'environment_change',
        speaker: 'AI',
        content: "Now here's where it gets really interesting — this actually happened in England during the Industrial Revolution! 🏭\n\nSoot from factories darkened tree trunks. Suddenly, the light moths stood out against dark bark.\n\nPredict: what happened to the moth population?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'predict_environment', environment: 'light' } },
        options: [
            { id: 'dark_now', label: "Dark moths survived better on dark bark → population became mostly dark.", nextNodeId: 'industrial_correct' },
            { id: 'light_adapt', label: "Light moths quickly changed color to match dark bark.", nextNodeId: 'misconception_adapt' },
            { id: 'all_died', label: "The whole population died because they couldn't adapt.", nextNodeId: 'hint_some_dark' }
        ]
    },

    'misconception_adapt': {
        id: 'misconception_adapt',
        speaker: 'AI',
        content: "Remember: individual organisms don't change their genetics! 🧬\n\nThe light moths that couldn't hide got eaten. The dark moths that already existed (from random past mutations) survived better and passed on their dark genes. Over many generations, the dark color gene spread through the population.",
        options: [
            { id: 'understood2', label: "Selection acts on existing variation — it doesn't create new traits!", nextNodeId: 'industrial_correct' }
        ]
    },

    'hint_some_dark': {
        id: 'hint_some_dark',
        speaker: 'AI',
        content: "Remember — the population already had some dark moths! They just used to be rare. On dark bark, they had the survival advantage.",
        options: [
            { id: 'see_now', label: "Dark moths were already there — now they had an advantage!", nextNodeId: 'industrial_correct' }
        ]
    },

    'industrial_correct': {
        id: 'industrial_correct',
        speaker: 'AI',
        content: "Exactly! This is the famous **Peppered Moth** experiment — one of the best documented cases of evolution in action. 🦋\n\nSwitch the environment to 'dark bark' in the sim and run more generations to see the reversal!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'industrial', environment: 'dark', showEnvironmentControl: true } },
        options: [
            { id: 'confirmed', label: "Dark moths dominate on dark bark — evolution reversed!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Evolution Mastered:**\n\n✅ Evolution = change in gene frequencies over generations\n✅ Organisms don't choose to evolve — mutations are random\n✅ Selection acts on existing variation (it's a filter, not a creator)\n✅ Environment determines which traits are advantageous\n✅ Evolution can go backwards if environment reverses\n\n**Timescale:** Peppered moths showed visible evolution in ~50 years. Dinosaur-to-bird evolution took ~50 million years! ⏳",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [
            { id: 'done', label: "Evolution makes sense now!", nextNodeId: 'done' }
        ]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "🔗 **Big Idea 12 Complete — How Do Hidden Rules Shape Big Patterns?**\n\n- Physics (P12): Gravity & Orbits — invisible gravitational rules create predictable orbital patterns\n- Chemistry (C12): Periodic Table Patterns — electron structure creates repeating element behaviors\n- Biology (B12): Natural Selection — hidden variation + environmental pressure shapes species over generations\n\nIn all three: **simple hidden rules, repeated over time, create the grand patterns we see!** 🦋🌌⚛️\n\n✅ **Lesson B12 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
