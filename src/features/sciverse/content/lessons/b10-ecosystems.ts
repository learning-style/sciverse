import { DialogNode } from '../../types';

/**
 * B10 — Ecosystems & Biodiversity
 * Big Idea 10: "How Do We Protect Our Planet?"
 * Scenario: "The Missing Wolves"
 * Target Misconception: "Removing one species doesn't really affect others"
 */
export const getB10Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to **The Missing Wolves!** 🐺🌲\n\nImagine a beautiful forest — tall trees, flowing rivers, deer grazing in meadows, birds singing everywhere. Everything looks perfect and peaceful.\n\nBut something is about to change. In 1926, the last wolves in Yellowstone National Park were removed. People thought: \"No more wolves? No problem!\"\n\nThey were VERY wrong. Let's find out why.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'no_big_deal', label: "Losing one animal can't matter that much, right?", nextNodeId: 'misconception', sentiment: 'negative' },
            { id: 'curious', label: "What happened without the wolves?", nextNodeId: 'healthy_ecosystem', sentiment: 'positive' },
            { id: 'worried', label: "I bet something went wrong!", nextNodeId: 'healthy_ecosystem', sentiment: 'neutral' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "That's what most people thought — but it's a big **misconception**! 🤔\n\nIn an ecosystem, every species is connected to others like links in a chain. Remove ONE link and the whole chain can fall apart!\n\nWhen wolves disappeared from Yellowstone, it triggered a **cascade** — a chain reaction that changed EVERYTHING, from the deer to the trees to even the RIVERS.\n\nLet's first look at what a healthy ecosystem looks like, then watch what happens when wolves vanish.",
        options: [
            { id: 'show_healthy', label: "Show me the healthy ecosystem first!", nextNodeId: 'healthy_ecosystem' }
        ]
    },

    'healthy_ecosystem': {
        id: 'healthy_ecosystem',
        speaker: 'AI',
        content: "🌿 **A Healthy Ecosystem — Everything in Balance**\n\nLook at this thriving forest:\n\n- 🌳 **Trees & grass** grow tall and lush (producers — they make food from sunlight)\n- 🦌 **Deer** graze on plants, but wolves keep their numbers in check\n- 🐺 **Wolves** hunt deer — not to be mean, but to survive!\n- 🐦 **Birds** nest in the tall trees along the riverbanks\n- 🐛 **Insects** pollinate flowers and break down dead leaves\n\nSee how steady everything is? The wolves eat just enough deer to stop them from eating ALL the plants. It's a perfect balance!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'healthy_ecosystem' } },
        options: [
            { id: 'remove_wolves', label: "Now take the wolves away!", nextNodeId: 'wolves_removed' }
        ]
    },

    'wolves_removed': {
        id: 'wolves_removed',
        speaker: 'AI',
        content: "🚫🐺 **The Wolves Are Gone!**\n\nWatch what happens next...\n\nWithout wolves to hunt them, the deer have **no predators**. So they eat... and eat... and EAT. The deer population **explodes**!\n\n- 🦌🦌🦌🦌 Deer numbers skyrocket\n- 🌱 They eat every bush, every sapling, every blade of grass they can find\n- 🌳❌ Young trees never get a chance to grow\n\nThe forests start to look bare. But this is just the BEGINNING of the cascade...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'wolves_removed' } },
        options: [
            { id: 'cascade', label: "What else goes wrong?!", nextNodeId: 'cascade' }
        ]
    },

    'cascade': {
        id: 'cascade',
        speaker: 'AI',
        content: "🌊 **The Cascade — One Change Wrecks Everything!**\n\nWithout trees and plants holding the soil:\n\n1. 🦌 Deer eat all the riverside willows and shrubs\n2. 🏔️ Without roots, the **riverbanks erode** — soil washes away\n3. 🌊 Rivers get wider and shallower — fish lose their deep pools\n4. 🐦 **Birds leave** — no trees for nesting\n5. 🐻 **Bears** lose berry bushes the deer ate\n6. 🐛 Fewer plants = fewer insects = less food for everyone\n\nOne missing species → the WHOLE ecosystem collapses! This is called a **trophic cascade**.\n\n*In 1995, wolves were brought BACK to Yellowstone — and the forests began to recover!* 🎉",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'cascade' } },
        options: [
            { id: 'food_web', label: "How are all these species connected?", nextNodeId: 'food_web' }
        ]
    },

    'food_web': {
        id: 'food_web',
        speaker: 'AI',
        content: "🕸️ **The Food Web — Nature's Network**\n\nSpecies aren't just in a single chain — they form a complex **web**! Here's how energy flows:\n\n| Level | Role | Examples |\n|-------|------|----------|\n| ☀️ **Sun** | Energy source | Powers everything! |\n| 🌱 **Producers** | Make food from sunlight | Grass, trees, flowers |\n| 🦌 **Primary consumers** | Eat plants (herbivores) | Deer, rabbits, insects |\n| 🐺 **Secondary consumers** | Eat herbivores (predators) | Wolves, foxes, hawks |\n| 🍄 **Decomposers** | Break down dead things | Fungi, bacteria, worms |\n\nEvery arrow in this web is a **connection**. The more connections, the stronger the web — just like a net with many ropes is harder to tear!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'food_web' } },
        options: [
            { id: 'biodiversity', label: "What makes an ecosystem strong?", nextNodeId: 'biodiversity' }
        ]
    },

    'biodiversity': {
        id: 'biodiversity',
        speaker: 'AI',
        content: "🌈 **Biodiversity — Strength in Numbers!**\n\n**Biodiversity** means having MANY different species in an ecosystem. More species = more connections = stronger ecosystem!\n\nThink of it like a **rope net**:\n- 🟢 **High biodiversity** = net with 100 ropes → cut one rope and the net still holds! Strong!\n- 🔴 **Low biodiversity** = net with only 5 ropes → cut one and it falls apart! Weak!\n\nThat's why removing wolves was so dangerous — Yellowstone lost a KEY rope in the net.\n\n**Threats** to biodiversity:\n- 🏗️ Habitat destruction (building over forests)\n- 🏭 Pollution (poisons water and air)\n- 🌡️ Climate change (habitats change too fast)\n- 🦤 Over-hunting (like what happened to the dodo!)\n\n🔗 **Link to C10:** Air pollution is a major threat — acid rain and smog destroy the habitats that species depend on!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'biodiversity' } },
        options: [
            { id: 'checkpoint', label: "Let me test what I've learned!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint!**\n\n🐝 Imagine ALL the bees suddenly disappeared from a meadow ecosystem.\n\n**What would happen to the flowering plants?**\n\nThink about what bees DO in the food web — they don't just make honey!\n\n🔗 **Link to P10:** Renewable energy means fewer power plants, less habitat destruction, and safer homes for pollinators like bees!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'correct', label: "Flowers wouldn't get pollinated — they'd stop reproducing and die out!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'wrong_honey', label: "We'd just lose honey, but plants would be fine.", nextNodeId: 'checkpoint_wrong_honey', sentiment: 'negative' },
            { id: 'wrong_other', label: "Other insects would just take over immediately.", nextNodeId: 'checkpoint_wrong_other', sentiment: 'negative' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ **Brilliant!** 🎯\n\nBees are **pollinators** — they carry pollen from flower to flower, which is how most flowering plants **reproduce**. No bees = no pollination = no seeds = no new plants!\n\nAnd it cascades further:\n- 🌸 Fewer flowers → less food for butterflies and hummingbirds\n- 🐇 Fewer plants → less food for herbivores\n- 🦊 Fewer herbivores → less food for predators\n\nJust like the wolves — one missing species can collapse the WHOLE web!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', correct: true } },
        options: [
            { id: 'to_discovery', label: "Everything really IS connected!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_honey': {
        id: 'checkpoint_wrong_honey',
        speaker: 'AI',
        content: "Not quite! Honey is delicious, but bees do something even MORE important. 🐝\n\nBees are **pollinators**. When they visit flowers for nectar, pollen sticks to their fuzzy bodies and gets carried to the next flower. This is how most flowering plants **make seeds** and reproduce!\n\nNo bees → no pollination → no seeds → flowering plants **can't reproduce** and slowly die out. About **75% of food crops** depend on bee pollination!\n\nIt's another cascade — just like the wolves!",
        options: [
            { id: 'got_it', label: "Wow — bees are way more important than I thought!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong_other': {
        id: 'checkpoint_wrong_other',
        speaker: 'AI',
        content: "Good thinking, but it's not that simple! 🤔\n\nWhile other insects DO pollinate some flowers, bees are the **champion pollinators**. They visit far more flowers and carry much more pollen than any other insect. Many plants have evolved to work SPECIFICALLY with bees.\n\nIf bees vanished, other insects couldn't fill the gap fast enough. Most flowering plants would **fail to reproduce**, which cascades through the entire food web — fewer plants, fewer herbivores, fewer predators.\n\nThat's why **biodiversity** matters — we can't just swap one species for another!",
        options: [
            { id: 'got_it', label: "So each species has a unique role!", nextNodeId: 'discovery' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Discovery: Ecosystems & Biodiversity!**\n\n| Concept | What it means |\n|---------|---------------|\n| 🕸️ **Ecosystem** | All living things in an area + their environment, connected together |\n| 🔗 **Food web** | Network of who-eats-who (producers → consumers → decomposers) |\n| 🌊 **Trophic cascade** | Removing one species triggers a chain reaction through the whole web |\n| 🌈 **Biodiversity** | More species = more connections = stronger, more stable ecosystem |\n| 🐺 **Keystone species** | One species whose removal causes the biggest cascade (like wolves!) |\n\n**Key Insight:** Every species matters! Even 'small' species like bees or worms play HUGE roles in keeping ecosystems stable.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'finish', label: "Every species is a thread in the web!", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 10 Complete — How Do We Protect Our Planet?**\n\n- Physics (P10): Renewable Energy — solar, wind, and hydroelectric power replace fossil fuels\n- Chemistry (C10): Air Pollution — CO₂ and acid rain damage habitats faster than species can adapt\n- Biology (B10): Ecosystems & Biodiversity — food webs connect every species; removing one thread weakens the whole web\n\nIn all three: **protecting our planet means protecting energy sources, air quality, and the web of life!** 🌍🐺🐝\n\n✅ **Lesson B10 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

