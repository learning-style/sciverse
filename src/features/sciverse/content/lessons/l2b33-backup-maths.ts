import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B33 "Nature's Free Services".
 *
 * Level 1 asserted that biodiversity is a backup system. This lesson puts a
 * probability on it -- P(job survives) = 1 - (1-p)^n -- which brings back the
 * same exponent L2P33 used, for a different reason. The checkpoint is the
 * independence assumption, which is where the formula genuinely breaks.
 */
export function getL2B33Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Level 1 told you that **biodiversity** is nature's backup system. That is true, and it is also a bit vague. Let us put a number on it.\n\nA meadow needs one job doing: **pollination**. Suppose a hard winter gives each pollinator species a **30%** chance of coming through.\n\nWith only **one** species doing that job, the chance the meadow still gets pollinated next spring is easy -- it is 30%.\n\nNow suppose **five different species** can do the job. What is the chance that at least one of them makes it?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "About 83%. The job only fails if every single one fails, and a 70% chance of failing, five times over, comes to about 17%.", nextNodeId: 'correct', sentiment: 'positive' },
                { id: 'bad', label: "150%, because each of the five species brings a 30% chance and five lots of 30% is 150%.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Look at the answer you got: **150%**. There is no such thing. A probability cannot go above 100%, because 100% already means \"certain\".\n\nThat is a useful alarm bell. **Whenever adding probabilities takes you past 100%, the adding was the mistake.**\n\nProbabilities of separate things all happening are **multiplied**, not added. And the way through this one is a trick worth learning properly: instead of working out the many ways to succeed, work out the **single** way to fail.\n\nThe job fails only if **every** species fails.\n\n- Chance one species fails: 100% - 30% = **70%**, or 0.7\n- Chance all five fail: 0.7 x 0.7 x 0.7 x 0.7 x 0.7 = 0.7 to the power of 5 = **0.168**\n- So the chance the job still gets done: 1 - 0.168 = **0.832**, about **83%**\n\nFive fragile species, each more likely to die than survive, together give you an 83% chance. That is what a backup system actually is.",
            options: [
                { id: 'cont', label: "So I work out the chance everything fails, then subtract?", nextNodeId: 'correct' }
            ]
        },
        correct: {
            id: 'correct',
            speaker: 'AI',
            content: "Exactly. And that gives you a formula worth remembering:\n\n**chance the job survives = 1 - (1 - p) to the power of n**\n\nwhere **p** is each species' chance of surviving and **n** is how many species can do the job.\n\nNotice what has turned up again: a **power of n**, exactly like L2P33's energy pyramid. Same piece of maths, opposite emotional meaning.\n\nIn P33 the exponent was **bad news** -- energy was multiplied by a small number at every step, so it collapsed.\nHere the exponent is **good news** -- failure is multiplied by a number less than 1 for every extra species, so total failure collapses instead.\n\nThe number of species that can do the same job has a name: **functional redundancy**. Engineers build the same thing into aeroplanes on purpose, and for the same reason.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A wetland has **three** species that can each filter its water. A drought gives each one a **50%** chance of surviving.\n\nWhat is the chance the wetland still gets filtered?",
            options: [
                { id: 'right', label: "87.5%. All three fail with a chance of 0.5 x 0.5 x 0.5 = 0.125, and 1 - 0.125 = 0.875.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'added', label: "150%, because three species each bring a 50% chance.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "50%, because each species has a 50% chance and they are all the same.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Two different slips here.\n\n**Adding to 150%** trips the alarm bell again -- past 100%, so the adding was wrong. Multiply the failures instead.\n\n**Answering 50%** is the more interesting mistake, because it quietly ignores the other two species. It would be the right answer if the wetland needed **all three** to survive. But it only needs **one**, and that is a completely different question.\n\nAlways check which one you are being asked:\n\n- \"Do **all** of them survive?\" -- multiply the survivals: 0.5 x 0.5 x 0.5 = **12.5%**\n- \"Does **at least one** survive?\" -- multiply the failures and subtract: 1 - 0.125 = **87.5%**\n\nSame three species, same 50%, and the answers are 12.5% and 87.5%. Ecosystems almost always ask the second question, because the job only needs doing once.",
            options: [
                { id: 'retry', label: "At least one -- so multiply the failures and subtract.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials this time.\n\n**Species Doing the Job** is **n** -- how many different species can carry out this one task.\n**Each Species' Chance** is **p** -- how likely each one is to survive the shock.\n\nWatch for something the formula does that most people do not expect. Push **n** up from 1 to 3 and the safety climbs steeply. Push it from 9 to 12 and it barely moves.\n\nThat is **diminishing returns**, and it is worth understanding rather than just noticing. Each extra species multiplies the remaining failure by (1 - p) once more. When failure is still large there is plenty to cut into. Once failure is already tiny, a fraction of tiny is barely a change at all.\n\nSo the first few species matter enormously and the twelfth hardly registers. **Going from one species to three is not a small improvement -- it is most of the protection you will ever get.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "I see the curve flattening. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint**, and this is the one that matters most.\n\nA farm plants **20 varieties** of the same crop. It sounds like excellent redundancy. But all 20 varieties were bred from the same parent plant, and every one of them carries the **same gene** for resisting disease.\n\nA new disease arrives that gets past exactly that gene.\n\nDoes **1 - (1 - p) to the power of 20** protect this farm?",
            options: [
                { id: 'right', label: "No. The formula assumes each variety fails independently, for its own reasons. These 20 all fail for the same reason, so they behave like a single variety, not twenty.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. Twenty varieties means twenty separate chances, so the risk of losing the whole crop is almost nothing.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "This is the most important limitation in the whole lesson, so it is worth being precise about.\n\nWhen we multiplied 0.7 x 0.7 x 0.7 x 0.7 x 0.7, we were quietly assuming something: that each species fails **independently** -- that one failing tells you nothing about whether the next will fail.\n\nThese 20 varieties are not independent. They share the gene the disease defeats. If the disease beats one, it beats all 20, because there was only ever **one** defence wearing twenty different coats.\n\nSo the honest calculation is not 1 - (1 - p) to the power of 20. It is **n = 1**.\n\nThis is not hypothetical. Almost every banana exported in the world is a single variety, so a disease that beats it beats the lot. Ireland's potato harvest in the 1840s rested on very few varieties, and when blight arrived it took nearly all of them.\n\n**Counting species is not the same as counting defences.** Twenty names on a list can still be one defence, and the formula cannot tell the difference -- only you can, by asking whether they would fail for the same reason.",
            options: [
                { id: 'retry', label: "They are not independent, so twenty varieties is really one.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The formula counts independent defences, not names.**\n\nAnd that completes Big Idea 33 at Level 2. Three lessons, three different pieces of maths, one ecosystem.\n\n- **L2P33 -- energy.** **E = base x efficiency to the power of n.** Multiplicative, and the exponent is bad news: every step multiplies by a small number, so energy collapses up the pyramid.\n- **L2C33 -- matter.** **net = in - out**, and **total = net x n**. Additive, because atoms travel in a circle and come back.\n- **L2B33 -- risk.** **1 - (1 - p) to the power of n**. Multiplicative again, but now the exponent is good news: it is **failure** being multiplied down.\n\nThe same exponent appears in two of the three, and for the same underlying reason -- something happening repeatedly and independently. In P33 it is a step in a food chain. Here it is a species facing a shock. Once you can spot that shape, you can spot it anywhere.\n\nAnd the caution transfers too. P33's formula assumes a steady efficiency; this one assumes independent species. **Every formula carries an assumption, and knowing what it is matters as much as being able to use it.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Independent defences, not names!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You put a probability on biodiversity.**\n\n- Probabilities of separate events are **multiplied**, never added\n- Any total above **100%** means the adding was the mistake\n- For \"at least one\", work out the chance **everything fails**, then subtract from 1\n- **chance the job survives = 1 - (1 - p) to the power of n**\n- \"Do all survive?\" and \"does at least one survive?\" are different questions with very different answers\n- **Functional redundancy** is how many species can do the same job\n- Extra species show **diminishing returns** -- the first few matter most\n- The formula assumes species fail **independently**\n- Twenty varieties sharing one gene are really **one** defence\n\n**Counting species is not the same as counting defences.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "1 - (1 - p) to the power of n -- if they are independent!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- The Maths of a Backup Plan!**\n\nLevel 1 said variety protects an ecosystem. The arithmetic says **by how much, and exactly when it stops being true**.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Probabilities multiply | 0.7 to the power of 5 = 0.168 | Adding them is always wrong |\n| Over 100% is impossible | 5 x 30% = 150% | An alarm bell, not an answer |\n| At least one survives | 1 - (1 - p) to the power of n | Count the failures, then subtract |\n| All versus at least one | 12.5% versus 87.5% | Same numbers, opposite questions |\n| Diminishing returns | 1 to 3 helps hugely; 9 to 12 barely | The first backups matter most |\n| The assumption | independence | Shared weakness makes n = 1 |\n\n**The one line to remember:** the maths counts **independent defences**, and twenty names on a list can still be one defence.\n\n**Big Idea 33 is now complete at Level 2** -- energy that compounds, matter that balances, and risk that multiplies down."
        }
    };
}
