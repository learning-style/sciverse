import { DialogNode } from '../../types';

/**
 * P4 — Sound Waves: Seeing the Invisible
 * Big Idea 4: "How Do We Sense the World?"
 * Scenario: "The Vibrating Speaker"
 * Target Misconception: "Sound travels as wind / air moves from speaker to ear"
 */
export const getP4Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Wave Lab! 🔊\n\nI've set up a **speaker**, a tube filled with air particles (shown as dots), and a **microphone** at the other end.\n\nI'm going to tap the speaker cone ONCE. Watch the particles carefully!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', particles: 'even', waveActive: false } },
        options: [
            { id: 'tap', label: "Tap the speaker!", nextNodeId: 'single_pulse', simAction: { type: 'SET_VISUAL', payload: { waveActive: true, waveType: 'pulse' } } }
        ]
    },

    'single_pulse': {
        id: 'single_pulse',
        speaker: 'AI',
        content: "See that? 👀 The first particle bumped the second, the second bumped the third, and so on — a wave of bumps traveled from the speaker to the microphone!\n\nBut here's the key: **NO particle traveled all the way across!** Each one just nudged its neighbor and bounced back.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'pulse_done', showPath: true } },
        options: [
            { id: 'dominoes', label: "Like dominoes!", nextNodeId: 'dominoes_yes', sentiment: 'positive' },
            { id: 'not_wind', label: "So sound isn't wind?", nextNodeId: 'not_wind', sentiment: 'positive' }
        ]
    },

    'dominoes_yes': {
        id: 'dominoes_yes',
        speaker: 'AI',
        content: "Perfect analogy! 🎯 Each domino knocks over the next one, but the first domino doesn't travel to the end of the line.\n\nThe **wave** carries the energy forward. The **particles** stay in place (mostly). Sound is a traveling disturbance, not traveling air!",
        options: [
            { id: 'continuous', label: "What about continuous sound?", nextNodeId: 'continuous_intro' }
        ]
    },

    'not_wind': {
        id: 'not_wind',
        speaker: 'AI',
        content: "Exactly! 🌬️ Wind physically MOVES air from one place to another. Sound moves THROUGH air without carrying it along.\n\nThe energy travels. The medium (air) just vibrates in place.",
        options: [
            { id: 'continuous', label: "What does music look like then?", nextNodeId: 'continuous_intro' }
        ]
    },

    'continuous_intro': {
        id: 'continuous_intro',
        speaker: 'AI',
        content: "Now let's play a continuous tone! I'm unlocking the **Frequency Slider** (that controls the pitch — how high or low the sound is).\n\nStart with a LOW frequency and watch the pattern!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'frequency', freqSliderUnlocked: true, frequency: 2, playing: true } },
        options: [
            { id: 'low', label: "Playing low frequency...", nextNodeId: 'low_result', simAction: { type: 'SET_VISUAL', payload: { frequency: 2, playing: true } } }
        ]
    },

    'low_result': {
        id: 'low_result',
        speaker: 'AI',
        content: "See the pattern? Particles bunch together (compression) then spread apart (rarefaction), slowly and widely.\n\nNow slide to HIGH frequency!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'low_shown', showCompressions: true } },
        options: [
            { id: 'high', label: "Sliding to high frequency!", nextNodeId: 'checkpoint_freq', simAction: { type: 'SET_VISUAL', payload: { frequency: 7 } } }
        ]
    },

    'checkpoint_freq': {
        id: 'checkpoint_freq',
        speaker: 'AI',
        content: "⏸️ **Quick Check:**\n\nA higher pitch means the particles are bunching together more _____ or less _____?",
        options: [
            { id: 'more', label: "More frequently — bunches come faster!", nextNodeId: 'freq_correct', sentiment: 'positive' },
            { id: 'less', label: "Less frequently.", nextNodeId: 'freq_hint' }
        ]
    },

    'freq_hint': {
        id: 'freq_hint',
        speaker: 'AI',
        content: "Watch the high-frequency animation again — the wave peaks come much faster than before, right? That's what \"frequency\" means — how many wave peaks per second!",
        options: [
            { id: 'more', label: "Oh! More peaks per second = higher pitch!", nextNodeId: 'freq_correct' }
        ]
    },

    'freq_correct': {
        id: 'freq_correct',
        speaker: 'AI',
        content: "✅ **Frequency** = how many wave peaks per second.\n- More peaks = higher pitch 🎵\n- Fewer peaks = lower pitch 🎶\n\nNow let's explore VOLUME! I'm unlocking the **Amplitude Slider**.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'amplitude_ready', ampSliderUnlocked: true } },
        options: [
            { id: 'loud', label: "Crank up the volume!", nextNodeId: 'amplitude_result', simAction: { type: 'SET_VISUAL', payload: { amplitude: 90 } } }
        ]
    },

    'amplitude_result': {
        id: 'amplitude_result',
        speaker: 'AI',
        content: "The particles are pushing their neighbors **much harder** now! The compressions are tighter, the spreads are wider. Same frequency (pitch), but bigger pushes.\n\n**Louder sound = particles pushing harder = bigger amplitude!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'amplitude_shown', showAmplitude: true } },
        options: [
            { id: 'summary', label: "Frequency = pitch, Amplitude = volume!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **You've decoded sound!**\n\nSound is a **pressure wave** — particles bumping their neighbors in a chain.\n\n- **Frequency** → pitch (high or low)\n- **Amplitude** → volume (loud or soft)\n- The particles themselves just jiggle back and forth in place!\n\nNo air travels from a guitar to your ear — only the wave energy does. 🎸",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery', showSummary: true } },
        options: [
            { id: 'crosslink', label: "Sound = pressure wave!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** In Chemistry (C4), you'll see that LIGHT works completely differently — it doesn't need particles at all! It can travel through empty space.\n\nIn Biology (B4), you'll discover how your ear turns these pressure bumps into electrical signals your brain can understand. 🧠\n\n✅ **Lesson P4 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

