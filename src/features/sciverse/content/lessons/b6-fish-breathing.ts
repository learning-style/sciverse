import { DialogNode } from '../../types';

/**
 * B6 — How Fish Breathe: Gills & Dissolved Oxygen
 * Big Idea 6: "Why Do Things Float or Sink?"
 * Scenario: "The Underwater Mystery"
 * Target Misconception: "Fish breathe air like us" / "Fish don't need oxygen"
 */
export const getB6Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to **The Underwater Mystery!** 🐟\n\nImagine you're scuba diving in a lake. You need an air tank to breathe — but fish swim around without any tank at all!\n\nHere's the question: **How do fish breathe underwater?**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'no_oxygen', label: "Maybe fish don't need oxygen?", nextNodeId: 'misconception_no_oxygen', sentiment: 'negative' },
            { id: 'air_pockets', label: "They find air pockets in the water?", nextNodeId: 'misconception_air', sentiment: 'negative' },
            { id: 'gills', label: "They use their gills somehow!", nextNodeId: 'gills_intro', sentiment: 'positive' }
        ]
    },

    'misconception_no_oxygen': {
        id: 'misconception_no_oxygen',
        speaker: 'AI',
        content: "Interesting guess, but fish absolutely DO need oxygen! 🫧\n\nEvery living cell — in fish, humans, plants — needs oxygen to release energy from food. Without oxygen, cells can't work.\n\nSo the real question is: **where does the oxygen come from** if there's no air down there?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'fish_swimming' } },
        options: [
            { id: 'dissolved', label: "Is oxygen hiding in the water?", nextNodeId: 'dissolved_oxygen' },
            { id: 'gills', label: "Maybe gills pull it from water somehow?", nextNodeId: 'gills_intro' }
        ]
    },

    'misconception_air': {
        id: 'misconception_air',
        speaker: 'AI',
        content: "That's a creative idea! But there aren't air pockets waiting for fish underwater. 🌊\n\nHere's the amazing truth: **oxygen actually dissolves into water** — like sugar dissolves in tea!\n\nRemember from Chemistry (C6) how substances can dissolve and mix? Oxygen does the same thing with water.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'fish_swimming' } },
        options: [
            { id: 'dissolved', label: "Dissolved oxygen? Tell me more!", nextNodeId: 'dissolved_oxygen' }
        ]
    },

    'gills_intro': {
        id: 'gills_intro',
        speaker: 'AI',
        content: "Yes! Gills are the key! 🎯\n\nBut gills don't breathe air — they extract **dissolved oxygen** from water.\n\nJust like in Chemistry (C6), where salt dissolves in water and you can't see it anymore, oxygen gas dissolves in water too! Fish \"smell\" that dissolved oxygen with their gills.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'fish_swimming', showO2Dots: true } },
        options: [
            { id: 'how_dissolve', label: "How does oxygen get into water?", nextNodeId: 'dissolved_oxygen' },
            { id: 'how_gills', label: "How do gills actually work?", nextNodeId: 'gills_closeup' }
        ]
    },

    'dissolved_oxygen': {
        id: 'dissolved_oxygen',
        speaker: 'AI',
        content: "**Dissolved oxygen** is O₂ gas mixed into water at the molecular level! 🫧\n\nIt gets there from:\n- **The atmosphere** — wind and waves push air into the surface\n- **Plants & algae** — underwater plants photosynthesize and release O₂\n\nThe oxygen molecules are scattered between water molecules, invisible but there. Look at the little blue dots in the water — each one represents an O₂ molecule!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'fish_swimming', showO2Dots: true, showO2Sources: true } },
        options: [
            { id: 'gills', label: "So how do gills grab that oxygen?", nextNodeId: 'gills_closeup' }
        ]
    },

    'gills_closeup': {
        id: 'gills_closeup',
        speaker: 'AI',
        content: "Let's zoom in on a gill! 🔬\n\nA fish gulps water through its **mouth** and pushes it out past its **gills**. Each gill has hundreds of thin, feathery structures called **filaments**.\n\nThese filaments are packed with tiny blood vessels. The walls are so thin that **O₂ passes right through** from the water into the blood!\n\nWatch the animation — water flows left to right, and oxygen crosses the thin membrane.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'gills_closeup' } },
        options: [
            { id: 'exchange', label: "What happens to CO₂?", nextNodeId: 'oxygen_exchange' },
            { id: 'why_thin', label: "Why do the walls need to be thin?", nextNodeId: 'thin_walls' }
        ]
    },

    'thin_walls': {
        id: 'thin_walls',
        speaker: 'AI',
        content: "Great question! The walls must be thin because oxygen moves by **diffusion** — it drifts from where there's MORE of it to where there's LESS.\n\nThick walls would slow diffusion to a crawl. Thin walls = fast gas exchange! This is just like how a thin paper towel soaks up water faster than a thick sponge.\n\nThe filaments also have a HUGE surface area — like unfolding a crumpled piece of paper. More surface = more oxygen captured!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'gills_closeup', highlightWalls: true } },
        options: [
            { id: 'exchange', label: "Does CO₂ go the other way?", nextNodeId: 'oxygen_exchange' }
        ]
    },

    'oxygen_exchange': {
        id: 'oxygen_exchange',
        speaker: 'AI',
        content: "Exactly! It's a **two-way exchange**: 🔄\n\n➡️ **O₂** moves from the water → into the fish's blood (because blood has less O₂)\n⬅️ **CO₂** moves from the blood → into the water (because blood has more CO₂)\n\nBoth happen by diffusion through those thin walls — no energy needed!\n\nThis is similar to how YOUR lungs work, except lungs use air and gills use water.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'oxygen_exchange' } },
        options: [
            { id: 'warm', label: "Does water temperature matter?", nextNodeId: 'warm_vs_cold' },
            { id: 'checkpoint', label: "I think I understand gills now!", nextNodeId: 'checkpoint' }
        ]
    },

    'warm_vs_cold': {
        id: 'warm_vs_cold',
        speaker: 'AI',
        content: "YES — temperature is a big deal! 🌡️\n\nRemember from Physics (P6) how density changes with temperature? Here's the connection:\n\n❄️ **Cold water** holds MORE dissolved oxygen (molecules move slowly, stay packed in)\n🔥 **Warm water** holds LESS dissolved oxygen (molecules move fast, escape to the air)\n\nLook at the comparison — the cold side has way more blue O₂ dots!\n\nThis is why fish in warm ponds sometimes gasp at the surface — they're running low on oxygen!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'warm_vs_cold' } },
        options: [
            { id: 'checkpoint', label: "So warm water is dangerous for fish!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint Question!**\n\nA pond on a hot summer day has still, warm water. Fish are gasping at the surface. Why are they struggling?\n\nThink about what you've learned about dissolved oxygen and temperature...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'correct', label: "Warm water holds less dissolved O₂, so fish can't get enough!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'wrong1', label: "The water is too hot and burns their gills", nextNodeId: 'checkpoint_wrong', sentiment: 'negative' },
            { id: 'wrong2', label: "There's too much oxygen in warm water", nextNodeId: 'checkpoint_wrong2', sentiment: 'negative' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ **Brilliant!** That's exactly right!\n\nWarm + still water = low dissolved oxygen. The fish gasp at the surface because there's slightly more O₂ where air meets water.\n\nThis is why aquariums have **bubblers** (air pumps) — they mix more oxygen into the water! And why rivers (moving, cooler water) usually have healthier fish than stagnant ponds.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', correct: true } },
        options: [
            { id: 'discovery', label: "Let's see everything we learned!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Not quite! Fish can handle warm water — the temperature alone isn't burning them. 🤔\n\nThe real problem is what happens to **dissolved oxygen** when water gets warm. Remember: warm water holds LESS O₂ because the gas molecules move faster and escape.\n\nSo the fish are gasping because there isn't enough oxygen dissolved in the warm water for their gills to extract!",
        options: [
            { id: 'retry', label: "Ah, it's about dissolved oxygen levels!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "Actually, it's the opposite! 🔄\n\nWarm water holds **LESS** oxygen, not more. When water heats up, gas molecules move faster and escape into the air.\n\nSo warm, still water = very low dissolved O₂ = fish struggling to breathe through their gills.",
        options: [
            { id: 'retry', label: "Oh! Less oxygen, not more!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n🐟 **How Fish Breathe:**\n1. Oxygen dissolves in water (like salt in C6!)\n2. Fish gulp water and push it over their gills\n3. Gills have thin-walled filaments packed with blood vessels\n4. O₂ diffuses from water → blood; CO₂ goes blood → water\n5. Cold water holds more O₂ than warm water (density link to P6!)\n\n**Misconception busted:** Fish DON'T breathe air — they extract dissolved oxygen using gills!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'complete', label: "Fish are amazing! 🐟", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 6 Complete — Why Do Things Float or Sink?**\n\n- Physics (P6): Density determines if objects float or sink (buoyancy)\n- Chemistry (C6): Mixtures can be separated using density differences (filtration, evaporation)\n- Biology (B6): Fish breathe by extracting dissolved oxygen through gills — and water temperature (density!) controls how much O₂ is available\n\nIn all three: **density** connects floating, mixing, and breathing! 🌊\n\n✅ **Lesson B6 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

