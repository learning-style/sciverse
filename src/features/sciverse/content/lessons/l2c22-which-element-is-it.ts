import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) for Big Idea 22, chemistry. C22 said every element has a
 * spectral fingerprint and matched patterns by eye. This asks what the pattern IS.
 *
 * A line is a photon, and a photon's energy is set by its wavelength:
 *
 *   E (eV) = 1240 / wavelength (nm)
 *
 * The 1240 is h x c expressed in eV nm, handed over as one constant so the
 * arithmetic is a single division. Sodium's 589.0 nm line is 2.105 eV -- and that
 * energy is the GAP between two electron levels in a sodium atom, which is why it
 * identifies the element: the gaps belong to the atom, not to the lamp.
 *
 * The second dial is the spectrometer's sharpness, because an energy is only
 * evidence if you can trust the wavelength. Sodium's two yellow lines sit 0.6 nm
 * apart, so telling them apart needs a resolving power of about 1,000.
 *
 * Still standing: WHY an atom has the gaps it has is not explained here. Level 3
 * derives hydrogen's from the energy levels themselves.
 */
export function getL2C22Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "A star is forty trillion kilometres away. We know what it is made of.\n\nNot from a sample -- nobody has one. From its **light**, split into a **spectrum** and read like a barcode.\n\nC22 showed you the barcode and had you match patterns by eye. That works, and it leaves the obvious question unanswered: **what makes the lines sit where they do?** A pattern you can only match is a pattern you have to be given. A pattern you can **calculate** is one you can check.\n\nSo here is what a line actually is. Light comes in packets called **photons**, and a photon's **energy** depends only on its **wavelength** -- the distance from one wave crest to the next, measured in **nanometres (nm)**, millionths of a millimetre. Short wavelength, high energy; long wavelength, low energy.\n\nAnd here is the chemistry. Inside an atom, **electrons** can only sit at certain fixed energies -- never in between. When an electron drops from a higher one to a lower one, the atom must get rid of exactly the **difference**, and it does so by emitting one photon of exactly that energy. That photon is the line.\n\n**So a line is a difference between two electron energies**, and those energies are set by the atom itself.\n\nYour two dials:\n\n- **Wavelength of the Line**, in nanometres.\n- **How Sharp the Spectrometer Is**, in nanometres -- the smallest gap between two lines it can still show as two.\n\nIf the energies belong to the atom, what does that mean for two lamps of the same element -- one in a lab here, one in a distant star?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "They must show lines at the same wavelengths, because the energy gaps are a property of the atom and travel with it.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "The star's lines would be different, because a star is vastly hotter than a lab lamp.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Temperature does change the spectrum -- but not in the way that would wreck the method, and the distinction is the whole reason spectroscopy works.\n\n**What heat changes:** how many atoms are excited, so **how bright** each line is, and which lines appear at all. A very hot gas shows lines a cool one does not.\n\n**What heat does not change:** **where** the lines are. The energy gaps inside a sodium atom are fixed by the atom's own structure -- the charge on its nucleus and the arrangement of its electrons. Heating the gas gives electrons the energy to jump; it does not move the levels they jump between.\n\nSo a sodium lamp in a street light and sodium in a star both put a line at **589.0 nm**. One may be far brighter than the other. Neither is at 540 nm.\n\nThat is why C22 told you to match the **positions** of the lines and not their brightness. Now you know the reason: **position is the atom, brightness is the conditions.**\n\nIt is one of the most useful separations in science. The thing you want to know -- identity -- is carried by the quantity that the circumstances cannot shift.",
            options: [
                { id: 'cont', label: "Position is the atom. So how do I turn a position into an energy?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "One division.\n\n**E = 1240 / wavelength**\n\nwith the wavelength in **nanometres** and the energy in **electronvolts (eV)** -- the unit chemists use for single atoms and single electrons, because joules are absurdly large for one photon.\n\n**The 1240** is not magic. It is two constants multiplied together -- the speed of light and the **Planck constant**, which fixes how much energy a wave of a given wavelength carries -- expressed in these particular units so the sum comes out as one division. **The condition:** it holds for light travelling in a vacuum, which is near enough true in air and in space.\n\nTry it on a line you have met:\n\n**sodium's yellow line, 589.0 nm:** 1240 / 589.0 = **2.105 eV**\n\nSo somewhere in a sodium atom there are two electron energies **2.105 eV apart**. Not 2.1 because we rounded -- 2.105, because the line sits at 589.0 and not 589.1.\n\nNotice the direction of the relationship, because it catches people out. Energy is 1240 **divided by** wavelength, so they run **opposite** ways:\n\n| Line | Wavelength | Energy |\n| --- | --- | --- |\n| deep red | 700 nm | **1.77 eV** |\n| sodium yellow | 589.0 nm | **2.105 eV** |\n| blue-green | 486.1 nm | **2.551 eV** |\n| violet | 420 nm | **2.95 eV** |\n\nViolet light is the **shortest** wavelength here and the **biggest** energy jump. Red is the longest and the smallest.",
            options: [
                { id: 'cont', label: "Identify something.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**An unknown gas glows. Its brightest line sits at 656.3 nm. What is it?**\n\n1. **The energy of the jump:** 1240 / 656.3 = **1.889 eV**\n2. **Compare with known gaps:**\n\n| Element | A known line | Its energy |\n| --- | --- | --- |\n| **hydrogen** | 656.3 nm | **1.889 eV** |\n| sodium | 589.0 nm | 2.105 eV |\n| mercury | 435.8 nm | 2.845 eV |\n| calcium | 422.7 nm | 2.934 eV |\n\n3. **The match:** hydrogen, exactly.\n\nSo the gas is **hydrogen**, and we know because an electron inside it dropped through a gap of 1.889 eV.\n\n**But one line is weak evidence**, and this is where real identification differs from the version in C22. Lines are plentiful and coincidences happen. What convinces is a **pattern**: hydrogen also shows **486.1 nm** (2.551 eV) and **434.0 nm** (2.857 eV). Find all three at once, at the right positions, and nothing else in the universe looks like that.\n\n**Check it forwards**, as always. If the jump really is 1.889 eV, the line should sit at 1240 / 1.889 = **656.4 nm** ✓ -- back where it started, give or take the rounding.\n\nAnd calcium at 422.7 nm against mercury at 435.8 nm is worth a glance: those differ by 13 nm, which any instrument can separate. The hard cases are much closer together, which is what the second dial is about.",
            options: [
                { id: 'try', label: "Let me do one.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A lamp shows a strong line at **435.8 nm**.\n\nWhat is the energy of the electron jump that made it?",
            options: [
                { id: 'right', label: "About 2.845 eV, from 1240 divided by 435.8.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'mult', label: "About 540,392 eV, from 1240 multiplied by 435.8.", nextNodeId: 'math_wrong' },
                { id: 'inv', label: "About 0.352 eV, from 435.8 divided by 1240.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**Multiplying** gives half a million electronvolts. Sanity-check that against something you know: visible light is a couple of eV, and half a million eV is a medical X-ray that would pass straight through you. If an answer is five orders of magnitude from everything else in the table, the operation is wrong.\n\n**Dividing the other way round** gives 0.352 eV, which is too small -- infrared, not violet. The formula has the wavelength **underneath**: energy goes **up** as wavelength goes **down**.\n\n**1240 / 435.8 = 2.845 eV**, and that is mercury.\n\nThe habit worth taking from this is the sanity check, not the arithmetic. Visible light runs from about **1.8 eV** (deep red, 700 nm) to about **3.3 eV** (violet, 380 nm). **Any visible line must land between those two.** If your answer does not, you have made an arithmetic slip, and you knew it before checking the key.\n\nThat range is also a fact about chemistry rather than about light. The energy gaps between the outer electron levels of ordinary atoms happen to be a couple of electronvolts -- which is exactly why so much of chemistry shows up as **colour**.",
            options: [
                { id: 'retry', label: "Wavelength is underneath, and a visible line is 1.8 to 3.3 eV.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "**Try the two dials.** **Wavelength of the Line** and **How Sharp the Spectrometer Is**.\n\nThe first dial does the chemistry. The second decides whether you are allowed to believe it.\n\nHere is the case that matters. Sodium's famous yellow is not one line -- it is **two**, at **589.0 nm** and **589.6 nm**, just **0.6 nm** apart. Their energies differ by only 0.002 eV, and that tiny gap is real chemistry: it comes from the electron's own spin.\n\n| Spectrometer sharpness | What you see at 589 nm |\n| --- | --- |\n| 5.0 nm | one fat yellow line, the **pair** fully **merged** |\n| 2.0 nm | one yellow line, still merged |\n| 1.0 nm | one line, perhaps a bulge |\n| **0.5 nm** | **two lines, clearly split** |\n| 0.1 nm | two lines, wide apart |\n\nSo whether sodium has one yellow line or two is **not a fact about sodium**. It is a fact about your instrument.\n\nThe number that decides it is called the **resolving power** -- the wavelength divided by the smallest gap you can split:\n\n589.0 / 0.6 = **982**\n\nSo you need an instrument that can tell one part in about **a thousand**. A cheap classroom spectroscope manages one part in fifty and shows a single yellow blur. A research spectrograph reaches one part in a hundred thousand and splits lines you did not know were there.\n\n**And this is the honest limit of the method.** A blunt instrument does not tell you it is confused. It shows you one clean line and you identify the wrong thing with complete confidence. The spectrum does not get worse as the instrument does -- it gets **simpler**, which looks the same as clearer.",
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
                { id: 'right', label: "The first. Sodium really has two lines 0.6 nm apart, and the second instrument cannot split a 0.6 nm gap, so it adds them into one. The sharper instrument settles it, because splitting a line is evidence and merging it is not.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Both are right about their own measurement, so the honest answer is that the number of lines depends on who is looking.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Both did report their measurement honestly -- but that does not make the two answers equally good, and this is worth getting straight because it is a real trap.\n\nThe two instruments are **not** symmetrical:\n\n- An instrument sharp to **0.3 nm** can split a **0.6 nm** gap. If it shows two lines, there are two lines.\n- An instrument sharp to **3.0 nm** cannot. It shows one line whether there is one or two, so its \"one line\" carries **no information** about which.\n\nSo one measurement can distinguish the possibilities and the other cannot. **Sodium has two lines.** The blunt instrument is not reporting a different sodium; it is failing to report.\n\nThe general rule is worth more than this example. **A measurement that cannot come out both ways is not evidence.** The blunt spectroscope would say \"one line\" no matter what the truth was, so hearing it say \"one line\" tells you nothing you did not know before.\n\nAnd notice how it fails: not with an error bar or a warning, but with a **clean, confident, simple result**. That is the failure mode to watch for in every instrument in this Big Idea.",
            options: [
                { id: 'retry', label: "A measurement that cannot come out both ways is not evidence.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Exactly. The two instruments are not symmetrical: one **can** split a 0.6 nm gap and the other cannot, so only one of them is capable of being wrong. Sodium has two lines.\n\n**A measurement that cannot come out both ways is not evidence** -- and the blunt spectroscope fails not with a warning but with a clean, simple, confident answer.\n\nSo you can now do what C22 only showed you:\n\n| | C22 said | L2C22 says |\n| --- | --- | --- |\n| A line is | part of a fingerprint | a **photon** from one electron jump |\n| Its position means | match it by eye | **E = 1240 / wavelength**, in eV |\n| Sodium's yellow | a line | **2.105 eV**, and really **two** lines |\n| Why position, not brightness | told to you | position is the **atom**; brightness is the conditions |\n| How good must the instrument be | not asked | **resolving power 982** to split sodium |",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "A line is an energy gap I can calculate!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You turned a colour into an energy, and an energy into a name.**\n\n- Light comes in **photons**, and a photon's energy is set by its **wavelength** alone\n- Inside an atom, **electrons** sit only at fixed energies, so a jump emits a photon of exactly the **difference** -- that photon is the line\n- **E = 1240 / wavelength**, with nm in and **electronvolts** out; the 1240 is the **Planck constant** times the speed of light in these units, in a vacuum\n- Energy and wavelength run **opposite** ways, because the wavelength is underneath\n- **Sodium's 589.0 nm is a 2.105 eV gap**; hydrogen's 656.3 nm is **1.889 eV**\n- One line is weak evidence; a **pattern** of three at the right positions is not\n- Heat changes **brightness** and which lines appear; it does not move them. **Position is the atom, brightness is the conditions**\n- Every visible line lands between about **1.8 eV** (deep red) and **3.3 eV** (violet) -- which is why so much of chemistry is visible as colour\n- Sodium's yellow is really **two** lines 0.6 nm apart, from the electron's **spin**\n- Splitting them needs a **resolving power** of 589.0 / 0.6 = **982**, one part in a thousand\n- So how many lines sodium has is a fact about your **instrument**, not about sodium\n- And a blunt instrument fails by looking **simpler**, not worse: **a measurement that cannot come out both ways is not evidence**\n- Removed: C22's match-by-eye, which gave the pattern and never said what set it\n- Still standing: **why** an atom has the gaps it has. Nothing here explains why hydrogen's lines sit at 656.3, 486.1 and 434.0 rather than anywhere else. Level 3 calculates them from the levels themselves",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "1240 over the wavelength!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- How Do Waves Help Us See the Invisible?**\n\n**Summary Table:**\n| Idea | The Chemistry | The Number |\n| --- | --- | --- |\n| A line is one photon | from **one electron jump** | the photon carries the **difference** |\n| Its energy | **E = 1240 / wavelength** | nm in, **eV** out, in a vacuum |\n| Hydrogen red | 656.3 nm | **1.889 eV** |\n| Sodium yellow | 589.0 nm | **2.105 eV** |\n| Mercury violet | 435.8 nm | **2.845 eV** |\n| All visible chemistry | outer-electron gaps | **1.8 to 3.3 eV** |\n| Heat moves | brightness, not position | identity is unshiftable |\n| Sodium is really two lines | from electron **spin** | **0.6 nm** apart |\n| To split them | **resolving power** | 589.0 / 0.6 = **982** |\n| Still standing | why these gaps? | Level 3 calculates them |\n\n**The one line to remember:** a spectral line is the difference between two electron energies inside one atom, so dividing 1240 by its wavelength in nanometres hands you that difference in electronvolts -- and the difference belongs to the element, which is why it works from forty trillion kilometres away.\n\n**Up next:** B22 sends a wave in on purpose instead of waiting for one, and reads the echo. It closes the Big Idea -- and you will find that an echo, like a seismic gap and a spectral line, is also a **difference**."
        }
    };
}
