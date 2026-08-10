import { DialogNode } from '../../types';

/**
 * P8 — Heat Transfer
 * Big Idea 8: "Why Does Weather Change?"
 * Scenario: "The Campfire Puzzle"
 * Target Misconception: "Heat only travels through touching"
 */
export const getP8Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "🔥 Welcome to the great outdoors! It's a cool evening and someone has lit a **campfire**.\n\nYou're standing a few metres away, but you can already feel the warmth on your face. Interesting…\n\nYou haven't touched the fire, so **how is the heat reaching you?**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', showConduction: false, showConvection: false, showRadiation: false } },
        options: [
            { id: 'touch', label: "Heat travels through the air by touching it, like a chain.", nextNodeId: 'misconception_touch', sentiment: 'negative' },
            { id: 'light', label: "Maybe the light from the fire carries heat?", nextNodeId: 'light_guess', sentiment: 'neutral' },
            { id: 'multiple', label: "I think there might be more than one way!", nextNodeId: 'good_instinct', sentiment: 'positive' }
        ]
    },

    'misconception_touch': {
        id: 'misconception_touch',
        speaker: 'AI',
        content: "That's a really common idea — and it's *partly* right! Heat CAN travel through direct contact, but that's only **one** of three ways.\n\nIf touching were the only way, you'd have to press your hand against the fire to feel it. But you feel warm from metres away! 🤔\n\nLet's investigate all three methods. First, let's explore what happens when things **do** touch…",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'campfire' } },
        options: [
            { id: 'explore', label: "Show me the first way!", nextNodeId: 'conduction_intro' }
        ]
    },

    'light_guess': {
        id: 'light_guess',
        speaker: 'AI',
        content: "Great thinking! You're actually close to one of the three methods — **radiation**. The fire does send out invisible rays that carry heat.\n\nBut there are actually **three different ways** heat can travel. Let's discover all of them, starting with the most obvious one…",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'campfire' } },
        options: [
            { id: 'first_way', label: "What's the first way?", nextNodeId: 'conduction_intro' }
        ]
    },

    'good_instinct': {
        id: 'good_instinct',
        speaker: 'AI',
        content: "Excellent instinct! 🌟 There are indeed **three ways** heat can travel, and they're all happening right now around this campfire.\n\nLet's discover each one. Grab that metal stick leaning against the log…",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'campfire' } },
        options: [
            { id: 'grab_stick', label: "I'll pick up the metal stick!", nextNodeId: 'conduction_intro' }
        ]
    },

    'conduction_intro': {
        id: 'conduction_intro',
        speaker: 'AI',
        content: "🪵 You push a **metal rod** into the hot campfire coals. After a moment, the end you're holding starts getting warm… then HOT!\n\nThis is **CONDUCTION** — heat transfer through **direct contact**.\n\nWatch the particles in the rod: the hot end vibrates fast, bumping into its neighbour, which bumps the next one, like dominoes! 🎯\n\nThe heat travels particle-to-particle along the metal, from the hot end toward your hand.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'conduction', showConduction: true } },
        options: [
            { id: 'why_metal', label: "Why does metal conduct heat so well?", nextNodeId: 'conduction_why_metal', sentiment: 'positive' },
            { id: 'next_way', label: "Got it! What's the second way?", nextNodeId: 'convection_intro' }
        ]
    },

    'conduction_why_metal': {
        id: 'conduction_why_metal',
        speaker: 'AI',
        content: "Great question! Metal atoms are packed **very close together** and share free-moving electrons. Those electrons carry energy quickly from atom to atom — like an express delivery service! 🚀\n\nWood, plastic, and air have particles spread further apart, so they conduct heat much slower. That's why a wooden spoon doesn't burn your hand as fast as a metal one!\n\nNow let's look up — see that shimmer above the fire?",
        options: [
            { id: 'look_up', label: "I see the wavy air above the fire!", nextNodeId: 'convection_intro' }
        ]
    },

    'convection_intro': {
        id: 'convection_intro',
        speaker: 'AI',
        content: "👆 Look above the campfire — the air is **shimmering and rising**!\n\nThis is **CONVECTION** — heat transfer through **moving fluid** (liquid or gas).\n\nHere's what happens:\n1. Fire heats the air near it → air **expands** and gets lighter\n2. Hot light air **rises** up ⬆️\n3. Cool heavy air rushes in from the sides to replace it ⬇️\n4. This creates a **loop** — a convection current!\n\nThat's why you feel a warm breeze near the fire and smoke always goes UP.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'convection', showConvection: true } },
        options: [
            { id: 'hand_above', label: "So holding my hand above the fire would be hottest?", nextNodeId: 'convection_above', sentiment: 'positive' },
            { id: 'third_way', label: "Interesting! What's the third way?", nextNodeId: 'radiation_intro' }
        ]
    },

    'convection_above': {
        id: 'convection_above',
        speaker: 'AI',
        content: "Exactly! ✅ The air **directly above** the fire is the hottest spot because convection carries heat straight UP. That's why:\n\n- Hot air balloons float 🎈\n- Your room is warmer near the ceiling\n- Boiling water has currents swirling inside\n\nBut here's a puzzle: you feel heat on your face even from the **side** of the fire, where there's no rising air. How? 🤔",
        options: [
            { id: 'how_side', label: "That must be the third way!", nextNodeId: 'radiation_intro' }
        ]
    },

    'radiation_intro': {
        id: 'radiation_intro',
        speaker: 'AI',
        content: "🌊 You feel warmth on your face from metres away — no touching, no wind. How?\n\n**RADIATION** — heat carried by invisible **infrared rays**. These are a type of light your eyes can't see!\n\nThe amazing part: radiation needs **NO material at all**. It can even travel through empty space! That's how the Sun heats the Earth across 150 million kilometres of vacuum! ☀️\n\nWatch the wavy lines coming from the fire — those represent infrared radiation spreading out in all directions.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'radiation', showRadiation: true } },
        options: [
            { id: 'all_directions', label: "So radiation goes sideways too, not just up?", nextNodeId: 'radiation_directions', sentiment: 'positive' },
            { id: 'see_all', label: "Can we see all three at once?", nextNodeId: 'all_three' }
        ]
    },

    'radiation_directions': {
        id: 'radiation_directions',
        speaker: 'AI',
        content: "Yes! That's the key difference:\n\n- **Convection** mainly goes **UP** (hot fluid rises)\n- **Radiation** goes in **ALL directions** — up, down, sideways — like light from a lamp 💡\n\nThat's why you feel the fire's warmth on your face even standing beside it. The infrared rays travel in straight lines outward.\n\nLet's see all three happening together at our campfire!",
        options: [
            { id: 'show_all', label: "Show me all three at once!", nextNodeId: 'all_three' }
        ]
    },

    'all_three': {
        id: 'all_three',
        speaker: 'AI',
        content: "🔥 Look at the campfire now — all THREE types of heat transfer happening simultaneously!\n\n1. 🐟  **CONDUCTION** → through the metal rod (particle-to-particle contact)\n2. 🔵 **CONVECTION** → hot air rising above the fire (moving fluid loop)\n3. 🔴 **RADIATION** → infrared rays spreading outward (no material needed!)\n\nEvery hot object does all three, but one type usually dominates. The campfire's warmth on your face? Mostly **radiation**.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'all_three', showConduction: true, showConvection: true, showRadiation: true } },
        options: [
            { id: 'checkpoint', label: "I think I've got it — test me!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint!**\n\nYou wrap your hands around a **hot mug of cocoa** ☕ and feel the warmth spreading into your fingers.\n\nWhich type of heat transfer is warming your hands?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'cp_conduction', label: "Conduction — my hands are touching the mug!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'cp_convection', label: "Convection — the hot liquid is moving inside.", nextNodeId: 'checkpoint_wrong_conv', sentiment: 'negative' },
            { id: 'cp_radiation', label: "Radiation — the mug is sending out heat rays.", nextNodeId: 'checkpoint_wrong_rad', sentiment: 'negative' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ **Correct!** Your hands are in **direct contact** with the mug — that's conduction! The fast-vibrating particles of the hot ceramic bump into the particles of your skin, transferring energy.\n\n(Fun fact: there IS convection inside the mug — the hot cocoa circulates — and the mug does radiate a tiny bit of infrared. But the main way YOUR HANDS warm up is conduction through touch! 🤝)\n\nReady for the big-picture connections?",
        options: [
            { id: 'connections', label: "Yes, how does this connect to weather?", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_conv': {
        id: 'checkpoint_wrong_conv',
        speaker: 'AI',
        content: "Close thinking! There IS convection happening inside the mug (the hot liquid is circulating), but that's heating the **cocoa**, not your **hands**.\n\nYour hands are touching the mug directly — so the main transfer to your skin is **CONDUCTION**: hot ceramic particles vibrating against your skin particles. 🤝\n\nRemember: conduction = direct contact, convection = fluid moving in a loop!",
        options: [
            { id: 'got_it', label: "Oh right — touching = conduction!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_rad': {
        id: 'checkpoint_wrong_rad',
        speaker: 'AI',
        content: "The mug does radiate a tiny bit of infrared, but that's not the main way your hands warm up here.\n\nYour hands are **wrapped around** the mug — direct contact! That's **CONDUCTION**: the hot ceramic particles bump against your skin particles and transfer energy.\n\nRadiation is the big one when there's **distance** and no touching — like feeling the campfire from metres away. 🔥",
        options: [
            { id: 'makes_sense', label: "Touching = conduction, distance = radiation. Got it!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **You discovered the three ways heat travels!**\n\n🐟  **CONDUCTION** — through direct contact (particle bumps particle)\n🔵 **CONVECTION** — through moving fluid (hot rises, cool sinks)\n🔴 **RADIATION** — through invisible infrared rays (no material needed!)\n\n🔗 **Cross-Links:**\n\n🧪 **Chemistry C8 — The Water Cycle:** The Sun's **radiation** heats ocean water → water **evaporates** → rises by **convection** → cools and **condenses** into clouds → falls as rain. Heat transfer drives the entire water cycle!\n\n🧬 **Biology B8 — Animal Adaptations:** Animals manage heat! Arctic foxes have thick fur to reduce **conduction**. Elephants flap big ears to boost **convection**. Dark-skinned lizards absorb more **radiation** to warm up faster. 🦊🐘🦎",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'finish', label: "Heat transfer is everywhere!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "✅ **Lesson P8 Complete!**\n\nYou can now explain the three ways heat moves:\n- Why a metal spoon gets hot in soup (conduction)\n- Why your room is warmer near the ceiling (convection)\n- Why you feel the Sun's warmth from 150 million km away (radiation)\n\nNext time you're near a campfire, see if you can spot all three happening at once! 🔥",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

