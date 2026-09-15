import { DialogNode } from '../../types';

/**
 * C11 — The pH Kitchen
 * Big Idea 11: "How Do We Stay Healthy?"
 * Scenario: Acids and bases in everyday life and the body
 * Target Misconception: "Acids are always dangerous chemicals in a lab — not found in food or the body"
 */
export const getC11Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the pH Lab! 🧪\n\nLook at the pH scale in the simulation — it runs from **0 (most acidic)** to **14 (most basic/alkaline)**, with **7 as neutral**.\n\nHere's my first question: do you think your stomach is acidic, basic, or neutral?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro', selectedSubstance: 'water', pH: 7 } },
        options: [
            { id: 'acidic', label: "Acidic — that's why it can digest food.", nextNodeId: 'correct_stomach', sentiment: 'positive' },
            { id: 'neutral', label: "Neutral — it's mostly water inside.", nextNodeId: 'misconception_neutral', sentiment: 'negative' },
            { id: 'basic', label: "Basic — to neutralize toxins.", nextNodeId: 'misconception_basic', sentiment: 'negative' }
        ]
    },

    'misconception_neutral': {
        id: 'misconception_neutral',
        speaker: 'AI',
        content: "Good guess, but your stomach is actually very acidic! 😮\n\nStomach acid has a pH of about **1.5 to 3.5** — about as acidic as lemon juice, or even more! It needs to be this strong to:\n- Kill bacteria in food\n- Unfold proteins so enzymes can break them down\n- Switch on a digestive enzyme\n\nSpeaking of which — not all acids are dangerous. What acid do you think is in lemons?",
        options: [
            { id: 'citric', label: "Citric acid — and it's perfectly safe to eat.", nextNodeId: 'correct_stomach' }
        ]
    },

    'misconception_basic': {
        id: 'misconception_basic',
        speaker: 'AI',
        content: "Interesting thinking, but the stomach is strongly **acidic** — pH 1.5–3.5! The acid helps digestion: it unfolds proteins and switches on the enzyme that starts breaking them apart. (Most digestion happens later, in the small intestine.) 🧫\n\nYour stomach lining has a layer of mucus that protects it from the acid. When acid escapes up into your food pipe, you feel heartburn; when the lining is damaged, a sore called an ulcer can form.\n\nTry dragging to the stomach acid position on the pH scale!",
        options: [
            { id: 'found_it', label: "Whoa, pH 2 is even more acidic than vinegar!", nextNodeId: 'correct_stomach' }
        ]
    },

    'correct_stomach': {
        id: 'correct_stomach',
        speaker: 'AI',
        content: "Exactly! Your stomach is a powerful acid environment — essential for unfolding proteins and killing germs. 💪\n\nNow try placing other substances on the scale in the sim. Look for:\n- **Lemon juice** (~pH 2.5)\n- **Black coffee** (~pH 5)\n- **Blood** (~pH 7.4)\n- **Baking soda** (~pH 9)\n- **Bleach** (~pH 12)",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore_substances', showSubstances: true } },
        options: [
            { id: 'explored', label: "I placed them all! Coffee surprised me.", nextNodeId: 'indicator_demo' }
        ]
    },

    'indicator_demo': {
        id: 'indicator_demo',
        speaker: 'AI',
        content: "Now let's talk about **pH indicators** — chemicals that change color based on pH. 🌈\n\nLitmus paper turns **red in acid** and **blue in base**. Universal indicator shows a full rainbow from red (pH 1) to purple (pH 14).\n\nSlide the **pH Level** control towards acid, then towards base — watch the indicator color change!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'indicator', showIndicator: true } },
        options: [
            { id: 'added_acid', label: "Towards acid — it turned red/orange!", nextNodeId: 'neutralization' },
            { id: 'added_base', label: "Towards base — it turned blue/purple!", nextNodeId: 'neutralization' }
        ]
    },

    'neutralization': {
        id: 'neutralization',
        speaker: 'AI',
        content: "Perfect! Now here's a key concept: **neutralization**.\n\nAcid + Base → Salt + Water\n\nThis is why antacids (like calcium carbonate) work for heartburn — they're a **base** that neutralizes excess stomach acid! (Carbonates also give off a little carbon dioxide gas as they do.) 💊\n\nHere's a challenge: if your blood pH drops below 7.35 (becomes slightly acidic), what do you think your body does?",
        options: [
            { id: 'breathe_faster', label: "Breathe faster to release CO₂, which makes an acid in blood.", nextNodeId: 'blood_ph' },
            { id: 'drink_water', label: "Drink water to dilute the acid.", nextNodeId: 'blood_ph_hint' },
            { id: 'no_idea', label: "I have no idea!", nextNodeId: 'blood_ph' }
        ]
    },

    'blood_ph_hint': {
        id: 'blood_ph_hint',
        speaker: 'AI',
        content: "Water doesn't actually change pH much on its own! Your body has a much smarter system — your **breathing**.\n\nCO₂ dissolved in blood forms carbonic acid (H₂CO₃). So breathing faster blows off CO₂, reducing acidity!",
        options: [
            { id: 'got_it', label: "So breathing is literally a pH controller!", nextNodeId: 'blood_ph' }
        ]
    },

    'blood_ph': {
        id: 'blood_ph',
        speaker: 'AI',
        content: "Yes! Your body maintains blood pH in a razor-thin range: **7.35–7.45**. Just 0.1 units outside that range can cause serious problems.\n\nYour lungs, kidneys, and blood buffers work together constantly to keep pH perfect. Look at the thin purple band on the pH scale in the sim — that is the whole range blood is allowed! ⚗️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'blood_ph_demo', showBloodPH: true } },
        options: [
            { id: 'tested', label: "That band is really thin — amazing!", nextNodeId: 'summary' }
        ]
    },

    'summary': {
        id: 'summary',
        speaker: 'AI',
        content: "🌟 **pH Mastery Unlocked:**\n\n✅ pH 0–14 scale: low = acidic, high = basic, 7 = neutral\n✅ Stomach acid pH ~2 — essential for digestion\n✅ Blood pH 7.35–7.45 — tightly controlled\n✅ Neutralization: acid + base = salt + water\n✅ Indicators change color to reveal acidity\n\n**Real world:** antacids, pool chemistry, food preservation — all use acid-base reactions!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: [
            { id: 'done', label: "I understand pH now. Onto the next lesson!", nextNodeId: 'done' }
        ]
    },

    'done': {
        id: 'done',
        speaker: 'AI',
        content: "Excellent chemistry skills! 🧪\n\nConnect this to **P11 (Blood Pressure)** or explore **B11 (Immune System)** to see how your body's army uses chemical signals to fight invaders!",
        options: []
    }
});
