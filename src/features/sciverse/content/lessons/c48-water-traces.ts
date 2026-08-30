import { DialogNode } from '../../types';

export function getC48Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "There is a pond at the end of a field, and you want to know whether an **otter** ever visits it. Otters come at night and vanish the moment they hear you.\n\nYou could hide by the pond for a month and hope. Or you could scoop up a jar of pond water, carry it to a lab, and get your answer by Friday.\n\nA jar of plain water. How could that possibly tell you an otter was there?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Animals are always shedding tiny bits of themselves -- skin, scales, slime -- and those bits stay floating in the water after the animal leaves.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "The water changes colour slightly wherever an otter has been swimming, and the lab measures that colour.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "The water looks exactly the same. An otter leaves no colour behind at all.\n\nBut every living thing is constantly shedding **tiny bits of itself** -- flakes of skin, scales, slime, hair. You do it yourself all day long. In water those bits simply float away, far too small for your eye to see.\n\nAnd every one of those bits carries **DNA**. DNA is the instruction book found inside every living thing, and **every kind of animal has its own**. A flake of otter skin carries otter instructions and nothing else.\n\nSo the lab pours your jar through a very fine filter, catches the floating bits, and reads whose instructions they are. A bit of an animal left behind like this is called a **trace**.\n\nYou never see the otter. You find the traces it left.",
            options: [
                { id: 'cont', label: "So the animals leave bits of themselves behind in the water?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! And two things decide what you end up finding:\n\n**1. How much water you test.** Traces are thinly spread, so the amount of water matters enormously. Scientists measure it in **litres** -- a big drink bottle holds about two litres.\n\nA common **frog** leaves so many traces that a single litre will catch some. A **fish** or a **duck** needs a few litres. A **dragonfly** or a **newt** is scarcer, so you need more. And a single **otter** that swam past once leaves so few traces that you may need forty litres before you catch even one.\n\n**2. How fresh the traces are.** DNA does **not** last. Sunlight breaks it apart, warmth breaks it apart, and tiny bacteria in the water feed on it. After a few days there is nothing left that the lab can read.\n\nThat second one sounds like a problem, but it is the best part. It means the water is telling you who has been here **in the last few days** -- not who swam past last summer. The pond gives you fresh news.\n\nIn the picture, water goes through the filter and the traces caught are named.\n\nSlide **Water Tested** and watch which animals turn up!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me test more water!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A team tests a stream one morning and finds traces of **frog**, **fish** and **duck**, but no otter at all.\n\nA newspaper prints: \"Otters gone from the stream.\"\n\nIs the newspaper right?",
            options: [
                { id: 'right', label: "No -- an otter could have been there a few weeks ago, and by now its traces would have broken apart, so the test simply cannot see back that far.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- if an otter lived anywhere near the stream, its traces would still be in the water for the lab to find.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Think about what breaks the traces down.\n\nDNA in water lasts a few days. Not a few months. Sunlight, warmth and bacteria pull it apart, and after that there is nothing to read.\n\nSo a test on Monday morning is a report on **roughly the last week**. Nothing more.\n\nAn otter that fished the stream in the spring, or one that visits every few weeks and happened to be somewhere else, leaves no trace at all in Monday's jar.\n\n**Finding a trace proves an animal was there. Finding no trace does not prove it was never there.** That difference matters enormously, because it is very easy to declare an animal gone when you have really only proved it was not there last week.",
            options: [
                { id: 'retry', label: "Oh -- no trace just means not recently!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! **A trace tells you who was there recently, and nothing about who was there long ago.**\n\n- Living things shed **tiny bits** of themselves into water\n- Every bit carries **DNA** -- the instruction book, different for every kind\n- More water tested means more animals found\n- Traces **break down** in a few days\n- No trace does not prove the animal is gone\n\nSo now you have two ways of keeping **track** of **wildlife**. Cameras from P48, and traces from C48. Both tell you what is in a place **right now**.\n\nBut is the wood getting better or worse? A single answer cannot tell you that. That is B48!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Traces prove who visited, but only lately!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how to find hidden animals!**\n\n- Animals shed **tiny bits** of skin, scales and slime into the water\n- Each bit carries **DNA**, the instruction book, unique to every kind\n- A bit left behind is called a **trace**\n- The lab filters the water and reads whose traces they are\n- **More water tested means more kinds found**\n- Traces **break down** within days, so the news is always fresh news\n- Finding no trace does not prove an animal is gone\n\nNext in B48: why one count, however good, still tells you almost nothing!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Animals leave traces, and traces do not last!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**C48 Complete -- Traces in the Water!**\n\nYou can find an animal you have never seen, as long as it swam past recently enough.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Animals shed tiny bits | Skin, scales and slime float free | Too small to see |\n| Each bit carries **DNA** | Every kind has its own | The lab reads whose it is |\n| More water, more found | Rare animals leave few traces | An otter may need a bucketful |\n| Traces **break down** | Gone within days | The water gives fresh news only |\n\n**Up next:** B48 (Counting What You Cannot See) -- why one count tells you almost nothing!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
