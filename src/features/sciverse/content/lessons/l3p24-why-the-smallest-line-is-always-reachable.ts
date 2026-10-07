import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 24, physics. Mechanism + Limit.
 *
 * L2P24 handed over a rule and only half a reason. It gave two lines -- the trunk,
 * and the two streets added -- and said take the smaller. The EASY half of that is
 * airtight: every litre crosses every line, so the delivery cannot beat any of them.
 * The hard half was never argued at all. Why should the smallest line be REACHABLE?
 * An upper bound is not a promise.
 *
 * This lesson proves it, and needs no new machinery to do it. A cut is any way of
 * putting each junction on the reservoir's side or the houses' side; its capacity is
 * the total of the pipes crossing forwards. Then:
 *
 *   delivery <= every cut            (every litre crosses every cut)
 *   delivery  = the smallest cut     (because being stuck IS a cut)
 *
 * The second line is the content. When no more can be pushed, mark the reservoir and
 * everything still reachable -- forwards along a pipe with room, backwards along a
 * pipe carrying something. The houses cannot be marked, or you were not stuck. Then
 * every forward pipe across the marked boundary is full and every backward one is
 * empty, so the flow equals that cut exactly.
 *
 * It also answers a question L2P24 did not know it had raised: why were there
 * exactly TWO lines? Because there was one junction, and it could fall on either
 * side. n junctions give 2^n cuts, so this lesson's four-cut network has two.
 *
 * Verified by max-flow against min-cut over all 2116 dial settings: they agree
 * everywhere, and all four cuts are the binding one somewhere on the grid.
 *
 * Frame of reference stated: a cut's capacity counts only the pipes crossing FROM
 * the reservoir's side TO the houses' side. Pipes crossing back do not subtract.
 *
 * Still standing: a pipe has no capacity. It has a resistance, and how much crosses
 * it depends on the pressure at both ends, which the rest of the network sets. So
 * the smallest cut is a ceiling that real water need not reach.
 */
