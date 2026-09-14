import { DialogNode } from '../../types';

/**
 * C6 — Mixtures & Separation
 * Big Idea 6: "Why Do Things Float or Sink?"
 * Scenario: "The Dirty Water Challenge"
 * Target Misconception: "Mixed things can't be unmixed"
 */
export const getC6Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Chemistry Lab! ⚗️\n\nSomebody spilled a mess — we have a glass of muddy water with sand, salt, and oil all mixed together. Yuck! 🫣\n\nCan we get clean water back from this disaster?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', showSand: true, showSalt: true, showOil: true, separated: 0 } },
        options: [
            { id: 'impossible', label: "No way — it's all mixed forever.", nextNodeId: 'misconception_forever', sentiment: 'negative' },
            { id: 'filter', label: "We can filter it!", nextNodeId: 'partial_filter', sentiment: 'neutral' },
            { id: 'steps', label: "We need different steps for each part.", nextNodeId: 'correct_multi', sentiment: 'positive' }
        ]
    },

    'misconception_forever': {
        id: 'misconception_forever',
        speaker: 'AI',
        content: "I get why you'd think that — it looks like a mess! But here's the cool part: in a **mixture**, the substances aren't chemically bonded. They're just jumbled together.\n\nSince each substance has different **physical properties** (size, density, boiling point), we can use those differences to separate them!",
        options: [
            { id: 'how', label: "How do we separate them?", nextNodeId: 'correct_multi' }
        ]
    },

    'partial_filter': {
        id: 'partial_filter',
        speaker: 'AI',
        content: "Filtering is a great start! But it won't get EVERYTHING out. A filter catches big particles like sand, but salt is dissolved — it passes right through. And oil? That needs a different trick.\n\nWe need a multi-step plan!",
        options: [
            { id: 'plan', label: "Let's make a plan!", nextNodeId: 'correct_multi' }
        ]
    },

    'correct_multi': {
        id: 'correct_multi',
        speaker: 'AI',
        content: "Here's our game plan:\n\n1️⃣ **Skim** the oil off the top (it floats — less dense!)\n2️⃣ **Filter** out the sand (particles are too big to pass through)\n3️⃣ **Evaporate** the water to recover the salt\n\nEach step uses a DIFFERENT physical property. Let's start!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'plan', showSteps: true } },
        options: [
            { id: 'skim', label: "Step 1: Skim the oil!", nextNodeId: 'skim_oil' }
        ]
    },

    'skim_oil': {
        id: 'skim_oil',
        speaker: 'AI',
        content: "🔧 Skimming the oil...\n\nOil floats because it's **less dense** than water (about 0.9 g/cm³ vs 1.0 g/cm³ for water). Using a spoon, we scoop off the yellow oil layer.\n\nThis is the same principle as P6 (Density & Buoyancy) — less dense things float to the top!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'skimming', showOil: false, separated: 1 } },
        options: [
            { id: 'filter_sand', label: "Step 2: Filter the sand!", nextNodeId: 'filter_sand' }
        ]
    },

    'filter_sand': {
        id: 'filter_sand',
        speaker: 'AI',
        content: "🔧 Pouring through filter paper...\n\nThe filter has tiny holes — water molecules and dissolved salt slip right through, but sand grains are WAY too big. They get caught!\n\nThis is **filtration** — separating by **particle size**. Coffee filters work the same way! ☕",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'filtering', showSand: false, separated: 2 } },
        options: [
            { id: 'evaporate', label: "Step 3: Get the salt out!", nextNodeId: 'checkpoint_evaporate' }
        ]
    },

    'checkpoint_evaporate': {
        id: 'checkpoint_evaporate',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nWe have clear salt water now. The salt is **dissolved** — invisible in the water. How do we get it back?\n\nHint: salt doesn't evaporate, but water does...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'heat', label: "Heat it until the water boils away, leaving salt behind!", nextNodeId: 'evaporate_correct', sentiment: 'positive' },
            { id: 'freeze', label: "Freeze it — the salt will fall out.", nextNodeId: 'evaporate_wrong', sentiment: 'negative' },
            { id: 'filter_again', label: "Filter it again with a finer filter.", nextNodeId: 'evaporate_wrong2', sentiment: 'negative' }
        ]
    },

    'evaporate_wrong': {
        id: 'evaporate_wrong',
        speaker: 'AI',
        content: "Interesting idea! But freezing actually traps salt IN the ice. Sea ice is slightly salty because of this.\n\nThe trick is that water can **evaporate** — turn into a gas and float away into the air — but salt can't. So if we let the water evaporate...",
        options: [
            { id: 'heat_it', label: "The water turns to steam and the salt stays behind!", nextNodeId: 'evaporate_correct' }
        ]
    },

    'evaporate_wrong2': {
        id: 'evaporate_wrong2',
        speaker: 'AI',
        content: "Salt is dissolved at the molecular level — even the finest filter can't catch individual ions. They're smaller than the holes in ANY filter.\n\nWe need to use a different property: water can **evaporate** into the air, but salt can't. Water even evaporates from a puddle on a cool day — while salt just stays behind as a solid!",
        options: [
            { id: 'boil_it', label: "So boil the water away!", nextNodeId: 'evaporate_correct' }
        ]
    },

    'evaporate_correct': {
        id: 'evaporate_correct',
        speaker: 'AI',
        content: "✅ Perfect! Heating the water turns it into steam (gas), and the salt crystals are left behind in the dish.\n\nThis is **evaporation** — the water turns into a gas and escapes, but the salt can't. Heating makes it faster, but boiling isn't needed: salt farms in warm countries just let the sun slowly evaporate shallow ponds of seawater! ☀️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'evaporating', showSalt: false, separated: 3 } },
        options: [
            { id: 'summary', label: "We separated everything!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **You separated a mixture using 3 techniques!**\n\n| Technique | Property Used | What's Separated |\n|-----------|--------------|------------------|\n| Skimming | Density | Oil |\n| Filtration | Particle size | Sand |\n| Evaporation | Water evaporates, salt doesn't | Dissolved salt |\n\nKey insight: **Mixtures can always be separated** because the substances keep their own physical properties!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showSummary: true } },
        options: [
            { id: 'next', label: "That's so cool!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** Remember how oil floated in our mixture? That's DENSITY from P6! And in Biology, fish gills take dissolved oxygen out of water — not by filtering it, but by letting it pass through very thin walls!\n\nHead to **B6: How Fish Breathe** to see how it works! 🐟\n\n✅ **Lesson C6 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

