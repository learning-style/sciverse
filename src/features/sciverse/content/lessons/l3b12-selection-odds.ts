import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 12, biology. The synthesis lesson.
 *
 * L2B12 stepped through generations one at a time with survival rates it was
 * handed. This removes that simplification: in odds, one generation is a
 * multiplication, so odds after n generations = starting odds x (survival
 * ratio)^n, and logs run it backwards from real counts. Worked on Manchester's
 * peppered moths, 1% dark in 1848 to 98% in 1895: a survival ratio of about
 * 1.2, a 20% edge. The checkpoint runs the same rule backwards through the
 * clean-air decline.
 *
 * Frame of reference stated: odds are dark to light, and the ratio is dark
 * survival over light survival. Still standing: dominant and recessive genes,
 * moths moving between woods, and how the counts were collected.
 */
export function getL3B12Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B12 stepped through the generations one at a time, using survival rates it was simply handed. Real biologists work the other way: they have **counts**, and they want the rates.\n\nHere are real ones. Near Manchester, the dark peppered moth was first recorded in **1848**, when it was a rarity -- about **1 in 100**. By **1895**, about **98 in 100** were dark. Peppered moths have one generation a year, so that is **47 generations**.\n\nHow big a survival advantage does it take to turn 1% into 98% in 47 generations?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Work it backwards. If each generation multiplies something by a fixed amount, then 47 of those multiplications take you from the 1848 figure to the 1895 one -- so I can solve for the amount.", nextNodeId: 'odds', sentiment: 'positive' },
                { id: 'bad', label: "You can't work it out from counts. Survival rates have to be measured on living moths, not worked back from numbers.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Measuring moths directly is hard and was argued over for decades. But the counts themselves carry the answer, if the shares change by a **fixed rule** each generation.\n\nThe trouble is that shares are awkward to run backwards. Look at L2B12's sooty wood: 2%, 4.4%, 9.4%, 18.9%, 34%, 54%, 73%, 86%, 93%. The steps grow, then shrink again -- nothing is multiplied by the same number twice.\n\nSo change what you track. Instead of the **share** of dark moths, follow the **odds**: dark against light.\n\n| Dark share | Odds, dark to light |\n| --- | --- |\n| 2% | 2 to 98 = 0.020 |\n| 34% | 34 to 66 = 0.52 |\n| 93% | 93 to 7 = 13.3 |\n\nIn odds, something very tidy happens.",
            options: [
                { id: 'cont', label: "Show me what odds do.", nextNodeId: 'odds' }
            ]
        },
        odds: {
            id: 'odds',
            speaker: 'AI',
            content: "The **odds** of dark to light is the number of dark moths divided by the number of light ones:\n\n**odds = dark / light**\n\nThat is the frame of reference: dark on top, light underneath. A share of 50% is odds of 1; 98% is odds of 49.\n\nNow take L2B12's step. If **D** dark and **L** light moths breed, and their survival rates are **s_dark** and **s_light**, the survivors are D x s_dark and L x s_light. The new odds are:\n\nnew odds = (D x s_dark) / (L x s_light) = (D / L) x (s_dark / s_light)\n\n**new odds = old odds x survival ratio**\n\nOne generation is a **multiplication** -- the totals cancel out, which is why odds are worth the trouble. Do it n times:\n\n**odds after n generations = starting odds x (survival ratio)ⁿ**\n\nTo run it backwards, use L3B4's logarithms. Taking logs turns the power into a multiplication:\n\nlog(final odds) = log(starting odds) + n x log(survival ratio)\n\n**log(survival ratio) = [log(final odds) − log(starting odds)] / n**\n\nThe condition belongs here. **The survival ratio must stay the same over all n generations**, and the moths must breed within one population.",
            options: [
                { id: 'cont', label: "Run the real moth counts.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "**1848: 1% dark.** odds = 1 / 99 = **0.0101**\n\n**1895: 98% dark.** odds = 98 / 2 = **49**\n\n**n = 47 generations.**\n\n**Step 1.** How much did the odds grow altogether? 49 / 0.0101 = **4,851 times**\n\n**Step 2.** log 4,851 = **3.686**\n\n**Step 3.** log(survival ratio) = 3.686 / 47 = **0.0784**\n\n**Step 4.** survival ratio = 10^0.0784 = **1.20**\n\nSo dark moths survived about **20% better** than light ones each year -- 1.2 survivors for every 1 of the light form.\n\nThat is the whole answer, and it is smaller than most people expect. A 20% edge, repeated 47 times, is a factor of 4,851.\n\n**Check it forwards.** Starting odds 0.0101, multiplied by 1.2 a few times:\n\n| Generation | Odds | Dark share |\n| --- | --- | --- |\n| 0 | 0.0101 | 1% |\n| 12 | 0.090 | 8% |\n| 25 | 0.96 | 49% |\n| 36 | 7.1 | 88% |\n| 47 | 49 | **98%** ✓ |\n\nThe halfway point -- the moment dark moths became the commoner form -- arrives at about generation **25**, in the early 1870s.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Suppose the dark moths' edge had been only **10%**, a survival ratio of **1.1** (log 1.1 = 0.0414).\n\nHow many generations would the same change -- odds from 0.0101 to 49, a growth of 4,851 times -- have taken?",
            options: [
                { id: 'right', label: "About 89 generations. log 4,851 = 3.686, and 3.686 / 0.0414 = 89.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'half', label: "About 94 generations -- half the advantage means exactly twice as long.", nextNodeId: 'math_wrong' },
                { id: 'same', label: "Still 47 generations. The advantage sets how far it goes, not how long it takes.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**94 generations** assumed that halving the advantage doubles the time. It nearly does, but not exactly: what matters is the **log** of the ratio, and log 1.2 = 0.0784 is not quite twice log 1.1 = 0.0414. The honest answer is 89, not 94.\n\n**47 generations** treated the advantage as unrelated to the time. But the ratio is what does the work each generation: a smaller edge needs more generations to reach the same place.\n\n**Step 1.** total growth in odds = 49 / 0.0101 = **4,851**\n\n**Step 2.** log 4,851 = **3.686**\n\n**Step 3.** n = 3.686 / log 1.1 = 3.686 / 0.0414 = **89 generations**\n\nA 10% edge would have taken until the 1930s to do what a 20% edge did by 1895.",
            options: [
                { id: 'retry', label: "Divide by the log of the ratio.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Survival Ratio** is the dark moths' survival divided by the light moths', from 0.5 to 2.0. **Starting Dark Share** is the share of dark moths at generation 0, as a percentage.\n\nThe lab turns the share into odds, multiplies by the ratio each generation, and draws the dark share over 60 generations -- with the number of generations to reach half the population.\n\nTry this:\n\n- Set **1.2** and **1%**: the Manchester curve, crossing half at about generation 25 and reaching 98% by 47\n- Set **1.1**: the same journey, now taking **89** generations\n- Set the ratio **below 1**, say **0.84**: the dark share falls instead, which is what happened after the air got cleaner\n- Set exactly **1.0**: nothing changes at all, however long you wait",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Odds multiply, every generation. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Britain's clean air laws cut the soot, and the bark grew pale again. Near Manchester, the dark form fell from about **90%** in **1970** to about **5%** by **2000** -- **30 generations**.\n\nWhat survival ratio does that decline need? (log 0.00585 = −2.233.)",
            options: [
                { id: 'right', label: "About 0.84. The odds fell from 9 to 0.0526, a factor of 0.00585; −2.233 / 30 = −0.0744, and 10^−0.0744 = 0.84 -- dark moths now survived about 16% worse each year.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The rule cannot describe a fall. A multiplying rule only ever makes things grow, so something else must explain the decline.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "A multiplying rule shrinks things happily -- as long as the multiplier is **less than 1**. Multiply by 0.84 over and over and the odds fall away, just as multiplying by 1.2 built them up.\n\n| Year | Dark share | Odds |\n| --- | --- | --- |\n| 1970 | 90% | 90 / 10 = **9** |\n| 2000 | 5% | 5 / 95 = **0.0526** |\n\n**Step 1.** growth in odds = 0.0526 / 9 = **0.00585**, a shrinking\n\n**Step 2.** log 0.00585 = **−2.233** -- a negative log, because the odds fell\n\n**Step 3.** log(ratio) = −2.233 / 30 = **−0.0744**\n\n**Step 4.** ratio = 10^−0.0744 = **0.84**\n\nThe same rule, with the same arithmetic, running the other way. Nothing new was needed: the bark changed, so the sign of the advantage changed.",
            options: [
                { id: 'retry', label: "A ratio below 1 shrinks the odds.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **In odds, selection is one multiplication per generation -- so logs turn real counts back into the survival advantage that produced them.**\n\nHere is the simplification this lesson removed. **L2B12 was handed its survival rates and stepped through one generation at a time.** Odds give a formula for all n generations at once, and it runs backwards: from two counts and a date, you get the rate.\n\nThat completes Big Idea 12 at Level 3. In each lesson, one rule was applied over and over -- and each time, the repeating turned into a formula you could solve:\n\n- **L3P12** -- **v = √(g x r)**, and **T² ∝ r³**: the pull at each height sets one speed, and Kepler's law falls out\n- **L3C12** -- **2n²**, filled in energy order: the rows must be 2, 8, 8, 18, 18, 32, and ionisation energies prove it\n- **L3B12** -- **odds x (survival ratio)ⁿ**: a 20% edge, repeated 47 times, turned 1% of moths into 98%\n\n**How do hidden rules shape big patterns? By repeating -- and because they repeat, the pattern can be read backwards to recover the rule.**\n\nAnd the simplifications still standing. **Moth colour is carried by genes that come in pairs**, one from each parent, and the dark version is dominant -- so a proper model tracks the gene versions, not just the moths you can see. Moths also **fly between woods**, mixing sooty and clean populations. And the counts themselves came from **moth traps**, which catch the two forms differently -- a criticism that sent biologists back to check the peppered moth story, with newer experiments in the 2000s confirming it.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Odds multiply; logs run it backwards!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured selection from real counts.**\n\n- **odds = dark / light**, the frame of reference for the whole lesson\n- Shares are awkward; odds are tidy, because the totals cancel\n- One generation: **new odds = old odds x (s_dark / s_light)**\n- n generations: **odds after n = starting odds x (survival ratio)ⁿ**\n- Backwards, with logs: **log(ratio) = [log(final odds) − log(starting odds)] / n**\n- Condition: the ratio stays the same, and the moths breed as one population\n- Manchester 1848: 1% dark, odds **0.0101**; 1895: 98%, odds **49**\n- Odds grew **4,851 times** in **47 generations**\n- log 4,851 = 3.686, / 47 = 0.0784, so the ratio is **1.20**: a **20%** survival edge\n- Half the population is dark by about generation **25**, in the early 1870s\n- A 10% edge would have taken **89** generations instead of 47\n- After the clean air laws: 90% to 5% in 30 generations, a ratio of **0.84**\n- Still standing: paired genes and dominance, moths moving between woods, and how the counts were made",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Log of the odds, over the generations!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Long Does a Trait Take?**\n\nL2B12 ran the generations forwards. Level 3 reads the rate out of real counts.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Odds | **dark / light** | 98% is odds of 49 |\n| One generation | **old odds x survival ratio** | A multiplication, not a step |\n| n generations | **starting odds x ratioⁿ** | The totals cancel |\n| Backwards | **[log(final) − log(start)] / n** | Counts give the rate |\n| Manchester | 4,851 times in 47 generations | ratio **1.20**: a 20% edge |\n| Halfway | generation **25** | The early 1870s |\n| A 10% edge | 3.686 / 0.0414 | **89** generations |\n| Clean air | 90% to 5% in 30 | ratio **0.84** |\n| Big Idea 12 at Level 3 | √(g r), 2n², odds x ratioⁿ | Repeating rules, solved |\n\n**The one line to remember:** in odds, selection multiplies by the same number every generation -- so a logarithm turns a century of moth counts into a single survival advantage.\n\n**Big Idea 12 is complete at Level 3.**"
        }
    };
}
