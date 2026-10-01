import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 22, biology. Biology closes the Big Idea, and
 * its summary table covers all three lessons.
 *
 * L2B22 timed echoes and never said why a boundary makes one. The answer is a
 * single quantity -- acoustic impedance, Z = density x speed -- and a difference:
 *
 *   reflected fraction = ((Z2 - Z1) / (Z2 + Z1))^2
 *
 * The figures are startling and do all the teaching. Soft tissue against liver
 * reflects 0.0037% -- a scan is built out of four-thousandths of one per cent.
 * Bone reflects 42.8%, lung 52.5%, air 99.90%, which is why you cannot image
 * through any of them and why the probe needs gel.
 *
 * And the mechanism inverts the obvious complaint. Because organ echoes are so
 * faint, eight boundaries still pass 99.97% of the pulse -- so the pulse survives
 * to depth. A strong reflector would give one bright echo and darkness behind it.
 * The scan works BECAUSE the signal is weak, which is the same shape as L3B21's
 * small ATP store being what makes the sensor sharp.
 *
 * Still standing: this is one flat boundary struck head-on. Real tissue scatters
 * off structures smaller than a wavelength, which is what makes the speckled
 * texture inside an organ rather than just its outline.
 */
export function getL3B22Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B22 timed echoes beautifully and never asked the obvious question: **why is there an echo at all?**\n\nIt said a pulse reflects from \"a boundary between two different tissues\". Different in what? Liver and muscle are both soft, wet, and about as dense as water. Sound crosses from one to the other at nearly the same speed. Nothing dramatic happens there -- and yet a scanner draws a line.\n\nMeanwhile a few centimetres away, **bone** stops the picture dead, and so does the **air** in a lung, and the probe will not work at all unless you smear **gel** between it and the skin.\n\nSo echoes range from barely-there to total, and L2B22 gave you no way to tell which you would get. One quantity settles all of it.\n\nIt is called the **acoustic impedance**, written **Z**, and it is simply how hard a material is to get moving with sound:\n\n**Z = density x speed of sound**\n\nFor soft tissue: 1,060 kg/m³ x 1,540 m/s = **1.63** in the usual units (**megarayls**, MRayl -- a name, not something you need to unpack). For bone: 1,900 x 4,080 = **7.75**. For air: 1.2 x 343 = **0.0004**.\n\nYour two dials are the impedances on the two sides of one boundary.\n\n- **Near Side**, the tissue the pulse is travelling through.\n- **Far Side**, the tissue it is about to meet.\n\nBefore the formula, a prediction. Liver is 1.65 and muscle is 1.70 -- nearly identical. Air is 0.0004 against tissue's 1.63 -- utterly different. Which boundary do you expect to reflect more?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Air, by far. What must matter is how different the two sides are, not how big either value is.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Bone or air, because they are the extreme values — the biggest and smallest Z.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "You have named the right two boundaries, and for a reason that will let you down as soon as you test it.\n\nIt is not that bone and air are **extreme**. It is that they are extremely **unlike the tissue next to them**. The distinction matters, so make it do some work:\n\n**Imagine a boundary from bone to bone.** Z = 7.75 on both sides -- the biggest value in the body, twice over. How much reflects?\n\n**Nothing.** There is no boundary there. It is one continuous piece of bone, and a pulse sails through without the faintest echo.\n\nNow **air to air**: the smallest value, twice over. Also nothing.\n\nSo a large Z does not make an echo and a small Z does not make an echo. **Only a difference in Z makes an echo**, and the size of the echo depends on how big that difference is relative to the two values themselves.\n\nWhich should feel familiar, because this Big Idea has now done it three times:\n\n- **L2P22** measured distance from the **difference** between two wave speeds. Equal speeds, no measurement.\n- **L2C22** read an element from the **difference** between two electron energies. Equal levels, no line.\n- **Here**: an echo from the **difference** between two impedances. Equal impedances, no echo.\n\nAnd if you met Big Idea 21, L3P21 said the same about tides: the Moon raises one because its pull **differs** across the Earth, not because it is strong. **An even pull raises no tide; an even impedance makes no echo.**",
            options: [
                { id: 'cont', label: "A difference, not a value. How big is it?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "**reflected fraction = ((Z₂ - Z₁) / (Z₂ + Z₁))²**\n\nRead it in three parts and it explains itself.\n\n**The top is the difference.** Z₂ - Z₁. Make the two sides equal and the top is zero, so nothing reflects -- exactly as bone-to-bone demanded.\n\n**The bottom is the sum**, which makes the whole thing a **proportion** rather than an absolute. A difference of 0.05 matters enormously between two values of 0.1 and nothing at all between two values of 7. So what counts is the **relative** mismatch, which is why the formula works across five orders of magnitude of Z.\n\n**And it is squared**, so the answer is always positive -- a step up and a step down of the same size reflect equally -- and small mismatches are punished twice over. A 1% mismatch in Z gives 0.01% reflected, not 1%.\n\n**The condition:** this is for a wave striking a **flat** boundary **head-on**, which is what a scanner aims for and never quite gets. Hit a boundary at an angle and the echo goes somewhere other than back to the probe, which is why a structure lying slanted in the beam can vanish from the image entirely.\n\nWhatever is not reflected is **transmitted** -- it carries on deeper. So **1 minus the reflected fraction** is what the next boundary gets to work with, and that turns out to matter more than the echo itself.",
            options: [
                { id: 'cont', label: "Put numbers in it.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**Soft tissue (Z = 1.63) meeting liver (Z = 1.65).**\n\n1. **The difference:** 1.65 - 1.63 = **0.02**\n2. **The sum:** 1.65 + 1.63 = **3.28**\n3. **The ratio:** 0.02 / 3.28 = 0.0061\n4. **Squared:** **0.0000372**, which is **0.0037%**\n\nRead that again. **Thirty-seven millionths of the pulse** comes back from the edge of an organ. The other 99.9963% carries straight on.\n\n**That is what an ultrasound image is made of.** Not a bright reflection -- a whisper, four-thousandths of one per cent, which the machine amplifies enormously and draws as a line.\n\nNow the other end of the range, same formula:\n\n| Boundary | Z near | Z far | Reflected |\n| --- | --- | --- | --- |\n| soft tissue → liver | 1.63 | 1.65 | **0.0037%** |\n| liver → muscle | 1.65 | 1.70 | 0.0223% |\n| fat → muscle | 1.38 | 1.70 | **1.08%** |\n| soft tissue → bone | 1.63 | 7.80 | **42.8%** |\n| soft tissue → lung | 1.63 | 0.26 | **52.5%** |\n| soft tissue → air | 1.63 | 0.0004 | **99.90%** |\n\nThree things fall straight out of that column, and L2B22 could not have reached any of them.\n\n**Why gel exists.** Without it there is a film of air between probe and skin, and that boundary reflects **99.90%**. One part in a thousand would get into the patient, and the same again on the way back -- so a millionth of a millionth returns. Gel replaces the air with something whose Z nearly matches tissue, and the problem disappears. **The gel is not for comfort. It is the difference between an image and nothing.**\n\n**Why you cannot scan a lung.** 52.5% reflects at the first air pocket, and the lung is nothing but air pockets. The pulse never gets in.\n\n**Why bone is a wall.** 42.8% bounces back, and what crosses is absorbed fast in dense bone. You cannot ultrasound an adult brain -- which is exactly why a baby's scan goes through the soft spot in the skull, and why the technique works at all before those bones close.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A pulse crosses **eight** soft-tissue boundaries on its way down, each reflecting **0.0037%**.\n\nHow much of the pulse is still travelling after all eight?",
            options: [
                { id: 'right', label: "About 99.97% — each boundary passes 99.9963% on, and eight of those multiplied together barely dents it.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'wrong', label: "About 70%, because eight boundaries at 0.0037% each take about 30% in total.", nextNodeId: 'math_wrong' },
                { id: 'wrong2', label: "About 0.03%, because the losses multiply and eight of them is a big reduction.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Both wrong answers have mislaid a decimal point, and it is worth finding it because the real figure is the point of the lesson.\n\n**0.0037% is not 0.37%.** It is **0.000037** as a fraction. Eight of those add to about 0.0003 -- **three parts in ten thousand**, not thirty per cent.\n\nSo each boundary passes **0.999963** of what reaches it, and eight in a row pass 0.999963⁸ = **0.9997**.\n\n**About 99.97% of the pulse is still going after eight organ boundaries.**\n\nAnd now the mechanism, which is the reverse of what you would expect. **Ultrasound works *because* the echoes are so faint.**\n\nSuppose organ boundaries reflected strongly -- say 50%, like a lung. The first one would send back a huge echo and let only half the pulse through. The second would halve it again. By the eighth boundary you would have 0.4% of the pulse left, and the deep echoes would be lost under the enormous shallow ones. **You would see the first boundary brilliantly and nothing behind it.**\n\nInstead, because every soft-tissue boundary is nearly invisible, the pulse reaches the bottom almost intact and every boundary on the way gets a fair share. The image is deep and even.\n\nSo faintness is not the price of the method -- **it is the method.** Which is the same reversal L3B21 found in Big Idea 21: a cell's ATP store is tiny, and that is what makes its sensor sharp rather than what makes it fragile. **Twice now, the weakness has turned out to be the mechanism.**",
            options: [
                { id: 'retry', label: "It works because the echoes are faint!", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Near Side** and **Far Side**, in megarayls, with the matching tissue named as you pass it. The gauge uses a **stretched** scale, because the echoes it has to show run from four-thousandths of one per cent to ninety-nine.\n\nTwo things to look for.\n\n**Put the same value on both sides.** The echo goes to zero, wherever you do it -- at 0.3, at 1.6, at 7.8. **There is no such thing as a reflective material**, only a mismatched pair. A scanner showing you \"the edge of the liver\" is showing you a place where Z changed by about 1%.\n\n**Then make one side extreme.** The reflection runs to 100% and the image **ends** there. Not degraded -- ended, because nothing goes past.\n\n| Near | Far | Mismatch in Z | Reflected | What it means |\n| --- | --- | --- | --- | --- |\n| 1.63 | 1.63 | none | **0%** | invisible: one continuous tissue |\n| 1.63 | 1.65 | 1% | **0.0037%** | the edge of an organ |\n| 1.38 | 1.70 | 23% | **1.08%** | fat against muscle, clearly visible |\n| 1.63 | 7.80 | 4.8x | **42.8%** | bone: a wall |\n| 1.63 | 0.0004 | 4,000x | **99.90%** | air: the end of the image |\n\nAnd this is where the Big Idea closes, because the same word has now appeared in all three disciplines, doing the same job.\n\n| | What the instrument reads | And if it were equal? |\n| --- | --- | --- |\n| **P22** | the **difference** between two wave speeds | no gap, no distance |\n| **C22** | the **difference** between two electron energies | no line, no element |\n| **B22** | the **difference** between two impedances | no echo, no image |\n\n**None of these instruments can see a uniform thing.** A seismometer learns nothing from rock of constant speed; a spectroscope learns nothing from evenly spaced levels; a scanner learns nothing from uniform tissue. Every one of them is blind to sameness and sensitive only to **change** -- which is the real answer to how waves let us see the invisible. They do not reveal what is there. **They reveal where it changes.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "They reveal where it changes. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** An engineer proposes a contrast agent for ultrasound: inject tiny particles of a very **dense, stiff** material -- impedance like bone -- to make a blood vessel show up brightly.\n\nIt would work. But the agent actually used in hospitals is the opposite: tiny bubbles of **gas**. Why are bubbles better?\n\n(Blood is Z = 1.61.)",
            options: [
                { id: 'right', label: "Gas is far more mismatched to blood than bone is. Blood to bone is 1.61 against 7.80, reflecting about 43%; blood to gas is 1.61 against 0.0004, reflecting over 99.9%. Being far below works better than being somewhat above — and bubbles are safe to inject and breathe out.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Bone-like particles would reflect more, since bone is the strongest reflector in the body — bubbles must be chosen for safety alone.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Safety is a real reason -- bubbles dissolve and you breathe the gas out, while stiff particles would lodge in capillaries. But the physics alone already prefers bubbles, and the formula says so in one line.\n\nIt is the **difference** that reflects, and there is no rule that the difference has to be upward. Put both options in:\n\n| | Z blood | Z agent | Reflected |\n| --- | --- | --- | --- |\n| dense particles | 1.61 | 7.80 | **43.3%** |\n| gas bubbles | 1.61 | 0.0004 | **99.90%** |\n\n**Going down beats going up**, and the reason is in the denominator. The formula divides by the **sum**, so a far side of 7.80 has a big difference and a big sum -- 6.19 over 9.41, about two thirds, squared to 43%. A far side of 0.0004 has a difference of 1.61 and a sum of 1.61, which is a ratio of essentially **one**. Squared, still one. **You cannot do better than near-zero impedance, and no solid material gets close.**\n\n\"Bone is the strongest reflector in the body\" was the slip, and it is the misconception from the start of this lesson coming back in disguise. Bone is the biggest **Z**. **Air is the biggest mismatch**, and mismatch is what reflects.\n\nSo microbubbles are both the safest option and the most reflective one. They also do something no solid could: being gas, they are **compressible**, so they pulse in the sound field and ring, which makes them easier still to pick out.",
            options: [
                { id: 'retry', label: "Air is the biggest mismatch, and mismatch is what reflects.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. Blood to bone is 6.19 over 9.41 -- about two thirds, squared to **43%**. Blood to gas is 1.61 over 1.61, a ratio of essentially **one**, squared to **99.9%**. Because the formula divides by the **sum**, going far **down** beats going somewhat **up**, and **no solid material can get near zero**.\n\nSo microbubbles are the most reflective option as well as the safest -- and being gas they are compressible, so they ring in the sound field and are easier still to pick out.\n\nAnd that closes Big Idea 22. Three instruments, three waves, one idea:\n\n| | The wave | The difference it reads | What it proved |\n| --- | --- | --- | --- |\n| **L3P22** | seismic | speed rising with **depth**, bending every ray | the outer core is **liquid**, from a wave that never came |\n| **L3C22** | light | two rungs of a **1/n²** ladder | hydrogen's whole visible spectrum, calculated |\n| **L3B22** | sound | two **impedances** | an organ's edge, from 0.0037% |\n\nRead the third column. Every one of these is a **difference**, and in every case the instrument is **blind to sameness**. Uniform rock, evenly spaced levels and uniform tissue are all invisible.\n\nSo the answer to the Big Idea is not that waves reach where we cannot. It is that **a wave comes back carrying only the places where something changed** -- and that is enough, because everything we wanted to know about the inside of the Earth, an atom or a body is a matter of where it changes.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Blind to sameness, sensitive to change!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found why there is an echo at all.**\n\n- L2B22 timed echoes and never said what makes one. \"A boundary between two different tissues\" -- different in **what**?\n- **Acoustic impedance Z = density x speed.** Soft tissue 1,060 x 1,540 = **1.63 MRayl**; bone 1,900 x 4,080 = **7.75**; air 1.2 x 343 = **0.0004**\n- **reflected fraction = ((Z₂ - Z₁)/(Z₂ + Z₁))²**: the top is the **difference**, the bottom the **sum** so it is a proportion, and squaring punishes small mismatches twice\n- **Bone to bone reflects nothing.** There is no reflective material, only a mismatched pair\n- **Soft tissue to liver reflects 0.0037%** -- thirty-seven millionths. That whisper is what an ultrasound image is made of\n- **Bone 42.8%, lung 52.5%, air 99.90%** -- which explains three things at once: you cannot scan a lung, bone is a wall, and **gel exists because a film of air reflects 99.90%**\n- Which is also why a baby's brain can be scanned through the soft spot and an adult's cannot\n- **The reversal:** eight organ boundaries still pass **99.97%** of the pulse, so it reaches the bottom almost intact. A 50% reflector would show the first boundary brilliantly and **nothing behind it**\n- So **ultrasound works because its echoes are faint** -- the same shape as L3B21, where a tiny ATP store is what makes the sensor sharp. **Twice now the weakness has been the mechanism**\n- Microbubbles beat dense particles because the formula divides by the **sum**: going to near-zero Z gives a ratio of one and **99.9%**, while bone gives 43%. **Air is the biggest mismatch, not the biggest Z**\n- And the Big Idea closes on one word. **P22 reads a difference in speed, C22 a difference in energy, B22 a difference in impedance** -- and each instrument is **blind to sameness**\n- Removed: B22's and L2B22's unexplained \"boundary\", and the idea that reflection is a property of a material\n- Still standing: this is one **flat** boundary struck **head-on**. Real tissue also **scatters** off structures smaller than a wavelength, which is what fills an organ with speckled texture instead of just drawing its outline -- and it is why a slanted surface can vanish from the image",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "No mismatch, no echo!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- How Do Waves Help Us See the Invisible?**\n\nThree levels, three instruments, and one idea underneath all of them.\n\n**Summary Table:**\n| | Physics | Chemistry | Biology |\n| --- | --- | --- | --- |\n| **Level 1** | seismic waves map the Earth | elements have fingerprints | echoes show depth |\n| **Level 2** | **d = gap x (Vp Vs)/(Vp - Vs)** | **E = 1240 / λ** | **depth = speed x time / 2** |\n| **Level 3** | rays **curve**: speed rises with depth | **E(n) = -13.6/n²** | **((Z₂-Z₁)/(Z₂+Z₁))²** |\n| **What Level 3 removed** | the straight line | the looked-up table | the unexplained \"boundary\" |\n| **The mechanism** | one end of a wavefront outruns the other | a ladder of rungs going as 1/n² | a mismatch in **Z = density x speed** |\n| **The number that decides** | **3,966 vs 3,480 km** -- 14% | **1.8889 eV**, 0.03% out | **0.0037%** from an organ's edge |\n| **The surprise** | the error **measures** the gradient | only **Balmer** is visible: luck | it works **because** echoes are faint |\n| **What it proved** | the outer core is **liquid** | hydrogen's spectrum, calculated | why gel, why not a lung, why not bone |\n| **Still standing** | one sharp boundary, smooth mantle | **hydrogen only** -- sodium fits nothing | one flat boundary, head-on |\n\n**The one line to remember:** every one of these instruments reads a difference and is blind to sameness -- a difference between two wave speeds, between two electron energies, between two impedances -- so waves do not reveal what is there, they reveal **where it changes**.\n\n**Where this leaves Big Idea 22:** the question was how waves help us see the invisible, and the three disciplines agree on an answer none of them states alone. A wave is useful because it comes back **changed**, and it can only come back changed by something that is **not uniform**. That is why the liquid core was found in a wave that never arrived, why hydrogen's fingerprint is a ladder of gaps rather than a set of positions, and why a scan of a body is assembled out of four-thousandths of one per cent."
        }
    };
}
