import { DialogNode } from '../../types';

/**
 * C7 — Batteries & Chemical Energy
 * Big Idea 7: "How Does Electricity Work?"
 * Scenario: "The Lemon Battery"
 * Target Misconception: "Batteries create electricity from nothing"
 */
export const getC7Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Electrochemistry Lab! ????\n\nI have a lemon, a zinc nail, and a copper penny. Can we make a battery out of FRUIT?\n\nBut first — where do you think battery energy comes from?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'from_nothing', label: "Batteries just make electricity inside them.", nextNodeId: 'misconception_nothing', sentiment: 'negative' },
            { id: 'from_chemicals', label: "Maybe it comes from chemicals?", nextNodeId: 'good_guess', sentiment: 'positive' },
            { id: 'from_metal', label: "From the metal inside?", nextNodeId: 'partial_metal', sentiment: 'neutral' }
        ]
    },

    'misconception_nothing': {
        id: 'misconception_nothing',
        speaker: 'AI',
        content: "That's what a lot of people think! But energy can't come from nothing — that would break one of the biggest rules in science: **energy is never created or destroyed**, only transformed.\n\nBatteries are actually little **chemistry factories**. They convert **chemical energy** into **electrical energy**. Let's prove it with a lemon! ??",
        options: [
            { id: 'show_me', label: "A lemon can make electricity?!", nextNodeId: 'lemon_setup' }
        ]
    },

    'good_guess': {
        id: 'good_guess',
        speaker: 'AI',
        content: "Great thinking! ? You're on the right track.\n\nBatteries store energy in **chemicals**. When those chemicals react, they release energy as electricity. It's a conversion: **chemical energy ? electrical energy**.\n\nLet's see this in action — with a LEMON! ??",
        options: [
            { id: 'build_it', label: "Let's build a lemon battery!", nextNodeId: 'lemon_setup' }
        ]
    },

    'partial_metal': {
        id: 'partial_metal',
        speaker: 'AI',
        content: "You're partly right! The metals play an important role — but they don't provide the energy by themselves.\n\nYou need **two different metals** AND a liquid that can carry ions (an **electrolyte**). The energy comes from a **chemical reaction** between them.\n\nLet's build one and see!",
        options: [
            { id: 'lets_go', label: "Let's do it!", nextNodeId: 'lemon_setup' }
        ]
    },

    'lemon_setup': {
        id: 'lemon_setup',
        speaker: 'AI',
        content: "?? **Building a Lemon Battery**\n\nHere's what we need:\n- ?? A lemon (the juice inside is acidic — it's our **electrolyte**)\n- ?? A zinc nail (this is the **anode**, the - side)\n- ?? A copper penny (this is the **cathode**, the + side)\n\nLet's stick them into the lemon and see what happens!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'lemon_setup' } },
        options: [
            { id: 'inserted', label: "Both are in the lemon. Now what?", nextNodeId: 'reaction' }
        ]
    },

    'reaction': {
        id: 'reaction',
        speaker: 'AI',
        content: "?? **A chemical reaction starts!**\n\nThe lemon juice (citric acid) attacks the zinc nail. Zinc atoms lose electrons and dissolve as **zinc ions** (Zn²?) into the juice.\n\nThose freed electrons are desperate to move — but they can't travel through the juice. They need a wire! ??\n\nThis is the key: **chemical reaction ? free electrons ? electricity!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'reaction' } },
        options: [
            { id: 'wire', label: "Connect a wire between the metals!", nextNodeId: 'electron_flow' }
        ]
    },

    'electron_flow': {
        id: 'electron_flow',
        speaker: 'AI',
        content: "? **Electrons are flowing!**\n\nThe electrons travel from the zinc (-) through the wire to the copper (+). That flow of electrons IS electricity — electric current!\n\nMeanwhile, inside the lemon, positive ions flow through the juice to complete the circuit.\n\nLook — the tiny LED is glowing! ?? Our lemon is making about 0.9 volts!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'electron_flow', ledOn: true } },
        options: [
            { id: 'real_battery', label: "Is a real battery the same idea?", nextNodeId: 'real_battery' }
        ]
    },

    'real_battery': {
        id: 'real_battery',
        speaker: 'AI',
        content: "?? **Inside a Real Battery**\n\nSame idea, better chemicals!\n\n| Part | Lemon Battery | AA Battery |\n|------|--------------|------------|\n| Anode (-) | Zinc nail | Zinc paste |\n| Cathode (+) | Copper penny | Carbon rod |\n| Electrolyte | Lemon juice | Chemical paste |\n\nThe chemistry is stronger, so a real battery gives ~1.5V instead of ~0.9V. But the PRINCIPLE is identical: **chemical reaction ? electron flow**.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'real_battery' } },
        options: [
            { id: 'charging', label: "Can you put the energy back?", nextNodeId: 'charging' },
            { id: 'checkpoint', label: "What happens when chemicals run out?", nextNodeId: 'checkpoint' }
        ]
    },

    'charging': {
        id: 'charging',
        speaker: 'AI',
        content: "?? **Rechargeable Batteries!**\n\nIn some batteries (like lithium-ion in phones), you can push electricity BACKWARDS through the battery. This **reverses the chemical reaction**, restoring the original chemicals!\n\nCharging = electrical energy ? chemical energy\nUsing = chemical energy ? electrical energy\n\nIt's the same conversion, just running in reverse! ??",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'charging' } },
        options: [
            { id: 'to_checkpoint', label: "But what if you CAN'T recharge?", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "?? **Prediction Time!**\n\nOur lemon battery has been running for a while. The zinc nail is slowly dissolving. What do you think happens when the zinc is all used up?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'dies', label: "The battery dies — no more chemical fuel!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'keeps_going', label: "It keeps going somehow.", nextNodeId: 'checkpoint_wrong', sentiment: 'negative' },
            { id: 'weaker', label: "It gets weaker and weaker.", nextNodeId: 'checkpoint_partial', sentiment: 'neutral' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "? Exactly! When the zinc runs out, the chemical reaction stops, and no more electrons flow. The battery is **dead**.\n\nThis proves batteries DON'T create energy from nothing — they convert stored chemical energy. When the chemicals are used up, the energy is gone!",
        options: [
            { id: 'discovery', label: "So batteries are like fuel tanks!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "If there's no zinc left to react, there's no chemical reaction, and no electrons are freed. The current stops completely!\n\nBatteries are like fuel tanks — the chemicals ARE the fuel. No fuel = no energy. This is why batteries eventually die. ??",
        options: [
            { id: 'got_it', label: "Oh, the chemicals ARE the fuel!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_partial': {
        id: 'checkpoint_partial',
        speaker: 'AI',
        content: "You're partly right! As the zinc gets used up, there IS less reaction happening, so the voltage drops. But eventually it stops completely — no zinc, no reaction, no electricity.\n\nThat's why your TV remote gets dim before it dies! ??",
        options: [
            { id: 'makes_sense', label: "Makes sense — chemicals = fuel!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "?? **Discovery: Batteries Convert Chemical Energy!**\n\n| What | How |\n|------|-----|\n| Energy source | Chemical reactions between metals + electrolyte |\n| Anode (-) | Loses electrons (zinc dissolves) |\n| Cathode (+) | Gains electrons (copper collects them) |\n| Electrolyte | Carries ions to complete the circuit |\n| Battery dies | When chemicals are used up |\n| Recharging | Reverses the reaction (some batteries) |\n\n?? **Cross-link to P7:** The battery is the \"pump\" that pushes electrons through a circuit! Without it, there's no current flow.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'finish', label: "Chemistry powers electricity!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "?? **Cross-Links:**\n- **P7 (Circuits & Current):** The battery is the energy SOURCE that pushes electrons around a circuit — like a water pump pushing water through pipes!\n- **B7 (Nerve Signals):** Your body's cells make tiny voltage differences using ions too — that's how your nerves send signals! ???\n\n? **Lesson C7 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});
