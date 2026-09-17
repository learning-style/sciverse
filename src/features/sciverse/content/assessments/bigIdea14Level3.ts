import { AssessmentData } from '../../types';

/**
 * Big Idea 14 Assessment -- LEVEL 3 (grades 9-12).
 * Covers L3P14 (sampling rate, bit depth and aliasing), L3C14 (bond dipoles as
 * vectors: 2 x bond dipole x cos(A/2)), L3B14 (silent substitutions by codon
 * position, and frameshifts).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea14Level3Assessment: AssessmentData = {
    bigIdea: 14,
    level: 3,
    title: 'How Is Information Coded and Transmitted?',
    subtitle: 'Level 3 -- Sampling, Vector Dipoles and Copying Mistakes',
    icon: '🎚️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A sample, in digital audio, is:',
            options: ['One measurement of the wave\'s height', 'One complete cycle of the wave', 'One bit of the stored file', 'One second of sound'],
            correctIndex: 0,
            hint: 'It is a reading, taken at an instant.',
            explanation: 'Sampling replaces a smoothly changing voltage with a list of measured heights, taken at a fixed rate and each stored as a whole number of bits.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'The Nyquist frequency of a recording is:',
            options: ['Twice the sampling rate', 'Half the sampling rate', 'The same as the sampling rate', 'The number of bits in each sample'],
            correctIndex: 1,
            hint: 'It is the highest frequency that can be captured.',
            explanation: 'The rule needs at least two samples per cycle, so the highest capturable frequency is half the sampling rate. At 44,100 samples each second that is 22,050 Hz.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'A bond dipole is drawn as an arrow pointing:',
            options: ['From the more electronegative atom to the less', 'From the less electronegative atom to the more', 'Along the molecule\'s line of symmetry', 'Towards whichever atom is larger'],
            correctIndex: 1,
            hint: 'It points the way the electrons have been pulled.',
            explanation: 'The arrow runs towards the stronger puller, which is the partial negative end. Its length is how unevenly the electrons are shared, measured in debyes.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'The reading frame of a gene is:',
            options: ['Where the three-letter groups begin', 'The protein a gene codes for', 'The number of codons in the gene', 'The part of the gene that never changes'],
            correctIndex: 0,
            hint: 'Nothing marks the boundaries between codons.',
            explanation: 'From the start codon, bases are taken three at a time. There are no markers between codons, so anything that shifts the count garbles every codon after it.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'A compact disc takes 44,100 samples each second, 16 bits per sample, in 2 channels. Its bit rate is:',
            options: ['705,600 bits each second', '44,132 bits each second', '1,411,200 bits each second', '88,200 bits each second'],
            correctIndex: 2,
            hint: 'Multiply all three.',
            explanation: 'bit rate = samples each second x bits in a sample x channels = 44,100 x 16 x 2 = 1,411,200 bit/s. Over a 3-minute song that is 254,016,000 bits, or about 31.8 MB.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Carbon dioxide is linear and each C=O bond dipole is about 1.2 D. What is the molecule\'s dipole?',
            options: ['2.4 D, because the two bond dipoles add', '1.2 D, the same as one bond', '0 D, because cos 90° = 0', '0.6 D, the average of the two'],
            correctIndex: 2,
            hint: 'Halve the 180° bond angle before taking the cosine.',
            explanation: 'molecule dipole = 2 x 1.2 x cos(180/2) = 2 x 1.2 x 0 = 0 D. Two strongly polar bonds pointing dead opposite cancel exactly, which is why carbon dioxide behaves as a nonpolar substance.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'One base is inserted just after base 60 of a 450-base gene. How many of its 150 codons are garbled?',
            options: ['1', '20', '130', '150'],
            correctIndex: 2,
            hint: 'The damage runs downstream from the insertion.',
            explanation: '60 / 3 = 20 codons finish before the insertion and are untouched. The remaining 150 − 20 = 130 codons -- 87% of the protein -- are read in the wrong frame.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'A vibration sensor takes 500 samples each second at 12 bits. What is its bit rate, and what is the highest frequency it can honestly capture?',
            options: ['6,000 bit/s, up to 250 Hz', '6,000 bit/s, up to 1,000 Hz', '512 bit/s, up to 250 Hz', '6,000 bit/s, up to 500 Hz'],
            correctIndex: 0,
            hint: 'Multiply for bits; halve for frequency.',
            explanation: '500 x 12 = 6,000 bits each second, and the Nyquist frequency is 500 / 2 = 250 Hz. A sensor cannot capture anything faster than half its own rate.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A 30,000 Hz tone is sampled at 44,100 samples each second. Played back, there is a 14,100 Hz whistle. Why can it not simply be removed afterwards?',
            options: ['It can be, with a filter on playback', 'The stored samples are exactly those a real 14,100 Hz wave would give, so nothing marks the false tone as false', 'The whistle is a fault in the microphone, not the samples', 'Because 14,100 Hz is inaudible anyway'],
            correctIndex: 1,
            hint: 'Ask what the numbers themselves record.',
            explanation: 'Sampled below twice its frequency, the fast tone leaves the same numbers a slower one would: 44,100 − 30,000 = 14,100 Hz. It is now ordinary data. That is why converters filter out everything above the Nyquist frequency before sampling -- the 4,100 spare samples beyond the 40,000 minimum give that filter room to work.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Tetrachloromethane has four polar C-Cl bonds and a dipole of 0 D. Replacing one chlorine with hydrogen gives a dipole of 1.04 D. What does this show?',
            options: ['Symmetry is what cancels a dipole, not the sizes of the atoms', 'Hydrogen is more electronegative than chlorine', 'C-Cl bonds are not really polar', 'Smaller molecules are always more polar'],
            correctIndex: 0,
            hint: 'Ask what the four arrows were doing before the swap.',
            explanation: 'Four identical arrows pointing to the corners of a tetrahedron sum to zero, however polar each is. Swapping one for a shorter C-H arrow -- which points the other way, since carbon at 2.5 outpulls hydrogen at 2.1 -- leaves the other three unbalanced. Trichloromethane dissolves what tetrachloromethane cannot, purely because of that 1.04 D.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Of the 192 possible single-base changes at each codon position, 8 are silent at the first, 2 at the second and 128 at the third. Why is the third position so much better protected?',
            options: ['The third base is chemically harder to damage', 'Because the code\'s 43 spare codons were spent almost entirely on third letters, so families like GCU, GCC, GCA and GCG all name one amino acid', 'Because the third base is read last', 'Because most proteins do not use their third bases'],
            correctIndex: 1,
            hint: 'Think about where L2B14\'s leftover codons went.',
            explanation: '64 codons for 21 signals left 43 spares, and the code spent them on third letters. Alanine answers to all four of GCU, GCC, GCA and GCG, so all 3 of its third-position changes are silent. The protection is uneven: methionine (AUG) and tryptophan (UGG) have one codon each, so 0 of 3.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: '138 of 576 single-base substitutions are silent, and the rest change just one amino acid. Why does that not make substitutions harmless?',
            options: ['It does -- only frameshifts cause real harm', 'Because 138 is an underestimate of the true figure', 'Because how often something happens says nothing about how much it matters: one amino acid in 146 causes sickle cell disease', 'Because substitutions usually come in pairs'],
            correctIndex: 2,
            hint: 'Two different quantities are being confused.',
            explanation: 'The 24% is an exact count of the code, and the rest really do change one amino acid. Neither says how much that amino acid matters -- which depends on the protein\'s shape, not on the code. In haemoglobin\'s 146-amino-acid beta chain, one substitution in codon 6 causes sickle cell disease. A frameshift is reliably catastrophic and predictable from arithmetic; a substitution is usually mild and occasionally severe, and no amount of counting codons tells you which.'
        }
    ]
};
