import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 16, biology. Closes the Big Idea.
 *
 * Removes L2B16's simplification that every cue is trusted equally. Weight each
 * by how reliable it is:
 *
 *   weight = 1 / error^2,  combined error = 1 / sqrt(sum of weights)
 *
 * Two cues of +-5 and +-20 degrees give +-4.85 when weighted, against +-10.31
 * when averaged blindly -- and +-4.85 is better than the sharp cue alone at
 * +-5.00, so the vague cue still earns a place. With equal errors the rule
 * collapses back to L2B16's error / sqrt(n).
 *
 * Still standing: weighting cancels no bias, and the weights have to be known.
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
            content: "Each cue gets a **weight**, and the weight is not the error but the **inverse of its square**:\n\n**weight = 1 / error²**\n\nA cue twice as sharp carries **four** times the weight. That is the whole idea: reliability counts quadratically, so a slightly better cue matters much more than it looks.\n\nThen the combined error comes from the total weight:\n\n**combined error = 1 / √(sum of the weights)**\n\nWork one through in words. A ±5° cue has weight 1/25 = 0.04. A ±20° cue has weight 1/400 = 0.0025. The sharp one carries **sixteen times** the vague one's vote, which is why the vague cue changes the answer only slightly.\n\nAnd a reassuring check: when the cues are equally good this must reduce to L2B16's rule, and it does. Two cues of ±10° each have weight 0.01, summing to 0.02, so the combined error is 1/√0.02 = **7.07°** -- exactly 10/√2. The old rule was this rule, in the special case where all the weights happened to match.\n\nThe conditions, and there are three now.\n\n**The cues must be independent**, as before. **The cues must be unbiased**, as before -- and this is worth repeating, because clever weighting does nothing whatever to a bias. And a new one: **the bird must know how reliable each cue is.** The weights come from somewhere, and if they are wrong the arithmetic faithfully produces a worse answer.",
            options: [
                { id: 'cont', label: "Put the two senses through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The star sense at ±5° and the magnetic sense at ±20°.**\n\n**Step 1.** weights: 1/5² = 1/25 = **0.0400** and 1/20² = 1/400 = **0.0025**\n\n**Step 2.** sum of weights = **0.0425**\n\n**Step 3.** combined error = 1/√0.0425 = 1/0.2062 = **4.85°**\n\n**Against the alternatives.** Equal weighting, L2B16 style, would give √((25 + 400)/4) = √106.25 = **10.31°**. The sharp cue alone gives **5.00°**.\n\nNow turn all three into distance with the tangent L2P16 and L2B16 both used, over a **1,000 km** flight:\n\n| What the bird does | Error | Miss after 1,000 km |\n| --- | --- | --- |\n| Averages both equally | ±10.31° | **182 km** |\n| Uses the sharp cue alone | ±5.00° | 87 km |\n| **Weights them properly** | **±4.85°** | **85 km** |\n\nThe blind average costs **97 km** against the weighted answer -- and it is worse than ignoring the vague cue altogether. Proper weighting buys only 2 km over the sharp cue alone, but it never loses, and when the two cues are closer in quality the gain grows quickly.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A bird has one cue good to **±8°** and another good only to **±30°**.\n\nWhat is its combined error if it weights them properly?",
            options: [
                { id: 'right', label: "About ±7.73°. The weights are 1/64 = 0.01563 and 1/900 = 0.00111, summing to 0.01674, and 1/√0.01674 = 7.73.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'equal', label: "About ±15.52°, from √((64 + 900) / 4).", nextNodeId: 'math_wrong' },
                { id: 'mean', label: "±19°, the average of 8 and 30.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**±15.52°** is the answer for **equal** weighting -- the very thing this lesson replaces. Notice how bad it is: worse than the ±8° cue on its own, which is what an equal vote does when the cues are badly matched.\n\n**±19°** averaged the errors themselves. Errors never average like that; they combine through their squares, which is why a ±30° cue barely moves an answer built around a ±8° one.\n\n**Step 1.** weights: 1/8² = **0.01563**, 1/30² = **0.00111**\n\n**Step 2.** sum = **0.01674**\n\n**Step 3.** combined = 1/√0.01674 = **7.73°**\n\nThe sharp cue carries 900/64 = **14 times** the vague one's weight. So the answer sits very close to 8°, nudged down to 7.73° -- a small gain, honestly earned, and far better than the 15.52° that treating them as equals would have produced.",
            options: [
                { id: 'retry', label: "Weights are one over the square.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Sharp Cue Error** sets the better cue, from ±2° to ±15°. **Vague Cue Error** sets the worse one, from ±10° to ±40°.\n\nThe lab shows both cues, the properly weighted answer and the equally weighted one side by side, and the miss each would produce over 1,000 km.\n\nTry this:\n\n- **±5°** and **±20°**: weighted **±4.85°**, equal **±10.31°**, sharp alone ±5.00°\n- Bring the vague cue in to **±10°**: the two answers close up, because the cues are becoming comparable\n- Set both dials to the **same** value and the two answers meet exactly -- L2B16's rule is this one's special case\n- Push the vague cue out to **±40°**: the weighted answer barely stirs from the sharp cue's value, while the equal-weight answer falls apart\n- Watch the weights: at ±5° and ±20° the sharp cue holds **sixteen times** the vote",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "One over the square, and the sharp cue dominates. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** The weights have to come from somewhere: a bird must learn which of its senses to trust, presumably from experience.\n\nSuppose a young bird gets it backwards. Its star sense really is ±5° and its magnetic sense ±20°, but it has learned the opposite, so it gives the **magnetic** cue sixteen times the vote.\n\nIs it still better off than a bird that simply averages the two equally?",
            options: [
                { id: 'right', label: "No -- it is worse. Weighting by wrong weights is worse than not weighting at all, because it actively pushes the answer towards the less reliable cue. Equal weighting at least treats an unknown situation neutrally.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Yes -- any weighting is better than none, since weighting is the mathematically correct procedure.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The procedure is only correct when it is fed correct weights. With the weights reversed it becomes a machine for amplifying the worse measurement.\n\nLine the three strategies up for a bird whose cues really are ±5° and ±20°:\n\n| Strategy | Combined error |\n| --- | --- |\n| Correct weights | **±4.85°** |\n| Equal weights | ±10.31° |\n| **Reversed weights** | **±18.83°** |\n\nReversing the weights is nearly twice as bad as not weighting at all, and almost four times worse than getting it right -- it lands close to the ±20° cue it has wrongly decided to trust. The bird has used a sophisticated method to arrive somewhere close to trusting its worst sense.\n\nWhich makes the learning of the weights a real biological problem, not a footnote -- and it is exactly what **cue-conflict experiments** probe. Put a migrating bird in a cage where the magnetic field has been rotated while the sky is unchanged, and watch which direction it chooses. The direction it picks tells you which cue it weighted more heavily, and how that weighting shifts with age, season, and how clear the sky has lately been.\n\n**A formula that needs parameters is only as good as the parameters. Weighting by guesses can be worse than not weighting at all.**",
            options: [
                { id: 'retry', label: "Wrong weights are worse than no weights.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Weight each cue by one over the square of its error and the combined error is one over the root of the total weight -- but only if the weights are right, and getting them backwards is worse than not weighting at all.**\n\nThat closes Big Idea 16. All three Level 3 lessons removed something Level 2 had quietly accepted:\n\n- **L3P16** -- the field was not given after all. **B = μ₀nI** builds one: 2,000 turns per metre at 2 A gives 5.03 mT, a hundred Earths, and an MRI's 1.5 T would need **597 A**, which is why the real limit is heat rather than the formula\n- **L3C16** -- domains are not merely aligned or not. A **hysteresis loop** gives **remanence** and **coercivity**, from soft iron's 80 A/m to neodymium's 900,000, and its **area is the heat paid per cycle** -- which is why a 50 Hz core must be soft and a fridge magnet must be hard\n- **L3B16** -- cues are not equally good. **weight = 1/error²** turns ±5° and ±20° into ±4.85° instead of ±10.31°\n\n**How do magnets help us navigate and build machines? Because a magnetic field is a direction you can make, keep and measure -- and all six lessons in this Big Idea are about one of those three: how much field you can make, how well a material can keep it, and how far to trust the direction you measure.**\n\n**What is still standing in this lesson:** weighting does nothing about **bias**, exactly as averaging did nothing in L2B16 -- a compass beside a steel girder is wrong in the same direction however cleverly you weight it. And the **weights must be known**. Nothing here says how an animal learns them, which is where the biology outruns the arithmetic.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "One over the square!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You weighted the evidence.**\n\n- **weight = 1 / error²**, so a cue twice as sharp carries **four** times the vote\n- **combined error = 1 / √(sum of the weights)**\n- ±5° and ±20°: weights **0.0400** and **0.0025**, summing to 0.0425, giving **±4.85°**\n- Against **±10.31°** for equal weighting and **±5.00°** for the sharp cue alone\n- So a blind average is **twice as bad as ignoring the vague cue**, and proper weighting beats even the sharp cue alone\n- Over 1,000 km: **85 km** weighted, 87 km sharp-alone, **182 km** equally weighted\n- ±8° and ±30° give **±7.73°**, against 15.52° for equal weighting; the sharp cue holds **14 times** the vote\n- With equal errors it collapses to L2B16's rule: two ±10° cues give **7.07° = 10/√2**\n- **Reversed** weights give **±18.83°** -- worse than not weighting at all, and close to the vague cue alone\n- Which is what **cue-conflict experiments** test: rotate the magnetic field, see which cue the bird follows\n- Removed: L2B16's equal weighting\n- Still standing: weighting cancels no **bias**, and the weights must be **known**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Sharper cues get more vote!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Trusting the Sharper Cue**\n\nL2B16 counted the cues. Level 3 decides how much each is worth.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Weight of a cue | **1 / error²** | Twice as sharp, four times the vote |\n| Combining | **1 / √(Σ weights)** | The total weight sets the answer |\n| ±5° and ±20° | 0.0400 + 0.0025 | **±4.85°** |\n| Equal weighting | √((25+400)/4) | ±10.31°, twice as bad |\n| Sharp cue alone | — | ±5.00°, still beaten |\n| Over 1,000 km | tan of each | 85, 87 and **182 km** |\n| ±8° and ±30° | 14 times the vote | **±7.73°** against 15.52° |\n| Equal errors | two ±10° | 7.07° = 10/√2, L2B16's rule |\n| Reversed weights | ±18.83° | Worse than no weighting |\n| Tested by | cue-conflict experiments | Rotate the field, watch the bird |\n| Removed | equal weighting | Reliability decides the vote |\n| Still standing | bias, and knowing the weights | Where biology outruns arithmetic |\n\n**The one line to remember:** weight each cue by one over the square of its error and even a vague second opinion earns its keep — but weights are parameters, and wrong parameters make a sophisticated method worse than a naive one.\n\n**Big Idea 16 is complete at Level 3.**"
        }
    };
}
