import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B12 "Natural Selection". The synthesis
 * lesson.
 *
 * B12 watched moth colours shift. This lesson counts the shift:
 * new share = (share x survival rate) / (the same for every kind, added up),
 * worked generation by generation. On light bark, 20% dark falls to 10% then
 * 4.7%; on sooty bark, 2% dark climbs past 90% in about eight generations.
 *
 * Frame of reference stated: shares are of the survivors, counted just before
 * they breed. Condition stated: colour inherited, population back to the same
 * size, no arrivals from elsewhere. Held fixed and named for Level 3: made-up
 * survival rates, and one generation at a time.
 */
export function getL2B12Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In B12, birds caught the moths that stood out, and the population's colours shifted over generations.\n\nPut numbers on it. A wood has **100 moths**: **80 light** and **20 dark**, on light bark. Each year, birds catch the ones they can spot, so:\n\n- **9 in 10** light moths survive to breed\n- only **4 in 10** dark moths do\n\nWhat share of the moths is dark after one generation?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Less than 20%, but not zero -- some dark moths still survive. I would work out how many of each kind are left, then take the dark ones as a share of all the survivors.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "0%. The dark ones stand out, so the birds take them all and the colour disappears in one generation.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Standing out is not the same as being doomed. **4 in 10** dark moths still survive -- they hide in cracks, fly at night, or are simply missed.\n\nThat is how selection works: it does not delete a trait, it **tilts the odds**. Each generation shifts the shares a little, and the shifts pile up.\n\nThink of two buckets, one with 80 marbles and one with 20. Every year you keep 90% of the first bucket and 40% of the second. Neither bucket empties in one go, but the second shrinks faster -- and after a few years the mix looks very different.\n\nThe question is not *which colour vanishes*. It is *how fast does the share change*.",
            options: [
                { id: 'cont', label: "How do I work out the new share?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two ideas, and one piece of arithmetic.\n\nThe **survival rate** of a kind of moth is the share of them that live long enough to breed: 0.9 means 9 in 10.\n\nThe **share** of a kind is how many of them there are out of the whole population -- L2P9's percentages again.\n\nFor each kind: **survivors = number x survival rate**\n\nThen the new share is that kind's survivors out of **all** the survivors:\n\n**new share = survivors of that kind / all survivors**\n\nThe frame of reference: the shares are counted among the **survivors**, just before they breed.\n\nThe condition belongs here. **The young inherit their parents' colour, the population breeds back to its old size, and no moths fly in from elsewhere.** Then the survivors' shares become the next generation's shares, and you can run the sum again, and again.",
            options: [
                { id: 'cont', label: "Run it on the moths.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Light bark: 80 light, 20 dark. Survival 0.9 and 0.4.**\n\n**Step 1.** light survivors = 80 x 0.9 = **72**\n\n**Step 2.** dark survivors = 20 x 0.4 = **8**\n\n**Step 3.** all survivors = 72 + 8 = **80**\n\n**Step 4.** new dark share = 8 / 80 = **0.10**, or **10%**\n\nThe dark share halved in one generation. Now breed back to 100 moths -- 90 light and 10 dark -- and run it again:\n\n| Generation | Light | Dark | Dark survivors | All survivors | New dark share |\n| --- | --- | --- | --- | --- | --- |\n| 0 | 80 | 20 | 8 | 80 | **10%** |\n| 1 | 90 | 10 | 4 | 85 | **4.7%** |\n| 2 | 95.3 | 4.7 | 1.9 | 87.7 | **2.1%** |\n| 3 | 97.9 | 2.1 | 0.86 | 88.9 | **1.0%** |\n\nFalling fast -- but never quite reaching zero.\n\n**Now the soot arrives.** Factory smoke darkens the bark, and the survival rates swap: **0.9 for dark**, **0.4 for light**. Start from the 2% dark that is left:\n\n| Generation | Dark share |\n| --- | --- |\n| 0 | **2%** |\n| 2 | **9.4%** |\n| 4 | **34%** |\n| 6 | **73%** |\n| 8 | **93%** |\n\nFrom rare to almost everywhere in about **eight generations** -- one lifetime for a person, with no moth ever changing colour.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A wood has **90 light** and **10 dark** moths on light bark. Light moths survive at **0.9**, dark at **0.4**.\n\nWhat share is dark after one generation?",
            options: [
                { id: 'right', label: "4.7%. Light survivors 90 x 0.9 = 81, dark survivors 10 x 0.4 = 4, all survivors 85, and 4 / 85 = 0.047.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'of_start', label: "4%, because 4 dark moths survive out of the 100 we started with.", nextNodeId: 'math_wrong' },
                { id: 'subtract', label: "6%, because 10% minus the 4 that were lost.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**4%** divided by the population we **started** with. But 15 moths did not survive, so the survivors are only 85. A share must be taken out of the group it belongs to -- the survivors.\n\n**6%** subtracted the losses from the old share. Shares are not counts, so they cannot be subtracted like that: the light moths lost members too, and that pushes the dark share back up a little.\n\n**Step 1.** light survivors = 90 x 0.9 = **81**\n\n**Step 2.** dark survivors = 10 x 0.4 = **4**\n\n**Step 3.** all survivors = 81 + 4 = **85**\n\n**Step 4.** new dark share = 4 / 85 = **0.047**, or **4.7%**",
            options: [
                { id: 'retry', label: "Out of the survivors, not the start.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a wood that starts with **20% dark** moths and breeds back to 100 moths each generation.\n\n**Light Moth Survival** and **Dark Moth Survival** are the shares of each kind that live to breed, as percentages.\n\nThe lab runs twelve generations and draws the dark share each time.\n\nTry this:\n\n- Set **90%** light and **40%** dark, the light-bark wood: the dark share dives\n- Swap them -- **40%** light, **90%** dark, the sooty wood: the dark share climbs past 90%\n- Set both to the **same** number. Nothing changes, however high or low they are: only the **difference** between them matters\n- Set them close, like 80% and 70%. The change still happens -- it just takes many more generations",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The gap between the rates drives it. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Before the factories, dark moths were rare for a very long time -- but they never disappeared completely.\n\nThe sums above have the dark share falling to 1.0%, then lower, generation after generation.\n\nWhy did the dark colour never vanish altogether?",
            options: [
                { id: 'right', label: "Because the survival rate is 0.4, not 0: some dark moths always survive, so the share shrinks towards zero without reaching it. And new dark mutations keep appearing, which tops the rare colour back up.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "It did vanish. The dark moths we see today were made by the soot, which turned light moths dark.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Soot cannot change a moth's genes -- that is B12's big misconception. Smoke landed on the **bark**, not on the moths.\n\nTwo things kept the dark colour alive through all those generations:\n\n| Reason | What it does |\n| --- | --- |\n| Survival is 0.4, not 0 | Four in ten dark moths survive every generation, so the share falls **towards** zero without arriving |\n| Mutations keep happening | The same change in the same gene turns up again from time to time, by chance |\n\nHalving a number again and again never reaches zero: 10%, 4.7%, 2.1%, 1.0%, 0.4%... always something left.\n\nSo when the bark darkened, selection did not need to invent anything. The dark moths were **already there**, waiting for the day their colour paid off.",
            options: [
                { id: 'retry', label: "The variation was already there.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Selection tilts the odds every generation; it never needs to create the variation it acts on.**\n\nThat completes Big Idea 12 at Level 2. Each lesson took one small rule and applied it over and over:\n\n- **L2P12** -- **gravity = surface gravity x (R / r)²**: one rule sets the pull on an apple, the **ISS** (the International Space Station) and the Moon\n- **L2C12** -- **estimate = (above + below + left + right) / 4**: the table's pattern described germanium seventeen years early\n- **L2B12** -- **new share = survivors of that kind / all survivors**: repeat it and a rare moth becomes the common one\n\n**How do hidden rules shape big patterns? By repeating. One step is small; the same step taken again and again builds orbits, tables and species.**\n\nOne thing this lesson held fixed: **the survival rates were simply given to you, and every generation was worked out one at a time.** Where do those numbers come from, and what if you want generation fifty? Level 3 takes the real moth counts from 1848 to 1895, and finds a shortcut through all the generations at once.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Small step, repeated!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured how fast a trait spreads.**\n\n- A **survival rate** is the share of a kind that lives to breed\n- **survivors = number x survival rate**\n- **new share = survivors of that kind / all survivors**\n- Frame of reference: shares among the **survivors**, just before breeding\n- Condition: colour is inherited, the population breeds back to size, no moths arrive from elsewhere\n- Light bark, 20% dark, rates 0.9 and 0.4: 8 / 80 = **10%** in one generation\n- Then **4.7%**, **2.1%**, **1.0%** -- falling towards zero, never reaching it\n- Sooty bark, rates swapped: 2% dark climbs to **93%** in about **eight generations**\n- 90 light and 10 dark: 4 / 85 = **4.7%**, not 4%\n- Equal survival rates change nothing: only the **difference** matters\n- No moth ever changes colour; the shares change\n- Held fixed: given survival rates, one generation at a time",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Out of the survivors!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Fast Can a Trait Spread?**\n\nB12 watched the moths change. Level 2 counts the change.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Survival rate | share that live to breed | 0.9 means 9 in 10 |\n| Survivors | **number x survival rate** | 20 x 0.4 = 8 |\n| New share | **that kind / all survivors** | 8 / 80 = **10%** |\n| Light bark | 20% → 10% → 4.7% → 2.1% | Towards zero, never reaching it |\n| Sooty bark | 2% → 93% | About **eight generations** |\n| A wrong denominator | 4 / 100 instead of 4 / 85 | Shares come out of the survivors |\n| Equal rates | no change | Only the difference matters |\n| Big Idea 12 at Level 2 | (R/r)², neighbour averages, survivor shares | Small rules, repeated |\n\n**The one line to remember:** selection multiplies each kind by its survival rate and re-counts the shares -- repeat that, and a rare trait can take over a wood in a human lifetime.\n\n**Big Idea 12 is complete at Level 2.**"
        }
    };
}
