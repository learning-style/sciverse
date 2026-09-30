import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 21, physics. A Mechanism lesson: it adds no
 * new machinery, and it derives the number L2P21 had to borrow.
 *
 * L2P21 handed over the Sun's share of the tide as 1.0 m against the Moon's 2.2 m
 * and admitted the oddity: the Sun pulls the Earth about 179 times harder than the
 * Moon does, and raises less than half the tide. That reversal is the whole lesson.
 *
 * The resolution is that a tide is not raised by a pull. It is raised by the
 * DIFFERENCE in pull across the width of the Earth, because the Earth as a whole is
 * already falling freely towards the Moon. Take the difference and one power of r
 * cancels:
 *
 *   tide-raising force goes as M / r^3, not M / r^2
 *
 * Worked: the Moon pulls the near side 3.40% harder than it pulls the centre, while
 * the Sun manages only 0.0085%. So the Sun's tide is
 * (M_sun/M_moon) x (r_moon/r_sun)^3 = 0.459 of the Moon's -- which gives L2P21's
 * spring-to-neap ratio of (1 + 0.459)/(1 - 0.459) = 2.70 exactly.
 *
 * Still standing: this gives the force that raises a tide, not the height of the
 * water. Real tidal ranges depend on the shape of the sea floor and the coast, which
 * is why the Severn reaches 13 m and the Mediterranean almost nothing.
 */
