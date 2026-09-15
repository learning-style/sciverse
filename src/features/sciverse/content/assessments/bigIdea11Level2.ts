import { AssessmentData } from '../../types';

/**
 * Big Idea 11 Assessment -- LEVEL 2 (grades 6-8).
 * Covers L2P11 (pressure = rho x g x h, mmHg), L2C11 (each pH step is ten times;
 * dilution), L2B11 (risk and vaccine effectiveness). The theme across all three
 * is naming the reference a health number is compared with.
 * 12 questions: 4 easy -> 4 medium -> 4 hard
 */
export const bigIdea11Level2Assessment: AssessmentData = {
    bigIdea: 11,
    level: 2,
    title: 'How Do We Stay Healthy?',
    subtitle: 'Level 2 -- Pressure Columns, pH Steps and Vaccine Trials',
    icon: '🩺',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'The pressure under a column of liquid is:',
            options: ['Density x g x height', 'Density / height', 'Mass x height', 'Force x area'],
            correctIndex: 0,
            hint: 'Weight divided by area -- and the area cancels.',
            explanation: 'The column\'s weight is ρ x A x h x g; dividing by the area A leaves ρ x g x h.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'One step down the pH scale means:',
            options: ['Ten times as many hydrogen ions in each litre', 'One more hydrogen ion in each litre', 'Twice as many hydrogen ions in each litre', 'Ten times fewer hydrogen ions in each litre'],
            correctIndex: 0,
            hint: 'Down the scale is towards acid.',
            explanation: 'Each step down is ten times as many H⁺; each step up is ten times fewer.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'In a vaccine trial, a placebo is:',
            options: ['A dummy injection with no vaccine in it', 'A stronger dose of the vaccine', 'A second, different vaccine', 'A test of the volunteer\'s blood'],
            correctIndex: 0,
            hint: 'It lets the two groups be compared fairly.',
            explanation: 'The placebo group gets an injection with no vaccine, so nobody knows which one they had.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'Blood pressure is given in mmHg. 1 mmHg is about:',
            options: ['133 Pa, the pressure under a 1 mm column of mercury', '1 Pa', '13,600 Pa', '9.8 Pa'],
            correctIndex: 0,
            hint: 'Mercury\'s density is 13,600 kg/m³.',
            explanation: '13,600 x 9.8 x 0.001 m = 133 Pa.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'The pressure at heart level is 120 mmHg. What is it in an artery 0.5 m above the heart? (Blood: 1,060 kg/m³; g = 9.8 N/kg; 1 mmHg = 133 Pa.)',
            options: ['About 81 mmHg', 'About 159 mmHg', '120 mmHg', 'About 39 mmHg'],
            correctIndex: 0,
            hint: 'Work out ρ x g x h in pascals, turn it into mmHg, and remember that up takes pressure away.',
            explanation: '1,060 x 9.8 x 0.5 = 5,190 Pa, which is 39 mmHg. Above the heart: 120 − 39 = 81 mmHg. 159 adds instead of subtracting; 39 is only the change.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Tomato juice has a pH of about 4, and pure water a pH of 7. How many times as many H⁺ does a litre of tomato juice have?',
            options: ['1,000', '3', '1.75', '300'],
            correctIndex: 0,
            hint: 'Multiply by 10 once for every step of difference.',
            explanation: 'The difference is 3, so 10 x 10 x 10 = 1,000. 3 uses the difference itself, and 1.75 divides one pH by the other.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'A trial has 8,000 people in each group. 16 vaccinated people fell ill, and 80 in the placebo group. How effective is the vaccine?',
            options: ['80%', '20%', '99.8%', '64%'],
            correctIndex: 0,
            hint: 'Find each group\'s risk, then 1 minus their ratio.',
            explanation: 'Risks: 16 / 8,000 = 0.2% and 80 / 8,000 = 1%. Ratio 0.2, so effectiveness = 1 − 0.2 = 80%. 20% is the ratio; 99.8% ignores the placebo group.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'An acid at pH 2 is given two tenfold dilutions. What is its pH now?',
            options: ['pH 4', 'pH 2.2', 'pH 0', 'pH 20'],
            correctIndex: 0,
            hint: 'Each tenfold dilution raises the pH by 1.',
            explanation: 'Two dilutions make 100 times the volume, so 100 times fewer H⁺ in each litre: pH 2 + 2 = pH 4.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'How tall a column of blood could a pressure of 150 mmHg hold up? (Blood: 1,060 kg/m³; g = 9.8 N/kg; 1 mmHg = 133 Pa.)',
            options: ['About 1.9 m', '0.15 m, the same as the mercury column', 'About 18.8 m', 'About 1,500 m'],
            correctIndex: 0,
            hint: 'Turn the pressure into pascals, then h = pressure / (ρ x g).',
            explanation: '150 x 133 = 19,950 Pa, and 19,950 / (1,060 x 9.8) = 1.9 m. Blood is much less dense than mercury, so its column is far taller than 150 mm. 18.8 m leaves out g.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'An acid at pH 4 is given six tenfold dilutions with pure water. What happens to its pH?',
            options: ['It rises to just below 7, and never past it', 'It rises to 10, making a base', 'It rises to 4.6', 'It rises to 24'],
            correctIndex: 0,
            hint: 'Check the condition on the dilution rule.',
            explanation: 'The rule holds well below pH 7. Once the acid\'s H⁺ are spread thinner than water\'s own, the pH settles just below 7: water cannot make a base.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'In a town of 1,000, 800 people are vaccinated with a 75% effective vaccine, and 200 are not. During an outbreak, 10% of unvaccinated people fall ill. Which is true?',
            options: ['20 of the 40 ill people were vaccinated -- half -- even though the vaccine cut the risk by 75%', '200 vaccinated people fall ill, because 25% of them are unprotected', 'No vaccinated people fall ill', '60 vaccinated people fall ill, because their risk is 7.5%'],
            correctIndex: 0,
            hint: 'Vaccinated risk = unvaccinated risk x (1 − effectiveness).',
            explanation: 'Unvaccinated: 200 x 10% = 20 ill. Vaccinated risk: 10% x 0.25 = 2.5%, so 800 x 2.5% = 20 ill. Half the ill are vaccinated because four times as many people are. 7.5% multiplies by 0.75 instead of 0.25.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which of these compares a health number with the right reference?',
            options: ['Measuring blood pressure with the cuff level with the heart', 'Reading a pH difference of 3 as 3 times as acidic', 'Working out effectiveness from the vaccinated group alone', 'Judging a vaccine by how many ill people were vaccinated, without the size of each group'],
            correctIndex: 0,
            hint: 'Each lesson named what its number is compared with.',
            explanation: 'Blood pressure means something at heart height. pH steps are powers of ten, effectiveness needs the unvaccinated group, and counts need the size of each group.'
        }
    ]
};
