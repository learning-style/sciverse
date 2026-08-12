import { DialogNode } from '../../types';

export function getP35Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A recycling plant receives a river of jumbled trash -- cans, bottles, paper, and plastic all mixed together -- and somehow sends each material out a different door.\n\nA single facility can sort **tens of tonnes an hour**, far faster than any human could pick through it.\n\nHow do you think a machine tells a steel can apart from a plastic bottle?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'properties', label: "It uses physical properties -- magnets grab steel, air blows light things aside, and water floats some plastics.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'people', label: "Workers must pick out every item by hand -- machines cannot tell materials apart.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "People do check the line at the end, but they could never keep up with tonnes per hour by themselves!\n\nThe clever trick is that machines do not need to *recognise* a can. They just need to exploit a **physical property** that steel has and plastic does not.\n\nSteel is **magnetic**, so a giant magnet lifts it straight off the belt. Paper is **light**, so a blast of air pushes it sideways while heavy items keep going. Some plastics **float** and others **sink**. Every material gets separated by something it cannot help being.",
            options: [
                { id: 'cont', label: "So machines sort by properties, not by recognising objects?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! A sorting line is a chain of physics tricks, each removing one material:\n\n1. **Big screens** shake and tumble -- small items fall through holes, big ones ride on\n2. **Magnet** -- lifts out steel and iron (**magnetic** metals)\n3. **Eddy current** -- a spinning magnetic field that literally **flings aluminium** off the belt, even though aluminium is not magnetic!\n4. **Air jets** -- blow away light paper and film while heavy items continue\n5. **Float tank** -- plastics less **dense** than water float; denser ones sink\n\nBut speed is a trade-off. Run the belt too fast and items pile on top of each other, so the magnet and air jets miss them.\n\nSlide **Conveyor Speed** and find the setting that sorts the most!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me find the best belt speed!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** Someone puts a greasy pizza box and an unrinsed jar of pasta sauce into the recycling bin, thinking \"more recycling is better.\"\n\nWhat actually happens at the plant?",
            options: [
                { id: 'right', label: "The grease and food can ruin the paper and plastic around them, so a whole batch may get thrown away instead of recycled.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "No problem -- the machines wash everything before sorting it anyway.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Sorting machines separate -- they do not wash. That happens much later, and only after a material has already been sorted into the right pile.\n\nGrease soaks into cardboard fibres and cannot be removed, so oily paper is genuinely not recyclable. Worse, food sludge smears onto the clean paper travelling next to it, and sticky items **jam the screens**.\n\nWorkers call this **contamination**, and if a bale of paper is too contaminated, the whole bale gets rejected and sent to landfill. One dirty item really can spoil a batch. Rinsing containers is the single most useful thing a household can do.",
            options: [
                { id: 'retry', label: "Oh -- dirty items contaminate the clean ones around them!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Sorting machines are amazing at physics but helpless against mess:\n\n- **Magnets** grab steel; **eddy currents** fling aluminium\n- **Air** separates by weight; **water** separates by **density**\n- The right **belt speed** spreads items into a single layer\n- **Contamination** defeats all of it\n\nThat is why recycling starts in your kitchen, not at the plant. Sorted and rinsed material is worth real money; contaminated material costs money to bury.\n\nOnce materials are separated, chemistry takes over. In C35 you will see how a crushed can becomes a brand new one!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Physics sorts it, but only if it is clean!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how machines sort our trash!**\n\n- Machines sort by **physical properties**, not by recognising objects\n- **Magnets** pull out steel; **eddy currents** fling out aluminium\n- **Air jets** separate light from heavy; float tanks separate by **density**\n- Belt speed matters -- too fast and items stack up and get missed\n- **Contamination** from food and grease can ruin an entire batch\n\nNext in C35: what happens to those sorted piles when the heat comes on!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Sorting is physics -- and clean input makes it work!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P35 Complete -- The Sorting Machine!**\n\nRecycling plants use physical properties to pull a mixed stream apart at high speed.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Magnets lift steel | Steel is **magnetic** | Fastest separation of all |\n| Eddy currents fling aluminium | Moving magnetic fields push metal | Works on non-magnetic metal |\n| Air and water sort the rest | Weight and **density** differences | No recognition needed |\n| Dirty items ruin batches | **Contamination** | Rinse before you bin |\n\n**Up next:** C35 (Melt and Remake) -- turning sorted scrap back into new material!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
