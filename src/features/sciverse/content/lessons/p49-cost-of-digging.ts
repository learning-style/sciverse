import { DialogNode } from '../../types';

export function getP49Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Nearly everything around you started underground. The copper in your phone charger, the iron in a bicycle, the aluminium in a drinks can -- all of it was dug out of rock somewhere.\n\nThese are the **Earth's resources**, and using them **responsibly** has to start with knowing what they really cost to get.\n\nHere are two copper mines. They pull up exactly the same amount of copper every year.\n\nAt Mine A the copper sits **20 metres** down. At Mine B it sits **400 metres** down.\n\nMine B burns far, far more fuel than Mine A. Why?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Every single load has to be lifted 400 metres instead of 20, and lifting something further costs more.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Rock that deep is much harder, so the drills have to fight their way through it.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Deep rock is not especially harder. Rock is rock. A drill barely notices the difference.\n\nThe cost is in the **lifting**.\n\nThink about carrying a heavy bag up one step. Easy. Now carry the same bag up twenty flights of stairs. You are exhausted, and the bag never changed. The **height** changed.\n\nA mine does that all day, with tonnes instead of a bag. And it is worse than it sounds, because the ore is not the only thing coming up. To reach ore at 400 metres you must first move the **waste rock** sitting on top of it -- the plain rock with no metal in it. Then you have to pump the water out, because deep holes fill with water, and pump fresh air down, because people have to breathe.\n\nEvery one of those jobs gets harder the deeper you go.",
            options: [
                { id: 'cont', label: "So the depth is what costs, not the hardness?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Digging follows three rules.\n\n**1. Deeper ore costs more energy.** Every load is lifted further, so every load costs more.\n\n**2. You move the waste rock too.** Everything above the ore has to come out first, or be tunnelled through.\n\n**3. Mines get deeper as the years pass.** This one surprises people.\n\nThat third rule is not bad luck. When miners arrive somewhere new, they take the ore nearest the surface, because it is the cheapest to reach. Anyone would. But that means the shallow ore is used up first, and whatever is left is always deeper than what came before.\n\nSo the same mine, digging up the same amount of metal, quietly costs more every single year it stays open.\n\nIn the picture, the ore sits in a layer and a load is winched up the shaft.\n\nSlide **Ore Depth** and watch the energy needed climb!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me change how deep the ore is!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A mine has been working for 50 years. It brings up the same amount of metal every year, and it has replaced its old machines with newer ones twice.\n\nYet its fuel bill has gone up in every one of those 50 years.\n\nWhy?",
            options: [
                { id: 'right', label: "The shallow ore was taken first, so each year the miners are lifting their loads from further down than the year before.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The machines wear out as they get older, so they use more and more fuel to do the same work.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Machines really do wear out. But look again at the clue hiding in the question -- this mine **replaced** its machines with newer ones, twice.\n\nAnd the fuel bill still went up. Every year. Through both sets of new machines.\n\nSo the machines cannot be the answer. Something is changing that no amount of new equipment can fix.\n\nIt is the **depth**. In year 1 they were lifting from near the surface, because that ore was easiest. By year 50 all of that is long gone, and every load comes up from far deeper.\n\nBetter machines slowed the rise down. They could not stop it. **The mine is not doing the same job it did in year 1 -- it is doing a harder version of that job, and it gets harder every year.**",
            options: [
                { id: 'retry', label: "Oh -- the easy ore went first, so what is left is deeper!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **The easiest ore goes first, so digging gets more expensive over time.**\n\n- Lifting costs more the **further** you lift\n- **Waste rock** above the ore must be moved as well\n- Deep mines must be pumped dry and given fresh air\n- Shallow ore is always taken first\n- So the same mine costs more energy every year\n\nSo now you have a bucket of rock at the surface, and it cost a great deal to get there.\n\nBut it is a bucket of grey **rock**. You cannot plug a bucket of rock into a phone. Where is the metal, and how do you get it out? That is C49!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Mines get deeper, so they cost more every year!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered what digging really costs!**\n\n- Almost everything we use began as rock underground\n- The cost of a mine is mostly the cost of **lifting**\n- **Deeper ore means more energy** for every load\n- **Waste rock** above the ore must be moved too\n- Deep mines need pumping out and fresh air pumped down\n- The shallow ore is always taken first\n- So mines get deeper, and dearer, every year they work\n\nNext in C49: how you get metal out of a bucket of grey rock!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Deeper ore means more energy for every load!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P49 Complete -- The Cost of Digging!**\n\nEverything we dig up has to be lifted, and the easy stuff always goes first.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Lifting is the real cost | Further up means more **energy** | 400 metres costs far more than 20 |\n| Waste rock moves too | Ore is buried under plain rock | You lift far more than you keep |\n| Deep mines need pumps | Water in, fresh air down | More machines, more fuel |\n| The easy ore goes first | What is left is always deeper | The bill rises every year |\n\n**Up next:** C49 (From Rock to Metal) -- getting the metal out of the rock!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
