import { AssessmentData } from '../../types';

/**
 * Big Idea 26 Assessment: "How Do We Predict Weather?"
 * Covers P26 (Hot Side, Cold Side), C26 (Cloud Factory), B26 (Animal Weather Reporters)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea26Assessment: AssessmentData = {
    bigIdea: 26,
    title: 'How Does Weather Shape Our World?',
    subtitle: 'Weather Patterns, Chemical Changes, and Biological Responses',
    icon: '⛅',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'What causes wind to blow?',
            options: ['Differences in air pressure', 'The color of the sky', 'Magnetism', 'Earthquakes'],
            correctIndex: 0,
            hint: 'Think about how air moves from high to low pressure.',
            explanation: 'Wind is caused by air moving from areas of high pressure to low pressure.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'Rainwater can sometimes turn acidic because:',
            options: ['It mixes with gases like CO₂ and SO₂', 'It falls faster', 'It is blue', 'It is cold'],
            correctIndex: 0,
            hint: 'Think about what happens when rain passes through polluted air.',
            explanation: 'Rain absorbs gases like carbon dioxide and sulfur dioxide, forming weak acids.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Plants respond to changing weather by:',
            options: ['Adjusting growth and water use', 'Changing color instantly', 'Moving to new places', 'Making sound'],
            correctIndex: 0,
            hint: 'Think about how plants survive drought or storms.',
            explanation: 'Plants can slow growth, close stomata, or drop leaves to cope with weather changes.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Some animals behave differently before a storm because they sense:',
            options: ['Changes such as falling air pressure', 'The colour of clouds only', 'Nothing at all', 'The date'],
            correctIndex: 0,
            hint: 'They detect physical changes we often miss.',
            explanation: 'Sensitivity to pressure and humidity shifts lets animals react early.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Which process links weather, chemistry, and biology?',
            options: ['Acid rain affecting forests', 'Sunlight making the sky blue', 'Gravity pulling rain down', 'Wind blowing sand'],
            correctIndex: 0,
            hint: 'Think about how pollution and rain interact with living things.',
            explanation: 'Acid rain is a chemical process caused by weather and impacts biological systems.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Warm air rises, and this creates:',
            options: ['An area of lower pressure that air flows into', 'A permanent high-pressure zone', 'No pressure change', 'Instant rain'],
            correctIndex: 0,
            hint: 'Wind flows from high to low pressure.',
            explanation: 'Rising warm air lowers surface pressure, drawing in air as wind.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'A cloud forms when rising water vapour:',
            options: ['Cools and condenses into tiny droplets', 'Heats up and expands', 'Turns into oxygen', 'Freezes into rock'],
            correctIndex: 0,
            hint: 'Cooling is the key step.',
            explanation: 'Cooling reduces the air\'s capacity to hold vapour, so it condenses.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Wind blows because of differences in:',
            options: ['Air pressure', 'Cloud colour', 'Ground hardness', 'Time of day only'],
            correctIndex: 0,
            hint: 'Pressure differences drive air movement.',
            explanation: 'Air accelerates from higher to lower pressure regions.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'A sudden cold snap can cause:',
            options: ['Physical, chemical, and biological stress in ecosystems', 'Only temperature to drop', 'No effect on living things', 'Instant plant growth'],
            correctIndex: 0,
            hint: 'Think about how all systems respond to rapid weather change.',
            explanation: 'Rapid weather changes can freeze water, alter chemical reactions, and stress living organisms.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why does dew form on grass overnight?',
            options: ['The ground cools, and air touching it can no longer hold its water vapour', 'Rain falls silently', 'Grass produces water', 'The Moon adds moisture'],
            correctIndex: 0,
            hint: 'Cooling forces condensation.',
            explanation: 'Cooled air reaches saturation and releases vapour as liquid water.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'Two places have very different temperatures nearby. A forecaster expects:',
            options: ['Wind, because a pressure difference will develop', 'Perfect calm', 'No weather at all', 'Permanent fog'],
            correctIndex: 0,
            hint: 'Temperature differences create pressure differences.',
            explanation: 'Uneven heating drives pressure gradients and therefore wind.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Predicting weather works because it combines:',
            options: ['Physical pressure patterns, moisture chemistry and observed responses in nature', 'Only guesswork', 'Only satellite photos', 'Only animal behaviour'],
            correctIndex: 0,
            hint: 'Three lessons, three kinds of evidence.',
            explanation: 'Reliable forecasting integrates physical, chemical and observational signals.'
        }
    ]
};