export function getL3P21Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P21 left you with a genuine contradiction, and it is worth stating in its strongest form before resolving it.\n\nThe Sun contains **27 million times** the mass of the Moon. It is about 390 times further away. Put those into Newton's law of gravity, where the pull goes as mass divided by distance squared, and you find that the Sun pulls the Earth about **179 times harder** than the Moon does. That is not close. The Earth orbits the Sun and merely wobbles with the Moon.\n\nAnd yet the Moon's tide is more than **twice** the Sun's. L2P21 used 2.2 m for the Moon and 1.0 m for the Sun, and those are the right way round.\n\nSo something in the obvious reasoning is wrong, and it is not the arithmetic. **The tide is not caused by the pull.**\n\nHere is the clue. The Earth is in **free fall** around the Moon -- both bodies swing about their common centre, and nothing on Earth feels that overall motion any more than an astronaut in orbit feels the Earth's pull. If the Moon pulled every part of the Earth **equally**, there would be no tide at all, however hard it pulled.\n\nWhat is left over is the part that is **not** equal.\n\nYour two dials are the two things Newton's law depends on.\n\n- **Mass of the Body**, counted in **Moon masses**.\n- **Distance Away**, counted in **Moon distances**.\n\nBoth dials move in **powers of ten**, because the bodies they compare are that far apart: the Sun has 27 million times the Moon's mass, and Jupiter sits 1,600 times further away.\n\nSo: if equal pull produces no tide, what does?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "The difference in pull across the Earth -- the near side is pulled a little harder than the centre, and the centre harder than the far side.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The Moon must pull the water more strongly than it pulls the rock, because water is free to move.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Gravity does not distinguish between water and rock. Newton's law contains the mass of the object being pulled and nothing about what it is made of, and both are pulled with exactly the same acceleration at the same distance. Galileo settled that point four hundred years ago with falling objects, and it is why an astronaut and their spacecraft fall together.\n\nWhat water does differently is **flow**. It can respond to a small sideways force by piling up, where rock can only strain. So water reveals the effect -- it does not cause it.\n\nThe cause has to be something that varies **from place to place on the Earth**, because the whole Earth's free fall cancels out. And gravity does vary with distance, so ask what that is worth here.\n\nThe near side of the Earth is closer to the Moon than the centre is -- closer by the Earth's radius, about **6,400 km**. The far side is that much further away. Since the pull goes as 1 divided by the distance squared, the near side is pulled slightly **harder** than the centre, and the far side slightly **less**.\n\nThat is the tide: the Earth's centre is pulled at the average rate, the near-side water is pulled a bit more strongly and rises towards the Moon, and the far-side water is pulled a bit less and is left behind -- which makes a second bulge on the opposite side. **Two bulges from one Moon**, which is why there are two high tides a day and not one.",
            options: [
                { id: 'cont', label: "So how big is that difference, and why does it favour the Moon?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "This is the step that settles everything, and it is one line of algebra.\n\nThe pull per kilogram at distance **r** from a body of mass **M** is **G M / r²**. The tide depends on how much that changes when you move a distance **R** -- the Earth's radius -- closer or further away.\n\nWork out the difference between the pull at r - R and the pull at r, for R much smaller than r, and you get:\n\n**tide-raising force per kilogram ≈ 2 G M R / r³**\n\n**One power of r has been lost by taking the difference**, and that is the whole resolution. A pull goes as 1/r², but a **difference** in that pull goes as 1/r³ -- because the further away something is, the more nearly equal its pull is on both sides of the Earth, and equal pull raises no tide.\n\nSo comparing two bodies:\n\n**their tides are in the ratio (M₁/M₂) x (r₂/r₁)³**\n\nTwo things worth noticing before using it:\n\n- **Distance now matters far more than it did.** Cubed rather than squared, so the Sun's 390-fold distance penalty is enormously heavier for its tide than for its pull.\n- **The condition:** this is the force, not the water. It says what drives the tide, not how high the sea actually gets -- which depends on the shape of the ocean basin and can multiply the answer several times over.",
            options: [
                { id: 'cont', label: "Put the Sun and Moon through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**First, see the difference directly.** How much harder does each body pull the near side of the Earth than the centre?\n\n- **The Moon:** the near side is 6,400 km closer out of 384,000 km, which is 1.7% closer. Squaring gives a pull **3.40% stronger** than at the centre.\n- **The Sun:** the near side is 6,400 km closer out of 150 million km -- a change of 0.004%. The pull is stronger by just **0.0085%**.\n\nThere is the reversal, in two numbers. The Sun's total pull is vastly greater, and it is delivered so **evenly** across the Earth that almost none of it is left over to raise water. The Moon is close enough to pull one side noticeably harder than the other.\n\n**Now the ratio, properly.**\n\n1. **Mass ratio:** the Sun is **27,000,000** times the Moon's mass\n2. **Distance ratio:** the Sun is **389** times further away, and 389³ = **58,900,000**\n3. **Tide ratio:** 27,000,000 / 58,900,000 = **0.459**\n\nSo the Sun's tide-raising force is about **46%** of the Moon's -- and L2P21's 2.2 m and 1.0 m were in that ratio all along.\n\n**And now the payoff.** L2P21 told you that spring tides are about 2.7 times neap tides, and offered no reason. With 0.459 in hand:\n\nspring / neap = (1 + 0.459) / (1 - 0.459) = 1.459 / 0.541 = **2.70**\n\nThat is not a figure looked up in a tide table. **It comes out of the mass and distance of the Sun and Moon** -- and it agrees with the tide tables, which is how you know the reasoning is sound.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Suppose a body had the **same mass as the Moon** but sat at **twice** the Moon's distance.\n\nHow strong would its tide be, compared with the Moon's?",
            options: [
                { id: 'right', label: "An eighth. The distance is doubled and the tide goes as 1 over distance cubed, so 1/2³ = 1/8.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'squared', label: "A quarter, from 1 over 2 squared.", nextNodeId: 'math_wrong' },
                { id: 'half', label: "Half, since it is twice as far away.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**A quarter** is the answer for the **pull**, and the point of this lesson is that a tide is not a pull. The pull goes as 1/r², so doubling the distance quarters it -- but the tide goes as 1/r³, so doubling the distance divides it by **eight**.\n\n**Half** would be the answer if the tide went simply as 1/r, which nothing in gravity does.\n\n**1 / 2³ = 1/8.**\n\nAnd this is worth dwelling on, because the extra power of r is doing all the work in this Big Idea. It is why:\n\n- **The Sun loses.** Its 389-fold distance costs it a factor of 58.9 million on the tide instead of 151,000 on the pull.\n- **Distant planets raise no tide worth measuring.** Jupiter is enormous, and at its closest it is 1,600 times the Moon's distance, which is a factor of four thousand million against it.\n- **The Moon's own distance matters.** Its orbit is not a circle, and at its closest approach it is about 10% nearer than at its furthest -- which changes its tide by about 1.1³, roughly a third more. Those are the extra-large tides that make the news when they coincide with a spring tide and a storm.",
            options: [
                { id: 'retry', label: "Cubed, not squared -- the difference costs a power of r.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Mass of the Body** in Moon masses and **Distance Away** in Moon distances. The visual draws the answer as two **bars** on one scale -- the **pull** above and the **tide** below -- so the gap between the two bars is the extra power of distance, and it widens as you push the body away.\n\n| Body | Mass, Moons | Distance, Moons | Pull, relative | Tide, relative |\n| --- | --- | --- | --- | --- |\n| Moon | 1 | 1 | 1 | **1** |\n| Sun | 27,000,000 | 389 | **179** | **0.46** |\n| Jupiter at closest | 25,900 | 1,600 | 0.010 | **0.0000063** |\n| A Moon twice as far | 1 | 2 | 0.25 | **0.125** |\n| A Moon at half the distance | 1 | 0.5 | 4 | **8** |\n\nRead the last two columns against each other. **The pull column and the tide column disagree wildly**, and they disagree more the further away the body is. That gap is the single power of r that taking a difference costs you.\n\nThe Jupiter row is the one worth pausing on. Jupiter has 25,900 times the Moon's mass -- it is by far the largest planet -- and it raises a tide six millionths of the Moon's. **Anyone claiming that planetary alignments move the oceans is contradicted by a factor of ten million**, and the reason is the cube.\n\nAnd look at the bottom row for the other extreme. Halve a moon's distance and its tide grows **eightfold**. This is not hypothetical: it is why the moons closest to Jupiter and Saturn are pulled hard enough to be heated from inside, and why Io has volcanoes on a world that should have frozen solid long ago. The same cube that makes the Sun's tide weak makes a close orbit violent.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "A difference costs a power of r. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A newspaper reports that several planets will line up next month and warns of unusually high tides.\n\nUse the numbers. Jupiter, the largest planet, has about **25,900** times the Moon's mass and at its closest is about **1,600** times the Moon's distance.\n\nIs the warning sound?",
            options: [
                { id: 'right', label: "No. The tide goes as mass over distance cubed: 25,900 / 1,600³ is about 6 millionths of the Moon's tide. Every planet together is nowhere near a measurable effect.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Possibly -- Jupiter is enormous, so several planets together could add a noticeable amount.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Jupiter is enormous, and the cube is merciless. Do the division.\n\n1,600³ = **4,096,000,000** -- about four thousand million.\n\nSo Jupiter's tide, compared with the Moon's, is 25,900 / 4,096,000,000 = **0.0000063**, which is about six millionths.\n\nPut that in something you can picture. If the Moon's tide moves the sea by 2.2 m, Jupiter's moves it by about **fourteen thousandths of a millimetre** -- far less than the thickness of a hair, and far less than the sea moves because a cloud passed overhead and changed the air pressure.\n\nAdd every planet in the solar system, perfectly aligned, and you are still many thousands of times below anything a tide gauge could separate from the noise.\n\nAnd notice what makes this such a clean refutation. It is not a matter of opinion or of careful measurement -- **it is a factor of ten million, from one exponent.** If tides went as 1/r² the planets would still be negligible; because they go as 1/r³, they are negligible by a further factor of a thousand.\n\nWhich is the practical value of knowing why a law has the exponent it has. Anyone who knows the tide is a **difference** knows immediately that distance is punished three times over, and can dismiss the story in one line of arithmetic.",
            options: [
                { id: 'retry', label: "Six millionths of the Moon's tide -- a factor of ten million.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct -- about **six millionths** of the Moon's tide, which on a 2.2 m lunar tide is about fourteen thousandths of a millimetre. Less than the sea moves when a cloud changes the air pressure.\n\nAnd it is a clean refutation precisely because it rests on the exponent rather than on careful measurement. **A difference in a 1/r² pull goes as 1/r³**, so distance is punished three times over.\n\nSo this lesson has repaired L2P21 in the way Level 3 should:\n\n- **The contradiction is resolved.** The Sun pulls 179 times harder and raises 46% of the tide, because the Earth as a whole is in free fall and only the **unevenness** of a pull is left over.\n- **The number is derived.** (27,000,000) / (389³) = **0.459**, from mass and distance alone.\n- **L2P21's 2.7 is no longer borrowed.** (1 + 0.459)/(1 - 0.459) = **2.70**, and it agrees with real tide tables.\n- **Two high tides a day is explained too.** The far side is pulled **less** than the centre and is left behind, so there is a bulge at both ends.\n\nWhat is still missing is the sea itself. This is all about force, and a force is not a height. The Bay of Fundy has a range of 16 m and the Mediterranean nearly none, with the same Moon overhead -- because water sloshing in a basin has a natural rhythm of its own, and a basin that happens to match the tide's 12 h 25 min amplifies it enormously.\n\nWhich is the same resonance idea L3C20 used for electrons in glass, arriving here as an ocean.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A difference costs a power of r!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You resolved a genuine contradiction.**\n\n- The Sun has **27 million times** the Moon's mass and pulls the Earth about **179 times harder** -- and raises **less than half** the tide\n- The resolution: the Earth as a whole is in **free fall**, so a pull that is the **same everywhere** raises no tide at all\n- What is left over is the **unevenness** -- the near side pulled harder than the centre, the far side less\n- Which is also why there are **two** high tides a day: the far side is left behind, making a second bulge\n- Taking the difference of a 1/r² pull **costs one power of r**: the tide-raising force goes as **2 G M R / r³**\n- **The Moon pulls the near side 3.40% harder than the centre; the Sun manages 0.0085%.** The Sun's pull is enormous and almost perfectly even\n- **tides are in the ratio (M₁/M₂) x (r₂/r₁)³**, so 27,000,000 / 389³ = **0.459**\n- Which **derives L2P21's borrowed 2.7**: (1 + 0.459)/(1 - 0.459) = **2.70**, matching real tide tables\n- Gravity does not pull water harder than rock -- water simply **flows** and so reveals the effect\n- Doubling a body's distance quarters its **pull** and divides its **tide by eight**\n- Jupiter raises about **six millionths** of the Moon's tide, so planetary alignments are out by a factor of ten million\n- And the cube cuts the other way: halve the distance and the tide is **eight times** stronger, which is why Io has volcanoes\n- Removed: L2P21's Sun share, handed over with the contradiction unresolved\n- Still standing: this is the **force**, not the height of the water. Real ranges depend on the shape of the basin -- 16 m in the Bay of Fundy, almost nothing in the Mediterranean -- because a basin whose own rhythm matches 12 h 25 min **resonates**, exactly as L3C20's electrons do",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Free fall cancels the pull; only the unevenness is left!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Cycles Keep Systems Alive?**\n\nL2P21 borrowed the Sun's share and flagged the contradiction. Level 3 resolves it with one power of r.\n\n**Summary Table:**\n| Step | The Physics | The Number |\n| --- | --- | --- |\n| The Sun's pull | far greater than the Moon's | **179 times** |\n| Yet its tide | less than half | **0.46** |\n| Because the Earth is | in **free fall** | an even pull raises nothing |\n| So a tide comes from | the **unevenness** of the pull | near side harder, far side less |\n| Which is also why | there are **two** high tides | the far side is left behind |\n| Taking a difference | **costs a power of r** | 2 G M R / r³ |\n| The Moon's unevenness | 3.40% across the Earth | the Sun's: **0.0085%** |\n| The ratio | (M₁/M₂) x (r₂/r₁)³ | 27,000,000 / 389³ = **0.459** |\n| Which derives | L2P21's spring-to-neap | (1.459)/(0.541) = **2.70** |\n| Jupiter | mass 25,900, distance 1,600 | **0.0000063** -- alignments are nonsense |\n| Not explained | the **height** of the water | Still standing |\n\n**The one line to remember:** the Earth is falling freely towards the Moon, so the part of a pull that is the same everywhere does nothing at all -- and since only the unevenness raises water, distance is punished three times over instead of twice, which is how a body 27 million times heavier ends up with less than half the tide.\n\n**Up next:** C21 and L2C21 left a puzzle. A carbon atom stays in the air about four years, and an excess of carbon dioxide lasts for centuries. Both are true, and the chemistry of seawater explains why."
        }
    };
}
