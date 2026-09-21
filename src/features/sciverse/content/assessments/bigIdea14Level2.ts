import { AssessmentData } from '../../types';

/**
 * Big Idea 14 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P14 (patterns = 2^n, and time = total bits / bit rate), L2C14 (the
 * electronegativity difference deciding nonpolar, polar or ionic), L2B14 (why
 * codons are three bases: 4^3 = 64 for 21 signals, at 2 bits a base).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea14Level2Assessment: AssessmentData = {
    bigIdea: 14,
    level: 2,
    title: 'How Is Information Coded and Transmitted?',
    subtitle: 'Level 2 -- Bits, Bond Differences and the Three-Letter Code',
    icon: '📶',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A bit is:',
            options: ['One switch, either 1 or 0', 'One letter of the alphabet', 'A million bytes', 'The speed of a connection'],
            correctIndex: 0,
            hint: 'It is the smallest piece of a signal.',
            explanation: 'A bit holds one of two values. Eight of them make a byte, and the letter A travels as the eight bits 01000001.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'How many different patterns can 3 bits make?',
            options: ['6', '8', '3', '9'],
            correctIndex: 1,
            hint: 'Each bit doubles the count.',
            explanation: 'patterns = 2³ = 8: 000, 001, 010, 011, 100, 101, 110 and 111. It is 2 x 2 x 2, not 3 x 2.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Electronegativity measures:',
            options: ['How heavy an atom is', 'How many electrons an atom owns', 'How strongly an atom pulls on the electrons in a bond', 'How much charge an ion carries'],
            correctIndex: 2,
            hint: 'Think of a tug of war over shared electrons.',
            explanation: 'It is a pull, compared between atoms, so it has no units. Fluorine pulls hardest and is set at 4.0; sodium manages only 0.9.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'A codon is:',
            options: ['Three bases of DNA, naming one amino acid or a stop', 'One base of DNA', 'A whole gene', 'One of the 20 amino acids'],
            correctIndex: 0,
            hint: 'It is a word, not a letter.',
            explanation: 'DNA spells with four letters and reads them in threes. Each three-letter word names one amino acid, or says stop.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A sensor sends 200 characters, each 8 bits, over a link carrying 400 bits per second. How long does it take?',
            options: ['0.5 s', '1,600 s', '4 s', '25 s'],
            correctIndex: 2,
            hint: 'Turn the message into bits first.',
            explanation: '200 x 8 = 1,600 bits, and 1,600 / 400 = 4 s. Dividing characters by the bit rate mismatches the units -- the link counts bits, not characters.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Carbon is 2.5 and oxygen is 3.5. What kind of bond do they make?',
            options: ['Ionic, because the difference is 2.0', 'Polar covalent, because the difference is 1.0', 'Nonpolar covalent, because the difference is 1.0', 'Ionic, because both values are high'],
            correctIndex: 1,
            hint: 'Subtract, then read which band it lands in.',
            explanation: '3.5 − 2.5 = 1.0, which sits between 0.4 and 1.7: shared electrons, pulled towards oxygen. Adding the values, or using one of them alone, predicts nothing.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A protein is 450 amino acids long. How many bases of DNA spell it out, including one stop codon?',
            options: ['450', '150', '1,350', '1,353'],
            correctIndex: 3,
            hint: 'Three bases each, and the stop needs three of its own.',
            explanation: '450 x 3 = 1,350, plus 3 for the stop codon = 1,353 bases. The DNA is always longer than the protein it describes.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Five bits give 32 patterns, more than the 26 letters. So why does text use 7 or 8 bits a character?',
            options: ['More bits make the link faster', 'Because text needs about 95 printable symbols once capitals, digits and punctuation are counted', 'Because 5 is an odd number', 'Because letters need more bits than digits do'],
            correctIndex: 1,
            hint: 'Count everything on a keyboard, not just the letters.',
            explanation: '26 small letters + 26 capitals + 10 digits + about 33 punctuation marks and a space is roughly 95 symbols. 2⁵ = 32 and 2⁶ = 64 are both too few, so ASCII -- the American Standard Code for Information Interchange -- uses 7 bits (128), stored in a byte of 8. More bits make a message longer, not faster.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Hydrogen and fluorine differ by 1.9, which the rule calls ionic -- yet hydrogen fluoride is a gas made of molecules that share electrons. What does this show?',
            options: ['The electronegativity values must be wrong', 'Hydrogen fluoride is really an ionic crystal', 'The 1.7 boundary is a rule of thumb, and bonding shades gradually from sharing to handing over', 'Gases cannot contain polar bonds'],
            correctIndex: 2,
            hint: 'Ask whether nature has a switch at 1.7.',
            explanation: 'Nothing flips at 1.7. As the difference grows, the shared electrons simply sit further off centre until calling them shared stops being useful. H-F is the most extremely polar covalent bond there is, and it sits just past the line. Near a boundary, check the substance.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'If spare codons make the code robust, why did life not use four-base codons and get 256 of them?',
            options: ['Four bases would give fewer words, not more', 'Every gene would be a third longer to store, copy and read, for very little gain', '256 is not enough for 20 amino acids', 'Four-base codons cannot be read by any cell'],
            correctIndex: 1,
            hint: 'Count the cost, not just the benefit.',
            explanation: 'A 450-amino-acid protein needs 1,353 bases at three bases a codon and 1,803 at four -- 450 extra bases, in every such gene, copied at every cell division. 64 codons already give about three per job. Three is the shortest word length that can label 21 things with four letters.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A 12-megapixel photo at 24 bits a pixel works out at 288 million bits, or 36 MB -- but the file on a phone is nearer 3 MB. What explains the gap?',
            options: ['The phone throws away most of the pixels', 'The calculation should have used 8 bits a pixel', 'The photo is compressed: common patterns are given shorter codes, which the fixed-length sum assumes away', 'Megabytes and millions of bits are the same thing'],
            correctIndex: 2,
            hint: 'Look at the condition the formula came with.',
            explanation: '36 MB is the cost with every pixel given the same 24 bits and nothing squeezed out. Compression drops that roughly tenfold with no visible change, which is exactly the condition the fixed-length calculation states.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Four bases can be labelled by 2 bits, so a genome of 3 billion bases holds 6 billion bits. Why is that a fair way to measure DNA?',
            options: ['Because DNA is made of switches like a computer', 'Because any code with 4 symbols carries exactly as much choice per symbol as 2 bits do, so it comes to 750 MB', 'Because DNA and computer files both use the letters A and C', 'Because every cell contains a copy, so the totals must match'],
            correctIndex: 1,
            hint: 'It is about counting choices, not about chemistry.',
            explanation: 'Information is measured by how many choices a symbol settles. 4 = 2², so one base settles as much as two bits: 3 billion x 2 = 6 billion bits, which is 750 MB -- about 21 uncompressed 36 MB photos. The same counting covers bits, bonds and bases.'
        }
    ]
};
