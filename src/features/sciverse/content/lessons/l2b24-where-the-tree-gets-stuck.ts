import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 24, biology. The closing lesson.
 *
 * B24 said that branching networks make sure every cell gets what it needs. This
 * asks the question that actually decides whether they do:
 *
 *   water delivered per day = the smallest of
 *       (what the roots take up, what the xylem carries, what the leaves ask for)
 *
 * which is L2P24's rule with three steps instead of two lines -- and it ties the
 * Big Idea together, because a tree is built out of exactly the two pieces the
 * other two lessons found. A CHAIN takes the smallest (L2P24). A JUNCTION divides
 * in proportion (L2C24). The xylem is a chain; the phloem is a junction.
 *
 * The decision is a real one and it is counter-intuitive: watering a wilting tree
 * harder raises the root step from 250 to 450 L/day and the tree still wilts at
 * midday, because the xylem's 300 L/day is now the smallest step. Trees really do
 * wilt at midday while standing in wet soil.
 *
 * And the limit MOVES. Hot day, 400 asked for: the roots limit at 250. Cool day,
 * 150 asked for: the leaves limit, and the tree is not short of water at all. Wet
 * and hot: the xylem limits at 300. All three steps are reachable on the dials,
 * which is the point -- a tree cannot be built for one bottleneck.
 *
 * Frame of reference stated: every figure is litres of water per day moving from
 * the soil towards the air, measured for one medium oak on a summer day.
 *
 * Still standing: the three capacities are given, not worked out. In particular the
 * xylem's is treated as a fixed property of the tree, when it really depends on how
 * many of its vessels are still full of water -- and a vessel that has let in an
 * air bubble is out of service. L3B24 asks what shape of network it is worth being.
 */
