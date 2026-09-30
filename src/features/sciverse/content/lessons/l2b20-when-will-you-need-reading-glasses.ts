import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 20, biology. Biology closes the Big Idea, so
 * this lesson is where L2P20's dioptres and L2C20's glass meet a real eye.
 *
 * B20 said the eye focuses closer by squeezing its lens rounder, and that there is
 * a limit called the near point. It never said how much squeezing an eye has, or
 * how the limit is worked out. Both are dioptres, and the sum is a subtraction:
 *
 *   reading glasses needed = power to focus at reading distance - accommodation left
 *
 * with power to focus at a distance = 1 / distance in metres, exactly as in L2P20.
 * Reading at 25 cm needs 4 D. A 45-year-old with 3.5 D of accommodation left is
 * half a dioptre short, which is why the first reading glasses are usually +0.5 D.
 *
 * Still standing: it says nothing about *why* accommodation falls with age, and it
 * treats the figure as something to look up. Level 3 shows why the loss feels
 * sudden when it is actually steady.
 */
export function getL2B20Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B20 showed you the trick your eye does constantly: to look at something close, muscles squeeze the lens rounder, which bends light more strongly. Look into the distance and the lens relaxes flat again.\n\nAnd it gave you the limit. The lens can only get so round, so there is a nearest distance you can focus on -- the **near point**. Closer than that, everything is blurred; beyond it, clear. Hold a book too close and no amount of squeezing brings it into focus -- and if your near point runs off the far end of a ruler's scale, so does your reading.\n\nWhat B20 could not say is **how much** squeezing you have, or where your near point is, or when you will need reading glasses. All three are the same number, and L2P20 already gave you its unit.\n\nYour extra squeezing power is measured in **dioptres**, and it is called your **accommodation** -- the spare bending power you can add on demand. A ten-year-old has about **14 D** of it. By 50 it is nearer **2 D**.\n\nYour two dials are the two things that decide whether you need help.\n\n- **Accommodation Left** is the spare bending power you can still add, in dioptres.\n- **Reading Distance** is how far away you want to hold the page, in centimetres.\n\nHere is the question that makes it a calculation. To focus on something **25 cm** away, how much extra power does an eye need?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "1 divided by the distance in metres -- so 1 / 0.25 = 4 dioptres, the same sum as L2P20.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "It depends on the person's eyesight, so there is no single number.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "There is a single number, and separating it from the person's eyesight is the key to the whole lesson.\n\nTwo different things are going on and they are easy to run together:\n\n- **Whether your eye focuses correctly at a distance.** That is B20's nearsighted and farsighted, and it varies enormously from person to person. L2P20 handled it: a mismatch in dioptres, cancelled by a lens.\n- **How much extra power it takes to shift focus from far away to something close.** That is pure geometry. It depends on the **distance to the object and nothing else** -- not on your eyes, not on your age, not on whether you wear glasses.\n\nThe second one is the sum here, and it is the same sum as L2P20's: **1 divided by the distance in metres**. Bringing focus from the far distance to 25 cm takes 1 / 0.25 = **4 dioptres**, for everybody who has ever lived.\n\nWhat varies between people is not the 4 dioptres. It is **whether they still have 4 dioptres to spend**.\n\nThat separation is what makes the arithmetic possible: a fixed requirement set by the distance, against a personal supply that falls with age.",
            options: [
                { id: 'cont', label: "So it is a fixed requirement against a personal supply?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Exactly, and the shortfall is what you buy in a shop:\n\n**reading glasses needed = power to focus at reading distance - accommodation left**\n\nwhere, as in L2P20,\n\n**power to focus at a distance = 1 / distance in metres**\n\nIf the answer comes out zero or negative, you need no glasses -- you have spare accommodation.\n\nThe same number also tells you your near point, by running the sum the other way. Your closest focus is wherever your accommodation is exactly used up:\n\n**near point in metres = 1 / accommodation left**\n\nSo 4 D of accommodation puts your near point at 1/4 = 0.25 m, which is 25 cm. Someone with 2 D cannot focus closer than 50 cm.\n\nThree things to keep straight:\n\n- **The requirement is set by the distance**, and 25 cm is the usual comfortable reading distance, so **4 D** is the figure to remember.\n- **Reading glasses come in half-dioptre steps** -- +0.5, +1.0, +1.5 and so on -- which is why the shop has a rack rather than a prescription for each customer.\n- **The condition:** this assumes your distance vision is already correct, with or without spectacles. Somebody who needs distance correction adds the two prescriptions together, and because L2P20 showed that powers add, that is a sum and not a complication.",
            options: [
                { id: 'cont', label: "Work out a real case.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A 45-year-old with 3.5 D of accommodation left, wanting to read at 25 cm.**\n\n1. **Power needed for 25 cm:** 1 / 0.25 = **4 D**\n2. **Accommodation left:** **3.5 D**\n3. **Shortfall:** 4 - 3.5 = **+0.5 D**\n\nHalf a dioptre short, which is why the weakest reading glasses on the rack are **+0.50** and why they are the first pair most people ever buy.\n\nAnd notice the near point this person has: 1 / 3.5 = 0.29 m, or **29 cm**. They can focus at 29 cm, and they want to read at 25. They are missing it by four centimetres -- which is exactly the experience people describe, of holding the menu a little further away than they used to.\n\n**Now the same person five years later, with 2 D left.**\n\n1. **Power needed:** still **4 D** -- the page has not moved\n2. **Shortfall:** 4 - 2 = **+2 D**\n3. **Near point:** 1 / 2 = 0.5 m, or **50 cm**\n\nIn five years the shortfall went from half a dioptre to two, and the near point from 29 cm to 50 cm. **Arm's length.** That is the point at which reading glasses stop being an occasional convenience.\n\nOne detail worth having: the requirement never changes. All the change is on the supply side.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Someone has **1.5 D** of accommodation left and wants to read a music score at **50 cm**, further away than a book.\n\nWhat reading glasses do they need?",
            options: [
                { id: 'right', label: "+0.5 D. 50 cm needs 1 / 0.5 = 2 D, and 2 - 1.5 = 0.5 D.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_book', label: "+2.5 D, because reading needs 4 D and 4 - 1.5 = 2.5.", nextNodeId: 'math_wrong' },
                { id: 'added', label: "+3.5 D, from 2 + 1.5.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**+2.5 D** uses the 4 D figure out of habit, and the question moved the page. 4 D is the requirement for **25 cm**. At 50 cm the requirement is 1 / 0.5 = **2 D**, only half as much -- because the further away something is, the less extra bending it takes to focus on it. Hold a book at arm's length and you need almost no accommodation at all.\n\n**Adding** them gives an answer larger than the requirement, which cannot be right. The accommodation you have is **help**, so it must come off the total. Adding would say that having more spare focusing power makes you need stronger glasses.\n\n**At 50 cm: 2 - 1.5 = +0.5 D.**\n\nAnd this is genuinely useful. A musician with the same eyes as a reader needs weaker glasses for the same task, because a music stand sits further away than a book. Opticians ask what you want to look at and how far away it is, and now you know that they are not being polite -- they are choosing which number to put in the first term.",
            options: [
                { id: 'retry', label: "The requirement comes from the distance, and accommodation subtracts.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Accommodation Left** in dioptres, and **Reading Distance** in centimetres.\n\nRoughly how much accommodation is left, by age:\n\n| Age | Accommodation | Near point | Glasses to read at 25 cm |\n| --- | --- | --- | --- |\n| 10 | 14 D | 7 cm | none |\n| 20 | 11 D | 9 cm | none |\n| 30 | 8 D | 13 cm | none |\n| 40 | 5 D | 20 cm | none |\n| 45 | 3.5 D | 29 cm | **+0.5 D** |\n| 50 | 2 D | 50 cm | **+2.0 D** |\n| 55 | 1.3 D | 77 cm | **+2.7 D** |\n| 60 | 1 D | 100 cm | **+3.0 D** |\n\nTwo things stand out, and the second one is strange enough to be worth the rest of the lesson.\n\n**First, nothing happens for forty years and then everything does.** From 10 to 40 the near point creeps from 7 cm to 20 cm -- still closer than anyone holds a book, so there is nothing to notice. Then between 40 and 50 it goes from 20 cm to 50 cm and crosses straight through the reading distance. The change was under way the whole time; it only became an **event** when it crossed 25 cm.\n\n**Second, look at the sizes of the steps.** Between 10 and 20 the eye loses 3 D and the near point moves 2 cm. Between 40 and 50 it loses 3 D again -- the same loss -- and the near point moves **30 cm**. Identical decline, fifteen times the consequence.\n\nThat is not biology. Nothing about the lens is different in those two decades. It is what happens when you take **1 divided by** a shrinking number, and Level 3 is about why that matters so much.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "The same loss, fifteen times the effect. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Someone who is **nearsighted** wears -3 D spectacles for distance. They are 50, with 2 D of accommodation left, and they want to read at 25 cm.\n\nThey notice something odd: if they take their distance glasses **off**, they can read perfectly well with no reading glasses at all. Their friend, who has never needed glasses, has to buy +2.0 D readers.\n\nWhy can the nearsighted person read without any glasses?",
            options: [
                { id: 'right', label: "Their eye is already 3 D too strong for distance, and reading at 25 cm needs 4 D of extra power. Taking the glasses off hands them 3 of those 4 D for free, so their 2 D of accommodation is more than enough.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Nearsighted eyes must lose accommodation more slowly, so they have more left at 50.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Accommodation falls at much the same rate whatever your distance prescription -- the lens hardens on its own schedule. Both of these people have about 2 D left at 50.\n\nThe difference is the **starting point**, and it is pure addition.\n\nRemember L2P20: this person's eye is **3 D too strong** for its own length, which is why distant things blur and why their spectacles are -3 D. Now think about what being too strong means for something close. Extra bending power is exactly what reading requires.\n\n- **Their friend**, correctly focused for distance, needs the full 4 D to read at 25 cm and has 2 D. Short by 2 D, so **+2.0 D readers**.\n- **This person**, with their glasses off, starts 3 D too strong. They need 4 D and already have 3 of it built in, so they only need to find **1 D** -- and they have 2. Comfortable, with some to spare.\n\nSo nearsightedness, which is a nuisance for forty years, quietly becomes an advantage. It is one of the few genuinely fortunate arrangements in human eyes, and it explains something you may have seen: older nearsighted people peering over the top of their glasses to read, rather than swapping to another pair. They are not being eccentric. They are **removing 3 dioptres they do not want**.\n\nAnd notice that the whole argument was addition and subtraction of dioptres, which is why L2P20 insisted on a unit that adds.",
            options: [
                { id: 'retry', label: "Being too strong for distance is being pre-focused for close.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- **3 of the 4 dioptres for free**, so 2 D of accommodation is plenty where their friend needs +2.0 D of help.\n\nWhich is why you see older nearsighted people reading over the top of their spectacles instead of buying a second pair. They are subtracting 3 dioptres they do not want for this job.\n\nSo the three Big Idea 20 lessons now join up into one piece of arithmetic:\n\n- **L2P20** gave the unit and the rule that powers add: your eye is a 43 D cornea plus a 20 D lens, and a prescription is a subtraction.\n- **L2C20** said what it costs in glass to make a given power, and for whom that is worth paying for.\n- **This lesson** is the same arithmetic applied to a demand that changes over a lifetime -- a fixed requirement set by the reading distance, against a supply that falls.\n\nAnd it leaves the strangest fact of the three unexplained. The lens loses its flexibility **steadily**, decade after decade. Yet almost everybody has the same experience at almost the same age: nothing for forty years, then a sudden fortnight of holding things further away. A steady decline producing a sudden event needs explaining, and the explanation is not biological.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A fixed requirement, against a falling supply.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out your own reading glasses.**\n\n- **power to focus at a distance = 1 / distance in metres**, so 25 cm needs **4 D** -- for everybody, because it is geometry\n- **Accommodation** is the spare bending power you can add on demand: about **14 D** at ten, **2 D** at fifty\n- **reading glasses needed = power to focus at reading distance - accommodation left**\n- A 45-year-old with 3.5 D is **+0.5 D** short, which is the weakest pair on the rack and the first most people buy\n- **near point in metres = 1 / accommodation left**, so 3.5 D gives 29 cm and 2 D gives 50 cm\n- Keep the two ideas apart: whether your eye focuses right **at distance** varies hugely between people; what it takes to **shift focus closer** is fixed by the distance alone\n- **A further page needs weaker glasses**: a music score at 50 cm needs 2 D, not 4, which is why opticians ask what you want to look at\n- Reading glasses come in **half-dioptre steps**, which is why a rack works where a prescription would be needed\n- **Nothing happens for forty years and then everything does**: the near point creeps from 7 cm to 20 cm by age 40, then crosses 25 cm within a decade\n- The same 3 D loss moves the near point **2 cm** between 10 and 20, and **30 cm** between 40 and 50\n- A nearsighted person's eye is already too strong, which is **3 D of reading power for free** -- so they read over the top of their glasses\n- Removed: B20's near point, with no way to work out where it is or when it matters\n- Still standing: nothing here says **why** accommodation falls, and nothing explains why a steady decline is experienced as a sudden event",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Why does a steady decline feel sudden?", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Lenses Change What We See?**\n\nThree lessons, one unit, and by the end you can read your own prescription.\n\n**Summary Table:**\n| Lesson | The Maths | What It Measured |\n| --- | --- | --- |\n| **L2P20** physics | power = 1 / focal length in metres | **4 D** for a 25 cm lens, and powers **add** |\n| **L2C20** chemistry | thickness = 0.52 / (n - 1) | **30% thinner** at n = 1.74 |\n| **L2B20** biology | glasses = power needed - accommodation | **+0.5 D** at 45, **+2.0 D** at 50 |\n| Focusing closer | 1 / distance in metres | 25 cm needs 4 D, for everyone |\n| Near point | 1 / accommodation | 3.5 D gives 29 cm |\n| The eye | 43 D cornea + 20 D lens | about **63 D** |\n| The nearsighted bonus | already 3 D too strong | 3 of the 4 D for free |\n| Not in the formulas | **why** the lens stiffens | And why it feels sudden |\n\n**The one line to remember:** focusing on a page 25 cm away takes 4 dioptres of extra bending whoever you are, so reading glasses are simply the gap between that fixed 4 and whatever spare power your lens has left.\n\n**Up next at Level 3:** why a lens needs extra glass in its middle at all, what high-index glass quietly costs you, and why a decline that takes forty years arrives in a fortnight."
        }
    };
}
