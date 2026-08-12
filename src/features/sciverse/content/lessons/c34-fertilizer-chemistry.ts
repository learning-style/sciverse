import { DialogNode } from '../../types';

export function getC34Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Plants build themselves out of air, water, and sunlight -- but they cannot make everything they need. They also have to pull **nutrients** out of the soil.\n\nWhen a farmer harvests a crop, those nutrients leave the field inside the food. So farmers add **fertilizer** to put them back.\n\nWhat do you think happens if a farmer adds twice as much fertilizer as the plants need?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'runoff', label: "The plants take what they need and the rest washes into rivers, where it causes new problems.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'double', label: "The plants grow about twice as big -- more plant food means more plant.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That feels right, but plants are not like sponges -- a plant can only absorb so much!\n\nOnce a plant has all the **nitrogen** it can use, extra fertilizer just sits in the soil. Then it rains, and the leftover dissolves and washes away into streams and rivers. That is called **nutrient runoff**.\n\nToo much fertilizer can even **hurt** the crop by pulling water out of the roots -- farmers call it \"burning\" the plants. More is genuinely not better.",
            options: [
                { id: 'cont', label: "So extra fertilizer just leaves the field and pollutes water?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Fertilizer mainly supplies three **elements**, and each has a job:\n\n1. **Nitrogen (N)** -- builds green leaves and stems\n2. **Phosphorus (P)** -- builds roots, flowers, and seeds\n3. **Potassium (K)** -- helps the plant handle stress and disease\n\nThat is why fertilizer bags are labelled with three numbers, like **10-10-10**.\n\nBut here is the chemistry problem: these nutrients **dissolve in water**. That is exactly what lets roots absorb them -- and exactly what lets rain carry the leftovers to the river. In the river, that nitrogen feeds an explosion of **algae**, which then rots and uses up the oxygen fish need.\n\nSlide **Fertilizer Amount** and watch both the crop *and* the river!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me find the amount that helps without polluting!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A farmer spreads fertilizer on Monday. A heavy thunderstorm arrives Monday night. A neighbour spreads the same fertilizer, but checks the forecast first and waits for a dry week.\n\nWho gets more value from their fertilizer?",
            options: [
                { id: 'right', label: "The neighbour -- rain would dissolve the fertilizer and wash it off the field before roots could absorb it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The first farmer -- rain waters the fertilizer in, so the storm helps the plants get it faster.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A *light* rain really does help wash fertilizer down to the roots. But a **heavy storm** is a different story.\n\nRoots absorb nutrients slowly, over days. A downpour dissolves the fertilizer in minutes and sends it sheeting across the surface into ditches and streams. The farmer paid for the fertilizer, the crop never got it, and the river got a dose it did not need.\n\nThis is why careful farmers watch the forecast, split fertilizer into several small doses, and use **slow-release** pellets that dissolve gradually.",
            options: [
                { id: 'retry', label: "Oh -- heavy rain washes it away before roots can drink it!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! The trick is matching the **timing and the amount** to what the plant can actually absorb:\n\n- **Small, repeated doses** beat one giant dose\n- **Slow-release** pellets dissolve over weeks, not minutes\n- **Soil testing** tells the farmer what is actually missing\n- **Cover crops** hold soil and nutrients in place between seasons\n\nThink back to **C33 Nature's Recycling Loop** -- a wild meadow never needs fertilizer, because decomposers return every nutrient to the soil. A farm breaks that loop by carrying the harvest away, so humans have to close it by hand.\n\nIn B34 you will meet the living helpers that decide whether the harvest succeeds at all!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Match the dose to what the plant can use!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the chemistry of feeding plants!**\n\n- Fertilizer supplies **nitrogen**, **phosphorus**, and **potassium** (the N-P-K numbers)\n- Nutrients must **dissolve in water** for roots to absorb them\n- Whatever the plant cannot absorb becomes **nutrient runoff**\n- Runoff feeds **algae** blooms that steal oxygen from fish\n- **Slow-release** fertilizer and split doses waste far less\n- Harvesting breaks the natural **nutrient cycle**, so farmers must close it\n\nNext in B34: the bees, worms, and pests that decide your harvest!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "More fertilizer is not better fertilizer!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C34 Complete -- Plant Food Chemistry!**\n\nPlants need specific elements, in the right amount, at the right time.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Plants need N, P, and K | **Nitrogen**, **phosphorus**, **potassium** | The 3 numbers on the bag |\n| Nutrients must dissolve | Water carries them to roots | Also carries them away |\n| Extra fertilizer escapes | **Nutrient runoff** | Algae blooms kill fish |\n| Timing beats quantity | Small doses, dry days | Cheaper and cleaner |\n\n**Up next:** B34 (The Farm Team) -- the living creatures that make or break a harvest!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
