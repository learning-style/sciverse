import { DialogNode } from '../../types';

/**
 * C8 — The Water Cycle
 * Big Idea 8: "Why Does Weather Change?"
 * Scenario: "Journey of a Water Drop"
 * Target Misconception: "Water disappears when it evaporates"
 */
export const getC8Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to the Water Cycle Lab! 💧☀️\n\nSee that puddle on the ground after a rainstorm? By afternoon it's gone. Where did all that water GO?\n\nLet's track a single water molecule — we'll call her **Droplet** — and follow her amazing adventure!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'disappears', label: "The water just disappears into the air.", nextNodeId: 'misconception_disappears', sentiment: 'negative' },
            { id: 'evaporates', label: "It evaporates — turns into a gas?", nextNodeId: 'good_guess', sentiment: 'positive' },
            { id: 'soaks_in', label: "It soaks into the ground.", nextNodeId: 'partial_ground', sentiment: 'neutral' }
        ]
    },

    'misconception_disappears': {
        id: 'misconception_disappears',
        speaker: 'AI',
        content: "That's what it looks like! But here's a big rule in science: **matter is never created or destroyed** — it only changes form.\n\nThe water didn't vanish. It turned into an invisible gas called **water vapor** and floated up into the air! It's still there — you just can't see it anymore.\n\nLet's follow Droplet to see what really happens! 🔍",
        options: [
            { id: 'follow', label: "Let's track where she goes!", nextNodeId: 'puddle' }
        ]
    },

    'good_guess': {
        id: 'good_guess',
        speaker: 'AI',
        content: "Great thinking! ✅ You're absolutely right.\n\nWhen water **evaporates**, it changes from a liquid into an invisible gas called **water vapor**. The water isn't gone — it just changed state!\n\nLet's follow our water molecule Droplet on her full journey.",
        options: [
            { id: 'start', label: "Where does the journey start?", nextNodeId: 'puddle' }
        ]
    },

    'partial_ground': {
        id: 'partial_ground',
        speaker: 'AI',
        content: "Some water does soak into the ground — that's called **absorption**. But a LOT of it goes UP, not down!\n\nThe sun heats the puddle, and water molecules get so energized they fly off the surface and become an invisible gas. That's **evaporation**.\n\nLet's follow one molecule — Droplet — and see the whole cycle!",
        options: [
            { id: 'lets_see', label: "Show me what happens!", nextNodeId: 'puddle' }
        ]
    },

    'puddle': {
        id: 'puddle',
        speaker: 'AI',
        content: "☀️ **Stage 1: The Puddle**\n\nHere's Droplet, sitting in a puddle on a warm day. The sun is shining down, sending heat energy to the water.\n\nDroplet and all her water molecule friends are jiggling around. The warmer they get, the FASTER they jiggle. Some molecules near the surface are moving so fast they **break free** and fly up!\n\n🔗 **Link to P8:** The sun transfers heat through **radiation** — the same heat transfer you learned about!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'puddle' } },
        options: [
            { id: 'break_free', label: "Droplet is breaking free from the puddle!", nextNodeId: 'evaporation' }
        ]
    },

    'evaporation': {
        id: 'evaporation',
        speaker: 'AI',
        content: "🌡️ **Stage 2: Evaporation!**\n\nDroplet absorbed enough heat energy from the sun to **escape the liquid surface**! She changed from a **liquid** into a **gas** (water vapor).\n\n| State | What molecules do |\n|-------|-------------------|\n| Liquid | Slide around, stick loosely |\n| Gas (vapor) | Fly freely, spread out |\n\nDroplet is now invisible — but she's NOT gone. She's floating upward as water vapor! This is the key: **water doesn't disappear, it changes state!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'evaporation' } },
        options: [
            { id: 'rise_up', label: "Where does Droplet go next?", nextNodeId: 'rising' }
        ]
    },

    'rising': {
        id: 'rising',
        speaker: 'AI',
        content: "⬆️ **Stage 3: Rising Up!**\n\nWarm air carries Droplet higher and higher into the atmosphere. But here's the thing — the higher you go, the **colder** it gets!\n\nDroplet is rising hundreds of meters. The air around her is getting chillier and chillier. She's slowing down, losing energy...\n\nWhat do you think happens when water vapor gets cold enough? 🤔",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'rising' } },
        options: [
            { id: 'turns_back', label: "It turns back into liquid water!", nextNodeId: 'condensation', sentiment: 'positive' },
            { id: 'stays_gas', label: "It stays as gas forever?", nextNodeId: 'condensation_redirect', sentiment: 'neutral' }
        ]
    },

    'condensation_redirect': {
        id: 'condensation_redirect',
        speaker: 'AI',
        content: "Not forever! When water vapor cools down enough, the molecules slow down and start **clumping together** again. They change back from gas → liquid. Let's see it happen!",
        options: [
            { id: 'see_it', label: "Show me!", nextNodeId: 'condensation' }
        ]
    },

    'condensation': {
        id: 'condensation',
        speaker: 'AI',
        content: "💨 **Stage 4: Condensation!**\n\nDroplet has cooled down enough to **change back into a tiny liquid droplet**. This is called **condensation** — the opposite of evaporation!\n\n| Process | What happens |\n|---------|-------------|\n| Evaporation | Liquid → Gas (add heat) |\n| Condensation | Gas → Liquid (remove heat) |\n\nDroplet clings to a tiny dust particle in the air. Billions of other water droplets do the same. Together they form... a **cloud!** ☁️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'condensation' } },
        options: [
            { id: 'cloud', label: "Clouds are made of tiny water droplets?!", nextNodeId: 'cloud' }
        ]
    },

    'cloud': {
        id: 'cloud',
        speaker: 'AI',
        content: "☁️ **Stage 5: Cloud Formation**\n\nYes! Clouds are billions of tiny water droplets (or ice crystals) floating together. Each droplet is clinging to a microscopic dust or pollen particle.\n\nDroplet is inside the cloud now, bumping into other droplets. They merge and grow. The droplets get **heavier and heavier**...\n\nWhen they get too heavy for the air to hold up — what happens next?",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cloud' } },
        options: [
            { id: 'rain', label: "They fall as rain!", nextNodeId: 'precipitation', sentiment: 'positive' },
            { id: 'stay_up', label: "They float forever?", nextNodeId: 'precipitation_hint', sentiment: 'neutral' }
        ]
    },

    'precipitation_hint': {
        id: 'precipitation_hint',
        speaker: 'AI',
        content: "Gravity always wins! When the droplets get heavy enough, the air can't hold them up anymore. They start falling — and that's what we call rain (or snow if it's cold enough)! ☔",
        options: [
            { id: 'show_rain', label: "Let's see Droplet fall!", nextNodeId: 'precipitation' }
        ]
    },

    'precipitation': {
        id: 'precipitation',
        speaker: 'AI',
        content: "🌧️ **Stage 6: Precipitation!**\n\nDroplet has merged with many other droplets and grown too heavy. She falls from the cloud as a **raindrop**!\n\nPrecipitation can be:\n- ☔ **Rain** (liquid, warm air)\n- ❄️ **Snow** (frozen, cold air)\n- 🧊 **Hail** (ice balls, strong storms)\n\nDroplet splashes down onto the ground, runs into a stream, and eventually reaches a puddle or lake.\n\n🔗 **Link to B8:** Animals depend on this rain! Without the water cycle, rivers would dry up and animals would have no water to drink. 🦌💧",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'precipitation' } },
        options: [
            { id: 'to_checkpoint', label: "And then the cycle starts again?", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint!**\n\nDroplet is back on the ground, ready to start all over again. But first — a question:\n\n**What causes clouds to form?**\n\nThink about what happened to Droplet when she rose high into the air...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'cooling', label: "Water vapor cools and condenses into droplets!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'smoke', label: "Clouds are made of smoke or dust.", nextNodeId: 'checkpoint_wrong', sentiment: 'negative' },
            { id: 'steam', label: "Hot steam rises and piles up.", nextNodeId: 'checkpoint_partial', sentiment: 'neutral' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ Exactly! When water vapor rises, the air gets colder. The vapor **cools down**, the molecules slow down, and they **condense** back into tiny liquid droplets. Billions of those tiny droplets together = a cloud!\n\nThe key is **cooling** — without cold air at high altitude, clouds wouldn't form.",
        options: [
            { id: 'to_discovery', label: "So the whole cycle is driven by temperature!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong': {
        id: 'checkpoint_wrong',
        speaker: 'AI',
        content: "Dust is involved — water vapor condenses ONTO tiny dust particles. But the dust doesn't make the cloud visible. The cloud is mostly **tiny water droplets**!\n\nClouds form because rising water vapor **cools down** at high altitude and **condenses** from gas back into liquid. That's the key process — condensation! 💨→💧",
        options: [
            { id: 'understand', label: "So cooling causes condensation, which makes clouds!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_partial': {
        id: 'checkpoint_partial',
        speaker: 'AI',
        content: "You're right that water vapor rises — but it's not hot steam at cloud level! As the vapor goes higher, it actually **cools down**.\n\nThat cooling is what makes clouds form: cooled water vapor **condenses** back into tiny liquid droplets. It's the temperature DROP at altitude that does it! 📉🌡️",
        options: [
            { id: 'got_it', label: "Cooling → condensation → clouds. Got it!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery: The Water Cycle!**\n\n| Stage | What happens | State change |\n|-------|-------------|-------------|\n| ☀️ Evaporation | Sun heats water, molecules escape | Liquid → Gas |\n| ⬆️ Rising | Warm air carries vapor up | Gas (cooling) |\n| 💨 Condensation | Vapor cools, forms droplets on dust | Gas → Liquid |\n| ☁️ Cloud | Billions of droplets gather | Liquid (tiny) |\n| 🌧️ Precipitation | Droplets get heavy, fall as rain | Liquid falls |\n| 🔄 Collection | Water gathers in puddles/rivers | Cycle restarts |\n\n**Key Insight:** Water is NEVER destroyed — it just keeps changing state and cycling around! ♻️",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'finish', label: "The water on Earth is the same water that's always been here!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Cross-Links:**\n- **P8 (Heat Transfer):** The sun's **radiation** drives evaporation — without heat energy, the cycle wouldn't start! The same heat transfer concepts explain why water evaporates faster on hot days. ☀️\n- **B8 (Animal Adaptations to Weather):** Animals depend on the water cycle for survival — rain fills rivers and lakes. Some animals migrate or hibernate based on rainy/dry seasons! 🦌🌧️\n\n✅ **Lesson C8 Complete!** Droplet's adventure never ends — she's been cycling for billions of years!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

