import { AssessmentData } from '../../types';

/**
 * Big Idea 20 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P20 (power in dioptres = 1 / focal length in metres, and powers add),
 * L2C20 (thickness goes as 1 / (n - 1), so a percentage that hides a size),
 * L2B20 (reading glasses = power needed for the distance - accommodation left).
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea20Level2Assessment: AssessmentData = {
    bigIdea: 20,
    level: 2,
    title: 'How Do Lenses Change What We See?',
    subtitle: 'Level 2 -- Dioptres, Thickness, and Reading Glasses',
    icon: '🔍',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A lens has a focal length of 50 cm. What is its power?',
            options: ['50 D', '0.02 D', '2 D', '5 D'],
            correctIndex: 2,
            hint: 'Convert to metres first, then divide 1 by it.',
            explanation: '50 cm is 0.5 m, and 1 / 0.5 = 2 dioptres. Using centimetres gives 1 / 50 = 0.02, which is a power per centimetre and not a dioptre.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'What decides how strongly a material bends light?',
            options: [
                'Its refractive index n',
                'How far n sits above 1',
                'Its thickness',
                'Its colour'
            ],
            correctIndex: 1,
            hint: 'Air has n = 1.00. How much does air bend light?',
            explanation: 'A material with n = 1 bends light not at all, so bending cannot be proportional to n itself — it goes with (n - 1). This is why 1.52 to 1.74 looks like a 15% change and is really 42% more bending: 0.74 / 0.52.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'How much extra bending power does it take to focus on something 25 cm away?',
            options: ['0.25 D', '4 D', '25 D', 'It depends on the person'],
            correctIndex: 1,
            hint: '1 divided by the distance in metres.',
            explanation: '1 / 0.25 = 4 dioptres, and it is the same for everybody, because the figure is set by the distance alone. What varies between people is whether they still have 4 dioptres of accommodation to spend.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'You hold a 3 D lens against a 2 D lens. What is the power of the pair?',
            options: ['6 D', '5 D', '1 D', '2.5 D'],
            correctIndex: 1,
            hint: 'This is the whole reason for using dioptres.',
            explanation: 'Powers add when lenses sit together: 3 + 2 = 5 D, a focal length of 1/5 = 0.2 m. Multiplying would mean a flat sheet of glass, power zero, destroyed every lens it touched.'
        },

        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Switching from ordinary 1.52 glass to n = 1.67 makes a lens how thick, compared with before?',
            options: ['91% as thick', '78% as thick', '129% as thick', '67% as thick'],
            correctIndex: 1,
            hint: 'Subtract 1 from each index first, then put the better glass on the bottom.',
            explanation: '0.52 / 0.67 = 0.78, so about 78% as thick — 22% thinner. Using the raw indices gives 0.91, which would say a lens made of air is only 1.52 times as thick as glass rather than impossible.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Someone has 2 D of accommodation left. What is the nearest they can focus?',
            options: ['2 cm', '20 cm', '50 cm', '200 cm'],
            correctIndex: 2,
            hint: 'Near point in metres is 1 divided by the accommodation.',
            explanation: '1 / 2 = 0.5 m, which is 50 cm — about arm\'s length. This is roughly where a 50-year-old sits, and it is why reading glasses stop being optional at about that age.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'An eye has a total power of 63 D but needs 60 D for its own length. What lens corrects it?',
            options: ['+3 D', '-3 D', '+63 D', '-60 D'],
            correctIndex: 1,
            hint: 'The eye is too strong. Powers add.',
            explanation: 'A -3 D lens gives 63 - 3 = 60 D. Because powers add, a prescription is a subtraction. A minus sign means the lens spreads light apart to undo an eye that converges too much — which is B20\'s nearsightedness with a number on it.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A musician with 1.5 D of accommodation left wants to read a score at 50 cm. What glasses do they need?',
            options: ['+2.5 D', '+0.5 D', '+3.5 D', 'None'],
            correctIndex: 1,
            hint: 'The requirement comes from the distance, and 50 cm is not 25 cm.',
            explanation: '50 cm needs 1 / 0.5 = 2 D, and 2 - 1.5 = +0.5 D. Using the 4 D figure for a book at 25 cm would give +2.5 D and be far too strong — which is why an optician asks what you want to look at and how far away it is.'
        },

        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Two customers are offered n = 1.74 glass. One is -1.5 D, the other -8 D. Both lenses would be 30% thinner. Should they get the same advice?',
            options: [
                'Yes — the improvement is 30% for both',
                'No — 30% is 0.3 mm for one and 1.4 mm for the other',
                'Yes, but only if both lenses are the same diameter',
                'No — the percentage is different for different prescriptions'
            ],
            correctIndex: 1,
            hint: 'Work out what the percentage is worth in millimetres.',
            explanation: 'The percentage is a property of the glass and holds for every prescription. The millimetres belong to the customer: about 0.3 mm saved at -1.5 D, which nobody can see, and about 1.4 mm at -8 D, off a lens that was almost 5 mm thick. A percentage tells you nothing about a size.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'Between ages 10 and 20 an eye loses about 3 D of accommodation, and between 40 and 50 it loses about 3 D again. Why does only the second one matter?',
            options: [
                'The lens hardens faster after 40',
                'Because the near point is 1 divided by the accommodation, so the same loss moves it 2 cm in the first case and 30 cm in the second',
                'Because reading habits change with age',
                'Because the eye also gets longer with age'
            ],
            correctIndex: 1,
            hint: 'Work out the near point at 14, 11, 5 and 2 dioptres.',
            explanation: '14 D to 11 D moves the near point from 7 cm to 9 cm. 5 D to 2 D moves it from 20 cm to 50 cm — straight through the reading distance. Identical decline, fifteen times the consequence, and nothing about the lens is different. It is what taking 1 divided by a shrinking number does.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'A nearsighted person wearing -3 D spectacles is 50, with 2 D of accommodation left. Why can they read at 25 cm with their glasses off, when their friend needs +2.0 D readers?',
            options: [
                'Nearsighted eyes lose accommodation more slowly',
                'Their eye is already 3 D too strong, so taking the glasses off hands them 3 of the 4 D that reading needs',
                'Their reading distance is different',
                'They are straining their eyes and will damage them'
            ],
            correctIndex: 1,
            hint: 'Reading at 25 cm needs 4 D. What does being 3 D too strong for distance give you up close?',
            explanation: 'Accommodation falls at much the same rate whatever the distance prescription. The difference is the starting point: being too strong for distance is being pre-focused for close work. They need 4 D, have 3 built in and 2 of accommodation, so they are comfortable — which is why older nearsighted people read over the top of their glasses instead of buying a second pair.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Why do opticians use dioptres rather than focal length?',
            options: [
                'Because dioptres are smaller numbers',
                'Because a stronger lens has a smaller focal length, and backwards quantities do not combine — whereas dioptres run the right way and add',
                'Because focal length cannot be measured accurately',
                'Because dioptres work for curved mirrors too'
            ],
            correctIndex: 1,
            hint: 'What do you get when you hold a 50 cm lens against a 33 cm lens?',
            explanation: 'The test of a good quantity is not the direction of its numbers but whether you can do arithmetic with them. In focal lengths, 50 cm with 33 cm somehow gives 20 cm. In dioptres it is 2 + 3 = 5, and a prescription becomes a subtraction you can do in your head.'
        }
    ]
};
