import { DialogNode } from '../../types';

/**
 * P6 — Density & Buoyancy
 * Big Idea 6: "Why Do Things Float or Sink?"
 * Scenario: "The Mystery Tank"
 * Target Misconception: "Heavy things always sink"
 */
export const getP6Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Physics Lab! 🔬\n\nSee that big water tank? I've got three objects for you:\n- A **steel marble** (small and heavy)\n- A **wooden block** (medium and light)\n- A **beach ball** (big and super light)\n\nWhich ones do you think will float?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', steelDropped: false, woodDropped: false, ballDropped: false } },
        options: [
            { id: 'heavy_sink', label: "The heavy steel marble sinks. The rest float.", nextNodeId: 'partial_heavy', sentiment: 'neutral' },
            { id: 'all_float', label: "They all float — water holds things up.", nextNodeId: 'misconception_allFloat', sentiment: 'negative' },
            { id: 'depends', label: "It depends on more than just weight.", nextNodeId: 'correct_depends', sentiment: 'positive' }
        ]
    },

    'partial_heavy': {
        id: 'partial_heavy',
        speaker: 'AI',
        content: "Interesting — you're thinking weight matters. But consider this: a giant steel ship weighs THOUSANDS of tons and it floats! 🚢\n\nSo weight alone can't be the answer. What else might matter?",
        options: [
            { id: 'shape', label: "Maybe the shape matters?", nextNodeId: 'shape_matters' },
            { id: 'size', label: "Maybe how big it is compared to its weight?", nextNodeId: 'correct_depends' }
        ]
    },

    'shape_matters': {
        id: 'shape_matters',
        speaker: 'AI',
        content: "Shape is part of the picture! A flat steel sheet can float, but a steel marble sinks — same material! 🔩\n\nWhat shape really changes is the **volume** — how much space the object takes up. A ship's hollow shape gives it a HUGE volume compared to its weight.\n\nThe key concept is **density**: how much mass is packed into a given volume.\n\n**Density = Mass ÷ Volume**\n\nWater has a density of **1 g/cm³**. If an object's density is LESS than water, it floats. If MORE, it sinks.\n\nLet's test it! Drop the objects one at a time!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'ready', dropUnlocked: true } },
        options: [
            { id: 'drop_steel', label: "Drop the steel marble!", nextNodeId: 'steel_result' }
        ]
    },

    'misconception_allFloat': {
        id: 'misconception_allFloat',
        speaker: 'AI',
        content: "If water always held things up, nothing would ever sink! But rocks sink. Coins sink. Steel marbles DEFINITELY sink. 🪨\n\nSo water pushes UP, but sometimes it's not enough. The question is: when is it enough?",
        options: [
            { id: 'when', label: "When is the water push enough?", nextNodeId: 'correct_depends' }
        ]
    },

    'correct_depends': {
        id: 'correct_depends',
        speaker: 'AI',
        content: "Right! It's not about weight alone — it's about **density**: how much mass is packed into a given volume.\n\n**Density = Mass ÷ Volume**\n\nWater has a density of **1 g/cm³**. If an object's density is LESS than water, it floats. If MORE, it sinks.\n\nLet's test it! Drop the objects one at a time!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'ready', dropUnlocked: true } },
        options: [
            { id: 'drop_steel', label: "Drop the steel marble!", nextNodeId: 'steel_result' }
        ]
    },

    'steel_result': {
        id: 'steel_result',
        speaker: 'AI',
        content: "📉 SPLOOSH! The steel marble sinks straight to the bottom!\n\n**Steel density ≈ 7.8 g/cm³** — that's almost 8 times denser than water. Water pushes up, but the marble's weight wins easily.\n\nNow try the wooden block!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'steel_sunk', steelDropped: true } },
        options: [
            { id: 'drop_wood', label: "Drop the wooden block!", nextNodeId: 'wood_result' }
        ]
    },

    'wood_result': {
        id: 'wood_result',
        speaker: 'AI',
        content: "🌊 The wood bobbed down... then popped back up and floats!\n\n**Wood density ≈ 0.6 g/cm³** — less dense than water. The upward push (called **buoyant force**) is stronger than gravity pulling it down.\n\nNotice it's not sitting ON the water — part of it is submerged!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'wood_floating', woodDropped: true, showWaterLine: true } },
        options: [
            { id: 'why_partial', label: "Why is part of it underwater?", nextNodeId: 'partial_submerge' },
            { id: 'drop_ball', label: "Drop the beach ball!", nextNodeId: 'ball_result' }
        ]
    },

    'partial_submerge': {
        id: 'partial_submerge',
        speaker: 'AI',
        content: "Great observation! The block sinks just enough until the buoyant force EQUALS its weight. Heavier wood would sit deeper; lighter wood would sit higher.\n\nThis is why ships have a **load line** painted on their hull — if the water reaches that line, the ship is carrying too much! ⚓\n\nNow let's try the beach ball!",
        options: [
            { id: 'beach_ball', label: "Drop the beach ball!", nextNodeId: 'ball_result' }
        ]
    },

    'ball_result': {
        id: 'ball_result',
        speaker: 'AI',
        content: "🏖️ The beach ball barely dips in! It sits very high on the water.\n\n**Beach ball density ≈ 0.05 g/cm³** — it's mostly air! Only a tiny fraction needs to be submerged to balance its weight.\n\nSo denser objects sink deeper, less dense objects ride higher!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'all_dropped', ballDropped: true } },
        options: [
            { id: 'checkpoint', label: "I see the pattern!", nextNodeId: 'checkpoint_predict' }
        ]
    },

    'checkpoint_predict': {
        id: 'checkpoint_predict',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nI have a mystery cube. It has a mass of **500 g** and a volume of **600 cm³**.\n\nDensity = 500 ÷ 600 = **0.83 g/cm³**\n\nWill it float or sink?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showMysteryObject: true } },
        options: [
            { id: 'float', label: "Float — its density is less than 1!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'sink', label: "Sink — 500 grams is heavy.", nextNodeId: 'checkpoint_wrong', sentiment: 'negative' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Remember — it's not about weight alone! A ship weighs thousands of tons but floats. Check the DENSITY:\n\n500 g ÷ 600 cm³ = 0.83 g/cm³\n\nThat's LESS than water's 1.0 g/cm³. So it floats! The volume matters just as much as the mass.",
        options: [
            { id: 'got_it', label: "Oh right — density, not weight!", nextNodeId: 'checkpoint_correct' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ Correct! 0.83 < 1.0, so it FLOATS!\n\nNow I'm unlocking the **Density Slider**. You can change the liquid's density too! Try salt water (1.03 g/cm³) — objects float MORE in salt water. That's why you float easily in the Dead Sea! 🌊",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore', densitySliderUnlocked: true, liquidDensity: 1.0 } },
        options: [
            { id: 'explore', label: "Let me try different densities!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **You discovered the rule of buoyancy!**\n\n**If object density < liquid density → FLOAT**\n**If object density > liquid density → SINK**\n\nThe liquid pushes up with a force equal to the weight of the liquid displaced. This is **Archimedes' Principle** — discovered over 2000 years ago when he noticed bath water rising as he got in!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showPrinciple: true } },
        options: [
            { id: 'crosslink', label: "This is amazing! What's next?", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** Speaking of liquids — you can SEPARATE mixtures based on density! Oil floats on water because it's less dense. Head over to **Chemistry Lesson C6: Mixtures & Separation** to see how density helps us take things apart!\n\nAnd in Biology, fish USE water density to breathe — dissolved oxygen sits in water, and gills extract it!\n\n✅ **Lesson P6 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

