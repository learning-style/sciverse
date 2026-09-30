import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 20, chemistry. A Mechanism lesson that ends
 * in a Limit, and it is the chemistry counterpart to L3P20's physics.
 *
 * An earlier draft of this lesson quoted the Abbe number as a figure to look up
 * and asserted in one sentence that loosely held electrons cause dispersion. That
 * is not chemistry; it is optics with a material constant handed in. This version
 * derives the conflict from what the electrons are actually doing.
 *
 * The picture: light pushes an electron, the electron wobbles, and its wobble
 * re-radiates slightly late, which slows the wave. That is n. But an electron on a
 * spring has a natural frequency of its own, and the closer the light's frequency
 * sits to it, the further the electron swings -- so n rises, AND it varies far more
 * steeply with colour. One mechanism, two consequences, pulling opposite ways:
 *
 *   spread of power between red and blue = lens power / Abbe number
 *
 * Which is why the chemistry cannot be cheated. Lead, lanthanum, titanium, niobium
 * and sulfur all raise n by putting the electron resonance nearer the visible, and
 * every one of them raises the dispersion in the same move. Crown glass 58,
 * high-index 32, and an 8 D lens in high index reaches 0.250 D, the threshold.
 *
 * Still standing: the 0.25 D threshold is a rule of thumb from what people report
 * noticing, and the resonance picture treats each electron as a single spring with
 * one natural frequency, which real solids only roughly obey.
 */
