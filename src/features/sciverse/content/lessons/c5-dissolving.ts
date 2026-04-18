import { DialogNode } from '../../types';

/**
 * C5 — Dissolving & Saturation: The Soda Factory
 * Big Idea 5: "How Can a Small Force Do a Big Job?"
 * Scenario: "Soda Factory — Dissolving CO₂"
 * Target Misconception: "You can dissolve unlimited amounts of stuff"
 */
export const getC5Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Soda Factory! 🥤🏭\n\nYour job today: dissolve **carbon dioxide (CO₂)** gas into water to make sparkling soda.\n\nI've set up a tank of water with a CO₂ injector. Let's start pumping CO₂ in!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', co2Level: 0, pressure: 2, temperature: 15 } },
        options: [
            { id: 'pump', label: "Pump CO₂ in!", nextNodeId: 'first_pump', simAction: { type: 'SET_VISUAL', payload: { co2Level: 25 } } }
        ]
    },

    'first_pump': {
        id: 'first_pump',
        speaker: 'AI',
        content: "Nice! The CO₂ molecules are spreading into the water and **dissolving** — they're fitting between the water molecules. The meter shows 25% full.\n\nThe water looks clear still. Keep going?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'dissolving', co2Level: 25, pressure: 2, temperature: 15 } },
        options: [
            { id: 'more', label: "More CO₂!", nextNodeId: 'second_pump', simAction: { type: 'SET_VISUAL', payload: { co2Level: 50 } } }
        ]
    },

    'second_pump': {
        id: 'second_pump',
        speaker: 'AI',
        content: "50%! Some tiny bubbles are forming now. The water molecules are getting **crowded** — there are fewer empty spaces for CO₂ to fit into.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'dissolving', co2Level: 50, pressure: 2, temperature: 15 } },
        options: [
            { id: 'keep_going', label: "Push more in!", nextNodeId: 'third_pump', simAction: { type: 'SET_VISUAL', payload: { co2Level: 75 } } }
        ]
    },

    'third_pump': {
        id: 'third_pump',
        speaker: 'AI',
        content: "75%! The water is pushing back now. Lots of bubbles are escaping! It's getting harder to dissolve more CO₂.\n\nOne more big pump?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'dissolving', co2Level: 75, pressure: 2, temperature: 15 } },
        options: [
            { id: 'max', label: "MAX POWER!", nextNodeId: 'saturation_hit', simAction: { type: 'SET_VISUAL', payload: { co2Level: 100 } } }
        ]
    },

    'saturation_hit': {
        id: 'saturation_hit',
        speaker: 'AI',
        content: "🧪 100% — The water is **SATURATED!**\n\nEvery CO₂ molecule you pump in now immediately bubbles right back out. The water literally CANNOT hold any more gas at this temperature and pressure.\n\nThis limit is called the **saturation point**.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'saturated', co2Level: 100, pressure: 2, temperature: 15 } },
        options: [
            { id: 'misconception', label: "So there IS a limit?", nextNodeId: 'misconception_bust' },
            { id: 'trick', label: "Is there a trick to dissolve more?", nextNodeId: 'pressure_hint' }
        ]
    },

    'misconception_bust': {
        id: 'misconception_bust',
        speaker: 'AI',
        content: "⚡ **Misconception Busted!**\n\nYou CANNOT dissolve unlimited amounts of stuff. Every solvent has a limit — the saturation point.\n\nThink of it like seats on a bus 🚌. Once every seat is taken, new passengers can't sit down!",
        options: [
            { id: 'trick', label: "But real soda is REALLY fizzy. How?", nextNodeId: 'pressure_hint' }
        ]
    },

    'pressure_hint': {
        id: 'pressure_hint',
        speaker: 'AI',
        content: "Soda factories use a physics trick — **high pressure!** 💨\n\nSqueezing gas at high pressure FORCES more CO₂ into the water, pushing past the normal saturation point.\n\nLet me crank up the pressure!",
        options: [
            { id: 'pressurize', label: "Pressurize it!", nextNodeId: 'high_pressure', simAction: { type: 'SET_VISUAL', payload: { pressure: 5, co2Level: 130 } } }
        ]
    },

    'high_pressure': {
        id: 'high_pressure',
        speaker: 'AI',
        content: "WHOOSH! Under high pressure, the CO₂ meter shot to 150%! Way past the normal limit! 🤯\n\nThe gas is squeezed into the liquid. This is how soda bottles are sealed — under pressure.\n\nNow... what happens when you OPEN the bottle?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'pressurized', co2Level: 130, pressure: 5, temperature: 15 } },
        options: [
            { id: 'open', label: "Open it! 🍾", nextNodeId: 'pressure_release', simAction: { type: 'SET_VISUAL', payload: { pressure: 1, co2Level: 80 } } }
        ]
    },

    'pressure_release': {
        id: 'pressure_release',
        speaker: 'AI',
        content: "💥 FIZZZZZZ! 🫧🫧🫧\n\nPressure dropped → the water can't hold all that CO₂ anymore → BUBBLES EVERYWHERE!\n\nThat's exactly what happens when you crack open a soda can. The dissolved CO₂ escapes as gas because the saturation point dropped with the pressure.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'fizz', co2Level: 80, pressure: 1, temperature: 15 } },
        options: [
            { id: 'checkpoint', label: "That's why warm soda is flatter!", nextNodeId: 'checkpoint_temp' }
        ]
    },

    'checkpoint_temp': {
        id: 'checkpoint_temp',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nI have two sealed bottles of soda:\n- Bottle A: in the fridge (cold) ❄️\n- Bottle B: left in the sun (warm) ☀️\n\nBoth have the same CO₂ inside. Which one will fizz MORE when opened?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'temp_compare' } },
        options: [
            { id: 'cold', label: "Warm one fizzes more!", nextNodeId: 'temp_correct', sentiment: 'positive' },
            { id: 'warm', label: "Cold one fizzes more!", nextNodeId: 'temp_wrong' }
        ]
    },

    'temp_wrong': {
        id: 'temp_wrong',
        speaker: 'AI',
        content: "Actually, the warm one fizzes more! 🤔\n\n**Warm water holds LESS dissolved gas** (lower saturation point). So when you open a warm soda, more CO₂ is above the limit and escapes as bubbles.\n\nCold soda stays fizzier because cold water can hold MORE CO₂.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'temp_reveal' } },
        options: [
            { id: 'continue', label: "Hot = less dissolved, more escapes!", nextNodeId: 'discovery' }
        ]
    },

    'temp_correct': {
        id: 'temp_correct',
        speaker: 'AI',
        content: "✅ Right! Warm water holds LESS dissolved gas. When you open a warm bottle, more CO₂ is \"over the limit\" and escapes as bubbles.\n\nCold soda stays fizzier because cold water can hold MORE CO₂ dissolved!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'temp_reveal' } },
        options: [
            { id: 'continue', label: "Temperature changes the saturation point!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n**Dissolving** is limited by the **saturation point**, which depends on:\n- **Pressure** — more pressure forces more stuff to dissolve\n- **Temperature** — cold liquids hold more dissolved gas\n\nThese same rules explain:\n- Why deep-sea divers get \"the bends\" 🤿\n- Why hot springs have fewer dissolved minerals\n- Why shaking soda makes it explode!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', co2Level: 50, pressure: 3, temperature: 20 } },
        options: [
            { id: 'complete', label: "Saturation is nature's limit!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 5 Across Disciplines!**\n\n- Physics (P5): Levers multiply force — distance is the secret ingredient\n- Chemistry (C5): Dissolving has a limit (saturation), but pressure & temperature can shift it\n- Biology (B5): Enzymes multiply reaction speed — tiny molecules, massive effect\n\nNature loves amplification — small inputs, big outputs! 🚀\n\n✅ **Lesson C5 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

