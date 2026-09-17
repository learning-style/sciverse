import { DialogNode } from '../../types';

/**
 * Level 3 (grades 9-12) for Big Idea 14, biology. Closes the Big Idea.
 *
 * Removes L2B14's simplification that the code is a perfect lookup table.
 * Every figure below was computed from the standard genetic code rather than
 * quoted: of the 576 possible single-base substitutions (64 codons x 3
 * positions x 3 alternatives), 138 are silent -- but they are not spread
 * evenly.
 *
 *   position 1:   8 of 192 silent (4%)
 *   position 2:   2 of 192 silent (1%)
 *   position 3: 128 of 192 silent (67%)
 *
 * And a frameshift is a different kind of failure: one base inserted after
 * base 60 of a 450-base gene leaves 20 codons untouched and garbles 130.
 *
 * Still standing: every substitution treated as equally likely, and repair
 * machinery ignored.
 */
export function getL3B14Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "L2B14 treated the genetic code as a perfect lookup table: three bases in, one amino acid out, every time.\n\nCopying is not perfect. A cell about to divide must copy some 3 billion base pairs, and occasionally it writes down the wrong letter.\n\nOne wrong letter in one codon. How much of the protein does that ruin?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "It depends entirely on which letter. Some wrong letters change nothing at all, and some wreck everything after them.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "One codon's worth -- one amino acid out of place. The rest of the protein is spelled by other codons, so it is unaffected.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "That is right for one kind of mistake and badly wrong for another, and the difference is the whole lesson.\n\nIf a letter is **swapped** for a different letter, then yes -- the damage is local. The codon count does not change, so every later codon is still read exactly as before.\n\nBut if a letter is **added or lost**, the count changes. The reading machinery does not know where codons are meant to begin; it simply takes the bases three at a time from a fixed starting point. Lose one letter and every three-letter group after that point is assembled from the wrong letters:\n\n| | The bases | Read in threes |\n| --- | --- | --- |\n| correct | THE CAT SAW THE DOG | THE CAT SAW THE DOG |\n| one letter lost | THE CT SAW THE DOG | THE CTS AWT HED OG |\n\nEverything downstream is nonsense, even though only one letter went missing. So the answer is not \"one codon\" -- it is anything from **nothing** to **the entire rest of the protein**.",
            options: [
                { id: 'cont', label: "Put numbers on both kinds.", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "First the vocabulary, then the counting.\n\nThe **reading frame** is where the three-letter groups begin: from the start codon, the bases are taken three at a time, and nothing marks the boundaries.\n\n**Two kinds of mistake:**\n\n**Substitution** -- one base swapped for another. The reading frame survives, so only that codon is affected. Three outcomes:\n\n- **silent**: the new codon names the **same** amino acid, so the protein is identical\n- **changes the amino acid**: a different amino acid goes in at that one place\n- **involves a stop**: a stop codon appears early, or a real one is destroyed\n\n**Insertion or deletion** -- a base added or lost. Unless the number of **bases inserted** or removed is a multiple of **3**, the reading frame shifts and every codon downstream is **garbled**. That is a **frameshift**.\n\nNow the counting. Each codon has 3 positions, and at each position 3 other letters could have been written, so there are **9** possible substitutions per codon and:\n\n**64 codons x 9 = 576** possible single substitutions in the whole code\n\nOf those 576, exactly **138 are silent** -- about **24%**. Which already answers the opening question: a quarter of single wrong letters change nothing whatsoever.\n\nThe condition: **this counts every substitution as equally likely**, which is not quite true of real chemistry -- some swaps happen more readily than others.",
            options: [
                { id: 'cont', label: "Is that 24% spread evenly?", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "Not remotely. Split the 576 by **position in the codon** -- 192 possible changes at each -- and the code's design appears:\n\n| Position in the codon | Silent | Changes the amino acid | Involves a stop |\n| --- | --- | --- | --- |\n| **first** | 8 (**4%**) | 166 (86%) | 18 (9%) |\n| **second** | 2 (**1%**) | 176 (92%) | 14 (7%) |\n| **third** | **128 (67%)** | 50 (26%) | 14 (7%) |\n\nThe third letter of a codon is **sixteen times** more likely to be silent than the first, and sixty-four times more likely than the second.\n\n**Why.** The code is arranged in families that share their first two letters. Alanine answers to **GCU, GCC, GCA and GCG** -- all four third letters. So for alanine:\n\n**third-position changes that are silent = 3 of 3 = 100%**\n\nFive amino acids have all four third letters like this, and three more have six codons each. Nine have a pair.\n\n**The exceptions.** Two amino acids have exactly **one** codon: methionine (**AUG**) and tryptophan (**UGG**). For those:\n\n**third-position changes that are silent = 0 of 3 = 0%**\n\nSo the third position is not protected because chemistry is kind there. It is protected because **the spare 43 codons were spent on third letters** -- L2B14's leftovers turn out to be a shield, and it is unevenly distributed.",
            options: [
                { id: 'try', label: "Now the other kind of mistake.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A gene is **450 bases** long. One base is **inserted** just after base **60**.\n\nHow many of its codons still read correctly, and how many are garbled?",
            options: [
                { id: 'right', label: "20 codons untouched and 130 garbled, out of 150.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'one_codon', label: "149 read correctly and 1 is garbled -- the codon the base landed in.", nextNodeId: 'math_wrong' },
                { id: 'swapped', label: "130 untouched and 20 garbled.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**One garbled codon** is the answer for a **substitution**, not an insertion. An inserted base pushes every later base one place along, so the frame shifts for all of them.\n\n**130 untouched and 20 garbled** has it backwards: the damage runs **downstream**, from the insertion to the end of the gene. Everything **before** it is untouched.\n\n**Step 1.** codons in the gene = 450 / 3 = **150**\n\n**Step 2.** codons finished before the insertion = 60 / 3 = **20** -- these are untouched\n\n**Step 3.** garbled = 150 − 20 = **130**, which is **87%** of the protein\n\nA single missing or extra base, one-450th of the gene, destroys seven-eighths of the product. And the earlier it lands, the worse it is -- which is the reverse of the substitution case, where **where** it lands inside the codon mattered but where it lands along the gene did not.",
            options: [
                { id: 'retry', label: "Everything downstream, not just one codon.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials, one for each kind of mistake.\n\n**Position in the Codon** picks which of the three letters is swapped, and the lab shows how the 192 possible changes at that position turn out: how many are silent, how many change the amino acid, and how many involve a stop. **Bases Inserted** adds bases to a 150-codon gene just after codon 20.\n\nTry this:\n\n- Move **Position in the Codon** to **3**: the silent share jumps to **67%**, against **4%** at the first and **1%** at the second\n- Set **Bases Inserted** to **1**: the reading frame shifts, 20 codons stay untouched and 130 are garbled\n- Set it to **2**: still a frameshift, just as bad\n- Set it to **3**: the frame **survives** -- three bases is one whole codon, so the gene reads correctly again with one extra amino acid in it",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "A multiple of three keeps the frame. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** A student reads the table and concludes: *24% of single letter swaps are silent, and the rest change one amino acid out of hundreds, so substitutions are basically harmless. Only frameshifts really matter.*\n\nIn the gene for haemoglobin's beta chain -- **146** amino acids long -- a single substitution in the **sixth** codon puts valine where glutamic acid belongs. That one change alters the shape red blood cells take, and causes sickle cell disease.\n\nWhat is wrong with the student's reasoning?",
            options: [
                { id: 'right', label: "It confuses how often with how much. The 24% is a probability, not a measure of consequence -- and the remaining 76% are not scaled by how much of the protein changed. One amino acid in 146 can sit exactly where the molecule's shape depends on it, so a substitution's effect depends on which amino acid, not on how many.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "The table must be wrong about the 24%, since a single substitution clearly can cause a serious disease.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "The 24% is exact -- it is a complete count of the code, not a survey of outcomes. Both statements are true at once, because they measure **different things**.\n\n| The question | The answer |\n| --- | --- |\n| How often is a single swap silent? | 138 of 576, **24%** |\n| How much of the protein does the rest change? | **one** amino acid |\n| How much does that one amino acid matter? | **anything from nothing to everything** |\n\nThat last row is not in the table, and cannot be: it depends on the protein, not on the code. Most positions in most proteins tolerate a swap. A few do not, because the whole molecule's shape hinges on them -- and shape is what a protein's job is made of.\n\nSo the two kinds of mistake fail in different ways, and neither is safe:\n\n- a **frameshift** is reliably catastrophic, and you can predict that from arithmetic alone\n- a **substitution** is usually mild and occasionally severe, and **no** amount of counting codons tells you which, because the answer lives in the protein's shape\n\n**A number that says how likely something is can never tell you how much it matters.** That is a habit worth carrying well beyond genetics.",
            options: [
                { id: 'retry', label: "How often is not how much.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **The code's spare codons make a quarter of single swaps invisible, but which letter changes decides everything -- and a shifted reading frame is a different order of failure altogether.**\n\nSo Level 3 removed L2B14's simplification. **The code is not a perfect lookup table**, and the 43 spare codons it seemed to have going begging are doing real work: they sit almost entirely in the third position, where they absorb two-thirds of the mistakes.\n\nThat closes Big Idea 14. All three lessons at Level 3 removed an assumption about how cleanly a code behaves:\n\n- **L3P14** -- a signal is not born digital. **rate ≥ 2 x the highest frequency**, or sampling forges tones that were never played: 30,000 Hz comes back as 14,100 Hz\n- **L3C14** -- a polar bond is not a polar molecule. **2 x bond dipole x cos(A/2)**: carbon dioxide's arrows cancel to 0 D, water's bend adds to 1.84 D\n- **L3B14** -- the genetic code is not a perfect table. **138 of 576** single swaps are silent, **128 of them at the third position**, while one inserted base garbles 130 of 150 codons\n\n**How is information coded and transmitted? Through a physical system that has to be measured, shaped and copied -- so a code is only as good as its protection against the ways those three things go wrong.**\n\n**What is still standing in this lesson:** every substitution was counted as **equally likely**, and cells were given no **repair machinery** -- in reality proofreading catches the great majority of copying mistakes before they ever reach a protein.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "The spares are a shield!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You counted what copying mistakes do.**\n\n- The **reading frame** is where the three-letter groups begin; nothing marks the boundaries\n- A **substitution** keeps the frame, so only one codon is affected: **silent**, **changes the amino acid**, or **involves a stop**\n- Each codon allows 9 substitutions, so the code allows **64 x 9 = 576**\n- **138 of 576 are silent -- about 24%**\n- Split by **position in the codon**, 192 changes each: first **8 (4%)**, second **2 (1%)**, third **128 (67%)**\n- Alanine answers to GCU, GCC, GCA and GCG, so all **3 of 3** third-position changes are silent\n- Methionine (**AUG**) and tryptophan (**UGG**) have one codon each: **0 of 3**\n- The protection is not chemistry -- it is where L2B14's **43 spare codons** were spent\n- An **insertion** or deletion shifts the frame unless it is a multiple of **3**: a **frameshift**\n- One base inserted after base 60 of a 450-base gene: **20 codons untouched, 130 garbled -- 87%**\n- Three bases inserted keeps the frame, adding one amino acid\n- One substitution in codon 6 of a **146**-amino-acid chain causes sickle cell disease: **how often is not how much**\n- Removed: L2B14's perfect lookup table\n- Still standing: equally likely substitutions, and no repair machinery",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Third position, and keep the frame!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 3 Complete -- Which Mistakes Matter?**\n\nL2B14 counted what the code can say. Level 3 counts what happens when it is written down wrongly.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Substitutions in the code | **64 x 9 = 576** | 9 possible swaps per codon |\n| Silent overall | **138 of 576** | About 24% change nothing |\n| First position | 8 of 192 | **4%** silent |\n| Second position | 2 of 192 | **1%** silent |\n| Third position | **128 of 192** | **67%** silent |\n| A four-codon family | 3 of 3 | Alanine: all third letters work |\n| A single-codon family | 0 of 3 | Methionine and tryptophan |\n| Frameshift | not a multiple of **3** | Every codon downstream garbled |\n| 450 bases, insert after 60 | 150 − 20 | **130 garbled, 87%** |\n| One swap in 146 | sickle cell disease | How often is not how much |\n| Removed | the perfect lookup table | Copying makes mistakes |\n| Still standing | equal odds, no repair | Proofreading catches most |\n\n**The one line to remember:** the code's spare codons sit almost entirely in the third letter of each codon, so two-thirds of mistakes there are invisible -- while a single added base, by shifting the reading frame, destroys everything after it.\n\n**Big Idea 14 is complete at Level 3.**"
        }
    };
}
