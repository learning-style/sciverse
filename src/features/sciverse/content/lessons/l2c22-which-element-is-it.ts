import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 22, chemistry. C22 matched fingerprints by eye.
 * This says what the pattern IS and when you are allowed to believe it.
 *
 * An earlier draft of this lesson used E = 1240 / wavelength to give the jump in
 * electronvolts. That was wrong for the level: 1240 is the Planck constant times
 * the speed of light, and a grades 6-8 learner has met neither. Switching to joules
 * is worse, not better -- it needs the Planck constant explicitly and turns a
 * readable 2.105 into 3.37 x 10^-19.
 *
 * So there is no energy unit here at all. Every number in this lesson is
 * nanometres divided by nanometres, so the units cancel and the answer is a plain
 * number:
 *
 *   how much bigger one jump is  = longer wavelength / shorter wavelength
 *   resolving power              = wavelength / smallest gap it can split
 *
 * The chemistry is untouched: a line is one electron jump between levels that
 * belong to the atom, which is why position identifies an element and brightness
 * does not. Electronvolts and the 1240 arrive in L3C22, where they are on the
 * syllabus and where they earn their keep by calculating the wavelengths outright.
 *
 * Still standing: the SIZE of a jump has no number here, only a ratio, and nothing
 * says why an atom has the particular jumps it has.
 */
