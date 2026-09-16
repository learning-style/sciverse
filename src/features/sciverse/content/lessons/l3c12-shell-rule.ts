import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 12, chemistry.
 *
 * L2C12 copied the table's pattern by averaging neighbours, and named what it
 * held fixed: a pattern to copy, not a rule to explain. This removes that
 * simplification. Shell n holds at most 2n^2 electrons (2, 8, 18, 32), and the
 * rows are 2, 8, 8, 18, 18, 32 long because of the order the subshells fill
 * (4s before 3d). Real first ionisation energies show the same beat: peaks at
 * He, Ne and Ar, troughs at Li, Na and K, eight apart.
 *
 * Condition stated: the shell picture is a simplified account of orbitals.
 * Still standing: the 4s/3d order is nearly a tie and some elements break it.
 */
export function getL3C12Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2C12 predicted germanium by averaging its neighbours -- and named what it held fixed: **the table was a pattern to copy, not a rule to explain**.\n\nSo look at the table's shape itself. Count the elements in each row:\n\n**2, 8, 8, 18, 18, 32**\n\nWhy those numbers? Why does hydrogen's row hold only two elements, and the next two rows exactly eight?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Because each row runs out when a set of electron places is full. The row lengths are counting how many electrons fit before the outer pattern starts again.", nextNodeId: 'shells', sentiment: 'positive' },
                { id: 'bad', label: "They are just how the elements happen to line up -- the lengths do not mean anything in themselves.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "If the lengths meant nothing, they would be untidy numbers. Instead they come in matching pairs -- 2, then 8, 8, then 18, 18, then 32 -- and every row **ends** on a noble gas and **starts** on a violently reactive metal.\n\nThat is not how accidents look. That is a **count** of something.\n\nHere is the clue. C12 said the column an element sits in is set by its **outer electrons**. A new row begins when an atom starts a fresh outer shell with one lone electron. So the length of a row is simply **how many electrons it takes to fill the places available** before that happens again.\n\nSo the question becomes: how many electrons fit?",
            options: [
                { id: 'cont', label: "How many do fit?", nextNodeId: 'shells' }
            ]
        },
        shells: {
            id: 'shells',
            speaker: 'AI',
            content: "Electrons are arranged in **shells**, numbered **n = 1, 2, 3...** outwards from the nucleus. The number of electrons a shell can hold is:\n\n**shell capacity = 2n²**\n\n| Shell, n | 2n² | Capacity |\n| --- | --- | --- |\n| 1 | 2 x 1 | **2** |\n| 2 | 2 x 4 | **8** |\n| 3 | 2 x 9 | **18** |\n| 4 | 2 x 16 | **32** |\n\nEach shell is made of **subshells**, which hold **2**, **6**, **10** and **14** electrons. They are named **s, p, d** and **f**. Shell 2 is made of 2s and 2p: 2 + 6 = 8 ✓. Shell 3 is 3s, 3p and 3d: 2 + 6 + 10 = 18 ✓.\n\nNow the twist that shapes the table. **Electrons fill the lowest-energy subshell available, and the energies overlap.** After 3p is full, the next lowest is not 3d but **4s** -- a subshell of the next shell out.\n\nSo the filling order runs:\n\n**1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p...**\n\nThe condition belongs here. **Shells and subshells are a tidy account of something subtler**: electrons do not run on tracks, and the numbers 2, 6, 10 and 14 come from the rules of quantum mechanics. The count, though, is exact.",
            options: [
                { id: 'cont', label: "Turn that into row lengths.", nextNodeId: 'by_hand' }
            ]
        },
        by_hand: {
            id: 'by_hand',
            speaker: 'AI',
            content: "A row of the table runs from one fresh **s** subshell to the next. Count the electrons filled in between.\n\n**Row 1:** 1s only → **2 elements** (hydrogen, helium)\n\n**Row 2:** 2s + 2p = 2 + 6 → **8 elements** (lithium to neon)\n\n**Row 3:** 3s + 3p = 2 + 6 → **8 elements** (sodium to argon). Shell 3 could hold 18, but 3d does not fill yet, so the row closes at 8.\n\n**Row 4:** 4s + 3d + 4p = 2 + 10 + 6 → **18 elements**. Here the ten 3d places finally fill, which is where the transition metals come from.\n\n**Row 5:** 5s + 4d + 5p = 2 + 10 + 6 → **18 elements**\n\n**Row 6:** 6s + 4f + 5d + 6p = 2 + 14 + 10 + 6 → **32 elements**\n\n| Row | Subshells filled | Length |\n| --- | --- | --- |\n| 1 | 1s | **2** |\n| 2 | 2s 2p | **8** |\n| 3 | 3s 3p | **8** |\n| 4 | 4s 3d 4p | **18** |\n| 5 | 5s 4d 5p | **18** |\n| 6 | 6s 4f 5d 6p | **32** |\n\nThose are the real row lengths of the periodic table, predicted from counting places.\n\n**And the measurements agree.** The **first ionisation energy** is the energy needed to pull one electron off an atom, in kJ/mol. Follow it up the elements:\n\n| Element | He | Li | Ne | Na | Ar | K |\n| --- | --- | --- | --- | --- | --- | --- |\n| Atomic number | 2 | 3 | 10 | 11 | 18 | 19 |\n| Ionisation energy | **2,372** | 520 | **2,081** | 496 | **1,521** | 419 |\n\nA peak at a full shell, then a crash at the single electron that starts the next row. The gaps between the crashes -- 3 to 11 and 11 to 19 -- are **8 and 8**: exactly the row lengths.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** Use **2n²** for the **n = 4** shell, and compare it with the length of **row 4** of the table.",
            options: [
                { id: 'right', label: "The shell holds 32 (2 x 16), but row 4 has 18 elements. The row fills 4s, then 3d, then 4p -- it never gets to 4d and 4f, which wait for later rows.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'same', label: "Both are 32: the row length is always the shell's capacity.", nextNodeId: 'math_wrong' },
                { id: 'eight', label: "Both are 8, because rows 2 and 3 have 8.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**32 for both** would be true if every row filled one whole shell. The overlap in energies stops that: a row ends when the next **s** subshell starts, and by then some of the shell's own places are still empty.\n\n**8 for both** copies rows 2 and 3 without asking why they are 8. They are 8 because only 3s and 3p fill in row 3 -- and the same reasoning gives 18 for row 4.\n\n**Step 1.** 2n² for n = 4: 2 x 4 x 4 = **32** places in the shell\n\n**Step 2.** Row 4 fills 4s (2) + 3d (10) + 4p (6) = **18 elements**\n\n**Step 3.** The missing 14: 4f, which fills in row 6, and 4d, which fills in row 5.\n\nCapacity and row length are different questions. The capacity says how many fit; the filling order says when.",
            options: [
                { id: 'retry', label: "Capacity is not row length.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Atomic Number** picks an element, from 1 to 20. **Shell Number n** picks a shell, from 1 to 6.\n\nThe lab fills the chosen element's shells in order and shows its outer electrons, its group and its row. Beside that it plots the measured **first ionisation energy** of every element from 1 to 20, and for the shell you picked it works out **2n²** and the length of that row.\n\nTry this:\n\n- Step **Atomic Number** from 2 to 3, and from 10 to 11: watch the ionisation energy crash as a new row starts\n- Stop at **18** and **19**: the same crash again, eight places later\n- Set **Shell Number n** to **3**: capacity 18, but row 3 holds only 8\n- Set **n = 4**: capacity 32, row length 18",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Places, and the order they fill. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Potassium has **19** electrons. Argon, with 18, has just finished 3s and 3p -- and shell 3 still has **ten** empty places in its 3d subshell.\n\nWhere does potassium's nineteenth electron go: into 3d, finishing shell 3, or into 4s, starting a new shell?",
            options: [
                { id: 'right', label: "Into 4s. At this point 4s is lower in energy than 3d, so potassium has a single outer electron like sodium, sits in group 1, and starts row 4 -- which is exactly how it behaves.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "Into 3d. Shell 3 can hold 18, so it must be filled before any electron goes further out.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Filling shell 3 first is the tidy answer, but the measurements say otherwise.\n\n| If the 19th electron went into... | Potassium would... | It really... |\n| --- | --- | --- |\n| 3d, inside a nearly full shell | be hard to ionise, like a transition metal | has an ionisation energy of **419 kJ/mol**, the lowest of the first twenty elements |\n| 4s, alone in a new shell | lose that electron easily and react like sodium | reacts violently with water, like sodium and lithium |\n\nPotassium behaves like an alkali metal because it **is** one: one lone electron in a fresh shell. Electrons fill by **energy**, not by shell number, and at element 19 the 4s place is the lower one.\n\nThat is why row 3 stops at 8 with argon, and why the ten 3d places have to wait until row 4 -- where they give us the transition metals like iron and copper.",
            options: [
                { id: 'retry', label: "Lowest energy first, not lowest shell.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Electrons take the lowest-energy place available, and because 4s sits below 3d, a new row begins at potassium.**\n\nHere is the simplification this lesson removed. **L2C12 used the table's pattern without asking where it came from.** The rule underneath is a count: **2n²** places in each shell, filled in energy order, so the rows must be 2, 8, 8, 18, 18, 32 long -- and the repeating peaks and crashes in ionisation energy are that count showing up in a measurement.\n\nAnd the simplifications still standing. **The 4s and 3d energies are very close**, and the order is not always what the simple rule says: chromium and copper each move one electron the other way, which is why they sit slightly oddly in their row. **Shells and subshells are themselves a simplification** of a quantum description in which electrons have no definite path. And in the heaviest elements, electrons move fast enough for Einstein's relativity to shift the energies, which is part of why gold looks yellow.\n\nB12 said selection shifts a population's colours over generations. B12 at Level 3 measures how strongly, from the moths' real counts.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Count the places, in energy order!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You found the rule that shapes the table.**\n\n- **Shell capacity = 2n²**: 2, 8, 18, 32 for n = 1, 2, 3, 4\n- Shells are made of **subshells** s, p, d, f, holding **2, 6, 10, 14**\n- Electrons fill the **lowest-energy** place available, and the energies overlap\n- Filling order: 1s, 2s, 2p, 3s, 3p, **4s, 3d**, 4p, 5s, 4d, 5p...\n- A row runs from one fresh s subshell to the next\n- Rows: 1s = **2**; 2s2p = **8**; 3s3p = **8**; 4s3d4p = **18**; 5s4d5p = **18**; 6s4f5d6p = **32**\n- Capacity is not row length: shell 4 holds 32, but row 4 has 18 elements\n- Measured **first ionisation energies** peak at He 2,372, Ne 2,081, Ar 1,521\n- They crash at Li 520, Na 496, K 419 -- **8 apart**, matching the rows\n- Potassium's 19th electron goes into **4s**, not 3d, so a new row starts\n- Condition: shells and subshells are a tidy account of quantum rules\n- Still standing: chromium and copper break the filling order; relativity shifts the heaviest atoms",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "2n², filled in energy order!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Why the Rows Are 2, 8, 8, 18!**\n\nL2C12 read the table's pattern. Level 3 explains where the pattern comes from.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Shell capacity | **2n²** | 2, 8, 18, 32 |\n| Subshells | s, p, d, f | 2, 6, 10, 14 |\n| Filling | lowest energy first | 4s before 3d |\n| Row 3 | 3s + 3p | **8**, not 18 |\n| Row 4 | 4s + 3d + 4p | **18**: the transition metals |\n| Row 6 | 6s + 4f + 5d + 6p | **32** |\n| The evidence | ionisation energy | Peaks at 2, 10, 18; crashes at 3, 11, 19 |\n| Potassium | 4s below 3d | A new row, and an alkali metal |\n| Still standing | chromium, copper, relativity | The tidy rule has exceptions |\n\n**The one line to remember:** the table's shape is a count of electron places filled in energy order -- 2n² per shell, but 4s before 3d.\n\n**Up next:** L3B12 -- how strong the moths' survival advantage really was."
        }
    };
}
