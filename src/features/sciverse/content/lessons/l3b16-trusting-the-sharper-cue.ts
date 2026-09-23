import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 16, biology. Closes the Big Idea.
 *
 * Removes L2B16's simplification that every cue is trusted equally -- but by
 * search rather than by assertion, because 1/error^2 cannot be derived at this
 * level and a handed-down formula is a recipe, not a reason.
 *
 * The chain the learner already owns is L2B16's: errors add through their
 * squares, which is where its error/sqrt(n) came from. Generalised to any split,
 *
 *   combined error = sqrt( (share1 x error1)^2 + (share2 x error2)^2 )
 *
 * which collapses to L2B16 when the shares are equal (two +-10 give 7.07).
 * The learner then tries splits for +-5 and +-20: 50% gives 10.31, 90% gives
 * 4.92, 94% gives 4.85, 96% gives 4.87, 100% gives 5.00. There is a lowest
 * point at neither end, it sits at 94 to 6 -- which is 16 to 1, and (20/5)^2 is
 * 16. The rule is discovered, not given.
 *
 * Still standing: it cancels no bias, the split must be known, and *proving*
 * 1/error^2 optimal needs statistics beyond this level.
 */
export function getL3B16Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B16 gave you a clean rule for combining cues: **combined error = single error / √n**. Two cues of ±12° became ±8.5°.\n\nThat rule quietly assumed the cues were equally good. Real ones are not.\n\nSuppose a bird has a **star sense good to ±5°** on a clear night, and a **magnetic sense good to ±20°**. Average them the way L2B16 did, giving each an equal vote.\n\nIs that the best it can do?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No. Giving a vague cue an equal vote drags the sharp one down. The weights should reflect how reliable each cue is, so the sharp cue counts for much more.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "No -- so it should throw the vague cue away and use the ±5° star sense alone. A bad measurement can only make a good one worse.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Half right, and the other half is the interesting part.\n\nYou are right that an equal vote is a mistake. Average ±5° and ±20° equally and you get **±10.3°** -- **twice as bad** as simply ignoring the vague cue and trusting the star sense alone.\n\nBut throwing it away is also a mistake. Weight the two properly and you get **±4.85°**, which is slightly better than the ±5.00° of the sharp cue on its own.\n\n| What the bird does | Combined error |\n| --- | --- |\n| Averages both equally | ±10.31° |\n| Uses the sharp cue alone | ±5.00° |\n| **Weights them properly** | **±4.85°** |\n\nSo a vague cue is worth keeping -- it just must not be allowed an equal say. Even a rough second opinion carries a little information, and the right arithmetic extracts exactly as much as it is worth and no more.",
            options: [
                { id: 'cont', label: "Give me the weighting.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Start with the idea of a **share of the vote**. Instead of counting both cues equally, hand the sharp one a bigger share -- say **70%** of the vote to the star sense and **30%** to the magnetic sense. The two shares must add to 100%.\n\nSo how good is a blend like that? L2B16 already gave you the key: **errors do not add, they add through their squares.** That is where its √n came from.\n\nWritten for any split, with the shares as decimals adding to 1:\n\n**combined error = √( (share₁ x error₁)² + (share₂ x error₂)² )**\n\n**Check it against L2B16.** Two cues of ±10°, each holding half the vote:\n\n√( (0.5 x 10)² + (0.5 x 10)² ) = √(25 + 25) = √50 = **7.07°**\n\nwhich is exactly 10/√2 -- L2B16's own answer. The old rule turns out to be this rule with the vote split evenly.\n\nThe conditions, and there are two so far. **The cues must be independent**: two readings of the same bent compass are not. **The cues must be unbiased**, exactly as in L2B16 -- how you split the vote does nothing whatever about an error that leans the same way every time.\n\nYou now have a machine for testing any split you like. So which split is best?",
            options: [
                { id: 'cont', label: "Put the two senses through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Go and find it.** Star sense **±5°**, magnetic sense **±20°**. Try splits and watch what happens.\n\n**80% / 20%:** √( (0.8 x 5)² + (0.2 x 20)² ) = √(16 + 16) = √32 = **5.66°**\n\n**90% / 10%:** √( (0.9 x 5)² + (0.1 x 20)² ) = √(20.25 + 4) = √24.25 = **4.92°**\n\n**94% / 6%:** √( (0.94 x 5)² + (0.06 x 20)² ) = √(22.09 + 1.44) = √23.53 = **4.85°**\n\n**96% / 4%:** √(23.04 + 0.64) = √23.68 = **4.87°** -- it has started to climb again.\n\n| Sharp cue's share of the vote | Combined error |\n| --- | --- |\n| 50% | ±10.31° |\n| 70% | ±6.95° |\n| 80% | ±5.66° |\n| 90% | ±4.92° |\n| **94%** | **±4.85°** |\n| 96% | ±4.87° |\n| 100% | ±5.00° |\n\nThere is a **lowest point**, and it sits at neither end. Ignoring the vague cue altogether gives 5.00°. Letting it have half the vote gives 10.31°. Giving it about **6%** gives **4.85°**, the best there is.\n\n**Now look at what 94 to 6 really is.** That ratio is almost exactly **16 to 1**. And the two errors were 5 and 20:\n\n(20 / 5)² = 4² = **16**\n\nSo the vote divides in proportion to **1 / error²**. A cue twice as sharp deserves **four** times the say, not twice. Nobody had to tell you that -- the search found it.\n\nTurn the three answers into distance with the tangent L2P16 and L2B16 both used, over a **1,000 km** flight:\n\n| What the bird does | Error | Miss after 1,000 km |\n| --- | --- | --- |\n| Splits the vote evenly | ±10.31° | **182 km** |\n| Ignores the vague cue | ±5.00° | 87 km |\n| **Splits it 16 to 1** | **±4.85°** | **85 km** |\n\nThe even split costs **97 km** against the best one -- and it is worse than ignoring the vague cue entirely.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A bird has one cue good to **±8°** and another good only to **±30°**.\n\nUsing what the search turned up -- the vote divides in proportion to 1 / error² -- what split should it use, and what combined error does that give?",
            options: [
                { id: 'right', label: "About 14 to 1, since (30/8)² = 14.06 -- so the sharp cue takes about 93% of the vote, giving √((0.934 x 8)² + (0.066 x 30)²) = √59.7 = about ±7.73°.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'equal', label: "An even split, so √((0.5 x 8)² + (0.5 x 30)²) = ±15.52°.", nextNodeId: 'math_wrong' },
                { id: 'mean', label: "±19°, the average of 8 and 30.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**±15.52°** is the answer for an **even** split -- the very thing this lesson set out to beat. Notice how bad it is: worse than the ±8° cue on its own, which is what half a vote does when the cues are badly matched.\n\n**±19°** averaged the errors themselves. Errors never average like that; they combine through their **squares**, which is why a ±30° cue barely shifts an answer built around a ±8° one.\n\n**Step 1.** the ratio of the votes: (30 / 8)² = **14.06 to 1**\n\n**Step 2.** so the sharp cue takes 14.06 / 15.06 = **93.4%** of the vote, and the vague one 6.6%\n\n**Step 3.** combined error = √( (0.934 x 8)² + (0.066 x 30)² ) = √(55.8 + 3.9) = √59.7 = **7.73°**\n\nThe answer sits very close to 8°, nudged down to 7.73° -- a small gain, honestly earned, and far better than the 15.52° an even split would have handed you.",
            options: [
                { id: 'retry', label: "Weights are one over the square.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Sharp Cue Error** sets the better cue, from ±2° to ±15°. The vague cue stays fixed at **±20°**.\n\n**Sharp Cue Share** sets how much of the vote that better cue takes, from 50% to 100%.\n\nThe lab draws the combined error against the share, marks the lowest point it can find, and prints the best share.\n\nTry this:\n\n- Sharp cue **±5°**: slide the share up from 50% and watch the error fall to **±4.85°** at about **94%**, then climb back towards ±5.00°\n- The lowest point is never at 100%: even a rough second opinion is worth a little\n- Sharp cue **±15°**: now the two cues are close in quality, and the best share falls to about **64%** -- the vague cue has earned far more of the say\n- Sharp cue **±2°**: the best share climbs past **99%**, because a ±20° cue can hardly improve on ±2°\n- Every time, the best share works out as error₂² / (error₁² + error₂²) -- which is just 1 / error² written as a fraction",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "One over the square, and the sharp cue dominates. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** The split has to come from somewhere: a bird must learn which of its senses to trust, presumably from experience.\n\nSuppose a young bird gets it backwards. Its star sense really is ±5° and its magnetic sense ±20°, but it has learned the opposite, so it hands the **magnetic** cue 94% of the vote.\n\nIs it still better off than a bird that simply splits the vote evenly?",
            options: [
                { id: 'right', label: "No -- it is worse. Weighting by wrong weights is worse than not weighting at all, because it actively pushes the answer towards the less reliable cue. Equal weighting at least treats an unknown situation neutrally.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- any weighting is better than none, since weighting is the mathematically correct procedure.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The method is only right when the split is right. Reverse it and it becomes a machine for amplifying the worse measurement.\n\nLine the three strategies up for a bird whose cues really are ±5° and ±20°:\n\n| Strategy | Combined error | Miss after 1,000 km |\n| --- | --- | --- |\n| Best split, 16 to 1 | **±4.85°** | **85 km** |\n| Even split | ±10.31° | 182 km |\n| **Reversed split** | **±18.83°** | **341 km** |\n\nReversing the split is nearly twice as bad as not bothering at all, and it lands close to the ±20° cue it has wrongly decided to trust. The bird has used a careful method to arrive somewhere near trusting its worst sense.\n\nWhich makes the learning of the split a real biological problem rather than a footnote -- and it is exactly what **cue-conflict experiments** probe. Put a migrating bird in a cage where the magnetic field has been rotated while the sky is unchanged, and watch which way it goes. The direction it picks tells you which cue it gave the bigger share to, and how that share shifts with age, season, and how clear the sky has lately been.\n\n**A rule that needs numbers fed into it is only as good as those numbers. Splitting the vote by guesswork can be worse than not splitting it at all.**",
            options: [
                { id: 'retry', label: "Wrong weights are worse than no weights.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Split the vote by searching for the lowest combined error, and the best split turns out to fall in proportion to one over the error squared -- but only if you know which cue is which, and getting it backwards is worse than not splitting at all.**\n\nThat closes Big Idea 16. All three Level 3 lessons removed something Level 2 had quietly accepted:\n\n- **L3P16** -- the field was not given after all. **B = μ₀nI** builds one: 2,000 turns per metre at 2 A gives 5.03 mT, a hundred Earths, and an MRI's 1.5 T would need **597 A**, which is why the real limit is heat rather than the formula\n- **L3C16** -- domains are not merely aligned or not. A **hysteresis loop** gives **remanence** and **coercivity**, from soft iron's 80 A/m to neodymium's 900,000, and its **area is the heat paid per cycle** -- which is why a 50 Hz core must be soft and a fridge magnet must be hard\n- **L3B16** -- cues are not equally good. Searching the splits turns ±5° and ±20° into **±4.85°** instead of ±10.31°, and the winning split is **16 to 1**\n\n**How do magnets help us navigate and build machines? Because a magnetic field is a direction you can make, keep and measure -- and all six lessons in this Big Idea are about one of those three: how much field you can make, how well a material can keep it, and how far to trust the direction you measure.**\n\n**What is still standing in this lesson:** splitting the vote does nothing about **bias**, exactly as averaging did nothing in L2B16 -- a compass beside a steel girder is wrong in the same direction however carefully you divide the say. The **split must be known**, and nothing here says how an animal learns it. And the search found that 1 / error² works without **proving** it is the best possible rule, which needs more statistics than this level carries.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One over the square!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You weighted the evidence.**\n\n- A blend of two cues has **combined error = √( (share₁ x error₁)² + (share₂ x error₂)² )**, because errors add through their **squares**\n- Split the vote evenly and this collapses to L2B16's rule: two ±10° cues give **7.07° = 10/√2**\n- Searching the splits for ±5° and ±20° finds a **lowest point at about 94%**, giving **±4.85°**\n- Neither end is best: 50% gives ±10.31°, and 100% -- ignoring the vague cue -- gives ±5.00°\n- That best split is **16 to 1**, and **(20/5)² = 16**: the vote divides in proportion to **1 / error²**\n- So a cue twice as sharp earns **four** times the say, not twice\n- Over 1,000 km: **85 km** for the best split, 87 km ignoring the vague cue, **182 km** splitting evenly\n- ±8° and ±30° give a **14 to 1** split and **±7.73°**, against 15.52° for an even one\n- **Reversing** the split gives **±18.83°** and a 341 km miss -- worse than not splitting at all\n- Which is what **cue-conflict experiments** test: rotate the magnetic field, see which cue the bird follows\n- Removed: L2B16's equal split\n- Still standing: it cancels no **bias**, the split must be **known**, and *proving* 1 / error² is the best possible split needs statistics beyond this level",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Sharper cues get more vote!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Trusting the Sharper Cue**\n\nL2B16 counted the cues. Level 3 works out how much each one is worth -- by searching for the best split rather than being handed a formula.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Blending two cues | **√((s₁e₁)² + (s₂e₂)²)** | Errors add through their squares |\n| An even split | two ±10° give 7.07° | L2B16's rule, as a special case |\n| Searching the splits | 50% → 94% → 100% | ±10.31°, **±4.85°**, ±5.00° |\n| The lowest point | neither end wins | A vague cue still earns about 6% |\n| What 94 to 6 is | **(20/5)² = 16 to 1** | The vote goes as **1 / error²** |\n| Twice as sharp | four times the say | Sharpness pays quadratically |\n| Over 1,000 km | tan of each | **85**, 87 and **182 km** |\n| ±8° and ±30° | (30/8)² = 14 to 1 | **±7.73°** against 15.52° |\n| Reversed split | ±18.83°, 341 km | Worse than no split at all |\n| Tested by | cue-conflict experiments | Rotate the field, watch the bird |\n| Removed | the equal split | The search decides the vote |\n| Still standing | bias, and knowing the split | Where biology outruns arithmetic |\n\n**The one line to remember:** you did not have to be told how to divide the vote — you found the lowest point by trying splits, and it turned out to fall in proportion to one over the error squared.\n\n**Big Idea 16 is complete at Level 3.**"
        }
    };
}
