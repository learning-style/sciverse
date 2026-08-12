import { DialogNode } from '../../types';

export function getB35Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Put a banana peel in a compost bin and come back in two months. The peel is gone, and in its place is dark, crumbly, sweet-smelling soil.\n\nNo machines. No electricity. And if you push your hand into the middle of a big compost pile, it is **hot** -- sometimes 60 degrees Celsius, hot enough to be uncomfortable.\n\nWhere do you think that heat comes from?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'microbes', label: "Billions of tiny living microbes are eating the scraps, and the heat is released by all that feeding.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'sun', label: "The Sun heats the top of the pile and the warmth slowly sinks down into the middle.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Here is the clue that rules out the Sun: a compost pile is **hottest in the centre**, and it stays hot at night and even in winter. Sunlight would heat the outside, not the middle.\n\nThe heat is made **inside the pile, by living things**. Billions of **bacteria** and **fungi** are eating the scraps, and just like your own body, they release warmth as they break food down.\n\nThink back to **P33 The Energy Ladder** -- 90% of energy escapes as **heat** at every step. In a compost pile you can literally feel that lost energy.",
            options: [
                { id: 'cont', label: "So the microbes themselves are making the heat?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A compost pile is a **living recycling factory**, and the **decomposers** need four things:\n\n1. **\"Greens\"** -- wet scraps like fruit peel and grass, rich in **nitrogen**\n2. **\"Browns\"** -- dry material like dead leaves and cardboard, rich in **carbon**\n3. **Air** -- decomposers need **oxygen**, which is why you turn the pile\n4. **Water** -- damp like a wrung-out sponge, not soaking and not dry\n\nGet the mix right and the pile heats up fast. That heat is useful all by itself -- it **kills weed seeds and germs**.\n\nSlide **Moisture Level** to find the sweet spot where the crew works hardest!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me find the perfect moisture level!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Someone packs their compost bin tight with wet grass clippings and shuts the lid. Weeks later it is cold, slimy, and smells terrible.\n\nWhat went wrong?",
            options: [
                { id: 'right', label: "Too wet and packed, so no air could get in -- different microbes took over that work without oxygen and produce smelly gases.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The microbes all died, so nothing was left alive to break down the grass.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The microbes did not die -- a **different team took over**, and that is exactly the problem!\n\nWet, packed grass squeezes out all the air pockets. The fast, hot-working decomposers need **oxygen**, so they shut down. In their place, **anaerobic** microbes (ones that work without oxygen) move in.\n\nThose microbes are slow, they make no heat, and they release the gases that cause that awful rotten smell. The fix is simple: add dry **\"browns\"** like leaves or shredded cardboard, and **turn the pile** to let air back in. The good crew returns within days.",
            options: [
                { id: 'retry', label: "Oh -- no air means the smelly microbes take over!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Composting is really about **keeping the right microbes happy**: greens plus browns plus air plus the right dampness.\n\nAnd look at how Big Idea 35 fits together:\n- **P35** -- **physics** separates mixed materials using magnets, air, and density\n- **C35** -- **chemistry** melts metal back to new metal, but only downcycles plastic\n- **B35** -- **biology** does the whole job for food and garden waste, powered by nothing but microbes\n\nAbout **a third** of household rubbish is food and garden waste. Composted, it becomes free fertiliser -- exactly the **nutrient cycle** from C33, closed by hand.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Machines, chemistry, and microbes all recycle!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered nature's recycling crew!**\n\n- **Decomposers** (bacteria and fungi) eat scraps and release **heat**\n- A hot pile needs **greens** (nitrogen), **browns** (carbon), **air**, and water\n- Compost heat kills weed seeds and germs\n- No air means **anaerobic** microbes take over -- slow, cold, and smelly\n- **Turning** the pile brings the fast crew back\n- About a third of household waste could be composted\n\nP35 sorted it, C35 melted it, and B35 let living things finish the job!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Microbes turn waste into soil for free!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 35 -- B35 Complete!**\n\nThe Compost Crew -- How Can We Turn Waste Into Resources?\n\nWaste is only waste when nobody has worked out what it is worth.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Compost piles heat themselves | **Decomposers** release heat as they eat | Heat kills weed seeds and germs |\n| Greens plus browns plus air plus water | The 4 needs of the crew | Balance makes it fast |\n| Packed and wet turns smelly | **Anaerobic** microbes take over | Turn the pile to fix it |\n| A third of our rubbish is compostable | Food waste is a resource | Free fertiliser instead of landfill |\n\n**Big Idea 35 connections:**\n- P35 (The Sorting Machine) showed how magnets, air, and density pull mixed trash apart\n- C35 (Melt and Remake) showed why metal recycles forever but plastic only downcycles\n- B35 (The Compost Crew) showed how living microbes recycle food and garden waste into soil with no factory at all!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
