import { DialogNode } from '../../types';

export function getB43Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Designers used to build things for **the average person** -- average height, average reach, average grip.\n\nIt sounds sensible and fair. It turns out to be one of the most famous mistakes in design history.\n\nWhat do you think goes wrong when you design for the average?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Almost nobody is average in every way at once, so a design that fits the average fits hardly anyone properly.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "Nothing goes wrong -- the average is the best single answer, so most people will be well served.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Here is what actually happened. Air force engineers measured thousands of pilots and built cockpits for the average of ten body measurements.\n\nThen someone checked how many pilots were close to average on **all ten**.\n\nThe answer was **zero**. Not one single pilot. Plenty were average in height, or average in arm length -- but nobody was average in everything at once. The cockpit fitted nobody, and pilots were crashing because of it.\n\nThe fix was not a better average. It was **adjustable seats** -- which is why every car has one today.",
            options: [
                { id: 'cont', label: "So nobody is actually average in everything?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Good design plans for the **range** of real people, not a made-up middle:\n\n1. Bodies vary in **height**, reach, grip strength, eyesight and hearing\n2. Nobody sits in the middle of all of them at once\n3. So designs need to **adjust**, or work across a wide range\n4. A design that works for the widest range is called **accessible**\n\nThe surprise is how often accessible design helps everyone. Ramps were built for wheelchairs -- and are now used by anyone with a pram, a suitcase or a delivery trolley. Subtitles were built for deaf viewers, and are used by half the people watching on a noisy bus.\n\nIn the picture you can change a **ramp slope**, and the **people served bar** shows how many can use it comfortably.\n\nSlide **Ramp Slope** and see who gets left out!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me find a slope that works for everyone!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A school must add a ramp. The steepest, shortest ramp is cheapest and takes the least space.\n\nWhat is wrong with choosing it?",
            options: [
                { id: 'right', label: "A steep ramp is too hard for many people to use, so it technically exists but does not actually give access.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nothing is wrong -- a ramp is a ramp, and having one at all is what matters.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A ramp that people cannot climb is not really access -- it is the **appearance** of access.\n\nPushing yourself up a slope means fighting gravity the whole way. This is the **levers and ramps** idea from **P5**: a gentle slope needs less force but a longer distance, while a steep slope needs a lot of force over a short one.\n\nGuidelines usually ask for about **1 metre of ramp for every 12 centimetres of height**. Much steeper than that and a person in a wheelchair may be unable to get up it alone, and going down becomes genuinely dangerous.\n\nThe cheap ramp saves money and delivers nothing.",
            options: [
                { id: 'retry', label: "Oh -- a ramp nobody can climb is not access at all!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Access means usable, not merely present.**\n\nAll three lessons of Big Idea 43 are the same habit of mind:\n- **P43** -- do not resist the force, take **longer to stop** it\n- **C43** -- do not make it hard, make it **crushable** in the right way\n- **B43** -- do not design for the average, design for the **range**\n\nEach one replaces an obvious-sounding answer -- be stronger, be harder, be average -- with a better one that comes from actually studying what people and materials do.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Design for the range, not the average!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how design serves real people!**\n\n- Designing for **the average** fits almost nobody\n- Air force cockpits built this way fitted **zero** pilots\n- Real bodies vary in height, reach, strength and senses\n- Good design **adjusts** or covers a wide **range**\n- Design that works for the widest range is **accessible**\n- Accessible features usually help everyone, not just a few\n\nP43 softened the blow, C43 chose the material, and B43 made sure it fits real people!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Design for real people, not made-up averages!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 43 -- B43 Complete!**\n\nDesigned for Everyone -- How Do We Design for Safety and Accessibility?\n\nSafety and accessibility both come from studying what really happens, not from what sounds sensible.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| The average person does not exist | Zero pilots fitted the average | Famous design failure |\n| Bodies vary in many ways at once | Design for the **range** | Adjustable seats everywhere |\n| Usable beats merely present | A steep ramp is not access | Guidelines exist for a reason |\n| Accessible design helps everyone | Ramps, subtitles, big buttons | Not just for a few |\n\n**Big Idea 43 connections:**\n- P43 (Softening the Blow) showed that a longer stop means a smaller force, which is why crumple zones fold\n- C43 (Materials That Protect) showed that helmet foam saves you by crushing, and only works once\n- B43 (Designed for Everyone) showed that designing for the average fits nobody, so real design plans for the range!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
