import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 20, physics.
 *
 * P20 showed that a convex lens bends light to a focal point and that a shorter
 * focal length bends more strongly. It never gave a number for "strongly", and it
 * never said what happens when you put two lenses together -- which is what every
 * real optical instrument does, including the eye. This lesson does both:
 *
 *   power in dioptres = 1 / focal length in metres
 *
 * and, when lenses sit together, their powers simply add. Worked on a 25 cm lens:
 * 1 / 0.25 = 4 dioptres. The eye's cornea is about 43 D and its adjustable lens
 * about 20 D, which is why the eye totals about 63 D.
 *
 * Dioptres are the unit on a real spectacle prescription, which is what makes this
 * worth teaching rather than focal length alone: adding is easier than combining
 * reciprocals, and adding is what opticians actually do.
 *
 * Still standing: powers add only when the lenses are close together, and this
 * says nothing about *where* the image lands or how big it is.
 */
export function getL2P20Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "P20 told you that a short focal length bends light strongly and a long one bends it gently. True, and awkward to use.\n\nHere is the awkwardness. Which is the stronger lens: one with a focal length of 25 cm, or one with 20 cm? The 20 cm one -- but by how much? And if you hold both together, what do you get? Not 45 cm of anything. Not 22.5 cm either. Focal length is the wrong number for that job, because **a stronger lens has a smaller focal length**, and quantities that run backwards are miserable to combine.\n\nSo opticians use a different number, and it is the one printed on every spectacle prescription.\n\nYour two dials are a lens and a second lens to hold against it.\n\n- **Focal Length** is the distance from the lens to the point where it brings distant light together, in centimetres.\n- **Second Lens Power** is a second lens held against the first, measured in the unit this lesson is about, **dioptres**.\n\nWhat number would make a strong lens a **big** number instead of a small one?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Turn it upside down -- divide 1 by the focal length, so a short focal length gives a big number.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Just subtract the focal length from some fixed distance, so shorter gives bigger.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Subtracting would put the numbers in the right order, and it would break as soon as you tried to use it.\n\nSubtract from what? Whatever number you pick is arbitrary, and worse, it has no meaning. Pick 100 cm and a 25 cm lens scores 75 while a 20 cm lens scores 80. Is the second lens 80/75 as strong? No -- and there is no calculation you can do with 75 and 80 that tells you anything true about light.\n\nThe test of a good quantity is not whether the numbers run the right way. It is **whether you can do arithmetic with them**.\n\nSo ask what a lens physically does. Light arriving straight at a lens is sent on a new course, and where a lens sends it depends on the lens's shape and material. That bending is the same whatever you put the lens in front of, and rays that were parallel now meet at a point. Two lenses together bend light twice, one after the other -- so the sensible quantity is one where **putting two lenses together means adding their numbers**.\n\nTurning the focal length upside down does exactly that. It is not a trick to make the numbers look nicer; it is the quantity that adds.",
            options: [
                { id: 'cont', label: "So what is that quantity called?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**Power**, and its unit is the **dioptre**:\n\n**power in dioptres = 1 / focal length in metres**\n\nThe unit matters. The focal length goes in **metres**, not centimetres, so a 25 cm lens is 0.25 m and 1 / 0.25 = **4 dioptres**. Get that wrong and every answer is out by a factor of a hundred.\n\nThe pay-off is the rule that makes dioptres worth having:\n\n**when lenses sit together, their powers add**\n\nA 2 D lens against a 3 D lens behaves as a single 5 D lens. Try that with focal lengths -- 50 cm and 33 cm somehow giving 20 cm -- and you will see why nobody does the sums that way.\n\nThree things to hold on to:\n\n- **Bigger power means a stronger lens**, which is the sensible direction. 10 D is strong, 0.5 D is weak.\n- **Power can be negative.** A lens that spreads light apart instead of bringing it together gets a minus sign, and the adding still works: +3 D against -1 D gives +2 D. That is exactly how a corrective lens undoes an eye's error.\n- **The condition:** powers add when the lenses are close together. Push them apart and the sum drifts, which is why a camera's lenses sit in a stack and not scattered down a tube.",
            options: [
                { id: 'cont', label: "Put some lenses through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A lens with a focal length of 25 cm.**\n\n1. **In metres:** 25 cm = 0.25 m\n2. **Power:** 1 / 0.25 = **4 dioptres**\n3. **Check it backwards:** a 4 D lens has a focal length of 1 / 4 = 0.25 m, which is the 25 cm we started with\n\nThat backwards check is worth doing every time, because the division is the only place this can go wrong.\n\n**Now hold a 3 D lens against it.**\n\n1. **Add the powers:** 4 + 3 = **7 dioptres**\n2. **Focal length of the pair:** 1 / 7 = 0.143 m = **14.3 cm**\n\nSo two fairly gentle lenses together make a distinctly strong one, and the arithmetic took one addition.\n\n**And now the reason this is the right unit.** Your own eye is exactly this sum. The **cornea** -- the clear curved front of your eye -- does most of the bending, at about **43 D**. The adjustable **lens** behind it adds about **20 D**. Together:\n\n43 + 20 = **63 dioptres**\n\nwhich is a focal length of 1 / 63 = 0.016 m, about **16 mm** -- and that is roughly the distance from the front of your eye to the back of it. Your eye is built so that its total power focuses light exactly on the screen at the back.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A lens has a focal length of **50 cm**, and you hold a **+1.5 D** lens against it.\n\nWhat is the power of the pair?",
            options: [
                { id: 'right', label: "3.5 D. 50 cm is 0.5 m, so 1 / 0.5 = 2 D, and 2 + 1.5 = 3.5 D.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_cm', label: "1.52 D. 1 / 50 = 0.02 D, plus 1.5 = 1.52 D.", nextNodeId: 'math_wrong' },
                { id: 'multiplied', label: "3 D, from 2 x 1.5.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**1.52 D** used centimetres where the formula wants metres, and it is the mistake this unit invites. 1 / 50 is not a power of anything -- dividing 1 by a number of centimetres gives an answer per centimetre, and dioptres are per **metre**. Sanity-check the size: 0.02 D would be a lens so weak you could not tell it from a flat sheet of glass, and a 50 cm focal length is a perfectly ordinary magnifying glass.\n\n**Multiplying** is the other trap. Powers **add**, and that is the entire reason for using them. Multiplying would mean a lens held against a flat sheet of glass -- power zero -- gave you zero, which would make every lens useless the moment you put a window in front of it.\n\n**50 cm = 0.5 m, so 1 / 0.5 = 2 D. Then 2 + 1.5 = 3.5 D.** And the pair's focal length is 1 / 3.5 = 0.286 m, about 29 cm.",
            options: [
                { id: 'retry', label: "Metres, and add rather than multiply.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Focal Length** in centimetres, and **Second Lens Power** in dioptres held against it.\n\n| Focal length | Its power | Plus a second lens | Together | Combined focal length |\n| --- | --- | --- | --- | --- |\n| 100 cm | 1 D | +1 D | **2 D** | 50 cm |\n| 50 cm | 2 D | +3 D | **5 D** | 20 cm |\n| 25 cm | 4 D | +3 D | **7 D** | 14 cm |\n| 10 cm | 10 D | 0 D | **10 D** | 10 cm |\n| 20 cm | 5 D | -2 D | **3 D** | 33 cm |\n\nLook at the last row. A negative lens **subtracts**, so holding a -2 D lens against a 5 D lens gives a weaker pair with a longer focal length. Nothing special had to be added to the rule -- the minus sign does the work.\n\nAnd look at the relationship between the two halves of each row. Doubling the power always halves the focal length, because one is 1 divided by the other. 1 D is a metre, 2 D is half a metre, 4 D is a quarter. **Every doubling of power halves the reach.** That backwards behaviour is exactly why focal length was awkward and why power is not.\n\nOne more thing worth noticing: the numbers on the dials are small. Real spectacle prescriptions run from about -8 D to +4 D, and most people's are between -3 and +3. A 10 D lens is a serious magnifying glass.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Powers add, and the minus sign takes care of itself. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An eye has a total power of **63 D**, and the distance from its front to the screen at the back needs **60 D** to focus distant things sharply there.\n\nSo this eye is **3 D too strong**: distant light comes together in front of the screen instead of on it, and distance looks blurry.\n\nWhat lens fixes it, and what does the total become?",
            options: [
                { id: 'right', label: "A -3 D lens. Adding it gives 63 - 3 = 60 D, which is exactly what this eye needs, so distance comes into focus.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "A +3 D lens, to help the eye focus better.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Adding power is the instinct, and it is the wrong direction here. Read the problem again: this eye is **too strong**, not too weak. It is already bending light more than the distance to its own screen requires.\n\nDo the sum. A +3 D lens gives 63 + 3 = **66 D**, which is even further from the 60 D this eye needs. Distant things would be blurrier still.\n\nA **-3 D** lens gives 63 - 3 = **60 D**. Exactly right.\n\nSo the job of a corrective lens is not to help the eye see. It is to **cancel the mismatch** between the power the eye has and the power its own length calls for -- and because powers add, that cancelling is a subtraction you can do in your head.\n\nThis is what B20's nearsightedness really is, now with a number on it. B20 said the eyeball is too long, so light comes together in front of the screen. In dioptres: the eye's power is too high for its length, and the prescription is however many dioptres you must take away. Someone with a -3.00 prescription has an eye 3 D too strong for its own length.\n\nAnd it tells you what the minus sign on a prescription means, which is worth knowing: **minus means the lens spreads light apart** to undo an eye that converges too much.",
            options: [
                { id: 'retry', label: "Too strong needs taking away, and powers add, so it is a subtraction.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- **-3 D**, giving 63 - 3 = 60 D, and now this eye focuses distant things on its screen.\n\nThat is a whole prescription worked out with one subtraction, and it only became that easy because power is the quantity that adds. In focal lengths the same problem would be an ugly mess of reciprocals.\n\nSo the summary of what dioptres bought:\n\n- **A number that runs the right way**: bigger means stronger.\n- **Adding instead of combining reciprocals** when lenses sit together.\n- **A sign that means something**: plus brings light together, minus spreads it apart.\n- **The unit an optician actually writes down**, so the arithmetic you just did is the arithmetic they do.\n\nWhat this level cannot tell you is where that power comes from. A lens's power depends on its shape and on the material it is made of, and C20 hinted that the material matters enormously -- diamond bends light nearly twice as hard as glass. Next comes the number for that, and it turns out to decide how thick a strong pair of spectacles has to be.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A prescription is a subtraction!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You learned the unit on a spectacle prescription.**\n\n- **power in dioptres = 1 / focal length in metres**, and the metres matter: 25 cm is 0.25 m, giving **4 D**\n- Always **check it backwards**: a 4 D lens has a focal length of 1/4 = 0.25 m\n- **When lenses sit together, their powers add.** 4 D and 3 D make 7 D, a focal length of 14 cm\n- Focal length was awkward because a **stronger** lens has a **smaller** one, and backwards quantities do not combine\n- The test of a good quantity is not the direction of its numbers but **whether you can do arithmetic with them**\n- **Bigger power, stronger lens.** 10 D is a serious magnifying glass; most prescriptions sit between -3 and +3 D\n- **Negative power spreads light apart** instead of focusing it, so the rays spread rather than meet, and adding still works: +5 D with -2 D gives 3 D\n- Every **doubling of power halves the focal length**, because one is 1 divided by the other\n- Your eye is this sum: **cornea about 43 D plus lens about 20 D = 63 D**, a focal length of about 16 mm, which is the length of your eye\n- An eye 3 D too strong for its own length needs a **-3 D** lens: 63 - 3 = 60 D. That is B20's nearsightedness, as a subtraction\n- A corrective lens does not help the eye see -- it **cancels a mismatch**\n- Removed: P20's \"shorter focal length bends more strongly\", with no number and no way to combine two lenses\n- Still standing: powers add only when the lenses are **close together**, and none of this says **where** the image lands or how big it is",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Bigger number, stronger lens -- at last!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Lenses Change What We See?**\n\nP20 told you a lens bends light. Level 2 gives you the number opticians write down, and the reason it is that number and not focal length.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Power | **1 / focal length in metres** | Bigger means stronger |\n| The unit | the **dioptre** | What is on a prescription |\n| Metres, not centimetres | 25 cm = 0.25 m | 1 / 0.25 = **4 D** |\n| Lenses together | **powers add** | 4 D + 3 D = 7 D |\n| Negative power | spreads light apart | +5 D with -2 D = 3 D |\n| Doubling the power | halves the focal length | 1 D is a metre, 4 D a quarter |\n| Your eye | 43 D cornea + 20 D lens | **63 D**, about 16 mm |\n| A prescription | a **subtraction** | 63 - 3 = 60 D |\n| Not in the formula | **where** the image lands | And what the lens is made of |\n\n**The one line to remember:** turn the focal length upside down and you get a number that runs the right way and adds when lenses are stacked -- which is why a prescription is a subtraction you can do in your head.\n\n**Up next:** C20 said diamond bends light nearly twice as hard as glass. Now you can work out how much thinner that makes a strong pair of spectacles."
        }
    };
}
