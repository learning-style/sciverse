import { DialogNode } from '../../types';

/**
 * P7 — Circuits & Current
 * Big Idea 7: "How Does Electricity Work?"
 * Scenario: "The Blackout Lab"
 * Target Misconception: "Electricity gets used up by the bulb"
 */
export const getP7Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "⚡ Welcome to the Physics Lab — but oh no, the **lights are out!** 🔦\n\nThere's been a power cut. On the bench you can see:\n- A **battery** 🔋\n- Some **wires** 🪢\n- A **light bulb** 💡\n\nCan you build a circuit to get the light back on? What do you think you need to connect?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', circuitComplete: false, bulb1On: false, bulb2On: false, bulb1Broken: false, bulb2Broken: false } },
        options: [
            { id: 'wire_bulb', label: "Connect the wire from the battery to the bulb!", nextNodeId: 'one_wire', sentiment: 'neutral' },
            { id: 'loop', label: "I think the wire needs to go from the battery, through the bulb, and back.", nextNodeId: 'loop_insight', sentiment: 'positive' },
            { id: 'just_battery', label: "Just hold the bulb against the battery?", nextNodeId: 'need_path', sentiment: 'negative' }
        ]
    },

    'one_wire': {
        id: 'one_wire',
        speaker: 'AI',
        content: "Good start! Let's try that — one wire from the battery to the bulb...\n\n💡 Hmm, nothing happened! The bulb stays dark. Electricity needs a **complete path** to flow. One wire going OUT isn't enough — it needs a way to come BACK.\n\nWhat if we add another wire?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'simple_circuit', circuitComplete: false } },
        options: [
            { id: 'add_return', label: "Add a wire going back to the battery!", nextNodeId: 'circuit_complete' }
        ]
    },

    'need_path': {
        id: 'need_path',
        speaker: 'AI',
        content: "Nice try, but that won't work well! Electricity needs a **clear path** made of wire to flow through. Just touching the battery won't create a proper circuit.\n\nThink of it like water in a pipe — you need a pipe connecting everything. Let's use wires to build a proper path!",
        options: [
            { id: 'use_wires', label: "Okay, let's connect wires properly!", nextNodeId: 'one_wire' }
        ]
    },

    'loop_insight': {
        id: 'loop_insight',
        speaker: 'AI',
        content: "Brilliant thinking! 🌟 You've already got the key idea — electricity needs to travel in a **loop**. That's actually what the word \"circuit\" means — it comes from \"circle\"!\n\nLet's connect it up: battery → wire → bulb → wire → back to battery...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'simple_circuit', circuitComplete: false } },
        options: [
            { id: 'complete_it', label: "Complete the circuit!", nextNodeId: 'circuit_complete' }
        ]
    },

    'circuit_complete': {
        id: 'circuit_complete',
        speaker: 'AI',
        content: "💡✨ The bulb lights up! You did it!\n\nSee the little dots moving around the circuit? Those represent **electric current** — tiny charged particles called **electrons** flowing through the wire.\n\nNotice something important: the electrons flow **out** of the battery, through the bulb, and **back into** the battery. They go around and around in a loop!\n\nHere's a big question: does the bulb **use up** the electricity?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'current_flow', circuitComplete: true, bulb1On: true } },
        options: [
            { id: 'used_up', label: "Yes — the bulb uses electricity to make light!", nextNodeId: 'misconception_used_up', sentiment: 'negative' },
            { id: 'not_used', label: "No — the electricity keeps flowing in the loop!", nextNodeId: 'correct_not_used', sentiment: 'positive' },
            { id: 'slows_down', label: "Maybe it slows down the electricity?", nextNodeId: 'partial_slows', sentiment: 'neutral' }
        ]
    },

    'misconception_used_up': {
        id: 'misconception_used_up',
        speaker: 'AI',
        content: "That's what most people think, but it's a **misconception!** 🔍\n\nWatch the electrons carefully — the SAME number come out of the bulb as go in. Nothing gets used up!\n\nWhat actually happens: the battery pushes electrons with **energy**. The bulb converts that energy into **light and heat**, but the electrons themselves keep going. It's like a water wheel — water spins the wheel but the water doesn't disappear!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'current_flow', showElectronCount: true } },
        options: [
            { id: 'got_it', label: "Oh! Energy is transferred, not used up!", nextNodeId: 'series_intro' }
        ]
    },

    'correct_not_used': {
        id: 'correct_not_used',
        speaker: 'AI',
        content: "Exactly right! ✅ The electrons aren't used up — they flow in a continuous loop.\n\nThe battery gives them **energy**, and the bulb **converts** that energy into light and heat. But the electrons themselves keep moving! It's like a water wheel — the water flows through and spins the wheel, but the water is still there.\n\nNow let's try something more interesting...",
        options: [
            { id: 'next', label: "What's next?", nextNodeId: 'series_intro' }
        ]
    },

    'partial_slows': {
        id: 'partial_slows',
        speaker: 'AI',
        content: "You're on the right track! The bulb does create **resistance** — it's harder for electrons to push through the thin filament. But they don't disappear!\n\nThe same number of electrons come out as go in. The bulb converts the electrons' **energy** into light and heat, but the electrons themselves keep circling.\n\nLet's explore what happens when we add MORE bulbs!",
        options: [
            { id: 'more_bulbs', label: "Add more bulbs!", nextNodeId: 'series_intro' }
        ]
    },

    'series_intro': {
        id: 'series_intro',
        speaker: 'AI',
        content: "Now let's add a **second bulb** in **SERIES** — that means one after the other, on the same single path.\n\n🔋 → 💡 → 💡 → 🔋\n\nBattery → Bulb 1 → Bulb 2 → back to Battery. There's only **one path** for the electrons!\n\nNotice anything about how bright the bulbs are compared to before?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'series', circuitComplete: true, bulb1On: true, bulb2On: true, circuitType: 'series' } },
        options: [
            { id: 'dimmer', label: "They're dimmer than before!", nextNodeId: 'series_dimmer', sentiment: 'positive' },
            { id: 'same', label: "They look the same to me.", nextNodeId: 'series_dimmer', sentiment: 'neutral' }
        ]
    },

    'series_dimmer': {
        id: 'series_dimmer',
        speaker: 'AI',
        content: "Right — both bulbs are **dimmer** now! 🔅\n\nWith two bulbs in series, the electrons have to push through MORE resistance. The battery's energy gets shared between both bulbs, so each one gets less.\n\nNow here's the dramatic part — what do you think happens if **Bulb 1 breaks**? 🤔",
        options: [
            { id: 'both_off', label: "Both go out — the loop is broken!", nextNodeId: 'series_break', sentiment: 'positive' },
            { id: 'one_stays', label: "Bulb 2 stays on, only Bulb 1 goes out.", nextNodeId: 'series_break_wrong', sentiment: 'negative' }
        ]
    },

    'series_break_wrong': {
        id: 'series_break_wrong',
        speaker: 'AI',
        content: "Let's test it! Breaking Bulb 1 now... 💥\n\n**Both bulbs went dark!** In series there's only ONE path. If any part breaks, the whole loop is broken and electrons can't flow ANYWHERE.\n\nThis is like old Christmas tree lights — one bulb burns out, the whole string goes dark! 🎄",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'series_break', bulb1Broken: true, bulb1On: false, bulb2On: false } },
        options: [
            { id: 'better_way', label: "That's annoying! Is there a better way?", nextNodeId: 'parallel_intro' }
        ]
    },

    'series_break': {
        id: 'series_break',
        speaker: 'AI',
        content: "Let's test your prediction! Breaking Bulb 1... 💥\n\n✅ **You're right!** Both bulbs went dark! In series there's only ONE path. Break it anywhere and the whole circuit stops.\n\nThis is why old Christmas tree lights were so frustrating — one bulb out, ALL dark! 🎄\n\nBut there's a smarter way to wire things...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'series_break', bulb1Broken: true, bulb1On: false, bulb2On: false } },
        options: [
            { id: 'smarter', label: "Show me the smarter way!", nextNodeId: 'parallel_intro' }
        ]
    },

    'parallel_intro': {
        id: 'parallel_intro',
        speaker: 'AI',
        content: "Meet the **PARALLEL circuit!** 🔀\n\nInstead of one path, the wire **splits into two branches** — each with its own bulb — then joins back together.\n\nIt's like a road with two lanes going around an island. Cars (electrons) can take EITHER lane!\n\nNotice the bulbs are **brighter** now — each one gets the battery's full push!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'parallel', circuitComplete: true, bulb1On: true, bulb2On: true, bulb1Broken: false, bulb2Broken: false, circuitType: 'parallel' } },
        options: [
            { id: 'break_one', label: "What happens if we break one bulb now?", nextNodeId: 'parallel_break' }
        ]
    },

    'parallel_break': {
        id: 'parallel_break',
        speaker: 'AI',
        content: "Breaking Bulb 1 in parallel... 💥\n\n💡 **Bulb 2 stays on!** The electrons can still flow through the other branch. It's like closing one lane on a road — traffic still flows on the other lane!\n\nThis is how your house is wired. Turning off one light doesn't turn off ALL the lights! 🏠",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'parallel_break', bulb1Broken: true, bulb1On: false, bulb2On: true } },
        options: [
            { id: 'checkpoint', label: "That makes so much sense!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nImagine you add a **3rd bulb** in SERIES with the original two (so three bulbs in a single loop).\n\nWhat will happen to the brightness of each bulb?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', circuitType: 'series', bulb1On: true, bulb2On: true, bulb1Broken: false, bulb2Broken: false, thirdBulb: true } },
        options: [
            { id: 'even_dimmer', label: "Even dimmer! More resistance, energy shared three ways.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'same_bright', label: "Same brightness — the battery adjusts.", nextNodeId: 'checkpoint_wrong', sentiment: 'negative' },
            { id: 'brighter', label: "Brighter — more bulbs = more light!", nextNodeId: 'checkpoint_wrong', sentiment: 'negative' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Not quite! The battery can't \"adjust\" — it always pushes with the same force.\n\nIn series, adding more bulbs means MORE resistance on the single path. The **same** amount of energy is now shared THREE ways instead of two.\n\nEach bulb gets **less** energy → **dimmer** light! Add enough bulbs in series and they'd barely glow at all. 🔅",
        options: [
            { id: 'understand', label: "So series = sharing energy, got it!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ Spot on! Each bulb in series adds more resistance, and the battery's energy is split THREE ways now.\n\nIf you kept adding bulbs in series, eventually they'd barely glow! That's why real buildings use **parallel wiring** — every device gets the full voltage from the source. 🏗️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', showDimDemo: true } },
        options: [
            { id: 'discovery', label: "Parallel is definitely smarter!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **You discovered the rules of circuits!**\n\n⚡ **Circuit** = a complete loop for electrons\n🔋 **Battery** = pushes electrons with energy\n💡 **Bulb** = converts energy to light (doesn't \"use up\" electrons!)\n\n**Series:** One path → shared energy → dimmer → one break stops all\n**Parallel:** Multiple paths → full energy each → one break, others survive\n\nReady for the cross-links?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'crosslinks', label: "Yes! How does this connect to other science?", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Links:**\n\n🧪 **Chemistry C7 — Batteries & Chemical Energy:** The battery works because of a chemical reaction inside! Chemicals react and push electrons out one end and pull them in the other. When the chemicals are used up, the battery \"dies.\"\n\n🧬 **Biology B7 — Nerve Signals:** Your body runs on electricity too! Nerve cells send tiny electrical signals at up to 120 m/s. Your brain is basically a biological circuit! 🧠⚡\n\n✅ **Lesson P7 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

