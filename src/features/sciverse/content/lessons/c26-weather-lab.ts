import { DialogNode } from '../../types';

/**
 * C26 -- Cloud Factory
 * Big Idea 26: "How Do We Predict Weather?"
 * Level 1 (Grades 3-8) -- Simple, concrete, 1 slider
 */
export function getC26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "See this pond with the sun shining on it? Something invisible is rising off the water right now.\n\nWhat do you think is happening?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'evap', label: "Water is turning into invisible gas.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'steam', label: "Steam is coming off the water.", nextNodeId: 'partial' },
                { id: 'nothing', label: "Nothing -- water just sits there.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It looks like nothing is happening, but water is sneaky! Even without boiling, tiny bits of water escape into the air. You can't see them because they become an invisible gas.\n\nThat's why puddles disappear on sunny days -- the water floated away! This is called **evaporation**.",
            options: [
                { id: 'cont', label: "So the water goes into the air without us seeing it?", nextNodeId: 'correct' }
            ]
        },
        partial: {
            id: 'partial',
            speaker: 'AI',
            content: "Close! Steam is what you see when water boils. But this is different -- **evaporation** happens slowly, even in cool weather. The **water molecules** sneak into the air one by one, totally invisible.\n\nYou can't see them leave, but they're up there!",
            options: [
                { id: 'cont', label: "So it's invisible water floating up?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Here's how the cloud factory works:\n\n1. Sun warms the water\n2. Water **evaporates** -- turns into invisible gas\n3. The invisible gas floats up high where it's cold\n4. Cold air turns the gas back into tiny droplets -- a **cloud**!\n\nTry the **Moisture** slider to add more water to the air!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me make some clouds!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Slide the **moisture** up and watch the sky. What do you see forming?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'clouds', label: "Clouds are appearing! And they get darker!", nextNodeId: 'checkpoint', sentiment: 'positive' },
                { id: 'unsure', label: "Something is changing up top.", nextNodeId: 'hint' }
            ]
        },
        hint: {
            id: 'hint',
            speaker: 'AI',
            content: "Try sliding moisture all the way up! See the fluffy shapes forming at the top? Those are **clouds**. Made of billions of tiny **water droplets**.\n\nKeep going -- when there's too much water, the clouds get dark and heavy. Then it starts to rain!",
            options: [
                { id: 'see_it', label: "Rain! The clouds got too heavy!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Quick check!** Why does **rain** fall from clouds?",
            options: [
                { id: 'heavy', label: "The water droplets get too heavy to float.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'cold', label: "The cloud gets too cold.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Cold air is part of the story -- it's what makes the cloud form in the first place. But **rain** falls because the tiny **droplets** bump into each other and join together until they're too heavy to float.\n\nThink of it like a snowball growing as it rolls -- the droplets get bigger and bigger until **gravity** pulls them down!",
            options: [
                { id: 'retry', label: "So big heavy drops fall -- that's rain!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Yes! Tiny cloud **droplets** bump together and grow. When they're heavy enough, **gravity** wins and they fall as **rain**. Then the water lands on the ground, flows into ponds and rivers, and the sun starts **evaporating** it again.\n\nIt's a big circle -- the **water cycle** (you'll explore the full journey in Lesson C8)!",
            options: [
                { id: 'disc', label: "Water just goes round and round!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the water cycle!** (Lesson C8 goes deeper into the full journey.)\n\n**Evaporate** -- Rise -- Cool -- **Cloud** -- **Rain** -- Repeat!\n\nThe same water that dinosaurs drank is still cycling through our sky today. When you see a **cloud**, you're looking at billions of tiny **water droplets** that floated up as invisible gas!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "That's amazing! What's next?", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C26 Complete -- Cloud Factory!**\n\nCloud Factory -- How Do We Predict Weather?\n\nPredicting **cloud formation** and **rain** is another key part of predicting weather. In Lesson C8 we learned *why* the water cycle happens. Here in C26 we learned how to *predict* it -- by watching **moisture** levels. More moisture means bigger clouds, and when clouds get heavy enough, rain falls.\n\n**Summary Table:**\n| What You Learned | Key Idea | How It Helps Predict Weather |\n| --- | --- | --- |\n| Water evaporates from ponds/oceans | Invisible vapor rises into the sky | High moisture = clouds likely |\n| Cool air turns vapor into droplets | Clouds form when vapor condenses | Cloud formation = rain possible |\n| Heavy clouds release rain | Droplets grow until gravity wins | Dark thick clouds = rain coming soon |\n\n**Up next:** B26 (Animal Weather Reporters) -- how living things sense weather changes before we do!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