export function getL3P24Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P24 gave you a rule that worked, and only half a reason for it.\n\nThe rule was: write down the trunk, write down the two streets added together, and take the **smaller**. And one half of that is airtight. Every litre reaching a house crossed the trunk, so the delivery cannot beat the trunk. Every litre ended up down one street or the other, so it cannot beat the two streets added. **The delivery cannot beat any line you can write down.**\n\nBut look at what that argument actually proves. It proves the delivery is **no more than** the smallest line. It says nothing whatever about whether you can ever **get** the smallest line.\n\nThat gap is not a technicality. An upper bound is a promise about what cannot happen, and we used it as a promise about what will. Imagine a network where every line you can write down is 50 L/min, and yet the water, finding its own way through, only manages 38. Nothing in L2P24 rules that out.\n\nSo: **is the smallest line always reachable, or did L2P24 get lucky?**\n\nThis network is bigger, to make the question real. A reservoir feeds **two junctions**; there is a **link** between them; both run on to the houses. Five pipes. Three of them are fixed -- the reservoir's pipe to the lower junction is **15 L/min**, the link between the junctions is **10 L/min**, and the upper junction's pipe to the houses is **20 L/min**. Your two dials set the other two.\n\n- **Pipe to the Upper Junction**, from the reservoir, in L/min.\n- **Pipe from the Lower Junction**, to the houses, in L/min.\n\nBefore anything else: how many lines does a network like this even have?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'five', label: "One per pipe, surely -- five.", nextNodeId: 'misconception' },
                { id: 'dunno', label: "L2P24 had two. I do not know where two came from.", nextNodeId: 'defining', sentiment: 'positive' }
            ]
        },

        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Not one per pipe -- L2P24 is the counter-example. It had **three** pipes and only **two** lines, and the second line was *street A plus street B*, which is not any single pipe.\n\nSo a line is not a pipe. Look again at what made those two lines true:\n\n- *everything crosses the trunk* -- because putting the junction on the **houses' side** leaves only the trunk running across\n- *everything goes down one street or the other* -- because putting the junction on the **reservoir's side** leaves only the two street pipes running across\n\nThere were two lines because there was **one junction**, and it could be imagined on either side. That is the whole origin of the number two, and it means the lines are not about pipes at all. **A line is a way of splitting the network in half.**",
            options: [
                { id: 'cont', label: "So I should be counting splits, not pipes.", nextNodeId: 'defining' }
            ]
        },

        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Here is the proper name for a line.\n\nA **cut** is any way of sorting every junction into one of two groups: the **reservoir's side** or the **houses' side**. The reservoir itself is always on its own side and the houses always on theirs; it is only the junctions in between that you get to choose. The cut's **capacity** is the total capacity of the pipes running **from the reservoir's side to the houses' side**.\n\nThat direction matters and is easy to get wrong. A pipe running the other way, back from the houses' side to the reservoir's side, is **not counted at all** -- not added, and not subtracted either.\n\nNow count. Each junction independently goes one way or the other, so a network with **n** junctions has **2 to the power of n** cuts. L2P24 had one junction and 2 cuts. This network has two junctions and **four**:\n\n| Upper junction | Lower junction | The pipes crossing forwards |\n| --- | --- | --- |\n| houses' side | houses' side | both of the reservoir's pipes |\n| reservoir's | reservoir's | both of the pipes into the houses |\n| reservoir's | houses' | reservoir-to-lower, the link, upper-to-houses |\n| houses' | reservoir's | reservoir-to-upper, lower-to-houses |\n\nAnd the easy half of the argument survives all of this untouched. Every litre that gets from the reservoir to the houses has to cross **every** cut at least once, whichever way you sorted the junctions -- because the litre starts on one side and finishes on the other. So:\n\n**delivery is no more than the capacity of every cut, and therefore no more than the smallest cut.**\n\nThe question is still the one we started with. Is that smallest cut **reachable**?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'network' } },
            options: [
                { id: 'work', label: "Show me on numbers first.", nextNodeId: 'worked' }
            ]
        },

        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Set both dials to 10 L/min.** So: reservoir-to-upper 10, reservoir-to-lower 15, the link 10, upper-to-houses 20, lower-to-houses 10.\n\nThe four cuts:\n\n- both junctions on the houses' side: 10 + 15 = **25**\n- both on the reservoir's side: 20 + 10 = **30**\n- upper with the reservoir, lower with the houses: 15 + 10 + 20 = **45**\n- upper with the houses, lower with the reservoir: 10 + 10 = **20**\n\nThe smallest is **20 L/min**, and it is the last one -- the cut that takes **one pipe from each end** and no whole path. That is not a cut anybody would guess at.\n\n**Can we actually deliver 20?** Send 10 along reservoir-to-upper-to-houses, and 10 along reservoir-to-lower-to-houses. The two dialled pipes are now full, the link carries nothing, and 20 L/min arrives. **Yes.**\n\n**Can we deliver 21?** No -- and now we can say *no* rather than *we could not find a way*. Every one of those 21 litres would have to cross the cut made of reservoir-to-upper and lower-to-houses, and those two pipes total 20 L/min. The 21st litre has nowhere to be.\n\nThat is the difference this lesson is about. **Before, failing to find a better route meant we had not found one. Now it means there is not one.**",
            options: [
                { id: 'check', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },

        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "Your turn. Put **both dials at 40 L/min**, so the five pipes are: reservoir-to-upper **40**, reservoir-to-lower **15**, the link **10**, upper-to-houses **20**, lower-to-houses **40**.\n\nWork out the four cuts and take the smallest. What does the network deliver?",
            options: [
                { id: 'fortyfive', label: "45 L/min", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'fiftyfive', label: "55 L/min", nextNodeId: 'math_wrong' },
                { id: 'eighty', label: "80 L/min", nextNodeId: 'math_wrong' }
            ]
        },

        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Run all four:\n\n- both on the houses' side: 40 + 15 = **55**\n- both on the reservoir's side: 20 + 40 = **60**\n- upper with the reservoir, lower with the houses: 15 + 10 + 20 = **45**\n- upper with the houses, lower with the reservoir: 40 + 40 = **80**\n\nThe smallest is **45 L/min**.\n\nAnd look at which cut won: **15 + 10 + 20**, three pipes, **not one of them on a dial**. Both of your dials are at 40 and both are irrelevant. Turn them to 50 and the answer is still 45.\n\n55 and 80 are two of the other cuts, and each is a perfectly true statement about what the delivery cannot beat -- they are just not the tightest one. A cut only tells you something useful when it is the smallest. **Every cut is a true ceiling; only the lowest ceiling is the height of the room.**",
            options: [
                { id: 'retry', label: "All four, then the smallest.", nextNodeId: 'explore' }
            ]
        },

        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Both dials are live. All four cut capacities are listed in the note under the gauge, and the winning cut is drawn: its pipes are the thick ones, running from the filled junctions on the reservoir's side to the hollow ones on the houses' side.\n\nThings worth doing:\n\n- Start both dials low and raise them together. Watch the **winning cut change identity** three times on the way up. Each handover is a different sentence about why the network is stuck.\n- Get both dials to 40 or more. The winning cut is **15 + 10 + 20 = 45** and contains no dialled pipe at all. **Both dials are now useless, and you can prove it rather than discover it.**\n- Find a setting where the winner is the cut made of **reservoir-to-upper and lower-to-houses** -- one pipe from each end. It needs both dials small. This is the cut that makes the point: the bottleneck need not be a path, a pipe, or anything you would have drawn a circle around.\n- Try to get the delivery above the smallest cut. You cannot, and by the end of this lesson you will know that is not a limitation of your effort.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "So why is the smallest cut always reachable?", nextNodeId: 'checkpoint' }
            ]
        },

        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "Here is the argument, and it starts from the one situation we have been treating as a failure.\n\nSuppose you have pushed water through until you are **stuck** -- no route from the reservoir to the houses has room left along all of it. Now go through the network marking junctions, like this:\n\n- mark the **reservoir**\n- from anything marked, mark whatever you can reach **forwards along a pipe with room to spare**\n- and also mark whatever you can reach **backwards along a pipe that is carrying something** -- because you could always send less that way, which frees the water up to go elsewhere\n- keep going until nothing new gets marked\n\nWhen it stops, the houses are **not** marked. If they were, the marks would trace a route from the reservoir to the houses with room all the way along -- and you would not have been stuck.\n\nSo the marked junctions and the unmarked ones are two groups, with the reservoir in one and the houses in the other. **That is a cut.**\n\nNow, what is true of the pipes crossing it?",
            options: [
                { id: 'full', label: "Every forward pipe across it must be full, or its far end would have been marked.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'half', label: "Some will be full and some will not -- there is no way to tell.", nextNodeId: 'checkpoint_wrong' },
                { id: 'empty', label: "They must all be empty, because nothing can get through.", nextNodeId: 'checkpoint_wrong' }
            ]
        },

        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Use the marking rule itself -- it was built to force exactly this.\n\nTake a pipe running **forwards** across the boundary, from a marked junction to an unmarked one. Suppose it had room to spare. Then the second marking rule applies to it and its far end **would have been marked** -- so it would not be on the unmarked side after all. It is unmarked, so the pipe has no room. **Every forward pipe across the boundary is full.**\n\nNow take a pipe running **backwards** across it, from unmarked to marked. Suppose it were carrying something. Then the third rule applies and its unmarked end **would have been marked**. It is not. **Every backward pipe across the boundary is empty.**\n\nSo the water crossing this cut is: every forward pipe at its full capacity, and nothing at all coming back. That means\n\n**the delivery equals this cut's capacity, exactly.**\n\nAnd the easy half said the delivery is no more than *every* cut. A cut it exactly equals must therefore be the **smallest** one -- no cut can be below the delivery.",
            options: [
                { id: 'retry', label: "Full forwards, empty backwards, so the flow equals that cut.", nextNodeId: 'checkpoint_correct' }
            ]
        },

        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "**That is the proof, and it is worth seeing what it cost: nothing.**\n\nNo new physics, no formula, no machinery that was not already in L2P24. Just the marking rule, applied until it stops, and then a look at the boundary it leaves behind.\n\n- every **forward** pipe across that boundary is **full**, or its far end would be marked\n- every **backward** pipe across it is **empty**, or its near end would be marked\n- so the delivery **equals** that cut's capacity\n- and since the delivery is no more than every cut, that cut must be the **smallest**\n\nSo both halves are now in hand, and together they say the delivery **is** the smallest cut -- not at most it.\n\n**Being stuck is itself a cut.** That is the sentence to keep. When a network will not do any better, the reason is not that you ran out of ideas; the marking rule hands you the proof, in the form of a boundary where everything forwards is full and everything backwards is empty.\n\nAnd this is why L2P24's two lines were enough. One junction, two ways to sort it, two cuts -- and the smaller of them was not a guess or a rule of thumb. It was the answer.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Being stuck is a cut!", nextNodeId: 'discovery' }
            ]
        },

        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned a rule of thumb into a theorem.**\n\n- A **cut** sorts every junction onto the reservoir's side or the houses' side. Its **capacity** is the total of the pipes crossing **forwards**; pipes crossing back are not counted at all\n- A cut is **not** a pipe. L2P24's second line was two pipes added, and this lesson's winning cut is often three\n- **n junctions give 2 to the power of n cuts.** That is where L2P24's *two lines* came from, and it was never explained there\n- **The easy half:** every litre crosses every cut, so the delivery is **no more than** the smallest cut\n- **The hard half:** when you are stuck, mark the reservoir and spread the marks -- forwards where there is room, backwards where something is flowing. The houses stay unmarked, or you were not stuck\n- Across that boundary every forward pipe is **full** and every backward pipe is **empty**, so the delivery **equals** that cut -- which must then be the smallest. **Being stuck is itself a cut**\n- Both dials at 10: the cuts are 25, 30, 45 and **20**, and the winner takes **one pipe from each end**. Not a path, not a pipe, nothing you would have circled\n- Both dials at 40: the winner is **15 + 10 + 20 = 45**, which contains **no dialled pipe**, so both controls are provably useless\n- Every cut is a true ceiling. **Only the lowest ceiling is the height of the room**\n- So *we could not find a better route* has become *there is no better route*, and that is the whole difference between a rule that works and a rule you can trust\n- **Still standing:** a pipe still has no capacity. A real pipe has a **resistance**, and how much crosses it depends on the pressure at **both** of its ends, which the rest of the network decides. Water finding its own way does not solve this problem -- it settles where the pressures balance, and generally delivers **less** than the smallest cut. So the theorem is exact about the ceiling and silent about the floor, and L2P24's looked-up capacities are still looked up.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Complete L3P24", nextNodeId: 'complete' }
            ]
        },

        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Physics Complete -- How Do Networks Deliver What Matters?**\n\nL2P24 was right. It just could not have known it was right.\n\n**Summary Table:**\n| | L2P24 said | L3P24 says |\n| --- | --- | --- |\n| The lines | the trunk, and the streets added | **cuts**: every way of splitting the network |\n| How many | two, unexplained | **2 to the power of n**, for n junctions |\n| What a line is made of | pipes you can see | the pipes crossing **one** boundary |\n| Pipes crossing backwards | -- | **not counted**, neither added nor subtracted |\n| The easy half | take the smaller | delivery is **no more than** every cut |\n| The hard half | assumed | delivery **equals** the smallest cut |\n| Why | -- | **being stuck is itself a cut** |\n| What failure means | we found no better route | **there is no better route** |\n| Still standing | capacities looked up | a pipe has **resistance**, not capacity |\n\n**The one line to remember:** a network's limit is a boundary rather than a part, and the proof is hiding inside the moment it stops working -- mark everything you can still reach, and the edge of what you marked is the bottleneck, with everything forwards full and everything backwards empty.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'complete' } },
            options: []
        }
    };
}
