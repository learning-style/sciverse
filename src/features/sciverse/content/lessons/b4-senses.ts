import { DialogNode } from '../../types';

/**
 * B4 — Eyes, Ears, and Nerves: Your Body's Sensors
 * Big Idea 4: "How Do We Sense the World?"
 * Scenario: "Signal Relay Race"
 * Target Misconception: "You see with your eyes / hear with your ears" (ignoring the brain)
 */
export const getB4Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Neuroscience Lab! 🧠\n\nI've built two pathways on screen:\n- **Left:** Sound → Ear → Nerve → Brain\n- **Right:** Light → Eye → Nerve → Brain\n\nLet's trigger a sound and watch what happens inside your body!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', earPath: 'idle', eyePath: 'idle', nerveBlocked: false } },
        options: [
            { id: 'sound', label: "Play a sound!", nextNodeId: 'hear_sound', simAction: { type: 'SET_VISUAL', payload: { earPath: 'active' } } }
        ]
    },

    'hear_sound': {
        id: 'hear_sound',
        speaker: 'AI',
        content: "Watch the signal travel! 🔊\n\n1. A sound wave reaches the **ear** 👂\n2. The eardrum **vibrates**\n3. Those vibrations get converted into an **electrical signal** ⚡\n4. The signal races along a **nerve** (like a wire) to the brain\n5. The brain receives it → **\"HEARD!\"** 🧠✅",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'hearing', earPath: 'complete', showSignalDot: true } },
        options: [
            { id: 'realization', label: "So I don't hear with my ears?!", nextNodeId: 'brain_hears' },
            { id: 'eye_now', label: "Now try the eye!", nextNodeId: 'see_light' }
        ]
    },

    'brain_hears': {
        id: 'brain_hears',
        speaker: 'AI',
        content: "Your ear is just a **microphone**! 🎤 It detects the sound waves and converts them to electrical signals. But the actual \"hearing\" — understanding what the sound means — happens in your **BRAIN**.\n\nYour ear collects. Your brain interprets. Teamwork!",
        options: [
            { id: 'eye', label: "Does the eye work the same way?", nextNodeId: 'see_light' }
        ]
    },

    'see_light': {
        id: 'see_light',
        speaker: 'AI',
        content: "Now let's flash a light! 💡 Watch the right pathway...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'seeing', eyePath: 'active' } },
        options: [
            { id: 'flash', label: "Flash!", nextNodeId: 'see_result', simAction: { type: 'SET_VISUAL', payload: { eyePath: 'complete' } } }
        ]
    },

    'see_result': {
        id: 'see_result',
        speaker: 'AI',
        content: "Same idea! 👁️\n\n1. Light enters the **eye**\n2. The **lens** focuses it onto the **retina** (a screen of light detectors)\n3. The retina converts light into an **electrical signal** ⚡\n4. The signal races along the **optic nerve** to the brain\n5. Brain receives it → **\"SEEN!\"** 🧠✅\n\nThe eye is a camera. The brain is the photographer!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'seen', eyePath: 'complete' } },
        options: [
            { id: 'checkpoint', label: "Both sensors send electrical signals!", nextNodeId: 'checkpoint_nerve' }
        ]
    },

    'checkpoint_nerve': {
        id: 'checkpoint_nerve',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nWhat would happen if the nerve between your eye and your brain was **blocked** (cut or damaged)?",
        options: [
            { id: 'nothing', label: "You'd see nothing — blind.", nextNodeId: 'nerve_correct', sentiment: 'positive' },
            { id: 'still_see', label: "Your eye would still see, but you wouldn't know.", nextNodeId: 'nerve_interesting' }
        ]
    },

    'nerve_interesting': {
        id: 'nerve_interesting',
        speaker: 'AI',
        content: "Interesting thought! 🤔 The eye's lens would still focus light and the retina would still react. But \"seeing\" requires the brain to RECEIVE and INTERPRET the signal. Without the nerve connection, the signal never arrives.\n\nLet me demonstrate with the **Block Nerve** button!",
        options: [
            { id: 'block', label: "Block the nerve!", nextNodeId: 'nerve_demo', simAction: { type: 'SET_VISUAL', payload: { nerveBlocked: true } } }
        ]
    },

    'nerve_correct': {
        id: 'nerve_correct',
        speaker: 'AI',
        content: "Let's verify! I'll block the nerve and try sending a signal...",
        options: [
            { id: 'block', label: "Block the nerve!", nextNodeId: 'nerve_demo', simAction: { type: 'SET_VISUAL', payload: { nerveBlocked: true } } }
        ]
    },

    'nerve_demo': {
        id: 'nerve_demo',
        speaker: 'AI',
        content: "The signal started at the eye... traveled along the nerve... and **STOPPED!** 🛑\n\nThe \"SEEN!\" label never appeared. The eye detected light, but the brain never got the message. No brain reception = no experience of seeing.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'blocked', eyePath: 'blocked', showBlockPoint: true } },
        options: [
            { id: 'unblock', label: "That's wild. Unblock it!", nextNodeId: 'speed_intro', simAction: { type: 'SET_VISUAL', payload: { nerveBlocked: false } } }
        ]
    },

    'speed_intro': {
        id: 'speed_intro',
        speaker: 'AI',
        content: "Now check the **Signal Travel Time** bar. ⏱️\n\nNerve signals travel at about **100 meters per second**. That sounds fast, but it's NOT instant!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'speed', showTravelTime: true, nerveBlocked: false } },
        options: [
            { id: 'why', label: "Is that why I flinch AFTER I feel pain?", nextNodeId: 'reflex_explain' },
            { id: 'compare', label: "How fast compared to sound?", nextNodeId: 'speed_compare' }
        ]
    },

    'reflex_explain': {
        id: 'reflex_explain',
        speaker: 'AI',
        content: "EXACTLY! 💡 When you touch something hot, the pain signal has to travel from your finger, up your arm, to your spinal cord, and to your brain. That takes a fraction of a second!\n\nYour body actually has a shortcut called a **reflex arc** — your spinal cord pulls your hand away BEFORE the pain signal even reaches your brain!",
        options: [
            { id: 'discovery', label: "My body pulls away before I even feel it?!", nextNodeId: 'discovery' }
        ]
    },

    'speed_compare': {
        id: 'speed_compare',
        speaker: 'AI',
        content: "- Nerve signals: ~100 m/s\n- Sound: ~343 m/s (3x faster!)\n- Light: ~300,000,000 m/s (3 MILLION times faster!)\n\nThat's why you see lightning before you hear thunder — light arrives almost instantly, but sound takes its time.",
        options: [
            { id: 'discovery', label: "Light is absurdly fast!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\nYour senses work like this:\n\n1. **Physics** creates the signal (sound wave, light wave)\n2. **Your body's sensors** (ears, eyes) detect and CONVERT it to electrical impulses\n3. **Nerves** carry the signal to the brain\n4. **Your brain** creates the experience (hearing, seeing)\n\nWithout the brain, sensors are useless. Without sensors, the brain is deaf and blind!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showFullChain: true } },
        options: [
            { id: 'crosslink', label: "Sensors + brain = experience!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 4 Complete!**\n- Physics (P4) gave us waves (sound = pressure wave)\n- Chemistry (C4) gave us light and color (light = electromagnetic wave)\n- Biology (B4) built detectors (ears, eyes) and wiring (nerves) to translate those waves into experience\n\nAll three sciences explain the single act of hearing a bird sing! 🐦\n\n✅ **Lesson B4 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

