import { DialogNode } from '../../types';

/**
 * B8 — How Animals Adapt to Weather: Migration, Hibernation & Insulation
 * Big Idea 8: "Why Does Weather Change?"
 * Scenario: "Survival in the Wild"
 * Target Misconception: "Animals just get cold/hot like us and deal with it"
 */
export const getB8Script = (): Record<string, DialogNode> => ({
    'root': {
        id: 'root',
        speaker: 'AI',
        content: "Welcome to **Survival in the Wild!** 🦊❄️\n\nImagine it's November and temperatures are plummeting. Snow is starting to fall. You grab a coat and turn up the heating — easy!\n\nBut animals don't have coats or houses. **How do they survive freezing winters and scorching summers?**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
        options: [
            { id: 'same', label: "They just get cold and deal with it, like us?", nextNodeId: 'misconception', sentiment: 'negative' },
            { id: 'move', label: "Some animals fly somewhere warmer!", nextNodeId: 'winter_scene', sentiment: 'positive' },
            { id: 'sleep', label: "Don't bears sleep through winter?", nextNodeId: 'winter_scene', sentiment: 'positive' }
        ]
    },

    'misconception': {
        id: 'misconception',
        speaker: 'AI',
        content: "That's what many people think — but animals are WAY more clever than that! 🤔\n\nHumans rely on technology: heaters, air conditioning, thick jackets. Animals have evolved **built-in survival strategies** over millions of years.\n\nSome strategies are so extreme they'd blow your mind — slowing your heartbeat to almost nothing, or flying thousands of kilometres! Let's explore a winter scene and find out.",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'winter_scene' } },
        options: [
            { id: 'show', label: "Show me what animals do!", nextNodeId: 'migration_intro' }
        ]
    },

    'winter_scene': {
        id: 'winter_scene',
        speaker: 'AI',
        content: "Look at this winter landscape! ❄️🌲\n\nSnow blankets the ground, trees are bare, and the temperature is **-15°C**. Three very different animals face the same deadly problem: extreme cold.\n\n- 🪿 A flock of **Canada geese** overhead\n- 🐻 A **brown bear** near a cave\n- 🦊 An **arctic fox** on the snowy hill\n\nEach one has a completely different survival strategy. Let's discover all three!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'winter_scene' } },
        options: [
            { id: 'geese', label: "Where are those geese going?", nextNodeId: 'migration_intro' },
            { id: 'bear', label: "Why is the bear going into a cave?", nextNodeId: 'hibernation_intro' },
            { id: 'fox', label: "How does the fox survive the cold?", nextNodeId: 'insulation_intro' }
        ]
    },

    'migration_intro': {
        id: 'migration_intro',
        speaker: 'AI',
        content: "**Strategy 1: Migration** 🪿✈️\n\nThose Canada geese are flying in a beautiful **V-formation** — and they're heading SOUTH!\n\nEvery autumn, they travel up to **5,000 km** to reach warmer lands where food is plentiful. In spring, they fly back north.\n\nThe V-shape isn't just pretty — each bird flies in the **updraft** from the bird in front, saving about 20% energy. They take turns leading!\n\n🔗 *Remember C8 (Water Cycle)?* When drought changes rainfall patterns, animals may be forced to **migrate to find water** — the water cycle directly affects where animals can survive!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'migration' } },
        options: [
            { id: 'why', label: "Why don't all animals just migrate?", nextNodeId: 'migration_limits' },
            { id: 'next', label: "What about the bear?", nextNodeId: 'hibernation_intro' }
        ]
    },

    'migration_limits': {
        id: 'migration_limits',
        speaker: 'AI',
        content: "Great question! Migration is energetically **expensive**. 💪\n\nFlying 5,000 km takes enormous energy — not every animal can do it. Small mammals, amphibians, and many insects can't travel that far.\n\nAlso, migrating means leaving your territory. Other animals might take your home while you're gone!\n\nSo evolution has given different animals different tools. Let's see what the bear does instead...",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'migration' } },
        options: [
            { id: 'bear', label: "Let's check on the bear!", nextNodeId: 'hibernation_intro' }
        ]
    },

    'hibernation_intro': {
        id: 'hibernation_intro',
        speaker: 'AI',
        content: "**Strategy 2: Hibernation** 🐻💤\n\nThe brown bear crawls into its cave and does something incredible — it enters **hibernation**!\n\nWatch the display:\n- Heart rate drops from **80 bpm** to just **8 bpm** 💓\n- Body temperature falls from 37°C to about **33°C**\n- Breathing slows to just a few breaths per minute\n- It won't eat, drink, or go to the bathroom for **5-7 MONTHS!**\n\nThe bear lives off **stored body fat** — it ate huge amounts in autumn to prepare. Its metabolism slows by ~75%!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'hibernation' } },
        options: [
            { id: 'how', label: "How can it survive without eating?!", nextNodeId: 'hibernation_detail' },
            { id: 'fox', label: "What about the arctic fox?", nextNodeId: 'insulation_intro' }
        ]
    },

    'hibernation_detail': {
        id: 'hibernation_detail',
        speaker: 'AI',
        content: "It's all about **energy conservation**! 🔋\n\nA bear burns ~6,000 calories/day when active. During hibernation, that drops to about **1,500 calories/day** — all from stored fat.\n\nBy slowing its heartbeat and cooling its body, the bear uses far less energy. It's like putting your phone on ultra power-saving mode! 📱\n\n🔗 *P8 Connection (Heat Transfer):* The cave acts as **insulation** — rock blocks wind (convection) and the small entrance reduces heat loss. The bear's own body heat warms the small space, just like how P8 showed that reducing conduction and convection keeps things warm!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'hibernation' } },
        options: [
            { id: 'fox', label: "Now show me the arctic fox!", nextNodeId: 'insulation_intro' }
        ]
    },

    'insulation_intro': {
        id: 'insulation_intro',
        speaker: 'AI',
        content: "**Strategy 3: Insulation** 🦊🧥\n\nThe arctic fox doesn't migrate OR hibernate — it stays active all winter at **-40°C!** How?!\n\nLook at its adaptations:\n- **Thick double-layered fur** — the densest fur of any land mammal!\n- **Small, rounded ears** — less surface area = less heat escaping\n- **Short legs and muzzle** — compact body shape holds heat in\n- **Furry paw pads** — like built-in snow boots!\n\n🔗 *P8 Connection:* Thick fur reduces **conduction** (heat can't pass through easily). Small ears reduce **radiation** (less surface to radiate heat away). These are exactly the heat transfer principles from P8!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'insulation' } },
        options: [
            { id: 'desert', label: "What about animals in hot weather?", nextNodeId: 'desert_intro' },
            { id: 'checkpoint', label: "I think I understand — test me!", nextNodeId: 'checkpoint' }
        ]
    },

    'desert_intro': {
        id: 'desert_intro',
        speaker: 'AI',
        content: "Surviving extreme HEAT is a whole different challenge! 🏜️☀️\n\nLook at this desert scene: during the **day** it hits 50°C — scorching! But at **night** it drops to 15°C.\n\nMany desert animals like lizards and rodents are **nocturnal** — they hide underground during the blazing day and come out at cool night.\n\nThe desert lizard burrows into sand at noon (avoiding the sun's radiation) and hunts actively at night when it's safe.\n\n🔗 *C8 Connection:* Deserts get so little rain because of the water cycle — moisture evaporates before reaching the ground. Animals must adapt to survive with almost **no water**, getting moisture from their food!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'desert' } },
        options: [
            { id: 'test', label: "Fascinating! I'm ready for the checkpoint!", nextNodeId: 'checkpoint' }
        ]
    },

    'checkpoint': {
        id: 'checkpoint',
        speaker: 'AI',
        content: "⏸️ **Checkpoint Question!**\n\nMany desert animals — like lizards, scorpions, and mice — are active **only at night**.\n\n**Why do some desert animals come out only at night?**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
        options: [
            { id: 'correct', label: "The desert is dangerously hot during the day — by being nocturnal, they avoid overheating and losing water!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
            { id: 'wrong1', label: "Because they're scared of the sunlight", nextNodeId: 'checkpoint_wrong1', sentiment: 'negative' },
            { id: 'wrong2', label: "Because their food only grows at night", nextNodeId: 'checkpoint_wrong2', sentiment: 'negative' }
        ]
    },

    'checkpoint_correct': {
        id: 'checkpoint_correct',
        speaker: 'AI',
        content: "✅ **Excellent!** That's spot on!\n\nDaytime desert heat (50°C+) would cause deadly **overheating** and rapid **water loss** through evaporation. By hiding underground during the day, animals stay cool and conserve precious water.\n\nAt night (15-20°C), they can be active without wasting energy on cooling down. It's a brilliant survival strategy! 🦎🌙",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint', correct: true } },
        options: [
            { id: 'discovery', label: "Let's see everything we learned!", nextNodeId: 'discovery' }
        ]
    },

    'checkpoint_wrong1': {
        id: 'checkpoint_wrong1',
        speaker: 'AI',
        content: "Not quite! Animals aren't afraid of sunlight. 🤔\n\nThe real problem is **extreme heat**. At 50°C+, a small lizard would overheat and die very quickly. The sun's radiation (remember P8!) would cook them.\n\nBy staying underground during the day, they avoid the deadly heat and come out at the cool, safe night-time temperatures.",
        options: [
            { id: 'retry', label: "Oh — it's about avoiding dangerous heat, not fear!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'checkpoint_wrong2': {
        id: 'checkpoint_wrong2',
        speaker: 'AI',
        content: "Interesting idea, but plants and insects (their food) are actually available day AND night! 🌵\n\nThe real reason is about **temperature**. During the day, the desert surface can reach 70°C — hot enough to burn! Small animals would overheat and lose water through evaporation.\n\nAt night, temperatures drop dramatically to a comfortable 15-20°C. It's about survival, not food timing!",
        options: [
            { id: 'retry', label: "So they're avoiding deadly heat — smart!", nextNodeId: 'checkpoint_correct', sentiment: 'positive' }
        ]
    },

    'discovery': {
        id: 'discovery',
        speaker: 'AI',
        content: "🎉 **Big Discovery!**\n\n🦊 **How Animals Adapt to Weather:**\n1. **Migration** — travel to better climates (geese fly 5,000 km south!)\n2. **Hibernation** — slow metabolism and sleep through winter (bears at 8 bpm!)\n3. **Insulation** — thick fur, small ears, compact bodies trap heat\n4. **Nocturnal behaviour** — desert animals avoid deadly daytime heat\n\n**Misconception busted:** Animals DON'T just \"deal with it\" like us — they have incredible built-in survival strategies refined over millions of years of evolution!",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
        options: [
            { id: 'complete', label: "Nature is amazing! 🌍", nextNodeId: 'complete' }
        ]
    },

    'complete': {
        id: 'complete',
        speaker: 'AI',
        content: "🔗 **Big Idea 8 Complete — Why Does Weather Change?**\n\n- Physics (P8): Heat transfers by conduction, convection & radiation — fur and caves block these!\n- Chemistry (C8): The water cycle drives rainfall and drought — forcing animals to migrate for water\n- Biology (B8): Animals adapt with migration, hibernation, insulation & nocturnal behaviour!\n\nAll three connect: **weather is driven by heat and water, and life must adapt to survive it.** 🌦️🦊\n\n✅ **Lesson B8 Complete!**",
        onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
        options: []
    }
});

