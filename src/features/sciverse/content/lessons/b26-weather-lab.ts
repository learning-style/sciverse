import { DialogNode } from '../../types';

/**
 * B26 -- Animal Weather Reporters
 * Big Idea 26: "How Do We Predict Weather?"
 * Level 1 (Grades 3-8) -- Simple, concrete, 1 slider
 */
export function getB26Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Welcome to the nature meadow! Four animals are hanging out on a nice day.\n\nBut a **storm** is coming. Can you guess which animals can feel it first?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'animals', label: "Animals can sense storms coming?", nextNodeId: 'explain', sentiment: 'positive' },
                { id: 'no_way', label: "Animals can't predict weather!", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It sounds strange, but animals are way better at sensing weather than we are! Their bodies can feel tiny changes in the air that humans miss.\n\nA **bird** can feel the **air pressure** drop. A **frog** can sense **moisture** changing. They've been doing this for millions of years!",
            options: [
                { id: 'cont', label: "Wow, they're like living weather stations!", nextNodeId: 'explain' }
            ]
        },
        explain: {
            id: 'explain',
            speaker: 'AI',
            content: "Here's what each animal does when a **storm** gets closer:\n\n**Birds** fly lower -- the thin air up high feels wrong\n**Ants** march in a line to seal their nest\n**Frogs** croak loudly -- they love the **moisture**!\n**Cows** lie down -- they feel **pressure** changes\n\nTry the **Storm Closeness** slider to watch them react!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'try', label: "Let me bring the storm closer!", nextNodeId: 'experiment' }
            ]
        },
        experiment: {
            id: 'experiment',
            speaker: 'AI',
            content: "Slide the **storm** closer and watch the animals. Which one reacts first?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'experiment' } },
            options: [
                { id: 'birds', label: "The birds started flying lower!", nextNodeId: 'checkpoint', sentiment: 'positive' },
                { id: 'all', label: "They all start changing at different times.", nextNodeId: 'checkpoint', sentiment: 'positive' },
                { id: 'unsure', label: "I'm not sure what to watch.", nextNodeId: 'hint' }
            ]
        },
        hint: {
            id: 'hint',
            speaker: 'AI',
            content: "Watch each animal carefully as you slowly move the slider:\n\n- The **bird** drops lower in the sky\n- The **ants** start walking in a line\n- The **frog** shows ripple rings (croaking!)\n- The **cow** lies down on the grass\n\nThey each react at a different **storm distance**!",
            options: [
                { id: 'see_it', label: "Now I see them all reacting!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Quick check!** Farmers used to say \"When cows lie down, rain is on the way.\" Based on what you just saw, why might that be true?",
            options: [
                { id: 'pressure', label: "Cows can feel the air changing before the storm arrives.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'tired', label: "Cows are just tired and feel like resting.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "That's a fair guess! But scientists think cows actually sense the drop in **air pressure** that comes before rain. The pressure change makes them uncomfortable standing, so they lie down.\n\nAnimals have been reading the weather for millions of years before we invented weather apps!",
            options: [
                { id: 'retry', label: "So their bodies feel the storm coming!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "That's right! Animals feel things in the air that humans can't. **Birds**, **ants**, **frogs**, and **cows** all react to changes in **pressure**, **moisture**, and **temperature** -- nature's early warning system!\n\nPeople noticed these **animal behaviors** long before we had weather radar.",
            options: [
                { id: 'disc', label: "Animals are amazing weather predictors!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered nature's weather reporters!**\n\nAnimals sense tiny changes in the **air pressure**, **moisture**, and **temperature**. Each species has its own special way of reacting -- flying low, marching, croaking, or lying down.\n\nNext time you see **birds** flying low or hear **frogs** getting loud, a **storm** might be on its way!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "I'll watch for animal weather signs!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 26 Complete -- How Do We Predict Weather?**\n\nThree pieces of the weather prediction puzzle:\n\n- **Physics (P26): Hot Side, Cold Side** -- predicting **wind** by reading temperature and pressure differences\n- **Chemistry (C26): Cloud Factory** -- predicting **clouds and rain** by watching moisture levels (see also Lesson C8 for the full water cycle)\n- **Biology (B26): Animal Weather Reporters** -- predicting **storms** by observing how animals sense pressure, moisture, and temperature changes\n\n**Summary Table:**\n| Lesson | What to Watch | What It Predicts |\n| --- | --- | --- |\n| P26 Wind | Temperature difference between areas | Wind direction and strength |\n| C26 Clouds | Moisture levels in the air | Cloud formation and rain |\n| B26 Animals | Bird height, ant marching, frog croaking, cow lying down | Incoming storms |\n\nWeather follows patterns. People predicted weather for thousands of years by watching wind, clouds, and animals -- long before satellites and radar. Now you can too!\n\n**Explore more:**\n- P26 Hot Side, Cold Side\n- C26 Cloud Factory\n- B26 Animal Weather Reporters\n\n**Lesson B26 Complete!**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