export function getL2B24Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B24 said that branching networks make sure every cell gets what it needs. A tree is the test of that claim, because it has to move water from soil to leaf against gravity, all day, with no pump.\n\nAnd the claim needs checking, because trees **wilt**. Leaves go limp when less water arrives than is leaving. So something in the network is running short -- and the useful question is **which part**, or in plainer words, **where the water gets stuck**.\n\nWater takes three steps to cross a tree, in a fixed order, and each one has a limit.\n\n1. The **roots** pull water out of the soil. How much they can take up in a day depends on how wet the soil is and how much root there is.\n2. The **xylem** carries it up the stem. Xylem is the tree's plumbing: columns of dead, hollow cells joined end to end, running root to leaf.\n3. The **leaves** let it go as vapour, through tiny pores, which is called **transpiration**. How much they ask for depends on the weather -- hot, dry and windy air pulls far more out than cool, still air.\n\nEvery figure here is **litres per day (L/day)**, measured moving from the soil towards the air, for one medium oak on a summer day. The **xylem** of this particular tree can carry **300 L/day**, and that stays fixed.\n\nYour two dials are the two ends:\n\n- **Root Uptake** -- what the roots can take from the soil, in L/day. Wet soil and plenty of root means a big number.\n- **Leaf Demand** -- what the leaves are asking for, in L/day, which is really a dial for the weather.\n\nSo: the roots can take up 250 L/day, the xylem can carry 300, and on a hot afternoon the leaves are asking for 400. **How much water crosses this tree today?**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'add', label: "Add them up -- the whole network is working together.", nextNodeId: 'misconception' },
                { id: 'smallest', label: "250 L/day. It cannot beat the smallest step.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Adding is the right move in one of the two shapes a network comes in, and this is the other one.\n\nIn L2P24, street A and street B were **side by side**, so their capacities added: 25 + 20 = 45 L/min. Water had a genuine choice of route, and both routes carried some.\n\nThese three steps are **not** side by side. They are in a **queue**. Every litre that reaches a leaf was taken up by the roots *and* carried by the xylem *and* released by the leaves, in that order. There is no way round any of them.\n\nSo nothing adds. The water that crosses the tree is whatever the **tightest** step in the queue allows:\n\n250, 300, 400 -- the smallest is **250 L/day**, and that is the answer.\n\n**Side by side, capacities add. In a queue, the smallest one wins.** You met the same pair of rules in the pipes, and a tree is built out of both.",
            options: [
                { id: 'cont', label: "So the smallest step decides.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Write it down and it is barely a formula at all:\n\n**water delivered = the smallest of (roots, xylem, leaf demand)**\n\nin L/day, while the tree is in a steady state -- not filling up or drying out over the day -- and while the three capacities hold.\n\nThe smallest one is the **limiting step**: the single part of the network that is setting the answer. And the rule has a consequence you already know from L2P24, where raising the looser of two lines delivered nothing at all.\n\n**Improving any step except the limiting one changes the answer by exactly zero.**\n\nThat is a strange thing to be true of a living network, and it is worth sitting with. Growing more root into wet soil is real work for the tree, and it buys nothing whatever unless the roots were the limiting step. The same goes for every part.\n\nOne more thing to notice about this list. The first two steps are **supply** -- what the tree *can* move. The third is **demand** -- what the weather is *asking for*. When demand is the smallest, nothing is wrong with the tree at all: it is simply not a thirsty day.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me the weather changing it.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**One tree, three days.** Roots 250, xylem 300 throughout.\n\n**A hot afternoon.** The leaves ask for **400**.\n\n250, 300, 400 -- the smallest is **250 L/day**. The **roots** are the limiting step. The leaves are asking for 400 and getting 250, so they lose more than arrives and the tree **wilts**.\n\n**A cool, still day.** The leaves ask for **150**.\n\n250, 300, 150 -- the smallest is **150 L/day**, and now the **leaves** are the limiting step. The tree is perfectly fine. Nothing improved; the weather simply stopped asking.\n\n**After heavy rain, still hot.** The soil is soaked, so root uptake rises to **450**, and the leaves still ask for **400**.\n\n450, 300, 400 -- the smallest is **300 L/day**, and the **xylem** is the limiting step. And here is the thing worth the whole lesson: the tree is standing in wet soil, its roots could take up 450 L/day, and **it still cannot deliver more than 300**, because the stem in between cannot carry it.\n\n**The limiting step moved three times in three days, and the tree did not change at all.** That is why no single part can be the thing a tree is built around.",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. The soil has dried out, so **root uptake is 120 L/day**. The xylem can still carry **300**. It is a hot day and the leaves are asking for **400**.\n\nHow much water crosses the tree, and which step is limiting?",
            options: [
                { id: 'onetwenty', label: "120 L/day, limited by the roots", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'threehundred', label: "300 L/day, limited by the xylem", nextNodeId: 'math_wrong' },
                { id: 'eighttwenty', label: "820 L/day, adding the three steps", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Line the three up and take the smallest:\n\n120, 300, 400 -- the smallest is **120 L/day**, and the **roots** are the limiting step.\n\nThe xylem's 300 is the right answer to a different question: it is what the stem *could* carry. It never gets the chance, because only 120 is arriving from below. A capacity that is not the smallest is **spare capacity**, and spare capacity delivers nothing.\n\nAnd 820 is the three added together, which is the arithmetic for steps that are **side by side**. These are in a **queue**, so they are compared, not added -- and adding them gives an answer larger than any single step could pass, which is the signal that the wrong rule was used.\n\n**Check the shape before you choose the arithmetic.**",
            options: [
                { id: 'retry', label: "In a queue, take the smallest.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. The three steps are drawn as three bars, and a line is dropped at the **smallest** one -- that line is the delivery.\n\nThings worth doing:\n\n- Leave **Leaf Demand** at 400 and walk **Root Uptake** up from 50. The delivery follows it exactly, and then **stops at 300** and never moves again, however wet you make the soil. You have just watched the limiting step hand over from the roots to the xylem.\n- Now drop **Leaf Demand** to 100 with the roots still high. The delivery falls to 100 -- and nothing is wrong. That is a cool day.\n- Find the setting where all three are **equal**. A tree built exactly for one kind of weather, with nothing spare anywhere.\n- Put the roots at 500 and the demand at 500. The xylem's 300 is all you get, and both dials are now useless. **Two improvements, no improvement.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Checkpoint", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "A gardener has a young oak whose leaves go limp every hot afternoon. Reasoning that it must be thirsty, they water it heavily and keep the soil soaked, taking root uptake from 250 up to **450 L/day**.\n\nThe xylem carries **300**. The leaves still ask for **400** on a hot afternoon.\n\nThe tree still wilts at midday. **Why?**",
            options: [
                { id: 'xylem', label: "The xylem's 300 L/day is now the smallest step, so more water in the soil cannot help.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'more', label: "It needs even more water -- the soil still is not wet enough.", nextNodeId: 'checkpoint_wrong' },
                { id: 'roots', label: "The extra water damaged the roots, lowering their uptake again.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "List the three and take the smallest:\n\n450, 300, 400 -- the smallest is the **xylem**, at **300 L/day**.\n\nThe gardener raised the step that was *already* going to stop being the limit. Root uptake went from 250 to 450, the delivery went from 250 to **300**, and then stopped -- a gain of 50 L/day out of the 200 L/day of extra uptake they paid for. Everything past 300 was spare capacity.\n\nSo the first answer cannot work: more water in the soil raises a number that is no longer the smallest one. This is L2P24's result again, in a living thing -- the city widened a street pipe and measured no change, and the gardener soaked the soil and measured a tree that still wilts.\n\nAnd the tree is not ill. A tree whose xylem is the limiting step on a hot afternoon **will** wilt at midday while standing in wet soil, and recover by evening when the demand drops. That is normal, and knowing it saves a gardener from watering a tree that does not need it.",
            options: [
                { id: 'retry', label: "The limit had already moved to the xylem.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**Exactly -- and notice that you have just answered a gardening question with a water-main calculation.**\n\nThe city in L2P24 replaced a street pipe and measured no improvement, because the trunk was already the tighter line. The gardener soaked the soil and the tree still wilted, because the xylem was already the smaller step. **Same arithmetic, same mistake, same lesson** -- find the limiting step before you spend anything, whether the currency is money or the tree's own growth.\n\nAnd the tree's version comes with a harder constraint than the city's. The city can replace a pipe this year. A tree builds its xylem once, out of the sugar it has, and has to live with it through every kind of weather that comes -- which is why having everything equal is not actually the goal. Spare capacity in the roots is what lets a tree survive the day the soil dries out.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Find the limiting step first!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You closed the Big Idea with two rules and nothing else.**\n\n- **water delivered = the smallest of (roots, xylem, leaf demand)**, in L/day, in a steady state\n- The three steps are a **queue**: every litre crossed all of them in order, so they are **compared**, not added\n- The smallest is the **limiting step**, and **improving any other step changes the answer by exactly zero**\n- Roots 250, xylem 300, demand 400: delivery **250 L/day**, the **roots** limit, and the tree **wilts**\n- Cool day, demand 150: delivery **150 L/day**, the **leaves** limit -- and nothing is wrong. Supply and demand are both in the list\n- Wet soil, roots 450: delivery **300 L/day**, the **xylem** limits, and the tree wilts at midday **in wet soil**\n- **The limiting step moved three times while the tree stayed the same.** No single part can be the thing a network is built around\n- Watering harder took the delivery from 250 to 300 and no further: **50 L/day gained from 200 L/day bought**\n- That is L2P24's city, exactly. **A chain takes the smallest; pipes side by side add.** A tree is built from both shapes\n- And L2C24's shape is in the tree too. The sugar the leaves make travels down the **phloem** -- the tree's other plumbing, which carries food rather than water -- and **divides** between everything asking for it: new leaves, roots, fruit, repair. A junction, dividing one stream in proportion, exactly as the carbon did\n- So the whole Big Idea is two pieces: **chains take the smallest, junctions divide in proportion.** Every network, in a city or a flame or a tree, is made of those\n- **Still standing:** the three capacities were handed to you. The xylem's especially -- it is treated as a fixed property of the tree, when it really depends on how many of its vessels are still carrying water, and a vessel that has let in an air bubble is out of service for good. **L3B24** asks what shape of network is worth building in the first place.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L2B24", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Networks Deliver What Matters?**\n\nThree networks -- a city's water, a flame's carbon, a tree's sap -- and between them only two rules.\n\n**Summary Table:**\n| | Physics (L2P24) | Chemistry (L2C24) | Biology (L2B24) |\n| --- | --- | --- | --- |\n| The network | reservoir, trunk, two streets | one carbon, two routes | soil, roots, xylem, leaves |\n| The shape | pipes **side by side** | a **junction** | a **queue** of three steps |\n| The arithmetic | capacities **add** | the stream **divides** | take the **smallest** |\n| The formula | smaller of trunk and A + B | one route / the total | smallest of the three steps |\n| In real units | **45 L/min** delivered | **90.9%** burns to CO2 | **250 L/day** crosses the tree |\n| The surprise | widening the narrowest pipe can do **nothing** | doubling **both** routes changes **nothing** | watering a wilting tree can do **nothing** |\n| What it changes | which pipe to buy | air before size | whether to water at all |\n| Still standing | a pipe has resistance, not capacity | the split assumes no way back | the capacities were given |\n\n**The one line to remember:** every network is made of chains and junctions -- a chain delivers only as much as its smallest step, and a junction divides what reaches it in proportion -- so the first question is never *how do I make this better?* but *which part is actually deciding?*",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
