import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 9, physics.
 *
 * L2P9 and L2B9 treated growth as adding the same share every week -- doubling
 * for ever. This removes that simplification with the logistic model:
 * growth per week = r x N x (1 - N/K), where the share of room left brakes the
 * growth. Worked by hand: with r = 1 per week and K = 64 cm, growth peaks at
 * N = K/2 = 32 cm at r x K / 4 = 16 cm, which is why P9's sunflower added its
 * most centimetres in week 6 (17 cm measured).
 *
 * Frame of reference stated: N is the height at the start of the week,
 * measured up from the soil. Condition stated: r and K held fixed, whole
 * weekly steps. Still standing: K itself depends on conditions, and the
 * measured early shares rose before falling, which the model cannot show.
 */
export function getL3P9Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P9 ended on a puzzle. If every week added the **same share** of the sunflower's height, it would grow faster and faster for ever, like L2B9's doublings. But its share fell week by week -- **140%** in week 4, **68%** in week 6, **31%** in week 7 -- and by week 10 it had almost stopped, at **63 cm**.\n\nSo P9's sunflower added its most centimetres in **week 6**, from 25 cm to 42 cm: in the middle of its growth, not at the start and not at the end.\n\nWhy would a plant grow fastest in the middle?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Two things pull against each other. A bigger plant has more leaves and cells to grow with, which speeds it up. But the closer it gets to its full height, the less room it has left, which slows it down. The fastest growth comes in between.", nextNodeId: 'model', sentiment: 'positive' },
                { id: 'bad', label: "Week 6 must have had the best weather.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Weather matters, and a real plant's weeks are bumpy. But almost everything that grows follows the same shape -- slow, then fast, then slow. A sunflower does it. So does yeast growing in a jar of sugary water, and a population of rabbits let loose on an island. The weather cannot explain them all.\n\nThe shape comes from the growth itself. Two effects pull in opposite directions:\n\n- **the more there is, the more it can add** -- more leaves make more sugar, and more cells make more cells, as in L2B9\n- **the closer it gets to its limit, the less room it has left**\n\nEarly on, the first effect wins. Near the end, the second wins. Drawn as height against time, the growth makes a stretched letter **S**.",
            options: [
                { id: 'cont', label: "How do I put the two effects into one formula?", nextNodeId: 'model' }
            ]
        },
        model: {
            id: 'model',
            speaker: 'AI',
            content: "Growth needs a limit. Call it the **full height, K**: the height at which growth stops. (This K has nothing to do with potassium.) For P9's sunflower, **K is about 64 cm**, just above its week 10 height.\n\nBuild the model one piece at a time.\n\n**Piece 1: more plant, more growth.** As in L2B9, the growth each week is a share of what is already there:\n\ngrowth per week = r x N\n\n- **N** is the height at the **start** of the week, measured up from the soil, in cm. That is the frame of reference, as in L2P9\n- **r** is the **growth rate**: the share added each week when there is plenty of room, in **per week**. r = 1 per week would double the height every week\n\n**Piece 2: the brake.** Multiply by the share of the room still left:\n\nshare of room left = 1 − N/K\n\nFor a tiny plant, N/K is almost 0, so almost all the room is left and the brake is off. When N reaches K, the room left is 0, and growth stops.\n\nPut the two pieces together:\n\n**growth per week = r x N x (1 − N/K)**\n\nThis is the **logistic model**. Its graph of height against time is called an **S-curve**.\n\nThink of a hall filling up for a concert. Everyone already inside messages friends to come, so the more people inside, the faster others arrive. But as the seats fill, new arrivals find fewer empty seats. People arrive fastest when the hall is **half full**.\n\nThe condition belongs here. **This model holds r and K fixed** -- the same light, water, soil and warmth all the way through -- and adds the growth in whole weekly steps. Nobody measures r and K with a ruler: they are chosen so the model matches the plant.",
            options: [
                { id: 'cont', label: "Find where the growth is fastest.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "Take the sunflower's model: **r = 1 per week** and **K = 64 cm**. Work out the growth per week at five heights.\n\n| Height at the start of the week, N | Share of room left, 1 − N/64 | Growth per week = 1 x N x (1 − N/64) |\n| --- | --- | --- |\n| 8 cm | 1 − 8/64 = 0.875 | 8 x 0.875 = 7 cm |\n| 16 cm | 1 − 16/64 = 0.75 | 16 x 0.75 = 12 cm |\n| 32 cm | 1 − 32/64 = 0.5 | 32 x 0.5 = **16 cm** |\n| 48 cm | 1 − 48/64 = 0.25 | 48 x 0.25 = 12 cm |\n| 56 cm | 1 − 56/64 = 0.125 | 56 x 0.125 = 7 cm |\n\nThe growth rises, peaks and falls again. It is largest at **N = 32 cm, exactly half of K**: big enough to grow well, with half the room still left.\n\nAt that point, growth per week = r x (K/2) x (1/2) = **r x K / 4** = 1 x 64 / 4 = **16 cm**. No week can add more.\n\nNow step the model forward from 2 cm in week 1, one week at a time, and set it beside P9's measurements:\n\n| Week | 4 | 5 | 6 | 7 | 8 |\n| --- | --- | --- | --- | --- | --- |\n| Model height | 14.4 cm | 25.5 cm | 40.8 cm | 55.6 cm | 62.9 cm |\n| Measured height | 12 cm | 25 cm | 42 cm | 55 cm | 60 cm |\n| Model growth that week | 6.7 cm | 11.1 cm | **15.3 cm** | 14.8 cm | 7.3 cm |\n| Measured growth that week | 7 cm | 13 cm | **17 cm** | 13 cm | 5 cm |\n\nWeek 6 starts at about 25 cm, the closest any week starts to 32 cm, and both the model and the plant add the most that week.\n\nAnd the falling share? share added = growth / N = **r x (1 − N/K)**. At 8 cm it is 88%; at 32 cm, 50%; at 56 cm, only 12.5%. **The share falls as the room runs out.**",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Same model: **r = 1 per week**, **K = 64 cm**.\n\nAt the start of a week the sunflower is **40 cm** tall. How much does it grow that week?",
            options: [
                { id: 'right', label: "15 cm. The share of room left is 1 − 40/64 = 0.375, and 1 x 40 x 0.375 = 15 cm.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_brake', label: "40 cm, because r x N = 1 x 40 = 40.", nextNodeId: 'math_wrong' },
                { id: 'used', label: "25 cm, because 40 x 40/64 = 25.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**40 cm** left out the brake. r x N is how fast the plant would grow with unlimited room -- it would reach 80 cm, far past its full height of 64 cm.\n\n**25 cm** multiplied by N/K, the share of the room **used up**, instead of 1 − N/K, the share **left**. Test that at the ends: a tiny seedling has used almost none of its room, so N/K would stop it growing, and a plant at full height would grow fastest. Backwards.\n\ngrowth per week = 1 x 40 x (1 − 40/64) = 40 x 0.375 = **15 cm**",
            options: [
                { id: 'retry', label: "Multiply by the share of room left.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, with r fixed at **1 per week**, for a plant that is 2 cm tall in week 1.\n\n**Full Height** is K, in cm. **Week** picks one week of growth, from week 2 to week 12.\n\nOn the left, the lab draws the S-curve of height against week, with dashed lines at K and at K/2, and marks the growth in the week you picked. On the right, it draws the hump of growth per week against the height at the start of the week, with a dot for your week.\n\nTry this:\n\n- Set **Full Height** to **64 cm** and step through the weeks. The fastest week is week 6\n- Watch the dot ride up the hump and down again. The top of the hump is at half the full height\n- Set **Full Height** to **32 cm**. No week can now add more than r x K / 4 = **8 cm**, and the fastest week comes sooner",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Fastest at half the full height. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A second sunflower grows in shade. Its growth rate is the same, **r = 1 per week**, but it only reaches a full height of **K = 30 cm**.\n\nAt what height does it grow fastest, and how many centimetres does it add in that week?",
            options: [
                { id: 'right', label: "At 15 cm, half its full height. Growth per week = 1 x 15 x (1 − 15/30) = 7.5 cm, which is r x K / 4 = 30 / 4.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "At 32 cm, the same as the first sunflower, adding 16 cm. The fastest growth always comes at 32 cm.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "32 cm was half of the **first** sunflower's full height. The peak is not fixed at 32 cm -- it sits at **half of whatever K is**.\n\nThis shaded sunflower never even reaches 32 cm. Put 32 cm into its model: 1 − 32/30 is less than 0, so the model gives a **negative** growth -- a sign the height is past anything this plant can reach.\n\n| Height at the start of the week, N | Share of room left, 1 − N/30 | Growth per week |\n| --- | --- | --- |\n| 10 cm | 0.667 | 6.7 cm |\n| 15 cm | 0.5 | **7.5 cm** |\n| 20 cm | 0.333 | 6.7 cm |\n\nThe peak is at **15 cm = K/2**, and it adds r x K / 4 = **7.5 cm**.",
            options: [
                { id: 'retry', label: "The peak is at half of K.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Logistic growth is fastest at half the full height, and that fastest growth is r x K / 4.**\n\nHere is the simplification this lesson removed. **L2P9 and L2B9 treated growth as adding the same share every week** -- doubling for ever. The logistic model lets the share fall as the room runs out: **share added = r x (1 − N/K)**. That single change bends a doubling curve into an S.\n\nAnd the simplifications still standing. **r and K were held fixed.** For a real plant, the full height itself depends on light, water and the nutrients in the soil -- which is where L3C9 comes in. And the model's share can only ever fall, week after week. The sunflower's measured share did not: it **rose** at first, from 50% in week 2 to 140% in week 4, as the young plant opened its first leaves, before it began to fall. The model cannot show that.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Growth with a brake!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why growth slows down.**\n\n- More plant means more growth; less room left means less growth\n- **growth per week = r x N x (1 − N/K)** -- the **logistic model**\n- **N**: height at the start of the week, measured up from the soil. **K**: full height. **r**: growth rate, per week\n- Condition: r and K held fixed, growth added in weekly steps\n- Height against time makes an **S-curve**\n- Growth is fastest at **N = K/2**, where it is **r x K / 4**\n- Sunflower model, r = 1 per week and K = 64 cm: at most **16 cm** a week, at 32 cm\n- Week 6 starts nearest 32 cm: model 15.3 cm, measured 17 cm\n- At 40 cm: 1 x 40 x 0.375 = **15 cm**\n- A shaded sunflower with K = 30 cm: fastest at **15 cm**, adding **7.5 cm**\n- **share added = r x (1 − N/K)**, so the share falls as the room runs out\n- Still standing: K depends on conditions, and the real share rose before it fell",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Fastest at half the full height!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why Growth Slows Down!**\n\nL2P9 measured the share a plant adds. Level 3 finds out why that share falls.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| More plant, more growth | r x N | A share of what is there |\n| The brake | **1 − N/K** | The share of room left |\n| Logistic model | **r x N x (1 − N/K)** | Height makes an S-curve |\n| Fastest growth | at **N = K/2** | Half the full height |\n| How fast | **r x K / 4** | 16 cm a week for K = 64 cm |\n| At 40 cm | 1 x 40 x 0.375 = **15 cm** | Past the peak |\n| Shade, K = 30 cm | 7.5 cm at 15 cm | The peak moves with K |\n| Share added | **r x (1 − N/K)** | Falls as room runs out |\n| Still standing | fixed r and K | Real limits change |\n\n**The one line to remember:** growth speeds up while there is plenty of room and slows as the room runs out -- so it is fastest at half the full height.\n\n**Up next:** L3C9 -- what the second and third numbers on a bag of plant food really count."
        }
    };
}
