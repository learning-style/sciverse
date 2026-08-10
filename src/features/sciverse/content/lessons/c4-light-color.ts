import { DialogNode } from '../../types';

/**
 * C4 — Light & Color: Why Is the Sky Blue?
 * Big Idea 4: "How Do We Sense the World?"
 * Scenario: "The Prism Lab"
 * Target Misconception: "Objects are inherently colored"
 */
export const getC4Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Light Lab! 🌈\n\nI've got a beam of what looks like plain **white light** and a glass **prism** (that triangular block).\n\nWatch what happens when the white light enters the prism!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', showPrism: true, lightActive: false } },
        options: [
            { id: 'shine', label: "Shine the light through!", nextNodeId: 'rainbow', simAction: { type: 'SET_VISUAL', payload: { lightActive: true, showRainbow: true } } }
        ]
    },

    'rainbow': {
        id: 'rainbow',
        speaker: 'AI',
        content: "🌈 WHOA! The white light split into a RAINBOW!\n\n**White light isn't really white** — it's ALL colors mixed together! The prism separates them because each color has a different **wavelength** (wave size).\n\nRed = long waves. Violet = short waves.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'rainbow', showSpectrum: true } },
        options: [
            { id: 'rain', label: "Like a rainbow after rain!", nextNodeId: 'rain_prisms' },
            { id: 'wavelength', label: "What's wavelength?", nextNodeId: 'wavelength_explain' }
        ]
    },

    'rain_prisms': {
        id: 'rain_prisms',
        speaker: 'AI',
        content: "Exactly! 🌧️🌈 Raindrops act like tiny prisms. Each raindrop splits sunlight into its spectrum. Millions of them together create that arc of color in the sky!\n\nNow let's figure out something: why are objects different colors?",
        options: [
            { id: 'apple', label: "Why is an apple red?", nextNodeId: 'apple_experiment' }
        ]
    },

    'wavelength_explain': {
        id: 'wavelength_explain',
        speaker: 'AI',
        content: "**Wavelength** is the distance from one wave peak to the next — like measuring how wide each ripple is. 🌊\n\nEach color of light has a different wavelength:\n- 🔴 Red = **long** wavelength (~700 nm)\n- 🟣 Violet = **short** wavelength (~400 nm)\n- Everything else is in between!\n\nShorter wavelength means higher **frequency** (more peaks per second) — just like sound (P4), where higher frequency = higher pitch. For light, higher frequency = more violet, lower frequency = more red.\n\nNow let's find out why things look colored.",
        options: [
            { id: 'apple', label: "So why is an apple red?", nextNodeId: 'apple_experiment' }
        ]
    },

    'apple_experiment': {
        id: 'apple_experiment',
        speaker: 'AI',
        content: "I'm shining **white light** (all colors) on a red apple. 🍎\n\nWatch what happens to each color when it hits the apple's surface...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'apple', showApple: true, lightColor: 'white' } },
        options: [
            { id: 'absorbed', label: "It absorbed everything except red!", nextNodeId: 'absorption_correct' }
        ]
    },

    'absorption_correct': {
        id: 'absorption_correct',
        speaker: 'AI',
        content: "✅ The apple isn't \"red\" in the way you might think! It **absorbs** every color of light EXCEPT red, and **reflects** the red back to your eyes.\n\nYour brain sees the reflected red light and says \"that's a red apple!\"\n\nNow here's a tricky question...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'absorption_explained', showApple: true, lightColor: 'white' } },
        options: [
            { id: 'checkpoint', label: "Hit me with it!", nextNodeId: 'checkpoint_blue' }
        ]
    },

    'checkpoint_blue': {
        id: 'checkpoint_blue',
        speaker: 'AI',
        content: "⏸️ **Prediction Time!**\n\nIf I shine ONLY **blue light** on the red apple (no other colors), what color will the apple look?",
        options: [
            { id: 'still_red', label: "Red — apples are always red.", nextNodeId: 'blue_wrong_red' },
            { id: 'blue', label: "Blue — it'll reflect whatever light hits it.", nextNodeId: 'blue_wrong_blue' },
            { id: 'dark', label: "Black/dark — it can't reflect blue.", nextNodeId: 'blue_correct', sentiment: 'positive' }
        ]
    },

    'blue_wrong_red': {
        id: 'blue_wrong_red',
        speaker: 'AI',
        content: "But there's NO red light to reflect! Remember — the apple can only reflect red. If there's no red light in the room, there's nothing for it to bounce back to your eyes.\n\nLet's test it!",
        options: [
            { id: 'test', label: "Shine only blue light!", nextNodeId: 'blue_demo', simAction: { type: 'SET_VISUAL', payload: { showApple: true, lightColor: '#3b82f6' } } }
        ]
    },

    'blue_wrong_blue': {
        id: 'blue_wrong_blue',
        speaker: 'AI',
        content: "Hmm — does the apple reflect blue light? We saw it ABSORBS blue... Let's test and see what happens!",
        options: [
            { id: 'test', label: "Shine only blue light!", nextNodeId: 'blue_demo', simAction: { type: 'SET_VISUAL', payload: { showApple: true, lightColor: '#3b82f6' } } }
        ]
    },

    'blue_correct': {
        id: 'blue_correct',
        speaker: 'AI',
        content: "Let's confirm it! Switching to blue-only light...",
        options: [
            { id: 'test', label: "Shine only blue light!", nextNodeId: 'blue_demo', simAction: { type: 'SET_VISUAL', payload: { showApple: true, lightColor: '#3b82f6' } } }
        ]
    },

    'blue_demo': {
        id: 'blue_demo',
        speaker: 'AI',
        content: "The apple looks almost **BLACK**! 🖤\n\nThe apple absorbs blue light and has no red light to reflect. With nothing bouncing back, it looks dark!\n\n**Color isn't just about the object — it's about the LIGHT hitting it AND what the object reflects.**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'blue_demo', showApple: true, lightColor: '#3b82f6' } },
        options: [
            { id: 'sky', label: "Mind blown! So why is the sky blue?", nextNodeId: 'sky_bonus' }
        ]
    },

    'sky_bonus': {
        id: 'sky_bonus',
        speaker: 'AI',
        content: "Bonus round! 🌤️\n\nThe sky has no paint. When sunlight enters the atmosphere, tiny gas molecules scatter **short wavelengths** (blue and violet) in every direction.\n\nYour eyes are more sensitive to blue than violet, so you see blue scattered everywhere — that's why the sky looks blue!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'sky', showScattering: true } },
        options: [
            { id: 'sunset', label: "Is that why sunsets are red?", nextNodeId: 'sunset_explain' },
            { id: 'done', label: "Color is an interaction, not a property!", nextNodeId: 'discovery' }
        ]
    },

    'sunset_explain': {
        id: 'sunset_explain',
        speaker: 'AI',
        content: "YES! 🌅 At sunset, sunlight travels through MORE atmosphere. By the time it reaches you, most of the blue has been scattered away. Only the long wavelengths (red, orange) make it through. That's the sunset!",
        options: [
            { id: 'done', label: "Light is so much more than I thought!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Key Discovery!**\n\nColor isn't a property of the object alone — it's an **interaction** between:\n1. The light SOURCE (what wavelengths are present)\n2. The MATERIAL (what it absorbs vs reflects)\n3. Your EYES (what wavelengths they detect)\n\nChange any one of those three, and the color changes!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'crosslink', label: "Color = light + material + eyes", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Link:** Sound (P4) needed particles to travel — it's a pressure wave. But light is an electromagnetic wave — it doesn't need particles and can travel through empty space (that's how sunlight reaches us!).\n\nBiology (B4) will show you the incredible detectors your body has for BOTH sound and light. 👁️👂\n\n✅ **Lesson C4 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

