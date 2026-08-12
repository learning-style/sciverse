import { DialogNode } from '../../types';

export function getB34Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A farmer can have perfect water (**P34**) and perfect fertilizer (**C34**) and still harvest almost nothing.\n\nThat is because a farm is not a machine -- it is a **community of living things**. Bees, worms, birds, insects, and microbes all show up whether the farmer invites them or not.\n\nWhat do you think happens to an apple orchard with no **pollinators**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'nofruit', label: "The trees grow fine but make almost no apples, because flowers need pollen moved between them to form fruit.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'fine', label: "The trees are healthy, so they will make a normal crop of apples -- bees are just a nice extra.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The tree really will look healthy -- green, leafy, and strong. But it will barely make any fruit!\n\nA flower has to receive **pollen** from another flower before it can grow into a fruit. Apple trees cannot move pollen themselves, so they rely on insects to carry it. No pollen delivery means no apple.\n\nOrchards without bees lose **80-90%** of their fruit. Some farmers in places where pollinators have vanished now hire people to pollinate every single blossom by hand with a paintbrush.",
            options: [
                { id: 'cont', label: "So no pollinators means almost no fruit at all?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Every farm depends on a whole **team** of living helpers:\n\n1. **Pollinators** (bees, butterflies, moths) -- carry **pollen** so flowers become fruit and seeds\n2. **Earthworms** -- tunnel through soil, letting in air and water for roots\n3. **Soil microbes** -- the **decomposers** from C33, unlocking nutrients\n4. **Predator insects** (ladybugs, spiders) -- eat the pests that eat the crop\n5. **Pests** -- the team members nobody wants, chewing leaves and roots\n\nHere is the tricky part. A spray that kills pests usually kills **ladybugs and bees too**. Wipe out the predators, and the pests come back with nothing left to stop them.\n\nSlide **Pollinator Count** and watch the harvest respond!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me see how pollinators change the harvest!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A farmer sprays a strong pesticide over the whole farm to stop an aphid outbreak. It works -- the aphids die. But the next year the aphids come back **worse than ever**.\n\nWhy?",
            options: [
                { id: 'right', label: "The spray also killed the ladybugs and spiders that ate aphids, so nothing was left to control them when they returned.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The farmer did not use enough spray -- a stronger dose next time would finish the job.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Spraying harder is exactly the trap many farms fall into -- and it usually makes things worse!\n\nHere is why. Aphids **breed extremely fast** -- a new generation every week. Ladybugs breed slowly. So after a spray kills both, the aphids bounce back in days while their **predators** take a whole season to recover. The aphids return to a farm with no defenders left.\n\nWorse, the few aphids that survive are the ones that happened to resist the chemical. They pass that resistance to their young, so the spray works less and less each year.\n\nThe fix is **integrated pest management**: protect the predators, and spray only where and when it is truly needed.",
            options: [
                { id: 'retry', label: "Oh -- killing the helpers made the pests stronger!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! A farm is a **living system**, and living systems push back.\n\nAll three lessons in Big Idea 34 come together here:\n- **P34** -- move water efficiently, drop by drop, or lose half of it\n- **C34** -- feed the soil the right nutrients in the right dose, or pollute the river\n- **B34** -- protect the living team, or the pests win\n\nThe farms that feed the most people over the longest time are the ones that work **with** these systems instead of fighting all three at once.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Water, chemistry, and living helpers all decide the harvest!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered the living side of farming!**\n\n- **Pollinators** move **pollen** so flowers can become fruit -- no bees, no apples\n- **Earthworms** and **soil microbes** keep soil loose and fertile\n- **Predator insects** are free pest control\n- Broad sprays kill helpers along with pests\n- Pests breed faster than predators, so they recover first\n- **Integrated pest management** protects the helpers\n\nP34 moved the water, C34 fed the soil, and B34 showed the living team that turns it into food!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "A farm is a living community, not a machine!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 34 -- B34 Complete!**\n\nThe Farm Team -- How Do Farms Feed a Growing World?\n\nFeeding billions of people takes water, chemistry, and a healthy living community all at once.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Flowers need pollen delivered | **Pollinators** make fruit possible | No bees means 80-90% less fruit |\n| Worms and microbes build soil | Living soil, healthy roots | Free fertility |\n| Ladybugs eat pests | **Predator insects** are free pest control | Fewer sprays needed |\n| Broad sprays backfire | Pests recover faster than predators | Outbreaks return worse |\n\n**Big Idea 34 connections:**\n- P34 (Water on the Move) showed how drip irrigation gets 90% of water to the roots\n- C34 (Plant Food Chemistry) showed how N-P-K feeds crops but runoff feeds algae\n- B34 (The Farm Team) showed how pollinators, worms, and predator insects turn that water and chemistry into an actual harvest!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
