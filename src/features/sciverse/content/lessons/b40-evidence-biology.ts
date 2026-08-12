import { DialogNode } from '../../types';

export function getB40Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "\"My grandmother ate an orange every day and lived to 100. Oranges make you live longer!\"\n\nYou have measured carefully (**P40**) and designed a fair test (**C40**). Now the last question: **how much evidence is enough to believe something?**\n\nWhat is wrong with the orange claim?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'sample', label: "One person is far too small a sample -- you cannot tell a real effect from pure luck with a single case.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'proof', label: "Nothing really -- she is a real person who really did live to 100, so it is genuine evidence.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "She is real and the story is true -- but it still cannot tell you whether oranges do anything.\n\nHere is why. Some people live to 100 while eating oranges. Some live to 100 while never touching one. Some eat oranges daily and live to 60. With **one person**, you cannot tell which pattern you are looking at.\n\nA single story is called **anecdotal evidence**. Humans find stories extremely convincing, which is exactly what makes them dangerous. Your brain notices the grandmother who fits the pattern and quietly forgets the thousands who do not.\n\nTo separate a real effect from luck, you need **many** people.",
            options: [
                { id: 'cont', label: "So one story cannot separate a real effect from luck?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! **Sample size** -- how many individuals you study -- decides what you are allowed to claim:\n\n1. **1 person** -- a story. Proves nothing.\n2. **10 people** -- a hint. Random luck can easily explain it.\n3. **1,000 people** -- real evidence. Luck struggles to fake this.\n4. **100,000 people** -- strong evidence, and small effects become visible\n\nBiology needs big samples because living things **vary so much**. Two people eating identical food can have completely different outcomes because of their genes, sleep, exercise, and environment. All that variation is **noise**, and you need a large sample for the real signal to rise above it.\n\nThere is one more trap. **Correlation is not causation**: ice cream sales and drowning both rise together, but ice cream does not cause drowning. **Hot weather** causes both.\n\nSlide **Sample Size** and watch a pattern emerge from the noise!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me grow the sample and watch the pattern!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A study finds that children who take music lessons score higher on maths tests. A newspaper headline announces: **\"Music lessons make children better at maths!\"**\n\nWhat should a careful scientist say about that headline?",
            options: [
                { id: 'right', label: "The two things go together, but something else -- like family income or study habits -- could be causing both.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The headline is right -- the study measured both things and found the connection.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The study is probably perfectly good. The **headline** is what overreaches.\n\nThe study found a **correlation** -- music lessons and maths scores rise together. But it did not show that one **causes** the other. At least three explanations fit the same data equally well:\n\n1. Music lessons really do improve maths\n2. Families who can afford music lessons also afford tutoring, books, and quiet study space\n3. Children who enjoy practising anything tend to practise maths too\n\nThis is the **confounding variable** problem from **C40**, appearing in real life. To settle it you would need to **randomly assign** children to music lessons or not -- which is precisely what a **control group** is for.\n\n\"Linked to\" and \"causes\" are very different claims, and headlines swap them constantly.",
            options: [
                { id: 'retry', label: "Oh -- correlation is not causation!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! You now have the complete toolkit for judging any claim you meet:\n\n- **P40** -- is the measurement honest? Does it report **uncertainty**? Was the instrument **calibrated**?\n- **C40** -- was it a **fair test**? One variable changed, with a matched **control group**?\n- **B40** -- was the **sample** big enough? Is this **correlation** or genuine **causation**?\n\nThese three questions are how scientists decide what is true. They are also how you decide whether to believe an advert, a headline, or a video online.\n\nThis is the real reason science works. Not because scientists are cleverer than everyone else, but because they built a system for **catching their own mistakes**.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Measure honestly, test fairly, and check the sample!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how to judge evidence!**\n\n- One story is **anecdotal evidence** -- it proves nothing\n- **Sample size** decides what you may claim\n- Living things **vary** a lot, so biology needs big samples\n- **Correlation is not causation** -- ice cream does not cause drowning\n- A hidden **confounding variable** can cause both things at once\n- Only **randomly assigned** groups can settle cause and effect\n\nP40 measured honestly, C40 tested fairly, and B40 showed how much evidence it takes to believe!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Now I know how to check if something is true!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 40 -- B40 Complete!**\n\nFollow the Evidence -- How Do We Use Data to Know What Is True?\n\nScience works because it is a system for catching your own mistakes.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| One story proves nothing | **Anecdotal evidence** | Stories are convincing but weak |\n| Numbers matter | **Sample size** sets what you can claim | Luck fakes small samples easily |\n| Living things vary | Biology needs big samples | Signal must beat the **noise** |\n| Together is not because | **Correlation** is not **causation** | Headlines confuse these daily |\n\n**Big Idea 40 connections:**\n- P40 (Measure It Again) showed that every measurement carries **uncertainty**, and only **calibration** fixes systematic error\n- C40 (The Fair Test) showed how changing one variable with a matched **control group** proves cause\n- B40 (Follow the Evidence) showed how **sample size** and the correlation trap decide whether a claim deserves belief -- the three questions to ask about any claim you meet!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
