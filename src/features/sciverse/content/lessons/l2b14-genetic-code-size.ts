import { DialogNode } from '../../types';

/**
 * Level 2 (grades 6-8) companion to B14 "DNA & Genetics". The synthesis lesson.
 *
 * B14 said codons are three bases long. This lesson shows why three: 4^1 = 4
 * and 4^2 = 16 cannot label 20 amino acids plus a stop, while 4^3 = 64 can,
 * with room to spare. It then joins the code to L2P14's bits -- four bases is
 * 2 bits each -- and sizes the human genome at 750 MB.
 *
 * Condition stated: every codon the same length, read in non-overlapping
 * threes. Held fixed and named for Level 3: the code treated as a perfect
 * lookup table, with no copying mistakes.
 */
export function getL2B14Script(): Record<string, DialogNode> {
    return {
        root: {
            id: 'root',
            speaker: 'AI',
            content: "B14 found that DNA spells its instructions with four letters -- **A, T, G, C** -- and that the words, called **codons**, are exactly **three** letters long. Each word names one of the **20 amino acids** that proteins are built from, or says **stop**.\n\nThree letters is a strange number to land on. Why not one letter for each amino acid, or two?\n\nWhat do you think forced the word length to be three?",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'intro' } },
            options: [
                { id: 'good', label: "Counting. One letter gives only 4 words and two letters only 16 -- too few for 20 amino acids and a stop signal. Three letters gives far more than enough.", nextNodeId: 'defining', sentiment: 'positive' },
                { id: 'bad', label: "Two letters would be enough: 4 letters x 2 positions = 8 words, and with a stop that covers 20 amino acids.", nextNodeId: 'misconception' }
            ]
        },
        misconception: {
            id: 'misconception',
            speaker: 'AI',
            content: "Careful with that multiplication. **4 x 2 = 8** counts letters and positions, not **words**.\n\nWrite the two-letter words out. The first letter can be A, T, G or C -- four choices. And for **each** of those, the second letter can again be any of four:\n\nAA, AT, AG, AC, TA, TT, TG, TC, GA, GT, GG, GC, CA, CT, CG, CC\n\nThat is **16** words: 4 x 4, not 4 + 4 and not 4 x 2.\n\nThis is L2P14's counting in a different alphabet. There, each extra **bit** doubled the patterns because a bit has 2 states. Here each extra **base** multiplies by 4, because a base has 4 states.\n\nAnd 16 is still not enough for 20 amino acids plus a stop signal. So the words must be longer.",
            options: [
                { id: 'cont', label: "How many does three letters give?", nextNodeId: 'defining' }
            ]
        },
        defining: {
            id: 'defining',
            speaker: 'AI',
            content: "With **4** letters and **L** positions:\n\n**number of codons = 4ᴸ**\n\n| Letters in a word | Codons | Enough for 21 signals? |\n| --- | --- | --- |\n| 1 | 4 | no |\n| 2 | **16** | no -- so close, and still no |\n| 3 | **64** | **yes**, with room to spare |\n\nThe target is **21**: twenty amino acids and at least one **stop**. Two letters misses by five; three letters overshoots by forty-three. There is nothing in between, because the count jumps by a factor of 4 each time.\n\nSo the genetic code has **64 codons for 21 jobs** -- about **three** codons for each job on average. Those spares are not waste. Most amino acids answer to several codons, which is what B14 meant by calling the code robust.\n\nAnd there is a second way to count the same thing, borrowed from L2P14. Four letters is exactly what **2 bits** can label: 00, 01, 10, 11. So:\n\n**each base carries 2 bits of information**\n\nThe condition belongs here. **Every codon is the same length, and the bases are read in non-overlapping threes** from a fixed starting point. Nothing in the chemistry forces that -- it is how the machinery happens to read.",
            options: [
                { id: 'cont', label: "Work out some real sizes.", nextNodeId: 'worked' }
            ]
        },
        worked: {
            id: 'worked',
            speaker: 'AI',
            content: "**A small protein.** Insulin's A chain is **21 amino acids** long.\n\n**Step 1.** bases for the amino acids = 21 x 3 = **63**\n\n**Step 2.** plus a stop codon: 63 + 3 = **66 bases**\n\n**The whole genome, in bits.** A human cell carries about **3 billion** base pairs in each set.\n\n**Step 1.** bits = 3,000,000,000 x 2 = **6,000,000,000 bits**\n\n**Step 2.** bytes = 6,000,000,000 / 8 = **750,000,000 bytes = 750 MB**\n\nThe entire instruction set for building a human fits on one old-fashioned data disc -- and a copy sits inside almost every one of your cells.\n\n| | Count | Working |\n| --- | --- | --- |\n| Codons available | **64** | 4³ |\n| Jobs to label | **21** | 20 amino acids + stop |\n| Codons for each job | about **3** | 64 / 21 |\n| Bits in one base | **2** | 4 = 2² |\n| The genome | **750 MB** | 3 billion x 2 bits, in bytes |\n\nCompare that with L2P14's photo: one 12-megapixel picture, uncompressed, came to 36 MB. It takes **21** of those to fill the space that holds the instructions for a whole person -- 21 x 36 = 756 MB.",
            options: [
                { id: 'try', label: "Let me work one out.", nextNodeId: 'math_check' }
            ]
        },
        math_check: {
            id: 'math_check',
            speaker: 'AI',
            content: "**Your turn.** A protein is **450 amino acids** long.\n\nHow many bases of DNA are needed to spell it out, including one stop codon?",
            options: [
                { id: 'right', label: "1,353 bases. 450 x 3 = 1,350 for the amino acids, plus 3 for the stop.", nextNodeId: 'explore', sentiment: 'positive' },
                { id: 'no_stop', label: "450 bases, because each amino acid needs one base.", nextNodeId: 'math_wrong' },
                { id: 'divided', label: "150 bases, because 450 / 3 = 150.", nextNodeId: 'math_wrong' }
            ]
        },
        math_wrong: {
            id: 'math_wrong',
            speaker: 'AI',
            content: "**450 bases** gave each amino acid one base. But one base has only 4 possible values, and there are 20 amino acids to name -- which is exactly why the code needs three bases for each one.\n\n**150 bases** divided by 3 instead of multiplying. Check the direction: the DNA must be **longer** than the protein it describes, because every amino acid costs three letters.\n\n**Step 1.** bases for the amino acids = 450 x 3 = **1,350**\n\n**Step 2.** the stop codon is three more: 1,350 + 3 = **1,353 bases**",
            options: [
                { id: 'retry', label: "Three bases for each amino acid.", nextNodeId: 'explore' }
            ]
        },
        explore: {
            id: 'explore',
            speaker: 'AI',
            content: "Two dials.\n\n**Letters in the Alphabet** is how many different bases the code uses -- life uses 4, but the lab lets you try others. **Letters in a Word** is the codon length.\n\nThe lab works out how many words that makes, compares it with the **21** signals life needs, and shows how many bits each letter carries.\n\nTry this:\n\n- Set **4** letters and **3** positions: 64 words, comfortably enough\n- Drop to **2** positions: 16 words -- five short, however you arrange them\n- Keep 3 positions and drop to **2** letters: 8 words. A two-letter alphabet would need **5** positions for 32 words\n- Set **20** letters and **1** position: 20 words, one for each amino acid -- and nothing left over to say **stop**, so it is one short",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'explore' } },
            options: [
                { id: 'cp', label: "Words = letters to the power of positions. Test me.", nextNodeId: 'checkpoint' }
            ]
        },
        checkpoint: {
            id: 'checkpoint',
            speaker: 'AI',
            content: "**Checkpoint.** Three bases give **64** codons for only **21** jobs -- three times more than the code needs.\n\nA student suggests: *if spares are useful, four bases would give 256 codons and be even more robust. Why did life not go further?*\n\nWhat is the cost of a longer codon?",
            options: [
                { id: 'right', label: "Length. A four-base codon would make every gene a third longer, so every protein would cost more bases to store, more time to copy and more chances of a copying mistake. Three is the shortest word length that works, and spare codons come free with it.", nextNodeId: 'checkpoint_correct', sentiment: 'positive' },
                { id: 'wrong', label: "There is no cost -- four bases would simply be better, so the code must still be evolving towards it.", nextNodeId: 'checkpoint_wrong' }
            ]
        },
        checkpoint_wrong: {
            id: 'checkpoint_wrong',
            speaker: 'AI',
            content: "Every extra base in a codon has to be stored, copied and read -- for every amino acid of every protein in every cell.\n\nTake that 450-amino-acid protein:\n\n| Codon length | Bases needed | Extra |\n| --- | --- | --- |\n| 3 | 1,353 | -- |\n| 4 | 1,803 | **450 more bases** |\n\nAcross a genome of some 20,000 genes, a four-base codon would add hundreds of thousands of bases to copy every time a cell divides -- more work, more time, and more opportunities for the copying mistakes that Level 3 looks at.\n\nAnd the benefit would be small. 64 codons already give roughly three per job; 256 would give twelve, which buys little that matters.\n\n**Three is the smallest word length that can name 21 things in a four-letter alphabet.** The robustness came along as a bonus, not as the goal.",
            options: [
                { id: 'retry', label: "Longer words cost length everywhere.", nextNodeId: 'checkpoint_correct' }
            ]
        },
        checkpoint_correct: {
            id: 'checkpoint_correct',
            speaker: 'AI',
            content: "Correct. **Three letters is the shortest word that a four-letter alphabet can use to name twenty amino acids and a stop -- and the 43 spare codons are a free gift.**\n\nThat completes Big Idea 14 at Level 2, and all three lessons counted the same thing: how much a code can say.\n\n- **L2P14** -- **patterns = 2ⁿ**: 8 bits give 256, enough for text, and the bit rate turns bits into seconds\n- **L2C14** -- **difference = higher − lower electronegativity**: one subtraction sorts a bond into nonpolar, polar or ionic\n- **L2B14** -- **codons = 4ᴸ**: 4³ = 64 for 21 jobs, and each base carries **2 bits**, so a genome is **750 MB**\n\n**How is information coded and transmitted? With an alphabet of a few symbols, combined into words -- and the number of symbols and the length of the words decide everything the code can ever say.**\n\nOne thing this lesson held fixed: **the code was treated as a perfect lookup table.** Copying DNA is not perfect, and a single wrong letter can be harmless or catastrophic depending on **where** it lands. Level 3 works out which mistakes matter.",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'checkpoint' } },
            options: [
                { id: 'disc', label: "Four to the power of three!", nextNodeId: 'discovery' }
            ]
        },
        discovery: {
            id: 'discovery',
            speaker: 'AI',
            content: "**You worked out why codons are three letters long.**\n\n- With 4 letters and L positions: **codons = 4ᴸ**\n- Each extra base multiplies the words by **4**, just as each extra bit doubles them in L2P14\n- 1 letter: **4** words; 2 letters: **16**; 3 letters: **64**\n- The code must label **21** things: 20 amino acids and a **stop**\n- 16 misses by five, so **three** is the shortest word length that works\n- 64 codons for 21 jobs is about **3** codons each -- the spares make the code robust\n- Four letters is what **2 bits** can label, so **each base carries 2 bits**\n- Insulin's A chain, 21 amino acids: 21 x 3 + 3 = **66 bases**\n- A 450-amino-acid protein: 450 x 3 + 3 = **1,353 bases**\n- The genome: 3 billion x 2 bits = 6 billion bits = **750 MB**\n- A four-base codon would lengthen every gene by a third for little gain\n- Condition: equal-length codons, read in non-overlapping threes\n- Held fixed: the code as a perfect lookup table, with no copying mistakes",
            onEnterAction: { type: 'SET_VISUAL', payload: { phase: 'discovery' } },
            options: [
                { id: 'done', label: "Letters to the power of positions!", nextNodeId: 'complete' }
            ]
        },
        complete: {
            id: 'complete',
            speaker: 'AI',
            content: "**Level 2 Complete -- Why Three Letters?**\n\nB14 spelled out the four-letter code. Level 2 counts what it can say.\n\n**Summary Table:**\n| Idea | The Maths | What It Means |\n| --- | --- | --- |\n| Counting words | **4ᴸ** | Each base multiplies by 4 |\n| One letter | 4 | Far too few |\n| Two letters | **16** | Five short of 21 |\n| Three letters | **64** | Enough, with 43 spare |\n| Jobs to label | 21 | 20 amino acids + stop |\n| Bits in a base | **2** | 4 = 2², from L2P14 |\n| A gene | **amino acids x 3 + 3** | 450 needs 1,353 bases |\n| The genome | 3 billion x 2 bits | **750 MB** |\n| Why not four letters | every gene a third longer | More to copy, more mistakes |\n\n**The one line to remember:** a four-letter alphabet needs three-letter words to name twenty amino acids and a stop -- and that single counting fact fixes the shape of life's code.\n\n**Big Idea 14 is complete at Level 2.**"
        }
    };
}
