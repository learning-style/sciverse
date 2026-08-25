import { DialogNode } from '../../types';

export function getP41Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Roll one dice and you cannot guess what you will get. Roll it **600 times** and something surprising happens -- you get almost exactly 100 of each number.\n\nSo a single roll is unpredictable, but a thousand rolls are very predictable.\n\nHow can something random turn into something you can count on?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Each roll is a surprise, but over many tries the lucky and unlucky results even out into a pattern.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The dice must remember its past rolls and balance itself out.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A dice has no memory! It cannot know what it rolled before -- every roll starts fresh with exactly the same chance.\n\nWhat really happens is that **unusual runs get outnumbered**. Three sixes in a row is strange in three rolls, but meaningless in a thousand. The oddity is not cancelled out; it just becomes a tiny part of a much bigger pile.\n\nThat is why **small samples wobble** and **big samples settle** -- the same idea you met in B40.",
            options: [
                { id: 'cont', label: "So the pattern appears because the odd results get outnumbered?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! This is the **law of large numbers**, one of the most useful ideas in all of science:\n\n1. **One try** -- completely unpredictable\n2. **Ten tries** -- still wobbly and easily misleading\n3. **A hundred tries** -- a pattern starts to show\n4. **A thousand tries** -- very close to the true chance every time\n\nScientists rely on this constantly. Nobody can predict which way a single molecule will bounce, but with trillions of them the overall behaviour is so dependable that engineers build machines on it.\n\nSlide **Number of Rolls** and watch the bars even out!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me roll more and more times!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** You flip a coin 10 times and get 7 heads. A friend says the coin must be unfair.\n\nIs your friend right?",
            options: [
                { id: 'right', label: "Not necessarily -- 7 out of 10 happens quite often by luck alone. You would need far more flips to tell.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- a fair coin should give exactly 5 heads out of every 10 flips.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A fair coin gives **5 heads on average**, but it almost never gives exactly 5 in any particular set of 10!\n\nGetting 7 heads out of 10 with a perfectly fair coin happens roughly **one time in every eight** attempts. That is common enough to tell you nothing at all.\n\nNow flip **1,000** times. A fair coin will land very close to 500. If you got 700, *that* would be strong evidence something is wrong.\n\nThe number of tries decides how much a result is worth -- exactly the **sample size** rule from B40.",
            options: [
                { id: 'retry', label: "Oh -- 10 flips is far too few to judge!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **Small samples wobble, so they prove very little.**\n\nThis is why:\n- Weather forecasts give a **chance** of rain, not a promise\n- Medicines are tested on thousands of people, not on ten\n- A shop can predict its weekly sales without knowing any single customer\n\nRandom close up, predictable at a distance. Coming up in C41, you will find the same rule running inside every chemical reaction!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "More tries means a more trustworthy answer!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how randomness becomes predictable!**\n\n- A single random event cannot be predicted\n- Many events together form a reliable **pattern**\n- This is the **law of large numbers**\n- Dice and coins have **no memory** -- each try starts fresh\n- Unusual runs are not cancelled out; they are **outnumbered**\n- **Small samples wobble**, so they prove very little\n\nNext in C41: why chemical reactions need luck as well as energy!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Randomness makes patterns when you look at enough of it!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**P41 Complete -- Rolling the Dice!**\n\nOne random event tells you nothing. Thousands of them tell you almost everything.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| One try is unpredictable | Randomness is real | You cannot guess a single roll |\n| Many tries make a pattern | **Law of large numbers** | Science depends on it |\n| Dice have no memory | Each try is independent | Past rolls change nothing |\n| Small samples wobble | Few tries prove little | 7 heads in 10 means nothing |\n\n**Up next:** C41 (Lucky Collisions) -- why reactions need luck as well as energy!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
