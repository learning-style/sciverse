import { DialogNode } from '../../types';

/**
 * C9 — Nutrients & Elements
 * Big Idea 9: "How Do Things Grow?"
 * Scenario: "The Plant Food Lab"
 * Target Misconception: "Plants only need water and sunlight"
 */
export const getC9Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Plant Food Lab! 🌱🧪\n\nImagine you're a farmer and your plants are looking weak — pale leaves, tiny flowers, thin stems. You're watering them every day and they get plenty of sunlight.\n\nSo what's going wrong? What else could plants possibly need?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'just_water', label: "Plants only need water and sunlight, right?", nextNodeId: 'misconception', sentiment: 'negative' },
            { id: 'food', label: "Maybe they need some kind of food from the soil?", nextNodeId: 'good_guess', sentiment: 'positive' },
            { id: 'unsure', label: "I'm not sure what else they could need.", nextNodeId: 'nudge', sentiment: 'neutral' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "That's a really common idea — but it's actually a **misconception**! 🤔\n\nWater and sunlight are important, but they're not EVERYTHING. Plants also pull **nutrients** — special chemicals — from the soil through their roots.\n\nWithout those nutrients, plants grow weak and sick, even with perfect sunlight and water. Let's dig into the soil and find out what's down there!",
        options: [
            { id: 'dig', label: "Let's look at what's in the soil!", nextNodeId: 'soil' }
        ]
    },

    'good_guess': {
        id: 'good_guess',
        speaker: 'AI',
        content: "Exactly right! ✅ Plants pull **nutrients** — special chemical elements — up from the soil through their roots.\n\nWithout these nutrients, a plant can have all the sunshine and water it wants but STILL grow weak. Let's dig underground and discover what the soil is really made of!",
        options: [
            { id: 'explore', label: "Show me what's in the soil!", nextNodeId: 'soil' }
        ]
    },

    'nudge': {
        id: 'nudge',
        speaker: 'AI',
        content: "Think about this: you eat food every day for energy and building blocks. Could plants need building blocks too?\n\nThe answer is YES! The soil is full of **nutrients** — chemical elements that plants suck up through their roots. Let's explore what's down there! 🔬",
        options: [
            { id: 'see_soil', label: "Let's look underground!", nextNodeId: 'soil' }
        ]
    },

    'soil': {
        id: 'soil',
        speaker: 'AI',
        content: "🔬 **Inside the Soil**\n\nLook at this cross-section! The soil isn't just dirt — it's full of tiny nutrient particles dissolved in water.\n\nThe three MOST important nutrients for plants are called **NPK**:\n\n| Letter | Element | What it does |\n|--------|------------|----------------------------|\n| **N** | Nitrogen | Leaf & stem growth 🍃 |\n| **P** | Phosphorus | Roots & flowers 🌸 |\n| **K** | Potassium | Overall health & strength 💪 |\n\nYou can see the roots reaching down, absorbing these tiny nutrient dots from the soil water!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'soil' } },
        options: [
            { id: 'nitrogen', label: "Tell me more about Nitrogen!", nextNodeId: 'nitrogen' }
        ]
    },

    'nitrogen': {
        id: 'nitrogen',
        speaker: 'AI',
        content: "🍃 **Nitrogen (N) — the Leaf Builder**\n\nNitrogen is the #1 nutrient for making leaves green and stems tall. Plants use nitrogen to build **chlorophyll** — the green pigment that captures sunlight!\n\nWatch the plant on the left — it's getting extra nitrogen. See how its leaves are BIG and dark green? It's growing tall!\n\n⚠️ Without enough nitrogen, leaves turn **yellow** and growth slows way down. That's one of the most common signs of a hungry plant!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'nitrogen' } },
        options: [
            { id: 'to_phosphorus', label: "What about Phosphorus?", nextNodeId: 'phosphorus' }
        ]
    },

    'phosphorus': {
        id: 'phosphorus',
        speaker: 'AI',
        content: "🌸 **Phosphorus (P) — the Root & Flower Builder**\n\nPhosphorus helps plants grow strong **roots** underground and beautiful **flowers** above. It's also needed to transfer energy inside the plant — kind of like a battery!\n\nSee the middle plant? It has extra phosphorus — look at its thick roots reaching deep and its big blooms.\n\nFarmers often add extra phosphorus when they want fruit trees or flower gardens to do well! 🍎🌷",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'phosphorus' } },
        options: [
            { id: 'to_potassium', label: "And Potassium?", nextNodeId: 'potassium' }
        ]
    },

    'potassium': {
        id: 'potassium',
        speaker: 'AI',
        content: "💪 **Potassium (K) — the Health Protector**\n\nPotassium doesn't grow one particular part — it keeps the WHOLE plant healthy. It helps with:\n- Moving water through the plant\n- Fighting off diseases\n- Surviving drought and cold\n\nThe plant on the right has extra potassium — its stem is thick and strong, and it handles stress well.\n\n🛒 Look at that fertilizer bag! The three numbers on the front — like **10-5-8** — tell you how much **N-P-K** is inside. Every bag of plant food uses this code!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'potassium' } },
        options: [
            { id: 'to_human', label: "Do humans need the same elements?", nextNodeId: 'human_compare' }
        ]
    },

    'human_compare': {
        id: 'human_compare',
        speaker: 'AI',
        content: "🧬 **Same Elements, Different Bodies!**\n\nHere's something amazing: the elements plants need are the SAME elements in YOUR body!\n\n| Element | Plants use it for... | Humans use it for... |\n|---------|---------------------|---------------------|\n| Carbon (C) | Sugar, cellulose | Muscles, bones, DNA |\n| Hydrogen (H) | Water in cells | Water in cells |\n| Oxygen (O) | Breathing, sugars | Breathing, energy |\n| Nitrogen (N) | Chlorophyll | Proteins, DNA |\n\nWe're made of the same atoms as plants! 🌿 = 🧑 at the atomic level. We get OUR elements from the food we eat — and a lot of that food IS plants!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'human_compare' } },
        options: [
            { id: 'to_recycling', label: "So where do these atoms come from originally?", nextNodeId: 'recycling' }
        ]
    },

    'recycling': {
        id: 'recycling',
        speaker: 'AI',
        content: "♻️ **Nature's Recycling — The Nutrient Cycle!**\n\nHere's the mind-blowing part: atoms get **recycled** over and over!\n\n🔄 **The Cycle:**\n1. Plants absorb nitrogen & carbon from soil and air\n2. Animals eat the plants → atoms move into animal bodies\n3. Animals produce waste (and eventually decompose)\n4. Bacteria in soil break waste down → nutrients return to soil\n5. Plants absorb those nutrients again!\n\nThe nitrogen atom in your lunch might have been in a dinosaur millions of years ago! 🦕 Nothing is wasted — nature recycles EVERYTHING.\n\n🔗 **Link to B9:** Cells need these nutrient atoms as building blocks to **divide and grow**. No nutrients → no cell division → no growth!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'recycling' } },
        options: [
            { id: 'to_checkpoint', label: "I think I understand — let's test it!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint!**\n\nA farmer notices that their plant has **pale yellow leaves** and is growing very slowly. The plant gets plenty of water and sunlight.\n\nWhich nutrient is the plant most likely missing?\n\n🔗 **Link to P9:** If you measured the plant's height each week, you could use a **graph** to PROVE it's growing slower than a plant with the right nutrients!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'nitrogen_ans', label: "Nitrogen (N) — it's needed for green leaves!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'phosphorus_ans', label: "Phosphorus (P) — it helps roots and flowers.", nextNodeId: 'checkpoint_wrong_p', sentiment: 'negative' },
            { id: 'potassium_ans', label: "Potassium (K) — it keeps plants healthy.", nextNodeId: 'checkpoint_wrong_k', sentiment: 'negative' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ Perfect! Yellow leaves and slow growth are classic signs of **nitrogen deficiency**!\n\nNitrogen builds **chlorophyll** — the green pigment. Without enough nitrogen, leaves lose their green color and turn yellow. The plant can't capture as much sunlight, so growth slows down.\n\nA farmer would fix this by adding a fertilizer HIGH in nitrogen — something like **30-5-5** on the bag!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', correct: true } },
        options: [
            { id: 'to_discovery', label: "That makes so much sense!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_p': {
        id: 'checkpoint_wrong_p',
        speaker: 'AI',
        content: "Not quite! Phosphorus problems usually show up in the **roots and flowers** — you'd see purple-tinged leaves or poor flowering, not yellow leaves.\n\n**Yellow leaves** = the plant can't make enough **chlorophyll**. And chlorophyll needs **Nitrogen (N)**! That's why nitrogen-deficient plants go pale and yellow. 🍂",
        options: [
            { id: 'retry', label: "Ah — nitrogen makes the green color!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_k': {
        id: 'checkpoint_wrong_k',
        speaker: 'AI',
        content: "Good thinking, but potassium deficiency usually causes **brown edges** on leaves and weak stems — not overall yellowing.\n\nThe clue was **pale yellow leaves**: that means the plant can't make enough **chlorophyll** (the green stuff). Chlorophyll needs **Nitrogen (N)**! Low nitrogen = yellow, slow-growing plants. 💛",
        options: [
            { id: 'understand', label: "Got it — nitrogen turns leaves green!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery: Plants Need Nutrients!**\n\n| Nutrient | Symbol | Role | Deficiency sign |\n|----------|--------|------|------------------|\n| Nitrogen | N | Leaf growth, chlorophyll | Yellow leaves 🍂 |\n| Phosphorus | P | Roots & flowers | Poor roots/blooms |\n| Potassium | K | Overall health | Brown leaf edges |\n\n**Key Insights:**\n- Plants need more than water & sunlight — they need **NPK nutrients** from soil\n- The same chemical elements (C, H, O, N) are in both plants AND humans\n- Nature **recycles** atoms through nutrient cycles — nothing is wasted! ♻️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'finish', label: "Plants and humans are made of the same atoms!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Links:**\n- **P9 (Measuring Change):** If you grow two plants — one with fertilizer, one without — you can **measure and graph** the height difference over weeks. That's real science: quantifying the effect of nutrients! 📊\n- **B9 (Cell Division):** Every time a plant cell divides to grow, it needs nutrient atoms as raw materials. Nitrogen goes into DNA, phosphorus into cell membranes, potassium into cell fluid. No nutrients = no new cells = no growth! 🧬\n\n✅ **Lesson C9 Complete!** Now you know the secret recipe for plant food — and your food too!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