export function getL2C22Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A star is forty trillion kilometres away. We know what it is made of.\n\nNot from a sample -- nobody has one. From its **light**, split into a **spectrum** and read like a barcode.\n\nC22 showed you the barcode and had you match patterns by eye. That works, and it leaves two questions unanswered.\n\n**Why do the lines sit where they do?** A pattern you can only match is a pattern you have to be given.\n\n**And when are you allowed to believe a match?** C22 never asked how good the instrument had to be.\n\nStart with the first. Here is what a line actually is.\n\nInside an atom, **electrons** can only sit at certain fixed energies -- never in between. Think of rungs on a ladder: an electron can stand on a rung, never halfway up. When an electron drops from a higher rung to a lower one, the atom has to get rid of exactly the energy it lost, and it does that by giving out **one flash of light**. That flash is the line.\n\nSo **a line is one electron falling between two rungs**, and the rungs are fixed by the atom itself -- by how much charge its nucleus has and how its electrons are arranged.\n\nYour two dials:\n\n- **Wavelength of the Line**, in **nanometres (nm)** -- millionths of a millimetre, the distance from one wave crest to the next.\n- **How Sharp the Spectrometer Is**, in nanometres -- the smallest gap between two lines it can still show as two.\n\nIf the rungs belong to the atom, what does that mean for two lamps of the same element -- one in a lab here, one in a distant star?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "They must show lines at the same wavelengths, because the rungs are a property of the atom and travel with it.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The star's lines would be different, because a star is vastly hotter than a lab lamp.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Temperature does change the spectrum -- but not in the way that would wreck the method, and the distinction is the whole reason spectroscopy works.\n\n**What heat changes:** how many electrons get kicked up to the higher rungs, so **how bright** each line is, and which lines appear at all. A very hot gas shows lines a cool one does not.\n\n**What heat does not change:** **where** the lines are. The rungs inside a sodium atom are fixed by the atom's own structure. Heating the gas gives electrons the energy to climb; it does not move the rungs they climb between.\n\nSo a sodium lamp in a street light and sodium in a star both put a line at **589.0 nm**. One may be far brighter than the other. Neither is at 540 nm.\n\nThat is why C22 told you to match the **positions** of the lines and not their brightness. Now you know the reason: **position is the atom, brightness is the conditions.**\n\nIt is one of the most useful separations in science. The thing you want to know -- identity -- is carried by the quantity that the circumstances cannot shift.",
            options: [
                { id: 'cont', label: "Position is the atom. So what can I work out from a position?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "Two things, and both are a division you can do in your head.\n\n**First: which jump was bigger.** You already know that shorter waves carry more energy -- ultraviolet burns your skin and infrared does not. The same rule holds inside the atom: **the shorter the wavelength, the bigger the drop the electron made.**\n\nSo to compare two jumps, divide their wavelengths the other way round:\n\n**how many times bigger = longer wavelength / shorter wavelength**\n\nHydrogen's red line is at 656.3 nm and its violet line at 410.2 nm:\n\n656.3 nm / 410.2 nm = **1.60**\n\n**Notice the units.** Nanometres divided by nanometres -- they cancel, so the answer is a plain number with no unit at all. The violet line came from a drop **1.60 times bigger** than the red one. Same atom, different pair of rungs.\n\n**Second: whether to trust the reading.** A position is only evidence if your instrument can be relied on to that many decimal places. The number that says so is the **resolving power**:\n\n**resolving power = wavelength / smallest gap it can split**\n\nAlso nanometres over nanometres, so also a plain number. It tells you what fraction of a wavelength the instrument can still separate.\n\n**The condition on both:** the wavelength must be measured in the same units top and bottom. That is all -- there are no constants in this lesson, and nothing to look up.",
            options: [
                { id: 'cont', label: "Identify something, and show the working.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**An unknown gas glows. Its brightest line is measured at 656.3 nm, on a spectrometer sharp to 0.5 nm. What is it, and can you be sure?**\n\n**Step 1 -- match the position against known lines.**\n\n| Element | A known line |\n| --- | --- |\n| **hydrogen** | **656.3 nm** |\n| sodium | 589.0 nm |\n| mercury | 435.8 nm |\n| calcium | 422.7 nm |\n\nThe measurement sits on hydrogen, and the nearest rival is **67 nm** away. No instrument that is sharp to 0.5 nm could confuse those two, so the identification is safe.\n\n**Step 2 -- work out the resolving power, with the units.**\n\nresolving power = wavelength / smallest gap it can split\n\n= 656.3 nm / 0.5 nm\n\n= **1,313**    ← nanometres over nanometres, so the units cancel and the answer is a plain number\n\nSo this instrument can separate one part in about **1,300**. To tell hydrogen from sodium you only needed one part in ten, so you had about a hundred times more than you needed.\n\n**Step 3 -- confirm with the pattern, not one line.** One line is weak evidence; coincidences happen. Hydrogen also shows **486.1 nm** and **434.0 nm**. Find all three at the right positions and nothing else in the universe looks like that.\n\n**And compare the jumps while you are here.** 656.3 / 434.0 = **1.51**, so the violet line is a drop half again as big as the red one -- from a higher rung, in the same atom.\n\n**Check Step 2 backwards:** if the instrument resolves one part in 1,313 at 656.3 nm, the smallest gap it can split is 656.3 / 1,313 = **0.50 nm** ✓",
            options: [
                { id: 'try', label: "Let me do one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A spectrometer is sharp to **2.0 nm**. You point it at sodium's yellow line at **589.0 nm**.\n\nWhat is its resolving power there?",
            options: [
                { id: 'right', label: "About 295 — 589.0 nm divided by 2.0 nm, and the nanometres cancel so it is a plain number.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'mult', label: "1,178 nm, from 589.0 multiplied by 2.0.", nextNodeId: 'math_wrong' },
                { id: 'inv', label: "About 0.0034, from 2.0 divided by 589.0.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "Check the **units** on each answer and two of the three disqualify themselves before you know the right one.\n\n**Multiplying** gives nm x nm, which is nanometres **squared** -- an area. A resolving power is not an area, and 1,178 nm is not a plain number either. If an answer carries a unit the quantity should not have, the operation is wrong.\n\n**Dividing the other way** gives 2.0 / 589.0 = 0.0034, which is a plain number but the wrong way up. Sanity-check it: a **sharper** instrument should have a **higher** resolving power. Make the gap smaller -- 0.1 nm instead of 2.0 -- and this version gets *smaller*, which is backwards.\n\n**589.0 nm / 2.0 nm = 295**, a plain number, and a sharper instrument makes it bigger.\n\nThe habit is worth more than the answer: **carry the units through the division and let them tell you whether the arithmetic can be right.** Nanometres over nanometres cancel to nothing, which is exactly what you want for a quantity that means *one part in how many*.\n\nAnd 295 is a real verdict about a real instrument. Hold on to it -- the next node shows what it costs you.",
            options: [
                { id: 'retry', label: "Carry the units through, and a sharper instrument scores higher.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Wavelength of the Line** does the chemistry. **How Sharp the Spectrometer Is** decides whether you are allowed to believe it.\n\nHere is the case that matters, and the one that caught chemists out for decades. Sodium's famous yellow is not one line -- it is **two**, at **589.0 nm** and **589.6 nm**, just **0.6 nm** apart.\n\nTo show those as two, you need:\n\n589.0 nm / 0.6 nm = **982**\n\nSo about **one part in a thousand**. Now compare that with what different instruments actually manage at 589 nm:\n\n| Sharp to | Resolving power | What you see |\n| --- | --- | --- |\n| 5.0 nm | **118** | one fat yellow line, the pair fully **merged** |\n| 2.0 nm | **295** | one yellow line, still merged |\n| 1.0 nm | **589** | one line, perhaps a bulge |\n| **0.6 nm** | **982** | **two lines, just split** |\n| 0.1 nm | **5,890** | two lines, wide apart |\n\n**So whether sodium has one yellow line or two is not a fact about sodium.** It is a fact about your instrument. A cheap classroom spectroscope sits in the top row and shows a single yellow blur; a research spectrograph reaches one part in a hundred thousand and splits lines nobody knew were there.\n\n**And this is the honest limit of the whole method.** A blunt instrument does not tell you it is confused. It shows you one clean line, and you identify the wrong thing with complete confidence. As the instrument gets worse the spectrum does not get messier -- it gets **simpler**, which looks exactly like getting clearer.\n\nThat is a shape this Big Idea keeps handing you. L2P22's gap measures distance only because the two wave speeds **differ**. Here, a line is evidence only if the instrument can **split** it. **Every one of these instruments has a limit that disguises itself as a clean answer.**",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "A blunt instrument looks clear, not confused. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Two students look at the same sodium lamp. One has a spectroscope sharp to 0.3 nm and reports **two** yellow lines. The other is sharp to 3.0 nm and reports **one**.\n\nWho is right, and how would you settle it?",
            options: [
                { id: 'right', label: "The first. Sodium really has two lines 0.6 nm apart, and the second instrument cannot split a 0.6 nm gap, so it adds them into one. Only the sharper instrument could have come out either way, so only its answer is evidence.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both are right about their own measurement, so the honest answer is that the number of lines depends on who is looking.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Both did report their measurement honestly -- but that does not make the two answers equally good, and the resolving power shows why in one line each.\n\n- Sharp to **0.3 nm**: 589.0 / 0.3 = **1,963**. That is comfortably past the 982 needed, so if it shows two lines, there are two lines.\n- Sharp to **3.0 nm**: 589.0 / 3.0 = **196**. Nowhere near 982. It shows one line whether there is one or two, so its \"one line\" carries **no information** about which.\n\nSo one measurement can distinguish the possibilities and the other cannot. **Sodium has two lines.** The blunt instrument is not reporting a different sodium; it is failing to report.\n\nThe general rule is worth more than this example. **A measurement that cannot come out both ways is not evidence.** The blunt spectroscope would say \"one line\" no matter what the truth was, so hearing it say \"one line\" tells you nothing you did not already know.\n\nAnd notice how it fails: not with an error bar or a warning, but with a **clean, confident, simple result**. That is the failure mode to watch for in every instrument in this Big Idea.",
            options: [
                { id: 'retry', label: "A measurement that cannot come out both ways is not evidence.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. 589.0 / 0.3 = **1,963**, past the 982 needed; 589.0 / 3.0 = **196**, nowhere near. Only one of those instruments is capable of coming out either way, so only one of them is evidence. Sodium has two lines.\n\n**A measurement that cannot come out both ways is not evidence** -- and the blunt spectroscope fails not with a warning but with a clean, simple, confident answer.\n\nSo you can now do what C22 only showed you:\n\n| | C22 said | L2C22 says |\n| --- | --- | --- |\n| A line is | part of a fingerprint | **one electron dropping between two rungs** |\n| The rungs | not mentioned | fixed by the **atom**, so they travel with it |\n| Why position, not brightness | told to you | position is the **atom**; brightness is the conditions |\n| Which jump was bigger | not asked | **longer / shorter wavelength** -- 656.3/410.2 = **1.60** |\n| When to believe a match | not asked | **resolving power = wavelength / smallest gap** |\n| Sodium's yellow | one line | really **two**, 0.6 nm apart, needing **982** |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A line is an electron falling between two rungs!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned a colour into a name, and learned when not to trust it.**\n\n- Inside an atom, **electrons sit only on fixed rungs**, never in between. A drop from a higher rung to a lower one gives out **one flash of light** -- and that flash is the line\n- The rungs are set by the **atom itself**, so they travel with it: sodium puts a line at **589.0 nm** in a street light and in a star\n- Heat changes **how bright** each line is and which appear; it does not move them. **Position is the atom, brightness is the conditions**\n- **Shorter wavelength, bigger drop** -- the same rule as ultraviolet being harsher than infrared\n- So **how many times bigger = longer wavelength / shorter wavelength**. Hydrogen's violet at 410.2 nm came from a drop **1.60 times** its red at 656.3 nm\n- **Nanometres divided by nanometres cancel**, so both numbers in this lesson are plain numbers with no unit -- and no constant to look up\n- **resolving power = wavelength / smallest gap it can split**, which says *one part in how many*\n- At 656.3 nm an instrument sharp to 0.5 nm scores **1,313**, and checking backwards 656.3 / 1,313 = **0.50 nm** ✓\n- Carry the units and two wrong answers disqualify themselves: multiplying gives **nm squared**, an area, and dividing the other way gets **smaller** for a sharper instrument\n- One line is weak evidence; a **pattern** of three at the right positions is not\n- **Sodium's yellow is really two lines 0.6 nm apart**, and splitting them needs 589.0 / 0.6 = **982** -- one part in a thousand\n- So **how many lines sodium has is a fact about your instrument**, not about sodium\n- And a blunt instrument fails by looking **simpler**, not worse: **a measurement that cannot come out both ways is not evidence**\n- Removed: C22's match-by-eye, which gave the pattern and never said what set it or when to trust it\n- Still standing: the jumps have only been **compared**, never measured -- 1.60 times bigger than what? Putting a real size on one needs a unit for the energy of a single flash of light, which is Level 3's job. And nothing here says **why** an atom has the particular rungs it has",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Nanometres over nanometres!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Waves Help Us See the Invisible?**\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| A line is | one electron dropping between **fixed rungs** | one flash of light |\n| The rungs belong to | the **atom** | so they work from a star |\n| Heat changes | brightness, not position | identity is unshiftable |\n| Shorter wavelength means | a **bigger** drop | like ultraviolet against infrared |\n| Comparing two jumps | **longer / shorter wavelength** | 656.3/410.2 = **1.60** |\n| Trusting a reading | **wavelength / smallest gap** | 656.3/0.5 = **1,313** |\n| Both are nm over nm | so the units **cancel** | plain numbers, no constants |\n| Sodium's yellow | really **two** lines | **0.6 nm** apart |\n| To split them | one part in about a thousand | **982** |\n| Still standing | the jumps are only **compared** | a real size needs Level 3 |\n\n**The one line to remember:** a spectral line is one electron falling between two rungs that belong to the atom, so its position names the element -- and a position is only evidence if your spectrometer can split what sits beside it.\n\n**Up next:** B22 sends a wave in on purpose instead of waiting for one, and reads the echo. It closes the Big Idea -- and you will find that an echo, like a seismic gap and a spectral line, is also about a **difference**."
        }
    };
}
