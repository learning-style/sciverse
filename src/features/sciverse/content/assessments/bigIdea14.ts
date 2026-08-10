import { AssessmentData } from '../../types';

export const bigIdea14Assessment: AssessmentData = {
    bigIdea: 14,
    title: 'How Is Information Coded and Transmitted?',
    subtitle: 'Waves, Bonding & DNA',
    icon: '🎯',
    questions: [
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'Digital signals in electronics are physically transmitted as:',
            options: ['Nothing physical', 'Waveforms with discrete states', 'Only mechanical gears', 'Purely chemical diffusion'],
            correctIndex: 1,
            hint: '1s and 0s are represented by voltage states over time.',
            explanation: 'Digital information is carried by physical signals (often square-like waveforms).'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'An ionic bond forms primarily by:',
            options: ['Equal sharing of electrons', 'Transfer of electrons and electrostatic attraction', 'No electron interaction', 'Nuclear fusion'],
            correctIndex: 1,
            hint: 'Think Na and Cl.',
            explanation: 'Ionic bonding involves electron transfer and attraction between ions.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In DNA base pairing, adenine pairs with:',
            options: ['Cytosine', 'Guanine', 'Thymine', 'Uracil'],
            correctIndex: 2,
            hint: 'A-T and G-C in DNA.',
            explanation: 'A pairs with T, while G pairs with C.'
        },
        {
            id: 4,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'If wave speed is constant in a medium, increasing frequency causes wavelength to:',
            options: ['Increase', 'Decrease', 'Stay random', 'Become zero always'],
            correctIndex: 1,
            hint: 'v = fλ.',
            explanation: 'With fixed speed, frequency and wavelength are inversely related.'
        },
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Water (H2O) bonds are best described as:',
            options: ['Pure ionic', 'Nonpolar covalent', 'Polar covalent', 'Metallic'],
            correctIndex: 2,
            hint: 'Electrons are shared unevenly toward oxygen.',
            explanation: 'O-H bonds are polar covalent due to electronegativity difference.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A codon is:',
            options: ['A DNA strand of 100 bases', 'A 3-base sequence specifying an amino acid/start-stop signal', 'A chromosome pair', 'An enzyme'],
            correctIndex: 1,
            hint: 'Triplet code.',
            explanation: 'Codons are triplets that map to amino acids or control signals.'
        },
        {
            id: 7,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Best cross-disciplinary statement is:',
            options: ['Information needs no physical medium', 'Encoding requires structure + transmission rules', 'Only computers encode data', 'Biology and physics do not encode information'],
            correctIndex: 1,
            hint: 'Compare binary, bonding arrangements, and DNA code.',
            explanation: 'Across domains, information depends on structured symbols and physical carriers.'
        },
        {
            id: 8,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'In a noisy channel, one major reason digital encoding is robust is:',
            options: ['No noise exists', 'Thresholded states allow error tolerance', 'Analog cannot represent signals', 'Frequency is irrelevant'],
            correctIndex: 1,
            hint: 'Discrete states are easier to recover than continuous values.',
            explanation: 'Binary thresholds can recover intended values despite moderate noise.'
        },
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Identical twins can still differ in traits mainly because:',
            options: ['DNA is never same', 'Environment and gene expression regulation differ', 'Genes never influence traits', 'Mutations are impossible'],
            correctIndex: 1,
            hint: 'Epigenetics and life history matter.',
            explanation: 'Shared DNA does not guarantee identical expression outcomes.'
        }
    ]
};
