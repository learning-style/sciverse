import { DialogNode } from '../../types';

/**
 * P30 — Diffusion Timing & Transport Rates
 * Big Idea 30: "How Do Medicines Reach the Right Place?"
 *
 * Rewritten for Level 1 (grades 3-5). The first draft handed a nine-year-old
 * Fick's Law as "flux = -D x (concentration difference / distance)", called the
 * relationship linear, and leaned on lipid solubility and the blood-brain
 * barrier. Level 1 carries no formulas at all. The physics is unchanged --
 * crowding drives the spreading, and the slowest barrier sets the wait -- and
 * every word the lab prints is defined where the learner meets it.
 */
export function getP30Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: `You swallow a pill for a headache. The pill goes to your stomach. The ache is in your head. Nobody carries the medicine up there, and it has no legs. So how does it arrive?\n\nIt spreads. That is all. Spreading has a name in physics: **diffusion**.\n\nDrop one blob of food colouring into a glass of still water and leave it alone. It creeps outward until the whole glass is faintly coloured. Nothing stirred it. The colour started out all crowded into one spot, and crowded things spread towards where it is emptier. How crowded something is in one place is its **concentration**: lots of medicine squeezed into a small space is a high concentration, and thinly spread out is a low one.\n\n**What you will see:**\n- **Intake site**: where the medicine goes in. It is most crowded here.\n- **Target tissue**: the part of the body you want to help. **Tissue** just means the stuff a body part is made of.\n- **Drug molecule**: one piece of medicine. A **molecule** is the smallest piece of something that is still that thing.\n- **Tissue barrier**: a wall the medicine has to get through, like the wall of your gut. A **barrier** is anything in the way. Once a molecule is **past barrier** it is through to the other side.\n- **Timer**: the **delivery time** — how long until enough medicine has arrived to help.\n\n**The two dials:**\n- **Diffusion rate** is how fast the spreading goes.\n- **Permeability** is how easy a barrier is to get through. Think of a string vest against a raincoat: high permeability lets things through easily, low permeability hardly lets anything through at all.\n\nTogether they set the **delivery speed**.\n\nHere is the question. The same medicine, the same amount: why does an injection work sooner than a pill?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'physics_answer', label: 'The injection puts it straight into the blood, so it skips the walls a pill has to get through first.', nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'simple_answer', label: 'Because the medicine in an injection is stronger.', nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: `Often it is the very same medicine, and the very same amount. The difference is not strength. It is the journey.\n\nA pill has a queue of jobs to get through first. It has to dissolve — break up and disappear into liquid. Then the dissolved medicine has to cross the wall of your gut to reach your blood. Only then can it spread to where the ache is. Two walls and a wait.\n\nAn injection begins in the blood. Those first jobs are already done, so it skips them.\n\nThe spreading itself happens at the same speed in both cases. The pill is not slower at spreading; it is just later starting. In physics that is the whole idea: **fewer barriers, sooner there**.`,
            options: [
                { id: 'cont', label: 'So it is about how soon the medicine reaches the blood, not how strong it is.', nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: `That is it. Two things decide how long you wait, and they are your two dials.\n\n1. **Diffusion rate** — how fast the medicine spreads through tissue. The bigger the crowding difference between the two ends, the faster it pushes outward. Put a lot in one spot and it spreads away from there in a hurry. Once both ends are nearly equally crowded, the spreading almost stops, because there is no longer anywhere emptier to go.\n2. **Permeability** — how easily the medicine gets through the walls in its way. Some walls are full of gaps and barely slow it. Others are packed tight and let almost nothing through.\n\nTogether they give the **delivery time**:\n- **Minutes**: straight into the blood, spreading fast, nothing much in the way.\n- **Half an hour or so**: a swallowed pill, which has to dissolve and cross the gut wall first.\n- **Hours**: a sticky patch on your skin. Skin is built to keep things out, so it has very low permeability — and that slowness is on purpose, because a patch is meant to last all day.\n\nAnd this is not a special medicine rule. It is the same spreading that carries the smell of baking to the next room, and warmth along the handle of a spoon left in a hot drink.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'mech', label: 'Show me the whole journey, step by step.', nextNodeId: 'mechanism' }
            ]
        },
        mechanism: {
            id: 'mechanism',
            speaker: 'AI',
            content: `**The journey of one medicine molecule:**\n\n1. **In it goes.** The medicine enters you by being swallowed, injected, or soaked in through the skin from a patch. Wherever it starts is the **intake site**.\n2. **It dissolves.** A solid lump cannot spread anywhere. Only medicine that has dissolved into liquid can drift, so nothing happens until that is done.\n3. **It crosses the first wall.** From your gut into your **bloodstream** — the blood travelling round and round your body. A wide, wrinkly wall gets more medicine through at once than a small smooth one, which is why your insides are so wrinkly.\n4. **It gets a lift.** Blood is pumped right round your body every minute or so, and the medicine rides along. This part is not spreading at all — it is being carried, and being carried is far quicker than drifting. This is why medicine reaches your whole body long before it has finished spreading anywhere.\n5. **It spreads out of the blood.** At the far end the blood is crowded with medicine and the tissue around it has none, so medicine diffuses out into the tissue. Crowded towards empty, once again.\n6. **It arrives.** Enough medicine builds up around the cells that were the point of the whole trip, and you start to feel better.\n7. **It is cleared away.** Your body is busy breaking the medicine down and getting rid of it the entire time. As that goes on the crowding falls, the spreading fades, and the pill wears off.\n\nThose seven steps are the **transport cycle**, and a **cycle** is a set of steps that comes round to the start again, ready for the next dose.\n\n**The catch:** you only travel as fast as your slowest step. It does not matter how quick the spreading is if the medicine is stuck at a wall it can barely get through. A step like that is a **bottleneck** — the narrow neck of a bottle decides how fast it pours, however wide the bottle is.\n\n**Try it:** set a fast diffusion rate but very low permeability. Does the medicine still arrive quickly?\n\nReady for a checkpoint?`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'mechanism' } },
            options: [
                { id: 'cp', label: 'Test my understanding.', nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: `**Checkpoint:** A pill takes about 30 minutes before it starts helping. Someone reasons: if I take two pills, there is twice as much medicine, so it should start helping in 15 minutes.\n\nAre they right?`,
            options: [
                { id: 'right', label: 'No. Twice the medicine does spread faster, but it still has to dissolve and cross the gut wall, and that part takes the same time. A bit sooner, nowhere near half.', nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: 'Yes — twice as much medicine means half the waiting.', nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: `It is a reasonable guess, and one part of it is true: more medicine crowded at the start really does make the spreading faster. But spreading was never the slow part.\n\nRemember the bottleneck. Before any spreading can happen, the pill has to dissolve and the medicine has to cross the wall of your gut. **Two pills do not dissolve any faster than one, and the gut wall does not widen because you took another pill.** Those steps take as long as they always did.\n\nSo two pills might start helping in something like 20 to 25 minutes rather than 30. Not 15.\n\nAnd here is the part that matters more than the timing. Two pills means twice as much medicine in you, which can push you out of the **therapeutic window** — the safe middle, where there is enough medicine to help but not so much that it does harm. You would not arrive much sooner, and you might arrive somewhere unsafe. That is why "take two" never means "works twice as fast", and why the box tells you how many to take.`,
            options: [
                { id: 'retry', label: 'So the slowest step sets the wait, and taking more does not widen it.', nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: `Correct. The wait is made of several steps in a row — dissolving, crossing the gut wall, riding the blood, spreading into tissue — and the slowest one runs the show. Adding more medicine speeds the spreading and leaves the bottleneck exactly where it was.\n\nSo anyone designing a medicine goes after the bottleneck itself:\n- **Make the molecule smaller.** Small pieces slip through tight walls more easily than big ones.\n- **Make it oily rather than watery.** The walls around your cells are oily, and something oily slides through an oily wall far more readily.\n- **Go round the wall.** An injection skips the gut entirely. There is no beating a wall you never meet.\n- **Send it in a tiny carrier.** Pack the medicine inside a bubble far too small to see, built so the wall lets that bubble through when it would have turned the bare medicine away.`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: 'Show me the big picture.', nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: `**Discovery:** medicine arrives by spreading, and waits at walls.\n\n- **Diffusion** carries things from crowded places towards emptier ones, with nothing pushing them\n- The bigger the crowding difference, the faster the spreading — and once the crowding **equalizes**, meaning both ends even out to the same crowding, the spreading dies away\n- **Permeability** says how easily a **barrier** is crossed; skin is deliberately hard to cross\n- **Delivery time** is set by the slowest step, not the fastest\n- More medicine does not widen a bottleneck\n- Which route you take decides which walls you meet\n\nThe same spreading brings oxygen from your lungs into your blood, carries food out of your gut, and, less happily, lets **pollutants** — waste that dirties the water — creep through the ground far from where they were spilled.`,
            options: [
                { id: 'done', label: 'Complete P30', nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: `🔗 **Big Idea 30 — How Do Medicines Reach the Right Place?**\n\n- **Physics (P30): Diffusion Transport** — crowded spreads towards empty, and every wall on the way adds to the wait\n- **Chemistry (C30): Drug Solubility** — how fast it dissolves, and a coating that decides when it is let out\n- **Biology (B30): Target Cells** — receptors on a cell decide whether it answers at all\n\n**Summary Table:**\n| Dial | Turned low | Turned high | What it changes |\n| --- | --- | --- | --- |\n| Diffusion rate | Creeps along | Spreads quickly | How fast medicine moves through tissue |\n| Permeability | Walls block nearly everything | Walls let it straight through | How much gets past the barriers |\n| Delivery time | Minutes, straight into the blood | Hours, through a skin patch | How long before you feel better |\n\n**Key takeaways:**\n- Nothing pushes the medicine. Crowding does the work, all by itself\n- Spreading slows to nothing once both ends are equally crowded\n- The slowest step sets the wait, and that step is usually a wall\n- An injection is faster because it skips walls, not because it is stronger\n- Taking more does not shorten the wait, and can take you out of the safe window\n\n✅ **Lesson P30 Complete!**`,
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
