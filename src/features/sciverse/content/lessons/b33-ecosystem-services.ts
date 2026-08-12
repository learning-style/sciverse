import { DialogNode } from '../../types';

export function getB33Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Nobody sends you a bill for **clean air**. No company charges you for **rain**, or for the bees that pollinate your apples.\n\nBut all of that work is really being done -- by forests, wetlands, soil, and insects. Scientists call these free services **ecosystem services**.\n\nWhat do you think makes an ecosystem good at providing them?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'variety', label: "Having many different kinds of living things, so there is always a backup when one species struggles.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'size', label: "Just having a lot of plants and animals -- the total number is what counts, not the variety.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Numbers help, but **variety** matters far more! The number of different species in a place is called its **biodiversity**.\n\nPicture a field with a million plants -- all the exact same crop. One new disease arrives, and the entire field dies at once. Now picture a meadow with 60 different plants. That same disease kills a few, and the other 59 keep right on working.\n\nBiodiversity is nature's **backup system**. Many different species means many different ways to survive a surprise.",
            options: [
                { id: 'cont', label: "So variety is what keeps an ecosystem from collapsing?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Here is the free work that healthy ecosystems do for people every single day:\n\n1. **Clean air** -- plants absorb carbon dioxide and release **oxygen**\n2. **Clean water** -- wetlands and soil filter dirt and pollution out of rain\n3. **Food** -- **pollinators** like bees fertilize about 1 in every 3 bites you eat\n4. **Fertile soil** -- the **decomposers** from C33 rebuild it constantly\n5. **Flood protection** -- roots and marshes soak up storm water like a sponge\n\nRemember **P33 The Energy Ladder**? All of this runs on sunlight. And **C33 Nature's Recycling Loop** keeps the materials moving.\n\nSlide **Species Variety** and watch the ecosystem's services rise or collapse!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change the variety and watch what happens!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A town clears a wetland to build a parking lot. A few years later the town floods badly, its drinking water needs expensive treatment, and mosquitoes have multiplied.\n\nWhat happened?",
            options: [
                { id: 'right', label: "The wetland had been doing that work for free -- soaking up floods, filtering water, and housing the animals that ate mosquitoes.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Bad luck -- the flooding and the mosquitoes are separate problems that just happened at the same time.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "They look like separate problems, but they all trace back to one cause: the missing **wetland**.\n\nThat wetland was quietly doing three jobs at once. It soaked up storm water like a sponge, so removing it sent the rain straight into town. It filtered the water, so now a treatment plant has to do that job for money. And it was home to dragonflies, frogs, and birds that ate mosquito larvae by the thousands.\n\nThe services were invisible **because they were working**. People usually notice **ecosystem services** only after they are gone.",
            options: [
                { id: 'retry', label: "Oh -- one lost habitat broke several free services at once!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Ecosystem services are invisible until they stop.**\n\nAnd notice how all three lessons in Big Idea 33 fit together:\n- **P33** -- sunlight powers the whole system, losing 90% at each step\n- **C33** -- atoms cycle around forever, unlocked by decomposers\n- **B33** -- when many species share that energy and matter, the ecosystem becomes **resilient** and does free work for people\n\nHumans are not visitors to the ecosystem. We are standing on it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Energy, matter, and variety all work together!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered what nature does for us for free!**\n\n- **Ecosystem services** include clean air, clean water, food, soil, and flood control\n- **Biodiversity** (species variety) is nature's backup system\n- **Pollinators** are behind about 1 in 3 bites of your food\n- Losing one habitat can break **several** services at once\n- Replacing these services with machines is slow and expensive\n\nP33 showed the energy, C33 showed the recycling, and B33 showed why it all matters to you!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Healthy ecosystems keep people alive!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 33 -- B33 Complete!**\n\nNature's Free Gifts -- How Do Ecosystems Support Human Life?\n\nEcosystems do enormous work for people, and send no bill.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Nature does free work | **Ecosystem services** | Air, water, food, flood control |\n| Variety beats numbers | **Biodiversity** is a backup | One disease cannot wipe it out |\n| Bees fertilize our food | **Pollinators** | 1 in 3 bites you eat |\n| Lost habitat breaks many services | Everything is connected | Damage shows up years later |\n\n**Big Idea 33 connections:**\n- P33 (The Energy Ladder) showed how sunlight shrinks 90% at every step\n- C33 (Nature's Recycling Loop) showed how atoms cycle forever through decomposers\n- B33 (Nature's Free Gifts) showed how many species turn that energy and matter into clean air, water, and food for people!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
