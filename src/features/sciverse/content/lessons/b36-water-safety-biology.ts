import { DialogNode } from '../../types';

export function getB36Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "You have filtered the water (**P36**) and chlorinated it (**C36**). Now comes the hardest question of all: **how do you prove it worked?**\n\nA single **bacterium** is invisible. A glass of deadly water and a glass of perfect water look exactly the same.\n\nHow do you think scientists test water for germs?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'grow', label: "They grow the germs on purpose -- one germ multiplies into a visible spot you can actually count.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'micro', label: "They look at a drop under a microscope and count the germs they can see.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "A microscope sounds obvious, but it fails for a sneaky reason: **a drop is far too small a sample**.\n\nWater dangerous enough to make you ill might hold only a few bacteria in a whole glass. Look at one tiny drop and you will almost certainly see nothing -- and wrongly declare the water safe.\n\nSo scientists flip the problem around. Instead of hunting for one germ, they **let it multiply**. Put the sample somewhere warm with food, and one invisible bacterium becomes **millions** overnight -- a visible dot called a **colony**. Each dot means one germ was there at the start.",
            options: [
                { id: 'cont', label: "So they grow the germs until they can be seen?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly! Here is how a **water detective** works:\n\n1. Take a **large sample** -- often 100 millilitres, not a drop\n2. Pass it through a fine filter that traps every **bacterium** on its surface\n3. Lay the filter on food jelly in a warm dish -- this is **culturing**\n4. Wait about 24 hours while each trapped germ multiplies\n5. **Count the colonies** -- each dot equals one original germ\n\nScientists do not test for every possible disease, which would take forever. Instead they look for one **indicator species**: *E. coli*. It lives in animal and human waste, so finding it means **sewage has reached the water** -- and where sewage goes, dangerous germs follow.\n\nFor drinking water the safe limit is strict: **zero** *E. coli* in 100 millilitres.\n\nSlide **Germ Level** and watch the test dish reveal what is hiding!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Let me run the test and count colonies!", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint:** A village well is tested once and comes back clean. The village decides no further testing is needed, since the water has been proven safe.\n\nIs that a good decision?",
            options: [
                { id: 'right', label: "No -- one test only describes that one moment, and a well can be contaminated later by flooding, a leak, or a cracked lining.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- the water came from that well and tested clean, so that well produces clean water.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A water test is a **photograph, not a promise**. It tells you about the water in that bottle, on that day -- and nothing more.\n\nWells change. Heavy rain washes animal waste into the ground. A crack opens in the lining. A new septic tank is built uphill. Any of these can contaminate a well that was perfect last month.\n\nThat is why safe water systems test **regularly** -- big cities test many times every day. And it is why **C36's chlorine residual** matters so much: testing tells you what *happened*, while chlorine protects you from what happens *next*. You need both.",
            options: [
                { id: 'retry', label: "Oh -- a test only proves that one moment was safe!", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct! Water safety is a **habit, not a one-time achievement**.\n\nAll three lessons in Big Idea 36 lock together:\n- **P36** -- **physics** strains out everything bigger than the filter holes\n- **C36** -- **chemistry** destroys the germs too small to strain, and keeps guarding the pipes\n- **B36** -- **biology** proves it worked, by growing invisible germs into countable colonies\n\nAbout **2 billion** people still lack reliably safe drinking water. These three steps -- filter, disinfect, test -- are the whole solution, and they save more lives than almost any medicine.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Filter it, treat it, then prove it -- every time!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You discovered how we prove water is safe!**\n\n- A drop is too small a sample -- testing uses about **100 millilitres**\n- Germs are grown on purpose (**culturing**) until they form visible **colonies**\n- Each colony means one original **bacterium**\n- *E. coli* is the **indicator species** -- finding it means sewage got in\n- The drinking water limit is **zero** *E. coli* in 100 millilitres\n- One clean test does not make a well safe forever -- test **regularly**\n\nP36 filtered it, C36 disinfected it, and B36 proved it!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Growing germs is how we count the invisible!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Big Idea 36 -- B36 Complete!**\n\nWater Detectives -- How Do We Make Water Safe to Drink?\n\nClean water takes three sciences working together, and constant checking.\n\n**Summary Table:**\n| What You Learned | Key Idea | Why It Matters |\n| --- | --- | --- |\n| Grow germs to see them | **Culturing** makes **colonies** | Counts the invisible |\n| Test a big sample | 100 millilitres, not a drop | A drop would miss them |\n| Look for *E. coli* | The **indicator species** | Its presence means sewage |\n| Test again and again | A test is a snapshot | Wells go bad over time |\n\n**Big Idea 36 connections:**\n- P36 (Trapped by the Filter) showed how hole size decides what physics can strain out\n- C36 (Chlorine Patrol) showed how chemistry destroys the germs filters miss and guards the pipes\n- B36 (Water Detectives) showed how biology proves the water is actually safe by growing invisible germs into countable colonies!",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
