import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B11 "Immune Defense". The synthesis lesson.
 *
 * B11 said vaccines train the immune system. This lesson measures how well:
 * risk = people who fell ill / people in the group, and effectiveness =
 * 1 - (risk if vaccinated / risk if unvaccinated). Worked: a 90% effective
 * vaccine left 0.2% of vaccinated people ill, not 10%. The checkpoint shows
 * nearly half the sick people in a well-vaccinated town being vaccinated while
 * the vaccine works.
 *
 * Frame of reference stated: effectiveness compares against the unvaccinated
 * group. Condition stated: the groups are alike and equally exposed, which is
 * why people are sorted at random. Held fixed and named for Level 3:
 * protection as one share, the same for everyone.
 */
export function getL2B11Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "In B11, vaccines trained the immune system's memory, so it could fight a germ before you fell ill.\n\nScientists describe how well a vaccine works with one number. A vaccine might be **90% effective**.\n\nDoes a 90% effective vaccine mean that **10% of vaccinated people** still fall ill?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. It means vaccinated people fall ill 90% less often than unvaccinated people. If only a few unvaccinated people fall ill, far fewer than 10% of vaccinated people will.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Yes. 90% of vaccinated people are protected, and the other 10% fall ill.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That reading misses something: **not everyone would fall ill anyway**.\n\nThink of a bicycle helmet that is 90% effective at stopping head injuries. That does not mean 10% of helmet-wearers hurt their heads. Most cyclists never crash at all. It means that, of the head injuries riders **would** have had, the helmet stops 90%.\n\nA vaccine is the same. During an outbreak, most unvaccinated people might still stay well. Effectiveness compares the vaccinated group with the unvaccinated group -- it does not count everyone who got the injection.\n\nTo see how, you need two numbers first.",
            options: [
                { id: 'cont', label: "Which two numbers?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Scientists test a vaccine in a **trial**. Volunteers are sorted **at random** into two groups:\n\n- one group gets the vaccine\n- the other gets a **placebo**: a dummy injection with no vaccine in it, so nobody knows which one they had\n\nThen they count who falls ill. First, each group's **risk**:\n\n**risk = people who fell ill / people in the group**\n\nThe numerator is only the people who fell ill; the denominator is everyone in that group.\n\nThen compare the two risks. The frame of reference is the **unvaccinated** group -- effectiveness says how much the vaccine cut the risk **compared with not having it**:\n\n**effectiveness = 1 − (risk if vaccinated / risk if unvaccinated)**\n\nMultiply by 100% to write it as a percentage. If the vaccine did nothing, the two risks match, their ratio is 1, and the effectiveness is 0%. If no vaccinated person fell ill, the ratio is 0, and it is 100%.\n\nThe condition belongs here. **The two groups must be alike, and meet the germ in the same way.** That is why people are sorted at random, and why nobody knows which injection they had: otherwise the groups could differ in other ways.",
            options: [
                { id: 'cont', label: "Work out a trial.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "A model trial with **20,000** volunteers, sorted at random:\n\n| Group | People | Fell ill |\n| --- | --- | --- |\n| Vaccine | 10,000 | 20 |\n| Placebo | 10,000 | 200 |\n\n**Step 1. Risk if vaccinated:** 20 / 10,000 = 0.002, which is **0.2%**\n\n**Step 2. Risk if unvaccinated:** 200 / 10,000 = 0.02, which is **2%**\n\n**Step 3. Ratio of the risks:** 0.2% / 2% = **0.1**\n\n**Step 4. Effectiveness:** 1 − 0.1 = **0.9**, which is **90%**\n\nSo the vaccine is 90% effective -- and yet only **0.2%** of vaccinated people fell ill, not 10%.\n\nAnother way to see it: out of every 10 people who would have fallen ill without the vaccine, **9** were protected.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Another trial has **5,000** people in each group. **30** people fell ill in the vaccine group, and **150** in the placebo group.\n\nHow effective is this vaccine?",
            options: [
                { id: 'right', label: "80%. The risks are 30 / 5,000 = 0.6% and 150 / 5,000 = 3%. Their ratio is 0.6 / 3 = 0.2, and 1 − 0.2 = 0.8.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'ill_share', label: "99.4%, because only 0.6% of the vaccinated people fell ill.", nextNodeId: 'math_wrong' },
                { id: 'no_minus', label: "20%, because 30 / 150 = 0.2.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**99.4%** compared the vaccinated group with **no one**. It counts everyone who stayed well, including people who would have stayed well without the vaccine. Effectiveness must compare with the **unvaccinated** group.\n\n**20%** is the **ratio** of the risks -- how much of the risk was left. The effectiveness is the part that was **taken away**: 1 minus that ratio.\n\n**Step 1.** risk if vaccinated = 30 / 5,000 = **0.6%**\n\n**Step 2.** risk if unvaccinated = 150 / 5,000 = **3%**\n\n**Step 3.** ratio = 0.6 / 3 = **0.2**\n\n**Step 4.** effectiveness = 1 − 0.2 = **0.8**, which is **80%**",
            options: [
                { id: 'retry', label: "1 minus the ratio of the risks.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a town of **1,000 people** during an outbreak, where **20%** of unvaccinated people fall ill.\n\n**Vaccinated Share** is the percentage of the town that is vaccinated. **Effectiveness** is how effective the vaccine is, as a percentage.\n\nThe lab counts the people who fall ill in each group, and the share of all the ill people who were vaccinated.\n\nTry this:\n\n- Set **0%** vaccinated: 200 people fall ill\n- Set **90%** vaccinated and **90%** effective. Count the ill people, and how many of them were vaccinated\n- Keep the effectiveness at 90%, and raise the vaccinated share to **100%**. Now **every** ill person was vaccinated -- and far fewer people are ill",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Compare with the unvaccinated. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** In a town of **1,000**, **900** people are vaccinated with a **90% effective** vaccine, and **100** are not. During an outbreak, **20%** of unvaccinated people fall ill.\n\nThe local news reports: *18 of the 38 people who fell ill were vaccinated -- nearly half! The vaccine isn't working.*\n\nIs the news right?",
            options: [
                { id: 'right', label: "No. Only 2% of vaccinated people fell ill (18 of 900), against 20% of unvaccinated people (20 of 100). The vaccine cut the risk by 90%. So many ill people were vaccinated only because nine times as many people were vaccinated.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes. If the vaccine worked, almost none of the ill people would have been vaccinated.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The count is right, but it is being compared with the wrong thing. Compare each group's **risk**, not the number of ill people.\n\n| Group | People | Risk | Fell ill |\n| --- | --- | --- | --- |\n| Unvaccinated | 100 | 20% | 100 x 0.20 = **20** |\n| Vaccinated | 900 | 20% x (1 − 0.9) = 2% | 900 x 0.02 = **18** |\n| Everyone | 1,000 | | **38** |\n\nA vaccinated person was **ten times** less likely to fall ill. There were simply **nine times** as many vaccinated people, so they still make up nearly half the ill.\n\nWithout the vaccine, about 1,000 x 20% = **200** people would have fallen ill, not 38.\n\nThe more people are vaccinated, the more of the ill people will be vaccinated people -- even with a vaccine that works well.",
            options: [
                { id: 'retry', label: "Compare risks, not counts.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Effectiveness compares risks with the unvaccinated -- and the number of ill people also depends on how many people are in each group.**\n\nThat completes Big Idea 11 at Level 2. Every lesson turned a health number into a comparison, and each one had to name what it was compared **with**:\n\n- **L2P11** -- **pressure = ρ x g x h**: blood pressure is measured against the air, at the height of the heart\n- **L2C11** -- **10^(difference in pH)**: stomach acid is 1,000 times as acidic as coffee, for the same volume\n- **L2B11** -- **effectiveness = 1 − (risk if vaccinated / risk if unvaccinated)**: measured against the unvaccinated\n\n**How do we stay healthy? By reading health numbers against the right reference: the heart's height, pH 7, and the unvaccinated.**\n\nOne thing this lesson held fixed: **protection was one share, the same for everyone.** A 90% effective vaccine does not give each person a 90% wall. Level 3 finds out why it is not 100% -- by following a race between memory cells and a germ.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Compare with the right thing!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You measured how well a vaccine works.**\n\n- A **trial** sorts people at random into a vaccine group and a **placebo** group\n- **risk = people who fell ill / people in the group**\n- **effectiveness = 1 − (risk if vaccinated / risk if unvaccinated)**\n- Frame of reference: the unvaccinated group\n- Condition: the groups are alike and meet the germ in the same way\n- 20 of 10,000 against 200 of 10,000: **90%** effective, with only **0.2%** of vaccinated people ill\n- 30 of 5,000 against 150 of 5,000: **80%** effective\n- 90% effective does **not** mean 10% of vaccinated people fall ill\n- In a well-vaccinated town, many ill people can be vaccinated while the vaccine works\n- Compare risks, not counts\n- Held fixed: protection as one share, the same for everyone",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Compare risks, not counts!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Well Does a Vaccine Work?**\n\nB11 said vaccines train immune memory. Level 2 measures how well it works.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Trial | random groups, vaccine or placebo | A fair comparison |\n| Risk | **ill / people in the group** | A share of one group |\n| Effectiveness | **1 − (risk vaccinated / risk unvaccinated)** | Risk taken away |\n| 20 against 200 in 10,000 | 1 − 0.1 | **90%**, with 0.2% ill |\n| 30 against 150 in 5,000 | 1 − 0.2 | **80%** |\n| A vaccinated town | 18 of 38 ill were vaccinated | Risk 2% against 20% |\n| Without the vaccine | 1,000 x 20% | 200 ill, not 38 |\n| Big Idea 11 at Level 2 | ρgh, 10^(difference), risk ratios | Name the reference |\n\n**The one line to remember:** a vaccine's effectiveness compares the risk of falling ill with the risk for unvaccinated people -- so compare risks, never raw counts.\n\n**Big Idea 11 is complete at Level 2.**"
        }
    };
}
