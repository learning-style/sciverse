import { DialogNode } from '../../types';

/**
 * B13 — Photosynthesis
 * Big Idea 13: "How Does Structure Shape Function?"
 * Scenario: A leaf converting sunlight into glucose
 * Target Misconception: "Plants get their food/mass from the soil"
 */
export const getB13Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Photosynthesis Lab! 🌿\n\nLook at the leaf cross-section in the simulation. It's capturing sunlight and turning it into... something.\n\nHere's a tricky question: where does most of a tree's **mass** come from as it grows?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', lightLevel: 50, co2Level: 50 } },
        options: [
            { id: 'soil', label: "From the soil — it absorbs nutrients and minerals.", nextNodeId: 'misconception_soil', sentiment: 'negative' },
            { id: 'air', label: "From carbon dioxide in the air!", nextNodeId: 'correct_air', sentiment: 'positive' },
            { id: 'water', label: "From water it absorbs through roots.", nextNodeId: 'partial_water', sentiment: 'neutral' }
        ]
    },

    'misconception_soil': {
        id: 'misconception_soil',
        speaker: 'AI',
        content: "This experiment will blow your mind! 🤯\n\nIn 1648, Van Helmont grew a willow tree in a pot for 5 years. The tree gained 74 kg. The soil only lost 57 grams!\n\nSo 74,000 grams of tree came from almost nothing in the soil. Where did that mass actually come from?",
        options: [
            { id: 'air_then', label: "It must come from air and water!", nextNodeId: 'correct_air' }
        ]
    },

    'partial_water': {
        id: 'partial_water',
        speaker: 'AI',
        content: "Water helps, but here's the key: water molecules (H₂O) are broken apart in photosynthesis. The hydrogen atoms are used in glucose. But the carbon skeleton (the bulk of mass) really comes from CO₂ in the air!\n\nA tree is basically **solidified air**! 🌳",
        options: [
            { id: 'solidified_air', label: "Trees are made from air?! That's incredible!", nextNodeId: 'correct_air' }
        ]
    },

    'correct_air': {
        id: 'correct_air',
        speaker: 'AI',
        content: "Yes!! A tree is made almost entirely from carbon dioxide + water, powered by sunlight! 🌞\n\n**The reaction:** 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ (glucose) + 6O₂\n\nCarbon dioxide provides the CARBON. Carbon chains are the backbone of glucose, cellulose (wood), and every organic molecule. Light provides the energy to force these bonds.\n\nLook at the chloroplasts lighting up in the sim as you increase the light level!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'reaction', showChloroplasts: true, showLightSlider: true } },
        options: [
            { id: 'adjusted_light', label: "More light = more glucose produced — I see the output bar rising!", nextNodeId: 'chlorophyll' }
        ]
    },

    'chlorophyll': {
        id: 'chlorophyll',
        speaker: 'AI',
        content: "Great! The green-glowing structures are **chloroplasts** — each packed with **chlorophyll** molecules.\n\nChlorophyll is green because it **absorbs** red and blue light but **reflects** green light back to your eyes. 🟢\n\nHere's a fascinating fact: green light is reflected = wasted! Plants are actually *inefficient* at using the color they appear to be. They could theoretically use black pigment to absorb all light.",
        options: [
            { id: 'why_green', label: "So why ARE plants green if they waste green light?", nextNodeId: 'reasons_green' },
            { id: 'try_light', label: "Let me adjust the CO₂ level too!", nextNodeId: 'co2_effect' }
        ]
    },

    'reasons_green': {
        id: 'reasons_green',
        speaker: 'AI',
        content: "Scientists debate this! 🌍 One hypothesis: early life evolved in deep oceans where red/blue wavelengths penetrate better. Another: green was 'available' — the pigment niche that evolved first stuck around.\n\nEither way, plants that absorb red and blue outcompeted alternatives. Evolution didn't optimize for perfect efficiency — just 'good enough to survive!' 🧬\n\nNow adjust the CO₂ slider — see how it affects glucose production!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'co2_explore', showCO2Slider: true } },
        options: [
            { id: 'co2_tested', label: "More CO₂ = more glucose — CO₂ is plant food!", nextNodeId: 'summary' }
        ]
    },

    'co2_effect': {
        id: 'co2_effect',
        speaker: 'AI',
        content: "More CO₂ means more carbon atoms available to build glucose molecules! That's why greenhouses pump in extra CO₂ to grow bigger vegetables. 🥦\n\nThe limiting factor (whichever of light, CO₂, or water runs out first) controls the reaction rate. Try maxing out both light and CO₂!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'max_production', showCO2Slider: true } },
        options: [
            { id: 'maxed', label: "At max both — glucose output is at peak!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Photosynthesis Mastered:**\n\n✅ Plants build mass from CO₂ (air) + H₂O (water) + light\n✅ Glucose formula: C₆H₁₂O₆\n✅ Byproduct: O₂ (the oxygen we breathe!)\n✅ Chlorophyll absorbs red & blue, reflects green\n✅ More light or more CO₂ = more photosynthesis\n✅ All food energy on Earth traces back to photosynthesis\n\n**Mind-blower:** Every carbon atom in your body was once CO₂ in the atmosphere. You literally ate sunlight! ☀️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "Photosynthesis is amazing! Let's keep going.", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "🔗 **Big Idea 13 Complete — How Does Structure Shape Function?**\n\n- Physics (P13): Gears & Pulleys — mechanical structure controls force multiplication and speed\n- Chemistry (C13): Polymers & Materials — molecular chain structure determines material behavior\n- Biology (B13): Photosynthesis Engine — leaf structures (chloroplasts, stomata) convert light into biomass\n\nIn all three: **the shape and arrangement of parts determines what a system can do!** ⚙️🧵🌿\n\n✅ **Lesson B13 Complete!**",
        options: []
    }
});
