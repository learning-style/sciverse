import { AssessmentData } from '../../types';

/**
 * Big Idea 50 Assessment: "How Do Satellites Help Life on Earth?"
 * Covers P50 (Eyes in the Sky), C50 (Built for Space), B50 (Watching Life from Space)
 * 12 questions: 4 easy → 4 medium → 4 hard
 */
export const bigIdea50Assessment: AssessmentData = {
    bigIdea: 50,
    title: 'How Do Satellites Help Life on Earth?',
    subtitle: 'Orbits, Materials & Watching from Above',
    icon: '🛰️',
    questions: [
        // ── EASY ──
        {
            id: 1,
            difficulty: 'easy',
            discipline: 'physics',
            question: 'A satellite flying low above the Earth gives:',
            options: ['Sharper pictures, but it whizzes past quickly', 'Coarser pictures that never change', 'No pictures at all', 'The same pictures as a high one'],
            correctIndex: 0,
            hint: 'Like holding a photo close to your face.',
            explanation: 'Being close means fine detail but fast motion.'
        },
        {
            id: 2,
            difficulty: 'easy',
            discipline: 'chemistry',
            question: 'What actually wears a satellite out in space?',
            options: ['Sunlight, and huge swings between hot and cold', 'Rain and rust', 'Wind', 'Damp air'],
            correctIndex: 0,
            hint: 'There is no weather up there.',
            explanation: 'Heat cycling and unfiltered sunlight are the damage.'
        },
        {
            id: 3,
            difficulty: 'easy',
            discipline: 'biology',
            question: 'Satellites watching wildlife actually measure:',
            options: ['The places animals live', 'The animals themselves', 'How many animals were born', 'What animals eat'],
            correctIndex: 0,
            hint: 'Could a satellite see a badger?',
            explanation: 'Satellites track habitat, not individuals.'
        },
        {
            id: 4,
            difficulty: 'easy',
            discipline: 'cross',
            question: 'A trade-off means:',
            options: ['You cannot have both good things at once', 'Two satellites swap jobs', 'Something is sold', 'A mistake was made'],
            correctIndex: 0,
            hint: 'More of one costs some of the other.',
            explanation: 'A trade-off is a forced exchange between two goods.'
        },
        // ── MEDIUM ──
        {
            id: 5,
            difficulty: 'medium',
            discipline: 'physics',
            question: 'Why does a satellite 36,000 kilometres up seem to hang over one spot?',
            options: ['One lap takes a day, and the Earth also spins once a day', 'It has engines holding it still', 'It is too far away to move', 'It is tied to the ground'],
            correctIndex: 0,
            hint: 'They keep pace with each other.',
            explanation: 'Matching the spin rate makes the satellite appear stationary.'
        },
        {
            id: 6,
            difficulty: 'medium',
            discipline: 'chemistry',
            question: 'Why is a satellite wrapped in shiny gold blankets?',
            options: ['They bounce sunlight away when hot and hold warmth in when cold', 'Gold is very strong', 'To make it look expensive', 'Gold blocks flying specks'],
            correctIndex: 0,
            hint: 'Think about 120 °C then -100 °C.',
            explanation: 'The blankets manage the enormous heat swing.'
        },
        {
            id: 7,
            difficulty: 'medium',
            discipline: 'biology',
            question: 'Why is a satellite so good at spotting a trend that people struggle with?',
            options: ['Same machine, same orbit, same measurement, for decades', 'It counts faster than people', 'It never makes mistakes', 'It can see animals hiding'],
            correctIndex: 0,
            hint: 'Recall what B48 said a trend needs.',
            explanation: 'An unchanging method is what makes years comparable.'
        },
        {
            id: 8,
            difficulty: 'medium',
            discipline: 'cross',
            question: 'Engineers fit more solar panels than a satellite needs on launch day. Why?',
            options: ['The panels fade every year, so the spare keeps it alive when old', 'Spare panels make it heavier and steadier', 'In case one falls off', 'To sell power to other satellites'],
            correctIndex: 0,
            hint: 'Build for the day it is old.',
            explanation: 'Anticipated degradation is designed in from the start.'
        },
        // ── HARD ──
        {
            id: 9,
            difficulty: 'hard',
            discipline: 'physics',
            question: 'A wildfire needs hourly smoke tracking and sharp pictures of burnt buildings. What is needed?',
            options: ['Two satellites -- one high that never looks away, one low for detail', 'One low satellite, since sharp is always better', 'One high satellite only', 'Neither; use aircraft'],
            correctIndex: 0,
            hint: 'The low one is gone in two minutes.',
            explanation: 'Detail and persistence cannot come from one orbit.'
        },
        {
            id: 10,
            difficulty: 'hard',
            discipline: 'chemistry',
            question: 'Why does going in and out of the Earth’s shadow 16 times a day damage a satellite?',
            options: ['Things grow when hot and shrink when cold, so joints loosen and parts crack', 'The darkness weakens metal', 'It uses up fuel', 'Shadow makes things rust'],
            correctIndex: 0,
            hint: 'Thousands of cycles add up.',
            explanation: 'Repeated thermal expansion fatigues joints and coatings.'
        },
        {
            id: 11,
            difficulty: 'hard',
            discipline: 'biology',
            question: 'To find whether spring leaves appear earlier than 40 years ago, you need a satellite that:',
            options: ['Looks at the whole country every few days, even with coarse dots', 'Has the sharpest possible pictures', 'Flies lowest of all', 'Can see individual leaves'],
            correctIndex: 0,
            hint: 'You are measuring a date.',
            explanation: 'A date needs frequent revisits, not fine resolution.'
        },
        {
            id: 12,
            difficulty: 'hard',
            discipline: 'cross',
            question: 'Which statement best captures what all three lessons showed about satellites?',
            options: ['Where it flies, what it is made of, and what you ask it must all match the job', 'Higher satellites are always better', 'Sharper pictures always beat coarse ones', 'Satellites replace counting on the ground'],
            correctIndex: 0,
            hint: 'P50, C50 and B50 together.',
            explanation: 'Orbit, materials and question are one linked design problem.'
        }
    ]
};
