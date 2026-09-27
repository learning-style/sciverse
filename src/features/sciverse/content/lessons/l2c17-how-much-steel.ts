import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 17, chemistry.
 *
 * C17 said concrete handles squeezing and steel handles stretching, so engineers
 * combine them. It never said by how much, which left concrete sounding simply
 * strong. It is not: about 30 N/mm2 squeezed and only about 3 N/mm2 stretched,
 * a tenth. Steel carries about 400 N/mm2 stretched, which is 133 times concrete.
 *
 *   steel needed = tension force / steel strength
 *
 * Worked on 120 kN of tension: 300 mm2 of steel, which is four 10 mm bars at
 * 78.5 mm2 each. The checkpoint asks for the same 120 kN in concrete alone:
 * 40,000 mm2 of it, 133 times the steel, which is why nobody builds that way.
 *
 * Still standing: the concrete must grip the steel, and the tension is given
 * rather than worked out from the load.
 */
export function getL2C17Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "C17 gave you the partnership: **concrete** takes the **squeezing**, **steel** takes the **stretching**, and together they make a beam that survives both.\n\nTrue, and it left concrete sounding simply strong. It is not. Concrete is strong one way and remarkably weak the other, and until you have the two numbers you cannot design anything.\n\nThe two dials under the picture are the **tension force**, the stretching pull along the bottom of a beam in **kilonewtons (kN)**, and the **bar diameter**, the thickness of the steel bars in **millimetres (mm)** you choose to carry it.\n\nA beam has **120 kN** of stretching pull along its underside. How much steel does that need -- and could you skip the steel and simply use more concrete?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Steel must be far stronger in stretching, so a small amount of it replaces a great deal of concrete. I need both numbers to say how much.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "More concrete would do. Concrete is a strong material, so a thicker beam should handle the stretching on its own.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It is the natural thought, and the numbers are brutal about it.\n\nConcrete is strong **one way only**. Squeeze it and it takes about **30 N/mm²** -- newtons per square millimetre, the unit L2P17 used. Stretch the same concrete and it gives way at about **3 N/mm²**.\n\n**A tenth.** Concrete is ten times weaker at being pulled than at being pressed.\n\nYou can feel why. Concrete is stone chippings glued together by cement. Press it and the chippings jam against each other and carry the load. Pull it and everything depends on the glue between them -- and glue is not what stone is good at.\n\nSteel does not have that problem. A steel bar carries about **400 N/mm²** of pull. So in stretching, steel beats concrete by 400 / 3, which is about **133 times**.\n\nThat is why the bars are there, and why making the beam thicker is not the answer.",
            options: [
                { id: 'cont', label: "So how much steel does 120 kN need?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Turn L2P17's formula around. There, stress was force divided by area. Here you know the stress the steel may safely carry, and you want the area:\n\n**steel needed = tension force / steel strength**\n\n- **tension force** in **newtons (N)**, so a **kilonewton (kN)** is a thousand of them\n- **steel strength** is about **400 N/mm²** for ordinary reinforcing bar\n- **steel needed** comes out as an **area**, in **square millimetres (mm²)**\n\nThen you have to buy that area in actual bars, and bars come in whole sizes. A round bar's area is:\n\n**bar area = π x (diameter / 2)²**\n\nSo a **10 mm** bar gives π x 5² = **78.5 mm²**, and a **12 mm** bar gives π x 6² = **113.1 mm²**. Notice that going from 10 mm to 12 mm -- only a fifth thicker -- buys you **44% more steel**, because area goes as the diameter squared.\n\nThe conditions, and there are two.\n\n1. **The concrete must grip the steel.** A bar that slips inside the concrete carries nothing, however strong it is. Reinforcing bars are ribbed for exactly this reason.\n2. **The steel goes where the stretching is.** In a beam loaded from above that is the **bottom**. Steel laid along the top of such a beam is expensive decoration.",
            options: [
                { id: 'cont', label: "Work out the 120 kN beam.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**The beam with 120 kN of stretching pull.**\n\n**Step 1.** the force in newtons: 120 kN = **120,000 N**\n\n**Step 2.** steel needed = 120,000 / 400 = **300 mm²**\n\n**Step 3.** now buy it in bars. A 10 mm bar is 78.5 mm², so 300 / 78.5 = 3.8 bars -- and you cannot buy 3.8 bars.\n\n**Step 4.** round **up**: **4 bars of 10 mm**, giving 4 x 78.5 = **314 mm²**. Rounding down would leave the beam short of steel.\n\n**The same 300 mm², bought differently:**\n\n| Bar | Area each | Bars needed | Steel you get |\n| --- | --- | --- | --- |\n| 8 mm | 50.3 mm² | 6 | 302 mm² |\n| 10 mm | 78.5 mm² | **4** | **314 mm²** |\n| 12 mm | 113.1 mm² | 3 | 339 mm² |\n| 16 mm | 201.1 mm² | 2 | 402 mm² |\n\nEvery row works. The 8 mm bars waste almost nothing but mean six bars to place and tie; the 16 mm pair is quick to lay but carries a third more steel than the beam needs. **Thicker bars are simpler to build and wasteful; thinner bars fit the sum and take longer.** That trade is a real decision on a real site.",
            options: [
                { id: 'try', label: "Let me try one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A bigger beam carries **200 kN** of stretching pull, and the builder has only **12 mm** bars.\n\nHow many bars are needed? (Steel carries 400 N/mm², and a 12 mm bar is 113.1 mm².)",
            options: [
                { id: 'right', label: "5 bars. 200,000 / 400 = 500 mm² of steel, and 500 / 113.1 = 4.4, which rounds up to 5 bars giving 565 mm².", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'rounded_down', label: "4 bars. 500 / 113.1 = 4.4, which rounds to 4 bars giving 452 mm².", nextNodeId: 'math_wrong' },
                { id: 'used_diameter', label: "42 bars. 500 / 12 = 41.7, so 42 bars of 12 mm.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**4 bars** rounded the wrong way. 4 bars of 12 mm give 4 x 113.1 = **452 mm²**, and the beam needs **500 mm²**. That beam is 48 mm² short of steel, and the shortfall does not politely wait -- the bars stretch further than they should and the concrete above them cracks. **With steel you always round up.**\n\n**42 bars** divided by the **diameter** instead of the **area**. 12 is a length in millimetres; 113.1 is an area in square millimetres. The two are not interchangeable, and the answer came out eight times too large.\n\n**Step 1.** steel needed = 200,000 / 400 = **500 mm²**\n\n**Step 2.** one 12 mm bar = π x 6² = **113.1 mm²**\n\n**Step 3.** 500 / 113.1 = **4.4 bars**\n\n**Step 4.** round up: **5 bars**, giving 5 x 113.1 = **565 mm²**\n\nThe beam gets 65 mm² more steel than the sum demanded, and that spare is the price of bars coming in whole numbers.",
            options: [
                { id: 'retry', label: "Divide by the area, and round up.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Tension Force** sets the stretching pull along the bottom of the beam, from **40 kN** to **300 kN**. **Bar Diameter** sets the thickness of bar you have, from **8 mm** to **20 mm**.\n\nThe lab draws the beam with its bars in place, and works out both the steel the sum asks for and the steel the bars actually give.\n\nTry this:\n\n- **120 kN** with **10 mm** bars: 300 mm² needed, **4 bars**, 314 mm² supplied\n- Keep 120 kN and slide up to **16 mm** bars: only **2 bars**, but 402 mm² -- a third more steel than needed\n- Keep 120 kN and slide down to **8 mm**: **6 bars** and 302 mm², almost exactly the sum\n- Raise the force to **300 kN**: the steel needed climbs in a **straight line** to 750 mm²\n- Watch the bar count jump in steps while the need climbs smoothly. That is rounding up, and it is why the supplied steel zig-zags above the line",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Steel comes in whole bars. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A client dislikes steel and asks for the 120 kN beam in **concrete alone** -- no bars, just a thicker beam.\n\nConcrete gives way at about **3 N/mm²** when stretched.\n\nHow much concrete would have to be doing the stretching work, and what does that tell you?",
            options: [
                { id: 'right', label: "40,000 mm², because 120,000 / 3 = 40,000. That is 133 times the 300 mm² of steel, so the beam would have to be absurdly deep -- which is why reinforced concrete exists.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "About ten times the steel, 3,000 mm², because concrete is ten times weaker than steel.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The **ten times** is a real number in this lesson, but it is the wrong comparison. Ten is how much weaker concrete is **than itself** -- 30 N/mm² squeezed against 3 N/mm² stretched.\n\nAgainst **steel** the gap is far wider:\n\n**Step 1.** steel: 120,000 / 400 = **300 mm²**\n\n**Step 2.** concrete: 120,000 / 3 = **40,000 mm²**\n\n**Step 3.** the ratio: 40,000 / 300 = **133 times**\n\n| Doing the stretching | Strength | Area needed |\n| --- | --- | --- |\n| Steel bars | 400 N/mm² | **300 mm²** |\n| Concrete alone | 3 N/mm² | **40,000 mm²** |\n\nFor a beam 200 mm wide, 40,000 mm² of stretching concrete means 200 mm of depth doing nothing but being pulled -- on top of the depth already carrying the squeezing. The beam becomes enormous, and every extra millimetre of concrete is more weight for it to carry, which needs more depth again.\n\n**Two numbers, not one.** Concrete against itself is ten times. Concrete against steel, in stretching, is a hundred and thirty-three.",
            options: [
                { id: 'retry', label: "133 times, not ten.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A few hundred square millimetres of steel do the work of forty thousand square millimetres of concrete, because in stretching steel is 133 times the stronger.**\n\nThat is the number C17 was missing. C17 could tell you the two materials divide the work. Now you can say how unequally they are matched, and therefore how little steel it takes.\n\nIt also explains something you can see. Look at a cracked concrete step or kerb: the crack almost always starts on the face that was being **pulled**, never the face being pressed. Concrete announces its weak direction by where it fails.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Steel where it stretches, concrete where it squeezes!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You sized the steel.**\n\n- Concrete takes about **30 N/mm²** squeezed but only about **3 N/mm²** stretched -- **a tenth**\n- Steel carries about **400 N/mm²** stretched, which is **133 times** concrete\n- **steel needed = tension force / steel strength**\n- 120 kN of pull needs 120,000 / 400 = **300 mm²** of steel\n- **bar area = π x (diameter / 2)²**, so a 10 mm bar is **78.5 mm²**\n- 300 mm² is **4 bars of 10 mm** -- always round **up**, never down\n- The same 300 mm² is 6 bars of 8 mm, 3 of 12 mm, or 2 of 16 mm\n- Thicker bars are quicker to lay and waste steel; thinner bars fit the sum and take longer\n- Going 10 mm to 12 mm is a fifth thicker but **44% more steel**, because area goes as diameter squared\n- The same 120 kN in concrete alone would need **40,000 mm²**\n- Removed: C17's silence about how unequal the two materials are\n- Still standing: the concrete must **grip** the steel, and the tension is given rather than worked out",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "A little steel replaces a lot of concrete!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Much Steel Does It Need?**\n\nC17 told you the two materials share the work. Level 2 tells you how lopsided the share is.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Concrete squeezed | about 30 N/mm² | Its strong direction |\n| Concrete stretched | about **3 N/mm²** | A tenth of that |\n| Steel stretched | about **400 N/mm²** | **133 times** concrete |\n| Steel needed | **tension / 400** | 120 kN gives 300 mm² |\n| Bar area | **π x (d/2)²** | A 10 mm bar is 78.5 mm² |\n| Buying it | round **up** | 4 bars of 10 mm = 314 mm² |\n| Bar choice | 6 thin or 2 thick | Waste against labour |\n| Concrete alone | 120,000 / 3 | **40,000 mm²** -- absurd |\n\n**The one line to remember:** concrete is ten times weaker at being pulled than pressed, and steel is over a hundred times better at it, so you put a little steel exactly where the pulling happens.\n\n**Up next:** B17 -- a bone is hollow, and that is not about saving weight."
        }
    };
}
