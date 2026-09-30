import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 20, chemistry. A Limit lesson: it answers a
 * question both C20 and L2C20 raised and neither could settle.
 *
 * L2C20 showed that high-index glass makes a thinner lens and asked why anybody
 * still buys ordinary glass. L3P20 then derived the thickness from one speed of
 * light in the glass -- and flagged that this is not quite true. It is not, and the
 * gap is the answer:
 *
 *   spread of power between red and blue = lens power / Abbe number
 *
 * The Abbe number is measured per glass and is not a free choice: the materials
 * that bend light hardest also spread the colours most. Crown glass is 58 and
 * n = 1.67 glass about 32, so a 4 D lens spreads 0.07 D in crown and 0.13 D in
 * high index, and an 8 D lens in high index reaches 0.25 D, where fringing starts
 * to be visible at the edge of the lens.
 *
 * So thin, strong and colour-free cannot all be had from one piece of glass, and
 * the way out -- pairing two glasses whose colour errors cancel -- is why a camera
 * lens is a stack of elements rather than a single piece.
 *
 * Still standing: the 0.25 D threshold is a rule of thumb from what people report
 * noticing, and the Abbe number is measured rather than predicted -- nothing here
 * says why a material that bends more must spread more.
 */
export function getL3C20Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "Two lessons have now left the same question unanswered.\n\nL2C20 worked out that glass with n = 1.74 makes a lens 30% thinner for the same prescription, and finished by asking the obvious thing: **if high-index glass is simply better, why does anyone still make lenses from ordinary 1.52 glass?** Cost is not the answer, because ordinary glass is standard even where budgets are enormous, and camera makers with no shortage of money still use low-index elements deliberately.\n\nL3P20 then derived where the thickness comes from -- a lens is a delay cut in glass -- and pointed out the assumption it had to make. It treated the glass as having **one** speed of light.\n\nThat is where the answer is, and it turns out there is a real price for thinness. Glass does not have one speed of light. It has a different speed for every colour, and the refractive index you look up is really the index **for one particular colour**, usually yellow.\n\nYou have seen the consequence since you were a child. A prism splits white light into a rainbow, and it can only do that because it bends blue more than red. A lens is made of the same stuff and does the same thing -- so a lens does not have one focal length. It has a slightly shorter one for blue than for red, so the two colours focus a little apart.\n\nYour two dials are the two things that decide how bad that is.\n\n- **Lens Power** in dioptres, as in L2P20.\n- **Abbe Number** -- a figure measured for each glass that says how **little** it spreads the colours. Confusingly but usefully, a **big** Abbe number is good: ordinary crown glass is about 58, and high-index spectacle glass about 32.\n\nIf a lens focuses blue closer than red, what do you see?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Only one colour can be sharp at a time, so the others are slightly out of focus -- a soft coloured edge around things.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nothing, since the eye cannot tell the difference between colours focusing at slightly different distances.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It can, and there is a quick way to convince yourself: look at something high-contrast through the **edge** of a pair of strong spectacles -- a dark door frame against a bright window. A coloured fringe appears along the edge, usually yellow-orange on one side and blue-violet on the other.\n\nThat fringe is exactly this. The blue image and the red image are slightly different sizes and land in slightly different places, so where the object has a sharp edge, the colours do not line up.\n\nTwo things make it worse, and both are worth knowing:\n\n- **Looking through the edge of the lens rather than the middle.** At the centre all colours arrive on the axis together and there is nothing to see. The further off-centre you look, the more the coloured images are displaced sideways relative to each other.\n- **A stronger prescription**, because everything about a lens scales with its power.\n\nSo somebody with a mild prescription genuinely cannot see it, which is why this does not come up much. Somebody at -8 D in the wrong material can see it every time they glance sideways, and it is one of the commonest complaints about high-index spectacles.\n\nThe next step is to put a number on it, because \"somewhat blurry\" is not a basis for choosing glass.",
            options: [
                { id: 'cont', label: "So how much does the focus actually differ between colours?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "The answer is a division, and it is the whole lesson:\n\n**spread of power between red and blue = lens power / Abbe number**\n\nBoth in dioptres. A 4 D lens made of crown glass, Abbe 58, spreads 4 / 58 = **0.069 D** -- so the blue focus and the red focus differ by about seven hundredths of a dioptre.\n\nThree things to understand about that formula before using it.\n\n**Why it scales with power.** Everything a lens does scales with its power. A lens that bends yellow light by 4 D bends blue slightly more and red slightly less, and those slight differences are proportional to the 4. A flat sheet of glass, power zero, spreads nothing at all -- which the formula gets right.\n\n**What the Abbe number is.** It is measured: take how much the glass bends yellow light and divide by how much the red and blue bendings differ. A glass that bends strongly but treats all colours almost alike scores high. So **a big Abbe number means well-behaved colours**, and dividing by it is what you want.\n\n**Why you cannot simply pick both.** Here is the trap, and it is a fact about materials rather than about optics. The property that makes a glass bend light hard -- electrons that are easily disturbed -- is the same property that makes its bending depend on colour. So **high index and high Abbe number tend to be mutually exclusive**:\n\n| Material | n | Abbe |\n| --- | --- | --- |\n| Crown glass | 1.52 | **58** |\n| Mid-index | 1.60 | **42** |\n| High-index | 1.67 | **32** |\n| Highest spectacle | 1.74 | **33** |\n\n**The condition:** this gives the spread between red and blue at the ends of the visible range. How visible it is depends on where you look through the lens, and that part is a rule of thumb rather than a formula.",
            options: [
                { id: 'cont', label: "Work out where it starts to matter.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A 4 D lens, in two materials.**\n\n1. **Crown glass**, Abbe 58: 4 / 58 = **0.069 D** of spread\n2. **High-index 1.67**, Abbe 32: 4 / 32 = **0.125 D** of spread\n3. **Ratio:** 0.125 / 0.069 = **1.8 times worse**\n\nNow the number that makes it a decision. People begin to notice a focus error of roughly **0.25 D** -- that is about the smallest step an optician bothers to prescribe, and it is a reasonable line for \"visible\".\n\nSo at 4 D, both materials are comfortably under it. The high-index lens is nearly twice as bad and still invisible, which is exactly why mid-range prescriptions in high-index glass cause no complaints.\n\n**Now the strong prescription, 8 D:**\n\n1. **Crown glass**: 8 / 58 = **0.138 D** -- still under the line\n2. **High-index 1.67**: 8 / 32 = **0.250 D** -- **exactly at it**\n\nAnd there is the trap, in one line. **The people who most want thin lenses are the only people for whom thin lenses cause trouble.** At 2 D nobody needs the thinness and nobody would see the colour. At 8 D the thinness matters enormously -- 1.4 mm off a 4.8 mm lens -- and the colour spread arrives at the threshold in the same breath.\n\nSo L2C20's advice needs amending. It said: offer high-index glass to the strong prescription and not the weak one. True as far as thickness goes, and incomplete, because the strong prescription is also the one where the cost falls due.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A **6 D** lens is made from mid-index glass with an **Abbe number of 42**.\n\nWhat is the spread of power between red and blue, and is it likely to be noticed?",
            options: [
                { id: 'right', label: "About 0.14 D, so probably not -- 6 / 42 = 0.143, which is well under the 0.25 D where people start to notice.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'multiplied', label: "252 D, from 6 x 42.", nextNodeId: 'math_wrong' },
                { id: 'flipped', label: "7 D, from 42 / 6.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both answers are enormous, and the size is the tell. The spread is a **small correction** to a lens's behaviour -- a few hundredths of a dioptre. Any answer bigger than the lens's own power has gone wrong somewhere.\n\n**Multiplying** gives 252 D, which is four times the power of a human eye, from a pair of spectacles. It also gets the direction wrong: a glass with a **higher** Abbe number is better behaved, so a bigger Abbe number must make the answer **smaller**. Multiplying makes it bigger.\n\n**Flipping** gives 7 D, larger than the lens itself, and it fails the same direction test -- it says a better glass gives a bigger spread.\n\n**6 / 42 = 0.143 D**, comfortably under 0.25, so this lens is fine.\n\nWhich is the ordinary case, and worth saying plainly: for most prescriptions in most materials, colour spread is a real effect that nobody can see. It only bites at the top of the range.",
            options: [
                { id: 'retry', label: "Divide by the Abbe number -- bigger Abbe, smaller spread.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Lens Power** in dioptres and **Abbe Number**, against the 0.25 D line where people start to notice.\n\n| Power | Crown, Abbe 58 | Mid, Abbe 42 | High, Abbe 32 |\n| --- | --- | --- | --- |\n| 2 D | 0.034 D | 0.048 D | 0.063 D |\n| 4 D | 0.069 D | 0.095 D | 0.125 D |\n| 6 D | 0.103 D | 0.143 D | 0.188 D |\n| 8 D | 0.138 D | 0.190 D | **0.250 D** |\n| 10 D | 0.172 D | 0.238 D | **0.313 D** |\n\nOnly the bottom-right corner crosses the line, and that corner is exactly where the thinness is worth most. **Thin, strong, and colour-free: pick two.**\n\nBut opticians and camera makers do get all three, so there must be a way round -- and the formula shows where to look. The spread is proportional to power, and **power can be negative**. So take two lenses of different glasses and add them, exactly as L2P20 said powers add:\n\n- A **+10 D** lens in crown glass, Abbe 58: spread = 10 / 58 = **+0.172 D**\n- A **-6 D** lens in a dense glass, Abbe 36: spread = -6 / 36 = **-0.167 D**\n- **Together:** power 10 - 6 = **4 D**, spread 0.172 - 0.167 = **0.005 D**\n\nA 4 D lens with almost no colour spread at all -- about fourteen times better than the 0.069 D a single crown-glass 4 D lens would give. Two pieces of glass, chosen so that one's colour error cancels the other's while their powers only partly cancel.\n\nThat pairing is called an **achromatic** pair, from words meaning *without colour*, and it was invented in the 1730s. It is why a decent camera lens is a stack of elements rather than one piece of glass, and why C20's phone camera had five to seven of them. Not to bend light more -- **to cancel each other's colours.**\n\nThe cost is weight, bulk and money, which is precisely why cameras are made this way and spectacles are not.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Two glasses, cancelling each other's colours. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A customer needs **-9 D** spectacles -- a strong prescription -- and wants them as thin as possible. The optician offers n = 1.74 glass, Abbe 33.\n\nWork out the colour spread, then decide what the honest advice is.",
            options: [
                { id: 'right', label: "9 / 33 = 0.27 D, just over the 0.25 D line, so they may see coloured fringes through the edge. The honest advice is to explain the trade and let them choose -- perhaps offering 1.60 glass as a middle course.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "0.27 D, which is over the line, so the optician should refuse and fit ordinary glass instead.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The arithmetic is right -- 9 / 33 = **0.27 D**, just over the line -- and the conclusion goes too far, for a reason worth being careful about.\n\nWork out what refusing costs the customer. At -9 D in ordinary 1.52 glass that lens is thick: something over 5 mm at the edge of a 50 mm lens, heavy on the nose, and visibly so. The 1.74 lens would be 30% thinner. That is not a cosmetic triviality for somebody who wears them every waking hour.\n\nNow work out what accepting costs them. **0.27 D of spread, through the edge of the lens only.** Most of their looking is through the middle, where there is nothing to see. They may notice fringing on high-contrast edges when they glance sideways. Some people find that genuinely annoying; many never notice.\n\nSo this is not a case a calculation settles. It is a **trade between two real costs**, and the person who has to live with it is the one who should weigh them.\n\nWhat the arithmetic does is make the conversation possible. Without it, an optician can only say \"some people prefer this one\", which is useless. With it: *this material will be 1.6 mm thinner, and you may see coloured edges when you look sideways -- and here is 1.60 glass, 13% thinner with a spread of 0.21 D, which is under the line.*\n\nThat middle option is the real value of having a formula, and it is what an optician reaching for one of the table's inner columns is doing.",
            options: [
                { id: 'retry', label: "It is a trade, and the arithmetic makes the conversation possible.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly -- **0.27 D**, just over, and the right response is a conversation rather than a refusal. The useful part is that you can now offer the middle course: 1.60 glass, 13% thinner with a spread of 9/42 = **0.21 D**, under the line.\n\nSo the question C20 asked and L2C20 could not answer is settled:\n\n- **High-index glass is not simply better.** The property that makes a glass bend light hardest is the same property that makes its bending depend most on colour, so **index and Abbe number pull against each other**.\n- **The cost appears only where the benefit is greatest.** At 2 D nobody needs thin and nobody sees colour; at 8 D the thinness is worth 1.4 mm and the spread arrives at the threshold.\n- **The way round is to add powers of opposite sign in different glasses**, so the colour errors cancel while the powers only partly do -- which is why camera lenses are stacks and spectacles are not.\n- **Ordinary 1.52 glass survives** because its Abbe number of 58 is excellent, and for most prescriptions thickness is not a problem worth paying for.\n\nAnd notice what L3P20's derivation predicted. It assumed a single speed of light in the glass and said so. Relax exactly that assumption and this entire lesson falls out -- the spread, the trade, the reason for stacked elements. **The limit was visible in the assumption before the consequence was ever measured**, which is the most useful thing a stated assumption ever does.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Thin, strong, colour-free: pick two.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found what high-index glass costs.**\n\n- Glass does not have **one** speed of light. The index you look up is the index for one colour, usually yellow\n- A prism splits white light because it bends blue more than red, and a lens is the same material doing the same thing\n- So a lens has a **slightly shorter focal length for blue than for red**, and only one colour can be sharp\n- **spread of power between red and blue = lens power / Abbe number**, both in dioptres\n- The **Abbe number** is measured per glass, and a **big** one is good: crown 58, mid-index 42, high-index 32\n- It scales with power because everything a lens does scales with power, and a flat sheet spreads nothing\n- **Index and Abbe number pull against each other**: the electrons that make a glass bend hard also make its bending depend on colour\n- People start to notice about **0.25 D** of focus error, which is also the smallest step an optician prescribes\n- A 4 D lens: **0.069 D** in crown, **0.125 D** in high index -- 1.8 times worse, and both invisible\n- An 8 D lens in high index: **0.250 D**, exactly at the line. **The people who most want thin lenses are the only ones for whom thin lenses cause trouble**\n- The way round: **add powers of opposite sign in different glasses**. +10 D at Abbe 58 with -6 D at Abbe 36 gives 4 D of power and **0.005 D** of spread\n- That is an **achromatic** pair -- *without colour* -- invented in the 1730s, and it is why a camera lens is a stack and a phone camera has five to seven elements\n- Fringing is worst **through the edge** of a lens, which is why it is a complaint about strong spectacles and not weak ones\n- Removed: L2C20's unanswered \"why is anyone still using ordinary glass?\"\n- Still standing: the **0.25 D threshold is a rule of thumb** from what people report noticing, and the **Abbe number is measured, not predicted** -- nothing here says why a material that bends more must spread more",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The limit was in the assumption all along!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Lenses Change What We See?**\n\nL3P20 assumed one speed of light in the glass and said so. This lesson relaxes exactly that assumption, and everything C20 and L2C20 left hanging falls out.\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| Glass has | a different speed for **every colour** | which is why prisms make rainbows |\n| So a lens has | a shorter focal length for blue | only one colour is sharp |\n| The spread | **power / Abbe number** | both in dioptres |\n| Abbe number | measured per glass, **big is good** | crown 58, high-index 32 |\n| The conflict | index and Abbe **pull against each other** | you cannot pick both |\n| Noticeable at | about **0.25 D** | the smallest step prescribed |\n| A 4 D lens | 0.069 D crown, 0.125 D high-index | 1.8x worse, both invisible |\n| An 8 D lens, high-index | **0.250 D** | exactly at the line |\n| The way round | **add opposite powers in two glasses** | 4 D with 0.005 D of spread |\n| Which is why | camera lenses are **stacks** | and spectacles are not |\n| Still standing | the threshold is a **rule of thumb** | and Abbe is measured, not predicted |\n\n**The one line to remember:** the same loosely held electrons that make a glass bend light hardest also make its bending depend most on colour, so thin, strong and colour-free cannot come from one piece of glass -- and the people who most need thin lenses are the only ones who pay for it.\n\n**Up next:** B20 closes the Big Idea. L2B20 showed reading glasses arriving at about 45 for nearly everybody. The lens stiffens steadily across forty years, so why does it feel like a fortnight?"
        }
    };
}
