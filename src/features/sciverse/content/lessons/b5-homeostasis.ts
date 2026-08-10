import { DialogNode } from '../../types';

/**
 * B5 — Homeostasis: Your Body's Thermostat
 * Big Idea 5: "How Can a Small Force Do a Big Job?"
 * Scenario: "Body Temperature Challenge"
 * Target Misconception: "Body temperature is always exactly 37°C"
 */
export const getB5Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Body Control Center! 🌡️\n\nYour body has a target temperature: around **37°C** (98.6°F). But the outside world changes constantly — scorching sun ☀️, freezing wind ❄️.\n\nI've set up a body temperature simulator. Let's see how your body keeps its cool (literally)!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', bodyTemp: 37, envTemp: 22, sweating: false, shivering: false, zone: 'safe' } },
        options: [
            { id: 'hot', label: "Make it HOT outside! ☀️", nextNodeId: 'heat_challenge', simAction: { type: 'SET_VISUAL', payload: { envTemp: 40 } } },
            { id: 'cold', label: "Make it COLD outside! ❄️", nextNodeId: 'cold_challenge', simAction: { type: 'SET_VISUAL', payload: { envTemp: 5 } } }
        ]
    },

    'heat_challenge': {
        id: 'heat_challenge',
        speaker: 'AI',
        content: "The outside temp jumped to 40°C! ☀️🔥\n\nYour body temperature is rising... 37.2... 37.4...\n\nBUT WAIT — **sweat glands** activated! 💦 Tiny drops of water appear on your skin.\n\nAs the sweat evaporates, it **absorbs heat** from your skin, cooling you down. Body temp stabilizing at 37.1°C!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'hot', bodyTemp: 37.1, envTemp: 40, sweating: true, bloodVessels: 'dilated' } },
        options: [
            { id: 'more', label: "What else is happening?", nextNodeId: 'heat_details' },
            { id: 'try_cold', label: "Now try cold!", nextNodeId: 'cold_challenge', simAction: { type: 'SET_VISUAL', payload: { envTemp: 5, sweating: false } } }
        ]
    },

    'heat_details': {
        id: 'heat_details',
        speaker: 'AI',
        content: "Your body has MULTIPLE cooling tricks:\n\n1. **Sweating** — evaporation removes heat (chemistry!)\n2. **Blood vessels dilate** (widen) — more blood flows near the skin surface to release heat\n3. **You feel thirsty** — brain tells you to drink water to replace lost sweat\n\nAll happening AUTOMATICALLY. You don't choose to sweat!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'heat_detail', showCoolingMechanisms: true } },
        options: [
            { id: 'cold', label: "Let's try freezing cold!", nextNodeId: 'cold_challenge', simAction: { type: 'SET_VISUAL', payload: { envTemp: 5, sweating: false } } }
        ]
    },

    'cold_challenge': {
        id: 'cold_challenge',
        speaker: 'AI',
        content: "BRRR! 🥶 Outside temp dropped to 5°C!\n\nBody temp dipping... 36.8... 36.6...\n\nBUT WAIT — **muscles start shivering!** Each tiny shiver is a muscle contraction that generates **HEAT**. And your blood vessels **narrow** to keep warm blood deep inside.\n\nBody temp recovering to 36.9°C!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cold', bodyTemp: 36.9, envTemp: 5, shivering: true, bloodVessels: 'constricted', sweating: false } },
        options: [
            { id: 'checkpoint', label: "So the body fights back automatically!", nextNodeId: 'checkpoint_feedback' }
        ]
    },

    'checkpoint_feedback': {
        id: 'checkpoint_feedback',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nThis automatic fighting-back system has a name. It works like a thermostat in your house:\n- Too hot → turn on AC (sweat)\n- Too cold → turn on heater (shiver)\n- Just right → do nothing\n\nThis cycling process is called a **feedback loop**. What type?",
        options: [
            { id: 'positive', label: "Positive feedback — it amplifies!", nextNodeId: 'feedback_wrong' },
            { id: 'negative', label: "Negative feedback — it corrects!", nextNodeId: 'feedback_correct', sentiment: 'positive' }
        ]
    },

    'feedback_wrong': {
        id: 'feedback_wrong',
        speaker: 'AI',
        content: "Close, but this is actually **negative feedback**! 🔄\n\n\"Negative\" doesn't mean bad — it means the body **opposes** the change:\n- Getting hot? → Cool down (oppose the warming)\n- Getting cold? → Warm up (oppose the cooling)\n\nPositive feedback would AMPLIFY the change (like a fever spiraling out of control — that's dangerous!).",
        options: [
            { id: 'continue', label: "Negative feedback = correction!", nextNodeId: 'misconception_time' }
        ]
    },

    'feedback_correct': {
        id: 'feedback_correct',
        speaker: 'AI',
        content: "✅ Exactly! **Negative feedback** means the system **opposes** the change — pushing back toward the target.\n\nIt's called \"negative\" because it NEGATES (reverses) the disturbance, not because it's bad!",
        options: [
            { id: 'continue', label: "The body is always self-correcting!", nextNodeId: 'misconception_time' }
        ]
    },

    'misconception_time': {
        id: 'misconception_time',
        speaker: 'AI',
        content: "⚡ **Misconception Busted!**\n\nYour body temperature is NOT always exactly 37°C!\n\nIt constantly **fluctuates** — a little up, a little down — and the feedback loop keeps pulling it back. It's more like 36.5–37.5°C.\n\nWatch the temperature graph — it wiggles like a wave, not a flat line!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'misconception', showTempGraph: true, showFluctuation: true } },
        options: [
            { id: 'name', label: "Does this have a name?", nextNodeId: 'homeostasis_name' }
        ]
    },

    'homeostasis_name': {
        id: 'homeostasis_name',
        speaker: 'AI',
        content: "This is **HOMEOSTASIS** (homeo = same, stasis = standing still).\n\n🏠 It means keeping your internal environment **stable** — not perfectly constant, but stable enough for your cells to work.\n\nYour body maintains homeostasis for:\n- Temperature (~37°C)\n- Blood sugar levels\n- Water balance\n- Blood pH\n- Oxygen levels",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'homeostasis', showHomeostasisList: true } },
        options: [
            { id: 'enzyme', label: "Why does temperature matter so much?", nextNodeId: 'enzyme_link' }
        ]
    },

    'enzyme_link': {
        id: 'enzyme_link',
        speaker: 'AI',
        content: "Because of **ENZYMES** — the tiny molecular machines that run every chemical reaction in your body! 🧬\n\nEnzymes only work properly in a narrow temperature range. Too hot → they **denature** (unfold and break). Too cold → they slow to a crawl.\n\n37°C is the Goldilocks zone where your enzymes are fastest!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'enzyme', showEnzymeActivity: true } },
        options: [
            { id: 'discovery', label: "So homeostasis protects enzymes!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n**Homeostasis** = your body's automatic control system.\n\nIt uses **negative feedback loops** to oppose changes and keep conditions stable:\n- Sensors detect a change\n- Control center (brain) decides what to do\n- Effectors (muscles, glands) carry out the fix\n\nThis cycle repeats every second of your life!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showFeedbackDiagram: true } },
        options: [
            { id: 'complete', label: "The body is an incredible machine!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 5 Complete — Small Inputs, Big Control!**\n\n- Physics (P5): Levers multiply force with distance (torque)\n- Chemistry (C5): Pressure & temperature shift dissolving limits (saturation)\n- Biology (B5): Tiny feedback signals maintain the entire body's stability (homeostasis)\n\nIn all three: a small, clever action controls a much bigger system! 🎯\n\n✅ **Lesson B5 Complete! All 15 Sciverse lessons done!** 🎓",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

