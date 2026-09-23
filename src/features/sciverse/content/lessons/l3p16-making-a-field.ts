import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 16, physics.
 *
 * Removes L2P16's simplification that the field was simply given. A current
 * makes one, and a coil concentrates it:
 *
 *   B = mu0 x n x I,  n = turns per metre,  mu0 = 4 pi x 10^-7 T m/A
 *
 * Worked on 200 turns over 10 cm at 2.0 A: n = 2,000 per metre, B = 5.03 mT,
 * about a hundred times Earth's field -- and inverted, that coil needs only
 * 19.9 mA to match Earth's 50 uT. The checkpoint asks why an MRI scanner's 1.5 T
 * cannot simply be wound in copper: it would need 597 A.
 *
 * Still standing: no iron core, and the formula holds only inside a long coil.
 */
export function getL3P16Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2P16 worked carefully with Earth's field: **50 µT**, dipping **66°** in London, declination so many degrees east or west. Every one of those numbers was handed to you.\n\nNothing in that lesson said where a magnetic field comes from, or whether you could make one to order.\n\nYou can, and it has nothing to do with iron.\n\nTwo words for the dials under the picture. **Turns per metre** is how many loops of wire a coil has for every metre of its length -- not how many loops altogether, which is a different thing. **Current** is how much electricity flows through the wire, in **amperes (A)**.\n\nWhat do you need?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "A moving electric charge. A current in a wire makes a magnetic field around it, and coiling the wire stacks those fields into a strong one along the axis.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "A magnet. Fields come from magnetised material, so you need iron, nickel or cobalt to start with.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "L2C16 already ruled that out, though it did not say so in these words.\n\nEarth's core sits at about **5,000 °C**, thousands of degrees above every Curie temperature there is. No domains can line up down there, so no magnetised material is storing Earth's field -- and yet the field exists, steady enough to navigate by for centuries.\n\nSo something other than aligned domains must be making it. That something is **moving charge**: Earth's outer core is molten iron, an excellent conductor, churning as the planet loses heat. Those currents make the field.\n\nAnd you can do the same on a bench with a battery and a wire, no iron anywhere. Wind the wire into a coil and the field inside looks remarkably like a bar magnet's -- except that it appears when you close the switch and vanishes when you open it.\n\nThat is the difference between a magnet and an **electromagnet**, and it is why almost every machine uses the second kind.",
            options: [
                { id: 'cont', label: "Then how strong a field can I make?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "A long coil of wire is called a **solenoid**. The field inside it, along the axis, is:\n\n**B = μ₀ x n x I**\n\n- **B** is the field strength, in **tesla (T)**\n- **n** is the **turns per metre**: the number of turns divided by the coil's length in metres. Not the number of turns -- the number per metre, so a short tight coil and a long loose one with the same total can differ enormously\n- **I** is the current, in **amperes (A)**\n- **μ₀** is the **magnetic constant** of empty space, a fixed number: **4π x 10⁻⁷**, about **1.257 x 10⁻⁶** in units of T·m/A\n\nThe frame of reference: **B points along the coil's axis**, and which way along it is given by the **right-hand rule** -- curl the fingers of your right hand the way the current goes round, and your thumb points to the coil's north end. Reverse the current and north becomes south, which is something no permanent magnet will do for you.\n\nThe conditions, and this formula has three.\n\n1. **The coil must be long compared with its width.** The formula is for the middle of a long solenoid; near the ends the field weakens and spreads.\n2. **The field is measured inside.** Outside, it loops back round and is much weaker.\n3. **No iron core.** Slide iron inside and the field multiplies by hundreds, because the iron's own domains join in -- which is L3C16's subject, and is why real electromagnets are wound on iron.",
            options: [
                { id: 'cont', label: "Put numbers through it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A coil you could wind by hand.** 200 turns over a length of **10 cm**, carrying **2.0 A**.\n\n**Step 1.** turns per metre: n = 200 / 0.10 = **2,000 per metre**\n\n**Step 2.** B = μ₀ x n x I = (1.257 x 10⁻⁶) x 2,000 x 2.0\n\n**Step 3.** B = **5.03 x 10⁻³ T = 5.03 mT = 5,027 µT**\n\n**Step 4.** against Earth's 50 µT: 5,027 / 50 = **about 100 times stronger**\n\nA hundred Earths, from 200 turns and a couple of amps. This is why a compass is useless next to anything electrical, and why L2P16 had to warn you about local disturbance.\n\n**Now run it backwards.** What current would make that same coil produce exactly Earth's field, 50 µT?\n\n**Step 1.** I = B / (μ₀ x n) = 50 x 10⁻⁶ / (1.257 x 10⁻⁶ x 2,000)\n\n**Step 2.** the denominator is **2.51 x 10⁻³**\n\n**Step 3.** I = **0.0199 A = 19.9 mA**\n\nTwenty milliamps -- less than a small indicator lamp draws. Earth's field, on the scale of a coil you can hold, is a very small thing.\n\n| | n | I | B |\n| --- | --- | --- | --- |\n| Hand-wound coil | 2,000 /m | 2.0 A | **5.03 mT** |\n| Same coil, matched to Earth | 2,000 /m | **19.9 mA** | 50 µT |",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A coil has **500 turns** wound over **25 cm**, and carries **1.5 A**.\n\nWhat is the field inside it? (μ₀ = 1.257 x 10⁻⁶ T·m/A)",
            options: [
                { id: 'right', label: "3.77 mT. n = 500 / 0.25 = 2,000 per metre, and 1.257e-6 x 2,000 x 1.5 = 3.77e-3 T.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'used_turns', label: "942 mT, using n = 500 turns directly: 1.257e-6 x 500 x 1.5 x 1000.", nextNodeId: 'math_wrong' },
                { id: 'forgot_length', label: "0.94 mT, because 500 turns at 1.5 A is a quarter of the worked example.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**942 mT** used the **number of turns** where the formula wants **turns per metre**. That is the single most common slip with this equation, and it is worth seeing why it matters: 500 turns squeezed into 1 cm and 500 turns spread over 1 m give the same total wire and fields a hundred times apart.\n\n**0.94 mT** compared the wrong things. This coil has more turns *and* less current than the worked one -- but stretched over more length, so its turns per metre come out identical.\n\n**Step 1.** n = 500 / 0.25 = **2,000 per metre** -- exactly the worked coil's density\n\n**Step 2.** B = 1.257 x 10⁻⁶ x 2,000 x 1.5 = **3.77 x 10⁻³ T = 3.77 mT**\n\nAnd the sense check is neat: same n as the worked example, three quarters of the current, so three quarters of the field. 5.03 x 0.75 = 3.77 ✓",
            options: [
                { id: 'retry', label: "Turns per metre, not turns.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Turns per Metre** sets n, from a loosely wound coil to a tightly packed one. **Current** sets I in amperes.\n\nThe lab draws the coil, the field along its axis, and works out B both in millitesla and as a multiple of Earth's 50 µT.\n\nTry this:\n\n- **2,000 per metre** at **2.0 A**: 5.03 mT, about **100 Earths**\n- Halve the current: the field halves exactly. B is a straight line in both n and I -- no squares, no roots\n- Drop the current to **0.02 A** and the field falls to roughly Earth's own\n- Push **5,000 per metre** at **3.0 A**: 18.9 mT, nearly **400 Earths**, and still only a tiny fraction of what a hospital scanner needs\n- Notice what the formula does not contain: the coil's **diameter**. A fat coil and a thin one with the same turns per metre give the same field inside",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Straight line in both dials. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A hospital MRI scanner runs at about **1.5 T** -- thirty thousand times Earth's field.\n\nWork out the current that would need, in a copper coil of 2,000 turns per metre:\n\nI = 1.5 / (1.257 x 10⁻⁶ x 2,000) = **597 A**\n\nSix hundred amps. A house's whole supply is perhaps 60 A. Yet MRI scanners exist and do not burn down hospitals.\n\nWhat makes that possible, and what is the obstacle they had to get round?",
            options: [
                { id: 'right', label: "The obstacle is resistive heating: copper wastes power as heat at a rate proportional to the current squared, so 597 A would melt the coil. MRI coils are superconducting instead -- cooled until their resistance is zero, so a huge current circulates without heating anything.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "They use many more turns per metre instead, so the current stays small. A scanner just has a far more tightly wound coil than anything you could make by hand.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "More turns per metre does help, and scanners do wind tightly -- but look at how far you would have to go. To reach 1.5 T at a comfortable 10 A you would need:\n\nn = B / (μ₀ x I) = 1.5 / (1.257 x 10⁻⁶ x 10) = **119,000 turns per metre**\n\nThat is a turn every **8.4 micrometres**, thinner than a human hair, carrying 10 A. No wire does that.\n\nSo the current has to be large, and the real obstacle is what large currents do in ordinary wire. Copper has resistance, and the power wasted as heat goes as the **square** of the current:\n\n| Current | Heat wasted, relative to 10 A |\n| --- | --- |\n| 10 A | 1 |\n| 60 A | 36 |\n| **597 A** | **3,560** |\n\nThree and a half thousand times the heating, in a coil wrapped around a person. It would not merely be inefficient; the coil would destroy itself.\n\nThe way out is to make the resistance genuinely **zero**. Cooled with liquid helium to a few degrees above absolute zero, certain alloys become **superconducting**: a current set circulating in them keeps going with no voltage driving it and no heat produced at all. That is what is humming inside an MRI scanner, and why it needs refilling with helium rather than plugging into a bigger socket.\n\n**B = μ₀nI has no term for heat, which is exactly why the formula alone will mislead you about what is buildable.**",
            options: [
                { id: 'retry', label: "The heat, not the field, is the limit.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **A current makes a field, B = μ₀nI sets its size, and what limits real magnets is not the formula but the heat the current brings with it.**\n\nSo Level 3 removed L2P16's simplification. **The field is no longer given** -- you can compute it, build it, switch it off, and reverse it, none of which a permanent magnet allows. And Earth's own field falls into place as the same physics on a planetary scale: molten iron currents, which is why magnetic north drifts and why L2P16's declination needed a date attached.\n\n**What is still standing in this lesson:** there is **no iron core** anywhere in B = μ₀nI. Slide iron into that hand-wound coil and the field jumps by a factor of several hundred, because the iron's domains add their own alignment to yours. Every real electromagnet exploits this, and L3C16 is about the iron's side of the bargain. The formula also assumes a **long coil measured inside**, which is why the field at the end of a short solenoid is roughly half what it predicts.\n\nC16 at Level 2 found the temperature where domains give up. C16 at Level 3 asks why some materials keep their alignment for decades and others must lose it fifty times a second.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Turns per metre times amps!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You made a magnetic field.**\n\n- A **moving charge** makes a magnetic field; no magnetised material is needed\n- A long coil is a **solenoid**, and inside it **B = μ₀ x n x I**\n- **n is turns per metre**, not turns: 500 over 25 cm and 200 over 10 cm are both 2,000 per metre\n- **μ₀ = 4π x 10⁻⁷ ≈ 1.257 x 10⁻⁶ T·m/A**, a fixed property of empty space\n- Direction is along the axis, set by the **right-hand rule** -- and reversing the current swaps north and south\n- 2,000 per metre at 2.0 A gives **5.03 mT**, about **100 times** Earth's 50 µT\n- Run backwards, that coil needs just **19.9 mA** to match Earth's field\n- 2,000 per metre at 1.5 A gives **3.77 mT** -- three quarters of the current, three quarters of the field\n- B is a straight line in both n and I: no squares, no roots\n- The coil's **diameter** does not appear at all\n- An MRI's **1.5 T** would need **597 A** in copper, and heating goes as the **square** of current: 3,560 times the waste of 10 A\n- So scanners use **superconducting** coils, where resistance is zero\n- Earth's field is the same physics: currents in molten iron, which is why magnetic north drifts\n- Removed: L2P16's given field\n- Still standing: no iron core, and a long coil measured inside",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Switch it off and it's gone!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Making a Field**\n\nL2P16 measured a field it was given. Level 3 builds one.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Source of a field | a moving charge | No iron required |\n| A long coil | **B = μ₀ n I** | Field along the axis |\n| **n** | turns **per metre** | 500/25 cm = 200/10 cm |\n| **μ₀** | 4π x 10⁻⁷ T·m/A | A constant of empty space |\n| Direction | right-hand rule | Reverse the current, swap the poles |\n| Hand-wound coil | 2,000 /m at 2.0 A | **5.03 mT**, 100 Earths |\n| Matched to Earth | same coil | just **19.9 mA** |\n| Not in the formula | the coil's diameter | Fat or thin, same field inside |\n| An MRI's 1.5 T | **597 A** in copper | Heat goes as current **squared** |\n| So scanners use | superconductors | Zero resistance, no heat |\n| Removed | the field was given | Now it is built |\n| Still standing | no iron core | L3C16 takes the iron's side |\n\n**The one line to remember:** a current makes a field, turns per metre times amps sets its strength — and the reason you cannot simply wind an MRI in copper is heat, which the formula never mentions.\n\n**Up next:** C16 -- why some magnets keep their alignment and others must not."
        }
    };
}