export function getL3C20Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C20 got you to the edge of something and stopped. It said a material bends light because the light wave pushes its **electrons** about, and that each wobbling electron re-radiates a slightly late wave of its own, so the sum travels slower. More electrons in the way, higher index.\n\nThen it noticed that sulfur breaks its own rule. **MR-174 plastic reaches n = 1.740 at only 1.47 g/cm³** -- less than half the density of a glass with a similar index. It cannot be winning by packing in more electrons, because it has far fewer. L2C20 said its electrons must be **loosely held** and left it there.\n\nThat phrase is doing a lot of unexamined work, and unpacking it settles two things at once: why some atoms give more index per electron, and what the price of a thin lens turns out to be -- because the same slackness makes blue and red focus apart, which is why nobody makes a camera lens out of a single piece of glass.\n\nStart with what an electron in a material actually is. It is not free -- it is bound to its atom, held by the pull of the nucleus, and it can be pushed aside and will spring back. **An electron on a spring.** A tightly bound electron is a stiff spring; a loosely held one is a slack spring.\n\nYour two dials are the two numbers that describe a finished material.\n\n- **Lens Power** in dioptres, as in L2P20.\n- **How Little It Spreads Colours**, which is the figure chemists call the **Abbe number**. It is measured for each glass, and a **big** number is good: crown glass is about 58, high-index spectacle material about 32.\n\nNow the question this lesson turns on. Push a slack spring and a stiff spring with the same steady force, and the slack one moves further. But what if the pushing is not steady -- what if it is a wave, arriving thousands of millions of times a second, and you change how fast you push?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Only one colour can be sharp at a time, so the others are slightly out of focus -- a soft coloured edge around things.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Nothing, since the eye cannot tell the difference between colours focusing at slightly different distances.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "It can, and there is a quick way to convince yourself: look at something high-contrast through the **edge** of a pair of strong spectacles -- a dark door frame against a bright window. A coloured fringe appears along the edge, usually yellow-orange on one side and blue-violet on the other.\n\nThat fringe is exactly this. The blue image and the red image are slightly different sizes and land in slightly different places, so where the object has a sharp edge, the colours do not line up.\n\nTwo things make it worse, and both are worth knowing:\n\n- **Looking through the edge of the lens rather than the middle.** At the centre all colours arrive on the axis together and there is nothing to see. The further off-centre you look, the more the coloured images are displaced sideways relative to each other.\n- **A stronger prescription**, because everything about a lens scales with its power.\n\nSo somebody with a mild prescription genuinely cannot see it, which is why this does not come up much. Somebody at -8 D in the wrong material can see it every time they glance sideways, and it is one of the commonest complaints about high-index spectacles.\n\nThe next step is to ask what the electrons are doing to cause it, because \"loosely held\" is not yet an explanation.",
            options: [
                { id: 'cont', label: "So what is it about the electrons that makes blue and red differ?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Push a spring slowly and it barely notices. Push it at its own **natural frequency** -- the rate it would swing at if you nudged it and let go -- and it swings enormously. Everyone who has pushed a child on a swing knows this: timing matters far more than force.\n\nElectrons bound to atoms behave the same way. Each has a natural frequency, set by how tightly its atom holds it, and light is a push arriving at a particular frequency. So:\n\n- **Light much slower than the electron's natural frequency:** the electron follows lazily, re-radiates a little late, and the wave is slowed a little. Modest index.\n- **Light approaching that natural frequency:** the electron swings much further for the same push, re-radiates much later, and the wave is slowed a lot. **High index.**\n\nSo \"loosely held\" means **a lower natural frequency**, which means visible light is closer to it. That is the whole of L2C20's unexplained phrase: sulfur's outer electrons are held slackly, their natural frequency sits nearer the visible, and each one therefore does more slowing than a tightly held electron in silicon or oxygen. Index per electron, as promised.\n\n**And here is the trap, which follows from the same picture and cannot be separated from it.** Near a resonance, the response does not merely get bigger -- it gets **steeper**. Blue light is about 1.35 times the frequency of red -- the Abbe number is measured at two standard colours, 486 and 656 nanometres, whose frequencies stand in that ratio. Far from resonance, both are pushed lazily and almost identically, so red and blue are slowed by nearly the same amount. Close to resonance, blue is much nearer the peak than red, so the two are slowed by noticeably different amounts.\n\n**The same slackness that buys index makes the index depend on colour.** They are not two properties a chemist can shop for separately. They are one property read two ways.\n\nMeasurement puts a number on the second reading. The **Abbe number** is how much a glass bends yellow light divided by how much its red and blue bendings differ, so a big Abbe number means a well-behaved glass. And the consequence for a lens is:\n\n**spread of power between red and blue = lens power / Abbe number**\n\nboth in dioptres. The table below is the conflict, measured:\n\n| Material | What raises its index | n | Abbe |\n| --- | --- | --- | --- |\n| Crown glass | mostly silica, tightly held electrons | 1.52 | **58** |\n| Mid-index | some titanium and barium oxide | 1.60 | **42** |\n| High-index glass | lanthanum and niobium oxides | 1.67 | **32** |\n| Dense flint | lead oxide, 82 electrons an atom | 1.81 | **25** |\n| MR-174 plastic | **sulfur**, loosely held | 1.74 | **33** |\n\nEvery route to a high index -- heavy metal oxide or slack sulfur -- costs Abbe number, and for the same reason each time.\n\n**The condition:** this treats each electron as one spring with one natural frequency. Real solids have many, spread over a range, so the picture predicts the direction reliably and the exact numbers only roughly."
            ,
            options: [
                { id: 'cont', label: "So work out where the colour spread starts to show.", nextNodeId: 'worked' }
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
            content: "Exactly -- **0.27 D**, just over, and the right response is a conversation rather than a refusal. The useful part is that you can now offer the middle course: 1.60 glass, 13% thinner with a spread of 9/42 = **0.21 D**, under the line.\n\nSo the question C20 asked and L2C20 could not answer is settled:\n\n- **High-index glass is not simply better.** Index comes from electrons swinging near their natural frequency, and a response near resonance is both **larger and steeper** -- so the slackness that buys index is the same slackness that makes the index depend on colour. They are one property read two ways, not two properties to shop for.\n- **The cost appears only where the benefit is greatest.** At 2 D nobody needs thin and nobody sees colour; at 8 D the thinness is worth 1.4 mm and the spread arrives at the threshold.\n- **The way round is to add powers of opposite sign in different glasses**, so the colour errors cancel while the powers only partly do -- which is why camera lenses are stacks and spectacles are not.\n- **Ordinary 1.52 glass survives** because tightly held electrons in silica put its resonance far from the visible: Abbe 58, and for most prescriptions thickness is not a problem worth paying for.\n- **Every route to a high index costs Abbe number for the same reason** -- lead oxide, lanthanum, niobium, titanium and sulfur all work by moving the electron resonance nearer the visible.\n\nAnd notice what L3P20's derivation predicted. It assumed a single speed of light in the glass and said so. Relax exactly that assumption and this entire lesson falls out -- the spread, the trade, the reason for stacked elements. **The limit was visible in the assumption before the consequence was ever measured**, which is the most useful thing a stated assumption ever does.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Thin, strong, colour-free: pick two.", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found what high-index glass costs.**\n\n- An electron in a material is **bound to its atom like a mass on a spring**, with a natural frequency set by how tightly it is held\n- Light pushes it, and a push near that natural frequency makes it swing much further -- so the wave is slowed more. **That is where a high index comes from**\n- \"Loosely held\" means **a lower natural frequency**, which is why sulfur gives index without mass: its resonance sits nearer the visible\n- Near a resonance the response is not only larger but **steeper**, so blue and red -- whose frequencies differ by about 1.35 -- are slowed by noticeably different amounts\n- **One mechanism, two consequences, pulling opposite ways.** The index and the colour spread are the same property read twice\n- A prism splits white light for exactly this reason, and a lens is the same material doing the same thing\n- **spread of power between red and blue = lens power / Abbe number**, both in dioptres\n- The **Abbe number** is measured per glass, and a **big** one is good: crown 58, mid-index 42, high-index 32, dense flint 25\n- Every route to a high index costs it: **lead oxide, lanthanum, niobium, titanium oxide and sulfur** all move the resonance nearer the visible\n- It scales with power because everything a lens does scales with power, and a flat sheet spreads nothing\n- So **index and Abbe number cannot be chosen separately**, and no cleverness in composition escapes it -- the conflict lives in the resonance itself, not in the recipe\n- People start to notice about **0.25 D** of focus error, which is also the smallest step an optician prescribes\n- A 4 D lens: **0.069 D** in crown, **0.125 D** in high index -- 1.8 times worse, and both invisible\n- An 8 D lens in high index: **0.250 D**, exactly at the line. **The people who most want thin lenses are the only ones for whom thin lenses cause trouble**\n- The way round: **add powers of opposite sign in different glasses**. +10 D at Abbe 58 with -6 D at Abbe 36 gives 4 D of power and **0.005 D** of spread\n- That is an **achromatic** pair -- *without colour* -- invented in the 1730s, and it is why a camera lens is a stack and a phone camera has five to seven elements\n- Fringing is worst **through the edge** of a lens, which is why it is a complaint about strong spectacles and not weak ones\n- Removed: L2C20's unanswered \"why is anyone still using ordinary glass?\"\n- Still standing: the **0.25 D threshold is a rule of thumb** from what people report noticing, and the **Abbe number is measured, not predicted** -- nothing here says why a material that bends more must spread more",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "The limit was in the assumption all along!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Lenses Change What We See?**\n\nL3P20 assumed one speed of light in the glass and said so. This lesson relaxes exactly that assumption, and everything C20 and L2C20 left hanging falls out.\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| An electron is | **bound like a mass on a spring** | with its own natural frequency |\n| A push near that frequency | makes it swing **further** | which is where high index comes from |\n| And the response is also | **steeper** near resonance | so blue and red differ |\n| The spread | **power / Abbe number** | both in dioptres |\n| Abbe number | measured per glass, **big is good** | crown 58, high-index 32 |\n| The conflict | **one property read two ways** | not two you can shop for |\n| Noticeable at | about **0.25 D** | the smallest step prescribed |\n| A 4 D lens | 0.069 D crown, 0.125 D high-index | 1.8x worse, both invisible |\n| An 8 D lens, high-index | **0.250 D** | exactly at the line |\n| The way round | **add opposite powers in two glasses** | 4 D with 0.005 D of spread |\n| Which is why | camera lenses are **stacks** | and spectacles are not |\n| Still standing | the threshold is a **rule of thumb** | and Abbe is measured, not predicted |\n\n**The one line to remember:** a high index comes from electrons swinging close to their natural frequency, and a response near resonance is both larger and steeper -- so the very slackness that makes a glass thin is what makes its focus depend on colour, and no choice of atoms escapes it.\n\n**Up next:** B20 closes the Big Idea. L2B20 showed reading glasses arriving at about 45 for nearly everybody. The lens stiffens steadily across forty years, so why does it feel like a fortnight?"
        }
    };
}
