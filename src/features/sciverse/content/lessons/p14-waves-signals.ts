import { DialogNode } from '../../types';

/**
 * P14 — Waves & Signals
 * Big Idea 14: "How Is Information Coded and Transmitted?"
 * Scenario: Oscilloscope showing wave properties and digital encoding
 * Target Misconception: "Digital = no waves / digital signals are not physical waves"
 */
export const getP14Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Wave & Signal Lab! 📡\n\nLook at the oscilloscope display — it's showing a wave traveling from left to right. This could be a sound wave, radio wave, or electrical signal.\n\nHere's a classic question: which do you think travels faster — light (electromagnetic wave) or sound?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', waveType: 'sine', frequency: 2, amplitude: 50 } },
        options: [
            { id: 'light', label: "Light — about 300,000 km/second!", nextNodeId: 'correct_light', sentiment: 'positive' },
            { id: 'sound', label: "Sound — you can hear explosions before you see the flash.", nextNodeId: 'misconception_sound', sentiment: 'negative' },
            { id: 'same', label: "They travel at the same speed.", nextNodeId: 'hint_speed', sentiment: 'neutral' }
        ]
    },

    'misconception_sound': {
        id: 'misconception_sound',
        speaker: 'AI',
        content: "Actually it's the other way around — you see things before you hear them! ⚡\n\nThink of lightning: you see the flash instantly, then hear the thunder seconds later. Light reaches you at **300,000 km/s**, sound travels at just **0.34 km/s** — light is nearly a million times faster!",
        options: [
            { id: 'thunder', label: "Of course — thunder comes after lightning! Light wins.", nextNodeId: 'correct_light' }
        ]
    },

    'hint_speed': {
        id: 'hint_speed',
        speaker: 'AI',
        content: "They travel through VERY different mechanisms! Sound is a pressure wave that needs matter. Light is an electromagnetic wave that travels through vacuum at the ultimate speed limit — 300,000 km/s. 🌌",
        options: [
            { id: 'light_faster', label: "Light is much faster — it doesn't need matter to travel!", nextNodeId: 'correct_light' }
        ]
    },

    'correct_light': {
        id: 'correct_light',
        speaker: 'AI',
        content: "Exactly! Light travels at ~300,000 km/s — the absolute speed limit of the universe.\n\nNow let's look at wave properties on the oscilloscope:\n\n📏 **Amplitude** = wave height (loudness for sound, brightness for light)\n⏱️ **Frequency** = waves per second in Hz🔄 **Wavelength** = distance between peaks\n\nTry the **Frequency slider** — notice how wavelength and frequency are inversely related!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'wave_properties', showLabels: true, showFreqSlider: true } },
        options: [
            { id: 'higher_freq', label: "Higher frequency = shorter wavelength — more squished together!", nextNodeId: 'amplitude_demo' }
        ]
    },

    'amplitude_demo': {
        id: 'amplitude_demo',
        speaker: 'AI',
        content: "Perfectly observed! **Wave speed = frequency × wavelength**. If speed is constant (like in the same medium), they trade off.\n\nNow adjust the **Amplitude** slider. What changes about the wave?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'amplitude', showAmpSlider: true } },
        options: [
            { id: 'taller', label: "It gets taller — the peaks are higher.", nextNodeId: 'digital_intro' }
        ]
    },

    'digital_intro': {
        id: 'digital_intro',
        speaker: 'AI',
        content: "Right! Amplitude = energy/intensity. Now here's where it gets modern:\n\nYour phone uses **digital signals** — 1s and 0s. But here's the thing a lot of people miss: those 1s and 0s are still transmitted as **physical waves**. The wave just switches between two amplitudes (high = 1, low = 0).\n\nSwitch the oscilloscope to **Digital mode** in the sim — see the square wave!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'digital', waveType: 'square', showDigitalMode: true } },
        options: [
            { id: 'saw_digital', label: "It's a square wave — ON/OFF pattern = 1s and 0s!", nextNodeId: 'encoding' }
        ]
    },

    'encoding': {
        id: 'encoding',
        speaker: 'AI',
        content: "Exactly! Let's encode a letter:\n\nThe letter **'A'** in ASCII is the number 65, which in binary is **01000001**. That's 8 ON/OFF pulses transmitted as 8 wave peaks/valleys.\n\nTry the **Text Encoder** at the bottom of the sim — type a letter and watch it become a wave pattern! 📱",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'encoder', showTextEncoder: true } },
        options: [
            { id: 'encoded', label: "I see my letter turned into a wave pattern on the oscilloscope!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **Waves & Signals Mastered:**\n\n✅ Light (300,000 km/s) >> Sound (0.34 km/s)\n✅ Wave speed = frequency × wavelength\n✅ Amplitude = energy/intensity; frequency = pitch/color\n✅ Digital signals are still physical waves — just two-state (square waves)\n✅ Binary encoding: every letter, image, and video is waves\n✅ All information transmission = waves!\n\n**Scale:** 5G waves are 1-10mm wavelength; gamma rays are 0.000001mm!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [{ id: 'done', label: "Waves are everywhere! Let me learn more.", nextNodeId: 'done' }]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Signal master! 📡\n\nConnect to **C14 (Chemical Bonding)** to see how molecular bonds are waves too, or **B14 (DNA & Genetics)** to learn how DNA encodes information at the molecular level!",
        options: []
    }
});
