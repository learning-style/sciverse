import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 10, biology. The synthesis lesson.
 *
 * L2B10 let 100 counted plants stand for the whole place. This removes that
 * simplification: the species found depend on the area counted, S = c x A^z.
 * Comparing areas of one habitat, S after / S before = (A after / A before)^z.
 * Worked by hand with z = 0.25, taking the square root twice: clearing half a
 * 400-species forest loses about 16% of its species; clearing 90% loses about
 * 44%. The checkpoint rearranges: keeping 90% of species needs 0.9^4 = 66% of
 * the area.
 *
 * Condition stated: the curve is measured forwards and used backwards, assuming
 * the lost habitat is typical. Still standing: extinction debt, and z varies.
 */
export function getL3B10Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B10 counted 100 plants in one patch, and named what it held fixed: **the patch stood for the whole place**.\n\nEcologists who count bigger and bigger areas find that new species keep turning up -- but more and more slowly.\n\nA forest holds **400 species** of plants. A plan would clear **half** of the forest.\n\nDoes the forest lose **half** of its species?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "No -- far fewer than half. Most species live all over the forest, so the half that is left still holds most of them. Only the species found just in the cleared half disappear.", nextNodeId: 'species_area', sentiment: 'positive' },
                { id: 'bad', label: "Yes. Half the forest means half the species.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Half the forest, half the species, would be true if every species lived in just one small corner of it. Most do not. Most species are spread across many parts of the forest.\n\nThink of a big library with several copies of most books, and only one copy of a few rare ones, spread over all its shelves. Close half the shelves. You lose every copy of some of the rare books -- but most titles still have a copy somewhere on the shelves that are left.\n\nSpecies behave like titles. Clearing habitat removes plants of almost every species, but it removes **whole species** far more slowly.\n\nThere is a pattern to how slowly, and it can be written down.",
            options: [
                { id: 'cont', label: "What is the pattern?", nextNodeId: 'species_area' }
            ]
        },
        species_area: {
            id: 'species_area',
            speaker: 'AI',
            content: "Count the species in areas of different sizes, and a pattern appears. It is called the **species-area relationship**:\n\n**S = c x A^z**\n\n- **S** is the number of species found\n- **A** is the area counted, in km²\n- **c** is a constant for that place and the kind of living thing counted\n- **z** is a small power, usually between about **0.15** and **0.35**. This lesson uses **z = 0.25**\n\nWith z = 0.25, A^z is the **fourth root** of A: the number that, multiplied by itself four times, makes A. By hand, take the **square root twice**. For example, the fourth root of 16 is √16 = 4, then √4 = **2** -- and 2 x 2 x 2 x 2 = 16.\n\nTo compare the same habitat before and after it shrinks, divide one version of the formula by the other. The constant c cancels:\n\n**S after / S before = (A after / A before)^z**\n\nThe frame of reference: **before** and **after** are the same habitat, counted the same way.\n\nThe condition belongs here. **The curve was measured by counting larger and larger areas. Using it backwards, to predict what clearing will cost, is an estimate** -- it assumes the habitat that is lost is typical of the rest.",
            options: [
                { id: 'cont', label: "Work out the forest by hand.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "The **400-species** forest, with **z = 0.25**.\n\n**Half cleared:** A after / A before = **0.5**\n\n**Step 1.** √0.5 = 0.707\n\n**Step 2.** √0.707 = **0.841**\n\n**Step 3.** species left = 400 x 0.841 = **336**: 64 species lost, about **16%**\n\n**90% cleared:** A after / A before = **0.1**\n\n**Step 1.** √0.1 = 0.316\n\n**Step 2.** √0.316 = **0.562**\n\n**Step 3.** species left = 400 x 0.562 = **225**: 175 species lost, about **44%**\n\n| Forest left | (A after / A before)^0.25 | Species left | Species lost |\n| --- | --- | --- | --- |\n| 100% | 1 | 400 | none |\n| 50% | 0.841 | 336 | **16%** |\n| 10% | 0.562 | 225 | **44%** |\n\nThe first half of the forest cost 16% of the species. The next 40% of the forest cost another 28%. **The last pieces of a habitat hold the most species for their size.** A rule of thumb follows: **lose 90% of a habitat, and lose about half its species**.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** The same 400-species forest is cut down to **a quarter** of its area. With **z = 0.25**, about how many species remain?",
            options: [
                { id: 'right', label: "About 283. √0.25 = 0.5, then √0.5 = 0.707, and 400 x 0.707 = 283.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'in_step', label: "100, because a quarter of 400 is 100.", nextNodeId: 'math_wrong' },
                { id: 'one_root', label: "200, because √0.25 = 0.5, and 400 x 0.5 = 200.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**100** made the species fall **in step** with the area -- the idea the library showed was wrong, because most species live in many parts of the forest.\n\n**200** took the square root only **once**. That is the power 0.5, not 0.25. The fourth root needs the square root taken **twice**.\n\n**Step 1.** √0.25 = **0.5**\n\n**Step 2.** √0.5 = **0.707**\n\n**Step 3.** species left = 400 x 0.707 = **283**\n\nCheck: 0.707 x 0.707 x 0.707 x 0.707 = 0.25. ✓",
            options: [
                { id: 'retry', label: "Square root, twice.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, for a forest that starts at **10,000 km²** with **400 species**.\n\n**Forest Area** is the area left, in km². **Power z** is the power in S = c x A^z.\n\nThe lab draws the forest shrinking, plots the species-area curve, and works out the species left.\n\nTry this:\n\n- Set **5,000 km²** with z = **0.25**: 336 species\n- Set **1,000 km²**: 225 species\n- Raise **Power z** to **0.35**, the kind of value found for islands and patches cut off from other habitat. The same clearing now costs more species",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Species fall slowly, then fast. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A conservation group wants to keep **90%** of the forest's species. With **z = 0.25**, what share of the forest's area must it keep?",
            options: [
                { id: 'right', label: "About 66%. Rearranged, A after / A before = (S after / S before)^(1/z) = 0.9⁴. By hand: 0.9 x 0.9 = 0.81, and 0.81 x 0.81 = 0.66.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "90% of the area, to keep 90% of the species.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Test 90% of the area first: 0.9^0.25 = **0.974**. That keeps **97%** of the species -- more than the 90% asked for. Species do not fall in step with area.\n\nRearrange instead. Start from S after / S before = (A after / A before)^0.25, and raise both sides to the power 4:\n\n**A after / A before = (S after / S before)⁴ = 0.9⁴**\n\n**Step 1.** 0.9 x 0.9 = **0.81**\n\n**Step 2.** 0.81 x 0.81 = **0.656**\n\n**Check:** √0.656 = 0.81, and √0.81 = 0.9. ✓\n\nKeeping about **66%** of the forest keeps 90% of its species -- by this estimate.",
            options: [
                { id: 'retry', label: "Rearrange: raise to the power 4.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Species fall far more slowly than area at first, and far faster near the end.** To keep 90% of the species, keep about two thirds of the forest.\n\nHere is the simplification this lesson removed. **L2B10 let one counted patch stand for the whole place.** The number of species depends on how much area is counted: **S = c x A^z**.\n\nThat completes Big Idea 10 at Level 3. In every lesson, the answer did **not** grow in step with the question:\n\n- **L3P10** -- **power in the wind = ½ x ρ x A x v³**: 20% more wind speed gives 73% more power\n- **L3C10** -- **1 ppm = 7.8 billion tonnes of CO₂**: only about half of what is released stays in the air\n- **L3B10** -- **S = c x A^z**: clear 90% of a habitat, and lose about half its species\n\n**How do we protect our planet?** Wind that is a little faster gives far more clean power. The oceans and forests take up half our CO₂ -- the ocean at a cost, and only while the forests stand. And the last pieces of a habitat hold the most species for their size.\n\nAnd the simplification still standing. **The species still found in the smaller forest were counted as saved.** Many survive there only as small populations, which can dwindle and vanish over decades. Ecologists call the losses still to come an **extinction debt**. Some scientists argue that the species-area curve overestimates the losses that happen at first; the debt means more follow later. And z is not the same in every place.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The last pieces matter most!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found how many species a shrinking habitat keeps.**\n\n- Count bigger areas and new species keep turning up, more and more slowly\n- **Species-area relationship: S = c x A^z**, with z usually about 0.15 to 0.35\n- Same habitat before and after: **S after / S before = (A after / A before)^z**\n- With z = 0.25, take the **square root twice**\n- Condition: a curve measured forwards, used backwards, assuming the lost habitat is typical\n- Half cleared: 0.5^0.25 = **0.841**, so 336 of 400 species remain: **16%** lost\n- 90% cleared: 0.1^0.25 = **0.562**, so 225 remain: **44%** lost\n- A quarter left: 0.25^0.25 = **0.707**, so about **283** remain\n- To keep 90% of species: 0.9⁴ = **0.66** of the area\n- The last pieces of a habitat hold the most species for their size\n- Still standing: **extinction debt**, and z varies from place to place",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Square root, twice!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Much Habitat, How Many Species?**\n\nL2B10 counted one patch. Level 3 finds how the species depend on the area.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Species-area relationship | **S = c x A^z** | More area, more species, more slowly |\n| Before and after | **(A after / A before)^z** | c cancels |\n| z = 0.25 | square root twice | The fourth root |\n| Half cleared | 0.841 | **16%** of species lost |\n| 90% cleared | 0.562 | **44%** lost, about half |\n| A quarter left | 400 x 0.707 | About **283** species |\n| Keep 90% of species | 0.9⁴ = **0.66** | Keep two thirds of the area |\n| Still standing | extinction debt | More losses follow later |\n| Big Idea 10 at Level 3 | v³, half stays, A^z | Nothing grows in step |\n\n**The one line to remember:** species fall far more slowly than habitat at first and far faster at the end -- so the last pieces of a habitat matter most.\n\n**Big Idea 10 is complete at Level 3.**"
        }
    };
}
